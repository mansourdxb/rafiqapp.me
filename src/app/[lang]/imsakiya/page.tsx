import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { alternates } from "@/i18n/metadata";
import { imsakiyaMsg } from "@/i18n/messages/imsakiya";
import { ImsakiyaView } from "@/components/imsakiya/ImsakiyaView";

export async function generateMetadata({ params }: PageProps<"/[lang]/imsakiya">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: appT(lang, "more.imsakiya"), description: imsakiyaMsg[lang].description, alternates: alternates(lang, "/imsakiya/") };
}

export default async function Page({ params }: PageProps<"/[lang]/imsakiya">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <ImsakiyaView lang={lang} />;
}
