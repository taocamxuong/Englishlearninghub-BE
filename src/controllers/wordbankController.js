import { Lesson, Vocabulary, WordBankEntry } from '../models/index.js';
import AppError from '../utils/AppError.js';

export const addWord = async (req, res, next) => {
  try {
    const { vocabularyId, note, status } = req.body;

    if (!vocabularyId) throw new AppError('vocabularyId is required', 400);

    if (note != null && typeof note !== 'string') {
      throw new AppError('note must be a string', 400);
    }

    const statusEnum = ['saved', 'learning', 'mastered'];
    if (status != null && !statusEnum.includes(status)) {
      throw new AppError('Invalid status', 400);
    }

    const vocab = await Vocabulary.findById(vocabularyId);
    if (!vocab) throw new AppError('Vocabulary not found', 404);

    const lesson = await Lesson.findById(vocab.lessonId);
    if (!lesson) throw new AppError('Lesson not found', 404);

    const entry = await WordBankEntry.create({
      userId: req.user._id,
      vocabularyId: vocab._id,
      lessonId: vocab.lessonId,
      topicId: lesson.topicId ?? null,
      word: vocab.word,
      meaning: vocab.meaning,
      pronunciation: vocab.pronunciation,
      partOfSpeech: vocab.partOfSpeech,
      example: vocab.example,
      exampleTranslation: vocab.exampleTranslation,
      note: typeof note === 'string' ? note.trim() : '',
      status: status ?? 'saved',
    });

    res.status(201).json({
      success: true,
      data: { word: entry },
    });
  } catch (err) {
    next(err);
  }
};

export const getWordbank = async (req, res, next) => {
  try {
    const id = req.user._id;
    const words = await WordBankEntry.find({ userId: id }).sort({ createdAt: -1 });
    res.json({ success: true, data: { words } });
  } catch (err) {
    next(err);
  }
};

export const deleteWord = async (req, res, next) => {
  try {
    // const { vocabularyId } = req.body;
    // if (!vocabularyId) throw new AppError('vocabularyId is required', 400);

    // const deleted = await WordBankEntry.findOneAndDelete({
    //   userId: req.user._id,
    //   vocabularyId,
    // });
    // if (!deleted) throw new AppError('Word not found', 404);
    const { vocabularyId } = req.params;
    if (!vocabularyId) throw new AppError('vocabularyId is required', 400);

    const deleted = await WordBankEntry.findOneAndDelete({
      userId: req.user._id,
      vocabularyId,
    });
    if (!deleted) throw new AppError('Word not found', 404);
    //console.log(deleted);
    res.status(200).json({ success: true, message: 'Word deleted successfully' });
  } catch (err) {
    next(err);
  }
};  

/**
 * GET /api/wordbank/check?lessonId=
 * Mục đích: trả danh sách vocabularyId user đã save trong lesson (có thể rỗng)
 * để FE hiện trạng thái "đã thêm" trên từng từ vựng.
 */
export const checkWordsInLesson = async (req, res, next) => {
  try {
    const { lessonId } = req.query;
    if (!lessonId) throw new AppError('lessonId is required', 400);

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) throw new AppError('Lesson not found', 404);

    const entries = await WordBankEntry.find({
      userId: req.user._id,
      lessonId,
    }).select('vocabularyId');

    // Danh sách id đã save — FE: vocabularyIds.includes(vocab._id) → "đã thêm"
    const vocabularyIds = entries.map((e) => String(e.vocabularyId));

    res.json({
      success: true,
      data: { lessonId: String(lessonId), vocabularyIds },
    });
  } catch (err) {
    next(err);
  }
};