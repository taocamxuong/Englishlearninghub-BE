import nodemailer from 'nodemailer';
import AppError from './AppError.js';

let transporter;

function getTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new AppError('Email service is not configured (EMAIL_USER, EMAIL_PASS)', 503);
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  return transporter;
}

/** Gửi email plain text qua Gmail SMTP (App Password). */
export default async function sendEmail(to, subject, text) {
  const transport = getTransporter();

  await transport.sendMail({
    from: `"English Learning Hub" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
}
