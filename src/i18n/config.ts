// The site's languages — the same thirty-two as the app, in the app's picker order.
export const locales = ["ar", "en", "ur", "fa", "ru", "ms", "tr", "id", "hi", "bn", "ha", "fr", "zh", "ps", "pa", "pnb", "uz", "uz-Cyrl", "so", "sw", "ku-Arab", "ku-Latn", "ml", "de", "es", "az-Latn", "om", "am", "kk-Cyrl", "ta", "gu", "my"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export const rtlLocales: readonly Locale[] = ["ar", "ur", "fa", "ps", "pnb", "ku-Arab"];
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
  so: "Soomaali",
  sw: "Kiswahili",
  "ku-Arab": "کوردیی ناوەندی",
  "ku-Latn": "Kurdî",
  ml: "മലയാളം",
  de: "Deutsch",
  es: "Español",
  "az-Latn": "Azərbaycanca",
  om: "Afaan Oromoo",
  am: "አማርኛ",
  "kk-Cyrl": "Қазақша",
  ta: "தமிழ்",
  gu: "ગુજરાતી",
  my: "မြန်မာ",
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
  so: "so",
  sw: "tz",
  "ku-Arab": "iq",
  "ku-Latn": "tr",
  ml: "in",
  de: "de",
  es: "es",
  "az-Latn": "az",
  om: "et",
  am: "et",
  "kk-Cyrl": "kz",
  ta: "in",
  gu: "in",
  my: "mm",
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
  so: "so_SO",
  sw: "sw_TZ",
  "ku-Arab": "ckb_IQ",
  "ku-Latn": "ku_TR",
  ml: "ml_IN",
  de: "de_DE",
  es: "es_ES",
  "az-Latn": "az_AZ",
  om: "om_ET",
  am: "am_ET",
  "kk-Cyrl": "kk_KZ",
  ta: "ta_IN",
  gu: "gu_IN",
  my: "my_MM",
};

/** BCP 47 tag for <html lang> and hreflang: Chinese is Simplified Chinese (zh-CN), so browsers pick Simplified glyphs;
 * Punjabi is tagged by script — Gurmukhi (pa-Guru) and Shahmukhi (pa-Arab, the app's "pnb", never used as a tag).
 * Uzbek: "uz" (Latin) and "uz-Cyrl" are already BCP 47 tags, and also the URL segments the app's share links use.
 * Kurdish: the URL segments are the app's codes (ku-Arab, ku-Latn — what its share links open); the tags are
 * "ckb" for Sorani (Central Kurdish) and "ku" for Kurmanji, as CLDR names them. */
const TAGS: Partial<Record<Locale, string>> = { zh: "zh-CN", pa: "pa-Guru", pnb: "pa-Arab", "ku-Arab": "ckb", "ku-Latn": "ku" };
export const langTag = (l: Locale) => TAGS[l] ?? l;

/** hreflang value. Google accepts only ISO 639-1 languages (plus an ISO 15924 script / ISO 3166-1 region), so Kurdish
 * can't use "ckb": it is "ku" with its script, matching the URL segments. Everything else is the same as langTag. */
export const hreflangTag = (l: Locale) => (l === "ku-Arab" || l === "ku-Latn" ? l : langTag(l));

/** Locale for Intl: the site code, except Kurdish — Intl reads "ku-Arab" as Kurmanji, so Sorani asks for "ckb" —
 * and Azerbaijani / Kazakh, which Intl knows without the script ("az", "kk"). */
export const intlTag = (l: Locale) => (l === "ku-Arab" ? "ckb" : l === "ku-Latn" ? "ku" : l === "az-Latn" ? "az" : l === "kk-Cyrl" ? "kk" : l);

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** "/quran/" in `lang` → "/en/quran/". Paths always end with "/" (static export, trailingSlash). */
export function localePath(lang: Locale, path = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `/${lang}${p.endsWith("/") || p.includes("#") || p.includes("?") ? p : `${p}/`}`;
}

export const SITE_URL = "https://rafiqalmuslim.org";
