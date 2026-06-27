import mongoose from 'mongoose';

/**
 * Vocabulary = từ vựng thuộc 1 lesson.
 * Người mới thường cần: nghĩa, phát âm IPA, audio, ví dụ, hình.
 */
const vocabularySchema = new mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
      index: true,
    },
    word: { type: String, required: true, trim: true, maxlength: 100 },
    meaning: { type: String, required: true, trim: true, maxlength: 300 },
    pronunciation: { type: String, default: '', maxlength: 100 }, // IPA: /həˈloʊ/
    partOfSpeech: {
      type: String,
      enum: [
        'noun',
        'verb',
        'adjective',
        'adverb',
        'pronoun',
        'preposition',
        'conjunction',
        'interjection',
        'phrase',
      ],
      default: 'noun',
    },
    audioUrl: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    example: { type: String, default: '', maxlength: 300 },
    exampleTranslation: { type: String, default: '', maxlength: 300 },
  },
  { timestamps: true }
);

// Tránh trùng từ trong cùng 1 lesson
vocabularySchema.index({ lessonId: 1, word: 1 }, { unique: true });

export default mongoose.model('Vocabulary', vocabularySchema);
