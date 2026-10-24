import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { ChapterReader } from "@/components/hadith/ChapterReader";
import { HadithHeader, hadithCount } from "@/components/hadith/views";
import { isLocale, localePath, locales, type Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { fill, hadith } from "@/i18n/messages/hadith";
import { alternates } from "@/i18n/metadata";
import { localDigits } from "@/lib/digits";
import { BOOKS, bookName, chapterTitle, getBook, type BookInfo, type ChapterInfo } from "@/lib/hadith/books";
import { hadithLabels } from "@/lib/hadith/labels";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => BOOKS.flatMap((b) => b.chapters.map((c) => ({ lang, book: b.key, chapter: String(c.id) }))));
}

function find(book: string, chapter: string) {
  const b = getBook(book);
  const i = b ? b.chapters.findIndex((c) => String(c.id) === chapter) : -1;
  return b && i >= 0 ? { b, i, c: b.chapters[i] } : null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/hadith/[book]/[chapter]">): Promise<Metadata> {
  const { lang, book, chapter } = await params;
  const f = find(book, chapter);
  if (!isLocale(lang) || !f) return {};
  const name = bookName(lang, f.b.key);
  const title = chapterTitle(lang, f.c) || f.c.t.ar;
  return {
    title: `${title} — ${name}`,
    description: fill(hadith[lang].chapterMeta, { chapter: title, book: name, n: localDigits(lang, f.c.n) }),
    alternates: alternates(lang, `/hadith/${f.b.key}/${f.c.id}/`),
  };
}

function Neighbour({ lang, b, c, label, next }: { lang: Locale; b: BookInfo; c?: ChapterInfo; label: string; next?: boolean }) {
  if (!c) return <span />;
  return (
    <Link
      href={localePath(lang, `/hadith/${b.key}/${c.id}/`)}
      className={`flex min-w-0 items-center gap-2 rounded-2xl bg-card px-4 py-3 ring-1 ring-line/60 transition hover:bg-tint dark:ring-line ${next ? "justify-end text-end" : ""}`}
    >
      {!next ? <Icon name="chevron" flip className="size-5 shrink-0 rotate-180 text-primary" /> : null}
      <span className="min-w-0">
        <span className="block text-xs text-ink-2">{label}</span>
        <span dir="rtl" lang="ar" className="block truncate font-bold text-ink">
          {c.t.ar}
        </span>
      </span>
      {next ? <Icon name="chevron" flip className="size-5 shrink-0 text-primary" /> : null}
    </Link>
  );
}

export default async function ChapterPage({ params }: PageProps<"/[lang]/hadith/[book]/[chapter]">) {
  const { lang, book, chapter } = await params;
  const f = find(book, chapter);
  if (!isLocale(lang) || !f) notFound();
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
        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-white/12 px-3 py-1.5 font-semibold">{name}</span>
          <span className="rounded-full bg-white/12 px-3 py-1.5 font-semibold">{hadithCount(lang, c.n)}</span>
        </div>
      </HadithHeader>
      <div className="relative mx-auto -mt-10 max-w-3xl px-4 pb-16">
        <ChapterReader lang={lang} L={hadithLabels(lang)} book={b.key} chapter={c.id} total={c.n} bookName={name} chapterName={local || c.t.ar} hasEn={b.hasEn} />
        <nav className="mt-8 grid grid-cols-2 gap-3">
          <Neighbour lang={lang} b={b} c={b.chapters[i - 1]} label={h.prev} />
          <Neighbour lang={lang} b={b} c={b.chapters[i + 1]} label={h.next} next />
        </nav>
        <p className="mt-6 text-center">
          <Link href={localePath(lang, "/hadith/")} className="text-sm font-bold text-primary hover:underline">
            {h.allBooks}
          </Link>
        </p>
      </div>
    </>
  );
}
