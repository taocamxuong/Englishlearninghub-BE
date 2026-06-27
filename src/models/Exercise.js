import mongoose from 'mongoose';

/**
 * Sub-schema cho options trong câu hỏi multiple_choice.
 * { key: 'A', text: 'Hello' }
 */
const optionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, trim: true, maxlength: 10 },
    text: { type: String, required: true, trim: true, maxlength: 300 },
  },
  { _id: false }
);

/**
 * Exercise = câu hỏi / bài tập trong 1 lesson.
 * 4 dạng phổ biến cho người mới:
 *  - multiple_choice: chọn đáp án đúng (A/B/C/D)
 *  - fill_blank:     điền từ vào chỗ trống
 *  - matching:       nối từ với nghĩa
 *  - listening:      nghe audio rồi trả lời
 *
 * `correctAnswer` dùng Mixed để linh hoạt:
 *  - multiple_choice -> 'A'
 *  - fill_blank      -> 'hello' (hoặc ['hello','hi'])
 *  - matching        -> [{ left: 'cat', right: 'con mèo' }, ...]
 */
const exerciseSchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['multiple_choice', 'fill_blank', 'matching', 'listening'],
      required: true,
    },
    question: { type: String, required: true, trim: true, maxlength: 500 },
    audioUrl: { type: String, default: '' }, // dùng cho listening
    options: { type: [optionSchema], default: [] },
    correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true },
    explanation: { type: String, default: '', maxlength: 500 },
    order: { type: Number, default: 0 },
    points: { type: Number, default: 1, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Exercise', exerciseSchema);
