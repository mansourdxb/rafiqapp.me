import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuranReaderEntry } from "@/components/quran/QuranReaderEntry";
import { isLocale } from "@/i18n/config";
import { alternates, social } from "@/i18n/metadata";
import { quran } from "@/i18n/messages/quran";

export async function generateMetadata({ params }: PageProps<"/[lang]/quran/read">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = quran[lang];
  return { title: t.title, description: t.description, alternates: alternates(lang, "/quran/read/"), ...social(lang, "/quran/read/", t.title, t.description) };
}

export default async function QuranReadPage({ params }: PageProps<"/[lang]/quran/read">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <QuranReaderEntry lang={lang} />;
}
