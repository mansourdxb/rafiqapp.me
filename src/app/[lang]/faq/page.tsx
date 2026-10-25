import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, ogLocale, type Locale } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { common } from "@/i18n/messages/common";
import { faq as msgs } from "@/i18n/messages/faq";
import { localDigits } from "@/lib/digits";
import { FaqList } from "@/components/faq/FaqList";
import { articles as articleMsgs } from "@/i18n/messages/articles";
import { mostRead } from "@/lib/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { GetAppCard, SideBox } from "@/components/articles/Parts";
import { PageHeader } from "@/components/ui/PageHeader";
import ar from "@/generated/faq-ar.json";
import en from "@/generated/faq-en.json";
import ur from "@/generated/faq-ur.json";
import fa from "@/generated/faq-fa.json";
import ru from "@/generated/faq-ru.json";
import ms from "@/generated/faq-ms.json";
import tr from "@/generated/faq-tr.json";
import id from "@/generated/faq-id.json";
import hi from "@/generated/faq-hi.json";
import bn from "@/generated/faq-bn.json";

type FaqData = { title: string; items: { id: string; q: string; steps: string[] }[] };
const DATA: Record<Locale, FaqData> = { ar, en, ur, fa, ru, ms, tr, id, hi, bn };

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
      <PageHeader lang={lang} crumbs={[{ label: data.title }]} title={data.title} subtitle={t.subtitle} />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-4 lg:grid-cols-[minmax(0,1fr)_290px]">
        <div className="min-w-0">
          <FaqList
            items={data.items}
            digits={digits}
            labels={{ searchPlaceholder: t.searchPlaceholder, noResults: t.noResults, expandAll: t.expandAll, collapseAll: t.collapseAll }}
          />
        </div>
        <aside className="flex flex-col gap-8 lg:pt-16">
          <SideBox title={articleMsgs[lang].mostRead}>
            <div className="space-y-4">
              {mostRead(lang, 3).map((c) => (
                <ArticleCard key={c.href} lang={lang} card={c} size="row" />
              ))}
            </div>
          </SideBox>
          <GetAppCard lang={lang} compact />
        </aside>
      </div>
    </>
  );
}
