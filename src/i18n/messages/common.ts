// Site chrome: menu, footer, store badges, theme. One object per language.
import type { Locale } from "../config";
import { more } from "./common.more";

export type Common = {
  siteName: string;
  tagline: string;
  description: string;
  nav: {
    home: string;
    quran: string;
    hadith: string;
    athkar: string;
    prayer: string;
    qibla: string;
    tasbeeh: string;
    names: string;
    calendar: string;
    articles: string;
    imsakiya: string;
    live: string;
    faq: string;
    more: string;
    download: string;
  };
  language: string;
  theme: { light: string; dark: string };
  menu: string;
  close: string;
  getApp: string;
  appStore: string;
  googlePlay: string;
  appGallery: string;
  downloadOn: string;
  getItOn: string;
  exploreOn: string;
  footer: { about: string; services: string; legal: string; privacy: string; contact: string; rights: string; free: string };
  loading: string;
  error: string;
  retry: string;
  back: string;
  search: string;
  noResults: string;
};

const en: Common = {
  siteName: "Rafiq Al-Muslim",
  tagline: "Your companion in worship",
  description:
    "Read the Holy Qur'an in the Madinah Mushaf, the nine hadith books, morning and evening adhkar, prayer times, Qibla and tasbeeh — free, in your language.",
  nav: {
    home: "Home",
    quran: "Qur'an",
    hadith: "Hadith",
    athkar: "Adhkar",
    prayer: "Prayer times",
    qibla: "Qibla",
    tasbeeh: "Tasbih",
    names: "Names of Allah",
    calendar: "Hijri calendar",
    articles: "Articles",
    imsakiya: "Imsakiya",
    live: "Live broadcast",
    faq: "FAQ",
    more: "More",
    download: "Get the app",
  },
  language: "Language",
  theme: { light: "Light mode", dark: "Dark mode" },
  menu: "Menu",
  close: "Close",
  getApp: "Get the app",
  appStore: "App Store",
  googlePlay: "Google Play",
  appGallery: "AppGallery",
  downloadOn: "Download on the",
  getItOn: "Get it on",
  exploreOn: "Explore it on",
  footer: {
    about: "A free Islamic companion: Qur'an, hadith, adhkar and prayer — no ads.",
    services: "Services",
    legal: "Legal",
    privacy: "Privacy policy",
    contact: "Contact us",
    rights: "All rights reserved.",
    free: "Free, without ads",
  },
  loading: "Loading…",
  error: "Something went wrong. Check your connection.",
  retry: "Try again",
  back: "Back",
  search: "Search",
  noResults: "No results",
};

const ar: Common = {
  siteName: "رفيق المسلم",
  tagline: "رفيقك في الطاعة",
  description:
    "اقرأ القرآن الكريم بمصحف المدينة، وكتب الحديث التسعة، وأذكار الصباح والمساء، ومواقيت الصلاة والقبلة والسبحة — مجانًا وبلغتك.",
  nav: {
    home: "الرئيسية",
    quran: "القرآن",
    hadith: "الحديث",
    athkar: "الأذكار",
    prayer: "مواقيت الصلاة",
    qibla: "القبلة",
    tasbeeh: "السبحة",
    names: "أسماء الله الحسنى",
    calendar: "التقويم الهجري",
    articles: "المقالات",
    imsakiya: "الإمساكية",
    live: "البث المباشر",
    faq: "الأسئلة الشائعة",
    more: "المزيد",
    download: "حمّل التطبيق",
  },
  language: "اللغة",
  theme: { light: "الوضع الفاتح", dark: "الوضع الداكن" },
  menu: "القائمة",
  close: "إغلاق",
  getApp: "حمّل التطبيق",
  appStore: "App Store",
  googlePlay: "Google Play",
  appGallery: "AppGallery",
  downloadOn: "حمّله من",
  getItOn: "احصل عليه من",
  exploreOn: "اكتشفه على",
  footer: {
    about: "رفيق إسلامي مجاني: القرآن والحديث والأذكار والصلاة — بلا إعلانات.",
    services: "الخدمات",
    legal: "قانوني",
    privacy: "سياسة الخصوصية",
    contact: "تواصل معنا",
    rights: "جميع الحقوق محفوظة.",
    free: "مجاني وبلا إعلانات",
  },
  loading: "جارٍ التحميل…",
  error: "حدث خطأ. تحقق من اتصالك.",
  retry: "إعادة المحاولة",
  back: "رجوع",
  search: "بحث",
  noResults: "لا توجد نتائج",
};

// The other six languages are in common.more.ts.
export const common: Record<Locale, Common> = { en, ar, ...more };
