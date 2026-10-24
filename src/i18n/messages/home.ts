// Home page copy, in the order of the page. The other six languages are in home.more.ts.
import type { Locale } from "../config";
import { more } from "./home.more";

type Slide = { before: string; highlight: string; after: string; body: string };

export type Home = {
  strip: { tagline: string; sub: string };
  hero: { slides: [Slide, Slide, Slide, Slide]; getApp: string };
  prayer: { title: string; more: string; method: string; next: string };
  articles: { recent: string; mostRead: string; viewMore: string };
  qibla: { before: string; highlight: string; after: string; methods: { compass: string; sunMoon: string; shadow: string; map: string } };
  about: { title: string; body: string; stats: { value: string; label: string }[] };
  reviews: { title: string; body: string; write: string };
  contact: { title: string; body: string; message: string; send: string };
};

const en: Home = {
  strip: { tagline: "Your companion in worship", sub: "Qur'an · Hadith · Adhkar · Prayer — free, without ads" },
  hero: {
    slides: [
      { before: "Know ", highlight: "prayer times", after: " according to your location, for the day and the month, with complete accuracy", body: "Know the exact prayer times for your city, with the athan at every prayer — with Rafiq Al-Muslim." },
      { before: "Browse authentic ", highlight: "adhkar and duas", after: " from the Qur'an and Sunnah that every Muslim needs", body: "Morning and evening adhkar, Hisn al-Muslim and the tasbih, with audio and a counter." },
      { before: "Read the Qur'an in the ", highlight: "Madinah Mushaf", after: ", with tafsir, translation and recitation", body: "Every page as printed in Madinah, with the meanings of the verses in your language." },
      { before: "Find the ", highlight: "Qibla", after: " and hear the athan wherever you are", body: "Compass, sun and moon and map — and a full-screen athan at every prayer time." },
    ],
    getApp: "Get Rafiq Al-Muslim now",
  },
  prayer: { title: "Prayer time", more: "More", method: "Method", next: "Next prayer" },
  articles: { recent: "Recent articles", mostRead: "Most read", viewMore: "View more" },
  qibla: {
    before: "Know the ",
    highlight: "Qibla direction",
    after: " wherever you are, using different methods",
    methods: { compass: "compass", sunMoon: "sun & moon", shadow: "shadow", map: "map" },
  },
  about: {
    title: "Everything a Muslim needs, in one free app",
    body: "Rafiq Al-Muslim reminds you of prayer times, helps you remember Allah, connects you with the Qur'an and encourages you to do more good. The companion of every Muslim.",
    stats: [
      { value: "9", label: "Books of hadith" },
      { value: "8", label: "Languages" },
      { value: "No ads", label: "Free forever" },
    ],
  },
  reviews: {
    title: "Our users' opinions",
    body: "Rafiq Al-Muslim reminds you of prayer times, helps you remember Allah and connects you with the Qur'an.",
    write: "Write your review",
  },
  contact: {
    title: "Contact us",
    body: "Questions, suggestions or a problem? Write to us — we read every message.",
    message: "Happy to hear from you",
    send: "Send",
  },
};

const ar: Home = {
  strip: { tagline: "رفيقك في الطاعة", sub: "القرآن · الحديث · الأذكار · الصلاة — مجانًا وبلا إعلانات" },
  hero: {
    slides: [
      { before: "تعرف على ", highlight: "مواقيت الصلاة", after: " حسب موقعك لليوم والشهر بكل دقة", body: "تعرف على مواقيت الصلاة لمدينتك بدقة، مع الأذان عند كل صلاة — مع رفيق المسلم." },
      { before: "تصفح صحيح ", highlight: "الأذكار والأدعية", after: " من القرآن والسنة التي يحتاجها كل مسلم", body: "أذكار الصباح والمساء وحصن المسلم والسبحة، بالصوت ومع العدّاد." },
      { before: "اقرأ القرآن الكريم من ", highlight: "مصحف المدينة", after: " مع التفسير والترجمة والتلاوة", body: "كل صفحة كما طُبعت في المدينة المنورة، مع معاني الآيات بلغتك." },
      { before: "حدد ", highlight: "اتجاه القبلة", after: " واستمع إلى الأذان أينما كنت", body: "البوصلة والشمس والقمر والخريطة — وأذان بشاشة كاملة عند كل صلاة." },
    ],
    getApp: "حمّل رفيق المسلم الآن",
  },
  prayer: { title: "أوقات الصلاة", more: "المزيد", method: "طريقة الحساب", next: "الصلاة القادمة" },
  articles: { recent: "أحدث المقالات", mostRead: "الأكثر قراءة", viewMore: "عرض المزيد" },
  qibla: {
    before: "اعرف ",
    highlight: "اتجاه القبلة",
    after: " أينما كنت، بطرق مختلفة",
    methods: { compass: "البوصلة", sunMoon: "الشمس والقمر", shadow: "الظل", map: "الخريطة" },
  },
  about: {
    title: "كل ما يحتاجه المسلم في تطبيق واحد مجاني",
    body: "تطبيق رفيق المسلم يذكّرك بمواقيت الصلاة، ويعينك على ذكر الله، ويصلك بالقرآن الكريم، ويحثّك على المزيد من الطاعات. رفيق كل مسلم.",
    stats: [
      { value: "9", label: "كتب حديث" },
      { value: "8", label: "لغات" },
      { value: "بلا إعلانات", label: "مجاني دائمًا" },
    ],
  },
  reviews: {
    title: "آراء مستخدمينا",
    body: "تطبيق رفيق المسلم يذكّرك بمواقيت الصلاة، ويعينك على ذكر الله، ويصلك بالقرآن الكريم.",
    write: "اكتب رأيك",
  },
  contact: {
    title: "تواصل معنا",
    body: "سؤال أو اقتراح أو مشكلة؟ راسلنا — نقرأ كل رسالة.",
    message: "يسعدنا سماع رأيك",
    send: "إرسال",
  },
};

export const home: Record<Locale, Home> = { en, ar, ...more };
