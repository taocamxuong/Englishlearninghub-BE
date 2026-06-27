import { Router } from 'express';
import { getUsers } from '../controllers/userController.js';
import { protect, restrictTo } from '../middlewares/auth.js';

const router = Router();

// Chỉ admin mới xem được danh sách user
router.get('/', protect, restrictTo('admin'), getUsers);

export default router;
