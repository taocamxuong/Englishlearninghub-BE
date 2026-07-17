import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import vocalRoutes from './routes/vocalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import exerciseRoutes from './routes/exerciseRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import wordbankRoutes from './routes/wordbankRoutes.js';

const app = express();

// --- Middlewares bảo mật & tiện ích ---
app.use(helmet());           // Tự động set các HTTP security headers
app.use(cors());             // Cho phép cross-origin requests
app.use(morgan('dev'));       // Log mỗi request ra terminal: GET /api/... 200 5ms

// --- Parse body của request ---
app.use(express.json());                        // Đọc body dạng JSON
app.use(express.urlencoded({ extended: true })); // Đọc body dạng form

// --- Routes ---
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/topic', topicRoutes);
app.use('/api/lesson',lessonRoutes);
app.use('/api/vocal',vocalRoutes);
app.use('/api/user',userRoutes);
app.use('/api/exercise',exerciseRoutes);
app.use('/api/submit', submissionRoutes);
app.use('/api/wordbank', wordbankRoutes);
// --- 404 handler: request đến route không tồn tại ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// --- Global error handler: phải có đúng 4 tham số ---
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Mongoose validation error -> 400 với danh sách lỗi field
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
  }

  // Duplicate key (vd: email trùng) -> 409
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate ${field}: ${err.keyValue?.[field]}`;
  }

  // CastError: vd ObjectId không hợp lệ
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  if (statusCode >= 500) {
    console.error('❌', err);
  }

  res.status(statusCode).json({ success: false, message });
});

export default app;