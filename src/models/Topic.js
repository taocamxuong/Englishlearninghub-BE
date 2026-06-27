import mongoose from 'mongoose';

/**
 * Topic = chủ đề lớn (Greetings, Family, Numbers, Food, Colors...).
 * Mỗi Topic chứa nhiều Lesson.
 */
const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      maxlength: 500,
    },
    iconUrl: { type: String, default: '' },
    level: {
      type: String,
      enum: ['beginner', 'elementary'],
      default: 'beginner',
      index: true,
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

topicSchema.virtual('lessons', {
  ref: 'Lesson',
  localField: '_id',
  foreignField: 'topicId',
});

export default mongoose.model('Topic', topicSchema);
