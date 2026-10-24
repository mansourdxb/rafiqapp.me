import type { Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { localDigits } from "@/lib/digits";
import { surahName, SURAHS } from "@/lib/quran/data";

/** "سورة الفاتحة" / "Al-Faatiha" */
export const surahTitle = (lang: Locale, s: number) => (lang === "ar" ? `سورة ${SURAHS[s - 1]?.ar ?? ""}` : surahName(lang, s));

/** "Ayah 3" (the app's qaudio.ayah). */
export const ayahLabel = (lang: Locale, a: number) => `${appT(lang, "qaudio.ayah")} ${localDigits(lang, a)}`;

/** "3 of 7" (the app's hisn.xOfY, as its now-playing screen). */
export const xOfY = (lang: Locale, x: number, y: number) =>
  appT(lang, "hisn.xOfY").replace("{current}", localDigits(lang, x)).replace("{total}", localDigits(lang, y));

/** m:ss */
export const clock = (sec: number) => {
  const t = Math.max(0, Math.floor(sec || 0));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
};
