/**
 * Custom error có statusCode để global error handler trả đúng HTTP code.
 * Dùng:  throw new AppError('Email already exists', 409);
 */
export default class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // phân biệt với bug runtime
    Error.captureStackTrace?.(this, this.constructor);
  }
}
