// The site's languages — the same eighteen as the app, in the app's picker order.
export const locales = ["ar", "en", "ur", "fa", "ru", "ms", "tr", "id", "hi", "bn", "ha", "fr", "zh", "ps", "pa", "pnb", "uz", "uz-Cyrl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export const rtlLocales: readonly Locale[] = ["ar", "ur", "fa", "ps", "pnb"];
export const isRtl = (l: Locale) => rtlLocales.includes(l);
export const dir = (l: Locale) => (isRtl(l) ? "rtl" : "ltr");

export const nativeName: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
  ur: "اردو",
  fa: "فارسی",
  ru: "Русский",
  ms: "Bahasa Melayu",
  tr: "Türkçe",
  id: "Indonesia", // same label as the app; "Bahasa Indonesia" wrapped in the two-column phone menu
  hi: "हिन्दी",
  bn: "বাংলা",
  ha: "Hausa",
  fr: "Français",
  zh: "简体中文",
  ps: "پښتو",
  pa: "ਪੰਜਾਬੀ",
  pnb: "پنجابی",
  uz: "Oʻzbekcha",
  "uz-Cyrl": "Ўзбекча",
};

/** Flag shown next to each language in the language menu (public/flags/<code>.svg, from flag-icons, MIT). */
export const flag: Record<Locale, string> = {
  ar: "sa",
  en: "us",
  ur: "pk",
  fa: "ir",
  ru: "ru",
  ms: "my",
  tr: "tr",
  id: "id",
  hi: "in",
  bn: "bd",
  ha: "ng",
  fr: "fr",
  zh: "cn",
  ps: "af",
  pa: "in",
  pnb: "pk",
  uz: "uz",
  "uz-Cyrl": "uz",
};

export const ogLocale: Record<Locale, string> = {
  ar: "ar_AR",
  en: "en_US",
  ur: "ur_PK",
  fa: "fa_IR",
  ru: "ru_RU",
  ms: "ms_MY",
  tr: "tr_TR",
  id: "id_ID",
  hi: "hi_IN",
  bn: "bn_BD",
  ha: "ha_NG",
  fr: "fr_FR",
  zh: "zh_CN",
  ps: "ps_AF",
  pa: "pa_IN",
  pnb: "pa_PK",
  uz: "uz_UZ",
  "uz-Cyrl": "uz_UZ",
};

/** BCP 47 tag for <html lang> and hreflang: Chinese is Simplified Chinese (zh-CN), so browsers pick Simplified glyphs;
 * Punjabi is tagged by script — Gurmukhi (pa-Guru) and Shahmukhi (pa-Arab, the app's "pnb", never used as a tag).
 * Uzbek: "uz" (Latin) and "uz-Cyrl" are already BCP 47 tags, and also the URL segments the app's share links use. */
const TAGS: Partial<Record<Locale, string>> = { zh: "zh-CN", pa: "pa-Guru", pnb: "pa-Arab" };
export const langTag = (l: Locale) => TAGS[l] ?? l;

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** "/quran/" in `lang` → "/en/quran/". Paths always end with "/" (static export, trailingSlash). */
export function localePath(lang: Locale, path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${p.endsWith("/") || p.includes("#") || p.includes("?") ? p : `${p}/`}`;
}

export const SITE_URL = "https://rafiqapp.me";
