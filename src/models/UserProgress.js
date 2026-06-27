import mongoose from 'mongoose';

/**
 * UserProgress = tiến độ học của 1 user với 1 lesson cụ thể.
 * Mỗi (userId, lessonId) chỉ có 1 record duy nhất.
 */
const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started',
    },
    score: { type: Number, default: 0, min: 0, max: 100 },
    attempts: { type: Number, default: 0, min: 0 },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

userProgressSchema.index({ userId: 1, lessonId: 1 }, { unique: true });

export default mongoose.model('UserProgress', userProgressSchema);
