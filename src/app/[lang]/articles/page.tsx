import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, ogLocale, type Locale } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { common } from "@/i18n/messages/common";
import { articles as msgs } from "@/i18n/messages/articles";
import { latestArticles, mostRead } from "@/lib/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticlesToolbar, CategoryTiles, GetAppCard, SectionTitle } from "@/components/articles/Parts";
import { PageHeader } from "@/components/ui/PageHeader";
import { StoreBadges } from "@/components/ui/StoreBadges";

export async function generateMetadata({ params }: PageProps<"/[lang]/articles">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = msgs[lang];
  const title = `${t.title} — ${t.heroAccent}`;
  return {
    title,
    description: t.metaDescription,
    alternates: alternates(lang, "/articles/"),
    openGraph: {
      title,
      description: t.metaDescription,
      type: "website",
      locale: ogLocale[lang],
      siteName: common[lang].siteName,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function ArticlesPage({ params }: PageProps<"/[lang]/articles">) {
  const { lang: l } = await params;
  if (!isLocale(l)) notFound();
  const lang = l as Locale;
  const t = msgs[lang];
  const popular = mostRead(lang, 3);
  const recent = latestArticles(lang, 9);

  return (
    <>
      <PageHeader lang={lang} photo="/images/ref/catHeader1.webp" highlight={t.heroAccent} title={t.heroTitle} subtitle={t.heroSubtitle}>
        <StoreBadges lang={lang} className="mt-6" />
      </PageHeader>

      <ArticlesToolbar lang={lang} />

      <div className="mx-auto max-w-6xl px-4">
        <section className="pt-14">
          <SectionTitle title={t.mostRead} />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((c) => (
              <ArticleCard key={c.href} lang={lang} card={c} size="lg" />
            ))}
          </div>
        </section>

        <section className="pt-16">
          <SectionTitle title={t.recent} />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((c) => (
              <ArticleCard key={c.href} lang={lang} card={c} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="#categories" className="inline-block min-w-56 rounded-lg bg-primary px-10 py-2.5 text-lg font-bold text-white hover:bg-primary-deep">
              {t.viewMore}
            </Link>
          </div>
        </section>

        <section id="categories" className="scroll-mt-24 pt-16">
          <SectionTitle title={t.categoriesTitle} />
          <p className="-mt-5 mb-8 text-navy-2 dark:text-ink-2">{t.categoriesSubtitle}</p>
          <CategoryTiles lang={lang} />
        </section>

        <div className="py-16">
          <GetAppCard lang={lang} />
        </div>
      </div>
    </>
  );
}
