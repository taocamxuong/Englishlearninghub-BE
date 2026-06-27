import mongoose from 'mongoose';

/**
 * SubmissionAnswer = chi tiết từng câu trong một lần nộp bài (lịch sử mức C).
 *
 * Lưu snapshot câu hỏi/đáp án lúc chấm để xem lại đúng ngữ cảnh,
 * kể cả khi Exercise trong DB thay đổi sau này.
 */
const submissionAnswerSchema = new mongoose.Schema(
  {
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
      required: true,
      index: true,
    },
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
      index: true,
    },

    /** Snapshot metadata câu hỏi lúc nộp */
    exerciseType: {
      type: String,
      enum: ['multiple_choice', 'fill_blank', 'matching', 'listening'],
      required: true,
    },
    question: { type: String, required: true, trim: true, maxlength: 500 },
    order: { type: Number, default: 0 },
    points: { type: Number, default: 1, min: 0 },

    /**
     * Đáp án user gửi — Mixed theo type:
     *  - multiple_choice -> 'A'
     *  - fill_blank      -> 'hello'
     *  - matching        -> [{ left, right }, ...]
     */
    userAnswer: { type: mongoose.Schema.Types.Mixed, required: true },

    /** Kết quả chấm */
    isCorrect: { type: Boolean, required: true },
    earnedPoints: { type: Number, default: 0, min: 0 },

    /** Snapshot đáp án đúng + giải thích lúc chấm */
    correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true },
    explanation: { type: String, default: '', maxlength: 500 },
  },
  { timestamps: true }
);

submissionAnswerSchema.index({ submissionId: 1, order: 1 });
submissionAnswerSchema.index(
  { submissionId: 1, exerciseId: 1 },
  { unique: true }
);

export default mongoose.model('SubmissionAnswer', submissionAnswerSchema);
