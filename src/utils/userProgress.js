import { Lesson, UserProgress } from '../models/index.js';

export const DEFAULT_PROGRESS = {
  status: 'not_started',
  score: 0,
  attempts: 0,
  completedAt: null,
};

/** Tạo sẵn UserProgress not_started cho mọi lesson active còn thiếu. */
export async function ensureUserProgressForAllLessons(userId) {
  const lessons = await Lesson.find({ isActive: true }).select('_id').lean();
  if (lessons.length === 0) return;

  const lessonIds = lessons.map((l) => l._id);
  const existing = await UserProgress.find({
    userId,
    lessonId: { $in: lessonIds },
  })
    .select('lessonId')
    .lean();

  const existingIds = new Set(existing.map((p) => String(p.lessonId)));
  const toCreate = lessonIds
    .filter((id) => !existingIds.has(String(id)))
    .map((lessonId) => ({
      userId,
      lessonId,
      ...DEFAULT_PROGRESS,
    }));

  if (toCreate.length === 0) return;

  try {
    await UserProgress.insertMany(toCreate, { ordered: false });
  } catch (err) {
    if (err.code !== 11000) throw err;
  }
}

export function attachGuestProgress(lessons) {
  return lessons.map((lesson) => ({ ...lesson, ...DEFAULT_PROGRESS }));
}

export function attachUserProgress(lessons, progresses) {
  for (const lesson of lessons) {
    const progress = progresses.find(
      (p) => String(p.lessonId) === String(lesson._id),
    );
    lesson.status = progress?.status ?? DEFAULT_PROGRESS.status;
    lesson.score = progress?.score ?? DEFAULT_PROGRESS.score;
    lesson.attempts = progress?.attempts ?? DEFAULT_PROGRESS.attempts;
    lesson.completedAt = progress?.completedAt ?? DEFAULT_PROGRESS.completedAt;
  }
  return lessons;
}
