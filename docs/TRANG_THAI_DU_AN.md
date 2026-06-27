# Trạng thái dự án — English Learning Hub (Backend)

> Cập nhật theo codebase hiện tại. App học tiếng Anh cơ bản, Express + MongoDB (Mongoose).

---

## 1. Tổng quan

| Mục | Chi tiết |
|-----|----------|
| Tên package | `englishlearninghub-be` |
| Runtime | Node.js (ES modules — `"type": "module"`) |
| Framework | Express 5 |
| Database | MongoDB qua **Mongoose** |
| Entry point | `src/server.js` → `src/app.js` |

**Scripts:**

```bash
npm run dev    # nodemon src/server.js
npm start      # node src/server.js
```

---

## 2. Cấu trúc thư mục `src/`

```
src/
├── app.js                 # Express app, middleware, routes, error handler
├── server.js              # Load .env, connect DB, listen PORT
├── config/
│   └── db.js              # Kết nối Mongoose
├── controllers/
│   └── authController.js  # register, login, getMe
├── middlewares/
│   └── auth.js            # protect, restrictTo (chưa gắn route nào)
├── models/
│   ├── User.js
│   ├── Topic.js
│   ├── Lesson.js
│   ├── Vocabulary.js
│   ├── Exercise.js
│   ├── UserProgress.js
│   └── index.js           # export tập trung
├── routes/
│   └── authRoutes.js
├── services/              # (trống)
└── utils/
    ├── AppError.js
    └── jwt.js
```

---

## 3. Đã làm xong

### 3.1. Hạ tầng server

| Chức năng | File | Ghi chú |
|-----------|------|---------|
| Load biến môi trường | `server.js` | `import 'dotenv/config'` |
| Chờ DB rồi mới listen | `server.js` | `await connectDB()` trước `app.listen()` |
| Security headers | `app.js` | `helmet` |
| CORS | `app.js` | `cors()` |
| Log request | `app.js` | `morgan('dev')` |
| Parse JSON / form | `app.js` | `express.json()`, `urlencoded` |
| Health check | `app.js` | `GET /health` |
| 404 handler | `app.js` | Route không tồn tại |
| Global error handler | `app.js` | `AppError`, Mongoose `ValidationError`, duplicate key `11000`, `CastError` |

### 3.2. Kết nối database

| Chức năng | File | Ghi chú |
|-----------|------|---------|
| Connect Mongoose | `config/db.js` | `MONGODB_URI` từ `.env` |
| Timeout chọn server | `config/db.js` | `serverSelectionTimeoutMS: 10_000` |
| Thoát process khi lỗi connect | `config/db.js` | `process.exit(1)` |
| Log khi disconnect | `config/db.js` | `mongoose.connection.on('disconnected')` |
| Trả về `conn` (tùy chọn) | `config/db.js` | Caller có thể dùng hoặc bỏ qua |

### 3.3. Models (schema — chưa có API CRUD)

Quan hệ dữ liệu:

```
User ──► UserProgress ──► Lesson ◄── Topic
                            │
                            ├──► Vocabulary
                            └──► Exercise
```

| Model | Collection | Điểm nổi bật |
|-------|------------|-------------|
| **User** | `users` | Email unique, hash password (`pre('save')`), `comparePassword()`, `select: false` cho password, `toJSON` ẩn password, `level`: beginner/elementary, `role`: user/admin, `xp`, `streak` |
| **Topic** | `topics` | Chủ đề lớn, `slug` unique, `order`, `isActive` |
| **Lesson** | `lessons` | `topicId` ref Topic, `content`, `xpReward`, `slug` unique |
| **Vocabulary** | `vocabularies` | `lessonId` ref Lesson, IPA, audio, ví dụ; index unique `(lessonId, word)` |
| **Exercise** | `exercises` | 4 loại: multiple_choice, fill_blank, matching, listening; `correctAnswer` Mixed |
| **UserProgress** | `userprogresses` | `status`, `score`, `attempts`; index unique `(userId, lessonId)` |

Export: `import { User, Topic, ... } from './models/index.js'`

### 3.4. Xác thực (Auth) — có API

| Endpoint | Method | Auth | Mô tả |
|----------|--------|------|--------|
| `/health` | GET | Không | Kiểm tra server sống |
| `/api/auth/register` | POST | Không | Đăng ký: `email`, `password`, `name`, `level?` → user + JWT |
| `/api/auth/login` | POST | Không | Đăng nhập → user + JWT |
| `/api/auth/me` | GET | Bearer JWT | Lấy profile user hiện tại |

**Utils / middleware hỗ trợ auth:**

| Thành phần | File | Mô tả |
|------------|------|--------|
| `signToken` / `verifyToken` | `utils/jwt.js` | Payload: `{ id, role }`, hết hạn theo `JWT_EXPIRES_IN` |
| `AppError` | `utils/AppError.js` | Error có `statusCode` |
| `protect` | `middlewares/auth.js` | Gắn `req.user` từ JWT |
| `restrictTo(...roles)` | `middlewares/auth.js` | Phân quyền admin — **đã code, chưa dùng ở route nào** |

**Format response thường gặp:**

```json
{ "success": true, "data": { ... } }
{ "success": false, "message": "..." }
```

---

## 4. Chưa làm (hoặc chỉ có schema)

| Hạng mục | Trạng thái |
|----------|------------|
| CRUD Topic / Lesson / Vocabulary / Exercise | Chưa có route, controller |
| API học: danh sách topic, chi tiết lesson kèm từ vựng + bài tập | Chưa |
| Nộp bài / chấm điểm / cập nhật `UserProgress` | Chưa |
| Cộng `xp`, `streak` khi hoàn thành lesson | Chưa |
| Route dùng `restrictTo('admin')` | Chưa |
| Thư mục `services/` | Trống |
| Seed data mẫu | Chưa |
| Upload file (audio, ảnh) | Chưa |
| Refresh token / logout / đổi mật khẩu | Chưa |
| Validation body (vd. Joi/Zod) | Chỉ validate thủ công trong controller + Mongoose schema |
| Tests (unit/e2e) | Chưa |
| API docs (Swagger) | Chưa |

---

## 5. Biến môi trường (`.env`)

| Biến | Bắt buộc | Mục đích |
|------|----------|----------|
| `PORT` | Không (mặc định 3000) | Cổng server |
| `NODE_ENV` | Không | Log môi trường |
| `MONGODB_URI` | Có | URI MongoDB (nên có tên DB, **không** bọc backtick) |
| `JWT_SECRET` | Có | Ký JWT |
| `JWT_EXPIRES_IN` | Không (mặc định `7d`) | Thời hạn token |

`.gitignore` hiện có: `node_modules/`, `.env`

---

## 6. Dependencies chính

| Package | Dùng cho |
|---------|----------|
| express | HTTP server |
| mongoose | ODM + models |
| bcryptjs | Hash password (User model) |
| jsonwebtoken | JWT auth |
| dotenv | Biến môi trường |
| cors, helmet, morgan | Middleware |
| mongodb | Cài kèm (driver); app **không** dùng trực tiếp, chỉ Mongoose |
| nodemon | Dev reload |

---

## 7. Gợi ý bước tiếp theo

1. CRUD Topic + Lesson (admin: `protect` + `restrictTo('admin')`)
2. API public: `GET /api/topics`, `GET /api/lessons/:id` (populate vocabulary, exercises — có thể ẩn `correctAnswer`)
3. `POST /api/lessons/:id/submit` → chấm điểm, `UserProgress`, cộng `xp`
4. Script seed vài topic/lesson cho beginner
5. Đổi `JWT_SECRET` production, đảm bảo `.env` không commit

---

## 8. Test nhanh Auth

```bash
# Đăng ký
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456","name":"Test User"}'

# Đăng nhập (lấy token)
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'

# Profile (thay TOKEN)
curl http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

---

*Tài liệu này mô tả code trong repo tại thời điểm tạo file; khi thêm feature mới nên cập nhật lại mục 3–4.*
