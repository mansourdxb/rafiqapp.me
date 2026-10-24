// Home page copy. Sections follow the page top to bottom. The other six languages are in home.more.ts.
import type { Locale } from "../config";
import { more } from "./home.more";

export type Home = {
  hero: { title: string; subtitle: string; getApp: string };
  services: {
    title: string;
    subtitle: string;
    open: string;
    items: { quran: string; hadith: string; athkar: string; prayer: string; qibla: string; tasbeeh: string; names: string; calendar: string };
  };
  articles: { title: string; viewMore: string };
  qibla: { before: string; highlight: string; after: string; methods: { compass: string; sunMoon: string; shadow: string; map: string }; open: string };
  about: { title: string; body: string; stats: { pages: string; books: string; languages: string; ads: string } };
  showcase: { title: string; items: { title: string; body: string }[] };
  reviews: { title: string; body: string; write: string };
  contact: { title: string; body: string; name: string; email: string; message: string; send: string };
  download: { title: string; body: string; platforms: string };
};

const en: Home = {
  hero: {
    title: "Know your prayer times for the day and the month, wherever you are",
    subtitle: "Accurate prayer times for your location, the Qur'an in the Madinah Mushaf, hadith and your daily adhkar — free, with Rafiq Al-Muslim.",
    getApp: "Get Rafiq Al-Muslim now",
  },
  services: {
    title: "Use it right here",
    subtitle: "Everything below works in your browser, with no sign-up.",
    open: "Open",
    items: {
      quran: "The Madinah Mushaf, page by page, with translation, tafsir and recitation.",
      hadith: "Bukhari, Muslim and the other seven books, chapter by chapter.",
      athkar: "Morning, evening, after prayer and before sleep — with a counter.",
      prayer: "Accurate times for your city, with the next prayer and a monthly table.",
      qibla: "The direction of the Kaaba and your distance from it.",
      tasbeeh: "A simple tasbih counter with your own adhkar and goals.",
      names: "The 99 Names of Allah with their meanings.",
      calendar: "The Hijri month at a glance, with the Islamic occasions.",
    },
  },
  articles: { title: "Recent articles", viewMore: "View more" },
  qibla: {
    before: "Know the ",
    highlight: "Qibla direction",
    after: " wherever you are, using different methods",
    methods: { compass: "Compass", sunMoon: "Sun & moon", shadow: "Shadow", map: "Map" },
    open: "Find the Qibla",
  },
  about: {
    title: "Everything a Muslim needs, in one free app",
    body: "Rafiq Al-Muslim reminds you of prayer times, helps you remember Allah, connects you with the Qur'an and encourages you to do more good. Your companion in worship, every day.",
    stats: { pages: "Mushaf pages", books: "Hadith books", languages: "Languages", ads: "Ads, ever" },
  },
  showcase: {
    title: "Even more in the app",
    items: [
      { title: "The Madinah Mushaf", body: "Every page as printed in Madinah, with recitation by famous reciters, tafsir and word meanings." },
      { title: "Prayer times and athan", body: "Athan at every prayer with a full-screen reminder, home-screen widgets and a monthly timetable." },
      { title: "Adhkar and tasbih", body: "Hisn al-Muslim and the daily adhkar with audio, plus a tasbih that remembers your progress." },
      { title: "Qibla anywhere", body: "A compass, a map and the sun and moon to find the Qibla wherever you are." },
    ],
  },
  reviews: {
    title: "What our users say",
    body: "Real reviews from the App Store. Your opinion helps us improve — and helps others find the app.",
    write: "Write a review",
  },
  contact: {
    title: "Contact us",
    body: "Questions, suggestions or a problem? Write to us — we read every message.",
    name: "Your name",
    email: "Your email",
    message: "We're happy to hear from you",
    send: "Send",
  },
  download: {
    title: "Take Rafiq Al-Muslim with you",
    body: "Athan reminders, offline Qur'an and recitation, widgets and more. Free, with no ads.",
    platforms: "iPhone · iPad · Android · Huawei",
  },
};

const ar: Home = {
  hero: {
    title: "اعرف مواقيت الصلاة لليوم والشهر حسب موقعك بدقة",
    subtitle: "مواقيت صلاة دقيقة لموقعك، والقرآن الكريم بمصحف المدينة، والحديث الشريف، وأذكارك اليومية — مجانًا مع رفيق المسلم.",
    getApp: "حمّل رفيق المسلم الآن",
  },
  services: {
    title: "استخدمه هنا مباشرة",
    subtitle: "كل الخدمات التالية تعمل في متصفحك دون تسجيل.",
    open: "افتح",
    items: {
      quran: "مصحف المدينة صفحةً صفحة، مع الترجمة والتفسير والتلاوة.",
      hadith: "البخاري ومسلم وبقية الكتب التسعة، كتابًا كتابًا.",
      athkar: "أذكار الصباح والمساء وبعد الصلاة وقبل النوم — مع عدّاد.",
      prayer: "مواقيت دقيقة لمدينتك، مع الصلاة القادمة وجدول شهري.",
      qibla: "اتجاه الكعبة المشرفة والمسافة إليها.",
      tasbeeh: "سبحة بسيطة بأذكارك وأهدافك.",
      names: "أسماء الله الحسنى التسعة والتسعون ومعانيها.",
      calendar: "الشهر الهجري بنظرة واحدة، مع المناسبات الإسلامية.",
    },
  },
  articles: { title: "أحدث المقالات", viewMore: "عرض المزيد" },
  qibla: {
    before: "اعرف ",
    highlight: "اتجاه القبلة",
    after: " أينما كنت، بطرق مختلفة",
    methods: { compass: "البوصلة", sunMoon: "الشمس والقمر", shadow: "الظل", map: "الخريطة" },
    open: "حدّد القبلة",
  },
  about: {
    title: "كل ما يحتاجه المسلم في تطبيق واحد مجاني",
    body: "رفيق المسلم يذكّرك بمواقيت الصلاة، ويعينك على ذكر الله، ويصلك بالقرآن الكريم، ويحثّك على المزيد من الطاعات. رفيقك في الطاعة كل يوم.",
    stats: { pages: "صفحة في المصحف", books: "كتب حديث", languages: "لغات", ads: "إعلانات، أبدًا" },
  },
  showcase: {
    title: "والمزيد في التطبيق",
    items: [
      { title: "مصحف المدينة", body: "كل صفحة كما طُبعت في المدينة المنورة، مع تلاوات كبار القراء والتفسير ومعاني الكلمات." },
      { title: "مواقيت الصلاة والأذان", body: "أذان عند كل صلاة مع شاشة تذكير كاملة، وأدوات للشاشة الرئيسية، وجدول شهري." },
      { title: "الأذكار والسبحة", body: "حصن المسلم والأذكار اليومية بالصوت، وسبحة تحفظ تقدّمك." },
      { title: "القبلة أينما كنت", body: "بوصلة وخريطة والشمس والقمر لتحديد القبلة في أي مكان." },
    ],
  },
  reviews: {
    title: "آراء مستخدمينا",
    body: "تقييمات حقيقية من متجر App Store. رأيك يساعدنا على التطوير، ويساعد غيرك على الوصول إلى التطبيق.",
    write: "اكتب تقييمك",
  },
  contact: {
    title: "تواصل معنا",
    body: "سؤال أو اقتراح أو مشكلة؟ راسلنا — نقرأ كل رسالة.",
    name: "اسمك",
    email: "بريدك الإلكتروني",
    message: "يسعدنا سماع رأيك",
    send: "إرسال",
  },
  download: {
    title: "خذ رفيق المسلم معك",
    body: "تنبيهات الأذان، والقرآن والتلاوة دون إنترنت، وأدوات الشاشة الرئيسية والمزيد. مجاني وبلا إعلانات.",
    platforms: "iPhone · iPad · Android · Huawei",
  },
};

export const home: Record<Locale, Home> = { en, ar, ...more };
