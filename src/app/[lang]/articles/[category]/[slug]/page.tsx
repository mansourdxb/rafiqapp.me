import type { Metadata } from "next";
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
  siblings,
} from "@/lib/articles";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { ArticleCard, shareLabels } from "@/components/articles/ArticleCard";
import { CategoryIcon, CATEGORY_STYLE, categoryBackground } from "@/components/articles/CategoryArt";
import { FavButton } from "@/components/articles/FavButton";
import { Breadcrumbs, GetAppCard, SectionTitle } from "@/components/articles/Parts";
import { ShareBar } from "@/components/articles/ShareBar";
import { Icon } from "@/components/ui/Icon";

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
  const popular = mostRead(lang).filter((c) => c.href !== href).slice(0, 4);
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
      <section className="relative overflow-hidden text-white" style={categoryBackground(a.c)}>
        <div className="absolute -end-24 -top-24 size-80 rounded-full bg-white/10" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-10 sm:pt-12">
          <Breadcrumbs lang={lang} items={[{ label: t.title, href: articlesPath(lang) }, { label: name, href: categoryPath(lang, a.c) }]} />
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <Link href={categoryPath(lang, a.c)} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-bold text-navy hover:bg-white/90">
              <CategoryIcon cat={a.c} className="size-4" />
              {name}
            </Link>
            {a.k && <span className="rounded-full bg-white/15 px-3 py-1 font-semibold">{a.k}</span>}
            <span className="inline-flex items-center gap-1.5 text-white/85">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
                <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2" />
              </svg>
              {fill(t.minRead, { n: localDigits(lang, a.m) })}
            </span>
          </div>
          <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight sm:text-[2.6rem]">{a.t}</h1>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="relative z-10 -mt-14 min-w-0 rounded-3xl bg-card p-5 shadow-[0_16px_40px_-20px_rgba(13,36,94,0.45)] ring-1 ring-line sm:p-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-6">
            <ShareBar href={href} title={a.t} labels={shareLabels(lang)} />
            <FavButton id={`${a.c}/${a.s}`} addLabel={t.favAdd} removeLabel={t.favRemove} className="size-10 ring-1 ring-line" />
          </div>
          <ArticleBody lang={lang} blocks={a.b} />

          {(prev || next) && (
            <nav className="mt-12 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
              {prev ? (
                <Link href={articlePath(lang, prev)} className="group flex items-center gap-3 rounded-2xl p-3 ring-1 ring-line transition hover:ring-primary">
                  <Icon name="chevron" className="size-5 shrink-0 rotate-180 text-primary rtl:rotate-0" />
                  <span className="line-clamp-2 text-sm font-semibold text-ink group-hover:text-primary">{prev.t}</span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {next && (
                <Link href={articlePath(lang, next)} className="group flex items-center justify-end gap-3 rounded-2xl p-3 text-end ring-1 ring-line transition hover:ring-primary">
                  <span className="line-clamp-2 text-sm font-semibold text-ink group-hover:text-primary">{next.t}</span>
                  <Icon name="chevron" className="size-5 shrink-0 text-primary" flip />
                </Link>
              )}
            </nav>
          )}
        </article>

        <aside className="flex flex-col gap-6 lg:pt-8">
          <section className="rounded-3xl bg-card p-5 ring-1 ring-line">
            <h2 className="mb-4 text-lg font-extrabold text-navy dark:text-white">{t.mostRead}</h2>
            <ul className="space-y-3">
              {popular.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="group flex items-center gap-3">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl text-white" style={categoryBackground(c.category)}>
                      <CategoryIcon cat={c.category} className="size-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold" style={{ color: CATEGORY_STYLE[c.category].to }}>
                        {c.categoryName}
                      </span>
                      <span className="line-clamp-2 text-sm font-bold text-ink group-hover:text-primary">{c.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <div className="lg:sticky lg:top-24">
            <GetAppCard lang={lang} compact />
          </div>
        </aside>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16">
        <SectionTitle
          title={t.related}
          action={
            <Link href={categoryPath(lang, a.c)} className="hidden shrink-0 items-center gap-1 text-sm font-bold text-primary hover:text-orange sm:inline-flex">
              {fill(t.moreIn, { cat: name })}
              <Icon name="chevron" className="size-4" flip />
            </Link>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((c) => (
            <ArticleCard key={c.href} lang={lang} card={c} />
          ))}
        </div>
      </div>
    </>
  );
}
