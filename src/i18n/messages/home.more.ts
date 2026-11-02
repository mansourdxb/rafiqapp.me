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
      { value: "25", label: "زبانیں" },
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
      { value: "25", label: "زبان" },
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
      { value: "25", label: "Языков" },
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
      { value: "25", label: "Bahasa" },
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
      { value: "25", label: "Dil" },
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
      { value: "25", label: "Bahasa" },
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
      { value: "25", label: "भाषाएँ" },
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

const bn: Home = {
  strip: { tagline: "ইবাদতে আপনার সঙ্গী", sub: "কুরআন · হাদিস · আজকার · নামাজ — বিনামূল্যে, বিজ্ঞাপন ছাড়া" },
  hero: {
    slides: [
      { before: "আপনার লোকেশন অনুযায়ী দিন ও মাসের ", highlight: "নামাজের সময়", after: " নির্ভুলভাবে জানুন", body: "আপনার শহরের নামাজের সঠিক সময় জানুন, প্রতি ওয়াক্তে আজানসহ — রফিক আল-মুসলিমের সঙ্গে।" },
      { before: "কুরআন ও সুন্নাহর সেই সহিহ ", highlight: "আজকার ও দোয়া", after: " দেখুন, যা প্রত্যেক মুসলমানের প্রয়োজন", body: "সকাল-সন্ধ্যার আজকার, হিসনুল মুসলিম ও তাসবিহ, অডিও ও কাউন্টারসহ।" },
      { before: "", highlight: "মদিনার মুসহাফে", after: " কুরআন পড়ুন, তাফসির, অনুবাদ ও তিলাওয়াতসহ", body: "প্রতিটি পৃষ্ঠা মদিনায় ছাপা মুসহাফের মতোই, আয়াতের অর্থ আপনার ভাষায়।" },
      { before: "আপনি যেখানেই থাকুন, ", highlight: "কিবলার", after: " দিক জানুন এবং আজান শুনুন", body: "কম্পাস, সূর্য ও চাঁদ এবং মানচিত্র — আর প্রতি ওয়াক্তে পূর্ণ পর্দায় আজান।" },
    ],
    getApp: "রফিক আল-মুসলিম এখনই ডাউনলোড করুন",
  },
  prayer: { title: "নামাজের সময়", more: "আরও", method: "হিসাবের পদ্ধতি", next: "পরবর্তী নামাজ" },
  articles: { recent: "নতুন প্রবন্ধ", mostRead: "সবচেয়ে বেশি পঠিত", viewMore: "আরও দেখুন" },
  qibla: {
    before: "আপনি যেখানেই থাকুন, বিভিন্ন উপায়ে ",
    highlight: "কিবলার দিক",
    after: " জানুন",
    methods: { compass: "কম্পাস", sunMoon: "সূর্য ও চাঁদ", shadow: "ছায়া", map: "মানচিত্র" },
  },
  about: {
    title: "একজন মুসলমানের যা কিছু প্রয়োজন, সবই একটি বিনামূল্যের অ্যাপে",
    body: "রফিক আল-মুসলিম আপনাকে নামাজের সময় মনে করিয়ে দেয়, আল্লাহর জিকিরে সাহায্য করে, কুরআনের সঙ্গে যুক্ত রাখে এবং আরও বেশি নেক আমলে উৎসাহ দেয়। প্রত্যেক মুসলমানের সঙ্গী।",
    stats: [
      { value: "9", label: "হাদিস গ্রন্থ" },
      { value: "25", label: "ভাষা" },
      { value: "বিজ্ঞাপন নেই", label: "সবসময় বিনামূল্যে" },
    ],
  },
  reviews: {
    title: "আমাদের ব্যবহারকারীদের মতামত",
    body: "রফিক আল-মুসলিম আপনাকে নামাজের সময় মনে করিয়ে দেয়, আল্লাহর জিকিরে সাহায্য করে এবং কুরআনের সঙ্গে যুক্ত রাখে।",
    write: "আপনার মতামত লিখুন",
  },
  contact: { title: "যোগাযোগ করুন", body: "কোনো প্রশ্ন, পরামর্শ বা সমস্যা? আমাদের লিখুন — আমরা প্রতিটি বার্তা পড়ি।", message: "আপনার কথা শুনতে পেলে আমরা খুশি হব", send: "পাঠান" },
};

const ha: Home = {
  strip: { tagline: "Abokinka a cikin ibada", sub: "Alƙur'ani · Hadisi · Azkar · Sallah — kyauta, babu talla" },
  hero: {
    slides: [
      { before: "San ", highlight: "lokutan sallah", after: " bisa wurin da kake, na yini da na wata, cikin cikakken daidaito", body: "San ainihin lokutan sallah na garinku, tare da kiran sallah a kowace sallah — tare da Rafiq Al-Muslim." },
      { before: "Duba ingantattun ", highlight: "azkar da addu'o'i", after: " daga Alƙur'ani da Sunna waɗanda kowane Musulmi yake buƙata", body: "Azkar na safe da na yamma, Hisnul Muslim da tasbihi, tare da sauti da mai ƙirgawa." },
      { before: "Karanta Alƙur'ani a ", highlight: "Mushafin Madina", after: ", tare da tafsiri, fassara da karatu", body: "Kowane shafi kamar yadda aka buga shi a Madina, tare da ma'anonin ayoyi a harshenka." },
      { before: "Gano ", highlight: "alƙibla", after: " kuma ka ji kiran sallah a duk inda kake", body: "Kamfas, rana da wata da taswira — da kiran sallah mai cike da allo a kowane lokacin sallah." },
    ],
    getApp: "Sauke Rafiq Al-Muslim yanzu",
  },
  prayer: { title: "Lokacin sallah", more: "Ƙari", method: "Hanyar lissafi", next: "Sallah mai zuwa" },
  articles: { recent: "Sababbin maƙaloli", mostRead: "Waɗanda aka fi karantawa", viewMore: "Duba ƙari" },
  qibla: {
    before: "San ",
    highlight: "inda alƙibla take",
    after: " a duk inda kake, ta hanyoyi daban-daban",
    methods: { compass: "kamfas", sunMoon: "rana da wata", shadow: "inuwa", map: "taswira" },
  },
  about: {
    title: "Duk abin da Musulmi yake buƙata, a cikin manhaja ɗaya kyauta",
    body: "Rafiq Al-Muslim yana tunatar da kai lokutan sallah, yana taimaka maka wajen ambaton Allah, yana haɗa ka da Alƙur'ani kuma yana ƙarfafa ka ka ƙara ayyukan alheri. Abokin kowane Musulmi.",
    stats: [
      { value: "9", label: "Littattafan hadisi" },
      { value: "25", label: "Harsuna" },
      { value: "Babu talla", label: "Kyauta har abada" },
    ],
  },
  reviews: {
    title: "Ra'ayoyin masu amfani da mu",
    body: "Rafiq Al-Muslim yana tunatar da kai lokutan sallah, yana taimaka maka wajen ambaton Allah kuma yana haɗa ka da Alƙur'ani.",
    write: "Rubuta ra'ayinka",
  },
  contact: { title: "Tuntuɓe mu", body: "Kana da tambaya, shawara ko matsala? Rubuto mana — muna karanta kowane saƙo.", message: "Muna farin cikin jin ta bakinka", send: "Aika" },
};

const fr: Home = {
  strip: { tagline: "Votre compagnon dans l’adoration", sub: "Coran · Hadiths · Adhkar · Prière — gratuit, sans publicité" },
  hero: {
    slides: [
      { before: "Connaissez les ", highlight: "horaires de prière", after: " selon votre position, pour le jour et pour le mois, en toute précision", body: "Connaissez les horaires de prière exacts de votre ville, avec l’adhan à chaque prière — avec Rafiq Al-Muslim." },
      { before: "Parcourez les ", highlight: "adhkar et douas", after: " authentiques du Coran et de la Sunna dont chaque musulman a besoin", body: "Adhkar du matin et du soir, Hisn al-Muslim et le tasbih, avec l’audio et un compteur." },
      { before: "Lisez le Coran dans le ", highlight: "Mushaf de Médine", after: ", avec tafsir, traduction et récitation", body: "Chaque page telle qu’imprimée à Médine, avec le sens des versets dans votre langue." },
      { before: "Trouvez la ", highlight: "qibla", after: " et écoutez l’adhan où que vous soyez", body: "Boussole, soleil et lune, et carte — et un adhan en plein écran à chaque heure de prière." },
    ],
    getApp: "Téléchargez Rafiq Al-Muslim dès maintenant",
  },
  prayer: { title: "Heure de prière", more: "Plus", method: "Méthode", next: "Prochaine prière" },
  articles: { recent: "Articles récents", mostRead: "Les plus lus", viewMore: "Voir plus" },
  qibla: {
    before: "Connaissez la ",
    highlight: "direction de la qibla",
    after: " où que vous soyez, grâce à différentes méthodes",
    methods: { compass: "boussole", sunMoon: "soleil et lune", shadow: "ombre", map: "carte" },
  },
  about: {
    title: "Tout ce dont un musulman a besoin, dans une seule application gratuite",
    body: "Rafiq Al-Muslim vous rappelle les horaires de prière, vous aide à vous souvenir d’Allah, vous relie au Coran et vous encourage à faire davantage de bien. Le compagnon de chaque musulman.",
    stats: [
      { value: "9", label: "Recueils de hadiths" },
      { value: "25", label: "Langues" },
      { value: "Sans pub", label: "Gratuit pour toujours" },
    ],
  },
  reviews: {
    title: "L’avis de nos utilisateurs",
    body: "Rafiq Al-Muslim vous rappelle les horaires de prière, vous aide à vous souvenir d’Allah et vous relie au Coran.",
    write: "Donnez votre avis",
  },
  contact: {
    title: "Nous contacter",
    body: "Une question, une suggestion ou un problème ? Écrivez-nous — nous lisons chaque message.",
    message: "Nous serons ravis de vous lire",
    send: "Envoyer",
  },
};

const zh: Home = {
  strip: { tagline: "您的功修伙伴", sub: "古兰经 · 圣训 · 记念词 · 礼拜——免费，无广告" },
  hero: {
    slides: [
      { before: "根据您的位置，精准掌握每天和每月的", highlight: "礼拜时间", after: "", body: "借助 Rafiq Al-Muslim，了解您所在城市准确的礼拜时间，每次礼拜都有宣礼提醒。" },
      { before: "浏览每位穆斯林都需要的、出自《古兰经》和圣行的可靠", highlight: "记念词与都阿", after: "", body: "早晨和傍晚记念词、《穆斯林堡垒》和赞念，附音频和计数器。" },
      { before: "阅读", highlight: "麦地那版经本", after: "的《古兰经》，附经注、译文和诵读", body: "每一页都与麦地那印刷版一致，并附有您的语言的经文意义。" },
      { before: "无论身在何处，都能找到", highlight: "朝向", after: "并聆听宣礼", body: "指南针、太阳和月亮、地图——每到礼拜时间还有全屏宣礼。" },
    ],
    getApp: "立即下载 Rafiq Al-Muslim",
  },
  prayer: { title: "礼拜时间", more: "更多", method: "计算方法", next: "下一次礼拜" },
  articles: { recent: "最新文章", mostRead: "最多阅读", viewMore: "查看更多" },
  qibla: {
    before: "无论身在何处，都能通过多种方法找到",
    highlight: "朝向",
    after: "",
    methods: { compass: "指南针", sunMoon: "太阳和月亮", shadow: "影子", map: "地图" },
  },
  about: {
    title: "穆斯林所需的一切，尽在一款免费应用",
    body: "Rafiq Al-Muslim 提醒您礼拜时间，帮助您记念真主，让您与《古兰经》相连，并鼓励您多行善功。每一位穆斯林的伙伴。",
    stats: [
      { value: "9", label: "部圣训集" },
      { value: "25", label: "种语言" },
      { value: "无广告", label: "永久免费" },
    ],
  },
  reviews: {
    title: "用户评价",
    body: "Rafiq Al-Muslim 提醒您礼拜时间，帮助您记念真主，让您与《古兰经》相连。",
    write: "写评价",
  },
  contact: {
    title: "联系我们",
    body: "有问题、建议或遇到故障？给我们写信——每条消息我们都会阅读。",
    message: "期待您的来信",
    send: "发送",
  },
};

const ps: Home = {
  strip: { tagline: "په عبادت کې ستاسو ملګری", sub: "قرآن · حدیث · اذکار · لمونځ — وړیا او بې له اعلانونو" },
  hero: {
    slides: [
      { before: "", highlight: "د لمانځه وختونه", after: " د خپل ځای له مخې، د ورځې او میاشتې لپاره، په بشپړ دقت سره وپېژنئ", body: "د خپل ښار د لمانځه دقیق وختونه د هر لمانځه له اذان سره وپېژنئ — له رفیق المسلم سره." },
      { before: "د قرآن او سنتو صحیح ", highlight: "اذکار او دعاګانې", after: " وګورئ چې هر مسلمان ورته اړتیا لري", body: "د سهار او ماښام اذکار، حصن المسلم او تسبیح، له غږ او شمېرونکي سره." },
      { before: "قرآن کریم په ", highlight: "مدني مصحف", after: " کې ولولئ، له تفسیر، ژباړې او تلاوت سره", body: "هر مخ لکه څنګه چې په مدینه منوره کې چاپ شوی، د آیتونو له مانا سره په خپله ژبه." },
      { before: "هر چېرې چې یاست، ", highlight: "قبله", after: " ومومئ او اذان واورئ", body: "قطب‌نما، لمر او سپوږمۍ او نقشه — او د هر لمانځه په وخت د بشپړې پردې اذان." },
    ],
    getApp: "همدا اوس رفیق المسلم ترلاسه کړئ",
  },
  prayer: { title: "د لمانځه وخت", more: "نور", method: "د محاسبې طریقه", next: "بل لمونځ" },
  articles: { recent: "نوې لیکنې", mostRead: "ډېرې لوستل شوې", viewMore: "نور وګورئ" },
  qibla: {
    before: "هر چېرې چې یاست، په بېلابېلو لارو ",
    highlight: "د قبلې لوری",
    after: " وپېژنئ",
    methods: { compass: "قطب‌نما", sunMoon: "لمر او سپوږمۍ", shadow: "سیوری", map: "نقشه" },
  },
  about: {
    title: "هر هغه څه چې یو مسلمان ورته اړتیا لري، په یوه وړیا اپلیکېشن کې",
    body: "رفیق المسلم تاسو ته د لمانځه وختونه در یادوي، د الله په ذکر کې مو مرسته کوي، له قرآن کریم سره مو تړي او ډېرو نېکیو ته مو هڅوي. د هر مسلمان ملګری.",
    stats: [
      { value: "9", label: "د حدیثو کتابونه" },
      { value: "25", label: "ژبې" },
      { value: "بې له اعلانونو", label: "تل وړیا" },
    ],
  },
  reviews: {
    title: "زموږ د کاروونکو نظرونه",
    body: "رفیق المسلم تاسو ته د لمانځه وختونه در یادوي، د الله په ذکر کې مو مرسته کوي او له قرآن سره مو تړي.",
    write: "خپل نظر ولیکئ",
  },
  contact: { title: "له موږ سره اړیکه", body: "پوښتنه، وړاندیز یا کومه ستونزه لرئ؟ موږ ته ولیکئ — موږ هر پیغام لولو.", message: "ستاسو پیغام ته سترګې په لار یو", send: "لېږل" },
};

const pa: Home = {
  strip: { tagline: "ਇਬਾਦਤ ਵਿੱਚ ਤੁਹਾਡਾ ਸਾਥੀ", sub: "ਕੁਰਆਨ · ਹਦੀਸ · ਅਜ਼ਕਾਰ · ਨਮਾਜ਼ — ਮੁਫ਼ਤ, ਬਿਨਾਂ ਇਸ਼ਤਿਹਾਰਾਂ ਦੇ" },
  hero: {
    slides: [
      { before: "ਆਪਣੇ ਟਿਕਾਣੇ ਮੁਤਾਬਕ ਦਿਨ ਅਤੇ ਮਹੀਨੇ ਦੇ ", highlight: "ਨਮਾਜ਼ ਦੇ ਸਮੇਂ", after: " ਪੂਰੀ ਸਹੀ ਤਰ੍ਹਾਂ ਜਾਣੋ", body: "ਰਫ਼ੀਕ ਅਲ-ਮੁਸਲਿਮ ਨਾਲ ਆਪਣੇ ਸ਼ਹਿਰ ਦੇ ਨਮਾਜ਼ ਦੇ ਸਹੀ ਸਮੇਂ ਜਾਣੋ, ਹਰ ਨਮਾਜ਼ 'ਤੇ ਅਜ਼ਾਨ ਦੇ ਨਾਲ।" },
      { before: "ਕੁਰਆਨ ਅਤੇ ਸੁੰਨਤ ਦੇ ਉਹ ਪ੍ਰਮਾਣਿਕ ", highlight: "ਅਜ਼ਕਾਰ ਅਤੇ ਦੁਆਵਾਂ", after: " ਵੇਖੋ ਜਿਨ੍ਹਾਂ ਦੀ ਹਰ ਮੁਸਲਮਾਨ ਨੂੰ ਲੋੜ ਹੈ", body: "ਸਵੇਰ ਅਤੇ ਸ਼ਾਮ ਦੇ ਅਜ਼ਕਾਰ, ਹਿਸਨੁਲ ਮੁਸਲਿਮ ਅਤੇ ਤਸਬੀਹ, ਆਵਾਜ਼ ਅਤੇ ਗਿਣਤੀ ਦੇ ਨਾਲ।" },
      { before: "", highlight: "ਮਦੀਨੇ ਵਾਲੇ ਮੁਸਹਫ਼", after: " ਵਿੱਚ ਕੁਰਆਨ ਪੜ੍ਹੋ, ਤਫ਼ਸੀਰ, ਤਰਜਮੇ ਅਤੇ ਤਿਲਾਵਤ ਦੇ ਨਾਲ", body: "ਹਰ ਸਫ਼ਾ ਉਸੇ ਤਰ੍ਹਾਂ ਜਿਵੇਂ ਮਦੀਨੇ ਵਿੱਚ ਛਪਿਆ ਹੈ, ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਆਇਤਾਂ ਦੇ ਅਰਥਾਂ ਨਾਲ।" },
      { before: "ਜਿੱਥੇ ਵੀ ਹੋਵੋ ", highlight: "ਕਿਬਲਾ", after: " ਲੱਭੋ ਅਤੇ ਅਜ਼ਾਨ ਸੁਣੋ", body: "ਕੰਪਾਸ, ਸੂਰਜ ਅਤੇ ਚੰਨ ਅਤੇ ਨਕਸ਼ਾ — ਅਤੇ ਹਰ ਨਮਾਜ਼ ਦੇ ਸਮੇਂ ਪੂਰੀ ਸਕਰੀਨ 'ਤੇ ਅਜ਼ਾਨ।" },
    ],
    getApp: "ਰਫ਼ੀਕ ਅਲ-ਮੁਸਲਿਮ ਹੁਣੇ ਲਓ",
  },
  prayer: { title: "ਨਮਾਜ਼ ਦਾ ਸਮਾਂ", more: "ਹੋਰ", method: "ਤਰੀਕਾ", next: "ਅਗਲੀ ਨਮਾਜ਼" },
  articles: { recent: "ਨਵੇਂ ਲੇਖ", mostRead: "ਸਭ ਤੋਂ ਵੱਧ ਪੜ੍ਹੇ ਗਏ", viewMore: "ਹੋਰ ਵੇਖੋ" },
  qibla: {
    before: "ਜਿੱਥੇ ਵੀ ਹੋਵੋ, ਵੱਖ-ਵੱਖ ਤਰੀਕਿਆਂ ਨਾਲ ",
    highlight: "ਕਿਬਲੇ ਦੀ ਦਿਸ਼ਾ",
    after: " ਜਾਣੋ",
    methods: { compass: "ਕੰਪਾਸ", sunMoon: "ਸੂਰਜ ਅਤੇ ਚੰਨ", shadow: "ਪਰਛਾਵਾਂ", map: "ਨਕਸ਼ਾ" },
  },
  about: {
    title: "ਇੱਕ ਮੁਸਲਮਾਨ ਦੀ ਲੋੜ ਦੀ ਹਰ ਚੀਜ਼, ਇੱਕ ਮੁਫ਼ਤ ਐਪ ਵਿੱਚ",
    body: "ਰਫ਼ੀਕ ਅਲ-ਮੁਸਲਿਮ ਤੁਹਾਨੂੰ ਨਮਾਜ਼ ਦੇ ਸਮੇਂ ਯਾਦ ਕਰਵਾਉਂਦਾ ਹੈ, ਅੱਲਾਹ ਦੇ ਜ਼ਿਕਰ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ, ਤੁਹਾਨੂੰ ਕੁਰਆਨ ਨਾਲ ਜੋੜਦਾ ਹੈ ਅਤੇ ਹੋਰ ਨੇਕੀ ਕਰਨ ਦਾ ਹੌਸਲਾ ਦਿੰਦਾ ਹੈ। ਹਰ ਮੁਸਲਮਾਨ ਦਾ ਸਾਥੀ।",
    stats: [
      { value: "9", label: "ਹਦੀਸ ਦੀਆਂ ਕਿਤਾਬਾਂ" },
      { value: "25", label: "ਭਾਸ਼ਾਵਾਂ" },
      { value: "ਕੋਈ ਇਸ਼ਤਿਹਾਰ ਨਹੀਂ", label: "ਹਮੇਸ਼ਾ ਲਈ ਮੁਫ਼ਤ" },
    ],
  },
  reviews: {
    title: "ਸਾਡੇ ਵਰਤੋਂਕਾਰਾਂ ਦੀ ਰਾਏ",
    body: "ਰਫ਼ੀਕ ਅਲ-ਮੁਸਲਿਮ ਤੁਹਾਨੂੰ ਨਮਾਜ਼ ਦੇ ਸਮੇਂ ਯਾਦ ਕਰਵਾਉਂਦਾ ਹੈ, ਅੱਲਾਹ ਦੇ ਜ਼ਿਕਰ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ ਅਤੇ ਤੁਹਾਨੂੰ ਕੁਰਆਨ ਨਾਲ ਜੋੜਦਾ ਹੈ।",
    write: "ਆਪਣੀ ਰਾਏ ਲਿਖੋ",
  },
  contact: {
    title: "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    body: "ਸਵਾਲ, ਸੁਝਾਅ ਜਾਂ ਕੋਈ ਸਮੱਸਿਆ? ਸਾਨੂੰ ਲਿਖੋ — ਅਸੀਂ ਹਰ ਸੁਨੇਹਾ ਪੜ੍ਹਦੇ ਹਾਂ।",
    message: "ਤੁਹਾਡੇ ਸੁਨੇਹੇ ਦੀ ਉਡੀਕ ਹੈ",
    send: "ਭੇਜੋ",
  },
};
const pnb: Home = {
  strip: { tagline: "عبادت وچ تہاڈا ساتھی", sub: "قرآن · حدیث · اذکار · نماز — مفت تے اشتہاراں توں بغیر" },
  hero: {
    slides: [
      { before: "اپنی تھاں دے حساب نال دن تے مہینے دے ", highlight: "نماز دے ویلے", after: " پوری درستی نال جاݨو", body: "اپنے شہر دے نماز دے ٹھیک ویلے جاݨو، ہر نماز دی اذان دے نال — رفیق المسلم نال۔" },
      { before: "قرآن تے سنت دے صحیح ", highlight: "اذکار تے دعاواں", after: " ویکھو جنہاں دی ہر مسلمان نوں لوڑ اے", body: "سویر تے شام دے اذکار، حصن المسلم تے تسبیح، آواز تے گنتی دے نال۔" },
      { before: "قرآن مجید ", highlight: "مدنی مصحف", after: " وچ پڑھو، تفسیر، ترجمے تے تلاوت دے نال", body: "ہر صفحہ اوویں ای جیویں مدینہ منورہ وچ چھپیا، آیتاں دے مطلب تہاڈی اپنی زبان وچ۔" },
      { before: "جتھے وی ہووو، ", highlight: "قبلہ", after: " لبھو تے اذان سݨو", body: "قطب نما، سورج تے چن تے نقشہ — تے ہر نماز دے ویلے پوری سکرین والی اذان۔" },
    ],
    getApp: "ہُݨے رفیق المسلم لوو",
  },
  prayer: { title: "نماز دا ویلا", more: "ہور", method: "حساب دا طریقہ", next: "اگلی نماز" },
  articles: { recent: "نویں مضمون", mostRead: "سب توں ودھ پڑھے گئے", viewMore: "ہور ویکھو" },
  qibla: {
    before: "جتھے وی ہووو، وکھو وکھ طریقیاں نال ",
    highlight: "قبلے دا رخ",
    after: " جاݨو",
    methods: { compass: "قطب نما", sunMoon: "سورج تے چن", shadow: "پرچھاواں", map: "نقشہ" },
  },
  about: {
    title: "جو کجھ اک مسلمان نوں چاہیدا اے، اک مفت ایپ وچ",
    body: "رفیق المسلم تہانوں نماز دے ویلے یاد کراندا اے، اللہ دے ذکر وچ تہاڈی مدد کردا اے، تہانوں قرآن نال جوڑدا اے تے ہور نیکیاں کرن دا حوصلہ دیندا اے۔ ہر مسلمان دا ساتھی۔",
    stats: [
      { value: "9", label: "حدیث دیاں کتاباں" },
      { value: "25", label: "زباناں" },
      { value: "اشتہاراں توں بغیر", label: "ہمیشہ مفت" },
    ],
  },
  reviews: {
    title: "ساڈے ورتن والیاں دیاں راواں",
    body: "رفیق المسلم تہانوں نماز دے ویلے یاد کراندا اے، اللہ دے ذکر وچ تہاڈی مدد کردا اے تے تہانوں قرآن نال جوڑدا اے۔",
    write: "اپنی رائے لکھو",
  },
  contact: { title: "ساڈے نال رابطہ", body: "کوئی سوال، مشورہ یا مسئلہ اے؟ سانوں لکھو — اسیں ہر سنیہا پڑھدے آں۔", message: "تہاڈے سنیہے دی اڈیک اے", send: "گھلو" },
};

const uz: Home = {
  strip: { tagline: "Ibodatdagi hamrohingiz", sub: "Qurʼon · Hadis · Zikrlar · Namoz — bepul, reklamasiz" },
  hero: {
    slides: [
      { before: "Joylashuvingizga koʻra kunlik va oylik ", highlight: "namoz vaqtlari", after: "ni toʻliq aniqlikda bilib oling", body: "Rafiq Al-Muslim bilan shahringizdagi aniq namoz vaqtlarini bilib oling, har bir namozda azon bilan." },
      { before: "Har bir musulmonga kerak boʻlgan, Qurʼon va Sunnatdan olingan sahih ", highlight: "zikr va duolar", after: "ni koʻrib chiqing", body: "Tonggi va kechki zikrlar, Hisnul Muslim va tasbeh — ovoz va hisoblagich bilan." },
      { before: "Qurʼonni ", highlight: "Madina mus-hafi", after: "da tafsir, tarjima va tilovat bilan oʻqing", body: "Har bir sahifa Madinada chop etilganidek, oyatlarning maʼnolari oʻz tilingizda." },
      { before: "Qayerda boʻlmang, ", highlight: "qibla", after: "ni toping va azonni eshiting", body: "Kompas, quyosh va oy hamda xarita — va har bir namoz vaqtida toʻliq ekranli azon." },
    ],
    getApp: "Rafiq Al-Muslim ilovasini hozir yuklab oling",
  },
  prayer: { title: "Namoz vaqti", more: "Yana", method: "Hisoblash usuli", next: "Keyingi namoz" },
  articles: { recent: "Soʻnggi maqolalar", mostRead: "Eng koʻp oʻqilganlar", viewMore: "Koʻproq koʻrish" },
  qibla: {
    before: "Qayerda boʻlmang, turli usullar bilan ",
    highlight: "qibla yoʻnalishi",
    after: "ni bilib oling",
    methods: { compass: "kompas", sunMoon: "quyosh va oy", shadow: "soya", map: "xarita" },
  },
  about: {
    title: "Musulmonga kerak boʻlgan hamma narsa — bitta bepul ilovada",
    body: "Rafiq Al-Muslim sizga namoz vaqtlarini eslatadi, Allohni zikr qilishingizga yordam beradi, sizni Qurʼon bilan bogʻlaydi va koʻproq yaxshilik qilishga undaydi. Har bir musulmonning hamrohi.",
    stats: [
      { value: "9", label: "Hadis kitoblari" },
      { value: "25", label: "Til" },
      { value: "Reklamasiz", label: "Doimo bepul" },
    ],
  },
  reviews: {
    title: "Foydalanuvchilarimiz fikrlari",
    body: "Rafiq Al-Muslim sizga namoz vaqtlarini eslatadi, Allohni zikr qilishingizga yordam beradi va sizni Qurʼon bilan bogʻlaydi.",
    write: "Fikringizni yozing",
  },
  contact: {
    title: "Biz bilan bogʻlanish",
    body: "Savol, taklif yoki muammo bormi? Bizga yozing — biz har bir xabarni oʻqiymiz.",
    message: "Xabaringizni kutamiz",
    send: "Yuborish",
  },
};
const uzCyrl: Home = {
  strip: { tagline: "Ибодатдаги ҳамроҳингиз", sub: "Қуръон · Ҳадис · Зикрлар · Намоз — бепул, рекламасиз" },
  hero: {
    slides: [
      { before: "Жойлашувингизга кўра кунлик ва ойлик ", highlight: "намоз вақтлари", after: "ни тўлиқ аниқликда билиб олинг", body: "Рафиқ Ал-Муслим билан шаҳрингиздаги аниқ намоз вақтларини билиб олинг, ҳар бир намозда азон билан." },
      { before: "Ҳар бир мусулмонга керак бўлган, Қуръон ва Суннатдан олинган саҳиҳ ", highlight: "зикр ва дуолар", after: "ни кўриб чиқинг", body: "Тонгги ва кечки зикрлар, Ҳиснул Муслим ва тасбеҳ — овоз ва ҳисоблагич билан." },
      { before: "Қуръонни ", highlight: "Мадина мус-ҳафи", after: "да тафсир, таржима ва тиловат билан ўқинг", body: "Ҳар бир саҳифа Мадинада чоп этилганидек, оятларнинг маънолари ўз тилингизда." },
      { before: "Қаерда бўлманг, ", highlight: "қибла", after: "ни топинг ва азонни эшитинг", body: "Компас, қуёш ва ой ҳамда харита — ва ҳар бир намоз вақтида тўлиқ экранли азон." },
    ],
    getApp: "Рафиқ Ал-Муслим иловасини ҳозир юклаб олинг",
  },
  prayer: { title: "Намоз вақти", more: "Яна", method: "Ҳисоблаш усули", next: "Кейинги намоз" },
  articles: { recent: "Сўнгги мақолалар", mostRead: "Энг кўп ўқилганлар", viewMore: "Кўпроқ кўриш" },
  qibla: {
    before: "Қаерда бўлманг, турли усуллар билан ",
    highlight: "қибла йўналиши",
    after: "ни билиб олинг",
    methods: { compass: "компас", sunMoon: "қуёш ва ой", shadow: "соя", map: "харита" },
  },
  about: {
    title: "Мусулмонга керак бўлган ҳамма нарса — битта бепул иловада",
    body: "Рафиқ Ал-Муслим сизга намоз вақтларини эслатади, Аллоҳни зикр қилишингизга ёрдам беради, сизни Қуръон билан боғлайди ва кўпроқ яхшилик қилишга ундайди. Ҳар бир мусулмоннинг ҳамроҳи.",
    stats: [
      { value: "9", label: "Ҳадис китоблари" },
      { value: "25", label: "Тил" },
      { value: "Рекламасиз", label: "Доимо бепул" },
    ],
  },
  reviews: {
    title: "Фойдаланувчиларимиз фикрлари",
    body: "Рафиқ Ал-Муслим сизга намоз вақтларини эслатади, Аллоҳни зикр қилишингизга ёрдам беради ва сизни Қуръон билан боғлайди.",
    write: "Фикрингизни ёзинг",
  },
  contact: {
    title: "Биз билан боғланиш",
    body: "Савол, таклиф ёки муаммо борми? Бизга ёзинг — биз ҳар бир хабарни ўқиймиз.",
    message: "Хабарингизни кутамиз",
    send: "Юбориш",
  },
};

const so: Home = {
  strip: { tagline: "Saaxiibkaaga cibaadada", sub: "Qur’aan · Xadiis · Adkaar · Salaad — bilaash, xayeysiis la’aan" },
  hero: {
    slides: [
      { before: "Ogow ", highlight: "waqtiyada salaadda", after: " sida ay goobtaadu tahay, maalinta iyo bisha, si sax ah oo dhammaystiran", body: "Ogow waqtiyada saxda ah ee salaadda magaaladaada, oo leh aadaan salaad kasta — adigoo isticmaalaya Rafiq Al-Muslim." },
      { before: "Daalaco ", highlight: "adkaarta iyo ducooyinka", after: " saxiixa ah ee Qur’aanka iyo Sunnada ee uu Muslim kastaa u baahan yahay", body: "Adkaarta subaxa iyo galabta, Xisnul Muslim iyo tasbiixda, oo leh cod iyo tiriye." },
      { before: "Ku akhri Qur’aanka ", highlight: "Mushafka Madiina", after: ", oo leh tafsiir, tarjumaad iyo tilaawad", body: "Bog kasta sida loogu daabacay Madiina, oo leh macnaha aayadaha luqaddaada." },
      { before: "Hel ", highlight: "Qiblada", after: " oo maqal aadaanka meel kasta oo aad joogto", body: "Jiheeye, qorraxda iyo dayaxa iyo khariidad — iyo aadaan shaashadda buuxiya waqti kasta oo salaadeed." },
    ],
    getApp: "Hadda soo deji Rafiq Al-Muslim",
  },
  prayer: { title: "Waqtiga salaadda", more: "Wax kale", method: "Habka xisaabinta", next: "Salaadda xigta" },
  articles: { recent: "Maqaallada ugu dambeeyay", mostRead: "Kuwa ugu badan ee la akhriyay", viewMore: "Arag wax kale" },
  qibla: {
    before: "Ogow ",
    highlight: "jihada Qiblada",
    after: " meel kasta oo aad joogto, adigoo isticmaalaya habab kala duwan",
    methods: { compass: "jiheeye", sunMoon: "qorraxda iyo dayaxa", shadow: "hooska", map: "khariidad" },
  },
  about: {
    title: "Wax kasta oo Muslimku u baahan yahay, hal barnaamij oo bilaash ah",
    body: "Rafiq Al-Muslim wuxuu kugu xusuusiyaa waqtiyada salaadda, wuxuu kaa caawiyaa xusidda Allaah, wuxuu kugu xiraa Qur’aanka wuxuuna kugu dhiirrigeliyaa inaad samaysid khayr badan. Saaxiibka Muslim kasta.",
    stats: [
      { value: "9", label: "Kutubta xadiiska" },
      { value: "25", label: "Luqadood" },
      { value: "Xayeysiis la’aan", label: "Had iyo jeer bilaash" },
    ],
  },
  reviews: {
    title: "Fikradaha isticmaalayaashayada",
    body: "Rafiq Al-Muslim wuxuu kugu xusuusiyaa waqtiyada salaadda, wuxuu kaa caawiyaa xusidda Allaah wuxuuna kugu xiraa Qur’aanka.",
    write: "Qor fikraddaada",
  },
  contact: {
    title: "Nala soo xiriir",
    body: "Su’aal, soo jeedin ama dhibaato ma qabtaa? Noo soo qor — fariin kasta waan akhrinnaa.",
    message: "Waan ku faraxsanahay inaan war kaa helno",
    send: "Dir",
  },
};

const sw: Home = {
  strip: { tagline: "Mwenzako katika ibada", sub: "Qur'ani · Hadithi · Adhkari · Sala — bure, bila matangazo" },
  hero: {
    slides: [
      { before: "Jua ", highlight: "nyakati za Sala", after: " kulingana na mahali ulipo, kwa siku na kwa mwezi, kwa usahihi kamili", body: "Jua nyakati sahihi za Sala katika mji wako, pamoja na adhana katika kila Sala — ukiwa na Rafiq Al-Muslim." },
      { before: "Vinjari ", highlight: "adhkari na dua", after: " sahihi kutoka Qur'ani na Sunna ambazo kila Muislamu anazihitaji", body: "Adhkari za asubuhi na jioni, Hisnul Muslim na tasbihi, pamoja na sauti na kihesabu." },
      { before: "Soma Qur'ani katika ", highlight: "Msahafu wa Madina", after: ", pamoja na tafsiri ya maelezo, tafsiri ya maana na kisomo", body: "Kila ukurasa kama ulivyochapishwa Madina, pamoja na maana za aya kwa lugha yako." },
      { before: "Pata ", highlight: "Kibla", after: " na usikie adhana popote ulipo", body: "Dira, jua na mwezi na ramani — pamoja na adhana ya skrini nzima katika kila wakati wa Sala." },
    ],
    getApp: "Pakua Rafiq Al-Muslim sasa",
  },
  prayer: { title: "Wakati wa Sala", more: "Zaidi", method: "Njia ya kukokotoa", next: "Sala inayofuata" },
  articles: { recent: "Makala za hivi karibuni", mostRead: "Zinazosomwa zaidi", viewMore: "Tazama zaidi" },
  qibla: {
    before: "Jua ",
    highlight: "mwelekeo wa Kibla",
    after: " popote ulipo, kwa kutumia njia mbalimbali",
    methods: { compass: "dira", sunMoon: "jua na mwezi", shadow: "kivuli", map: "ramani" },
  },
  about: {
    title: "Kila anachohitaji Muislamu, katika programu moja ya bure",
    body: "Rafiq Al-Muslim inakukumbusha nyakati za Sala, inakusaidia kumkumbuka Mwenyezi Mungu, inakuunganisha na Qur'ani na inakuhimiza kufanya mema zaidi. Mwenzi wa kila Muislamu.",
    stats: [
      { value: "9", label: "Vitabu vya Hadithi" },
      { value: "25", label: "Lugha" },
      { value: "Bila matangazo", label: "Bure daima" },
    ],
  },
  reviews: {
    title: "Maoni ya watumiaji wetu",
    body: "Rafiq Al-Muslim inakukumbusha nyakati za Sala, inakusaidia kumkumbuka Mwenyezi Mungu na inakuunganisha na Qur'ani.",
    write: "Andika maoni yako",
  },
  contact: {
    title: "Wasiliana Nasi",
    body: "Una swali, pendekezo au tatizo? Tuandikie — tunasoma kila ujumbe.",
    message: "Tunafurahi kusikia kutoka kwako",
    send: "Tuma",
  },
};

const kuArab: Home = {
  strip: { tagline: "هاوڕێت لە پەرستشدا", sub: "قورئان · فەرموودە · زیکر · نوێژ — بێبەرامبەر و بێ ڕیکلام" },
  hero: {
    slides: [
      { before: "", highlight: "کاتەکانی نوێژ", after: " بەپێی شوێنەکەت، بۆ ڕۆژ و مانگ، بە وردییەکی تەواو بزانە", body: "کاتە وردەکانی نوێژ لە شارەکەت بزانە، لەگەڵ بانگ بۆ هەموو نوێژێک — لەگەڵ رفیق المسلم." },
      { before: "", highlight: "زیکر و دوعا صەحیحەکان", after: " لە قورئان و سوننەتەوە ببینە، کە هەموو موسڵمانێک پێویستی پێیانە", body: "زیکرەکانی بەیانیان و ئێواران، حیصنی موسڵمان و تەسبیح، لەگەڵ دەنگ و ژمێرەر." },
      { before: "قورئانی پیرۆز لە ", highlight: "موسحەفی مەدینە", after: "دا بخوێنەرەوە، لەگەڵ تەفسیر، وەرگێڕان و تیلاوەت", body: "هەموو لاپەڕەیەک وەک لە مەدینە چاپ کراوە، لەگەڵ مانای ئایەتەکان بە زمانی خۆت." },
      { before: "لە هەر شوێنێک بیت، ", highlight: "قیبلە", after: " بدۆزەرەوە و گوێ لە بانگ بگرە", body: "قیبلەنما، خۆر و مانگ و نەخشە — و بانگی پڕبەشاشە لە کاتی هەموو نوێژێکدا." },
    ],
    getApp: "ئێستا رفیق المسلم دابگرە",
  },
  prayer: { title: "کاتی نوێژ", more: "زیاتر", method: "شێوازی ژماردن", next: "نوێژی داهاتوو" },
  articles: { recent: "نوێترین وتارەکان", mostRead: "زۆرترین خوێندراو", viewMore: "زیاتر ببینە" },
  qibla: {
    before: "لە هەر شوێنێک بیت، بە چەند شێوازێکی جیاواز ",
    highlight: "ئاراستەی قیبلە",
    after: " بزانە",
    methods: { compass: "قیبلەنما", sunMoon: "خۆر و مانگ", shadow: "سێبەر", map: "نەخشە" },
  },
  about: {
    title: "هەموو ئەوەی موسڵمان پێویستی پێیەتی، لە یەک ئەپی بێبەرامبەردا",
    body: "رفیق المسلم کاتەکانی نوێژت بیر دەخاتەوە، یارمەتیت دەدات لە یادی خوادا، بە قورئانەوە گرێت دەدات و هانت دەدات چاکەی زیاتر بکەیت. هاوڕێی هەموو موسڵمانێک.",
    stats: [
      { value: "9", label: "کتێبی فەرموودە" },
      { value: "25", label: "زمان" },
      { value: "بێ ڕیکلام", label: "هەمیشە بێبەرامبەر" },
    ],
  },
  reviews: {
    title: "ڕای بەکارهێنەرانمان",
    body: "رفیق المسلم کاتەکانی نوێژت بیر دەخاتەوە، یارمەتیت دەدات لە یادی خوادا و بە قورئانەوە گرێت دەدات.",
    write: "ڕای خۆت بنووسە",
  },
  contact: {
    title: "پەیوەندیمان پێوە بکە",
    body: "پرسیار، پێشنیار یان کێشەیەکت هەیە؟ بۆمان بنووسە — هەموو نامەیەک دەخوێنینەوە.",
    message: "بە خۆشحاڵییەوە چاوەڕێی نامەکەتین",
    send: "ناردن",
  },
};

const kuLatn: Home = {
  strip: { tagline: "Hevalê te di îbadetê de", sub: "Qur'an · Hedîs · Zikir · Nimêj — belaş, bê reklam" },
  hero: {
    slides: [
      { before: "", highlight: "Demên nimêjê", after: " li gorî cihê xwe, ji bo rojê û mehê, bi rastiyeke temam bizane", body: "Demên rast ên nimêjê ji bo bajarê xwe, bi ezanê di her nimêjê de, bizane — bi Rafiq Al-Muslim." },
      { before: "Li ", highlight: "zikir û diayên", after: " sehîh ên ji Qur'an û Sunnetê ku her misilman hewcedarê wan e binêre", body: "Zikirên sibehê û êvarê, Hisnul-Muslim û tesbîh, bi deng û hejmarker." },
      { before: "Qur'anê di ", highlight: "Mishefa Medîneyê", after: " de bixwîne, bi tefsîr, werger û tilawetê", body: "Her rûpel wek ku li Medîneyê hatiye çapkirin, bi wateyên ayetan bi zimanê te." },
      { before: "", highlight: "Qibleyê", after: " bibîne û li ku derê bî jî ezanê bibihîze", body: "Pûsle, roj û heyv û nexşe — û ezaneke tev-ekran di her dema nimêjê de." },
    ],
    getApp: "Niha Rafiq Al-Muslim daxe",
  },
  prayer: { title: "Dema nimêjê", more: "Bêtir", method: "Rêbaz", next: "Nimêja bê" },
  articles: { recent: "Gotarên dawî", mostRead: "Yên herî zêde hatine xwendin", viewMore: "Bêtir bibîne" },
  qibla: {
    before: "",
    highlight: "Rêya Qibleyê",
    after: " li ku derê bî jî, bi rêbazên cuda bizane",
    methods: { compass: "pûsle", sunMoon: "roj û heyv", shadow: "sî", map: "nexşe" },
  },
  about: {
    title: "Her tiştê ku misilmanek hewce dike, di sepaneke belaş de",
    body: "Rafiq Al-Muslim demên nimêjê bi bîra te tîne, alîkariya te dike ku Xwedê bi bîr bînî, te bi Qur'anê ve girê dide û te han dide ku bêtir xêrê bikî. Hevalê her misilmanî.",
    stats: [
      { value: "9", label: "Pirtûkên hedîsan" },
      { value: "25", label: "Ziman" },
      { value: "Bê reklam", label: "Her tim belaş" },
    ],
  },
  reviews: {
    title: "Ramanên bikarhênerên me",
    body: "Rafiq Al-Muslim demên nimêjê bi bîra te tîne, alîkariya te dike ku Xwedê bi bîr bînî û te bi Qur'anê ve girê dide.",
    write: "Nirxandina xwe binivîse",
  },
  contact: {
    title: "Bi me re têkilî daîne",
    body: "Pirs, pêşniyar an pirsgirêkek heye? Ji me re binivîse — em her peyamê dixwînin.",
    message: "Em kêfxweş in ku ji te bibihîzin",
    send: "Bişîne",
  },
};

const ml: Home = {
  strip: { tagline: "ആരാധനയിൽ നിങ്ങളുടെ കൂട്ടുകാരൻ", sub: "ഖുർആൻ · ഹദീസ് · അദ്കാർ · നമസ്കാരം — സൗജന്യം, പരസ്യങ്ങളില്ല" },
  hero: {
    slides: [
      { before: "നിങ്ങളുടെ സ്ഥലമനുസരിച്ച് ദിവസത്തെയും മാസത്തെയും ", highlight: "നമസ്കാര സമയങ്ങൾ", after: " പൂർണ കൃത്യതയോടെ അറിയുക", body: "നിങ്ങളുടെ നഗരത്തിലെ കൃത്യമായ നമസ്കാര സമയങ്ങൾ അറിയുക, ഓരോ നമസ്കാരത്തിനും ബാങ്കോടു കൂടി — Rafiq Al-Muslim-ലൂടെ." },
      { before: "ഓരോ മുസ്‌ലിമിനും ആവശ്യമായ ഖുർആനിൽ നിന്നും സുന്നത്തിൽ നിന്നുമുള്ള സ്വഹീഹായ ", highlight: "അദ്കാറും ദുആകളും", after: " കാണുക", body: "പ്രഭാത, സായാഹ്ന അദ്കാർ, ഹിസ്നുൽ മുസ്‌ലിം, തസ്ബീഹ് — ഓഡിയോയും കൗണ്ടറും സഹിതം." },
      { before: "തഫ്സീർ, പരിഭാഷ, പാരായണം എന്നിവയോടെ ", highlight: "മദീന മുസ്ഹഫിൽ", after: " ഖുർആൻ വായിക്കുക", body: "മദീനയിൽ അച്ചടിച്ചതുപോലെ ഓരോ പേജും, ആയത്തുകളുടെ അർത്ഥം നിങ്ങളുടെ ഭാഷയിൽ." },
      { before: "നിങ്ങൾ എവിടെയായിരുന്നാലും ", highlight: "ഖിബ്‌ല", after: " കണ്ടെത്തുക, ബാങ്ക് കേൾക്കുക", body: "കോമ്പസ്, സൂര്യനും ചന്ദ്രനും, മാപ്പ് — ഓരോ നമസ്കാര സമയത്തും പൂർണ സ്ക്രീൻ ബാങ്കും." },
    ],
    getApp: "Rafiq Al-Muslim ഇപ്പോൾ ഡൗൺലോഡ് ചെയ്യുക",
  },
  prayer: { title: "നമസ്കാര സമയം", more: "കൂടുതൽ", method: "കണക്കുകൂട്ടൽ രീതി", next: "അടുത്ത നമസ്കാരം" },
  articles: { recent: "പുതിയ ലേഖനങ്ങൾ", mostRead: "ഏറ്റവും കൂടുതൽ വായിച്ചവ", viewMore: "കൂടുതൽ കാണുക" },
  qibla: {
    before: "നിങ്ങൾ എവിടെയായിരുന്നാലും വ്യത്യസ്ത രീതികളിലൂടെ ",
    highlight: "ഖിബ്‌ലയുടെ ദിശ",
    after: " അറിയുക",
    methods: { compass: "കോമ്പസ്", sunMoon: "സൂര്യനും ചന്ദ്രനും", shadow: "നിഴൽ", map: "മാപ്പ്" },
  },
  about: {
    title: "ഒരു മുസ്‌ലിമിന് ആവശ്യമായതെല്ലാം, ഒരു സൗജന്യ ആപ്പിൽ",
    body: "Rafiq Al-Muslim നിങ്ങളെ നമസ്കാര സമയങ്ങൾ ഓർമിപ്പിക്കുന്നു, അല്ലാഹുവിനെ സ്മരിക്കാൻ സഹായിക്കുന്നു, ഖുർആനുമായി ബന്ധിപ്പിക്കുന്നു, കൂടുതൽ നന്മ ചെയ്യാൻ പ്രേരിപ്പിക്കുന്നു. ഓരോ മുസ്‌ലിമിന്റെയും കൂട്ടുകാരൻ.",
    stats: [
      { value: "9", label: "ഹദീസ് ഗ്രന്ഥങ്ങൾ" },
      { value: "25", label: "ഭാഷകൾ" },
      { value: "പരസ്യങ്ങളില്ല", label: "എന്നും സൗജന്യം" },
    ],
  },
  reviews: {
    title: "ഞങ്ങളുടെ ഉപയോക്താക്കളുടെ അഭിപ്രായങ്ങൾ",
    body: "Rafiq Al-Muslim നിങ്ങളെ നമസ്കാര സമയങ്ങൾ ഓർമിപ്പിക്കുന്നു, അല്ലാഹുവിനെ സ്മരിക്കാൻ സഹായിക്കുന്നു, ഖുർആനുമായി ബന്ധിപ്പിക്കുന്നു.",
    write: "നിങ്ങളുടെ അഭിപ്രായം എഴുതുക",
  },
  contact: {
    title: "ഞങ്ങളെ ബന്ധപ്പെടുക",
    body: "ചോദ്യങ്ങളോ നിർദ്ദേശങ്ങളോ പ്രശ്നങ്ങളോ ഉണ്ടോ? ഞങ്ങൾക്ക് എഴുതുക — ഓരോ സന്ദേശവും ഞങ്ങൾ വായിക്കുന്നു.",
    message: "നിങ്ങളിൽ നിന്ന് കേൾക്കുന്നതിൽ സന്തോഷം",
    send: "അയയ്ക്കുക",
  },
};

const de: Home = {
  strip: { tagline: "Dein Begleiter im Gottesdienst", sub: "Koran · Hadith · Adhkar · Gebet – kostenlos und werbefrei" },
  hero: {
    slides: [
      { before: "Kenne die ", highlight: "Gebetszeiten", after: " für deinen Standort, für den Tag und den Monat, ganz genau", body: "Kenne die genauen Gebetszeiten für deine Stadt, mit dem Adhan zu jedem Gebet – mit Rafiq Al-Muslim." },
      { before: "Entdecke authentische ", highlight: "Adhkar und Bittgebete", after: " aus dem Koran und der Sunna, die jeder Muslim braucht", body: "Morgen- und Abend-Adhkar, Hisn Al-Muslim und die Tasbih, mit Audio und Zähler." },
      { before: "Lies den Koran im ", highlight: "Madina-Mushaf", after: ", mit Tafsir, Übersetzung und Rezitation", body: "Jede Seite so, wie sie in Medina gedruckt wurde, mit den Bedeutungen der Verse in deiner Sprache." },
      { before: "Finde die ", highlight: "Qibla", after: " und höre den Adhan, wo immer du bist", body: "Kompass, Sonne und Mond und Karte – und ein Vollbild-Adhan zu jeder Gebetszeit." },
    ],
    getApp: "Hol dir jetzt Rafiq Al-Muslim",
  },
  prayer: { title: "Gebetszeit", more: "Mehr", method: "Methode", next: "Nächstes Gebet" },
  articles: { recent: "Neueste Artikel", mostRead: "Meistgelesen", viewMore: "Mehr ansehen" },
  qibla: {
    before: "Kenne die ",
    highlight: "Qibla-Richtung",
    after: ", wo immer du bist, mit verschiedenen Methoden",
    methods: { compass: "Kompass", sunMoon: "Sonne & Mond", shadow: "Schatten", map: "Karte" },
  },
  about: {
    title: "Alles, was ein Muslim braucht, in einer kostenlosen App",
    body: "Rafiq Al-Muslim erinnert dich an die Gebetszeiten, hilft dir, Allahs zu gedenken, verbindet dich mit dem Koran und ermutigt dich, mehr Gutes zu tun. Der Begleiter jedes Muslims.",
    stats: [
      { value: "9", label: "Hadith-Bücher" },
      { value: "25", label: "Sprachen" },
      { value: "Werbefrei", label: "Für immer kostenlos" },
    ],
  },
  reviews: {
    title: "Meinungen unserer Nutzer",
    body: "Rafiq Al-Muslim erinnert dich an die Gebetszeiten, hilft dir, Allahs zu gedenken, und verbindet dich mit dem Koran.",
    write: "Schreibe deine Bewertung",
  },
  contact: {
    title: "Kontakt",
    body: "Fragen, Vorschläge oder ein Problem? Schreib uns – wir lesen jede Nachricht.",
    message: "Wir freuen uns, von dir zu hören",
    send: "Senden",
  },
};

const es: Home = {
  strip: { tagline: "Tu compañero en la adoración", sub: "Corán · Hadiz · Adhkar · Oración — gratis y sin anuncios" },
  hero: {
    slides: [
      { before: "Conoce los ", highlight: "horarios de oración", after: " según tu ubicación, del día y del mes, con total precisión", body: "Conoce los horarios exactos de oración de tu ciudad, con el adhan en cada oración — con Rafiq Al-Muslim." },
      { before: "Consulta ", highlight: "adhkar y súplicas", after: " auténticos del Corán y de la Sunna que todo musulmán necesita", body: "Adhkar de la mañana y de la tarde, Hisn al-Muslim y el tasbih, con audio y contador." },
      { before: "Lee el Corán en el ", highlight: "Mushaf de Medina", after: ", con tafsir, traducción y recitación", body: "Cada página tal como se imprimió en Medina, con el significado de las aleyas en tu idioma." },
      { before: "Encuentra la ", highlight: "alquibla", after: " y escucha el adhan dondequiera que estés", body: "Brújula, sol y luna y mapa — y un adhan a pantalla completa en cada hora de oración." },
    ],
    getApp: "Descarga Rafiq Al-Muslim ahora",
  },
  prayer: { title: "Hora de la oración", more: "Más", method: "Método", next: "Próxima oración" },
  articles: { recent: "Artículos recientes", mostRead: "Los más leídos", viewMore: "Ver más" },
  qibla: {
    before: "Conoce la ",
    highlight: "dirección de la alquibla",
    after: " dondequiera que estés, con distintos métodos",
    methods: { compass: "brújula", sunMoon: "sol y luna", shadow: "sombra", map: "mapa" },
  },
  about: {
    title: "Todo lo que un musulmán necesita, en una aplicación gratuita",
    body: "Rafiq Al-Muslim te recuerda los horarios de oración, te ayuda a recordar a Dios, te conecta con el Corán y te anima a hacer más bien. El compañero de todo musulmán.",
    stats: [
      { value: "9", label: "Libros de hadiz" },
      { value: "25", label: "Idiomas" },
      { value: "Sin anuncios", label: "Gratis para siempre" },
    ],
  },
  reviews: {
    title: "Opiniones de nuestros usuarios",
    body: "Rafiq Al-Muslim te recuerda los horarios de oración, te ayuda a recordar a Dios y te conecta con el Corán.",
    write: "Escribe tu opinión",
  },
  contact: {
    title: "Contáctanos",
    body: "¿Preguntas, sugerencias o algún problema? Escríbenos — leemos todos los mensajes.",
    message: "Nos alegra saber de ti",
    send: "Enviar",
  },
};

export const more: Record<Exclude<Locale, "en" | "ar">, Home> = { ur, fa, ru, ms, tr, id, hi, bn, ha, fr, zh, ps, pa, pnb, uz, "uz-Cyrl": uzCyrl, so, sw, "ku-Arab": kuArab, "ku-Latn": kuLatn, ml, de, es };
