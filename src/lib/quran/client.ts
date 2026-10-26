"use client";
// Browser-side Qur'an helpers: page/tafsir files, last-read page, translations, ayah audio.
import { useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import type { PageData } from "./data";

const cache = new Map<string, Promise<unknown>>();
function getJson<T>(url: string): Promise<T> {
  let p = cache.get(url) as Promise<T> | undefined;
  if (!p) {
    p = fetch(url).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json() as Promise<T>;
    });
    p.catch(() => cache.delete(url));
    cache.set(url, p);
  }
  return p;
}

export const fetchPage = (p: number) => getJson<PageData>(`/data/quran/pages/${p}.json`);
/** Arabic tafsir of a page's ayahs: key → [المختصر, الجلالين, السعدي] (bundled in the app). */
export const fetchTafsir = (p: number) => getJson<Record<string, [string, string, string]>>(`/data/quran/tafsir/${p}.json`);

// ── last read ──
const LAST_KEY = "quran:lastRead";
export type LastRead = { page: number; at: number };
export function saveLastRead(page: number) {
  writePref(LAST_KEY, JSON.stringify({ page, at: Date.now() }));
}
/** Last page read (null on the server / never read). */
export function useLastRead(): LastRead | null {
  const raw = usePref(LAST_KEY);
  try {
    const v = JSON.parse(raw ?? "null");
    return v && typeof v.page === "number" && v.page >= 1 && v.page <= 604 ? v : null;
  } catch {
    return null;
  }
}

// ── translations: the app's quran.com translation per language (client/utils/translationBookCache.ts);
// English is Saheeh International, bundled in the app (and in public/data/quran/en). ──
export const TRANSLATION: Record<Exclude<Locale, "ar">, { id: number; name: string }> = {
  en: { id: 20, name: "Saheeh International" },
  ur: { id: 151, name: "تفسیرِ عثمانی — شیخ الہند محمود الحسن" },
  fa: { id: 135, name: "IslamHouse.com" },
  ru: { id: 45, name: "Эльмир Кулиев" },
  ms: { id: 39, name: "Abdullah Muhammad Basmeih" },
  tr: { id: 77, name: "Diyanet İşleri" },
  id: { id: 33, name: "Kementerian Agama Republik Indonesia" },
  hi: { id: 122, name: "मौलाना अज़ीज़ुल हक़ अल-उमरी" },
  bn: { id: 161, name: "Taisirul Quran (Tawheed Publication)" },
  ha: { id: 32, name: "Abubakar Mahmoud Gumi" },
  fr: { id: 31, name: "Muhammad Hamidullah" },
  zh: { id: 56, name: "马坚" },
};

function stripHtml(html: string) {
  return html
    .replace(/<sup[^>]*>[\s\S]*?<\/sup>/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Ma Jian's text as the app cleans it (translationBookCache.ts stripHtml): two Traditional forms
 * to Simplified, the encoding leftovers 棗 (——) and ﹖ (？), no spaces between Chinese characters. */
const cleanZh = (s: string) =>
  s
    .replace(/後/g, "后")
    .replace(/於/g, "于")
    .replace(/棗/g, "——")
    .replace(/﹖/g, "？")
    .replace(/([\u4E00-\u9FFF\u3000-\u303F\uFF00-\uFFEF\u2014\u201C\u201D])\s+(?=[\u4E00-\u9FFF\u3000-\u303F\uFF00-\uFFEF\u2014\u201C\u201D])/g, "$1");

async function quranCom(id: number, key: string): Promise<string> {
  const data = await getJson<{ verse?: { translations?: { text: string }[] } }>(
    `https://api.quran.com/api/v4/verses/by_key/${key}?translations=${id}&fields=verse_key`,
  );
  const text = stripHtml(data.verse?.translations?.[0]?.text ?? "");
  return id === TRANSLATION.zh.id ? cleanZh(text) : text;
}

/**
 * The app's fixMaJianGaps: the digitised Ma Jian text repeats the previous verse in place of 4:110,
 * 7:110, 11:110 and 26:217–219, and has 4:110's meaning under 4:111. 4:110 gets its text back and the
 * verses whose text is missing stay empty — only while the source still shows the defect.
 */
const MA_JIAN_GAPS = ["7:110", "11:110", "26:217", "26:218", "26:219"];
async function maJian(key: string): Promise<string> {
  const id = TRANSLATION.zh.id;
  const prev = (k: string) => k.replace(/\d+$/, (a) => String(Number(a) - 1));
  if (key === "4:110" || key === "4:111") {
    const [t109, t110, t111] = await Promise.all(["4:109", "4:110", "4:111"].map((k) => quranCom(id, k)));
    const moved = !!t110 && t110 === t109 && !!t111;
    if (key === "4:110") return moved ? t111 : t110;
    return moved ? "" : t111;
  }
  if (MA_JIAN_GAPS.includes(key)) {
    const [before, text] = await Promise.all([quranCom(id, prev(key)), quranCom(id, key)]);
    return text && text === before ? "" : text;
  }
  return quranCom(id, key);
}

/** The verse's translation in `lang`; "" when the translation has no text for it. */
export async function fetchTranslation(lang: Exclude<Locale, "ar">, page: number, key: string): Promise<string> {
  if (lang === "en") {
    const m = await getJson<Record<string, string>>(`/data/quran/en/${page}.json`);
    if (m[key]) return m[key];
  }
  if (lang === "zh") return maJian(key);
  return quranCom(TRANSLATION[lang].id, key);
}

// ── ayah audio: everyayah.com, as the app (client/src/services/quranAudio.ts; default reciter first) ──
export const RECITERS = [
  { folder: "Abdul_Basit_Murattal_192kbps", ar: "عبد الباسط عبد الصمد", lat: "Abdul Basit Abdus-Samad" },
  { folder: "Husary_128kbps", ar: "محمود خليل الحصري", lat: "Mahmoud Khalil Al-Husary" },
  { folder: "Minshawy_Murattal_128kbps", ar: "محمد صديق المنشاوي", lat: "Mohamed Siddiq El-Minshawi" },
  { folder: "MaherAlMuaiqly128kbps", ar: "ماهر المعيقلي", lat: "Maher Al-Muaiqly" },
  { folder: "Ghamadi_40kbps", ar: "سعد الغامدي", lat: "Saad Al-Ghamdi" },
  { folder: "Yasser_Ad-Dussary_128kbps", ar: "ياسر الدوسري", lat: "Yasser Al-Dosari" },
] as const;
const pad3 = (n: number) => String(n).padStart(3, "0");
export const ayahAudioUrl = (folder: string, s: number, a: number) => `https://everyayah.com/data/${folder}/${pad3(s)}${pad3(a)}.mp3`;

export const RECITER_KEY = "quran:reciter";
export const TAFSIR_KEY = "quran:tafsirBook";
export const TWO_UP_KEY = "quran:twoUp";

// ── small persisted preferences, read without a setState-in-effect (server snapshot = null) ──
const PREF_EVENT = "quran:pref";
function subscribePref(cb: () => void) {
  window.addEventListener(PREF_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(PREF_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
function readPref(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
export function writePref(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
  window.dispatchEvent(new Event(PREF_EVENT));
}
/** localStorage value of `key` (null on the server and before hydration). */
export function usePref(key: string): string | null {
  return useSyncExternalStore(subscribePref, () => readPref(key), () => null);
}
