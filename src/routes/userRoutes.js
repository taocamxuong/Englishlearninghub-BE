import { Router } from 'express';
import { getUsers, getUserById, updateUser, updatePassword } from '../controllers/userController.js';
import { protect, restrictTo } from '../middlewares/auth.js';

const router = Router();

// Chỉ admin mới xem được danh sách user
router.get('/', protect, restrictTo('admin'), getUsers);
router.patch('/', protect, updateUser);
router.patch('/password', protect, updatePassword);

export default router;
