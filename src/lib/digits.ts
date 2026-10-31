import type { Locale } from "@/i18n/config";

const ARABIC = "٠١٢٣٤٥٦٧٨٩";

/** Digits as the app shows them (surahLocale.numFmtForLanguage): Eastern Arabic for ar/fa/ur/ps, Latin otherwise. */
export function localDigits(lang: Locale, v: number | string) {
  const s = String(v);
  return lang === "ar" || lang === "fa" || lang === "ur" || lang === "ps" ? s.replace(/[0-9]/g, (d) => ARABIC[Number(d)]) : s;
}
