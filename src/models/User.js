import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false, // mặc định không trả password khi query
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    level: {
      type: String,
      enum: ['beginner', 'elementary'],
      default: 'beginner',
    },
    avatarUrl: { type: String, default: '' },
    xp: { type: Number, default: 0, min: 0 },
    streak: { type: Number, default: 0, min: 0 },
    /** Ngày calendar cuối cùng được tính streak (timezone Asia/Ho_Chi_Minh). null = chưa từng học. */
    lastStreakDate: { type: Date, default: null },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

// Hash password trước khi lưu nếu nó vừa thay đổi
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Method so sánh password khi login
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

// Khi trả JSON, ẩn password & __v
userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export default mongoose.model('User', userSchema);
