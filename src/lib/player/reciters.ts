// The app's reciters (scripts/data/60-reciters.mjs): everyayah folders, Audio-screen categories, photos,
// names in the 8 languages.
import recitersJson from "@/generated/reciters.json";
import type { Locale } from "@/i18n/config";

export type ReciterCat = "r" | "j" | "m" | "w" | "t";
export type Reciter = {
  key: string;
  folder: string;
  cat: ReciterCat;
  photo?: string;
  /** spoken language of a translation recitation */
  tl?: "en" | "fa" | "az" | "bs" | "ur";
  names: Record<Locale, string>;
};

export const RECITERS = recitersJson as Reciter[];
const BY_KEY = new Map(RECITERS.map((r) => [r.key, r]));
const BY_FOLDER = new Map(RECITERS.map((r) => [r.folder, r]));

/** The app's default reciter (quranAudio.DEFAULT_RECITER_KEY). */
export const DEFAULT_RECITER = RECITERS.find((r) => r.folder === "Abdul_Basit_Murattal_192kbps")?.key ?? RECITERS[0].key;

export const reciterOf = (key: string | null | undefined) => (key ? BY_KEY.get(key) : undefined);
export const reciterByFolder = (folder: string | null | undefined) => (folder ? BY_FOLDER.get(folder) : undefined);
export const isReciter = (key: unknown): key is string => typeof key === "string" && BY_KEY.has(key);

/** Full name, as the app's getReciterLabel ("… (Murattal)"). */
export const reciterName = (lang: Locale, key: string) => reciterOf(key)?.names[lang] ?? key;
/** Name without the trailing "(…)", as the app's Audio screen lists it inside its category. */
export const reciterShortName = (lang: Locale, key: string) => reciterName(lang, key).replace(/\s*\([^)]*\)\s*$/u, "").trim();

export const reciterPhoto = (key: string) => {
  const p = reciterOf(key)?.photo;
  return p ? `/images/reciters/${p}.webp` : null;
};

/** The app's Audio-screen order of categories, with their app string keys. */
export const CATEGORIES: { cat: ReciterCat; key: string }[] = [
  { cat: "r", key: "reciter.catMurattal" },
  { cat: "j", key: "reciter.catMujawwad" },
  { cat: "m", key: "reciter.catMuallim" },
  { cat: "w", key: "reciter.catWarsh" },
  { cat: "t", key: "reciter.catTranslation" },
];
export const categoryKey = (cat: ReciterCat) => CATEGORIES.find((c) => c.cat === cat)!.key;

/** Reciters as the Audio screen lists them: one card per category + name (drops the duplicate Shuraym folder). */
export const LISTED_RECITERS: Reciter[] = (() => {
  const seen = new Set<string>();
  return RECITERS.filter((r) => {
    const k = `${r.cat}|${r.names.ar.replace(/\s*\([^)]*\)\s*$/u, "")}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
})();

const pad3 = (n: number) => String(n).padStart(3, "0");
/** everyayah.com file of one ayah (quranAudio.buildEveryAyahUrl). */
export const ayahUrl = (key: string, surah: number, ayah: number) =>
  encodeURI(`https://everyayah.com/data/${reciterOf(key)?.folder ?? reciterOf(DEFAULT_RECITER)!.folder}/${pad3(surah)}${pad3(ayah)}.mp3`);
