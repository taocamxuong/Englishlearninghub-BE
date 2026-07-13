import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';
import AppError from '../utils/AppError.js';
import sendEmail from '../utils/sendEmail.js';

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const OTP_TTL_MS = 10 * 60 * 1000;

/**
 * GET /api/user — chỉ admin (danh sách user, không trả password).
 * Profile user hiện tại dùng GET /api/auth/me thay vì route này.
 */
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: { users } });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
};

/** PATCH /api/user — cập nhật name và birthday (dob) của user đang đăng nhập. */
export const updateUser = async (req, res, next) => {
  try {
    const { name, birthday } = req.body;
    const updatefield = {};

    if (name !== undefined) {
      const trimmed = String(name).trim();
      if (!trimmed) throw new AppError('name cannot be empty', 400);
      updatefield.name = trimmed;
    }

    if (birthday !== undefined) {
      if (birthday === null || birthday === '') {
        updatefield.dob = null;
      } else {
        const bday = new Date(birthday);
        if (Number.isNaN(bday.getTime())) {
          throw new AppError('Invalid birthday format', 400);
        }
        updatefield.dob = bday;
      }
    }

    if (Object.keys(updatefield).length === 0) {
      throw new AppError('No fields to update', 400);
    }

    const user = await User.findByIdAndUpdate(req.user._id, updatefield, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) throw new AppError('User not found', 404);

    res.json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmnewP } = req.body;

    if (!currentPassword || !newPassword || !confirmnewP) {
      throw new AppError('currentPassword, newPassword and confirmnewP are required', 400);
    }

    const user = await User.findById(req.user._id).select('+password');
    if (!user) throw new AppError('User not found', 404);

    const ok = await user.comparePassword(currentPassword);
    if (!ok) {
      throw new AppError('Incorrect current password', 400);
    }

    if (newPassword === currentPassword) {
      throw new AppError('New password must be diffent from current password.', 400);
    }

    if (newPassword !== confirmnewP) {
      throw new AppError('New password and new-password confirmation must be the same.', 400);
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, data: { message: 'Password updated' } });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/user/email
 * Body: { newEmail, currentPassword }
 * Gửi OTP tới email mới (Nodemailer).
 */
export const requestEmailChange = async (req, res, next) => {
  try {
    const { newEmail, currentPassword } = req.body;

    if (!newEmail || !currentPassword) {
      throw new AppError('newEmail and currentPassword are required', 400);
    }

    const normalized = String(newEmail).toLowerCase().trim();
    if (!EMAIL_REGEX.test(normalized)) {
      throw new AppError('Invalid email format', 400);
    }

    const user = await User.findById(req.user._id).select('+password +emailChangeOtpHash');
    if (!user) throw new AppError('User not found', 404);

    if (normalized === user.email) {
      throw new AppError('New email must be different from current email', 400);
    }

    const ok = await user.comparePassword(currentPassword);
    if (!ok) {
      throw new AppError('Incorrect current password', 400);
    }

    const taken = await User.findOne({ email: normalized});
    if (taken) throw new AppError('Email already registered', 409); 

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.pendingEmail = normalized;
    user.emailChangeOtpHash = await bcrypt.hash(otp, 10);
    user.emailChangeOtpExpires = new Date(Date.now() + OTP_TTL_MS);
    await user.save();

    await sendEmail(
      normalized,
      'Verify your new email — English Learning Hub',
      `Your verification code is ${otp}. It expires in 10 minutes.`,
    );

    res.json({
      success: true,
      data: {
        message: 'OTP sent to new email',
        pendingEmail: normalized,
        expiresInMinutes: 10,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/user/email/verify
 * Body: { otp }
 * Xác minh OTP và cập nhật email.
 */
export const verifyEmailChange = async (req, res, next) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      throw new AppError('otp is required', 400);
    }

    const user = await User.findById(req.user._id).select('+emailChangeOtpHash');
    if (!user) throw new AppError('User not found', 404);

    if (!user.pendingEmail || !user.emailChangeOtpHash) {
      throw new AppError('No pending email change request', 400);
    }

    if (!user.emailChangeOtpExpires || user.emailChangeOtpExpires < new Date()) {
      throw new AppError('OTP expired. Please request a new code.', 400);
    }

    const match = await bcrypt.compare(String(otp).trim(), user.emailChangeOtpHash);
    if (!match) {
      throw new AppError('Invalid OTP', 400);
    }

    user.email = user.pendingEmail;
    user.pendingEmail = null;
    user.emailChangeOtpHash = null;
    user.emailChangeOtpExpires = null;
    await user.save();

    const safeUser = user.toJSON();

    res.json({
      success: true,
      data: {
        message: 'Email updated',
        user: safeUser,
      },
    });
  } catch (err) {
    next(err);
  }
};
