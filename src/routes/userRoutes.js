import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  updatePassword,
  requestEmailChange,
  verifyEmailChange,
} from '../controllers/userController.js';
import { protect, restrictTo } from '../middlewares/auth.js';

const router = Router();

router.get('/', protect, restrictTo('admin'), getUsers);
router.patch('/', protect, updateUser);
router.patch('/email/verify', protect, verifyEmailChange);
router.patch('/email', protect, requestEmailChange);
router.patch('/password', protect, updatePassword);

export default router;
