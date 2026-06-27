import { Lesson } from '../models/index.js';
import AppError from '../utils/AppError.js';

/**
 * GET /api/lesson
 * Query: ?topicId=<ObjectId>
 */
export const getLessons = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.topicId) filter.topicId = req.query.topicId;

    const lessons = await Lesson.find(filter)
      .select('topicId title slug description content order xpReward passThreshold isActive')
      .sort({ order: 1 })
      .lean();

    res.json({ success: true, data: { lessons } });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/lesson/:slug
 * Trả lesson kèm field content (markdown).
 */
export const getLessonBySlug = async (req, res, next) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();

    const lesson = await Lesson.findOne({ slug, isActive: true })
      .select('topicId title slug description content order xpReward passThreshold isActive')
      .lean();

    if (!lesson) throw new AppError('Lesson not found', 404);

    res.json({ success: true, data: { lesson } });
  } catch (err) {
    next(err);
  }
};
