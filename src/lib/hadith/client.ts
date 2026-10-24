"use client";
// Browser-side hadith data: per-chapter JSON, search indexes and favourites (localStorage).
import { useSyncExternalStore } from "react";
import { stripArabic } from "./matn";

/** [number, arabic, narratorEn?, textEn?] */
export type HadithRow = [number, string, string?, string?];

const cache = new Map<string, Promise<unknown>>();
function getJson<T>(url: string): Promise<T> {
  let p = cache.get(url);
  if (!p) {
    p = fetch(url).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    });
    p.catch(() => cache.delete(url));
    cache.set(url, p);
  }
  return p as Promise<T>;
}

export function loadChapter(book: string, chapter: number | string) {
  return getJson<{ h: HadithRow[] }>(`/data/hadith/${book}/${chapter}.json`).then((d) => d.h);
}

/* ── Search ── */
const hasArabic = (s: string) => /[\u0600-\u06FF]/.test(s);

type Entry = [number, number, string]; // chapterId, number, text
export type SearchHit = { book: string; chapter: number; n: number };

const prepared = new Map<string, Promise<Entry[]>>();
function index(book: string, kind: "ar" | "en") {
  const k = `${book}/${kind}`;
  let p = prepared.get(k);
  if (!p) {
    p = getJson<Entry[]>(`/data/hadith/${book}/search-${kind}.json`).then((rows) =>
      kind === "en" ? rows.map(([c, n, t]) => [c, n, t.toLowerCase()] as Entry) : rows,
    );
    p.catch(() => prepared.delete(k));
    prepared.set(k, p);
  }
  return p;
}

/** Query words, normalised like the index. */
export function queryTerms(q: string) {
  const arabic = hasArabic(q);
  const norm = arabic ? stripArabic(q) : q.toLowerCase();
  return { arabic, terms: norm.split(/\s+/).filter(Boolean) };
}

/** Every hadith (in `books`) containing all the query words, in book order, up to `limit`. */
export async function searchHadith(books: { key: string; hasEn: boolean }[], q: string, limit = 300) {
  const { arabic, terms } = queryTerms(q);
  if (!terms.length) return { hits: [] as SearchHit[], more: false };
  const list = arabic ? books : books.filter((b) => b.hasEn);
  const all = await Promise.all(list.map((b) => index(b.key, arabic ? "ar" : "en")));
  const hits: SearchHit[] = [];
  for (let i = 0; i < list.length; i++) {
    for (const [c, n, t] of all[i]) {
      if (terms.every((w) => t.includes(w))) {
        if (hits.length >= limit) return { hits, more: true };
        hits.push({ book: list[i].key, chapter: c, n });
      }
    }
  }
  return { hits, more: false };
}

/* ── Favourites ── */
export type Favorite = { id: string; book: string; chapter: number; n: number; text: string; savedAt: number };
const FAV_KEY = "hadith:favorites";
const listeners = new Set<() => void>();
let favCache: Favorite[] | null = null;
const EMPTY: Favorite[] = [];

function readFavs(): Favorite[] {
  if (favCache) return favCache;
  try {
    const v = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
    favCache = Array.isArray(v) ? v : [];
  } catch {
    favCache = [];
  }
  return favCache;
}

export const favId = (book: string, chapter: number, n: number) => `${book}:${chapter}:${n}`;

export function toggleFavorite(f: Omit<Favorite, "id" | "savedAt">) {
  const id = favId(f.book, f.chapter, f.n);
  const cur = readFavs();
  const exists = cur.some((x) => x.id === id);
  favCache = exists ? cur.filter((x) => x.id !== id) : [{ ...f, id, savedAt: Date.now() }, ...cur];
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(favCache));
  } catch {}
  listeners.forEach((l) => l());
  return !exists;
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === FAV_KEY) {
      favCache = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export function useFavorites() {
  return useSyncExternalStore(subscribe, readFavs, () => EMPTY);
}

/** A boolean preference in localStorage (translation toggle, text size …). */
export function readPref(key: string, fallback: string) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}
export function writePref(key: string, v: string) {
  try {
    localStorage.setItem(key, v);
  } catch {}
}
