import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { ChapterList, HadithHeader, arAlign, hadithCount } from "@/components/hadith/views";
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
        crumbs={[
          { href: "/", label: common[lang].nav.home },
          { href: "/hadith/", label: common[lang].nav.hadith },
          { label: name },
        ]}
        title={name}
        subtitle={
          lang !== "ar" ? (
            <p dir="rtl" lang="ar" className={`text-lg ${arAlign(lang)}`}>
              {b.titleAr}
            </p>
          ) : undefined
        }
      >
        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-white/12 px-3 py-1.5 font-semibold">{hadithCount(lang, b.count)}</span>
          <span className="rounded-full bg-white/12 px-3 py-1.5 font-semibold">
            {localDigits(lang, b.chapters.length)} {h.kitabs}
          </span>
          {lang !== "ar" && !b.hasEn ? <span className="rounded-full bg-orange/90 px-3 py-1.5 font-semibold">{h.noTranslation}</span> : null}
        </div>
      </HadithHeader>
      <div className="relative mx-auto -mt-10 max-w-5xl px-4 pb-16">
        <Link
          href={`${localePath(lang, "/hadith/")}?book=${b.key}`}
          className="mb-4 flex h-12 items-center gap-3 rounded-2xl bg-card px-4 text-ink-2 shadow-[0_8px_30px_rgba(13,36,94,0.10)] ring-1 ring-line/60 hover:text-ink dark:shadow-none dark:ring-line"
        >
          <Icon name="search" className="size-5" />
          <span className="truncate">
            {appT(lang, "hadithSearch.searchPlaceholder")} — {name}
          </span>
        </Link>
        <ChapterList lang={lang} b={b} />
      </div>
    </>
  );
}
