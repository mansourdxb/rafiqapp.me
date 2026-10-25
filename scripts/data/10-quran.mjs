// Qur'an section data, derived from the app's bundled mushaf data (client/data/mushaf, client/data/Quran).
//   src/generated/quran-surahs.json   — 114 surahs: Arabic + localized names, type, ayahs, first page, juz
//   src/generated/quran-meta.json     — juz starts, hizb quarters (index Juz tab), juz + surah of every page
//   public/data/quran/pages/{p}.json  — one mushaf page: QCF V1 glyph lines + Unicode fallback lines + ayah texts
//   public/data/quran/tafsir/{p}.json — Arabic tafsir (المختصر, الجلالين, السعدي) of the page's ayahs
//   public/data/quran/en/{p}.json     — English translation (Saheeh International, bundled in the app)
//   public/data/quran/fonts, frame    — medallion / surah-title / basmala fonts and the page frame artwork
// The 604 QCF page fonts are not copied: the reader loads them from the assets repo (then quran.com).
import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { readJson, writeJson } from "./_lib.mjs";

export default async function quranData(ctx) {
  const app = (...p) => join(ctx.app, "client", ...p);
  const out = join(ctx.root, "public", "data", "quran");
  const gen = join(ctx.root, "src", "generated");

  const qcf = readJson(app("data", "mushaf", "qcf-v1-lines.json"));
  const lines = readJson(app("data", "mushaf", "mushaf-lines.json"));
  const hafs = readJson(app("data", "mushaf", "qpc-hafs.json")).surahs; // [sura-1][aya-1] = text
  const snippets = readJson(app("data", "mushaf", "quarter-snippets.json")).snippets;
  const suraMeta = readJson(app("data", "Quran", "sura-meta.json"));
  const pageStarts = readJson(app("data", "Quran", "mushaf-pages.json"));
  const juzStarts = readJson(app("data", "Quran", "mushaf-juz.json"));
  const quarters = readJson(app("data", "Quran", "hizb-quarters.json"));
  const english = readJson(app("assets", "data", "quran_en.json"));
  // page font URLs (bases tried in order) + SHA-256 of every page font: a font is used only if it matches
  const fonts = readJson(app("data", "mushaf", "qcf-v1-fonts.json"));

  // ── localized surah names (index 0 unused), from the app's QuranSurahListScreen ──
  const listSrc = readFileSync(app("screens", "quran", "QuranSurahListScreen.tsx"), "utf8");
  const namesOf = (code) => {
    const m = listSrc.match(new RegExp(`export const SURAH_NAMES_${code}: string\\[\\] = (\\[[\\s\\S]*?\\]);`));
    if (!m) throw new Error(`SURAH_NAMES_${code} not found`);
    return new Function(`return ${m[1]}`)();
  };
  const localized = Object.fromEntries(["fa", "ur", "tr", "id", "ru", "hi"].map((l) => [l, namesOf(l.toUpperCase())]));

  // ── page / juz lookups (binary search over the start lists, as the app does) ──
  const cmp = (a, b) => (a.sura !== b.sura ? a.sura - b.sura : a.aya - b.aya);
  const lookup = (list) => (sura, aya) => {
    let lo = 0, hi = list.length - 1, best = list[0].index;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (cmp({ sura, aya }, list[mid]) >= 0) { best = list[mid].index; lo = mid + 1; } else hi = mid - 1;
    }
    return best;
  };
  const pageOf = lookup(pageStarts);
  const juzOf = lookup(juzStarts);

  const surahs = suraMeta.map((s) => ({
    n: s.index,
    ar: s.name,
    lat: s.tname ?? "",
    type: s.type?.toLowerCase() === "meccan" ? "meccan" : "madinan",
    ayahs: s.ayas,
    page: pageOf(s.index, 1),
    juz: juzOf(s.index, 1),
    names: Object.fromEntries(Object.entries(localized).map(([l, arr]) => [l, arr[s.index] ?? ""])),
  }));
  writeJson(join(gen, "quran-surahs.json"), surahs);

  // quarter titles exactly like AlMosalyQuranIndex.quarterTitle (Tanzil snippet, else first 6 words)
  const quarterTitle = (s, a) =>
    snippets[`${s}:${a}`] ??
    hafs[s - 1][a - 1].replace(/[ً-ٰٟۖ-ۭ۞]/g, "").replace(/ٱ/g, "ا").replace(/\s+/g, " ").trim().split(" ").slice(0, 6).join(" ");

  const pageJuz = [];
  const pageSurah = [];
  for (let p = 1; p <= 604; p++) {
    const st = pageStarts.find((x) => x.index === p);
    pageJuz.push(juzOf(st.sura, st.aya));
    pageSurah.push(st.sura);
  }
  writeJson(join(gen, "quran-meta.json"), {
    juz: juzStarts.map((j) => ({ s: j.sura, a: j.aya, p: pageOf(j.sura, j.aya) })),
    quarters: quarters.map((q) => ({ s: q.sura, a: q.aya, p: pageOf(q.sura, q.aya), j: juzOf(q.sura, q.aya), t: quarterTitle(q.sura, q.aya) })),
    pageJuz,
    pageSurah,
    pageStart: pageStarts.map((x) => [x.sura, x.aya]),
  });

  // ── tafsir per ayah: [المختصر, الجلالين, السعدي] ──
  const tafsir = new Map();
  for (const f of readdirSync(app("data", "Quran")).filter((f) => /^\d{3}_.*\.json$/.test(f))) {
    const j = readJson(app("data", "Quran", f));
    for (const a of j.ayahs) {
      const list = a.tafsir ?? [];
      const pick = (m) => list.find((e) => e.type?.includes(m))?.text ?? "";
      const row = [pick("مختصر") || list[0]?.text || "", pick("الجلالين"), pick("السعدي")];
      tafsir.set(`${j.number}:${a.ayah_number}`, row);
    }
  }
  const en = new Map();
  for (const s of english) for (const v of s.verses) en.set(`${s.id}:${v.id}`, v.translation);

  // ── per-page files ──
  for (const d of ["pages", "tafsir", "en"]) rmSync(join(out, d), { recursive: true, force: true });
  const rub = new Set(lines.rub);
  for (let p = 1; p <= 604; p++) {
    const keys = new Set();
    const q = qcf.pages[p - 1];
    for (const slot of q) if (slot[0] === "q") for (const seg of slot[1]) keys.add(`${seg[0]}:${seg[1]}`);
    // Unicode fallback: ['t', [[sura, aya, firstWordIndex, lastWordIndex]...], widthEm]; index == wordCount = medallion
    const u = lines.pages[p - 1].map((slot) => {
      if (slot[0] !== "t") return slot;
      let [s, a, i] = slot[1];
      const [s2, a2, i2] = slot[1].slice(3);
      const segs = [];
      for (;;) {
        const n = hafs[s - 1][a - 1].split(" ").length;
        const last = s === s2 && a === a2 ? i2 : n;
        segs.push([s, a, i, last]);
        keys.add(`${s}:${a}`);
        if (s === s2 && a === a2) break;
        if (a < hafs[s - 1].length) { a += 1; i = 0; } else { s += 1; a = 1; i = 0; }
      }
      return ["t", segs, slot[2]];
    });
    const ayahs = {};
    const tf = {};
    const tr = {};
    for (const k of keys) {
      const [s, a] = k.split(":").map(Number);
      ayahs[k] = hafs[s - 1][a - 1];
      tf[k] = tafsir.get(k) ?? ["", "", ""];
      tr[k] = en.get(k) ?? "";
    }
    const rubOnPage = [...keys].filter((k) => rub.has(k));
    writeJson(join(out, "pages", `${p}.json`), { p, juz: pageJuz[p - 1], sha: fonts.sha256[p - 1], q, u, ayahs, rub: rubOnPage });
    writeJson(join(out, "tafsir", `${p}.json`), tf);
    writeJson(join(out, "en", `${p}.json`), tr);
  }

  // ── fonts + frame artwork ──
  mkdirSync(join(out, "fonts"), { recursive: true });
  copyFileSync(app("assets", "fonts", "KFGQPC Uthmanic Script HAFS Regular.otf"), join(out, "fonts", "kfgqpc-hafs.otf"));
  copyFileSync(app("assets", "fonts", "sura_names.ttf"), join(out, "fonts", "sura-names.ttf"));
  copyFileSync(app("assets", "fonts", "qcf1_p1.ttf"), join(out, "fonts", "qcf-basmala.ttf"));
  mkdirSync(join(out, "frame"), { recursive: true });
  const frame = app("assets", "mushaf", "frame");
  for (const f of readdirSync(frame).filter((f) => f.endsWith(".png"))) {
    copyFileSync(join(frame, f), join(out, "frame", f.replace(/@\dx/, "")));
  }
  writeJson(join(gen, "quran-fonts.json"), { bases: fonts.bases });
}
