import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { HomeView } from "@/components/home/HomeView";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <HomeView lang={lang} />;
}
