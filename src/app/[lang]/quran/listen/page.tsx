import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ListenHub, ListenHubRouted } from "@/components/player/ListenHub";
import { isLocale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { alternates, social } from "@/i18n/metadata";
import { player } from "@/i18n/messages/player";

export async function generateMetadata({ params }: PageProps<"/[lang]/quran/listen">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const title = appT(lang, "qaudio.title");
  const description = player[lang].description;
  return { title, description, alternates: alternates(lang, "/quran/listen/"), ...social(lang, "/quran/listen/", title, description) };
}

// One page per language: a reciter's surahs are ?r=<key> on the same page (no page per reciter).
export default async function ListenPage({ params }: PageProps<"/[lang]/quran/listen">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <Suspense fallback={<ListenHub lang={lang} reciterKey={null} />}>
      <ListenHubRouted lang={lang} />
    </Suspense>
  );
}
