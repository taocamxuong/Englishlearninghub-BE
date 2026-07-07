import { Exercise, Lesson, Submission, SubmissionAnswer, Topic, UserProgress } from '../models/index.js';
import AppError from '../utils/AppError.js';
import { updateStreak } from '../utils/streak.js';

export const submit = async (req, res, next) => {
  try {
    const answerList = req.body.answerList;
    const lessonId = req.body.lessonId;

    // console.log(answerList);

    let did = await UserProgress.findOne({
        userId: req.user._id,
        lessonId: lessonId
    })
    if (!did) {
        const newUP = {
            userId: req.user._id,
            lessonId: lessonId,
            status: 'not_started',
            score: 0,
            attempts: 0,
        }
        did = await UserProgress.create(newUP);
    }
    
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
    let stt = 'failed';
    let eXp = 0;
    const submittedAt = new Date();


    for (let i = 0; i < exercises.length; i++) {
        totalP += exercises[i].points;
    }

    const previousAttempts = await Submission.countDocuments({
        userId: req.user._id,
        lessonId: lesson._id,
      });

    // count so lan nop ngay hom nay -> neu = 0 -> tang streak / > 0 thi thoi
    // ~moi 00:00 hang ngay,~ goi func (dem so lan submit hom qua -> neu = 0 -> reset streak)

    for (let i = 0; i < answerList.length; i++) {
        const ex = exercises.find(e => String(e._id) === String(answerList[i].exerciseId));
        // let ex = null;
        // for (let j = 0; j < exercises.length; j++) {
        //     if (exercises[j]._id == answerList[i].exerciseId) {ex = exercises[j]}
        // }
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

    const sc = totalP > 0 ? Math.round((ttlEarnedP / totalP) * 100) : 0;
    let update = { attempts: did.attempts + 1, score: sc }

    const passedTime = await Submission.countDocuments({
        userId: req.user._id,
        lessonId: lessonId,
        status: 'passed'
    })
    if (sc >= lesson.passThreshold ?? 70) {
        stt = 'passed'
        if (passedTime == 0) {
            eXp = lesson.xpReward
            update.status = 'completed'
            update.completedAt = submittedAt
        }
    } else {
        if (passedTime == 0) {
            update.status = 'in_progress'
        }
    }

    await UserProgress.findByIdAndUpdate(did._id, update)

    const sub = {
        userId: req.user._id,
        lessonId: lesson._id,
        lessonTitle: lesson.title,
        lessonSlug: lesson.slug,
        topicTitle: topic.title,
        topicSlug: topic.slug,
        correctCount: corCnt,
        totalCount: exercises.length,
        totalPoints: totalP,
        earnedPoints: ttlEarnedP,
        score: sc,
        status: stt,
        passThreshold: lesson.passThreshold ?? 70,
        earnedXp: eXp,
        attemptNumber: previousAttempts + 1,
    }

    const submission = await Submission.create(sub);
    for (let i = 0; i < subAnsList.length; i++)
        subAnsList[i].submissionId = submission._id;
    const submissionAnswerList = await SubmissionAnswer.create(subAnsList);
    // const a = UserProgress.updateOne(
    //     {   userId: req.user._id,
    //         lessonId: lessonId,
    //     }, 
    //     {
    //         status: 'in_progress'
    //     }
    // )
    const streakResult = await updateStreak(req.user._id, submittedAt);


    res.status(201).json({
      success: true,
      data: { submission, submissionAnswerList, streak: streakResult },
    });
  } catch (err) {
    next(err);
  }
};
