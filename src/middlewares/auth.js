import { verifyToken } from '../utils/jwt.js';
import { User } from '../models/index.js';
import AppError from '../utils/AppError.js';

/**
 * `protect`: yêu cầu request phải có Bearer token hợp lệ.
 * Nếu OK thì gắn `req.user` (đã loại password) cho các handler kế tiếp.
 *
 * Cách dùng:
 *   router.get('/me', protect, getMe);
 */
export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    if (!header.startsWith('Bearer ')) {
      throw new AppError('Missing or invalid Authorization header', 401);
    }
    const token = header.slice(7);

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id);
    if (!user) throw new AppError('User no longer exists', 401);

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return next(new AppError('Invalid or expired token', 401));
    }
    next(err);
  }
};

/**
 * `restrictTo('admin')`: cho phép qua chỉ khi user có role tương ứng.
 * Phải dùng SAU `protect`.
 *
 * Cách dùng:
 *   router.post('/topics', protect, restrictTo('admin'), createTopic);
 */
export const restrictTo = (...roles) => (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('Forbidden: insufficient permissions', 403));
    }
    next();
  };
