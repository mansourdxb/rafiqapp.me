"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ChapterReader } from "@/components/hadith/ChapterReader";
import { SideBox } from "@/components/hadith/SideBox";
import { HadithHeader, factPill, hadithCount } from "@/components/hadith/views";
import { appT } from "@/i18n/app";
import { localePath, type Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { hadith } from "@/i18n/messages/hadith";
import { localDigits } from "@/lib/digits";
import { bookName, chapterTitle, getBook, type BookInfo, type ChapterInfo } from "@/lib/hadith/books";
import { chapterHref } from "@/lib/hadith/href";
import { hadithLabels } from "@/lib/hadith/labels";

function find(book: string | null, chapter: string | null) {
  const b = book ? getBook(book) : undefined;
  const i = b ? b.chapters.findIndex((c) => String(c.id) === chapter) : -1;
  return b && i >= 0 ? { b, i, c: b.chapters[i] } : null;
}

function Neighbour({ lang, b, c, label, next }: { lang: Locale; b: BookInfo; c?: ChapterInfo; label: string; next?: boolean }) {
  if (!c) return <span />;
  return (
    <Link
      href={chapterHref(lang, b.key, c.id)}
      className={`flex min-w-0 items-center gap-2 rounded-[15px] bg-card px-4 py-3 shadow-[0_5px_25px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 dark:shadow-none dark:ring-1 dark:ring-line ${next ? "justify-end text-end" : ""}`}
    >
      {!next ? <Icon name="chevron" flip className="size-5 shrink-0 rotate-180 text-primary" /> : null}
      <span className="min-w-0">
        <span className="block text-xs font-bold text-primary">{label}</span>
        <span dir="rtl" lang="ar" className="block truncate font-bold text-section dark:text-primary-light">
          {c.t.ar}
        </span>
      </span>
      {next ? <Icon name="chevron" flip className="size-5 shrink-0 text-primary" /> : null}
    </Link>
  );
}

/** One hadith chapter, chosen in the browser from `?b=<book>&c=<chapter>`. */
export function ChapterView({ lang }: { lang: Locale }) {
  const [sel, setSel] = useState<{ book: string | null; chapter: string | null } | null>(null);
  useEffect(() => {
    const read = () => {
      const q = new URLSearchParams(window.location.search);
      setSel({ book: q.get("b"), chapter: q.get("c") });
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);
  const f = sel ? find(sel.book, sel.chapter) : null;
  useEffect(() => {
    if (!f) return;
    document.title = `${chapterTitle(lang, f.c) || f.c.t.ar} — ${bookName(lang, f.b.key)} | ${common[lang].siteName}`;
  }, [f, lang]);
  if (!sel) return <div className="min-h-[60vh]" />;
  if (!f)
    return (
      <p className="py-24 text-center">
        <Link href={localePath(lang, "/hadith/")} className="font-bold text-primary hover:underline">
          {hadith[lang].allBooks}
        </Link>
      </p>
    );
  const { b, c, i } = f;
  const h = hadith[lang];
  const name = bookName(lang, b.key);
  const local = chapterTitle(lang, c);
  return (
    <>
      <HadithHeader
        lang={lang}
        crumbs={[
          { href: "/hadith/", label: common[lang].nav.hadith },
          { href: `/hadith/${b.key}/`, label: name },
          { label: localDigits(lang, i + 1) },
        ]}
        title={
          <span dir="rtl" lang="ar">
            {c.t.ar}
          </span>
        }
        subtitle={local ? <p className="text-lg">{local}</p> : undefined}
      >
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link href={localePath(lang, `/hadith/${b.key}/`)} className={`${factPill} hover:text-primary`}>
            {name}
          </Link>
          <span className={factPill}>{hadithCount(lang, c.n)}</span>
        </div>
      </HadithHeader>
      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 pt-4 pb-16 lg:grid-cols-[minmax(0,1fr)_300px]">
        <aside className="order-2 lg:sticky lg:top-6">
          <SideBox title={common[lang].search}>
            <Link
              href={`${localePath(lang, "/hadith/")}?book=${b.key}`}
              className="flex h-12 items-center justify-between gap-3 rounded-full bg-white px-5 text-sm text-ink-2 ring-2 ring-edge/70 shadow-[0_3px_10px_rgba(124,180,200,0.35)] hover:ring-primary dark:bg-canvas"
            >
              <span className="truncate">
                {appT(lang, "hadithSearch.searchPlaceholder")} — {name}
              </span>
              <Icon name="search" className="size-5 shrink-0 text-navy-2 dark:text-ink" />
            </Link>
            <Link href={localePath(lang, `/hadith/${b.key}/`)} className="mt-4 flex items-center gap-1 text-sm font-bold text-primary hover:underline">
              {name}
              <Icon name="chevron" flip className="size-4" />
            </Link>
            <Link href={localePath(lang, "/hadith/")} className="mt-2 flex items-center gap-1 text-sm font-bold text-primary hover:underline">
              {h.allBooks}
              <Icon name="chevron" flip className="size-4" />
            </Link>
          </SideBox>
        </aside>
        <div className="order-1 min-w-0">
          <ChapterReader lang={lang} L={hadithLabels(lang)} book={b.key} chapter={c.id} total={c.n} bookName={name} chapterName={local || c.t.ar} hasEn={b.hasEn} />
          <nav className="mt-8 grid grid-cols-2 gap-3">
            <Neighbour lang={lang} b={b} c={b.chapters[i - 1]} label={h.prev} />
            <Neighbour lang={lang} b={b} c={b.chapters[i + 1]} label={h.next} next />
          </nav>
        </div>
      </div>
    </>
  );
}
