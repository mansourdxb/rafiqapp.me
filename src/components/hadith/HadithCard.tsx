"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Locale } from "@/i18n/config";
import { dir, SITE_URL, localePath } from "@/i18n/config";
import { localDigits } from "@/lib/digits";
import { normalizeArabic } from "@/lib/hadith/matn";
import { toggleFavorite, type HadithRow } from "@/lib/hadith/client";
import type { HadithLabels } from "@/lib/hadith/labels";
import { HadithArabic, Highlighted } from "./HadithText";

type Props = {
  lang: Locale;
  L: HadithLabels;
  book: string;
  chapter: number;
  row: HadithRow;
  bookName: string;
  chapterName: string;
  showTranslation: boolean;
  isFav: boolean;
  scale?: number;
  terms?: string[];
  latin?: boolean;
  focused?: boolean;
};

export function HadithCard({ lang, L, book, chapter, row, bookName, chapterName, showTranslation, isFav, scale = 1, terms, latin, focused }: Props) {
  const [n, arabic, narrator, text] = row;
  const [toast, setToast] = useState("");
  const flash = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 1600);
  };

  const url = `${SITE_URL}${localePath(lang, `/hadith/${book}/${chapter}/`)}#h${n}`;
  const shareText = () => {
    let body = normalizeArabic(arabic);
    if (text) body += `\n\n${narrator ? `${narrator}\n` : ""}${text}`;
    return `${body}\n\n${L.source}: ${bookName}\n${L.book}: ${chapterName}\n${L.hadithNumber}: ${n}\n\n${L.shareVia}\n${url}`;
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText());
      flash(L.copied);
    } catch {}
  };
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: `${bookName} — ${L.hadithNumber} ${n}`, text: shareText() });
      } catch {}
    } else copy();
  };
  const fav = () => {
    const added = toggleFavorite({ book, chapter, n, text: normalizeArabic(arabic) });
    flash(added ? L.saved : L.removed);
  };

  const btn = "grid size-9 place-items-center rounded-full bg-canvas text-ink-2 transition hover:bg-tint hover:text-primary";
  return (
    <article
      id={`h${n}`}
      className={`scroll-mt-24 rounded-2xl bg-card p-4 shadow-[0_2px_12px_rgba(13,36,94,0.06)] ring-1 sm:p-6 dark:shadow-none ${
        focused ? "ring-2 ring-primary" : "ring-line/60 dark:ring-line"
      }`}
    >
      <header className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-tint px-3 py-1 text-sm font-bold text-primary">
          {L.hadithN.replace("{n}", localDigits(lang, n))}
        </span>
        <span aria-live="polite" className="text-xs font-semibold text-[#2D7A4E] dark:text-[#3DA06A]">
          {toast}
        </span>
        <div className="ms-auto flex items-center gap-1.5">
          <button onClick={share} className={btn} aria-label={L.share} title={L.share}>
            <Icon name="share" className="size-4.5" />
          </button>
          <button onClick={copy} className={btn} aria-label={L.copy} title={L.copy}>
            <Icon name="copy" className="size-4.5" />
          </button>
          <button
            onClick={fav}
            className={`${btn} ${isFav ? "!bg-primary/10 !text-primary" : ""}`}
            aria-label={isFav ? L.removeFavorite : L.addFavorite}
            aria-pressed={isFav}
            title={isFav ? L.removeFavorite : L.addFavorite}
          >
            <svg viewBox="0 0 24 24" className="size-4.5" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" aria-hidden>
              <path d="M6 3h12v18l-6-4-6 4z" />
            </svg>
          </button>
        </div>
      </header>

      <HadithArabic raw={arabic} terms={latin ? undefined : terms} scale={scale} />

      {showTranslation && text ? (
        <div dir="ltr" lang="en" className="mt-4 border-t border-line pt-3 text-start" style={{ fontSize: `${0.95 * scale}rem` }}>
          {narrator ? <p className="mb-1 font-bold text-[#2D7A4E] dark:text-[#3DA06A]">{narrator}</p> : null}
          <p className="leading-7 text-ink-2">
            <Highlighted text={text} terms={latin ? terms : undefined} />
          </p>
        </div>
      ) : null}

      <dl dir={dir(lang)} className="mt-4 space-y-1 border-t border-line pt-3 text-[0.8rem]">
        {[
          [L.source, bookName],
          [L.book, chapterName],
          [L.hadithNumber, localDigits(lang, n)],
        ].map(([k, v]) => (
          <div key={k} className="flex flex-wrap gap-x-1.5">
            <dt className="font-bold text-[#2D7A4E] dark:text-[#3DA06A]">{k}:</dt>
            <dd className="text-[#A87F12] dark:text-gold">{v}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export function HadithSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-card p-5 ring-1 ring-line/60 dark:ring-line">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-6 w-24 rounded-full bg-tint" />
            <div className="ms-auto flex gap-1.5">
              <div className="size-9 rounded-full bg-canvas" />
              <div className="size-9 rounded-full bg-canvas" />
              <div className="size-9 rounded-full bg-canvas" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 rounded bg-canvas" />
            <div className="h-4 w-11/12 rounded bg-canvas" />
            <div className="h-4 w-9/12 rounded bg-canvas" />
          </div>
          <div className="mt-5 h-3 w-1/3 rounded bg-canvas" />
        </div>
      ))}
    </div>
  );
}

export function LoadError({ L, onRetry }: { L: HadithLabels; onRetry: () => void }) {
  return (
    <div className="rounded-2xl bg-card p-8 text-center ring-1 ring-line/60 dark:ring-line">
      <p className="text-ink-2">{L.error}</p>
      <button onClick={onRetry} className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-primary-deep">
        {L.retry}
      </button>
    </div>
  );
}
