# Hướng dẫn seed dữ liệu

## File quan trọng

| File | Vai trò |
|------|---------|
| `src/seed/seedData.js` | **Dữ liệu mẫu** — sửa file này khi thêm topic, lesson, từ vựng, bài tập |
| `src/seed/seed.js` | Script đọc `seedData.js` và ghi vào MongoDB |

## Lệnh chạy

```bash
# Lần đầu: tạo user demo + nội dung học
npm run seed

# Đã có topic trong DB: bỏ qua nội dung (chỉ thêm user demo nếu chưa có)

# Xóa toàn bộ nội dung học + user demo, seed lại từ đầu
npm run seed:reset
```

Cần file `.env` có `MONGODB_URI` (giống khi chạy server).

## Tài khoản demo (sau seed)

| Email | Password | Role |
|-------|----------|------|
| `student@demo.com` | `123456` | user |
| `admin@demo.com` | `123456` | admin |

Dùng để test login: `POST /api/auth/login`

## Dữ liệu được tạo

- **2 topics:** Greetings, Family  
- **3 lessons:** Saying Hello, How Are You?, Family Members  
- **8 từ vựng**  
- **5 bài tập** (multiple_choice + fill_blank)

## Thêm nội dung mới

1. Mở `src/seed/seedData.js`
2. Thêm object vào `TOPICS`, `LESSONS`, `VOCABULARIES`, hoặc `EXERCISES`
3. Chạy `npm run seed:reset`

Ví dụ lesson mới phải có `topicSlug` trùng slug topic đã có.  
Từ vựng / exercise dùng `lessonSlug` trùng slug lesson.

## Lưu ý

- `seed:reset` **xóa** tất cả Topic, Lesson, Vocabulary, Exercise, UserProgress và user có email trong `DEMO_USERS`.
- User đăng ký thật (email khác demo) **không** bị xóa.
- Không chạy seed trên production nếu không chắc chắn.
