import type { Locale } from "@/i18n/config";
import { quran } from "@/i18n/messages/quran";
import { localDigits } from "@/lib/digits";
import { surahName, surahOfPage } from "./data";

/** "Al-Baqara — Page 2" (reader page title, also set on page turns). */
export function pageTitle(lang: Locale, p: number) {
  return `${surahName(lang, surahOfPage(p))} — ${quran[lang].page} ${localDigits(lang, p)}`;
}
