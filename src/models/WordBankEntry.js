import mongoose from 'mongoose';

const partOfSpeechEnum = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'pronoun',
  'preposition',
  'conjunction',
  'interjection',
  'phrase',
];

/**
 * WordBankEntry = một từ user đã lưu vào sổ từ (Word Bank).
 * Mỗi (userId, vocabularyId) chỉ có 1 record — bấm Add cùng từ không tạo trùng.
 *
 * Snapshot word/meaning/... giữ lịch sử kể cả khi Vocabulary trong lesson bị sửa hoặc ẩn.
 */
const wordBankEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    vocabularyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vocabulary',
      required: true,
      index: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
      index: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      default: null,
      index: true,
    },

    /** Snapshot từ Vocabulary lúc user bấm Add */
    word: { type: String, required: true, trim: true, maxlength: 100 },
    meaning: { type: String, required: true, trim: true, maxlength: 300 },
    pronunciation: { type: String, default: '', maxlength: 100 },
    partOfSpeech: {
      type: String,
      enum: partOfSpeechEnum,
      default: 'noun',
    },
    example: { type: String, default: '', maxlength: 300 },
    exampleTranslation: { type: String, default: '', maxlength: 300 },

    note: { type: String, default: '', maxlength: 500 },
    status: {
      type: String,
      enum: ['saved', 'learning', 'mastered'],
      default: 'saved',
    },
  },
  { timestamps: true }
);

wordBankEntrySchema.index({ userId: 1, vocabularyId: 1 }, { unique: true });
wordBankEntrySchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('WordBankEntry', wordBankEntrySchema);
