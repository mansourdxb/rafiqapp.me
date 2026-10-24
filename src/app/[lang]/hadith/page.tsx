import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HadithHub } from "@/components/hadith/HadithHub";
import { BooksGrid, HadithHeader } from "@/components/hadith/views";
import { isLocale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { common } from "@/i18n/messages/common";
import { hadith } from "@/i18n/messages/hadith";
import { alternates } from "@/i18n/metadata";
import { BOOKS, nameMap } from "@/lib/hadith/books";
import { hadithLabels } from "@/lib/hadith/labels";

export async function generateMetadata({ params }: PageProps<"/[lang]/hadith">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const h = hadith[lang];
  return { title: h.metaTitle, description: h.metaDescription, alternates: alternates(lang, "/hadith/") };
}

export default async function HadithPage({ params }: PageProps<"/[lang]/hadith">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const h = hadith[lang];
  return (
    <>
      <HadithHeader lang={lang} crumbs={[{ label: common[lang].nav.hadith }]} title={appT(lang, "hadithLib.title")} subtitle={h.intro} photo="/images/ref/catHeader2.webp" />
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-16">
        <HadithHub lang={lang} L={hadithLabels(lang)} names={nameMap(lang)} books={BOOKS.map((b) => ({ key: b.key, hasEn: b.hasEn }))} searchTitle={common[lang].search}>
          <BooksGrid lang={lang} />
        </HadithHub>
      </div>
    </>
  );
}
