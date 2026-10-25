import type { Locale } from "../config";
import type { Home } from "./home";

const ur: Home = {
  strip: { tagline: "عبادت میں آپ کا ساتھی", sub: "قرآن · حدیث · اذکار · نماز — مفت، بغیر اشتہارات" },
  hero: {
    slides: [
      { before: "اپنے مقام کے مطابق دن اور مہینے کے ", highlight: "نماز کے اوقات", after: " پوری درستگی سے جانیں", body: "اپنے شہر کے نماز کے درست اوقات جانیں، ہر نماز پر اذان کے ساتھ — رفیق المسلم کے ساتھ۔" },
      { before: "قرآن و سنت سے صحیح ", highlight: "اذکار اور دعائیں", after: " دیکھیں جن کی ہر مسلمان کو ضرورت ہے", body: "صبح و شام کے اذکار، حصن المسلم اور تسبیح، آواز اور کاؤنٹر کے ساتھ۔" },
      { before: "", highlight: "مدینہ مصحف", after: " میں قرآنِ کریم پڑھیں، تفسیر، ترجمہ اور تلاوت کے ساتھ", body: "ہر صفحہ ویسا ہی جیسا مدینہ منورہ میں چھپا، آیات کے معانی آپ کی زبان میں۔" },
      { before: "جہاں بھی ہوں ", highlight: "قبلہ", after: " معلوم کریں اور اذان سنیں", body: "قطب نما، سورج و چاند اور نقشہ — اور ہر نماز پر مکمل اسکرین اذان۔" },
    ],
    getApp: "ابھی رفیق المسلم حاصل کریں",
  },
  prayer: { title: "نماز کے اوقات", more: "مزید", method: "حساب کا طریقہ", next: "اگلی نماز" },
  articles: { recent: "تازہ ترین مضامین", mostRead: "سب سے زیادہ پڑھے گئے", viewMore: "مزید دیکھیں" },
  qibla: {
    before: "جہاں بھی ہوں، مختلف طریقوں سے ",
    highlight: "قبلہ کی سمت",
    after: " معلوم کریں",
    methods: { compass: "قطب نما", sunMoon: "سورج و چاند", shadow: "سایہ", map: "نقشہ" },
  },
  about: {
    title: "ایک مسلمان کی ہر ضرورت، ایک مفت ایپ میں",
    body: "رفیق المسلم آپ کو نماز کے اوقات یاد دلاتا ہے، اللہ کے ذکر میں مدد کرتا ہے، قرآنِ کریم سے جوڑتا ہے اور مزید نیکیوں کی ترغیب دیتا ہے۔ ہر مسلمان کا ساتھی۔",
    stats: [
      { value: "9", label: "حدیث کی کتابیں" },
      { value: "9", label: "زبانیں" },
      { value: "بغیر اشتہارات", label: "ہمیشہ مفت" },
    ],
  },
  reviews: {
    title: "ہمارے صارفین کی رائے",
    body: "رفیق المسلم آپ کو نماز کے اوقات یاد دلاتا ہے، اللہ کے ذکر میں مدد کرتا ہے اور قرآن سے جوڑتا ہے۔",
    write: "اپنی رائے لکھیں",
  },
  contact: { title: "رابطہ کریں", body: "کوئی سوال، تجویز یا مسئلہ؟ ہمیں لکھیں — ہم ہر پیغام پڑھتے ہیں۔", message: "ہمیں آپ کی بات سن کر خوشی ہوگی", send: "بھیجیں" },
};

const fa: Home = {
  strip: { tagline: "همراه شما در عبادت", sub: "قرآن · حدیث · اذکار · نماز — رایگان و بدون تبلیغات" },
  hero: {
    slides: [
      { before: "", highlight: "اوقات نماز", after: " روز و ماه را بر اساس موقعیت خود با دقت کامل بدانید", body: "اوقات دقیق نماز شهر خود را بدانید، با اذان در هر نماز — با رفیق المسلم." },
      { before: "", highlight: "اذکار و دعاهای", after: " صحیح از قرآن و سنت را که هر مسلمانی نیاز دارد مرور کنید", body: "اذکار صبح و شام، حصن المسلم و تسبیح، با صوت و شمارنده." },
      { before: "قرآن کریم را با ", highlight: "مصحف مدینه", after: " بخوانید، با تفسیر، ترجمه و تلاوت", body: "هر صفحه همان‌گونه که در مدینهٔ منوره چاپ شده، با معنای آیات به زبان شما." },
      { before: "هر کجا هستید ", highlight: "قبله", after: " را بیابید و اذان را بشنوید", body: "قطب‌نما، خورشید و ماه و نقشه — و اذان تمام‌صفحه در هر وقت نماز." },
    ],
    getApp: "همین حالا رفیق المسلم را دریافت کنید",
  },
  prayer: { title: "اوقات نماز", more: "بیشتر", method: "روش محاسبه", next: "نماز بعدی" },
  articles: { recent: "تازه‌ترین مقاله‌ها", mostRead: "پربازدیدترین‌ها", viewMore: "مشاهدهٔ بیشتر" },
  qibla: {
    before: "هر کجا هستید، با روش‌های مختلف ",
    highlight: "جهت قبله",
    after: " را بیابید",
    methods: { compass: "قطب‌نما", sunMoon: "خورشید و ماه", shadow: "سایه", map: "نقشه" },
  },
  about: {
    title: "هر آنچه یک مسلمان نیاز دارد، در یک برنامهٔ رایگان",
    body: "رفیق المسلم اوقات نماز را به شما یادآوری می‌کند، در ذکر خدا یاری‌تان می‌دهد، شما را با قرآن کریم پیوند می‌دهد و به کارهای نیک بیشتر تشویق می‌کند. همراه هر مسلمان.",
    stats: [
      { value: "9", label: "کتاب حدیث" },
      { value: "9", label: "زبان" },
      { value: "بدون تبلیغات", label: "همیشه رایگان" },
    ],
  },
  reviews: {
    title: "نظر کاربران ما",
    body: "رفیق المسلم اوقات نماز را یادآوری می‌کند، در ذکر خدا یاری می‌دهد و شما را با قرآن پیوند می‌دهد.",
    write: "نظر خود را بنویسید",
  },
  contact: { title: "تماس با ما", body: "پرسش، پیشنهاد یا مشکلی دارید؟ برای ما بنویسید — همهٔ پیام‌ها را می‌خوانیم.", message: "از شنیدن نظر شما خوشحال می‌شویم", send: "ارسال" },
};

const ru: Home = {
  strip: { tagline: "Ваш спутник в поклонении", sub: "Коран · Хадисы · Азкары · Намаз — бесплатно, без рекламы" },
  hero: {
    slides: [
      { before: "Узнайте ", highlight: "время намаза", after: " для вашего места на день и месяц с полной точностью", body: "Точное время намаза для вашего города и азан к каждому намазу — с Рафик Аль-Муслим." },
      { before: "Достоверные ", highlight: "азкары и дуа", after: " из Корана и Сунны, которые нужны каждому мусульманину", body: "Утренние и вечерние азкары, «Крепость мусульманина» и тасбих — с аудио и счётчиком." },
      { before: "Читайте Коран в ", highlight: "мединском мусхафе", after: " с тафсиром, переводом и чтением", body: "Каждая страница как в мединском издании, со смыслами аятов на вашем языке." },
      { before: "Определяйте ", highlight: "киблу", after: " и слушайте азан, где бы вы ни были", body: "Компас, солнце и луна, карта — и полноэкранный азан к каждому намазу." },
    ],
    getApp: "Скачать Рафик Аль-Муслим",
  },
  prayer: { title: "Время намаза", more: "Подробнее", method: "Метод", next: "Следующий намаз" },
  articles: { recent: "Новые статьи", mostRead: "Самое читаемое", viewMore: "Показать ещё" },
  qibla: {
    before: "Определяйте ",
    highlight: "направление киблы",
    after: " где угодно, разными способами",
    methods: { compass: "компас", sunMoon: "солнце и луна", shadow: "тень", map: "карта" },
  },
  about: {
    title: "Всё, что нужно мусульманину, в одном бесплатном приложении",
    body: "Рафик Аль-Муслим напоминает о времени намаза, помогает поминать Аллаха, связывает вас с Кораном и побуждает к добрым делам. Спутник каждого мусульманина.",
    stats: [
      { value: "9", label: "Сборников хадисов" },
      { value: "9", label: "Языков" },
      { value: "Без рекламы", label: "Всегда бесплатно" },
    ],
  },
  reviews: {
    title: "Мнения наших пользователей",
    body: "Рафик Аль-Муслим напоминает о намазе, помогает поминать Аллаха и связывает с Кораном.",
    write: "Оставить отзыв",
  },
  contact: { title: "Связаться с нами", body: "Вопрос, предложение или проблема? Напишите нам — мы читаем каждое сообщение.", message: "Будем рады вашему сообщению", send: "Отправить" },
};

const ms: Home = {
  strip: { tagline: "Teman anda dalam ibadah", sub: "Al-Quran · Hadis · Azkar · Solat — percuma, tanpa iklan" },
  hero: {
    slides: [
      { before: "Ketahui ", highlight: "waktu solat", after: " harian dan bulanan mengikut lokasi anda dengan tepat", body: "Waktu solat yang tepat untuk bandar anda, dengan azan setiap waktu — bersama Rafiq Al-Muslim." },
      { before: "Terokai ", highlight: "zikir dan doa", after: " yang sahih dari Al-Quran dan Sunnah yang diperlukan setiap Muslim", body: "Zikir pagi dan petang, Hisnul Muslim dan tasbih, dengan audio dan pembilang." },
      { before: "Baca Al-Quran dengan ", highlight: "Mushaf Madinah", after: ", bersama tafsir, terjemahan dan bacaan", body: "Setiap halaman seperti cetakan Madinah, dengan makna ayat dalam bahasa anda." },
      { before: "Cari ", highlight: "arah kiblat", after: " dan dengar azan di mana sahaja anda berada", body: "Kompas, matahari dan bulan serta peta — dan azan skrin penuh setiap waktu solat." },
    ],
    getApp: "Dapatkan Rafiq Al-Muslim sekarang",
  },
  prayer: { title: "Waktu solat", more: "Lagi", method: "Kaedah", next: "Solat seterusnya" },
  articles: { recent: "Artikel terkini", mostRead: "Paling banyak dibaca", viewMore: "Lihat lagi" },
  qibla: {
    before: "Ketahui ",
    highlight: "arah kiblat",
    after: " di mana sahaja anda berada, dengan pelbagai cara",
    methods: { compass: "kompas", sunMoon: "matahari & bulan", shadow: "bayang", map: "peta" },
  },
  about: {
    title: "Semua keperluan seorang Muslim dalam satu aplikasi percuma",
    body: "Rafiq Al-Muslim mengingatkan anda waktu solat, membantu anda berzikir, menghubungkan anda dengan Al-Quran dan mendorong anda melakukan lebih banyak kebaikan. Teman setiap Muslim.",
    stats: [
      { value: "9", label: "Kitab hadis" },
      { value: "9", label: "Bahasa" },
      { value: "Tanpa iklan", label: "Percuma selamanya" },
    ],
  },
  reviews: {
    title: "Pendapat pengguna kami",
    body: "Rafiq Al-Muslim mengingatkan waktu solat, membantu berzikir dan menghubungkan anda dengan Al-Quran.",
    write: "Tulis ulasan anda",
  },
  contact: { title: "Hubungi kami", body: "Ada soalan, cadangan atau masalah? Tulis kepada kami — kami membaca setiap mesej.", message: "Kami gembira mendengar daripada anda", send: "Hantar" },
};

const tr: Home = {
  strip: { tagline: "İbadette yol arkadaşınız", sub: "Kur'an · Hadis · Zikir · Namaz — ücretsiz, reklamsız" },
  hero: {
    slides: [
      { before: "Bulunduğunuz yere göre günlük ve aylık ", highlight: "namaz vakitlerini", after: " tam doğrulukla öğrenin", body: "Şehrinizin doğru namaz vakitleri ve her namazda ezan — Rafiq Al-Muslim ile." },
      { before: "Her Müslümanın ihtiyaç duyduğu, Kur'an ve Sünnet'ten sahih ", highlight: "zikir ve dualar", after: "", body: "Sabah ve akşam zikirleri, Hisnü'l-Müslim ve tesbih — sesli ve sayaçlı." },
      { before: "Kur'an-ı Kerim'i ", highlight: "Medine Mushafı", after: " ile okuyun; tefsir, meal ve tilavetle", body: "Her sayfa Medine baskısındaki gibi, ayetlerin anlamı kendi dilinizde." },
      { before: "Nerede olursanız olun ", highlight: "kıbleyi", after: " bulun ve ezanı dinleyin", body: "Pusula, güneş ve ay, harita — ve her namaz vaktinde tam ekran ezan." },
    ],
    getApp: "Rafiq Al-Muslim'i hemen indirin",
  },
  prayer: { title: "Namaz vakitleri", more: "Daha fazla", method: "Hesaplama yöntemi", next: "Sıradaki namaz" },
  articles: { recent: "Son yazılar", mostRead: "En çok okunanlar", viewMore: "Daha fazla" },
  qibla: {
    before: "Nerede olursanız olun, farklı yöntemlerle ",
    highlight: "kıble yönünü",
    after: " bulun",
    methods: { compass: "pusula", sunMoon: "güneş ve ay", shadow: "gölge", map: "harita" },
  },
  about: {
    title: "Bir Müslümanın ihtiyacı olan her şey tek bir ücretsiz uygulamada",
    body: "Rafiq Al-Muslim size namaz vakitlerini hatırlatır, Allah'ı anmanıza yardım eder, sizi Kur'an'la buluşturur ve daha fazla iyiliğe teşvik eder. Her Müslümanın yol arkadaşı.",
    stats: [
      { value: "9", label: "Hadis kitabı" },
      { value: "9", label: "Dil" },
      { value: "Reklamsız", label: "Her zaman ücretsiz" },
    ],
  },
  reviews: {
    title: "Kullanıcılarımızın görüşleri",
    body: "Rafiq Al-Muslim namaz vakitlerini hatırlatır, zikre yardım eder ve sizi Kur'an'la buluşturur.",
    write: "Yorumunuzu yazın",
  },
  contact: { title: "Bize ulaşın", body: "Sorunuz, öneriniz ya da bir sorununuz mu var? Bize yazın — her mesajı okuyoruz.", message: "Sizden haber almaktan mutluluk duyarız", send: "Gönder" },
};

const id: Home = {
  strip: { tagline: "Teman Anda dalam ibadah", sub: "Al-Quran · Hadis · Azkar · Shalat — gratis, tanpa iklan" },
  hero: {
    slides: [
      { before: "Ketahui ", highlight: "jadwal shalat", after: " harian dan bulanan sesuai lokasi Anda dengan akurat", body: "Jadwal shalat yang tepat untuk kota Anda, dengan azan di setiap waktu — bersama Rafiq Al-Muslim." },
      { before: "Jelajahi ", highlight: "zikir dan doa", after: " sahih dari Al-Quran dan Sunnah yang dibutuhkan setiap Muslim", body: "Zikir pagi dan petang, Hisnul Muslim dan tasbih, dengan audio dan penghitung." },
      { before: "Baca Al-Quran dengan ", highlight: "Mushaf Madinah", after: ", lengkap dengan tafsir, terjemahan dan murattal", body: "Setiap halaman seperti cetakan Madinah, dengan makna ayat dalam bahasa Anda." },
      { before: "Temukan ", highlight: "arah kiblat", after: " dan dengarkan azan di mana pun Anda berada", body: "Kompas, matahari dan bulan serta peta — dan azan layar penuh di setiap waktu shalat." },
    ],
    getApp: "Unduh Rafiq Al-Muslim sekarang",
  },
  prayer: { title: "Jadwal shalat", more: "Selengkapnya", method: "Metode", next: "Shalat berikutnya" },
  articles: { recent: "Artikel terbaru", mostRead: "Paling banyak dibaca", viewMore: "Lihat lainnya" },
  qibla: {
    before: "Ketahui ",
    highlight: "arah kiblat",
    after: " di mana pun Anda berada, dengan berbagai cara",
    methods: { compass: "kompas", sunMoon: "matahari & bulan", shadow: "bayangan", map: "peta" },
  },
  about: {
    title: "Semua kebutuhan seorang Muslim dalam satu aplikasi gratis",
    body: "Rafiq Al-Muslim mengingatkan Anda waktu shalat, membantu Anda berzikir, menghubungkan Anda dengan Al-Quran dan mendorong Anda berbuat lebih banyak kebaikan. Teman setiap Muslim.",
    stats: [
      { value: "9", label: "Kitab hadis" },
      { value: "9", label: "Bahasa" },
      { value: "Tanpa iklan", label: "Gratis selamanya" },
    ],
  },
  reviews: {
    title: "Pendapat pengguna kami",
    body: "Rafiq Al-Muslim mengingatkan waktu shalat, membantu berzikir dan menghubungkan Anda dengan Al-Quran.",
    write: "Tulis ulasan Anda",
  },
  contact: { title: "Hubungi kami", body: "Ada pertanyaan, saran atau masalah? Kirimi kami pesan — kami membaca setiap pesan.", message: "Kami senang mendengar dari Anda", send: "Kirim" },
};

const hi: Home = {
  strip: { tagline: "इबादत में आपका साथी", sub: "क़ुरआन · हदीस · अज़कार · नमाज़ — मुफ़्त, बिना विज्ञापन" },
  hero: {
    slides: [
      { before: "अपनी लोकेशन के अनुसार दिन और महीने के ", highlight: "नमाज़ के समय", after: " पूरी सटीकता से जानें", body: "अपने शहर के नमाज़ के सही समय जानें, हर नमाज़ पर अज़ान के साथ — रफ़ीक़ अल-मुस्लिम के साथ।" },
      { before: "क़ुरआन और सुन्नत से वे सहीह ", highlight: "अज़कार और दुआएँ", after: " देखें जिनकी हर मुसलमान को ज़रूरत है", body: "सुबह और शाम के अज़कार, हिस्नुल मुस्लिम और तस्बीह, ऑडियो और काउंटर के साथ।" },
      { before: "", highlight: "मदीना मुसहफ़", after: " में क़ुरआन पढ़ें, तफ़सीर, अनुवाद और तिलावत के साथ", body: "हर पन्ना वैसा ही जैसा मदीना में छपा है, आयतों के अर्थ आपकी भाषा में।" },
      { before: "आप जहाँ भी हों, ", highlight: "क़िबला", after: " की दिशा जानें और अज़ान सुनें", body: "कम्पास, सूरज और चाँद और नक़्शा — और हर नमाज़ के समय फ़ुल-स्क्रीन अज़ान।" },
    ],
    getApp: "रफ़ीक़ अल-मुस्लिम अभी डाउनलोड करें",
  },
  prayer: { title: "नमाज़ के समय", more: "और", method: "गणना का तरीक़ा", next: "अगली नमाज़" },
  articles: { recent: "नए लेख", mostRead: "सबसे ज़्यादा पढ़े गए", viewMore: "और देखें" },
  qibla: {
    before: "आप जहाँ भी हों, अलग-अलग तरीक़ों से ",
    highlight: "क़िबला की दिशा",
    after: " जानें",
    methods: { compass: "कम्पास", sunMoon: "सूरज और चाँद", shadow: "छाया", map: "नक़्शा" },
  },
  about: {
    title: "एक मुसलमान को जो कुछ चाहिए, सब एक मुफ़्त ऐप में",
    body: "रफ़ीक़ अल-मुस्लिम आपको नमाज़ के समय याद दिलाता है, अल्लाह के ज़िक्र में आपकी मदद करता है, आपको क़ुरआन से जोड़ता है और ज़्यादा नेक अमल के लिए प्रेरित करता है। हर मुसलमान का साथी।",
    stats: [
      { value: "9", label: "हदीस की किताबें" },
      { value: "9", label: "भाषाएँ" },
      { value: "बिना विज्ञापन", label: "हमेशा मुफ़्त" },
    ],
  },
  reviews: {
    title: "हमारे यूज़र्स की राय",
    body: "रफ़ीक़ अल-मुस्लिम आपको नमाज़ के समय याद दिलाता है, अल्लाह के ज़िक्र में आपकी मदद करता है और आपको क़ुरआन से जोड़ता है।",
    write: "अपनी राय लिखें",
  },
  contact: { title: "हमसे संपर्क करें", body: "कोई सवाल, सुझाव या समस्या? हमें लिखें — हम हर संदेश पढ़ते हैं।", message: "आपकी बात सुनकर हमें ख़ुशी होगी", send: "भेजें" },
};

export const more: Record<Exclude<Locale, "en" | "ar">, Home> = { ur, fa, ru, ms, tr, id, hi };
