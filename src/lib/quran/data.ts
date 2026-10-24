// Build-time Qur'an data (scripts/data/10-quran.mjs) + helpers shared by the index and the reader.
import surahsJson from "@/generated/quran-surahs.json";
import metaJson from "@/generated/quran-meta.json";
import type { Locale } from "@/i18n/config";

export type Surah = {
  n: number;
  ar: string;
  lat: string;
  type: "meccan" | "madinan";
  ayahs: number;
  page: number;
  juz: number;
  names: Partial<Record<Locale, string>>;
};
export type Quarter = { s: number; a: number; p: number; j: number; t: string };

export const SURAHS = surahsJson as Surah[];
const META = metaJson as { juz: { s: number; a: number; p: number }[]; quarters: Quarter[]; pageJuz: number[]; pageSurah: number[]; pageStart: [number, number][] };
export const JUZ_STARTS = META.juz;
export const QUARTERS = META.quarters;
export const PAGE_COUNT = 604;

export const juzOfPage = (p: number) => META.pageJuz[p - 1] ?? 1;
export const surahOfPage = (p: number) => META.pageSurah[p - 1] ?? 1;

/** Mushaf page on which ayah sura:aya starts (binary search over the page starts, as the app). */
export function pageOfAyah(sura: number, aya: number): number {
  let lo = 0;
  let hi = META.pageStart.length - 1;
  let best = 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const [s, a] = META.pageStart[mid];
    if (sura > s || (sura === s && aya >= a)) {
      best = mid + 1;
      lo = mid + 1;
    } else hi = mid - 1;
  }
  return best;
}

/** Surah name in the site language, as the app's localizedSurahName (Arabic for ar). */
export function surahName(lang: Locale, n: number): string {
  const s = SURAHS[n - 1];
  if (!s) return "";
  if (lang === "ar") return s.ar;
  if (lang === "en" || lang === "ms") return s.lat || s.ar;
  return s.names[lang] || s.ar;
}

/** "الجزء الأول" … "الجزء الثلاثون" (client/src/lib/quran/juzNames.ts). */
const ORDINALS = [
  "الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر",
  "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر", "السادس عشر", "السابع عشر",
  "الثامن عشر", "التاسع عشر", "العشرون", "الحادي والعشرون", "الثاني والعشرون", "الثالث والعشرون",
  "الرابع والعشرون", "الخامس والعشرون", "السادس والعشرون", "السابع والعشرون", "الثامن والعشرون",
  "التاسع والعشرون", "الثلاثون",
];
export const juzTitleAr = (juz: number) => `الجزء ${ORDINALS[juz - 1] ?? juz}`;

const HIZB_NAMES = ["الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر"];
const ORD_TENS: Record<number, string> = { 1: "", 2: "العشرون", 3: "الثلاثون", 4: "الأربعون", 5: "الخمسون", 6: "الستون" };
const ORD_UNITS = ["", "الحادي", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع"];
/** "الحزب الأول" … "الحزب الستون" (AlMosalyQuranIndex.hizbTitle). */
export function hizbTitleAr(n: number): string {
  if (n <= 10) return `الحزب ${HIZB_NAMES[n - 1]}`;
  if (n < 20) return `الحزب ${ORD_UNITS[n - 10]} عشر`;
  const t = Math.floor(n / 10);
  const u = n % 10;
  return u === 0 ? `الحزب ${ORD_TENS[t]}` : `الحزب ${ORD_UNITS[u]} و${ORD_TENS[t]}`;
}

const AI = "٠١٢٣٤٥٦٧٨٩";
/** Eastern Arabic digits — always used for ayah numbers. */
export const arabicIndic = (n: number | string) => String(n).replace(/\d/g, (d) => AI[Number(d)]);

/** Lower-case, no diacritics / tashkeel / spaces / hyphens / apostrophes (AlMosalyQuranIndex.norm). */
export function norm(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ًͯ-ٰٟۖ-ۭ]/g, "")
    .replace(/[\s\-'’`ʿʾ‘.]/g, "")
    .replace(/ٱ/g, "ا")
    .toLowerCase()
    .replace(/aa/g, "a")
    .replace(/ee/g, "i")
    .replace(/oo|ou/g, "u");
}

/** Surahs matching a search (number in Latin/Arabic digits, or any of the names in any language). */
export function searchSurahs(query: string): Surah[] {
  const q = query.trim();
  if (!q) return SURAHS;
  const digits = q.replace(/[٠-٩]/g, (d) => String(AI.indexOf(d))).replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
  const nq = norm(q);
  return SURAHS.filter((s) => {
    if (String(s.n) === digits) return true;
    const names = [s.ar, s.lat, ...Object.values(s.names)];
    return names.some((n) => n && norm(n).includes(nq));
  });
}

/** Page data file (public/data/quran/pages/{p}.json). */
export type QcfSeg = [number, number, number, string[], number];
export type QcfSlot = ["q", QcfSeg[], number] | ["h", number] | ["b", number];
export type UniSeg = [number, number, number, number];
export type UniSlot = ["t", UniSeg[], number] | ["h", number] | ["b", number];
export type PageData = { p: number; juz: number; sha: string; q: QcfSlot[]; u: UniSlot[]; ayahs: Record<string, string>; rub: string[] };

export const clampPage = (p: number) => Math.min(PAGE_COUNT, Math.max(1, Math.round(p) || 1));
