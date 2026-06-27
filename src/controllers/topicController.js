import { Topic } from '../models/index.js';
import AppError from '../utils/AppError.js';

/**
 * GET /api/topic
 * Query: ?level=beginner
 */
export const getTopics = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.level) filter.level = req.query.level;

    const topics = await Topic.find(filter).sort({ order: 1 }).lean();
    res.json({ success: true, data: { topics } });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/topic/:slug
 * Trả topic kèm danh sách lesson (populate virtual `lessons`).
 */
export const getTopicBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();

    const topic = await Topic.findOne({ slug, isActive: true }).populate({
      path: 'lessons',
    });

    if (!topic) throw new AppError('Topic not found', 404);

    res.json({ success: true, data: { topic } });
  } catch (err) {
    next(err);
  }
};
