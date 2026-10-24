// Hadith text helpers, ported as-is from the app (client/screens/hadith/GenericHadithChapterScreen.tsx):
// normalizeArabic, stripFontMarks and the 4-tier matn (the Prophet's words) detection.

/** Strips quotes and spaces before Arabic punctuation (the app's normalizeArabic). */
export function normalizeArabic(text: string) {
  return text.replace(/["']/g, "").replace(/[\s\u200E\u200F]+([،,؛:.!؟])/g, "$1").trim();
}

/** Strip chars that the Uthmanic (KFGQPC) font renders as circles/dots. */
export function stripFontMarks(t: string) {
  return t
    .replace(/[،؛؟.:;"'{}()\u200E\u200F\u200B-\u200D\u2066-\u2069\u202A-\u202E\u06D6-\u06ED\u0600-\u0605\u06DD\u06DE\u08D4-\u08E1\uFD3E\uFD3F\uFDFC\uFDFD]/g, " ")
    .replace(/ {2,}/g, " ")
    .trim();
}

/* ── Matn (main statement) detection ── */
const DIA_RE = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0640]/g;
function strip(s: string) {
  return s.replace(DIA_RE, "").replace(/\s+/g, " ").trim();
}

function buildNormalizedMap(original: string): { norm: string; map: number[] } {
  const map: number[] = [];
  let norm = "";
  let sp = false;
  for (let i = 0; i < original.length; i++) {
    const ch = original[i];
    if (DIA_RE.test(ch)) {
      DIA_RE.lastIndex = 0;
      continue;
    }
    if (/\s/.test(ch)) {
      if (!sp && norm.length > 0) {
        norm += " ";
        map.push(i);
        sp = true;
      }
      continue;
    }
    norm += ch;
    map.push(i);
    sp = false;
  }
  return { norm: norm.trim(), map };
}

/* ── Rule 2: Prophet reference (regex, with prefixes & aliases) ── */
const PROPHET_RE = /(?:^|[\s،.؛:])(?:و|ف)?(?:ل|ب)?(?:رسول\s+الله|النبي|[اأ]بو\s+القاسم|سمعت\s+النبي)/;
const PROPHET_PHRASES = ["رسول الله", "النبي", "ابو القاسم", "أبو القاسم", "سمعت النبي"].map(strip);
const PREFIX_CHARS = new Set(["ل", "ب", "ف", "و", "ك"]);

/* ── Rule 1: Quote-based matn ── */
function findQuoteMatn(norm: string): number {
  const qIdx = norm.indexOf("\u201C"); // "
  if (qIdx === -1) return -1;
  const lookback = norm.slice(Math.max(0, qIdx - 120), qIdx);
  if (PROPHET_RE.test(lookback)) return qIdx;
  return -1;
}

function findProphetMention(norm: string, startFrom = 0): number {
  let best = -1;
  for (const phrase of PROPHET_PHRASES) {
    const search = startFrom;
    while (search < norm.length) {
      const idx = norm.indexOf(phrase, search);
      if (idx === -1) break;
      let hlStart = idx;
      if (idx > 0 && norm[idx - 1] !== " ") {
        const pc = idx >= 2 && (norm[idx - 2] === " " || idx - 2 < startFrom) ? norm[idx - 1] : "";
        if (pc && PREFIX_CHARS.has(pc)) hlStart = idx - 1;
      }
      if (best === -1 || hlStart < best) best = hlStart;
      break;
    }
  }
  return best;
}

/* ── Rule 3: Marker + Prophet (colon optional) ── */
const MARKER_RE = /(?:يقول|قال|فقال|ثم قال|يذكر|ذكر|سمعت)\s*:?\s*/g;

function findMarkerThenProphet(norm: string): number {
  MARKER_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = MARKER_RE.exec(norm)) !== null) {
    const afterMarker = m.index + m[0].length;
    const pIdx = findProphetMention(norm, afterMarker);
    if (pIdx !== -1 && pIdx - afterMarker <= 30) return pIdx;
  }
  return -1;
}

/* ── Rule 4: Companion matn — عن <name>، قالت/قال ── */
const COMPANION_RE = /عن [^ ]+ ?[^ ]*، ?(قالت|قال)/;

function findCompanionMatn(norm: string): number {
  const m = COMPANION_RE.exec(norm);
  if (!m) return -1;
  return m.index + m[0].length - m[1].length;
}

/** Splits a hadith into the chain (before) and the matn, or null when no rule matches. */
export function splitMatn(text: string): { before: string; matn: string } | null {
  const { norm, map } = buildNormalizedMap(text);

  const r1 = findQuoteMatn(norm);
  if (r1 !== -1 && r1 < map.length) return { before: text.slice(0, map[r1]), matn: text.slice(map[r1]) };

  const r2 = findProphetMention(norm);
  if (r2 !== -1 && r2 < map.length) return { before: text.slice(0, map[r2]), matn: text.slice(map[r2]) };

  const r3 = findMarkerThenProphet(norm);
  if (r3 !== -1 && r3 < map.length) return { before: text.slice(0, map[r3]), matn: text.slice(map[r3]) };

  const r4 = findCompanionMatn(norm);
  if (r4 !== -1 && r4 < map.length) return { before: text.slice(0, map[r4]), matn: text.slice(map[r4]) };

  return null;
}

/** Search normalisation, as the app's hadith search (HadithSearchScreen stripArabic). */
export function stripArabic(s: string) {
  return s.replace(/[\u064B-\u065F\u0670\u0640]/g, "").replace(/[\u0622\u0623\u0625]/g, "\u0627").replace(/\u0629/g, "\u0647");
}
