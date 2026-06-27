import {Router} from 'express';
import { getVocals } from '../controllers/vocalController.js';

const router = Router();

router.get('/', getVocals);

export default router;