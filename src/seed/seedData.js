/**
 * Dữ liệu mẫu (~20 topic) cho app học tiếng Anh beginner / elementary.
 * Quan hệ dùng slug:
 *   topic.slug → lesson.topicSlug
 *   lesson.slug → vocabulary.lessonSlug, exercise.lessonSlug
 *
 * Seed: npm run seed | Reset: npm run seed:reset
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

function lessonContent({ goal, points, dialogue, tip }) {
  const pointLines = points.map((p) => `- **${p.en}** — ${p.vi}`).join('\n');
  return `## Mục tiêu bài học
${goal}

## Kiến thức chính
${pointLines}

## Mẫu hội thoại / câu
${dialogue}

## Ghi chú cho người Việt
${tip}

## Ôn tập nhanh
Xem tab **Từ vựng**, rồi làm **Bài tập** để luyện.`;
}

function mc(lessonSlug, order, question, options, correctKey, explanation, points = 1) {
  return {
    lessonSlug,
    type: 'multiple_choice',
    question,
    options: options.map((text, i) => ({ key: String.fromCharCode(65 + i), text })),
    correctAnswer: correctKey,
    explanation,
    order,
    points,
  };
}

function fill(lessonSlug, order, question, correctAnswer, explanation, points = 1) {
  return {
    lessonSlug,
    type: 'fill_blank',
    question,
    options: [],
    correctAnswer,
    explanation,
    order,
    points,
  };
}

function vocab(lessonSlug, word, meaning, pronunciation, partOfSpeech, example, exampleTranslation) {
  return { lessonSlug, word, meaning, pronunciation, partOfSpeech, example, exampleTranslation };
}

export const TOPICS = [
  { title: 'Greetings', slug: 'greetings', description: 'Chào hỏi và giới thiệu bản thân cơ bản', level: 'beginner', order: 1, iconUrl: '' },
  { title: 'Family', slug: 'family', description: 'Từ vựng về gia đình và người thân', level: 'beginner', order: 2, iconUrl: '' },
  { title: 'Numbers', slug: 'numbers', description: 'Số đếm cơ bản từ 1 đến 20', level: 'beginner', order: 3, iconUrl: '' },
  { title: 'Colors', slug: 'colors', description: 'Màu sắc thường gặp trong đời sống', level: 'beginner', order: 4, iconUrl: '' },
  { title: 'Food & Drinks', slug: 'food-drinks', description: 'Đồ ăn, đồ uống và gọi món đơn giản', level: 'beginner', order: 5, iconUrl: '' },
  { title: 'School', slug: 'school', description: 'Trường lớp, môn học và đồ dùng học tập', level: 'beginner', order: 6, iconUrl: '' },
  { title: 'Daily Routines', slug: 'daily-routines', description: 'Thói quen hàng ngày: thức dậy, ăn, làm việc', level: 'beginner', order: 7, iconUrl: '' },
  { title: 'Weather', slug: 'weather', description: 'Thời tiết và cách hỏi đáp cơ bản', level: 'beginner', order: 8, iconUrl: '' },
  { title: 'Jobs', slug: 'jobs', description: 'Nghề nghiệp phổ biến và câu giới thiệu', level: 'beginner', order: 9, iconUrl: '' },
  { title: 'Clothes', slug: 'clothes', description: 'Quần áo và phụ kiện thường dùng', level: 'beginner', order: 10, iconUrl: '' },
  { title: 'Home', slug: 'home', description: 'Các phòng và đồ vật trong nhà', level: 'beginner', order: 11, iconUrl: '' },
  { title: 'Animals', slug: 'animals', description: 'Động vật quen thuộc và thú cưng', level: 'beginner', order: 12, iconUrl: '' },
  { title: 'Body & Health', slug: 'body-health', description: 'Bộ phận cơ thể và sức khỏe cơ bản', level: 'elementary', order: 13, iconUrl: '' },
  { title: 'Hobbies', slug: 'hobbies', description: 'Sở thích và hoạt động giải trí', level: 'elementary', order: 14, iconUrl: '' },
  { title: 'Travel', slug: 'travel', description: 'Du lịch, khách sạn và hỏi đường', level: 'elementary', order: 15, iconUrl: '' },
  { title: 'Time & Days', slug: 'time-days', description: 'Giờ, ngày trong tuần và lịch', level: 'beginner', order: 16, iconUrl: '' },
  { title: 'Shopping', slug: 'shopping', description: 'Mua sắm, hỏi giá và thanh toán', level: 'elementary', order: 17, iconUrl: '' },
  { title: 'Transportation', slug: 'transportation', description: 'Phương tiện giao thông hàng ngày', level: 'beginner', order: 18, iconUrl: '' },
  { title: 'Friends', slug: 'friends', description: 'Bạn bè, lời mời và kế hoạch chung', level: 'elementary', order: 19, iconUrl: '' },
  { title: 'Feelings', slug: 'feelings', description: 'Cảm xúc và cách diễn đạt cảm xúc', level: 'elementary', order: 20, iconUrl: '' },
];

export const LESSONS = [
  // --- Greetings ---
  {
    topicSlug: 'greetings',
    title: 'Saying Hello',
    slug: 'saying-hello',
    description: 'Cách chào hỏi trong ngày',
    content: lessonContent({
      goal: 'Sau bài này bạn sẽ biết chào hỏi cơ bản và giới thiệu tên bằng tiếng Anh.',
      points: [
        { en: 'Hello', vi: 'xin chào (lịch sự)' },
        { en: 'Hi', vi: 'chào (thân mật)' },
        { en: 'Goodbye', vi: 'tạm biệt' },
        { en: 'Nice to meet you', vi: 'rất vui được gặp bạn' },
      ],
      dialogue: `A: Hello! My name is Anna.
B: Hi Anna, I'm Tom. Nice to meet you.
A: Nice to meet you too. Goodbye!`,
      tip: '"Hello" và "Hi" đều dùng được; "Hi" thân mật hơn.',
    }),
    order: 1,
    xpReward: 10,
    passThreshold: 70,
  },
  {
    topicSlug: 'greetings',
    title: 'How Are You?',
    slug: 'how-are-you',
    description: 'Hỏi thăm sức khỏe',
    content: lessonContent({
      goal: 'Học cách hỏi thăm và trả lời lịch sự khi gặp ai đó.',
      points: [
        { en: 'How are you?', vi: 'Bạn khỏe không?' },
        { en: 'I am fine, thank you.', vi: 'Tôi khỏe, cảm ơn.' },
        { en: 'And you?', vi: 'Còn bạn thì sao?' },
        { en: 'Not bad.', vi: 'Cũng ổn / Không tệ.' },
      ],
      dialogue: `A: Hi Linh! How are you?
B: I am fine, thank you. And you?
A: Not bad, thanks.`,
      tip: '"How are you?" thường là câu xã giao — trả lời ngắn gọn là đủ.',
    }),
    order: 2,
    xpReward: 10,
    passThreshold: 70,
  },
  // --- Family ---
  {
    topicSlug: 'family',
    title: 'Family Members',
    slug: 'family-members',
    description: 'Bố, mẹ, anh chị em',
    content: lessonContent({
      goal: 'Biết tên các thành viên trong gia đình và dùng trong câu đơn giản.',
      points: [
        { en: 'mother', vi: 'mẹ' },
        { en: 'father', vi: 'bố' },
        { en: 'sister', vi: 'chị / em gái' },
        { en: 'brother', vi: 'anh / em trai' },
      ],
      dialogue: `- My mother is a teacher.
- I have one sister and one brother.`,
      tip: 'Tiếng Anh không phân biệt anh/chị và em — dùng brother / sister.',
    }),
    order: 1,
    xpReward: 15,
    passThreshold: 70,
  },
  // --- Numbers ---
  {
    topicSlug: 'numbers',
    title: 'Counting 1–10',
    slug: 'counting-1-10',
    description: 'Đếm từ một đến mười',
    content: lessonContent({
      goal: 'Nắm số đếm 1–10 và dùng trong câu đơn giản.',
      points: [
        { en: 'one – five', vi: 'một đến năm' },
        { en: 'six – ten', vi: 'sáu đến mười' },
        { en: 'How many?', vi: 'Bao nhiêu?' },
      ],
      dialogue: `A: How many books do you have?
B: I have three books.`,
      tip: 'Số đứng trước danh từ: three books (không nói books three).',
    }),
    order: 1,
    xpReward: 10,
    passThreshold: 70,
  },
  {
    topicSlug: 'numbers',
    title: 'Counting 11–20',
    slug: 'counting-11-20',
    description: 'Đếm từ mười một đến hai mươi',
    content: lessonContent({
      goal: 'Học số 11–20 và cách đọc đúng.',
      points: [
        { en: 'eleven, twelve', vi: 'mười một, mười hai' },
        { en: 'thirteen – nineteen', vi: 'mười ba đến mười chín' },
        { en: 'twenty', vi: 'hai mươi' },
      ],
      dialogue: `A: How old is she?
B: She is fifteen.`,
      tip: 'teen = 13–19; fifteen / eighteen có cách viết đặc biệt.',
    }),
    order: 2,
    xpReward: 10,
    passThreshold: 70,
  },
  // --- Colors ---
  {
    topicSlug: 'colors',
    title: 'Basic Colors',
    slug: 'basic-colors',
    description: 'Đỏ, xanh, vàng và các màu cơ bản',
    content: lessonContent({
      goal: 'Gọi tên màu sắc phổ biến và mô tả đồ vật.',
      points: [
        { en: 'red / blue / green', vi: 'đỏ / xanh dương / xanh lá' },
        { en: 'yellow / black / white', vi: 'vàng / đen / trắng' },
        { en: 'What color is it?', vi: 'Nó màu gì?' },
      ],
      dialogue: `A: What color is your bag?
B: It is blue.`,
      tip: 'Tính từ màu đứng trước danh từ: a red car.',
    }),
    order: 1,
    xpReward: 10,
    passThreshold: 70,
  },
  // --- Food ---
  {
    topicSlug: 'food-drinks',
    title: 'Common Food',
    slug: 'common-food',
    description: 'Thức ăn hàng ngày',
    content: lessonContent({
      goal: 'Học tên món ăn phổ biến và nói thích / không thích.',
      points: [
        { en: 'rice / bread / noodles', vi: 'cơm / bánh mì / mì' },
        { en: 'I like…', vi: 'Tôi thích…' },
        { en: 'I don’t like…', vi: 'Tôi không thích…' },
      ],
      dialogue: `A: Do you like rice?
B: Yes, I like rice. I don't like noodles.`,
      tip: 'like + danh từ / like + V-ing đều đúng trong ngữ cảnh đơn giản.',
    }),
    order: 1,
    xpReward: 12,
    passThreshold: 70,
  },
  {
    topicSlug: 'food-drinks',
    title: 'Drinks & Ordering',
    slug: 'drinks-ordering',
    description: 'Đồ uống và gọi món',
    content: lessonContent({
      goal: 'Gọi đồ uống và dùng câu lịch sự khi order.',
      points: [
        { en: 'water / tea / coffee / juice', vi: 'nước / trà / cà phê / nước ép' },
        { en: 'I’d like…', vi: 'Tôi muốn… (lịch sự)' },
        { en: 'Please / Thank you', vi: 'Làm ơn / Cảm ơn' },
      ],
      dialogue: `A: What would you like to drink?
B: I'd like a cup of coffee, please.`,
      tip: '"I’d like" lịch sự hơn "I want" khi gọi món.',
    }),
    order: 2,
    xpReward: 12,
    passThreshold: 70,
  },
  // --- School ---
  {
    topicSlug: 'school',
    title: 'School Subjects',
    slug: 'school-subjects',
    description: 'Các môn học phổ biến',
    content: lessonContent({
      goal: 'Nói về môn học yêu thích và lịch học.',
      points: [
        { en: 'English / Math / Science', vi: 'Tiếng Anh / Toán / Khoa học' },
        { en: 'My favorite subject is…', vi: 'Môn yêu thích của tôi là…' },
      ],
      dialogue: `A: What is your favorite subject?
B: My favorite subject is English.`,
      tip: 'Tên môn học thường viết hoa: English, Math.',
    }),
    order: 1,
    xpReward: 10,
    passThreshold: 70,
  },
  {
    topicSlug: 'school',
    title: 'Classroom Objects',
    slug: 'classroom-objects',
    description: 'Đồ dùng trong lớp',
    content: lessonContent({
      goal: 'Gọi tên đồ dùng học tập cơ bản.',
      points: [
        { en: 'book / pen / pencil', vi: 'sách / bút mực / bút chì' },
        { en: 'bag / desk / board', vi: 'cặp / bàn / bảng' },
      ],
      dialogue: `A: Where is my pen?
B: It is on the desk.`,
      tip: 'on the desk = trên bàn; in the bag = trong cặp.',
    }),
    order: 2,
    xpReward: 10,
    passThreshold: 70,
  },
  // --- Daily Routines ---
  {
    topicSlug: 'daily-routines',
    title: 'Morning Routine',
    slug: 'morning-routine',
    description: 'Buổi sáng: thức dậy và chuẩn bị',
    content: lessonContent({
      goal: 'Mô tả thói quen buổi sáng bằng thì hiện tại đơn.',
      points: [
        { en: 'wake up / get up', vi: 'thức dậy / dậy khỏi giường' },
        { en: 'brush my teeth', vi: 'đánh răng' },
        { en: 'have breakfast', vi: 'ăn sáng' },
      ],
      dialogue: `I wake up at 6 o'clock.
Then I brush my teeth and have breakfast.`,
      tip: 'He/She + V-s: He wakes up at 6.',
    }),
    order: 1,
    xpReward: 12,
    passThreshold: 70,
  },
  // --- Weather ---
  {
    topicSlug: 'weather',
    title: 'Talking About Weather',
    slug: 'talking-about-weather',
    description: 'Nắng, mưa, lạnh, nóng',
    content: lessonContent({
      goal: 'Hỏi và mô tả thời tiết hôm nay.',
      points: [
        { en: 'sunny / rainy / cloudy', vi: 'nắng / mưa / nhiều mây' },
        { en: 'hot / cold', vi: 'nóng / lạnh' },
        { en: 'What’s the weather like?', vi: 'Thời tiết thế nào?' },
      ],
      dialogue: `A: What's the weather like today?
B: It is sunny and hot.`,
      tip: 'It is + adj: It is rainy. (Không nói The weather is rain.)',
    }),
    order: 1,
    xpReward: 10,
    passThreshold: 70,
  },
  // --- Jobs ---
  {
    topicSlug: 'jobs',
    title: 'Common Jobs',
    slug: 'common-jobs',
    description: 'Giáo viên, bác sĩ, kỹ sư…',
    content: lessonContent({
      goal: 'Nói nghề nghiệp của bản thân và người khác.',
      points: [
        { en: 'teacher / doctor / engineer', vi: 'giáo viên / bác sĩ / kỹ sư' },
        { en: 'I am a…', vi: 'Tôi là một…' },
        { en: 'What do you do?', vi: 'Bạn làm nghề gì?' },
      ],
      dialogue: `A: What do you do?
B: I am a teacher.`,
      tip: 'Dùng a/an trước nghề: a teacher, an engineer.',
    }),
    order: 1,
    xpReward: 12,
    passThreshold: 70,
  },
  // --- Clothes ---
  {
    topicSlug: 'clothes',
    title: 'Everyday Clothes',
    slug: 'everyday-clothes',
    description: 'Áo, quần, giày',
    content: lessonContent({
      goal: 'Gọi tên quần áo và nói đang mặc gì.',
      points: [
        { en: 'shirt / pants / dress', vi: 'áo sơ mi / quần / váy' },
        { en: 'shoes / hat', vi: 'giày / mũ' },
        { en: 'I am wearing…', vi: 'Tôi đang mặc…' },
      ],
      dialogue: `A: What are you wearing?
B: I am wearing a blue shirt and black pants.`,
      tip: 'pants / jeans thường số nhiều trong tiếng Anh.',
    }),
    order: 1,
    xpReward: 10,
    passThreshold: 70,
  },
  // --- Home ---
  {
    topicSlug: 'home',
    title: 'Rooms at Home',
    slug: 'rooms-at-home',
    description: 'Phòng khách, phòng ngủ, nhà bếp',
    content: lessonContent({
      goal: 'Nói về các phòng trong nhà.',
      points: [
        { en: 'living room / bedroom', vi: 'phòng khách / phòng ngủ' },
        { en: 'kitchen / bathroom', vi: 'nhà bếp / phòng tắm' },
        { en: 'Where is…?', vi: '… ở đâu?' },
      ],
      dialogue: `A: Where is your mother?
B: She is in the kitchen.`,
      tip: 'in the kitchen = trong bếp (dùng in + phòng).',
    }),
    order: 1,
    xpReward: 10,
    passThreshold: 70,
  },
  {
    topicSlug: 'home',
    title: 'Furniture',
    slug: 'furniture',
    description: 'Bàn, ghế, giường',
    content: lessonContent({
      goal: 'Gọi tên đồ nội thất cơ bản.',
      points: [
        { en: 'table / chair / bed', vi: 'bàn / ghế / giường' },
        { en: 'sofa / lamp', vi: 'ghế sofa / đèn' },
      ],
      dialogue: `There is a bed in my bedroom.
There are two chairs in the living room.`,
      tip: 'There is + số ít; There are + số nhiều.',
    }),
    order: 2,
    xpReward: 10,
    passThreshold: 70,
  },
  // --- Animals ---
  {
    topicSlug: 'animals',
    title: 'Pets & Farm Animals',
    slug: 'pets-farm-animals',
    description: 'Thú cưng và động vật trang trại',
    content: lessonContent({
      goal: 'Nói về thú cưng và động vật quen thuộc.',
      points: [
        { en: 'dog / cat / bird', vi: 'chó / mèo / chim' },
        { en: 'cow / chicken', vi: 'bò / gà' },
        { en: 'I have a…', vi: 'Tôi có một…' },
      ],
      dialogue: `A: Do you have a pet?
B: Yes, I have a dog.`,
      tip: 'a dog / a cat — dùng a trước phụ âm.',
    }),
    order: 1,
    xpReward: 10,
    passThreshold: 70,
  },
  // --- Body & Health ---
  {
    topicSlug: 'body-health',
    title: 'Body Parts',
    slug: 'body-parts',
    description: 'Đầu, tay, chân…',
    content: lessonContent({
      goal: 'Gọi tên bộ phận cơ thể cơ bản.',
      points: [
        { en: 'head / hand / foot', vi: 'đầu / tay / bàn chân' },
        { en: 'eye / ear / mouth', vi: 'mắt / tai / miệng' },
      ],
      dialogue: `I wash my hands.
She has blue eyes.`,
      tip: 'foot → feet (số nhiều bất quy tắc).',
    }),
    order: 1,
    xpReward: 12,
    passThreshold: 70,
  },
  {
    topicSlug: 'body-health',
    title: 'Feeling Sick',
    slug: 'feeling-sick',
    description: 'Nói khi không khỏe',
    content: lessonContent({
      goal: 'Nói về cảm giác không khỏe và triệu chứng đơn giản.',
      points: [
        { en: 'I have a headache.', vi: 'Tôi bị đau đầu.' },
        { en: 'I have a cold.', vi: 'Tôi bị cảm.' },
        { en: 'I feel sick.', vi: 'Tôi cảm thấy ốm.' },
      ],
      dialogue: `A: What's wrong?
B: I have a headache.`,
      tip: 'have a + bệnh/triệu chứng: have a fever, have a cold.',
    }),
    order: 2,
    xpReward: 12,
    passThreshold: 70,
  },
  // --- Hobbies ---
  {
    topicSlug: 'hobbies',
    title: 'My Hobbies',
    slug: 'my-hobbies',
    description: 'Sở thích cá nhân',
    content: lessonContent({
      goal: 'Nói về sở thích bằng I like / I enjoy.',
      points: [
        { en: 'reading / swimming / cooking', vi: 'đọc / bơi / nấu ăn' },
        { en: 'My hobby is…', vi: 'Sở thích của tôi là…' },
      ],
      dialogue: `A: What is your hobby?
B: My hobby is reading. I also like swimming.`,
      tip: 'like + V-ing: I like reading books.',
    }),
    order: 1,
    xpReward: 12,
    passThreshold: 70,
  },
  // --- Travel ---
  {
    topicSlug: 'travel',
    title: 'At the Airport',
    slug: 'at-the-airport',
    description: 'Từ vựng sân bay cơ bản',
    content: lessonContent({
      goal: 'Học từ vựng sân bay và câu hỏi đơn giản khi đi máy bay.',
      points: [
        { en: 'passport / ticket / luggage', vi: 'hộ chiếu / vé / hành lý' },
        { en: 'boarding pass', vi: 'thẻ lên máy bay' },
      ],
      dialogue: `A: Where is your passport?
B: It is in my bag.`,
      tip: 'luggage thường không đếm: my luggage (không my luggages).',
    }),
    order: 1,
    xpReward: 15,
    passThreshold: 70,
  },
  {
    topicSlug: 'travel',
    title: 'Asking for Directions',
    slug: 'asking-for-directions',
    description: 'Hỏi đường khi đi du lịch',
    content: lessonContent({
      goal: 'Hỏi và chỉ đường cơ bản.',
      points: [
        { en: 'turn left / turn right', vi: 'rẽ trái / rẽ phải' },
        { en: 'go straight', vi: 'đi thẳng' },
        { en: 'Excuse me, where is…?', vi: 'Xin lỗi, … ở đâu?' },
      ],
      dialogue: `A: Excuse me, where is the hotel?
B: Go straight and turn left.`,
      tip: 'Excuse me dùng để lịch sự khi hỏi người lạ.',
    }),
    order: 2,
    xpReward: 15,
    passThreshold: 70,
  },
  // --- Time & Days ---
  {
    topicSlug: 'time-days',
    title: 'Days of the Week',
    slug: 'days-of-the-week',
    description: 'Thứ Hai đến Chủ Nhật',
    content: lessonContent({
      goal: 'Nói ngày trong tuần và lịch học.',
      points: [
        { en: 'Monday – Friday', vi: 'Thứ Hai – Thứ Sáu' },
        { en: 'Saturday / Sunday', vi: 'Thứ Bảy / Chủ Nhật' },
        { en: 'What day is it today?', vi: 'Hôm nay là thứ mấy?' },
      ],
      dialogue: `A: What day is it today?
B: Today is Monday.`,
      tip: 'Tên thứ viết hoa: Monday, Tuesday…',
    }),
    order: 1,
    xpReward: 10,
    passThreshold: 70,
  },
  {
    topicSlug: 'time-days',
    title: 'Telling the Time',
    slug: 'telling-the-time',
    description: 'Nói giờ bằng tiếng Anh',
    content: lessonContent({
      goal: 'Hỏi và nói giờ đơn giản.',
      points: [
        { en: 'What time is it?', vi: 'Mấy giờ rồi?' },
        { en: 'o’clock / half past', vi: 'đúng giờ / hơn 30 phút' },
        { en: 'in the morning / evening', vi: 'buổi sáng / buổi tối' },
      ],
      dialogue: `A: What time is it?
B: It is seven o'clock.`,
      tip: 'at 7 o’clock; in the morning / in the evening.',
    }),
    order: 2,
    xpReward: 12,
    passThreshold: 70,
  },
  // --- Shopping ---
  {
    topicSlug: 'shopping',
    title: 'At the Store',
    slug: 'at-the-store',
    description: 'Mua sắm và hỏi giá',
    content: lessonContent({
      goal: 'Hỏi giá và mua đồ cơ bản.',
      points: [
        { en: 'How much is it?', vi: 'Cái này bao nhiêu tiền?' },
        { en: 'expensive / cheap', vi: 'đắt / rẻ' },
        { en: 'I’d like this, please.', vi: 'Tôi muốn cái này.' },
      ],
      dialogue: `A: How much is this shirt?
B: It is 20 dollars.`,
      tip: 'How much is + số ít; How much are + số nhiều.',
    }),
    order: 1,
    xpReward: 12,
    passThreshold: 70,
  },
  // --- Transportation ---
  {
    topicSlug: 'transportation',
    title: 'Getting Around',
    slug: 'getting-around',
    description: 'Xe buýt, xe máy, tàu…',
    content: lessonContent({
      goal: 'Nói về phương tiện đi lại hàng ngày.',
      points: [
        { en: 'bus / car / bike', vi: 'xe buýt / ô tô / xe đạp' },
        { en: 'train / taxi', vi: 'tàu / taxi' },
        { en: 'I go to work by…', vi: 'Tôi đi làm bằng…' },
      ],
      dialogue: `A: How do you go to school?
B: I go to school by bus.`,
      tip: 'by bus / by car / by bike — không dùng by a bus.',
    }),
    order: 1,
    xpReward: 10,
    passThreshold: 70,
  },
  // --- Friends ---
  {
    topicSlug: 'friends',
    title: 'Making Plans',
    slug: 'making-plans',
    description: 'Rủ bạn và lên kế hoạch',
    content: lessonContent({
      goal: 'Mời bạn bè và trả lời lời mời.',
      points: [
        { en: 'Do you want to…?', vi: 'Bạn có muốn… không?' },
        { en: 'Sure! / Sorry, I can’t.', vi: 'Được! / Xin lỗi, mình không được.' },
        { en: 'Let’s meet at…', vi: 'Mình gặp nhau ở…' },
      ],
      dialogue: `A: Do you want to watch a movie?
B: Sure! Let's meet at 7.`,
      tip: 'Let’s + V nguyên mẫu: Let’s go.',
    }),
    order: 1,
    xpReward: 12,
    passThreshold: 70,
  },
  // --- Feelings ---
  {
    topicSlug: 'feelings',
    title: 'How Do You Feel?',
    slug: 'how-do-you-feel',
    description: 'Vui, buồn, mệt, giận',
    content: lessonContent({
      goal: 'Diễn đạt cảm xúc cơ bản.',
      points: [
        { en: 'happy / sad / angry', vi: 'vui / buồn / giận' },
        { en: 'tired / excited', vi: 'mệt / hào hứng' },
        { en: 'I feel…', vi: 'Tôi cảm thấy…' },
      ],
      dialogue: `A: How do you feel today?
B: I feel happy, but a little tired.`,
      tip: 'feel + tính từ: I feel happy (không I feel happily).',
    }),
    order: 1,
    xpReward: 12,
    passThreshold: 70,
  },
];

export const VOCABULARIES = [
  // saying-hello
  vocab('saying-hello', 'hello', 'xin chào', '/həˈloʊ/', 'interjection', 'Hello, nice to meet you.', 'Xin chào, rất vui được gặp bạn.'),
  vocab('saying-hello', 'hi', 'chào (thân mật)', '/haɪ/', 'interjection', 'Hi, Tom!', 'Chào Tom!'),
  vocab('saying-hello', 'goodbye', 'tạm biệt', '/ˌɡʊdˈbaɪ/', 'interjection', 'Goodbye, see you tomorrow.', 'Tạm biệt, hẹn ngày mai.'),
  vocab('saying-hello', 'nice to meet you', 'rất vui được gặp bạn', '/naɪs tə miːt juː/', 'phrase', 'Nice to meet you, Anna.', 'Rất vui được gặp bạn, Anna.'),
  // how-are-you
  vocab('how-are-you', 'fine', 'khỏe, ổn', '/faɪn/', 'adjective', 'I am fine, thank you.', 'Tôi khỏe, cảm ơn.'),
  vocab('how-are-you', 'thank you', 'cảm ơn', '/θæŋk juː/', 'phrase', 'Thank you for your help.', 'Cảm ơn vì sự giúp đỡ của bạn.'),
  vocab('how-are-you', 'not bad', 'cũng ổn', '/nɒt bæd/', 'phrase', 'I am not bad, thanks.', 'Tôi cũng ổn, cảm ơn.'),
  // family-members
  vocab('family-members', 'mother', 'mẹ', '/ˈmʌðər/', 'noun', 'My mother is a teacher.', 'Mẹ tôi là giáo viên.'),
  vocab('family-members', 'father', 'bố', '/ˈfɑːðər/', 'noun', 'His father works in Hanoi.', 'Bố anh ấy làm việc ở Hà Nội.'),
  vocab('family-members', 'sister', 'chị / em gái', '/ˈsɪstər/', 'noun', 'I have one sister.', 'Tôi có một chị/em gái.'),
  vocab('family-members', 'brother', 'anh / em trai', '/ˈbrʌðər/', 'noun', 'My brother is tall.', 'Anh/em trai tôi cao.'),
  // counting-1-10
  vocab('counting-1-10', 'one', 'một', '/wʌn/', 'noun', 'I have one pen.', 'Tôi có một cây bút.'),
  vocab('counting-1-10', 'three', 'ba', '/θriː/', 'noun', 'There are three books.', 'Có ba quyển sách.'),
  vocab('counting-1-10', 'five', 'năm', '/faɪv/', 'noun', 'She is five years old.', 'Cô bé năm tuổi.'),
  vocab('counting-1-10', 'ten', 'mười', '/ten/', 'noun', 'I count to ten.', 'Tôi đếm đến mười.'),
  // counting-11-20
  vocab('counting-11-20', 'twelve', 'mười hai', '/twelv/', 'noun', 'There are twelve months.', 'Có mười hai tháng.'),
  vocab('counting-11-20', 'fifteen', 'mười lăm', '/ˌfɪfˈtiːn/', 'noun', 'She is fifteen.', 'Cô ấy mười lăm tuổi.'),
  vocab('counting-11-20', 'twenty', 'hai mươi', '/ˈtwenti/', 'noun', 'I have twenty students.', 'Tôi có hai mươi học sinh.'),
  // basic-colors
  vocab('basic-colors', 'red', 'màu đỏ', '/red/', 'adjective', 'I like the red apple.', 'Tôi thích quả táo đỏ.'),
  vocab('basic-colors', 'blue', 'màu xanh dương', '/bluː/', 'adjective', 'The sky is blue.', 'Bầu trời màu xanh.'),
  vocab('basic-colors', 'green', 'màu xanh lá', '/ɡriːn/', 'adjective', 'The grass is green.', 'Cỏ xanh.'),
  vocab('basic-colors', 'yellow', 'màu vàng', '/ˈjeləʊ/', 'adjective', 'A yellow banana.', 'Một quả chuối vàng.'),
  // common-food
  vocab('common-food', 'rice', 'cơm / gạo', '/raɪs/', 'noun', 'I eat rice every day.', 'Tôi ăn cơm mỗi ngày.'),
  vocab('common-food', 'bread', 'bánh mì', '/bred/', 'noun', 'I have bread for breakfast.', 'Tôi ăn bánh mì vào buổi sáng.'),
  vocab('common-food', 'noodles', 'mì', '/ˈnuːdlz/', 'noun', 'I like noodles.', 'Tôi thích mì.'),
  // drinks-ordering
  vocab('drinks-ordering', 'water', 'nước', '/ˈwɔːtər/', 'noun', 'Can I have some water?', 'Cho tôi xin ít nước được không?'),
  vocab('drinks-ordering', 'coffee', 'cà phê', '/ˈkɒfi/', 'noun', "I'd like a coffee, please.", 'Tôi muốn một ly cà phê.'),
  vocab('drinks-ordering', 'juice', 'nước ép', '/dʒuːs/', 'noun', 'Orange juice is sweet.', 'Nước cam ngọt.'),
  // school-subjects
  vocab('school-subjects', 'English', 'tiếng Anh', '/ˈɪŋɡlɪʃ/', 'noun', 'English is my favorite subject.', 'Tiếng Anh là môn yêu thích của tôi.'),
  vocab('school-subjects', 'Math', 'toán', '/mæθ/', 'noun', 'We have Math on Monday.', 'Chúng tôi học Toán vào Thứ Hai.'),
  vocab('school-subjects', 'Science', 'khoa học', '/ˈsaɪəns/', 'noun', 'Science is interesting.', 'Khoa học thú vị.'),
  // classroom-objects
  vocab('classroom-objects', 'book', 'sách', '/bʊk/', 'noun', 'Open your book.', 'Mở sách ra.'),
  vocab('classroom-objects', 'pen', 'bút mực', '/pen/', 'noun', 'I write with a pen.', 'Tôi viết bằng bút mực.'),
  vocab('classroom-objects', 'desk', 'bàn học', '/desk/', 'noun', 'My bag is on the desk.', 'Cặp tôi để trên bàn.'),
  // morning-routine
  vocab('morning-routine', 'wake up', 'thức dậy', '/weɪk ʌp/', 'phrase', 'I wake up at 6.', 'Tôi thức dậy lúc 6 giờ.'),
  vocab('morning-routine', 'brush', 'chải / đánh (răng)', '/brʌʃ/', 'verb', 'I brush my teeth.', 'Tôi đánh răng.'),
  vocab('morning-routine', 'breakfast', 'bữa sáng', '/ˈbrekfəst/', 'noun', 'I have breakfast at 7.', 'Tôi ăn sáng lúc 7 giờ.'),
  // talking-about-weather
  vocab('talking-about-weather', 'sunny', 'nắng', '/ˈsʌni/', 'adjective', 'It is sunny today.', 'Hôm nay trời nắng.'),
  vocab('talking-about-weather', 'rainy', 'mưa', '/ˈreɪni/', 'adjective', 'It is rainy in the afternoon.', 'Buổi chiều trời mưa.'),
  vocab('talking-about-weather', 'cloudy', 'nhiều mây', '/ˈklaʊdi/', 'adjective', 'The sky is cloudy.', 'Bầu trời nhiều mây.'),
  vocab('talking-about-weather', 'cold', 'lạnh', '/kəʊld/', 'adjective', 'It is cold in winter.', 'Mùa đông trời lạnh.'),
  // common-jobs
  vocab('common-jobs', 'teacher', 'giáo viên', '/ˈtiːtʃər/', 'noun', 'She is a teacher.', 'Cô ấy là giáo viên.'),
  vocab('common-jobs', 'doctor', 'bác sĩ', '/ˈdɒktər/', 'noun', 'My father is a doctor.', 'Bố tôi là bác sĩ.'),
  vocab('common-jobs', 'engineer', 'kỹ sư', '/ˌendʒɪˈnɪər/', 'noun', 'He is an engineer.', 'Anh ấy là kỹ sư.'),
  // everyday-clothes
  vocab('everyday-clothes', 'shirt', 'áo sơ mi', '/ʃɜːt/', 'noun', 'I am wearing a white shirt.', 'Tôi đang mặc áo sơ mi trắng.'),
  vocab('everyday-clothes', 'pants', 'quần dài', '/pænts/', 'noun', 'These pants are black.', 'Chiếc quần này màu đen.'),
  vocab('everyday-clothes', 'shoes', 'giày', '/ʃuːz/', 'noun', 'My shoes are new.', 'Giày của tôi mới.'),
  // rooms-at-home
  vocab('rooms-at-home', 'kitchen', 'nhà bếp', '/ˈkɪtʃɪn/', 'noun', 'Mom is in the kitchen.', 'Mẹ đang ở trong bếp.'),
  vocab('rooms-at-home', 'bedroom', 'phòng ngủ', '/ˈbedruːm/', 'noun', 'My bedroom is small.', 'Phòng ngủ của tôi nhỏ.'),
  vocab('rooms-at-home', 'living room', 'phòng khách', '/ˈlɪvɪŋ ruːm/', 'noun', 'We watch TV in the living room.', 'Chúng tôi xem TV ở phòng khách.'),
  // furniture
  vocab('furniture', 'table', 'bàn', '/ˈteɪbl/', 'noun', 'The lamp is on the table.', 'Đèn để trên bàn.'),
  vocab('furniture', 'chair', 'ghế', '/tʃeər/', 'noun', 'Please sit on the chair.', 'Xin mời ngồi ghế.'),
  vocab('furniture', 'bed', 'giường', '/bed/', 'noun', 'I sleep on the bed.', 'Tôi ngủ trên giường.'),
  // pets-farm-animals
  vocab('pets-farm-animals', 'dog', 'chó', '/dɒɡ/', 'noun', 'I have a dog.', 'Tôi có một con chó.'),
  vocab('pets-farm-animals', 'cat', 'mèo', '/kæt/', 'noun', 'The cat is sleeping.', 'Con mèo đang ngủ.'),
  vocab('pets-farm-animals', 'bird', 'chim', '/bɜːd/', 'noun', 'A bird is singing.', 'Một con chim đang hót.'),
  vocab('pets-farm-animals', 'cow', 'bò', '/kaʊ/', 'noun', 'Cows give milk.', 'Bò cho sữa.'),
  // body-parts
  vocab('body-parts', 'head', 'đầu', '/hed/', 'noun', 'Touch your head.', 'Chạm vào đầu của bạn.'),
  vocab('body-parts', 'hand', 'bàn tay', '/hænd/', 'noun', 'Wash your hands.', 'Rửa tay đi.'),
  vocab('body-parts', 'eye', 'mắt', '/aɪ/', 'noun', 'She has brown eyes.', 'Cô ấy có mắt nâu.'),
  // feeling-sick
  vocab('feeling-sick', 'headache', 'đau đầu', '/ˈhedeɪk/', 'noun', 'I have a headache.', 'Tôi bị đau đầu.'),
  vocab('feeling-sick', 'cold', 'cảm lạnh', '/kəʊld/', 'noun', 'I have a cold.', 'Tôi bị cảm.'),
  vocab('feeling-sick', 'sick', 'ốm / khó chịu', '/sɪk/', 'adjective', 'I feel sick today.', 'Hôm nay tôi cảm thấy ốm.'),
  // my-hobbies
  vocab('my-hobbies', 'reading', 'đọc sách', '/ˈriːdɪŋ/', 'noun', 'I like reading.', 'Tôi thích đọc sách.'),
  vocab('my-hobbies', 'swimming', 'bơi lội', '/ˈswɪmɪŋ/', 'noun', 'Swimming is fun.', 'Bơi rất vui.'),
  vocab('my-hobbies', 'cooking', 'nấu ăn', '/ˈkʊkɪŋ/', 'noun', 'Cooking is my hobby.', 'Nấu ăn là sở thích của tôi.'),
  // at-the-airport
  vocab('at-the-airport', 'passport', 'hộ chiếu', '/ˈpɑːspɔːt/', 'noun', 'Show your passport, please.', 'Xin vui lòng đưa hộ chiếu.'),
  vocab('at-the-airport', 'ticket', 'vé', '/ˈtɪkɪt/', 'noun', 'I bought a plane ticket.', 'Tôi đã mua vé máy bay.'),
  vocab('at-the-airport', 'luggage', 'hành lý', '/ˈlʌɡɪdʒ/', 'noun', 'My luggage is heavy.', 'Hành lý của tôi nặng.'),
  // asking-for-directions
  vocab('asking-for-directions', 'left', 'bên trái', '/left/', 'noun', 'Turn left at the corner.', 'Rẽ trái ở góc đường.'),
  vocab('asking-for-directions', 'right', 'bên phải', '/raɪt/', 'noun', 'Turn right here.', 'Rẽ phải ở đây.'),
  vocab('asking-for-directions', 'straight', 'thẳng', '/streɪt/', 'adverb', 'Go straight ahead.', 'Đi thẳng phía trước.'),
  // days-of-the-week
  vocab('days-of-the-week', 'Monday', 'Thứ Hai', '/ˈmʌndeɪ/', 'noun', 'I study English on Monday.', 'Tôi học tiếng Anh vào Thứ Hai.'),
  vocab('days-of-the-week', 'Saturday', 'Thứ Bảy', '/ˈsætədeɪ/', 'noun', 'We go shopping on Saturday.', 'Chúng tôi đi mua sắm vào Thứ Bảy.'),
  vocab('days-of-the-week', 'Sunday', 'Chủ Nhật', '/ˈsʌndeɪ/', 'noun', 'Sunday is a holiday.', 'Chủ Nhật là ngày nghỉ.'),
  // telling-the-time
  vocab('telling-the-time', "o'clock", 'đúng giờ', '/əˈklɒk/', 'adverb', "It is seven o'clock.", 'Bây giờ là 7 giờ đúng.'),
  vocab('telling-the-time', 'morning', 'buổi sáng', '/ˈmɔːnɪŋ/', 'noun', 'I run in the morning.', 'Tôi chạy bộ vào buổi sáng.'),
  vocab('telling-the-time', 'evening', 'buổi tối', '/ˈiːvnɪŋ/', 'noun', 'We eat dinner in the evening.', 'Chúng tôi ăn tối vào buổi tối.'),
  // at-the-store
  vocab('at-the-store', 'expensive', 'đắt', '/ɪkˈspensɪv/', 'adjective', 'This bag is expensive.', 'Cái túi này đắt.'),
  vocab('at-the-store', 'cheap', 'rẻ', '/tʃiːp/', 'adjective', 'These shoes are cheap.', 'Đôi giày này rẻ.'),
  vocab('at-the-store', 'buy', 'mua', '/baɪ/', 'verb', 'I want to buy a shirt.', 'Tôi muốn mua một chiếc áo.'),
  // getting-around
  vocab('getting-around', 'bus', 'xe buýt', '/bʌs/', 'noun', 'I go to school by bus.', 'Tôi đi học bằng xe buýt.'),
  vocab('getting-around', 'bike', 'xe đạp', '/baɪk/', 'noun', 'She rides a bike.', 'Cô ấy đi xe đạp.'),
  vocab('getting-around', 'train', 'tàu hỏa', '/treɪn/', 'noun', 'The train is fast.', 'Tàu chạy nhanh.'),
  // making-plans
  vocab('making-plans', 'movie', 'phim', '/ˈmuːvi/', 'noun', 'Let’s watch a movie.', 'Mình xem phim đi.'),
  vocab('making-plans', 'meet', 'gặp', '/miːt/', 'verb', 'Let’s meet at 7.', 'Mình gặp lúc 7 giờ.'),
  vocab('making-plans', 'sure', 'chắc chắn / đồng ý', '/ʃʊər/', 'adverb', 'Sure! That sounds good.', 'Được! Nghe hay đấy.'),
  // how-do-you-feel
  vocab('how-do-you-feel', 'happy', 'vui vẻ', '/ˈhæpi/', 'adjective', 'I feel happy today.', 'Hôm nay tôi cảm thấy vui.'),
  vocab('how-do-you-feel', 'sad', 'buồn', '/sæd/', 'adjective', 'She looks sad.', 'Cô ấy trông buồn.'),
  vocab('how-do-you-feel', 'tired', 'mệt', '/ˈtaɪərd/', 'adjective', 'I am tired after work.', 'Tôi mệt sau giờ làm.'),
  vocab('how-do-you-feel', 'angry', 'giận', '/ˈæŋɡri/', 'adjective', 'Don’t be angry.', 'Đừng giận.'),
];

export const EXERCISES = [
  // saying-hello
  mc('saying-hello', 1, 'What does "hello" mean in Vietnamese?', ['xin chào', 'tạm biệt', 'cảm ơn', 'xin lỗi'], 'A', '"Hello" = xin chào.'),
  fill('saying-hello', 2, 'Complete: "_____, my name is Linh."', 'hello', 'Chào hỏi khi giới thiệu tên thường dùng Hello.'),
  // how-are-you
  mc('how-are-you', 1, 'How do you answer "How are you?" politely?', ['I am fine, thank you.', 'Goodbye!', 'My name is Anna.', 'See you!'], 'A', 'Câu trả lời lịch sự phổ biến: I am fine, thank you.'),
  fill('how-are-you', 2, 'Complete: "I am _____, thank you." (khỏe)', 'fine', 'fine = khỏe / ổn.'),
  // family-members
  mc('family-members', 1, 'What is "mother" in Vietnamese?', ['mẹ', 'bố', 'anh trai', 'bà'], 'A', 'Mother = mẹ.'),
  fill('family-members', 2, 'My _____ works in Hanoi. (bố)', 'father', 'Father = bố.'),
  // counting-1-10
  mc('counting-1-10', 1, 'What number is "three"?', ['3', '5', '8', '10'], 'A', 'three = 3.'),
  fill('counting-1-10', 2, 'I have _____ books. (năm quyển)', 'five', 'five = năm.'),
  // counting-11-20
  mc('counting-11-20', 1, 'What is 15 in English?', ['fifteen', 'fifty', 'five', 'fourteen'], 'A', '15 = fifteen.'),
  fill('counting-11-20', 2, 'She is _____. (hai mươi tuổi → viết số bằng chữ)', 'twenty', 'twenty = 20.'),
  // basic-colors
  mc('basic-colors', 1, 'What color is the sky on a clear day?', ['blue', 'red', 'black', 'yellow'], 'A', 'The sky is blue.'),
  fill('basic-colors', 2, 'A banana is _____. (màu vàng)', 'yellow', 'yellow = vàng.'),
  // common-food
  mc('common-food', 1, 'What is "rice" in Vietnamese?', ['cơm / gạo', 'bánh mì', 'mì', 'nước'], 'A', 'rice = cơm / gạo.'),
  fill('common-food', 2, 'I like _____. (mì)', 'noodles', 'noodles = mì.'),
  // drinks-ordering
  mc('drinks-ordering', 1, 'Which sentence is more polite when ordering?', ["I'd like a coffee, please.", 'Give me coffee now.', 'Coffee!', 'You give coffee.'], 'A', '"I’d like… please" lịch sự hơn.'),
  fill('drinks-ordering', 2, "I'd like some _____, please. (nước)", 'water', 'water = nước.'),
  // school-subjects
  mc('school-subjects', 1, 'Which subject is about numbers?', ['Math', 'English', 'Art', 'Music'], 'A', 'Math = Toán.'),
  fill('school-subjects', 2, 'My favorite subject is _____. (tiếng Anh)', 'English', 'English = tiếng Anh.'),
  // classroom-objects
  mc('classroom-objects', 1, 'Where do students usually sit and write?', ['desk', 'board', 'window', 'door'], 'A', 'desk = bàn học.'),
  fill('classroom-objects', 2, 'I write with a _____. (bút mực)', 'pen', 'pen = bút mực.'),
  // morning-routine
  mc('morning-routine', 1, 'What do you do after sleeping at night?', ['wake up', 'go to bed', 'have dinner', 'watch a movie'], 'A', 'wake up = thức dậy.'),
  fill('morning-routine', 2, 'I _____ my teeth every morning.', 'brush', 'brush my teeth = đánh răng.'),
  // talking-about-weather
  mc('talking-about-weather', 1, 'What is the weather like when there is rain?', ['rainy', 'sunny', 'hot', 'dry'], 'A', 'rainy = mưa.'),
  fill('talking-about-weather', 2, 'It is _____ today. (nắng)', 'sunny', 'sunny = nắng.'),
  // common-jobs
  mc('common-jobs', 1, 'Who works in a hospital?', ['doctor', 'teacher', 'driver', 'chef'], 'A', 'doctor = bác sĩ.'),
  fill('common-jobs', 2, 'She is a _____. (giáo viên)', 'teacher', 'teacher = giáo viên.'),
  // everyday-clothes
  mc('everyday-clothes', 1, 'What do you wear on your feet?', ['shoes', 'shirt', 'hat', 'pants'], 'A', 'shoes = giày.'),
  fill('everyday-clothes', 2, 'I am wearing a white _____. (áo sơ mi)', 'shirt', 'shirt = áo sơ mi.'),
  // rooms-at-home
  mc('rooms-at-home', 1, 'Where do people usually cook?', ['kitchen', 'bedroom', 'bathroom', 'garage'], 'A', 'kitchen = nhà bếp.'),
  fill('rooms-at-home', 2, 'I sleep in my _____.', 'bedroom', 'bedroom = phòng ngủ.'),
  // furniture
  mc('furniture', 1, 'What do you sit on?', ['chair', 'bed', 'lamp', 'window'], 'A', 'chair = ghế.'),
  fill('furniture', 2, 'There is a _____ in my bedroom. (giường)', 'bed', 'bed = giường.'),
  // pets-farm-animals
  mc('pets-farm-animals', 1, 'Which animal says "meow"?', ['cat', 'dog', 'cow', 'bird'], 'A', 'cat = mèo.'),
  fill('pets-farm-animals', 2, 'I have a _____. (chó)', 'dog', 'dog = chó.'),
  // body-parts
  mc('body-parts', 1, 'What do you use to see?', ['eyes', 'ears', 'hands', 'feet'], 'A', 'eyes = mắt.'),
  fill('body-parts', 2, 'Wash your _____ before eating. (tay)', 'hands', 'hands = tay.'),
  // feeling-sick
  mc('feeling-sick', 1, 'What do you say when your head hurts?', ['I have a headache.', 'I am hungry.', 'I am happy.', 'I am tall.'], 'A', 'have a headache = bị đau đầu.'),
  fill('feeling-sick', 2, 'I feel _____. (ốm)', 'sick', 'sick = ốm / khó chịu.'),
  // my-hobbies
  mc('my-hobbies', 1, 'Which hobby is about books?', ['reading', 'swimming', 'cooking', 'running'], 'A', 'reading = đọc sách.'),
  fill('my-hobbies', 2, 'My hobby is _____. (bơi)', 'swimming', 'swimming = bơi.'),
  // at-the-airport
  mc('at-the-airport', 1, 'What document do you need to travel abroad?', ['passport', 'notebook', 'menu', 'ticket only'], 'A', 'passport = hộ chiếu.'),
  fill('at-the-airport', 2, 'My _____ is heavy. (hành lý)', 'luggage', 'luggage = hành lý.'),
  // asking-for-directions
  mc('asking-for-directions', 1, 'What does "turn left" mean?', ['rẽ trái', 'rẽ phải', 'đi thẳng', 'dừng lại'], 'A', 'turn left = rẽ trái.'),
  fill('asking-for-directions', 2, 'Go _____. (đi thẳng)', 'straight', 'go straight = đi thẳng.'),
  // days-of-the-week
  mc('days-of-the-week', 1, 'What day comes after Sunday?', ['Monday', 'Friday', 'Saturday', 'Tuesday'], 'A', 'After Sunday is Monday.'),
  fill('days-of-the-week', 2, 'Today is _____. (Chủ Nhật)', 'Sunday', 'Sunday = Chủ Nhật.'),
  // telling-the-time
  mc('telling-the-time', 1, 'How do you ask for the time?', ['What time is it?', 'What day is it?', 'How old are you?', 'Where are you?'], 'A', 'What time is it? = Mấy giờ rồi?'),
  fill('telling-the-time', 2, "It is eight _____.", "o'clock", "o'clock = đúng giờ."),
  // at-the-store
  mc('at-the-store', 1, 'How do you ask the price?', ['How much is it?', 'How old is it?', 'Where is it?', 'Who is it?'], 'A', 'How much is it? = Bao nhiêu tiền?'),
  fill('at-the-store', 2, 'This phone is _____. (đắt)', 'expensive', 'expensive = đắt.'),
  // getting-around
  mc('getting-around', 1, 'How do you say "xe buýt"?', ['bus', 'bike', 'train', 'taxi'], 'A', 'bus = xe buýt.'),
  fill('getting-around', 2, 'I go to school by _____. (xe đạp)', 'bike', 'bike = xe đạp.'),
  // making-plans
  mc('making-plans', 1, 'Which reply means you agree?', ['Sure!', 'Sorry, I can’t.', 'Goodbye.', 'I don’t know.'], 'A', 'Sure! = Đồng ý / Được!'),
  fill('making-plans', 2, "Let's _____ at 7. (gặp)", 'meet', 'meet = gặp.'),
  // how-do-you-feel
  mc('how-do-you-feel', 1, 'What is the opposite of "sad"?', ['happy', 'angry', 'tired', 'sick'], 'A', 'happy ↔ sad.'),
  fill('how-do-you-feel', 2, 'I feel _____ after work. (mệt)', 'tired', 'tired = mệt.'),
];
