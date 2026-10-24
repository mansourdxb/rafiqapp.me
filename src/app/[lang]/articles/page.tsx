import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, ogLocale, type Locale } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { common } from "@/i18n/messages/common";
import { articles as msgs } from "@/i18n/messages/articles";
import { latestArticles, mostRead, searchIndex } from "@/lib/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ArticleSearch } from "@/components/articles/ArticleSearch";
import { CategoryChips, CategoryTiles, GetAppCard, SectionTitle } from "@/components/articles/Parts";
import { IslamicBand, StarPattern } from "@/components/ui/IslamicBand";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { Icon } from "@/components/ui/Icon";

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
      <section className="relative overflow-hidden bg-navy text-white">
        <Image src="/images/hero-mosque.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy" />
        <StarPattern className="text-white/5" />
        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-14 sm:pt-20">
          <p className="text-2xl font-extrabold text-orange sm:text-3xl">{t.heroAccent}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">{t.heroTitle}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">{t.heroSubtitle}</p>
          <StoreBadges lang={lang} className="mt-7" />
        </div>
      </section>
      <IslamicBand />

      <div className="mx-auto max-w-7xl px-4">
        <div className="relative z-10 -mt-14 flex flex-col gap-4 rounded-3xl bg-card p-4 shadow-[0_16px_40px_-20px_rgba(13,36,94,0.45)] ring-1 ring-line sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 lg:flex-1">
            <CategoryChips lang={lang} />
          </div>
          <ArticleSearch index={searchIndex(lang)} placeholder={t.searchPlaceholder} empty={t.noResults} />
        </div>

        <section className="pt-14">
          <SectionTitle title={t.mostRead} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((c) => (
              <ArticleCard key={c.href} lang={lang} card={c} size="lg" />
            ))}
          </div>
        </section>

        <section className="pt-16">
          <SectionTitle
            title={t.recent}
            action={
              <Link href="#categories" className="hidden shrink-0 items-center gap-1 text-sm font-bold text-primary hover:text-orange sm:inline-flex">
                {t.viewMore}
                <Icon name="chevron" className="size-4" flip />
              </Link>
            }
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((c) => (
              <ArticleCard key={c.href} lang={lang} card={c} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="#categories"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-orange px-7 font-bold text-white shadow-lg shadow-orange/25 transition hover:-translate-y-0.5 hover:bg-orange/90"
            >
              {t.viewMore}
              <Icon name="chevron" className="size-4" flip />
            </Link>
          </div>
        </section>

        <section id="categories" className="scroll-mt-24 pt-16">
          <SectionTitle title={t.categoriesTitle} />
          <p className="-mt-3 mb-6 text-ink-2">{t.categoriesSubtitle}</p>
          <CategoryTiles lang={lang} />
        </section>

        <div className="py-16">
          <GetAppCard lang={lang} />
        </div>
      </div>
    </>
  );
}
