import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { athkar, fill, READER_LABELS, type ReaderLabels } from "@/i18n/messages/athkar";
import { CATEGORIES, categoryTitle, loadCategory } from "@/lib/athkar/data";
import { AthkarReader } from "@/components/athkar/AthkarReader";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => CATEGORIES.map((c) => ({ lang, id: String(c.id) })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/athkar/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};
  const title = categoryTitle(lang, Number(id));
  return {
    title,
    description: fill(athkar[lang].readerDescription, { title }),
    alternates: alternates(lang, `/athkar/${id}/`),
  };
}

export default async function AthkarCategoryPage({ params }: PageProps<"/[lang]/athkar/[id]">) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const cat = await loadCategory(lang, Number(id));
  if (!cat) notFound();
  const t = athkar[lang];
  const labels = Object.fromEntries(READER_LABELS.map((k) => [k, t[k]])) as ReaderLabels;

  return <AthkarReader lang={lang} id={cat.id} title={categoryTitle(lang, cat.id)} items={cat.items} labels={labels} />;
}
