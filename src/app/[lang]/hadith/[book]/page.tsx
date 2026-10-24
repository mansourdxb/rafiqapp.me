import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { SideBox } from "@/components/hadith/SideBox";
import { ChapterList, HadithHeader, arAlign, factPill, hadithCount } from "@/components/hadith/views";
import { isLocale, localePath, locales } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { common } from "@/i18n/messages/common";
import { fill, hadith } from "@/i18n/messages/hadith";
import { alternates } from "@/i18n/metadata";
import { localDigits } from "@/lib/digits";
import { BOOKS, bookName, getBook } from "@/lib/hadith/books";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => BOOKS.map((b) => ({ lang, book: b.key })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/hadith/[book]">): Promise<Metadata> {
  const { lang, book } = await params;
  const b = getBook(book);
  if (!isLocale(lang) || !b) return {};
  const name = bookName(lang, b.key);
  return {
    title: name,
    description: fill(hadith[lang].bookMeta, { book: name, n: localDigits(lang, b.count), k: localDigits(lang, b.chapters.length) }),
    alternates: alternates(lang, `/hadith/${b.key}/`),
  };
}

export default async function BookPage({ params }: PageProps<"/[lang]/hadith/[book]">) {
  const { lang, book } = await params;
  const b = getBook(book);
  if (!isLocale(lang) || !b) notFound();
  const h = hadith[lang];
  const name = bookName(lang, b.key);
  return (
    <>
      <HadithHeader
        lang={lang}
        crumbs={[{ href: "/hadith/", label: common[lang].nav.hadith }, { label: name }]}
        title={name}
        subtitle={
          lang !== "ar" ? (
            <p dir="rtl" lang="ar" className={`text-lg ${arAlign(lang)}`}>
              {b.titleAr}
            </p>
          ) : undefined
        }
      >
        <div className="mt-5 flex flex-wrap gap-2.5">
          <span className={factPill}>{hadithCount(lang, b.count)}</span>
          <span className={factPill}>
            {localDigits(lang, b.chapters.length)} {h.kitabs}
          </span>
          {lang !== "ar" && !b.hasEn ? <span className="inline-flex items-center rounded-full bg-orange px-4 py-1.5 text-sm font-bold text-white">{h.noTranslation}</span> : null}
        </div>
      </HadithHeader>
      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 pt-4 pb-16 lg:grid-cols-[minmax(0,1fr)_320px]">
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
            <Link href={localePath(lang, "/hadith/")} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
              {h.allBooks}
              <Icon name="chevron" flip className="size-4" />
            </Link>
          </SideBox>
        </aside>
        <div className="order-1 min-w-0">
          <ChapterList lang={lang} b={b} />
        </div>
      </div>
    </>
  );
}
