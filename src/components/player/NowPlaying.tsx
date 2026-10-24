"use client";
// Full player sheet (the app's QuranNowPlayingScreen): reciter photo, surah and "x of y", the ayah being
// recited (with its translation outside Arabic), time in the ayah, progress through the surah (seek by
// ayah), repeat off / surah / ayah, speed, reciter switch, and a link to the ayah's mushaf page.
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { isRtl, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { player } from "@/i18n/messages/player";
import { quran } from "@/i18n/messages/quran";
import { localDigits } from "@/lib/digits";
import { arabicIndic, pageOfAyah, SURAHS } from "@/lib/quran/data";
import { fetchPage, fetchTranslation } from "@/lib/quran/client";
import { quranPageHref } from "@/lib/quran/href";
import { CATEGORIES, LISTED_RECITERS, reciterName, reciterOf, reciterShortName } from "@/lib/player/reciters";
import { usePlayer, usePlayerProgress } from "@/lib/player/usePlayer";
import { clock, surahTitle, xOfY } from "./labels";
import { PIcon, Spinner } from "./PlayerIcons";
import { ReciterAvatar } from "./ReciterAvatar";

type AyahText = { key: string; ayah: string; tr: string };

export function NowPlaying({ lang }: { lang: Locale }) {
  const t = player[lang];
  const p = usePlayer();
  const { position, duration } = usePlayerProgress();
  const count = SURAHS[p.surah - 1]?.ayahs ?? 1;
  const key = `${p.surah}:${p.ayah}`;
  const page = pageOfAyah(p.surah, p.ayah);
  const [text, setText] = useState<AyahText | null>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && p.setExpanded(false);
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // the ayah being recited (+ its translation outside Arabic)
  useEffect(() => {
    let live = true;
    fetchPage(page).then(
      (d) => {
        const ayah = d.ayahs[key] ?? "";
        if (live) setText({ key, ayah, tr: "" });
        if (lang !== "ar")
          fetchTranslation(lang, page, key).then(
            (tr) => live && setText({ key, ayah, tr }),
            () => {},
          );
      },
      () => {},
    );
    return () => {
      live = false;
    };
  }, [key, page, lang]);
  const shown = text?.key === key ? text : null;

  const r = reciterOf(p.reciter);
  const ayahValue = drag ?? p.ayah;
  const commit = () => {
    if (drag != null && drag !== p.ayah) p.goToAyah(drag);
    setDrag(null);
  };
  const repeatLabel = p.repeat === "surah" ? t.repeatSurah : p.repeat === "ayah" ? t.repeatAyah : t.repeatOff;
  const small = "relative grid size-11 shrink-0 place-items-center rounded-full transition";

  return (
    <div className="fixed inset-0 z-[60] flex items-stretch justify-center md:items-center" role="dialog" aria-modal="true" aria-label={t.nowPlaying}>
      <button type="button" aria-label={t.collapse} tabIndex={-1} className="absolute inset-0 hidden cursor-default bg-black/45 backdrop-blur-[2px] md:block" onClick={() => p.setExpanded(false)} />
      <div className="relative flex h-full w-full flex-col overflow-y-auto bg-white md:h-auto md:max-h-[94dvh] md:max-w-xl md:rounded-[15px] md:shadow-[0_5px_25px_rgba(0,0,0,0.25)] dark:bg-card">
        {/* top: navy, as the site's bar */}
        <div className="bg-gradient-to-b from-navy to-section px-4 pb-6 text-white" style={{ paddingTop: "max(12px, env(safe-area-inset-top, 0px))" }}>
          <div dir="ltr" className="flex items-center gap-2">
            <button type="button" onClick={() => p.setExpanded(false)} aria-label={t.collapse} className="grid size-10 place-items-center rounded-full hover:bg-white/10">
              <PIcon name="down" className="size-6" />
            </button>
            <div className="min-w-0 flex-1 text-center leading-tight" dir={isRtl(lang) ? "rtl" : "ltr"}>
              <div className="text-xs font-semibold uppercase tracking-wide text-white/60">{t.nowPlaying}</div>
              <div className="truncate text-lg font-bold">{surahTitle(lang, p.surah)}</div>
              <div className="text-xs text-orange">{xOfY(lang, p.ayah, count)}</div>
            </div>
            <button ref={closeRef} type="button" onClick={p.close} aria-label={t.close} className="grid size-10 place-items-center rounded-full bg-white/15 hover:bg-white/25">
              <PIcon name="close" className="size-5" />
            </button>
          </div>

          <div className="mt-5 flex justify-center">
            <ReciterAvatar reciter={p.reciter} size={168} className="rounded-[22px] shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-4 ring-white/15" />
          </div>

          <div className="mx-auto mt-5 max-h-[34dvh] min-h-24 max-w-lg overflow-y-auto text-center md:max-h-56">
            {shown ? (
              <>
                <p dir="rtl" lang="ar" className="quran text-[24px] leading-[2.05]">
                  {shown.ayah} <span className="text-orange">{arabicIndic(p.ayah)}</span>
                </p>
                {shown.tr ? (
                  <p dir={isRtl(lang) ? "rtl" : "ltr"} className="mt-2 text-[15px] leading-7 text-white/85">
                    {shown.tr}
                  </p>
                ) : null}
              </>
            ) : (
              <div className="space-y-2 pt-3" aria-busy="true">
                <div className="mx-auto h-3 w-5/6 animate-pulse rounded bg-white/15" />
                <div className="mx-auto h-3 w-2/3 animate-pulse rounded bg-white/15" />
              </div>
            )}
          </div>
          <div className="mt-3 text-center">
            <Link href={quranPageHref(lang, page)} onClick={() => p.setExpanded(false)} className="text-xs font-bold text-primary-light hover:underline">
              {quran[lang].page} {localDigits(lang, page)}
            </Link>
          </div>
        </div>

        {/* bottom: white card with the controls */}
        <div className="flex flex-1 flex-col gap-5 px-5 pb-6 pt-5" style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom, 0px))" }}>
          {/* reciter */}
          <label className="flex items-center gap-3 rounded-[15px] bg-card p-3 shadow-[0_3px_12px_rgba(0,0,0,0.1)] dark:shadow-none dark:ring-1 dark:ring-line">
            <ReciterAvatar reciter={p.reciter} size={44} className="rounded-full" />
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-orange">{appT(lang, "carplay.yourReciter")}</span>
              <span className="block truncate font-bold text-section dark:text-primary-light">{reciterName(lang, p.reciter)}</span>
            </span>
            <span className="relative inline-flex h-9 shrink-0 items-center rounded-full px-3.5 text-sm font-bold text-primary ring-1 ring-primary hover:bg-tint">
              {t.changeReciter}
              <select
                value={r ? (LISTED_RECITERS.some((x) => x.key === r.key) ? r.key : "") : ""}
                onChange={(e) => p.setReciter(e.target.value)}
                aria-label={t.changeReciter}
                className="absolute inset-0 cursor-pointer opacity-0"
              >
                {CATEGORIES.map((c) => (
                  <optgroup key={c.cat} label={appT(lang, c.key)}>
                    {LISTED_RECITERS.filter((x) => x.cat === c.cat).map((x) => (
                      <option key={x.key} value={x.key}>
                        {reciterShortName(lang, x.key)}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </span>
          </label>

          {/* time in the ayah */}
          <div dir="ltr">
            <input
              type="range"
              min={0}
              max={Math.max(1, duration)}
              step={0.1}
              value={Math.min(position, duration || 0)}
              onChange={(e) => p.seek(Number(e.target.value))}
              aria-label={appT(lang, "qaudio.ayah")}
              className="h-1.5 w-full cursor-pointer accent-primary"
            />
            <div className="mt-1 flex justify-between text-xs font-semibold tabular-nums text-ink-2">
              <span>{clock(position)}</span>
              <span>-{clock(Math.max(0, duration - position))}</span>
            </div>
          </div>

          {/* transport */}
          <div dir="ltr" className="flex items-center justify-between gap-1">
            <button
              type="button"
              onClick={p.cycleRepeat}
              aria-label={`${t.repeat}: ${repeatLabel}`}
              title={repeatLabel}
              className={`${small} ${p.repeat !== "off" ? "bg-tint text-primary" : "text-ink-2 hover:text-primary"}`}
            >
              <PIcon name="repeat" className="size-[22px]" />
              {p.repeat !== "off" ? (
                <span className="absolute -end-0.5 -top-0.5 grid size-[18px] place-items-center rounded-full bg-orange text-[10px] font-bold text-white">{p.repeat === "ayah" ? "1" : "∞"}</span>
              ) : null}
            </button>
            <button type="button" onClick={p.prev} aria-label={t.prevAyah} className="grid size-12 place-items-center rounded-full text-navy-2 hover:bg-tint dark:text-ink">
              <PIcon name="prev" className="size-7" />
            </button>
            <button
              type="button"
              onClick={() => p.toggle()}
              aria-label={p.playing ? t.pause : t.play}
              className="grid size-[72px] place-items-center rounded-full bg-primary text-white shadow-[0_8px_22px_rgba(0,176,233,0.45)] transition hover:bg-primary-deep"
            >
              {p.status === "loading" ? <Spinner className="size-8" /> : <PIcon name={p.playing ? "pause" : "play"} className="size-8" />}
            </button>
            <button type="button" onClick={p.next} aria-label={t.nextAyah} className="grid size-12 place-items-center rounded-full text-navy-2 hover:bg-tint dark:text-ink">
              <PIcon name="next" className="size-7" />
            </button>
            <button
              type="button"
              onClick={p.cycleRate}
              aria-label={`${t.speed}: ${p.rate}x`}
              className={`${small} text-sm font-bold ${p.rate !== 1 ? "bg-tint text-primary" : "text-ink-2 hover:text-primary"}`}
            >
              {p.rate}x
            </button>
          </div>
          <p className="-mt-2 text-center text-xs font-semibold text-ink-2" aria-live="polite">
            {p.status === "error" ? <span className="text-orange">{t.loadError}</span> : p.status === "ended" ? t.ended : repeatLabel}
          </p>

          {/* progress through the surah: seek by ayah */}
          <div className="rounded-[15px] bg-tint p-4">
            <div className="mb-2 flex items-center justify-between text-sm font-bold text-navy-2 dark:text-ink">
              <span>{t.goToAyah}</span>
              <span className="text-primary">{xOfY(lang, ayahValue, count)}</span>
            </div>
            <div dir={isRtl(lang) ? "rtl" : "ltr"}>
              <input
                type="range"
                min={1}
                max={count}
                step={1}
                value={ayahValue}
                disabled={count <= 1}
                onChange={(e) => setDrag(Number(e.target.value))}
                onPointerUp={commit}
                onKeyUp={commit}
                onBlur={commit}
                aria-label={t.goToAyah}
                className="h-1.5 w-full cursor-pointer accent-orange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
