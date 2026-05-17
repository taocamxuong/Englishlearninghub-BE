import 'dotenv/config';   // Load .env trước tất cả mọi thứ — phải là dòng đầu tiên
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});