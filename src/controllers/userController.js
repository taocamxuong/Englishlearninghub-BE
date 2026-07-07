import { User } from '../models/index.js';
import AppError from '../utils/AppError.js';

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