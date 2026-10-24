"use client";
// Mushaf reader: one page on phones, two facing pages on wide screens (odd page on the right, as a
// printed mushaf). The mushaf turns right-to-left: the next page is to the LEFT (← key, swipe right).
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import "./quran.css";
import { Icon } from "@/components/ui/Icon";
import { dir as dirOf, localePath, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { common } from "@/i18n/messages/common";
import { quran } from "@/i18n/messages/quran";
import { localDigits } from "@/lib/digits";
import { clampPage, juzOfPage, JUZ_STARTS, PAGE_COUNT, pageOfAyah, SURAHS, surahName, surahOfPage, type PageData } from "@/lib/quran/data";
import { fetchPage, saveLastRead, TWO_UP_KEY, usePref, writePref } from "@/lib/quran/client";
import { ensureQcf, useQcfFont } from "@/lib/quran/qcfFonts";
import { pageTitle } from "@/lib/quran/title";
import { quranPageHref } from "@/lib/quran/href";
import { MushafPage } from "./MushafPage";
import { AyahPanel, type AyahSel } from "./AyahPanel";

const WIDE = "(min-width: 1100px)";

export function QuranReader({ lang, initialPage, initialData }: { lang: Locale; initialPage: number; initialData: PageData[] }) {
  const t = quran[lang];
  const [page, setPage] = useState(initialPage);
  const [pages, setPages] = useState<Record<number, PageData>>(() => Object.fromEntries(initialData.map((d) => [d.p, d])));
  const [sel, setSel] = useState<AyahSel | null>(null);
  const twoUp = usePref(TWO_UP_KEY) !== "0";
  const [gotoOpen, setGotoOpen] = useState(false);
  const [failedPage, setFailedPage] = useState<number | null>(null);
  const [retry, setRetry] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  const right = page % 2 === 1 ? page : page - 1;
  const left = Math.min(PAGE_COUNT, right + 1);
  const spread = right === left ? [right] : [right, left];

  // load the visible pages + neighbours, and their page fonts
  useEffect(() => {
    let live = true;
    const want = [page, right, left, page + 1, page - 1, right + 2, right + 3, right - 1, right - 2].filter((p) => p >= 1 && p <= PAGE_COUNT);
    for (const p of new Set(want)) {
      fetchPage(p).then(
        (d) => {
          if (!live) return;
          setPages((m) => (m[p] ? m : { ...m, [p]: d }));
          void ensureQcf(p, d.sha);
        },
        () => {
          if (live && p === page) setFailedPage(p);
        },
      );
    }
    return () => {
      live = false;
    };
  }, [page, right, left, retry]);

  // URL, title, last read
  useEffect(() => {
    saveLastRead(page);
    const url = quranPageHref(lang, page);
    if (window.location.pathname + window.location.search !== url) window.history.replaceState(window.history.state, "", url);
    document.title = `${pageTitle(lang, page)} | ${common[lang].siteName}`;
  }, [lang, page]);

  const wideNow = () => twoUp && window.matchMedia(WIDE).matches;

  const go = useCallback((p: number) => {
    const n = clampPage(p);
    setSel(null);
    setGotoOpen(false);
    setPage(n);
    const top = topRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) topRef.current?.scrollIntoView({ block: "start" });
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (wideNow()) {
        const r = page % 2 === 1 ? page : page - 1;
        go(r + 2 * dir);
      } else go(page + dir);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, twoUp, go],
  );

  // keyboard: ← next page, → previous page (the mushaf opens to the left)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (sel || gotoOpen || e.altKey || e.ctrlKey || e.metaKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "SELECT" || el.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, sel, gotoOpen]);

  // swipe: finger to the right = next page (it comes in from the left)
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const p = e.touches[0];
    touch.current = e.touches.length === 1 ? { x: p.clientX, y: p.clientY } : null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touch.current;
    touch.current = null;
    if (!s) return;
    const p = e.changedTouches[0];
    const dx = p.clientX - s.x;
    const dy = p.clientY - s.y;
    if (Math.abs(dx) > 60 && Math.abs(dy) < Math.abs(dx) * 0.6) step(dx > 0 ? 1 : -1);
  };

  const select = (p: number) => (s: number, a: number) => {
    const d = pages[p];
    setSel({ s, a, page: p, text: d?.ayahs[`${s}:${a}`] ?? "" });
  };

  const stepAyah = async (dir: 1 | -1) => {
    if (!sel) return;
    let { s, a } = sel;
    a += dir;
    if (a < 1) {
      if (s === 1) return;
      s -= 1;
      a = SURAHS[s - 1].ayahs;
    } else if (a > SURAHS[s - 1].ayahs) {
      if (s === 114) return;
      s += 1;
      a = 1;
    }
    const key = `${s}:${a}`;
    // stay on a visible page when the verse is on it
    const visible = [page, ...(wideNow() ? spread : [])];
    let p = visible.find((v) => pages[v]?.ayahs[key]);
    if (!p) p = pageOfAyah(s, a);
    try {
      const d = pages[p] ?? (await fetchPage(p));
      if (!visible.includes(p)) setPage(p);
      setSel({ s, a, page: p, text: d.ayahs[key] ?? "" });
    } catch {}
  };

  const font = useQcfFont(page, pages[page]?.sha);
  const juz = juzOfPage(page);
  const sura = surahOfPage(page);
  const digits = (n: number) => localDigits(lang, n);
  const juzLabel = lang === "ar" ? `الجزء ${digits(juz)}` : appT(lang, "quranIndex.juz").replace("{0}", digits(juz));
  const nextHref = quranPageHref(lang, Math.min(PAGE_COUNT, page + 1));
  const prevHref = quranPageHref(lang, Math.max(1, page - 1));

  const navBtn = "inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-deep disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40";

  return (
    <div className="mushaf min-h-[calc(100dvh-4rem)] bg-[var(--m-outer)]" ref={topRef}>
      {/* toolbar */}
      <div className="sticky top-16 z-30 bg-white/95 shadow-[0_6px_20px_-12px_rgba(0,0,0,0.25)] backdrop-blur lg:top-0 dark:bg-card/95">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3 sm:px-4">
          <Link href={localePath(lang, "/quran/")} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-sm font-bold text-primary ring-1 ring-primary hover:bg-tint">
            <Icon name="menu" className="size-4" />
            <span className="hidden sm:inline">{appT(lang, "quranIndex.tabIndex")}</span>
          </Link>
          <div className="min-w-0 flex-1 text-center leading-tight">
            <div className="truncate text-[16px] font-bold text-section dark:text-primary-light">{surahName(lang, sura)}</div>
            <div className="truncate text-xs font-semibold text-orange">
              {juzLabel} · {t.page} {digits(page)}
            </div>
          </div>
          <button
            type="button"
            onClick={() => writePref(TWO_UP_KEY, twoUp ? "0" : "1")}
            className="hidden h-9 shrink-0 items-center rounded-full px-3.5 text-sm font-bold text-primary ring-1 ring-primary hover:bg-tint min-[1100px]:inline-flex"
          >
            {twoUp ? t.onePage : t.twoPages}
          </button>
          <button type="button" onClick={() => setGotoOpen((v) => !v)} aria-expanded={gotoOpen} className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-navy px-4 text-sm font-bold text-white shadow-sm hover:bg-section">
            <Icon name="search" className="size-4" />
            <span>{t.goTo}</span>
          </button>
        </div>
        {gotoOpen ? <GoTo lang={lang} page={page} onGo={go} onClose={() => setGotoOpen(false)} /> : null}
      </div>

      {/* pages */}
      <div className="mx-auto max-w-6xl px-2 pb-6 pt-4 sm:px-4" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {font !== "ready" && pages[page] ? (
          <p className="mx-auto mb-3 w-fit rounded-full bg-navy/85 px-3.5 py-1 text-center text-xs font-semibold text-white">{font === "failed" ? t.fontFailed : t.loadingFont}</p>
        ) : null}
        {failedPage === page && !pages[page] ? (
          <p className="mx-auto mb-3 w-fit rounded-[15px] bg-card px-4 py-2 text-sm text-navy-2 shadow-[0_5px_25px_rgba(0,0,0,0.16)] dark:text-ink-2">
            {t.loadError}{" "}
            <button type="button" className="font-semibold text-primary underline" onClick={() => {
                setFailedPage(null);
                setRetry((n) => n + 1);
              }}>
              {common[lang].retry}
            </button>
          </p>
        ) : null}
        <div dir="rtl" className="flex items-start justify-center gap-0">
          {spread.map((n) => (
            <div
              key={n}
              className={`${n === page ? "block" : `hidden ${twoUp ? "min-[1100px]:block" : ""}`} w-full max-w-[36rem] shrink-0 ${twoUp ? "min-[1100px]:w-[var(--pw)]" : ""} ${twoUp && spread.length === 2 ? (n === right ? "min-[1100px]:shadow-[inset_-14px_0_18px_-14px_rgba(0,0,0,0.25)]" : "min-[1100px]:shadow-[inset_14px_0_18px_-14px_rgba(0,0,0,0.25)]") : ""}`}
              style={{ ["--pw" as string]: "clamp(380px, calc((100dvh - 15rem) / 1.93 + 52px), min(36rem, calc(50vw - 2rem)))" }}
            >
              <MushafPage page={n} data={pages[n] ?? null} selected={sel && sel.page === n ? `${sel.s}:${sel.a}` : sel && pages[n]?.ayahs[`${sel.s}:${sel.a}`] ? `${sel.s}:${sel.a}` : null} onSelect={select(n)} />
            </div>
          ))}
        </div>

        {/* prev / next: next on the LEFT, as the mushaf turns */}
        <div dir="ltr" className="mx-auto mt-4 flex max-w-xl items-center justify-between gap-3">
          <a
            href={nextHref}
            aria-disabled={page >= PAGE_COUNT}
            onClick={(e) => {
              e.preventDefault();
              step(1);
            }}
            className={navBtn}
          >
            <Icon name="chevron" className="size-4 -scale-x-100" />
            <span className="max-sm:sr-only">{t.nextPage}</span>
          </a>
          <span className="min-w-0 truncate text-center text-xs font-bold text-navy-2 dark:text-ink-2" dir={dirOf(lang)}>
            {surahName(lang, sura)} · {juzLabel} · {digits(page)}
          </span>
          <a
            href={prevHref}
            aria-disabled={page <= 1}
            onClick={(e) => {
              e.preventDefault();
              step(-1);
            }}
            className={navBtn}
          >
            <span className="max-sm:sr-only">{t.prevPage}</span>
            <Icon name="chevron" className="size-4" />
          </a>
        </div>
        <p className="mt-3 text-center text-xs text-navy-2/80 dark:text-ink-2">{t.tapHint}</p>
      </div>

      {sel ? <AyahPanel lang={lang} sel={sel} onClose={() => setSel(null)} onStep={stepAyah} /> : null}
    </div>
  );
}

function GoTo({ lang, page, onGo, onClose }: { lang: Locale; page: number; onGo: (p: number) => void; onClose: () => void }) {
  const t = quran[lang];
  const [p, setP] = useState(String(page));
  const digits = (n: number) => localDigits(lang, n);
  const field = "h-11 w-full rounded-full bg-white px-4 text-sm text-navy-2 outline-none ring-2 ring-edge/70 shadow-[0_3px_10px_rgba(124,180,200,0.35)] focus:ring-primary dark:bg-canvas dark:text-ink";
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="mx-auto max-w-6xl px-3 pb-3 sm:px-4">
      <div className="grid gap-4 rounded-[15px] bg-tint p-4 sm:grid-cols-3 sm:p-5">
        <form
          className="flex flex-col gap-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            const n = Number(p.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d))).replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))));
            if (n >= 1 && n <= PAGE_COUNT) onGo(n);
          }}
        >
          <label className="text-xs font-bold text-navy-2 dark:text-ink" htmlFor="q-goto-page">
            {t.page} ({digits(1)}–{digits(PAGE_COUNT)})
          </label>
          <div className="flex gap-2">
            <input id="q-goto-page" inputMode="numeric" value={p} onChange={(e) => setP(e.target.value)} className={field} autoFocus />
            <button type="submit" className="shrink-0 rounded-lg bg-primary px-5 text-sm font-bold text-white hover:bg-primary-deep">
              {t.go}
            </button>
          </div>
        </form>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-navy-2 dark:text-ink">{t.surah}</span>
          <select className={field} defaultValue="" onChange={(e) => e.target.value && onGo(SURAHS[Number(e.target.value) - 1].page)}>
            <option value="" disabled>
              —
            </option>
            {SURAHS.map((s) => (
              <option key={s.n} value={s.n}>
                {digits(s.n)}. {surahName(lang, s.n)}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-navy-2 dark:text-ink">{t.juz}</span>
          <select className={field} defaultValue="" onChange={(e) => e.target.value && onGo(JUZ_STARTS[Number(e.target.value) - 1].p)}>
            <option value="" disabled>
              —
            </option>
            {JUZ_STARTS.map((j, i) => (
              <option key={i} value={i + 1}>
                {lang === "ar" ? `الجزء ${digits(i + 1)}` : appT(lang, "quranIndex.juz").replace("{0}", digits(i + 1))} — {surahName(lang, j.s)}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
