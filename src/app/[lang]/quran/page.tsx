import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuranIndex } from "@/components/quran/QuranIndex";
import { isLocale } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { quran } from "@/i18n/messages/quran";

export async function generateMetadata({ params }: PageProps<"/[lang]/quran">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = quran[lang];
  return { title: t.title, description: t.description, alternates: alternates(lang, "/quran/") };
}

export default async function QuranIndexPage({ params }: PageProps<"/[lang]/quran">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <QuranIndex lang={lang} />;
}
