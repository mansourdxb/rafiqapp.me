// Server-rendered parts of the hadith section: page header, book cards, chapter (kitab) list.
import { chapterHref } from "@/lib/hadith/href";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
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

/** Page header in the site style (PageHeader): breadcrumb after "Home" + blue title, or a photo banner. */
export function HadithHeader({ lang, crumbs, title, subtitle, photo, children }: { lang: Locale; crumbs: Crumb[]; title: ReactNode; subtitle?: ReactNode; photo?: string; children?: ReactNode }) {
  return (
    <PageHeader lang={lang} crumbs={crumbs.map((c) => ({ label: c.label, href: c.href ? localePath(lang, c.href) : undefined }))} title={title} subtitle={subtitle} photo={photo}>
      {children}
    </PageHeader>
  );
}

/** Outlined pill (reference style), used for header facts. */
export const factPill = "inline-flex items-center rounded-full bg-white px-4 py-1.5 text-sm font-bold text-navy-2 ring-2 ring-edge/70 shadow-[0_3px_10px_rgba(124,180,200,0.35)] dark:bg-card dark:text-ink";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-tint px-3 py-2">
      <div className="text-base leading-tight font-bold text-section dark:text-primary-light">{value}</div>
      <div className="text-xs font-semibold text-navy-2 dark:text-ink-2">{label}</div>
    </div>
  );
}

const CARD = "rounded-[15px] bg-card shadow-[0_5px_25px_rgba(0,0,0,0.16)] dark:shadow-none dark:ring-1 dark:ring-line";

function BookCard({ lang, b }: { lang: Locale; b: BookInfo }) {
  const h = hadith[lang];
  const name = bookName(lang, b.key);
  const accent = ACCENT[b.key];
  return (
    <Link href={localePath(lang, `/hadith/${b.key}/`)} className={`group relative flex flex-col p-5 transition hover:-translate-y-1 ${CARD}`}>
      <div className="flex items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-full text-white shadow-sm" style={{ background: accent }}>
          <Icon name="hadith" className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg leading-snug font-bold text-section group-hover:text-primary dark:text-primary-light">{name}</h3>
          {lang !== "ar" ? (
            <p dir="rtl" lang="ar" className={`mt-0.5 text-sm text-navy-2 dark:text-ink-2 ${arAlign(lang)}`}>
              {b.titleAr}
            </p>
          ) : null}
        </div>
        <Icon name="chevron" flip className="mt-1 size-5 shrink-0 text-primary" />
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
          <h2 className="mb-6 rounded-md bg-tint px-4 py-3 text-lg font-bold text-navy-2 dark:text-ink">{g.title}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
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
    <ol className={`divide-y divide-line overflow-hidden ${CARD}`}>
      {b.chapters.map((c, i) => {
        const local = chapterTitle(lang, c);
        return (
          <li key={c.id}>
            <Link href={chapterHref(lang, b.key, c.id)} className="group flex items-center gap-3 px-4 py-3.5 transition hover:bg-tint sm:px-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-white">{localDigits(lang, i + 1)}</span>
              <div className="min-w-0 flex-1">
                <p dir="rtl" lang="ar" className={`leading-relaxed font-bold text-section group-hover:text-primary dark:text-primary-light ${arAlign(lang)}`}>
                  {c.t.ar}
                </p>
                {local ? <p className="text-sm text-navy-2 dark:text-ink-2">{local}</p> : null}
              </div>
              <span className="shrink-0 rounded-full px-2.5 py-1 text-xs font-bold text-primary ring-1 ring-primary">{hadithCount(lang, c.n)}</span>
              <Icon name="chevron" flip className="size-4 shrink-0 text-primary" />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
