// Reciters for the Qur'an audio player, from the app (client/src/services/quranAudio.ts +
// client/assets/<…>/reciterPhotos.ts):
//   src/generated/reciters.json      — key, everyayah folder, category, photo, name in all 8 languages
//   public/images/reciters/<id>.webp — the app's reciter photos, 200px webp
// Names follow the app's getReciterLabel: Arabic labels for ar/ur/fa, the app's Latin labels otherwise.
import { existsSync, mkdirSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { LOCALES, writeJson } from "./_lib.mjs";

/** Evaluates the object/array literal that follows `marker` in `src` (plain data, comments allowed). */
function literalAfter(src, marker) {
  const at = src.indexOf(marker);
  if (at < 0) throw new Error(`reciters: "${marker}" not found`);
  const open = src.slice(at + marker.length).search(/[[{]/) + at + marker.length;
  const close = src[open] === "[" ? "]" : "}";
  let depth = 0;
  let quote = null;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (quote) {
      if (c === "\\") i++;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") quote = c;
    else if (c === "/" && src[i + 1] === "/") i = src.indexOf("\n", i);
    else if (c === src[open]) depth++;
    else if (c === close && --depth === 0) return new Function(`return ${src.slice(open, i + 1)}`)();
  }
  throw new Error(`reciters: unterminated literal after "${marker}"`);
}

const isTranslation = (r) => /sahih|walk/i.test(r.key) || r.label.includes("ترجمة");
const isWarsh = (r) => /warsh/i.test(r.key) || r.label.includes("ورش");
const isMujawwad = (r) => /mujawwad/i.test(r.key) || r.label.includes("مجود");
const isMuallim = (r) => /muallim|teacher/i.test(r.key) || r.label.includes("المصحف المعلم");
// The app's Audio screen groups (its catOf): r murattal, j mujawwad, m teaching, w warsh, t translation
const catOf = (r) => (isTranslation(r) ? "t" : isWarsh(r) ? "w" : isMujawwad(r) ? "j" : isMuallim(r) ? "m" : "r");
/** Spoken language of a translation recitation (the Audio screen's translationLang). */
function translationLang(r) {
  const f = r.folder.toLowerCase();
  const k = r.key.toLowerCase();
  if (k.includes("sahih") || f.startsWith("english")) return "en";
  if (f.includes("fooladvand") || f.includes("makarem")) return "fa";
  if (f.includes("azerbaijani")) return "az";
  if (f.includes("besim") || f.includes("korkut")) return "bs";
  if (f.includes("urdu")) return "ur";
  return undefined;
}

export default async function (ctx) {
  const src = readFileSync(join(ctx.app, "client", "src", "services", "quranAudio.ts"), "utf8");
  const RECITERS = literalAfter(src, "export const RECITERS =");
  const AR = literalAfter(src, "const AR_LABELS: Record<string, string> =");
  const EN = literalAfter(src, "const EN_LABELS: Record<string, string> =");

  const photoDir = readdirSync(join(ctx.app, "client", "assets")).map((d) => join(ctx.app, "client", "assets", d)).find((d) => existsSync(join(d, "reciterPhotos.ts")));
  if (!photoDir) throw new Error("reciters: reciterPhotos.ts not found");
  const photoSrc = readFileSync(join(photoDir, "reciterPhotos.ts"), "utf8");
  const files = Object.fromEntries([...photoSrc.matchAll(/(\w+):\s*require\("\.\/reciters\/([^"]+)"\)/g)].map((m) => [m[1], m[2]]));
  const byKey = Object.fromEntries([...photoSrc.matchAll(/"([^"]+)":\s*P\.(\w+)/g)].map((m) => [m[1], m[2]]));

  // app's getArabicReciterLabel: exact folder, then the normalized folder
  const arLabel = (folder) => AR[folder] ?? AR[folder.replace(/\./g, "_").replace(/-/g, "_")];

  const out = [];
  const usedPhotos = new Set();
  for (const r of RECITERS) {
    const ar = arLabel(r.folder) ?? r.label;
    const en = EN[r.key];
    if (!en) throw new Error(`reciters: no Latin label for ${r.key}`);
    if (/[A-Za-z]/.test(ar)) throw new Error(`reciters: Arabic label for ${r.key} is Latin: ${ar}`);
    const names = Object.fromEntries(LOCALES.map((l) => [l, l === "ar" || l === "ur" || l === "fa" ? ar : en]));
    const photo = byKey[r.key];
    if (photo) usedPhotos.add(photo);
    const cat = catOf(r);
    out.push({ key: r.key, folder: r.folder, cat, ...(photo ? { photo } : {}), ...(cat === "t" ? { tl: translationLang(r) } : {}), names });
  }

  // photos: 200px square webp
  const dest = join(ctx.root, "public", "images", "reciters");
  mkdirSync(dest, { recursive: true });
  let sharp = null;
  try {
    sharp = (await import("sharp")).default;
  } catch {}
  for (const id of usedPhotos) {
    const from = join(photoDir, "reciters", files[id]);
    const to = join(dest, `${id}.webp`);
    if (sharp) await sharp(from).resize(200, 200, { fit: "cover", position: sharp.strategy.attention }).webp({ quality: 72 }).toFile(to);
    else execFileSync("cwebp", ["-quiet", "-q", "72", "-resize", "200", "0", from, "-o", to]);
  }

  writeJson(join(ctx.root, "src", "generated", "reciters.json"), out);
  console.log(`reciters: ${out.length} reciters, ${usedPhotos.size} photos`);
}
