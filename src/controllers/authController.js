import { User } from '../models/index.js';
import { signToken } from '../utils/jwt.js';
import AppError from '../utils/AppError.js';
import { ensureUserProgressForAllLessons } from '../utils/userProgress.js';

/**
 * POST /api/auth/register
 * Body: { email, password, name, level? }
 */
export const register = async (req, res, next) => {
  try {
    const { email, password, name, level } = req.body;

    if (!email || !password || !name) {
      throw new AppError('email, password and name are required', 400);
    }

    const exists = await User.findOne({ email });
    if (exists) throw new AppError('Email already registered', 409);

    const user = await User.create({ email:req.body.email, password:req.body.password, name, level });
    await ensureUserProgressForAllLessons(user._id);
    const token = signToken(user);

    res.status(201).json({
      success: true,
      data: { user, token },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError('email and password are required', 400);
    }

    // password trong schema có select:false -> phải +password để lấy ra
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new AppError('Invalid email or password', 401);

    const ok = await user.comparePassword(password);
    if (!ok) throw new AppError('Invalid email or password', 401);

    await ensureUserProgressForAllLessons(user._id);
    const token = signToken(user);

    res.json({
      success: true,
      data: { user, token }, // toJSON sẽ tự ẩn password
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/auth/me
 * Header: Authorization: Bearer <token>
 */
export const getMe = (req, res) => {
  res.json({ success: true, data: { user: req.user } });
};
