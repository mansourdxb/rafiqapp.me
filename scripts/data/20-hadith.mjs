// The nine hadith books (assets repo hadith_combined/*.json) split for the web:
//   public/data/hadith/<book>/<chapterId>.json  — one kitab: { h: [[number, arabic, narratorEn, textEn], …] }
//   public/data/hadith/<book>/search-ar.json    — [[chapterId, number, arabic without tashkeel], …]
//   public/data/hadith/<book>/search-en.json    — [[chapterId, number, english], …] (books with a translation)
//   src/generated/hadith-index.json             — books + chapters + counts + titles (build time)
// The hadith text is copied as-is; only whitespace in the English translation is collapsed
// (as the app does when it shows it).
import { rmSync } from "node:fs";
import { join } from "node:path";
import { LOCALES, readJson, writeJson } from "./_lib.mjs";

// App order and names (client/utils/hadithBookCache.ts HADITH_BOOKS).
const BOOKS = ["bukhari", "muslim", "abudawud", "tirmidhi", "nasai", "ibnmajah", "malik", "darimi", "ahmed"];

// Same normalisation as the app's hadith search (HadithSearchScreen stripArabic).
const TASHKEEL = /[\u064B-\u065F\u0670\u0640]/g;
const stripArabic = (s) =>
  s.replace(TASHKEEL, "").replace(/[آأإ]/g, "ا").replace(/ة/g, "ه").replace(/\s+/g, " ").trim();
const oneLine = (s) => (s ?? "").replace(/\s*\n\s*/g, " ").trim();

export default async function hadithData(ctx) {
  const titles = readJson(join(ctx.app, "client", "data", "hadithChapterTitles.json"));
  const outDir = join(ctx.root, "public", "data", "hadith");
  rmSync(outDir, { recursive: true, force: true });

  const index = [];
  for (const key of BOOKS) {
    const d = readJson(join(ctx.assets, "hadith_combined", `${key}.json`));
    const bookEn = d.index.titleEn;
    const searchAr = [];
    const searchEn = [];
    const chapters = [];
    let total = 0;
    for (const b of d.index.books) {
      const ch = d.chapters[String(b.id)];
      if (!ch?.hadiths?.length) continue;
      const rows = ch.hadiths.map((h, i) => {
        const n = h.idInBook ?? h.id ?? i + 1;
        const narrator = oneLine(h.english?.narrator);
        const text = oneLine(h.english?.text);
        searchAr.push([b.id, n, stripArabic(h.arabic ?? "")]);
        if (text) searchEn.push([b.id, n, narrator ? `${narrator} ${text}` : text]);
        return text ? [n, h.arabic ?? "", narrator, text] : [n, h.arabic ?? ""];
      });
      writeJson(join(outDir, key, `${b.id}.json`), { h: rows });
      total += rows.length;

      // English title: the chapter's own, else the index's (Darimi has none — both are the book name).
      const en = [ch.chapter?.english, b.en].find((t) => t && t !== bookEn) ?? "";
      const t = { ar: ch.chapter?.arabic || b.ar };
      if (en) {
        t.en = en;
        for (const l of LOCALES) if (titles[en]?.[l]) t[l] = titles[en][l];
      }
      chapters.push({ id: b.id, n: rows.length, t });
    }
    writeJson(join(outDir, key, "search-ar.json"), searchAr);
    if (searchEn.length) writeJson(join(outDir, key, "search-en.json"), searchEn);
    index.push({ key, titleAr: d.index.titleAr, titleEn: bookEn, count: total, hasEn: searchEn.length > 0, chapters });
  }
  writeJson(join(ctx.root, "src", "generated", "hadith-index.json"), index);
}
