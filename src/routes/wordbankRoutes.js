import {Router} from 'express';
import { addWords, getWords, deleteWords } from '../controllers/wordbankController.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.post('/', protect, addWords);
router.get('/', protect, getWords);
router.delete('/', protect, deleteWords);

export default router;