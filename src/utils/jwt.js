import jwt from 'jsonwebtoken';

/**
 * Ký 1 access token cho user.
 * Payload nhỏ gọn: chỉ có id + role để middleware decode nhanh.
 */
export const signToken = (user) => 
  jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );    

/**
 * Verify token. Trả về payload nếu hợp lệ, throw nếu không.
 */
export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
