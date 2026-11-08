import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { alternates, social } from "@/i18n/metadata";
import { prayerMsg } from "@/i18n/messages/prayer";
import { PrayerTimesView } from "@/components/prayer/PrayerTimesView";

export async function generateMetadata({ params }: PageProps<"/[lang]/prayer-times">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = prayerMsg[lang];
  return { title: t.title, description: t.description, alternates: alternates(lang, "/prayer-times/"), ...social(lang, "/prayer-times/", t.title, t.description) };
}

export default async function Page({ params }: PageProps<"/[lang]/prayer-times">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <PrayerTimesView lang={lang} />;
}
