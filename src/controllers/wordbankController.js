import { Lesson, Vocabulary, WordBankEntry } from '../models/index.js';
import AppError from '../utils/AppError.js';

export const addWords = async (req, res, next) => {
  try {
    // const { vocabularyId, note, status } = req.body;

    // if (!vocabularyId) throw new AppError('vocabularyId is required', 400);

    // if (note != null && typeof note !== 'string') {
    //   throw new AppError('note must be a string', 400);
    // }

    // const statusEnum = ['saved', 'learning', 'mastered'];
    // if (status != null && !statusEnum.includes(status)) {
    //   throw new AppError('Invalid status', 400);
    // }

    // const vocab = await Vocabulary.findById(vocabularyId);
    // if (!vocab) throw new AppError('Vocabulary not found', 404);

    // const lesson = await Lesson.findById(vocab.lessonId);
    // if (!lesson) throw new AppError('Lesson not found', 404);

    // const entry = await WordBankEntry.create({
    //   userId: req.user._id,
    //   vocabularyId: vocab._id,
    //   lessonId: vocab.lessonId,
    //   topicId: lesson.topicId ?? null,
    //   word: vocab.word,
    //   meaning: vocab.meaning,
    //   pronunciation: vocab.pronunciation,
    //   partOfSpeech: vocab.partOfSpeech,
    //   example: vocab.example,
    //   exampleTranslation: vocab.exampleTranslation,
    //   note: typeof note === 'string' ? note.trim() : '',
    //   status: status ?? 'saved',
    // });

    // res.status(201).json({
    //   success: true,
    //   data: { word: entry },
    // });
    const { words } = req.body;
    if (!Array.isArray(words) || words.length === 0) {
      throw new AppError('words is required', 400);
    }
    const wordlist = [];
    for (const item of words) {
      const { vocabularyId, note, status } = item;
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
  
      const entry = {
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
      };
      wordlist.push(entry);
    }
    const result = await WordBankEntry.create(wordlist);
    res.status(201).json({
      success: true,
      data: { words: result },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getWords = async (req, res, next) => {
  try {
    const { lessonId, order} = req.query;  // latest, earliest
    const id = req.user._id;
    let filter = { userId: id };
    if (lessonId) filter.lessonId = lessonId;

    var sort = -1;
    if (order === 'earliest') sort = 1;
    const words = await WordBankEntry.find(filter).sort({ createdAt: sort});
    res.json({ success: true, data: { words } });
  } catch (err) {
    next(err);
  }
};

export const deleteWords = async (req, res, next) => {
  try {
    const raw = req.query.vocabularyIds;
    if (!raw) throw new AppError('vocabularyIds is required', 400);

    const vocabularyIds = String(raw)
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);

    if (vocabularyIds.length === 0) {
      throw new AppError('vocabularyIds is required', 400);
    }
    
    const filter = {
      userId: req.user._id,
      vocabularyId: { $in: vocabularyIds },
    }
    const result = await WordBankEntry.deleteMany(filter);
    res.status(200).json({
      success: true, 
      message: 'Word(s) deleted successfully',
      data: { deletedCount: result.deletedCount },
    });
  } catch (err) {
    next(err);
  }
};  

