import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { calendarMsg } from "@/i18n/messages/calendar";
import { CalendarView } from "@/components/calendar/CalendarView";

export async function generateMetadata({ params }: PageProps<"/[lang]/calendar">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = calendarMsg[lang];
  return { title: t.title, description: t.description, alternates: alternates(lang, "/calendar/") };
}

export default async function Page({ params }: PageProps<"/[lang]/calendar">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <CalendarView lang={lang} />;
}
