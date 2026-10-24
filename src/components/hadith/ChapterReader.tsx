"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { localDigits } from "@/lib/digits";
import { favId, loadChapter, readPref, useFavorites, writePref, type HadithRow } from "@/lib/hadith/client";
import type { HadithLabels } from "@/lib/hadith/labels";
import { HadithCard, HadithSkeleton, LoadError } from "./HadithCard";

const PAGE = 20;

type Props = { lang: Locale; L: HadithLabels; book: string; chapter: number; total: number; bookName: string; chapterName: string; hasEn: boolean };

export function ChapterReader({ lang, L, book, chapter, total, bookName, chapterName, hasEn }: Props) {
  const [rows, setRows] = useState<HadithRow[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [shown, setShown] = useState(PAGE);
  const [focus, setFocus] = useState<number | null>(null);
  // Arabic: translation is optional (as in the app); other languages always show it.
  const [arTranslation, setArTranslation] = useState(false);
  const [scale, setScale] = useState(1);
  const favs = useFavorites();
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring saved preferences after hydration
    setArTranslation(readPref("hadith:showTranslation", "0") === "1");
    const s = parseFloat(readPref("hadith:fontScale", "1"));
    if (s >= 0.8 && s <= 1.6) setScale(s);
  }, []);

  const load = useCallback(() => {
    setFailed(false);
    loadChapter(book, chapter)
      .then((r) => {
        const m = /^#h(\d+)$/.exec(window.location.hash);
        const target = m ? Number(m[1]) : null;
        const idx = target != null ? r.findIndex((x) => x[0] === target) : -1;
        if (idx >= 0) {
          setShown(Math.max(PAGE, idx + 5));
          setFocus(target);
        }
        setRows(r);
      })
      .catch(() => setFailed(true));
  }, [book, chapter]);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- fetching the chapter on mount
  useEffect(load, [load]);

  // Scroll to the linked hadith once it is rendered.
  useEffect(() => {
    if (rows && focus != null) document.getElementById(`h${focus}`)?.scrollIntoView({ block: "start" });
  }, [rows, focus]);

  // "Load more" as the reader nears the end.
  useEffect(() => {
    const el = sentinel.current;
    if (!el || !rows || shown >= rows.length) return;
    const io = new IntersectionObserver((e) => e[0].isIntersecting && setShown((s) => s + PAGE), { rootMargin: "800px" });
    io.observe(el);
    return () => io.disconnect();
  }, [rows, shown]);

  const showTranslation = lang === "ar" ? arTranslation : true;
  const bump = (d: number) =>
    setScale((p) => {
      const n = Math.max(0.8, Math.min(1.6, Math.round((p + d) * 10) / 10));
      writePref("hadith:fontScale", String(n));
      return n;
    });
  const favSet = new Set(favs.map((f) => f.id));
  const tool = "grid h-9 min-w-9 place-items-center rounded-full px-2 text-sm font-bold text-ink-2 hover:bg-tint hover:text-primary";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl bg-card px-3 py-2 ring-1 ring-line/60 dark:ring-line">
        <span className="px-1 text-sm text-ink-2">
          {L.shownOf.replace("{a}", localDigits(lang, Math.min(shown, rows?.length ?? total))).replace("{b}", localDigits(lang, total))}
        </span>
        <div className="ms-auto flex items-center gap-1">
          {lang === "ar" && hasEn ? (
            <button
              onClick={() => {
                writePref("hadith:showTranslation", arTranslation ? "0" : "1");
                setArTranslation(!arTranslation);
              }}
              aria-pressed={arTranslation}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${arTranslation ? "bg-primary text-white" : "text-ink-2 hover:bg-tint"}`}
            >
              {L.showTranslation}
            </button>
          ) : null}
          <button onClick={() => bump(-0.1)} className={tool} aria-label={L.fontSmaller} title={L.fontSmaller}>
            <span dir="ltr">A−</span>
          </button>
          <button onClick={() => bump(0.1)} className={tool} aria-label={L.fontLarger} title={L.fontLarger}>
            <span dir="ltr" className="text-base">A+</span>
          </button>
        </div>
      </div>

      {lang !== "ar" && !hasEn ? <p className="mb-4 rounded-xl bg-tint px-4 py-3 text-sm text-section dark:text-primary-light">{L.noTranslation}</p> : null}

      {failed ? (
        <LoadError L={L} onRetry={load} />
      ) : !rows ? (
        <div role="status" aria-label={L.loading}>
          <HadithSkeleton />
        </div>
      ) : (
        <div className="space-y-4">
          {rows.slice(0, shown).map((r) => (
            <HadithCard
              key={r[0]}
              lang={lang}
              L={L}
              book={book}
              chapter={chapter}
              row={r}
              bookName={bookName}
              chapterName={chapterName}
              showTranslation={showTranslation}
              isFav={favSet.has(favId(book, chapter, r[0]))}
              scale={scale}
              focused={focus === r[0]}
            />
          ))}
          {shown < rows.length ? (
            <div ref={sentinel} className="pt-2 text-center">
              <button onClick={() => setShown((s) => s + PAGE)} className="rounded-full bg-card px-6 py-2.5 text-sm font-bold text-primary ring-1 ring-line hover:bg-tint">
                {L.showMore}
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
