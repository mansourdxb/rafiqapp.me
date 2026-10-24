import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuranReader } from "@/components/quran/QuranReader";
import { isLocale, locales } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { fill, quran } from "@/i18n/messages/quran";
import { localDigits } from "@/lib/digits";
import { PAGE_COUNT, surahName, surahOfPage, type PageData } from "@/lib/quran/data";
import { pageTitle } from "@/lib/quran/title";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => Array.from({ length: PAGE_COUNT }, (_, i) => ({ lang, page: String(i + 1) })));
}

const pageNo = (v: string) => {
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= PAGE_COUNT ? n : null;
};

function readPage(p: number): PageData {
  return JSON.parse(readFileSync(join(process.cwd(), "public", "data", "quran", "pages", `${p}.json`), "utf8"));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/quran/[page]">): Promise<Metadata> {
  const { lang, page } = await params;
  const p = pageNo(page);
  if (!isLocale(lang) || !p) return {};
  return {
    title: pageTitle(lang, p),
    description: fill(quran[lang].readerDescription, { page: localDigits(lang, p), surah: surahName(lang, surahOfPage(p)) }),
    alternates: alternates(lang, `/quran/${p}/`),
  };
}

export default async function QuranPage({ params }: PageProps<"/[lang]/quran/[page]">) {
  const { lang, page } = await params;
  const p = pageNo(page);
  if (!isLocale(lang) || !p) notFound();
  // this page and its facing page, so both render before any fetch
  const right = p % 2 === 1 ? p : p - 1;
  const pages = [...new Set([p, right, Math.min(PAGE_COUNT, right + 1)])].map(readPage);
  return <QuranReader lang={lang} initialPage={p} initialData={pages} />;
}
