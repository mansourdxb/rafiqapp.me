import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { qiblaMsg } from "@/i18n/messages/qibla";
import { QiblaView } from "@/components/qibla/QiblaView";

export async function generateMetadata({ params }: PageProps<"/[lang]/qibla">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = qiblaMsg[lang];
  return { title: t.title, description: t.description, alternates: alternates(lang, "/qibla/") };
}

export default async function Page({ params }: PageProps<"/[lang]/qibla">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <QiblaView lang={lang} />;
}
