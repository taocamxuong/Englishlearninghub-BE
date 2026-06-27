import mongoose from 'mongoose';

/**
 * Submission = một lần user nộp bài tập của lesson.
 * Mỗi lần bấm Submit tạo 1 record mới (lịch sử mức B/C).
 *
 * Quan hệ:
 *   User ──► Submission ──► SubmissionAnswer (chi tiết từng câu)
 *              │
 *              └──► Lesson
 */
const submissionSchema = new mongoose.Schema(
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

    /** Snapshot — giữ lịch sử kể cả khi lesson/topic đổi tên hoặc bị ẩn */
    lessonTitle: { type: String, required: true, trim: true, maxlength: 150 },
    lessonSlug: { type: String, required: true, trim: true, lowercase: true, maxlength: 150 },
    topicTitle: { type: String, default: '', trim: true, maxlength: 150 },
    topicSlug: { type: String, default: '', trim: true, lowercase: true, maxlength: 150 },

    /** Kết quả tổng hợp lần nộp */
    score: { type: Number, required: true, min: 0, max: 100 },
    correctCount: { type: Number, required: true, min: 0 },
    totalCount: { type: Number, required: true, min: 0 },
    totalPoints: { type: Number, required: true, min: 0 },
    earnedPoints: { type: Number, required: true, min: 0 },

    status: {
      type: String,
      enum: ['passed', 'failed'],
      required: true,
    },
    /** Snapshot ngưỡng pass của lesson lúc nộp (copy từ Lesson.passThreshold) */
    passThreshold: { type: Number, default: 70, min: 0, max: 100 },

    /** XP cộng trong lần nộp này (0 nếu không đủ điều kiện nhận XP) */
    earnedXp: { type: Number, default: 0, min: 0 },

    /** Số lần nộp thứ mấy của user với lesson này (1, 2, 3...) */
    attemptNumber: { type: Number, required: true, min: 1 },

    submittedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

submissionSchema.index({ userId: 1, submittedAt: -1 });
submissionSchema.index({ userId: 1, lessonId: 1, submittedAt: -1 });

export default mongoose.model('Submission', submissionSchema);
