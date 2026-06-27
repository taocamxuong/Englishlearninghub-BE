/**
 * Dữ liệu mẫu cho app học tiếng Anh (beginner).
 * Chỉnh file này khi muốn thêm topic/lesson/từ/bài tập — rồi chạy: npm run seed
 *
 * Quan hệ dùng slug (không cần ObjectId):
 *   topic.slug → lesson.topicSlug
 *   lesson.slug → vocabulary.lessonSlug, exercise.lessonSlug
 */

export const DEMO_USERS = [
  {
    email: 'student@demo.com',
    password: '123456',
    name: 'Demo Student',
    level: 'beginner',
    role: 'user',
  },
  {
    email: 'admin@demo.com',
    password: '123456',
    name: 'Demo Admin',
    level: 'beginner',
    role: 'admin',
  },
];

export const TOPICS = [
  {
    title: 'Greetings',
    slug: 'greetings',
    description: 'Chào hỏi và giới thiệu bản thân cơ bản',
    level: 'beginner',
    order: 1,
    iconUrl: '',
  },
  {
    title: 'Family',
    slug: 'family',
    description: 'Từ vựng về gia đình và người thân',
    level: 'beginner',
    order: 2,
    iconUrl: '',
  },
];

export const LESSONS = [
  {
    topicSlug: 'greetings',
    title: 'Saying Hello',
    slug: 'saying-hello',
    description: 'Cách chào hỏi trong ngày',
    content: `## Mục tiêu bài học
Sau bài này bạn sẽ biết chào hỏi cơ bản và giới thiệu tên bằng tiếng Anh.

## Kiến thức chính
- **Hello** — xin chào (lịch sự, dùng với ai cũng được)
- **Hi** — chào (thân mật, bạn bè)
- **Goodbye** — tạm biệt
- **Nice to meet you** — rất vui được gặp bạn

## Mẫu hội thoại
A: Hello! My name is Anna.
B: Hi Anna, I'm Tom. Nice to meet you.
A: Nice to meet you too, Tom. Goodbye!
B: Goodbye!

## Ghi chú cho người Việt
"Hello" và "Hi" đều dùng được khi gặp người lạ hoặc bạn bè. "Hi" ngắn gọn và thân mật hơn.

## Ôn tập nhanh
Chuyển sang tab **Từ vựng** để xem phát âm và ví dụ, rồi làm **Bài tập** để luyện tập.`,
    order: 1,
    xpReward: 10,
    passThreshold: 70,
  },
  {
    topicSlug: 'greetings',
    title: 'How Are You?',
    slug: 'how-are-you',
    description: 'Hỏi thăm sức khỏe',
    content: `## Mục tiêu bài học
Học cách hỏi thăm và trả lời lịch sự khi gặp ai đó.

## Kiến thức chính
- **How are you?** — Bạn khỏe không? / Bạn thế nào?
- **I am fine, thank you.** — Tôi khỏe, cảm ơn.
- **And you?** — Còn bạn thì sao?
- **Not bad.** — Cũng ổn / Không tệ.

## Mẫu hội thoại
A: Hi Linh! How are you?
B: I am fine, thank you. And you?
A: Not bad, thanks.

## Bảng câu hỏi & trả lời
| English | Tiếng Việt |
| How are you? | Bạn khỏe không? |
| I am fine. | Tôi khỏe. |
| Thank you. | Cảm ơn. |

## Ghi chú cho người Việt
"How are you?" thường chỉ là câu hỏi xã giao — trả lời ngắn gọn là đủ, không cần kể chi tiết cuộc sống.`,
    order: 2,
    xpReward: 10,
    passThreshold: 70,
  },
  {
    topicSlug: 'family',
    title: 'Family Members',
    slug: 'family-members',
    description: 'Bố, mẹ, anh chị em',
    content: `## Mục tiêu bài học
Biết tên các thành viên trong gia đình bằng tiếng Anh và dùng trong câu đơn giản.

## Kiến thức chính
- **mother** — mẹ
- **father** — bố
- **sister** — chị / em gái
- **brother** — anh / em trai
- **family** — gia đình

## Mẫu câu
- My mother is a teacher. — Mẹ tôi là giáo viên.
- His father works in Hanoi. — Bố anh ấy làm việc ở Hà Nội.
- I have one sister. — Tôi có một chị/em gái.

## Ghi chú cho người Việt
Tiếng Anh không phân biệt "anh/chị" và "em" — đều dùng **brother** hoặc **sister**. Ngữ cảnh sẽ làm rõ thứ tự sinh.

## Ôn tập nhanh
Hãy thử giới thiệu gia đình bạn bằng 2–3 câu tiếng Anh trước khi làm bài tập.`,
    order: 1,
    xpReward: 15,
    passThreshold: 70,
  },
];

export const VOCABULARIES = [
  // saying-hello
  {
    lessonSlug: 'saying-hello',
    word: 'hello',
    meaning: 'xin chào',
    pronunciation: '/həˈloʊ/',
    partOfSpeech: 'interjection',
    example: 'Hello, nice to meet you.',
    exampleTranslation: 'Xin chào, rất vui được gặp bạn.',
  },
  {
    lessonSlug: 'saying-hello',
    word: 'hi',
    meaning: 'chào (thân mật)',
    pronunciation: '/haɪ/',
    partOfSpeech: 'interjection',
    example: 'Hi, Tom!',
    exampleTranslation: 'Chào Tom!',
  },
  {
    lessonSlug: 'saying-hello',
    word: 'goodbye',
    meaning: 'tạm biệt',
    pronunciation: '/ˌɡʊdˈbaɪ/',
    partOfSpeech: 'interjection',
    example: 'Goodbye, see you tomorrow.',
    exampleTranslation: 'Tạm biệt, hẹn ngày mai.',
  },
  // how-are-you
  {
    lessonSlug: 'how-are-you',
    word: 'fine',
    meaning: 'khỏe, ổn',
    pronunciation: '/faɪn/',
    partOfSpeech: 'adjective',
    example: 'I am fine, thank you.',
    exampleTranslation: 'Tôi khỏe, cảm ơn.',
  },
  {
    lessonSlug: 'how-are-you',
    word: 'thank you',
    meaning: 'cảm ơn',
    pronunciation: '/θæŋk juː/',
    partOfSpeech: 'phrase',
    example: 'Thank you for your help.',
    exampleTranslation: 'Cảm ơn vì sự giúp đỡ của bạn.',
  },
  // family-members
  {
    lessonSlug: 'family-members',
    word: 'mother',
    meaning: 'mẹ',
    pronunciation: '/ˈmʌðər/',
    partOfSpeech: 'noun',
    example: 'My mother is a teacher.',
    exampleTranslation: 'Mẹ tôi là giáo viên.',
  },
  {
    lessonSlug: 'family-members',
    word: 'father',
    meaning: 'bố',
    pronunciation: '/ˈfɑːðər/',
    partOfSpeech: 'noun',
    example: 'His father works in Hanoi.',
    exampleTranslation: 'Bố anh ấy làm việc ở Hà Nội.',
  },
  {
    lessonSlug: 'family-members',
    word: 'sister',
    meaning: 'chị / em gái',
    pronunciation: '/ˈsɪstər/',
    partOfSpeech: 'noun',
    example: 'I have one sister.',
    exampleTranslation: 'Tôi có một chị/em gái.',
  },
];

export const EXERCISES = [
  {
    lessonSlug: 'saying-hello',
    type: 'multiple_choice',
    question: 'What does "hello" mean in Vietnamese?',
    options: [
      { key: 'A', text: 'xin chào' },
      { key: 'B', text: 'tạm biệt' },
      { key: 'C', text: 'cảm ơn' },
      { key: 'D', text: 'xin lỗi' },
    ],
    correctAnswer: 'A',
    explanation: '"Hello" = xin chào.',
    order: 1,
    points: 1,
  },
  {
    lessonSlug: 'saying-hello',
    type: 'fill_blank',
    question: 'Complete: "_____, my name is Linh."',
    options: [],
    correctAnswer: 'hello',
    explanation: 'Chào hỏi khi giới thiệu tên thường dùng Hello.',
    order: 2,
    points: 1,
  },
  {
    lessonSlug: 'how-are-you',
    type: 'multiple_choice',
    question: 'How do you answer "How are you?" politely?',
    options: [
      { key: 'A', text: 'I am fine, thank you.' },
      { key: 'B', text: 'Goodbye!' },
      { key: 'C', text: 'My name is Anna.' },
      { key: 'D', text: 'See you!' },
    ],
    correctAnswer: 'A',
    explanation: 'Câu trả lời lịch sự phổ biến: I am fine, thank you.',
    order: 1,
    points: 1,
  },
  {
    lessonSlug: 'family-members',
    type: 'multiple_choice',
    question: 'What is "mother" in Vietnamese?',
    options: [
      { key: 'A', text: 'mẹ' },
      { key: 'B', text: 'bố' },
      { key: 'C', text: 'anh trai' },
      { key: 'D', text: 'bà' },
    ],
    correctAnswer: 'A',
    explanation: 'Mother = mẹ.',
    order: 1,
    points: 1,
  },
  {
    lessonSlug: 'family-members',
    type: 'fill_blank',
    question: 'My _____ works in Hanoi. (bố)',
    options: [],
    correctAnswer: 'father',
    explanation: 'Father = bố.',
    order: 2,
    points: 1,
  },
];
