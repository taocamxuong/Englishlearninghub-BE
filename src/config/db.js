import mongoose from 'mongoose';

/**
 * Kết nối MongoDB qua Mongoose.
 * - Trả về connection để caller có thể chờ.
 * - Nếu lỗi: log + exit để PM2/Docker tự restart, tránh server chạy "cụt" không có DB.
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is not defined in .env');

    const conn = await mongoose.connect(uri, {
      // Mongoose 8+ không cần useNewUrlParser/useUnifiedTopology nữa
      serverSelectionTimeoutMS: 10_000,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected');
});

export default connectDB;
