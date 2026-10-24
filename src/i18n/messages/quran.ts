// Qur'an section wording (index + mushaf reader + ayah panel). App wording comes from appT where it exists.
import type { Locale } from "../config";

export type QuranMessages = {
  title: string;
  description: string;
  heroSub: string;
  readerDescription: string; // {page}, {surah}
  lastRead: string; // {page}
  startReading: string;
  prevPage: string;
  nextPage: string;
  goTo: string;
  page: string;
  surah: string;
  juz: string;
  go: string;
  twoPages: string;
  onePage: string;
  tafsir: string;
  play: string;
  pause: string;
  copy: string;
  copied: string;
  share: string;
  close: string;
  reciter: string;
  loadingFont: string;
  fontFailed: string;
  translationBy: string; // {name}
  loadError: string;
  tapHint: string;
  ayah: string;
};

const en: QuranMessages = {
  title: "The Holy Qur'an",
  description: "Read the Holy Qur'an in the Madinah Mushaf, page by page, with translation, tafsir and verse-by-verse recitation.",
  heroSub: "The Madinah Mushaf, page by page — tap any verse for its translation and recitation.",
  readerDescription: "Page {page} of the Madinah Mushaf — Surah {surah}. Read it with translation, tafsir and recitation.",
  lastRead: "You stopped at page {page}",
  startReading: "Start reading",
  prevPage: "Previous page",
  nextPage: "Next page",
  goTo: "Go to",
  page: "Page",
  surah: "Surah",
  juz: "Juz",
  go: "Go",
  twoPages: "Two pages",
  onePage: "One page",
  tafsir: "Tafsir",
  play: "Listen",
  pause: "Pause",
  copy: "Copy",
  copied: "Copied",
  share: "Share",
  close: "Close",
  reciter: "Reciter",
  loadingFont: "Loading the Mushaf page…",
  fontFailed: "The Mushaf font could not be loaded, so the verses are shown in plain script.",
  translationBy: "Translation: {name}",
  loadError: "Could not load. Check your connection and try again.",
  tapHint: "Tap a verse for its translation and recitation",
  ayah: "Ayah",
};

const ar: QuranMessages = {
  title: "القرآن الكريم",
  description: "اقرأ القرآن الكريم في مصحف المدينة المنورة صفحةً صفحة، مع التفسير والاستماع إلى التلاوة آيةً آية.",
  heroSub: "مصحف المدينة المنورة صفحةً صفحة — اضغط على أي آية لقراءة تفسيرها والاستماع إليها.",
  readerDescription: "الصفحة {page} من مصحف المدينة — سورة {surah}. اقرأها مع التفسير والتلاوة.",
  lastRead: "توقفت عند الصفحة {page}",
  startReading: "ابدأ القراءة",
  prevPage: "الصفحة السابقة",
  nextPage: "الصفحة التالية",
  goTo: "انتقال",
  page: "الصفحة",
  surah: "السورة",
  juz: "الجزء",
  go: "اذهب",
  twoPages: "صفحتان",
  onePage: "صفحة واحدة",
  tafsir: "التفسير",
  play: "استماع",
  pause: "إيقاف مؤقت",
  copy: "نسخ",
  copied: "تم النسخ",
  share: "مشاركة",
  close: "إغلاق",
  reciter: "القارئ",
  loadingFont: "جارٍ تحميل صفحة المصحف…",
  fontFailed: "تعذّر تحميل خط المصحف، فتُعرض الآيات بالخط العثماني العادي.",
  translationBy: "الترجمة: {name}",
  loadError: "تعذّر التحميل. تحقّق من الاتصال وحاول مرة أخرى.",
  tapHint: "اضغط على الآية لعرض تفسيرها والاستماع إليها",
  ayah: "آية",
};

const ur: QuranMessages = {
  title: "قرآنِ کریم",
  description: "مدینہ منورہ کے مصحف میں قرآنِ کریم صفحہ بہ صفحہ پڑھیں، ترجمے اور آیت بہ آیت تلاوت کے ساتھ۔",
  heroSub: "مصحفِ مدینہ صفحہ بہ صفحہ — کسی بھی آیت پر ٹیپ کریں اور اس کا ترجمہ پڑھیں اور تلاوت سنیں۔",
  readerDescription: "مصحفِ مدینہ کا صفحہ {page} — سورۃ {surah}۔ ترجمے اور تلاوت کے ساتھ پڑھیں۔",
  lastRead: "آپ صفحہ {page} پر رکے تھے",
  startReading: "پڑھنا شروع کریں",
  prevPage: "پچھلا صفحہ",
  nextPage: "اگلا صفحہ",
  goTo: "جائیں",
  page: "صفحہ",
  surah: "سورۃ",
  juz: "پارہ",
  go: "جائیں",
  twoPages: "دو صفحات",
  onePage: "ایک صفحہ",
  tafsir: "تفسیر",
  play: "سنیں",
  pause: "روکیں",
  copy: "کاپی",
  copied: "کاپی ہو گیا",
  share: "شیئر",
  close: "بند کریں",
  reciter: "قاری",
  loadingFont: "مصحف کا صفحہ لوڈ ہو رہا ہے…",
  fontFailed: "مصحف کا فونٹ لوڈ نہیں ہو سکا، اس لیے آیات سادہ عثمانی خط میں دکھائی جا رہی ہیں۔",
  translationBy: "ترجمہ: {name}",
  loadError: "لوڈ نہیں ہو سکا۔ اپنا کنکشن چیک کریں اور دوبارہ کوشش کریں۔",
  tapHint: "ترجمہ اور تلاوت کے لیے آیت پر ٹیپ کریں",
  ayah: "آیت",
};

const fa: QuranMessages = {
  title: "قرآن کریم",
  description: "قرآن کریم را در مصحف مدینه، صفحه به صفحه، همراه با ترجمه و تلاوت آیه به آیه بخوانید.",
  heroSub: "مصحف مدینه صفحه به صفحه — روی هر آیه بزنید تا ترجمه‌اش را بخوانید و تلاوتش را بشنوید.",
  readerDescription: "صفحهٔ {page} از مصحف مدینه — سورهٔ {surah}. همراه با ترجمه و تلاوت بخوانید.",
  lastRead: "در صفحهٔ {page} مانده بودید",
  startReading: "شروع خواندن",
  prevPage: "صفحهٔ قبل",
  nextPage: "صفحهٔ بعد",
  goTo: "رفتن به",
  page: "صفحه",
  surah: "سوره",
  juz: "جزء",
  go: "برو",
  twoPages: "دو صفحه",
  onePage: "یک صفحه",
  tafsir: "تفسیر",
  play: "شنیدن",
  pause: "توقف",
  copy: "کپی",
  copied: "کپی شد",
  share: "اشتراک‌گذاری",
  close: "بستن",
  reciter: "قاری",
  loadingFont: "در حال بارگذاری صفحهٔ مصحف…",
  fontFailed: "قلم مصحف بارگذاری نشد، بنابراین آیات با خط عثمانی ساده نمایش داده می‌شوند.",
  translationBy: "ترجمه: {name}",
  loadError: "بارگذاری نشد. اتصال خود را بررسی کنید و دوباره تلاش کنید.",
  tapHint: "برای ترجمه و تلاوت، روی آیه بزنید",
  ayah: "آیه",
};

const ru: QuranMessages = {
  title: "Священный Коран",
  description: "Читайте Священный Коран по Мединскому мусхафу, страница за страницей, с переводом и чтением каждого аята.",
  heroSub: "Мединский мусхаф страница за страницей — нажмите на любой аят, чтобы прочитать перевод и послушать чтение.",
  readerDescription: "Страница {page} Мединского мусхафа — сура {surah}. Читайте с переводом и чтением.",
  lastRead: "Вы остановились на странице {page}",
  startReading: "Начать чтение",
  prevPage: "Предыдущая страница",
  nextPage: "Следующая страница",
  goTo: "Перейти",
  page: "Страница",
  surah: "Сура",
  juz: "Джуз",
  go: "Перейти",
  twoPages: "Две страницы",
  onePage: "Одна страница",
  tafsir: "Тафсир",
  play: "Слушать",
  pause: "Пауза",
  copy: "Копировать",
  copied: "Скопировано",
  share: "Поделиться",
  close: "Закрыть",
  reciter: "Чтец",
  loadingFont: "Загрузка страницы мусхафа…",
  fontFailed: "Не удалось загрузить шрифт мусхафа, поэтому аяты показаны обычным османским письмом.",
  translationBy: "Перевод: {name}",
  loadError: "Не удалось загрузить. Проверьте подключение и попробуйте снова.",
  tapHint: "Нажмите на аят, чтобы открыть перевод и чтение",
  ayah: "Аят",
};

const ms: QuranMessages = {
  title: "Al-Quran al-Karim",
  description: "Baca al-Quran dalam Mushaf Madinah, halaman demi halaman, dengan terjemahan dan bacaan ayat demi ayat.",
  heroSub: "Mushaf Madinah halaman demi halaman — ketik mana-mana ayat untuk terjemahan dan bacaannya.",
  readerDescription: "Halaman {page} Mushaf Madinah — Surah {surah}. Baca bersama terjemahan dan bacaan.",
  lastRead: "Anda berhenti di halaman {page}",
  startReading: "Mula membaca",
  prevPage: "Halaman sebelumnya",
  nextPage: "Halaman seterusnya",
  goTo: "Pergi ke",
  page: "Halaman",
  surah: "Surah",
  juz: "Juzuk",
  go: "Pergi",
  twoPages: "Dua halaman",
  onePage: "Satu halaman",
  tafsir: "Tafsir",
  play: "Dengar",
  pause: "Jeda",
  copy: "Salin",
  copied: "Disalin",
  share: "Kongsi",
  close: "Tutup",
  reciter: "Qari",
  loadingFont: "Memuatkan halaman mushaf…",
  fontFailed: "Fon mushaf tidak dapat dimuatkan, jadi ayat dipaparkan dalam tulisan Uthmani biasa.",
  translationBy: "Terjemahan: {name}",
  loadError: "Tidak dapat dimuatkan. Semak sambungan anda dan cuba lagi.",
  tapHint: "Ketik ayat untuk terjemahan dan bacaannya",
  ayah: "Ayat",
};

const tr: QuranMessages = {
  title: "Kur'an-ı Kerim",
  description: "Kur'an-ı Kerim'i Medine Mushafı'nda sayfa sayfa, meal ve ayet ayet tilavetle okuyun.",
  heroSub: "Medine Mushafı sayfa sayfa — mealini okumak ve tilavetini dinlemek için herhangi bir ayete dokunun.",
  readerDescription: "Medine Mushafı'nın {page}. sayfası — {surah} Suresi. Meal ve tilavetle okuyun.",
  lastRead: "{page}. sayfada kalmıştınız",
  startReading: "Okumaya başla",
  prevPage: "Önceki sayfa",
  nextPage: "Sonraki sayfa",
  goTo: "Git",
  page: "Sayfa",
  surah: "Sure",
  juz: "Cüz",
  go: "Git",
  twoPages: "İki sayfa",
  onePage: "Tek sayfa",
  tafsir: "Tefsir",
  play: "Dinle",
  pause: "Duraklat",
  copy: "Kopyala",
  copied: "Kopyalandı",
  share: "Paylaş",
  close: "Kapat",
  reciter: "Kârî",
  loadingFont: "Mushaf sayfası yükleniyor…",
  fontFailed: "Mushaf yazı tipi yüklenemedi; ayetler sade Osmanî hatla gösteriliyor.",
  translationBy: "Meal: {name}",
  loadError: "Yüklenemedi. Bağlantınızı kontrol edip tekrar deneyin.",
  tapHint: "Meal ve tilavet için bir ayete dokunun",
  ayah: "Ayet",
};

const id: QuranMessages = {
  title: "Al-Qur'an al-Karim",
  description: "Baca Al-Qur'an dalam Mushaf Madinah, halaman demi halaman, dengan terjemahan dan murattal ayat demi ayat.",
  heroSub: "Mushaf Madinah halaman demi halaman — ketuk ayat mana pun untuk terjemahan dan murattalnya.",
  readerDescription: "Halaman {page} Mushaf Madinah — Surah {surah}. Baca dengan terjemahan dan murattal.",
  lastRead: "Anda berhenti di halaman {page}",
  startReading: "Mulai membaca",
  prevPage: "Halaman sebelumnya",
  nextPage: "Halaman berikutnya",
  goTo: "Buka",
  page: "Halaman",
  surah: "Surah",
  juz: "Juz",
  go: "Buka",
  twoPages: "Dua halaman",
  onePage: "Satu halaman",
  tafsir: "Tafsir",
  play: "Dengarkan",
  pause: "Jeda",
  copy: "Salin",
  copied: "Tersalin",
  share: "Bagikan",
  close: "Tutup",
  reciter: "Qari",
  loadingFont: "Memuat halaman mushaf…",
  fontFailed: "Font mushaf tidak dapat dimuat, jadi ayat ditampilkan dengan tulisan Utsmani biasa.",
  translationBy: "Terjemahan: {name}",
  loadError: "Gagal memuat. Periksa koneksi Anda lalu coba lagi.",
  tapHint: "Ketuk ayat untuk terjemahan dan murattalnya",
  ayah: "Ayat",
};

export const quran: Record<Locale, QuranMessages> = { ar, en, ur, fa, ru, ms, tr, id };

export const fill = (s: string, params: Record<string, string | number>) =>
  Object.entries(params).reduce((acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)), s);
