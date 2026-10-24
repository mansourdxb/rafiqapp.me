"use client";
// One Madinah mushaf page, as the app's MushafLinePage + MushafPageFrame: each line a row of words
// spread to the full width by the space BETWEEN words; drawn with the page's own King Fahd QCF V1
// font when it is loaded, otherwise with the Unicode text (KFGQPC Hafs) — never a blank page.
// Sizes are in container units of the text box, so the page scales with its width.
import { useLayoutEffect, useRef, useState } from "react";
import { arabicIndic, juzTitleAr, SURAHS, type PageData, type QcfSeg, type UniSeg } from "@/lib/quran/data";
import { qcfFamily, useQcfFont } from "@/lib/quran/qcfFonts";

/** Typical printed line width (em of the page font): one line height for every page. */
const LINE_EM = 13.8;
/** Line height = 1.8 × the page font (≈ the app's phone layout). */
export const LINE_CQW = (98.5 / LINE_EM) * 1.8;
const QCF_FIT = 98.5;
const MEDALLION_SCALE = 1.15;
const CENTER_BELOW = 0.72;
const UNI_FIT = 96;
const RUB3 = "۞";
/** Printed Madinah basmala: page 1's glyph codes for 1:1 without the medallion (as the app). */
const BASMALA = "ﭑﭒﭓﭔ";

const surahTitle = (s: number) => `سورة ${(SURAHS[s - 1]?.ar ?? "").replace(/^سورة\s*/, "")}`.replace(/آ/g, "آ");

type Props = {
  page: number;
  data: PageData | null;
  selected: string | null;
  onSelect: (sura: number, aya: number) => void;
};

export function MushafPage({ page, data, selected, onSelect }: Props) {
  const font = useQcfFont(page, data?.sha);
  const centeredPage = page <= 2;
  const lineH = centeredPage ? LINE_CQW * 1.5 : LINE_CQW;
  const juz = data?.juz ?? 1;
  const sura = data ? firstSura(data) : 1;
  return (
    <div className="mushaf w-full select-none">
      <div className="mf">
        <i className="mf-side l" />
        <i className="mf-side r" />
        <i className="mf-cap t" />
        <i className="mf-cap b" />
        <i className="mf-corner tl" />
        <i className="mf-corner tr" />
        <i className="mf-corner bl" />
        <i className="mf-corner br" />
        <div className="mf-cart" style={{ left: "calc(24px + (50% - 24px - 113px) / 2)" }}>
          <span>{surahTitle(sura)}</span>
        </div>
        <div className="mf-cart" style={{ right: "calc(24px + (50% - 24px - 113px) / 2)" }}>
          <span>{juzTitleAr(juz)}</span>
        </div>
        <div className="mf-badge">
          <PageBadge label={arabicIndic(page)} />
        </div>
        <div className="px-0.5">
          <div className="mp">
            <TextBox page={page} data={data} font={font} lineH={lineH} selected={selected} onSelect={onSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}

function firstSura(d: PageData) {
  for (const slot of d.q) {
    if (slot[0] === "h") return slot[1];
    if (slot[0] === "q") return slot[1][0]?.[0] ?? 1;
  }
  return 1;
}

/** min-height in container units does not resolve on the container itself — wrap the lines. */
function TextBox({ page, data, font, lineH, selected, onSelect }: { page: number; data: PageData | null; font: "ready" | "loading" | "failed"; lineH: number; selected: string | null; onSelect: (s: number, a: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const bands = useBands(ref, selected, `${page}|${font}|${data ? 1 : 0}`);
  const centeredPage = page <= 2;
  if (!data) return <Skeleton lines={centeredPage ? 8 : 15} lineH={lineH} />;
  const useQcf = font === "ready";
  return (
    <div ref={ref} className={centeredPage ? "flex flex-col justify-center" : undefined} style={{ minHeight: `${LINE_CQW * 15}cqw` }}>
      {useQcf ? (
        <QcfLines data={data} lineH={lineH} centeredPage={centeredPage} onSelect={onSelect} bands={bands} />
      ) : (
        <UniLines data={data} lineH={lineH} centeredPage={centeredPage} onSelect={onSelect} bands={bands} />
      )}
    </div>
  );
}

type Band = { line: number; left: number; width: number };

/** Measures the selected ayah's words on every line → one band per line behind them (HighlightRow). */
function useBands(ref: React.RefObject<HTMLDivElement | null>, selected: string | null, dep: string) {
  const [bands, setBands] = useState<Band[]>([]);
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const measure = () => {
      if (!selected) {
        setBands((b) => (b.length ? [] : b));
        return;
      }
      const out: Band[] = [];
      root.querySelectorAll<HTMLElement>(".mp-line").forEach((line, li) => {
        const words = line.querySelectorAll<HTMLElement>(`[data-k="${selected}"]`);
        if (!words.length) return;
        const lr = line.getBoundingClientRect();
        let l = Infinity;
        let r = -Infinity;
        words.forEach((w) => {
          const b = w.getBoundingClientRect();
          l = Math.min(l, b.left);
          r = Math.max(r, b.right);
        });
        out.push({ line: li, left: l - lr.left - 2, width: r - l + 4 });
      });
      setBands(out);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, [ref, selected, dep]);
  return bands;
}

function BandsFor({ bands, line }: { bands: Band[]; line: number }) {
  return (
    <>
      {bands
        .filter((b) => b.line === line)
        .map((b, i) => (
          <span key={i} className="mp-band" style={{ left: b.left, width: b.width }} />
        ))}
    </>
  );
}

function TitleRow({ sura, lineH }: { sura: number; lineH: number }) {
  return (
    <div className="mp-line mp-title" style={{ height: `${lineH}cqw` }}>
      <div style={{ maxWidth: `${(lineH * 960) / 129}cqw` }}>
        {/* SuraNames maps "NNN" → the name and "surah" → «سورة» as separate glyphs, laid out left to right */}
        <span className="mp-calli" style={{ fontSize: `${lineH * 0.62}cqw`, lineHeight: `${lineH}cqw` }} aria-label={surahTitle(sura)}>
          {String(sura).padStart(3, "0")}
          <span style={{ marginLeft: `${lineH * 0.04}cqw` }}>surah</span>
        </span>
      </div>
    </div>
  );
}

function BasmalaRow({ fontCqw, lineH, idx }: { fontCqw: number; lineH: number; idx: number }) {
  return (
    <div key={`b${idx}`} className="mp-line justify-center" style={{ height: `${lineH}cqw`, zIndex: 2 }}>
      <span style={{ fontFamily: "QcfBasmala", fontSize: `${fontCqw * 1.5}cqw`, lineHeight: `${fontCqw * 2.2}cqw`, color: "var(--m-basmala)" }}>{BASMALA}</span>
    </div>
  );
}

type LinesProps = { data: PageData; lineH: number; centeredPage: boolean; onSelect: (s: number, a: number) => void; bands: Band[] };

/**
 * Shrinks the page text when a line would run past the frame. The QCF widths are measured for
 * Chrome; Safari, browser zoom and minimum-font-size settings can draw the glyphs wider. Re-measured
 * on every resize and when fonts finish loading.
 */
function useLineFit(dep: unknown) {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState(1);
  useLayoutEffect(() => {
    const box = ref.current;
    if (!box) return;
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let worst = 1;
        box.querySelectorAll<HTMLElement>(".mp-line").forEach((line) => {
          const avail = line.clientWidth;
          let used = 0;
          line.querySelectorAll<HTMLElement>(":scope > .mp-w").forEach((w) => {
            const cs = getComputedStyle(w);
            used += w.getBoundingClientRect().width + parseFloat(cs.marginLeft) + parseFloat(cs.marginRight);
          });
          if (avail > 0 && used > 0) worst = Math.min(worst, avail / used);
        });
        // measured at the current fit: compound so it converges instead of oscillating
        setFit((f) => {
          const next = Math.min(1, f * worst * (worst < 1 ? 0.995 : 1));
          return Math.abs(next - f) > 0.002 ? next : f;
        });
      });
    };
    const ro = new ResizeObserver(() => {
      setFit(1);
      measure();
    });
    ro.observe(box.parentElement ?? box);
    document.fonts?.addEventListener?.("loadingdone", measure);
    measure();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.fonts?.removeEventListener?.("loadingdone", measure);
    };
  }, [dep]);
  return { ref, fit };
}

function QcfLines({ data, lineH, centeredPage, onSelect, bands }: LinesProps) {
  const family = qcfFamily(data.p);
  const maxEm = Math.max(1, ...data.q.map((x) => (x[0] === "q" ? x[2] : 0)));
  const { ref, fit } = useLineFit(data.p);
  const fontCqw = Math.min(QCF_FIT / (centeredPage ? maxEm * 1.08 : maxEm), lineH / 1.6) * fit;
  return (
    <div ref={ref} className="contents">
      {data.q.map((slot, i) => {
        if (slot[0] === "h") return <TitleRow key={`h${i}`} sura={slot[1]} lineH={lineH} />;
        if (slot[0] === "b") return <BasmalaRow key={`b${i}`} idx={i} fontCqw={fontCqw} lineH={lineH} />;
        const segs = slot[1] as QcfSeg[];
        const centered = centeredPage || slot[2] < maxEm * CENTER_BELOW;
        const line = i;
        return (
          <div key={`q${i}`} className={`mp-line ${centered ? "justify-center" : "justify-between"}`} style={{ height: `${lineH}cqw` }}>
            <BandsFor bands={bands} line={line} />
            {segs.flatMap(([s, a, first, codes, endsHere]) =>
              codes.map((code, j) => {
                const marker = endsHere === 1 && j === codes.length - 1;
                return (
                  <span
                    key={`${s}:${a}:${first + j}`}
                    data-k={`${s}:${a}`}
                    onClick={() => onSelect(s, a)}
                    className={marker ? "mp-w mp-mark" : "mp-w"}
                    style={{
                      fontFamily: marker ? undefined : family,
                      fontSize: `${fontCqw * (marker ? MEDALLION_SCALE : 1)}cqw`,
                      lineHeight: `${lineH}cqw`,
                      margin: centered ? "0 3px" : undefined,
                    }}
                  >
                    {marker ? arabicIndic(a) : code}
                  </span>
                );
              }),
            )}
          </div>
        );
      })}
    </div>
  );
}

function UniLines({ data, lineH, centeredPage, onSelect, bands }: LinesProps) {
  const rub = new Set(data.rub);
  const maxEm = Math.max(0, ...data.u.map((x) => (x[0] === "t" ? x[2] : 0)));
  const baseEm = centeredPage ? Math.max(8, maxEm * 1.08) : Math.min(20.2, Math.max(17, maxEm));
  const { ref, fit } = useLineFit(data.p);
  const base = Math.min(UNI_FIT / baseEm, lineH / 1.75) * fit;
  const words = (k: string) => (data.ayahs[k] ?? "").split(" ");
  const qcfMax = Math.max(1, ...data.q.map((x) => (x[0] === "q" ? x[2] : 0)));
  const basmalaFont = Math.min(QCF_FIT / (centeredPage ? qcfMax * 1.08 : qcfMax), lineH / 1.6);
  return (
    <div ref={ref} className="contents">
      {data.u.map((slot, i) => {
        if (slot[0] === "h") return <TitleRow key={`h${i}`} sura={slot[1]} lineH={lineH} />;
        if (slot[0] === "b") return <BasmalaRow key={`b${i}`} idx={i} fontCqw={basmalaFont} lineH={lineH} />;
        const widthEm = slot[2];
        const f = Math.min(base, UNI_FIT / widthEm);
        const centered = centeredPage || widthEm * f < 100 * CENTER_BELOW;
        const line = i;
        return (
          <div key={`t${i}`} className={`mp-line ${centered ? "justify-center" : "justify-between"}`} style={{ height: `${lineH}cqw` }}>
            <BandsFor bands={bands} line={line} />
            {(slot[1] as UniSeg[]).flatMap(([s, a, from, to]) => {
              const k = `${s}:${a}`;
              const w = words(k);
              const out = [];
              for (let x = from; x <= to; x++) {
                const marker = x === w.length;
                out.push(
                  <span
                    key={`${k}:${x}`}
                    data-k={k}
                    onClick={() => onSelect(s, a)}
                    className={marker ? "mp-w mp-mark" : "mp-w"}
                    style={{
                      fontFamily: marker ? undefined : `"KFGQPCHafs", var(--font-quran)`,
                      fontSize: `${f}cqw`,
                      lineHeight: `${lineH}cqw`,
                      margin: centered ? "0 3px" : undefined,
                    }}
                  >
                    {marker ? arabicIndic(a) : `${x === 0 && rub.has(k) && s !== 1 ? `${RUB3} ` : ""}${w[x]}`}
                  </span>,
                );
              }
              return out;
            })}
          </div>
        );
      })}
    </div>
  );
}

function Skeleton({ lines, lineH }: { lines: number; lineH: number }) {
  return (
    <div className="mp-skel" style={{ minHeight: `${LINE_CQW * 15}cqw` }} aria-hidden>
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="flex items-center" style={{ height: `${lineH}cqw` }}>
          <div className="h-[35%] w-full rounded-md bg-[var(--m-marker)] opacity-15" />
        </div>
      ))}
    </div>
  );
}

/** Page number in an open-book badge (MushafPageBadge). */
function PageBadge({ label }: { label: string }) {
  const W = 34;
  const H = 28;
  const m = W / 2;
  return (
    <span className="relative block" style={{ width: W, height: H }}>
      <svg width={W} height={H} className="absolute inset-0" aria-hidden>
        <path
          d={`M${m} 4 C${m - 5} 1.5 ${m - 11} 1.5 2.5 3 L2.5 ${H - 4} C${m - 11} ${H - 5.5} ${m - 5} ${H - 5.5} ${m} ${H - 2} Z`}
          className="fill-[#FFFCF8] stroke-[#D8C5B0] dark:fill-[#1E1811] dark:stroke-[#6A5A48]"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
        <path
          d={`M${m} 4 C${m + 5} 1.5 ${m + 11} 1.5 ${W - 2.5} 3 L${W - 2.5} ${H - 4} C${m + 11} ${H - 5.5} ${m + 5} ${H - 5.5} ${m} ${H - 2} Z`}
          className="fill-[#E9DECF] stroke-[#D8C5B0] dark:fill-[#2A2118] dark:stroke-[#6A5A48]"
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
      </svg>
      <span className="absolute inset-x-0 top-0.5 text-center text-[15px] font-bold leading-[22px] text-black dark:text-[#C8B89A]">{label}</span>
    </span>
  );
}
