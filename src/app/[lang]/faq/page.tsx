import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, ogLocale, type Locale } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { common } from "@/i18n/messages/common";
import { faq as msgs } from "@/i18n/messages/faq";
import { localDigits } from "@/lib/digits";
import { FaqList } from "@/components/faq/FaqList";
import { GetAppCard } from "@/components/articles/Parts";
import { IslamicBand, StarPattern } from "@/components/ui/IslamicBand";
import ar from "@/generated/faq-ar.json";
import en from "@/generated/faq-en.json";
import ur from "@/generated/faq-ur.json";
import fa from "@/generated/faq-fa.json";
import ru from "@/generated/faq-ru.json";
import ms from "@/generated/faq-ms.json";
import tr from "@/generated/faq-tr.json";
import id from "@/generated/faq-id.json";

type FaqData = { title: string; items: { id: string; q: string; steps: string[] }[] };
const DATA: Record<Locale, FaqData> = { ar, en, ur, fa, ru, ms, tr, id };

export async function generateMetadata({ params }: PageProps<"/[lang]/faq">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const title = DATA[lang].title;
  const description = msgs[lang].metaDescription;
  return {
    title,
    description,
    alternates: alternates(lang, "/faq/"),
    openGraph: { title, description, type: "website", locale: ogLocale[lang], siteName: common[lang].siteName, images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  };
}

export default async function FaqPage({ params }: PageProps<"/[lang]/faq">) {
  const { lang: l } = await params;
  if (!isLocale(l)) notFound();
  const lang = l as Locale;
  const t = msgs[lang];
  const data = DATA[lang];
  const maxSteps = Math.max(...data.items.map((i) => i.steps.length));
  const digits = Array.from({ length: maxSteps }, (_, i) => localDigits(lang, i + 1));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: data.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.steps.map((s, n) => `${n + 1}. ${s}`).join("\n") },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden bg-navy text-white">
        <StarPattern className="text-white/5" />
        <div className="absolute -end-24 -top-24 size-96 rounded-full bg-primary/25 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 pb-20 pt-14 text-center sm:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/15">
            <span className="size-2 rounded-full bg-orange" />
            {t.count.replace("{n}", localDigits(lang, data.items.length))}
          </span>
          <h1 className="mt-5 text-3xl font-extrabold sm:text-5xl">{data.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/80 sm:text-lg">{t.subtitle}</p>
        </div>
      </section>
      <IslamicBand />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <FaqList
          items={data.items}
          digits={digits}
          labels={{ searchPlaceholder: t.searchPlaceholder, noResults: t.noResults, expandAll: t.expandAll, collapseAll: t.collapseAll }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6">
        <GetAppCard lang={lang} />
      </div>
    </>
  );
}
