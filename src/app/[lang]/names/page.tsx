import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { names, NAMES_VERSE } from "@/i18n/messages/names";
import { NAMES, nameText } from "@/lib/athkar/data";
import { NamesGrid } from "@/components/names/NamesGrid";
import { PageHeader } from "@/components/ui/PageHeader";

export async function generateMetadata({ params }: PageProps<"/[lang]/names">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = names[lang];
  return { title: t.title, description: t.description, alternates: alternates(lang, "/names/") };
}

export default async function NamesPage({ params }: PageProps<"/[lang]/names">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = names[lang];
  const list = NAMES.map((n) => ({ n: n.n, ar: n.ar, tl: n.tl, m: nameText(lang, n).meaning, en: n.m.en }));

  return (
    <div className="pb-16">
      <PageHeader
        lang={lang}
        crumbs={[{ label: t.title }]}
        title={t.title}
        subtitle={
          <>
            <span dir="rtl" lang="ar" className="quran mt-2 block text-2xl text-section sm:text-3xl dark:text-primary-light">
              ﴿{NAMES_VERSE}﴾
            </span>
            <span className="mt-1 block text-sm text-ink-2">{t.verseRef}</span>
          </>
        }
      />
      <NamesGrid lang={lang} list={list} labels={{ search: t.search, noResults: t.noResults, note: t.englishNote }} />
    </div>
  );
}
