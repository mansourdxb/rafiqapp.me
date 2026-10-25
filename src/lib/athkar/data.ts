// Server-only loaders for the generated adhkar / tasbeeh / names data (scripts/data/30-athkar.mjs).
// Pages pick what they need and pass it down as props, so client bundles never include these files.
import type { Locale } from "@/i18n/config";
import index from "@/generated/athkar-index.json";
import tasbeehData from "@/generated/tasbeeh.json";
import namesData from "@/generated/names.json";

export type Dhikr = {
  /** Arabic text */
  ar: string;
  /** times to repeat */
  c: number;
  /** translation (non-Arabic languages) */
  tr?: string;
  /** virtue (fadl), in the page language when the app has it */
  s?: string;
  /** reference */
  r?: string;
  /** audio file name in the assets repo (azkar/audio/<a>.mp3) */
  a?: string;
};
export type AthkarCategory = { id: number; a?: string; items: Dhikr[] };
export type CategoryEntry = { id: number; t: Record<Locale, string>; n: number };

export const CATEGORIES = index as CategoryEntry[];

/** The big cards on top of /athkar/ (ids in the app's adhkar.json). */
export const FEATURED = [
  { id: 1, key: "morning", img: "azcard_morning.png", bg: "#FFF9E5", fg: "#B7772A" },
  { id: 133, key: "evening", img: "azcard_evening.png", bg: "#EFF6FE", fg: "#4F5FE0" },
  { id: 27, key: "afterPrayer", img: "azcard_after.png", bg: "#EFF6FE", fg: "#15294D" },
  { id: 2, key: "sleep", img: "azcard_sleep.png", bg: "#F1F2F7", fg: "#15294D" },
  { id: 3, key: "wake", img: "azcard_morning.png", bg: "#FFF4E8", fg: "#C2601A" },
] as const;

const LOADERS: Record<Locale, () => Promise<{ default: unknown }>> = {
  ar: () => import("@/generated/athkar-ar.json"),
  en: () => import("@/generated/athkar-en.json"),
  ur: () => import("@/generated/athkar-ur.json"),
  fa: () => import("@/generated/athkar-fa.json"),
  ru: () => import("@/generated/athkar-ru.json"),
  ms: () => import("@/generated/athkar-ms.json"),
  tr: () => import("@/generated/athkar-tr.json"),
  id: () => import("@/generated/athkar-id.json"),
  hi: () => import("@/generated/athkar-hi.json"),
};

export async function loadCategory(lang: Locale, id: number) {
  const all = (await LOADERS[lang]()).default as AthkarCategory[];
  return all.find((c) => c.id === id);
}

export const categoryTitle = (lang: Locale, id: number) => CATEGORIES.find((c) => c.id === id)?.t[lang] ?? "";

export type TasbeehPreset = {
  id: string;
  target: number;
  translit: string;
  name: Record<Locale, string>;
  text: Record<Locale, string>;
  fadl: Partial<Record<Locale, string>>;
};
export const TASBEEH = tasbeehData as TasbeehPreset[];

export type AllahName = {
  n: number;
  ar: string;
  tl: string;
  /** Qur'an references, "s:a" */
  q: string[];
  m: { ar: string; en: string };
  d: { ar: string; en: string };
};
export const NAMES = namesData as AllahName[];

/** Meaning / explanation in the page language: the app has Arabic and English; others show English. */
export const nameText = (lang: Locale, n: AllahName) => ({
  meaning: lang === "ar" ? n.m.ar : n.m.en,
  desc: lang === "ar" ? n.d.ar : n.d.en,
  english: lang !== "ar" && lang !== "en",
});
