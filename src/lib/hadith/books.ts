// The nine hadith books (src/generated/hadith-index.json, built by scripts/data/20-hadith.mjs).
// Server-side only: client components get the few names they need as props.
import data from "@/generated/hadith-index.json";
import type { Locale } from "@/i18n/config";
import { hadith } from "@/i18n/messages/hadith";

export type BookKey = "bukhari" | "muslim" | "abudawud" | "tirmidhi" | "nasai" | "ibnmajah" | "malik" | "darimi" | "ahmed";
export type ChapterInfo = { id: number; n: number; t: Partial<Record<Locale, string>> & { ar: string } };
export type BookInfo = { key: BookKey; titleAr: string; titleEn: string; count: number; hasEn: boolean; chapters: ChapterInfo[] };

export const BOOKS = data as BookInfo[];

/** The six major books, as the app groups them (hadithLib.sixBooks / otherCollections). */
export const SIX_BOOKS: BookKey[] = ["bukhari", "muslim", "abudawud", "tirmidhi", "nasai", "ibnmajah"];

export function getBook(key: string) {
  return BOOKS.find((b) => b.key === key);
}

export function bookName(lang: Locale, key: BookKey) {
  return hadith[lang].books[key];
}

/** Chapter (kitab) title in `lang`, or "" when only the Arabic exists. */
export function chapterTitle(lang: Locale, c: ChapterInfo) {
  if (lang === "ar") return "";
  return c.t[lang] ?? "";
}

/** Compact names for client components: { bukhari: { name, chapters: { 1: "…" } } }. */
export type NameMap = Record<string, { name: string; chapters: Record<number, string> }>;
export function nameMap(lang: Locale): NameMap {
  return Object.fromEntries(
    BOOKS.map((b) => [
      b.key,
      { name: bookName(lang, b.key), chapters: Object.fromEntries(b.chapters.map((c) => [c.id, chapterTitle(lang, c) || c.t.ar])) },
    ]),
  );
}
