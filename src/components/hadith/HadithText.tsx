// Arabic hadith text with the matn in green bold (app 4-tier detection) and optional search
// highlights. Never justified (kashida stretching).
import { normalizeArabic, splitMatn, stripArabic, stripFontMarks } from "@/lib/hadith/matn";

type Seg = { s: string; matn: boolean; hl: boolean };

/** Ranges in `text` that match `terms` (already normalised: no tashkeel, unified alef/taa). */
function arabicRanges(text: string, terms: string[]) {
  const starts: number[] = [];
  let norm = "";
  let sp = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (/\s/.test(ch)) {
      if (!sp) {
        norm += " ";
        starts.push(i);
        sp = true;
      }
      continue;
    }
    const s = stripArabic(ch);
    if (!s) continue;
    norm += s;
    starts.push(i);
    sp = false;
  }
  starts.push(text.length);
  const out: [number, number][] = [];
  for (const t of terms) {
    let p = norm.indexOf(t);
    while (p !== -1) {
      out.push([starts[p], starts[p + t.length] ?? text.length]);
      p = norm.indexOf(t, p + t.length);
    }
  }
  return out;
}

export function latinRanges(text: string, terms: string[]) {
  const low = text.toLowerCase();
  const out: [number, number][] = [];
  for (const t of terms) {
    let p = low.indexOf(t);
    while (p !== -1) {
      out.push([p, p + t.length]);
      p = low.indexOf(t, p + t.length);
    }
  }
  return out;
}

function segments(text: string, matnFrom: number, ranges: [number, number][]): Seg[] {
  const cuts = new Set([0, text.length, matnFrom]);
  for (const [a, b] of ranges) cuts.add(a).add(b);
  const pts = [...cuts].filter((x) => x >= 0 && x <= text.length).sort((a, b) => a - b);
  const segs: Seg[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [a, b] = [pts[i], pts[i + 1]];
    if (a === b) continue;
    segs.push({ s: text.slice(a, b), matn: matnFrom >= 0 && a >= matnFrom, hl: ranges.some(([x, y]) => a >= x && b <= y) });
  }
  return segs;
}

export const HL = "rounded-sm bg-orange/15 text-orange";

/** The text as the app shows it: normalizeArabic + stripFontMarks. */
export function displayArabic(raw: string) {
  return stripFontMarks(normalizeArabic(raw));
}

export function HadithArabic({ raw, terms, scale = 1 }: { raw: string; terms?: string[]; scale?: number }) {
  const text = displayArabic(raw);
  const parts = splitMatn(text);
  const matnFrom = parts ? parts.before.length : -1;
  const segs = segments(text, matnFrom, terms?.length ? arabicRanges(text, terms) : []);
  return (
    <p
      dir="rtl"
      lang="ar"
      className="quran text-start text-ink"
      style={{ fontSize: `${1.3 * scale}rem`, lineHeight: 2.05 }}
    >
      {segs.map((g, i) => (
        <span key={i} className={`${g.matn ? "font-bold text-[#2D7A4E] dark:text-[#3DA06A]" : ""} ${g.hl ? HL : ""}`}>
          {g.s}
        </span>
      ))}
    </p>
  );
}

export function Highlighted({ text, terms }: { text: string; terms?: string[] }) {
  if (!terms?.length) return <>{text}</>;
  const segs = segments(text, -1, latinRanges(text, terms));
  return (
    <>
      {segs.map((g, i) =>
        g.hl ? (
          <mark key={i} className={HL}>
            {g.s}
          </mark>
        ) : (
          <span key={i}>{g.s}</span>
        ),
      )}
    </>
  );
}
