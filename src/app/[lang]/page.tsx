import type { Metadata } from "next";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { HomeView } from "@/components/home/HomeView";
import { common } from "@/i18n/messages/common";
import { seo } from "@/i18n/messages/seo";
import { alternates, social } from "@/i18n/metadata";
import { appJsonLd } from "@/lib/jsonld";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const s = seo[lang];
  const description = s.description ?? common[lang].description;
  return { title: { absolute: s.title }, description, alternates: alternates(lang, "/"), ...social(lang, "/", s.title, description) };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <HomeView lang={lang} />
    </>
  );
}
