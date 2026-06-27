import mongoose from 'mongoose';

/**
 * Lesson = bài học cụ thể nằm trong 1 Topic.
 * Một Lesson có nhiều Vocabulary và nhiều Exercise.
 */
const lessonSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: '', maxlength: 500 },
    /**
     * Nội dung lý thuyết của bài (markdown / HTML).
     * Ví dụ: giới thiệu chủ đề, mẫu câu chính, ghi chú văn hoá...
     */
    content: { type: String, default: '' },
    order: { type: Number, default: 0 },
    xpReward: { type: Number, default: 10, min: 0 },
    /** Ngưỡng % điểm tối thiểu để pass bài (dùng khi submit exercise) */
    passThreshold: { type: Number, default: 70, min: 0, max: 100 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

  export default mongoose.model('Lesson', lessonSchema);
