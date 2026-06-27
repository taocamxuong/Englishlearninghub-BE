import { User } from '../models/index.js';

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
