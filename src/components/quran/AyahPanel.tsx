"use client";
// Ayah sheet: the tapped verse, its translation in the site language (Arabic: the app's bundled
// tafsir books), recitation (everyayah, as the app) and copy / share.
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { isRtl, localePath, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { common } from "@/i18n/messages/common";
import { fill, quran } from "@/i18n/messages/quran";
import { localDigits } from "@/lib/digits";
import { arabicIndic, surahName, SURAHS } from "@/lib/quran/data";
import { ayahAudioUrl, fetchTafsir, fetchTranslation, RECITER_KEY, RECITERS, TAFSIR_KEY, TRANSLATION, usePref, writePref } from "@/lib/quran/client";

export type AyahSel = { s: number; a: number; page: number; text: string };

const TAFSIR_KEYS = ["tafsir.bookMukhtasar", "tafsir.bookJalalayn", "tafsir.bookSaadi"] as const;

type Body = { state: "loading" } | { state: "error" } | { state: "ok"; text: string };
type Result = { req: string; body: Body };

export function AyahPanel({ lang, sel, onClose, onStep }: { lang: Locale; sel: AyahSel; onClose: () => void; onStep: (dir: 1 | -1) => void }) {
  const t = quran[lang];
  const arabic = lang === "ar";
  const key = `${sel.s}:${sel.a}`;
  const bookPref = Number(usePref(TAFSIR_KEY) ?? 0);
  const book = bookPref >= 0 && bookPref <= 2 ? bookPref : 0;
  const reciterPref = usePref(RECITER_KEY);
  const reciter = RECITERS.find((r) => r.folder === reciterPref)?.folder ?? RECITERS[0].folder;
  const [reload, setReload] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // translation / tafsir for the verse
  const req = `${sel.page}|${key}|${book}|${reload}`;
  useEffect(() => {
    let live = true;
    const p = arabic ? fetchTafsir(sel.page).then((m) => m[key]?.[book] ?? "") : fetchTranslation(lang as Exclude<Locale, "ar">, sel.page, key);
    p.then(
      (text) => live && setResult({ req, body: { state: "ok", text } }),
      () => live && setResult({ req, body: { state: "error" } }),
    );
    return () => {
      live = false;
    };
  }, [arabic, lang, sel.page, key, book, req]);
  const body: Body = result?.req === req ? result.body : { state: "loading" };

  // stop the recitation when the verse changes or the sheet closes
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
      setPlaying(false);
    };
  }, [key, reciter]);

  const togglePlay = () => {
    if (playing) {
      audioRef.current?.pause();
      return;
    }
    if (!audioRef.current) {
      const au = new Audio(ayahAudioUrl(reciter, sel.s, sel.a));
      au.onplay = () => setPlaying(true);
      au.onpause = () => setPlaying(false);
      au.onended = () => setPlaying(false);
      au.onerror = () => setPlaying(false);
      audioRef.current = au;
    }
    void audioRef.current.play().catch(() => setPlaying(false));
  };

  const ref = arabic ? `[${SURAHS[sel.s - 1]?.ar} : ${arabicIndic(sel.a)}]` : `[${surahName(lang, sel.s)} ${sel.s}:${sel.a}]`;
  const shareText = () => {
    const extra = body.state === "ok" && body.text && !arabic ? `\n\n${body.text}` : "";
    return `﴿${sel.text} ${arabicIndic(sel.a)}﴾\n${ref}${extra}`;
  };
  const url = () => `${window.location.origin}${localePath(lang, `/quran/${sel.page}/`)}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: ref, text: shareText(), url: url() });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText()}\n${url()}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } catch {}
    }
  };

  const title = arabic ? `سورة ${SURAHS[sel.s - 1]?.ar} - الآية ${arabicIndic(sel.a)}` : appT(lang, "quranIndex.surahAyah").replace("{0}", surahName(lang, sel.s)).replace("{1}", localDigits(lang, sel.a));
  const trDir = isRtl(lang) ? "rtl" : "ltr";
  const ayahCount = SURAHS[sel.s - 1]?.ayahs ?? 0;
  const canPrev = sel.s > 1 || sel.a > 1;
  const canNext = sel.s < 114 || sel.a < ayahCount;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" aria-label={t.close} className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative flex max-h-[88dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-card shadow-2xl md:mx-4 md:rounded-3xl">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <button type="button" onClick={() => onStep(-1)} disabled={!canPrev} aria-label={t.prevPage} className="grid size-9 place-items-center rounded-full text-ink-2 hover:bg-tint disabled:opacity-30">
            <span className="rtl:-scale-x-100">
              <Icon name="chevron" className="size-5 -scale-x-100" />
            </span>
          </button>
          <h2 className="min-w-0 flex-1 truncate text-center text-base font-bold text-ink">{title}</h2>
          <button type="button" onClick={() => onStep(1)} disabled={!canNext} aria-label={t.nextPage} className="grid size-9 place-items-center rounded-full text-ink-2 hover:bg-tint disabled:opacity-30">
            <Icon name="chevron" className="size-5" flip />
          </button>
          <button ref={closeRef} type="button" onClick={onClose} aria-label={t.close} className="grid size-9 place-items-center rounded-full bg-tint text-ink hover:bg-line">
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 pb-5 pt-4">
          <p dir="rtl" lang="ar" className="text-center text-[26px] leading-[2.1] text-ink" style={{ fontFamily: `"KFGQPCHafs", var(--font-quran)` }}>
            {sel.text}{" "}
            <span className="text-[#98765A] dark:text-[#B8A080]">{arabicIndic(sel.a)}</span>
          </p>

          {/* actions */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button type="button" onClick={togglePlay} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-deep">
              <Icon name={playing ? "pause" : "play"} className="size-4" />
              {playing ? t.pause : t.play}
            </button>
            <label className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-sm text-ink-2">
              <span className="sr-only">{t.reciter}</span>
              <select
                value={reciter}
                onChange={(e) => writePref(RECITER_KEY, e.target.value)}
                className="max-w-[12rem] bg-transparent text-ink outline-none"
              >
                {RECITERS.map((r) => (
                  <option key={r.folder} value={r.folder}>
                    {arabic || lang === "ur" || lang === "fa" ? r.ar : r.lat}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2 text-sm font-medium text-ink hover:bg-tint">
              <Icon name="copy" className="size-4" />
              {copied ? t.copied : t.copy}
            </button>
            <button type="button" onClick={share} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-2 text-sm font-medium text-ink hover:bg-tint">
              <Icon name="share" className="size-4" />
              {t.share}
            </button>
          </div>

          <div className="mt-5 rounded-2xl bg-tint p-4">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-section dark:text-primary-light">{arabic ? t.tafsir : appT(lang, "quran.translation")}</span>
              {arabic ? (
                <div className="ms-auto flex flex-wrap gap-1.5">
                  {TAFSIR_KEYS.map((k, i) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => writePref(TAFSIR_KEY, String(i))}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${book === i ? "bg-primary text-white" : "bg-card text-ink-2 hover:text-ink"}`}
                    >
                      {appT(lang, k)}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            {body.state === "loading" ? (
              <div className="space-y-2" aria-busy="true">
                <div className="h-3 w-full animate-pulse rounded bg-line" />
                <div className="h-3 w-11/12 animate-pulse rounded bg-line" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-line" />
              </div>
            ) : body.state === "error" ? (
              <div className="text-sm text-ink-2">
                {t.loadError}{" "}
                <button type="button" onClick={() => setReload((n) => n + 1)} className="font-semibold text-primary underline">
                  {common[lang].retry}
                </button>
              </div>
            ) : (
              <p dir={trDir} className="whitespace-pre-line text-start text-[16px] leading-8 text-ink">
                {body.text}
              </p>
            )}
            {!arabic ? <p className="mt-3 text-xs text-ink-2">{fill(t.translationBy, { name: TRANSLATION[lang as Exclude<Locale, "ar">].name })}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
