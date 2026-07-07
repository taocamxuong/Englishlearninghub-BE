import { Lesson, UserProgress } from '../models/index.js';
import AppError from '../utils/AppError.js';
import {
  attachGuestProgress,
  attachUserProgress,
  ensureUserProgressForAllLessons,
} from '../utils/userProgress.js';

const LESSON_LIST_FIELDS =
  'topicId title slug description order xpReward passThreshold isActive';

/**
 * GET /api/lesson
 * Query: ?topicId=<ObjectId>
 * Guest: mỗi lesson kèm progress mặc định not_started.
 * Có token: merge UserProgress của user (eager — đã tạo sẵn mọi lesson).
 */
export const getLessons = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.topicId) filter.topicId = req.query.topicId;

    const lessons = await Lesson.find(filter)
      .select(LESSON_LIST_FIELDS)
      .sort({ order: 1 })
      .lean();

    if (!req.user) {
      return res.json({
        success: true,
        data: { lessons: attachGuestProgress(lessons) },
      });
    }

    await ensureUserProgressForAllLessons(req.user._id);

    const lessonIds = lessons.map((l) => l._id);
    const progresses = await UserProgress.find({
      userId: req.user._id,
      lessonId: { $in: lessonIds },
    }).lean();

    res.json({
      success: true,
      data: { lessons: attachUserProgress(lessons, progresses) },
    });
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
    const sl = req.params.slug.toLowerCase().trim();

    const lesson = await Lesson.findOne({ slug: sl, isActive: true })
      .select('topicId title slug description content order xpReward passThreshold isActive')
      .lean();

    if (!lesson) throw new AppError('Lesson not found', 404);

    res.json({ success: true, data: { lesson } });
  } catch (err) {
    next(err);
  }
};
