/**
 * Chạy seed: npm run seed
 * Xóa dữ liệu học + user demo rồi seed lại: npm run seed:reset
 *
 * Dữ liệu nằm trong ./seedData.js — sửa file đó khi cần thêm nội dung.
 */
import 'dotenv/config';
import mongoose from 'mongoose';

import connectDB from '../config/db.js';
import {
  User,
  Topic,
  Lesson,
  Vocabulary,
  Exercise,
  UserProgress,
} from '../models/index.js';
import { ensureUserProgressForAllLessons } from '../utils/userProgress.js';
import {
  DEMO_USERS,
  TOPICS,
  LESSONS,
  VOCABULARIES,
  EXERCISES,
} from './seedData.js';

const DEMO_EMAILS = DEMO_USERS.map((u) => u.email);

const shouldReset = process.argv.includes('--reset');

async function clearLearningData() {
  await Promise.all([
    UserProgress.deleteMany({}),
    Exercise.deleteMany({}),
    Vocabulary.deleteMany({}),
    Lesson.deleteMany({}),
    Topic.deleteMany({}),
  ]);
  await User.deleteMany({ email: { $in: DEMO_EMAILS } });
  console.log('🗑️  Cleared topics, lessons, vocabularies, exercises, progress, demo users');
}

async function seedUsers() {
  for (const data of DEMO_USERS) {
    const exists = await User.findOne({ email: data.email });
    if (exists) {
      console.log(`   ⏭️  User ${data.email} already exists`);
      continue;
    }
    await User.create(data);
    console.log(`   ✅ User ${data.email} (${data.role})`);
  }
}

async function seedContent() {
  const topicCount = await Topic.countDocuments();
  if (topicCount > 0) {
    console.log('⏭️  Topics already exist. Use: npm run seed:reset');
    return;
  }

  const topicIdBySlug = new Map();
  for (const t of TOPICS) {
    const doc = await Topic.create(t);
    topicIdBySlug.set(t.slug, doc._id);
    console.log(`   ✅ Topic: ${t.title}`);
  }

  const lessonIdBySlug = new Map();
  for (const l of LESSONS) {
    const topicId = topicIdBySlug.get(l.topicSlug);
    if (!topicId) throw new Error(`Unknown topicSlug: ${l.topicSlug}`);
    const { topicSlug, ...rest } = l;
    const doc = await Lesson.create({ ...rest, topicId });
    lessonIdBySlug.set(l.slug, doc._id);
    console.log(`   ✅ Lesson: ${l.title}`);
  }

  for (const v of VOCABULARIES) {
    const lessonId = lessonIdBySlug.get(v.lessonSlug);
    if (!lessonId) throw new Error(`Unknown lessonSlug: ${v.lessonSlug}`);
    const { lessonSlug, ...rest } = v;
    await Vocabulary.create({ ...rest, lessonId });
  }
  console.log(`   ✅ Vocabularies: ${VOCABULARIES.length} words`);

  for (const e of EXERCISES) {
    const lessonId = lessonIdBySlug.get(e.lessonSlug);
    if (!lessonId) throw new Error(`Unknown lessonSlug: ${e.lessonSlug}`);
    const { lessonSlug, ...rest } = e;
    await Exercise.create({ ...rest, lessonId });
  }
  console.log(`   ✅ Exercises: ${EXERCISES.length} questions`);
}

async function run() {
  console.log(shouldReset ? '🌱 Seed (reset mode)\n' : '🌱 Seed\n');
  await connectDB();

  if (shouldReset) {
    await clearLearningData();
  }

  console.log('👤 Users:');
  await seedUsers();

  console.log('\n📚 Content:');
  await seedContent();

  console.log('\n📈 User progress (eager):');
  const users = await User.find().select('_id email');
  for (const user of users) {
    await ensureUserProgressForAllLessons(user._id);
    console.log(`   ✅ Progress rows for ${user.email}`);
  }

  console.log('\n✨ Done.');
  console.log('   Login demo: student@demo.com / 123456');
  console.log('   Admin demo: admin@demo.com / 123456');
}

run()
  .catch((err) => {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  });
