import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, ogLocale, SITE_URL, type Locale } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { common } from "@/i18n/messages/common";
import { articles as msgs, fill } from "@/i18n/messages/articles";
import { localDigits } from "@/lib/digits";
import {
  allArticles,
  articlePath,
  articlesPath,
  categoryName,
  categoryPath,
  getArticle,
  mostRead,
  relatedArticles,
  searchIndex,
  siblings,
} from "@/lib/articles";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { ArticleCard, CATEGORY_TONE, coverSrc, shareLabels } from "@/components/articles/ArticleCard";
import { ArticleSearch } from "@/components/articles/ArticleSearch";
import { FavButton } from "@/components/articles/FavButton";
import { GetAppCard, SectionTitle, SideBox } from "@/components/articles/Parts";
import { ShareBar } from "@/components/articles/ShareBar";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";

export const dynamicParams = false;
export function generateStaticParams() {
  // Slugs are the same in every language.
  return locales.flatMap((lang) => allArticles(lang).map((a) => ({ lang, category: a.c, slug: a.s })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/articles/[category]/[slug]">): Promise<Metadata> {
  const { lang, category, slug } = await params;
  if (!isLocale(lang)) return {};
  const a = getArticle(lang, category, slug);
  if (!a) return {};
  const section = categoryName(lang, a.c);
  return {
    title: `${a.t} — ${section}`,
    description: a.x,
    alternates: alternates(lang, `/articles/${a.c}/${a.s}/`),
    openGraph: {
      title: a.t,
      description: a.x,
      type: "article",
      section,
      locale: ogLocale[lang],
      siteName: common[lang].siteName,
      url: `${SITE_URL}${articlePath(lang, a)}`,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: a.t, description: a.x, images: ["/og-image.png"] },
  };
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/articles/[category]/[slug]">) {
  const { lang: l, category, slug } = await params;
  if (!isLocale(l)) notFound();
  const lang = l as Locale;
  const a = getArticle(lang, category, slug);
  if (!a) notFound();
  const t = msgs[lang];
  const name = categoryName(lang, a.c);
  const href = articlePath(lang, a);
  const { prev, next } = siblings(lang, a);
  const related = relatedArticles(lang, a, 3);
  const popular = mostRead(lang).filter((c) => c.href !== href).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.t,
    description: a.x,
    inLanguage: lang,
    articleSection: name,
    url: `${SITE_URL}${href}`,
    publisher: { "@type": "Organization", name: common[lang].siteName, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader lang={lang} crumbs={[{ label: t.title, href: articlesPath(lang) }, { label: name, href: categoryPath(lang, a.c) }]} title={a.t}>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 lg:max-w-[calc(100%-330px)]">
          <ShareBar href={href} title={a.t} labels={shareLabels(lang)} />
          <FavButton id={`${a.c}/${a.s}`} addLabel={t.favAdd} removeLabel={t.favRemove} className="size-10 ring-2 ring-edge/70" />
        </div>
      </PageHeader>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[minmax(0,1fr)_290px]">
        <article className="min-w-0">
          <figure className="relative h-56 overflow-hidden rounded-[20px] shadow-[0_5px_25px_rgba(0,0,0,0.16)] sm:h-[380px]">
            <Image src={coverSrc(a.c)} alt="" fill priority sizes="(max-width: 1024px) 100vw, 760px" className="object-cover" />
            <span className={`absolute start-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm ${CATEGORY_TONE[a.c]}`}>{name}</span>
            <figcaption className="absolute bottom-4 end-4 flex items-center gap-2.5 rounded-full bg-black/45 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
              {a.k && (
                <>
                  <span>{a.k}</span>
                  <span className="size-1.5 rounded-full bg-white" aria-hidden />
                </>
              )}
              <span>{fill(t.minRead, { n: localDigits(lang, a.m) })}</span>
            </figcaption>
          </figure>

          <div className="mt-10">
            <ArticleBody lang={lang} blocks={a.b} />
          </div>

          {(prev || next) && (
            <nav className="mt-12 grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link href={articlePath(lang, prev)} className="group flex items-center gap-3 rounded-[15px] bg-card p-4 shadow-[0_5px_25px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5">
                  <Icon name="chevron" className="size-5 shrink-0 rotate-180 text-primary rtl:rotate-0" />
                  <span className="line-clamp-2 text-sm font-bold text-section group-hover:text-primary dark:text-primary-light">{prev.t}</span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {next && (
                <Link href={articlePath(lang, next)} className="group flex items-center justify-end gap-3 rounded-[15px] bg-card p-4 text-end shadow-[0_5px_25px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5">
                  <span className="line-clamp-2 text-sm font-bold text-section group-hover:text-primary dark:text-primary-light">{next.t}</span>
                  <Icon name="chevron" className="size-5 shrink-0 text-primary" flip />
                </Link>
              )}
            </nav>
          )}
        </article>

        <aside className="flex flex-col gap-8">
          <SideBox title={common[lang].search}>
            <ArticleSearch index={searchIndex(lang)} placeholder={t.searchPlaceholder} empty={t.noResults} className="" />
          </SideBox>
          <SideBox title={t.mostRead}>
            <div className="space-y-4">
              {popular.map((c) => (
                <ArticleCard key={c.href} lang={lang} card={c} size="row" />
              ))}
            </div>
          </SideBox>
          <div className="lg:sticky lg:top-6">
            <GetAppCard lang={lang} compact />
          </div>
        </aside>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle
          title={t.related}
          action={
            <Link href={categoryPath(lang, a.c)} className="hidden shrink-0 items-center gap-1 text-sm font-bold text-primary hover:text-orange sm:inline-flex">
              {fill(t.moreIn, { cat: name })}
              <Icon name="chevron" className="size-4" flip />
            </Link>
          }
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((c) => (
            <ArticleCard key={c.href} lang={lang} card={c} />
          ))}
        </div>
      </div>
    </>
  );
}
