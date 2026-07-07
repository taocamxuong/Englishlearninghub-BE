import { User } from '../models/index.js';
import AppError from './AppError.js';

const STREAK_TIMEZONE = 'Asia/Ho_Chi_Minh';

/** YYYY-MM-DD theo calendar ngày ở timezone cố định. */
export function toDayKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: STREAK_TIMEZONE }).format(date);
}

/** Mốc 00:00 của dayKey theo Asia/Ho_Chi_Minh (lưu vào lastStreakDate). */
export function dayKeyToDate(dayKey) {
  return new Date(`${dayKey}T00:00:00+07:00`);
}

function shiftDayKey(dayKey, days) {
  const shifted = dayKeyToDate(dayKey);
  shifted.setTime(shifted.getTime() + days * 24 * 60 * 60 * 1000);
  return toDayKey(shifted);
}

/**
 * Cập nhật streak sau khi user submit bài (pass hoặc fail).
 * Tối đa +1 streak mỗi ngày calendar (Asia/Ho_Chi_Minh).
 */
export async function updateStreak(userId, referenceDate = new Date()) {
  const user = await User.findById(userId).select('streak lastStreakDate');
  if (!user) throw new AppError('User not found', 404);

  const todayKey = toDayKey(referenceDate);
  const lastKey = user.lastStreakDate ? toDayKey(user.lastStreakDate) : null;
  console.log(lastKey, todayKey);
  if (lastKey === todayKey) {
    return {
      streak: user.streak,
      lastStreakDate: user.lastStreakDate,
      streakUpdated: false,
    };
  }

  let streak = 1;
  if (lastKey === shiftDayKey(todayKey, -1)) {
    streak = user.streak + 1;
  }

  const lastStreakDate = dayKeyToDate(todayKey);
  user.streak = streak;
  user.lastStreakDate = lastStreakDate;
  await user.save();

  return {
    streak,
    lastStreakDate,
    streakUpdated: true,
  };
}
