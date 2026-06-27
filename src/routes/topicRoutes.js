import { Router } from 'express';
import { getTopics, getTopicBySlug } from '../controllers/topicController.js';

const router = Router();

router.get('/', getTopics);
router.get('/:slug', getTopicBySlug);

export default router;
