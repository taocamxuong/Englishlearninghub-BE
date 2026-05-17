import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

// --- Middlewares bảo mật & tiện ích ---
app.use(helmet());           // Tự động set các HTTP security headers
app.use(cors());             // Cho phép cross-origin requests
app.use(morgan('dev'));       // Log mỗi request ra terminal: GET /api/... 200 5ms

// --- Parse body của request ---
app.use(express.json());                        // Đọc body dạng JSON
app.use(express.urlencoded({ extended: true })); // Đọc body dạng form

// --- Routes (sẽ thêm dần ở các bước sau) ---
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// --- 404 handler: request đến route không tồn tại ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// --- Global error handler: phải có đúng 4 tham số ---
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;