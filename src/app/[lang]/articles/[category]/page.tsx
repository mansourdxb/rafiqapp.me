import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, ogLocale, type Locale } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { common } from "@/i18n/messages/common";
import { articles as msgs, fill } from "@/i18n/messages/articles";
import { localDigits } from "@/lib/digits";
import { CATEGORY_IDS, articlesPath, categoryArticles, categoryName, isCategory, toCard } from "@/lib/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { CategoryIcon, categoryBackground } from "@/components/articles/CategoryArt";
import { Breadcrumbs, CategoryChips, GetAppCard } from "@/components/articles/Parts";

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

  return (
    <>
      <section className="relative overflow-hidden text-white" style={categoryBackground(category)}>
        <div className="absolute -end-20 -top-24 size-80 rounded-full bg-white/10" aria-hidden />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-20 pt-10 sm:flex-row sm:items-center sm:pt-14">
          <span className="grid size-20 shrink-0 place-items-center rounded-3xl bg-white/15 ring-1 ring-white/25 sm:size-24">
            <CategoryIcon cat={category} className="size-11 sm:size-12" />
          </span>
          <div>
            <Breadcrumbs lang={lang} items={[{ label: t.title, href: articlesPath(lang) }, { label: name }]} />
            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{name}</h1>
            <p className="mt-2 max-w-2xl text-white/85">{t.catDesc[category]}</p>
            <p className="mt-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">{fill(t.count, { n: localDigits(lang, list.length) })}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4">
        <div className="relative z-10 -mt-10 rounded-3xl bg-card p-4 shadow-[0_16px_40px_-20px_rgba(13,36,94,0.45)] ring-1 ring-line sm:p-5">
          <CategoryChips lang={lang} active={category} />
        </div>
        <div className="grid gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <ArticleCard key={a.s} lang={lang} card={toCard(lang, a)} />
          ))}
        </div>
        <div className="py-16">
          <GetAppCard lang={lang} />
        </div>
      </div>
    </>
  );
}
