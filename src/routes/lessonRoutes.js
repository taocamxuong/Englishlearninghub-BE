import { Router } from 'express';
import { getLessons, getLessonBySlug } from '../controllers/lessonController.js';
import { optionalProtect } from '../middlewares/auth.js';

const router = Router();

router.get('/', optionalProtect, getLessons);
router.get('/:slug', getLessonBySlug);

export default router;
