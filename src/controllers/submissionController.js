import { Exercise, Lesson, Submission, SubmissionAnswer, Topic } from '../models/index.js';
import AppError from '../utils/AppError.js';

export const submit = async (req, res, next) => {
  try {
    const answerList = req.body.answerList;
    const lessonId = req.body.lessonId;

    console.log(answerList);
    
    if (!(Array.isArray(answerList) && answerList.length > 0)) {
      throw new AppError('answerList is required', 400);
    }

    if (!lessonId) {
      throw new AppError('lessonId is required', 400);
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      throw new AppError('Lesson not found', 404);
    }

    const topic = await Topic.findById(lesson.topicId);
    if (!topic) {
      throw new AppError('Topic not found', 404);
    }

    const exercises = await Exercise.find({ lessonId: lesson._id }); 
    if (!exercises) {
        throw new AppError('Exercises is required', 400);
    }      

    let subAnsList = [];
    let totalP = 0;
    let ttlEarnedP = 0;
    let corCnt = 0;

    for (let i = 0; i < exercises.length; i++) {
        totalP += exercises[i].points;
    }

    const previousAttempts = await Submission.countDocuments({
        userId: req.user._id,
        lessonId: lesson._id,
      });

    const sub = {
        userId: req.user._id,
        lessonId: lesson._id,
        lessonTitle: lesson.title,
        lessonSlug: lesson.slug,
        topicTitle: topic.title,
        topicSlug: topic.slug,
        correctCount: 0,
        totalCount: exercises.length,
        totalPoints: totalP,
        earnedPoints: 0,
        score: 0,
        status: 'failed',
        passThreshold: lesson.passThreshold ?? 70,
        earnedXp: 0,
        attemptNumber: previousAttempts + 1,
    }

    const submission = await Submission.create(sub);

    for (let i = 0; i < answerList.length; i++) {
        //const ex = await Exercise.findById(answerList[i].exerciseId);
        const ex = exercises.find(e => String(e._id) === String(answerList[i].exerciseId));
        if (!ex) {
            throw new AppError('Exercise not found', 404);
        }
        //totalP += ex.points;
        let isTrue = false; 
        let earnedP = 0;
        if (!answerList[i].answer) {
            throw new AppError('Answer not found', 404);
        }
        if (answerList[i].answer.toLowerCase() === ex.correctAnswer.toLowerCase()) {
            isTrue = true;
            corCnt++;
        }
        if (isTrue) {
            earnedP = ex.points;
            ttlEarnedP += earnedP;
        }

        const subAns = {
            submissionId: submission._id,
            exerciseId: answerList[i].exerciseId,
            exerciseType: ex.type,
            question: ex.question,
            order: ex.order, 
            points: ex.points,
            userAnswer: answerList[i].answer,
            isCorrect: isTrue, 
            earnedPoints: earnedP, 
            correctAnswer: ex.correctAnswer,
            explanation: ex.explanation, 
        }
        subAnsList.push(subAns);
    }   

    submission.correctCount = corCnt;
    submission.earnedPoints = ttlEarnedP;
    submission.score = totalP > 0 ? Math.round((ttlEarnedP / totalP) * 100) : 0;
    if (submission.score >= submission.passThreshold) submission.status = 'passed';
    await submission.save();

    const submissionAnswerList = await SubmissionAnswer.create(subAnsList);


    res.status(201).json({
      success: true,
      data: { submission, submissionAnswerList},
    });
  } catch (err) {
    next(err);
  }
};
