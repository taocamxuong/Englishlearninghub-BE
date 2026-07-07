import { UserProgress } from '../models/index.js';

// export const getUserProgresses = async (req, res, next) => {
//     try {
//       const userprogs = await UserProgress.find().select('-password').sort({ createdAt: -1 });
//       res.json({ success: true, data: { userprogs } });
//     } catch (err) {
//       next(err);
//     }
// };

export const getUserProgress = async (req, res, next) => {
    try {
      const userprog = await UserProgress.findById(req.params.id);
      res.json({ success: true, data: { userprog } });
    } catch (err) {
      next(err);
    }
};