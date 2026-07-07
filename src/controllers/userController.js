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
//get user by id
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json({ success: true, data: { user } });
  } catch (err) {
    next(err);
  }
};
//update user profile
// export const updateUser = async (req, res, next) => {
//   //update email, name

// }