import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterView } from "@/components/hadith/ChapterView";
import { isLocale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { alternates } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/hadith/read">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: common[lang].nav.hadith, alternates: alternates(lang, "/hadith/read/") };
}

export default async function HadithReadPage({ params }: PageProps<"/[lang]/hadith/read">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <ChapterView lang={lang} />;
}
