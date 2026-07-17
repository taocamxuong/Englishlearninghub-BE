import {Router} from 'express';
import { addWord, getWordbank, deleteWord, checkWordsInLesson } from '../controllers/wordbankController.js';
import { protect } from '../middlewares/auth.js';

const router = Router();

router.post('/', protect, addWord);
router.get('/', protect, getWordbank);
router.get('/check', protect, checkWordsInLesson);
router.delete('/:vocabularyId', protect, deleteWord);

export default router;