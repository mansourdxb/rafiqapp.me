// The site's languages — the same eleven as the app, in the app's picker order.
export const locales = ["ar", "en", "ur", "fa", "ru", "ms", "tr", "id", "hi", "bn", "ha"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export const rtlLocales: readonly Locale[] = ["ar", "ur", "fa"];
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
};

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** "/quran/" in `lang` → "/en/quran/". Paths always end with "/" (static export, trailingSlash). */
export function localePath(lang: Locale, path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${p.endsWith("/") || p.includes("#") || p.includes("?") ? p : `${p}/`}`;
}

export const SITE_URL = "https://rafiqapp.me";
