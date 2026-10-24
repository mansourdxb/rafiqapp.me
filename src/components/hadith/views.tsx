// Server-rendered parts of the hadith section: page header, book cards, chapter (kitab) list.
import { chapterHref } from "@/lib/hadith/href";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { isRtl, localePath, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { hadith } from "@/i18n/messages/hadith";
import { localDigits } from "@/lib/digits";
import { BOOKS, SIX_BOOKS, bookName, chapterTitle, type BookInfo } from "@/lib/hadith/books";

// Per-book accent, as in the app's hadith library (LibraryHadithScreen BOOK_ACCENT).
const ACCENT: Record<string, string> = {
  bukhari: "#2E7D52",
  muslim: "#1565C0",
  abudawud: "#795548",
  tirmidhi: "#7B1FA2",
  ibnmajah: "#E65100",
  nasai: "#00838F",
  malik: "#AD1457",
  darimi: "#558B2F",
  ahmed: "#283593",
};

/** "7 hadith" with the app's word; Russian needs its plural forms. */
export function hadithCount(lang: Locale, n: number) {
  if (lang === "ru") {
    const m10 = n % 10, m100 = n % 100;
    const w = m10 === 1 && m100 !== 11 ? "хадис" : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? "хадиса" : "хадисов";
    return `${n} ${w}`;
  }
  return `${localDigits(lang, n)} ${appT(lang, "hadithLib.hadithWord")}`;
}

/** Arabic lines follow the page's start edge (right in RTL pages, left in LTR ones). */
export const arAlign = (lang: Locale) => (isRtl(lang) ? "text-start" : "text-left");

export type Crumb = { href?: string; label: string };

export function HadithHeader({ lang, crumbs, title, subtitle, children }: { lang: Locale; crumbs: Crumb[]; title: ReactNode; subtitle?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy to-section text-white">
      <svg aria-hidden className="pointer-events-none absolute -end-16 -top-16 size-72 text-white/[0.06]" viewBox="0 0 100 100" fill="currentColor">
        <path d="M50 0l11 26 28-4-17 23 17 23-28-4-11 26-11-26-28 4 17-23L11 22l28 4z" />
      </svg>
      <div className="relative mx-auto max-w-5xl px-4 pt-6 pb-16 sm:pt-8">
        <nav aria-label="breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-white/70">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 ? <Icon name="chevron" flip className="size-3.5 opacity-60" /> : null}
              {c.href ? (
                <Link href={localePath(lang, c.href)} className="hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white/90">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="text-3xl leading-tight font-extrabold sm:text-4xl">{title}</h1>
        {subtitle ? <div className="mt-3 max-w-2xl text-white/80">{subtitle}</div> : null}
        {children}
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-canvas px-3 py-2">
      <div className="text-base leading-tight font-extrabold text-ink">{value}</div>
      <div className="text-xs text-ink-2">{label}</div>
    </div>
  );
}

function BookCard({ lang, b }: { lang: Locale; b: BookInfo }) {
  const h = hadith[lang];
  const name = bookName(lang, b.key);
  const accent = ACCENT[b.key];
  return (
    <Link
      href={localePath(lang, `/hadith/${b.key}/`)}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card p-5 shadow-[0_2px_12px_rgba(13,36,94,0.06)] ring-1 ring-line/60 transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(13,36,94,0.12)] dark:shadow-none dark:ring-line"
    >
      <span className="absolute inset-x-0 top-0 h-1" style={{ background: accent }} />
      <div className="flex items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl text-white" style={{ background: accent }}>
          <Icon name="hadith" className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg leading-snug font-bold text-ink">{name}</h3>
          {lang !== "ar" ? (
            <p dir="rtl" lang="ar" className={`mt-0.5 text-sm text-ink-2 ${arAlign(lang)}`}>
              {b.titleAr}
            </p>
          ) : null}
        </div>
        <Icon name="chevron" flip className="mt-1 size-5 shrink-0 text-ink-2 transition group-hover:text-primary" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Stat value={localDigits(lang, b.count)} label={h.hadiths} />
        <Stat value={localDigits(lang, b.chapters.length)} label={h.kitabs} />
      </div>
    </Link>
  );
}

export function BooksGrid({ lang }: { lang: Locale }) {
  const groups = [
    { title: appT(lang, "hadithLib.sixBooks"), books: BOOKS.filter((b) => SIX_BOOKS.includes(b.key)) },
    { title: appT(lang, "hadithLib.otherCollections"), books: BOOKS.filter((b) => !SIX_BOOKS.includes(b.key)) },
  ];
  return (
    <div className="space-y-10">
      {groups.map((g) => (
        <section key={g.title}>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-ink">
            <span className="h-5 w-1 rounded-full bg-orange" />
            {g.title}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.books.map((b) => (
              <BookCard key={b.key} lang={lang} b={b} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function ChapterList({ lang, b }: { lang: Locale; b: BookInfo }) {
  return (
    <ol className="divide-y divide-line overflow-hidden rounded-2xl bg-card shadow-[0_2px_12px_rgba(13,36,94,0.06)] ring-1 ring-line/60 dark:shadow-none dark:ring-line">
      {b.chapters.map((c, i) => {
        const local = chapterTitle(lang, c);
        return (
          <li key={c.id}>
            <Link href={chapterHref(lang, b.key, c.id)} className="group flex items-center gap-3 px-4 py-3.5 transition hover:bg-tint sm:px-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-orange/10 text-sm font-bold text-orange">{localDigits(lang, i + 1)}</span>
              <div className="min-w-0 flex-1">
                <p dir="rtl" lang="ar" className={`leading-relaxed font-bold text-ink ${arAlign(lang)}`}>
                  {c.t.ar}
                </p>
                {local ? <p className="text-sm text-ink-2">{local}</p> : null}
              </div>
              <span className="shrink-0 rounded-full bg-tint px-2.5 py-1 text-xs font-semibold text-primary">
                {hadithCount(lang, c.n)}
              </span>
              <Icon name="chevron" flip className="size-4 shrink-0 text-ink-2 group-hover:text-primary" />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
