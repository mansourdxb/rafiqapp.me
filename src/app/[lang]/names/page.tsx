import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { names, NAMES_VERSE } from "@/i18n/messages/names";
import { NAMES, nameText } from "@/lib/athkar/data";
import { NamesGrid } from "@/components/names/NamesGrid";

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
      <section className="bg-gradient-to-b from-navy to-navy-2 px-4 pt-10 pb-24 text-center text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">{t.title}</h1>
        <p dir="rtl" lang="ar" className="quran mt-4 text-2xl text-gold sm:text-3xl">
          ﴿{NAMES_VERSE}﴾
        </p>
        <p className="mt-1 text-sm text-white/60">{t.verseRef}</p>
      </section>
      <NamesGrid lang={lang} list={list} labels={{ search: t.search, noResults: t.noResults, note: t.englishNote }} />
    </div>
  );
}
