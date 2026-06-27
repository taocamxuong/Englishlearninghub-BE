import { Router } from 'express';
import { submit } from '../controllers/submissionController.js';
import { protect } from '../middlewares/auth.js';


const router = Router();

// Chỉ admin mới xem được danh sách user
router.post('/', protect, submit);

export default router;
