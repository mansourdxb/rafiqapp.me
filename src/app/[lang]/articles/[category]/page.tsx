import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, ogLocale, type Locale } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { common } from "@/i18n/messages/common";
import { articles as msgs, fill } from "@/i18n/messages/articles";
import { localDigits } from "@/lib/digits";
import { CATEGORY_IDS, categoryArticles, categoryName, isCategory, toCard } from "@/lib/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticlesToolbar, GetAppCard, SectionTitle } from "@/components/articles/Parts";
import { PageHeader } from "@/components/ui/PageHeader";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => CATEGORY_IDS.map((category) => ({ lang, category })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/articles/[category]">): Promise<Metadata> {
  const { lang, category } = await params;
  if (!isLocale(lang) || !isCategory(category)) return {};
  const title = `${categoryName(lang, category)} — ${msgs[lang].title}`;
  const description = msgs[lang].catDesc[category];
  return {
    title,
    description,
    alternates: alternates(lang, `/articles/${category}/`),
    openGraph: { title, description, type: "website", locale: ogLocale[lang], siteName: common[lang].siteName, images: [{ url: "/og-image.png", width: 1200, height: 630 }] },
  };
}

export default async function CategoryPage({ params }: PageProps<"/[lang]/articles/[category]">) {
  const { lang: l, category } = await params;
  if (!isLocale(l) || !isCategory(category)) notFound();
  const lang = l as Locale;
  const t = msgs[lang];
  const list = categoryArticles(lang, category);
  const name = categoryName(lang, category);
  const banner = `/images/ref/catHeader${(CATEGORY_IDS.indexOf(category) % 4) + 1}.webp`;

  return (
    <>
      <PageHeader
        lang={lang}
        photo={banner}
        title={<span className="text-orange">{name}</span>}
        subtitle={
          <>
            <p className="text-lg font-semibold">{t.catDesc[category]}</p>
            <span className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-bold ring-1 ring-white/30">{fill(t.count, { n: localDigits(lang, list.length) })}</span>
          </>
        }
      />

      <ArticlesToolbar lang={lang} active={category} />

      <div className="mx-auto max-w-6xl px-4">
        <section className="pt-14">
          <SectionTitle title={t.recent} />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <ArticleCard key={a.s} lang={lang} card={toCard(lang, a)} />
            ))}
          </div>
        </section>
        <div className="py-16">
          <GetAppCard lang={lang} />
        </div>
      </div>
    </>
  );
}
