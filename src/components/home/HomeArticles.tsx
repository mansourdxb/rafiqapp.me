import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { articlesPath, latestArticles, mostRead } from "@/lib/articles";

/** "Recent articles" (3 cards) and "Most read" (2 tall + 2 side-by-side), then "View more". */
export function HomeArticles({ lang, recent, popular, viewMore }: { lang: Locale; recent: string; popular: string; viewMore: string }) {
  const latest = latestArticles(lang, 3);
  const top = mostRead(lang, 4);
  const h2 = "text-[34px] font-bold text-section dark:text-primary-light";
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16">
      <h2 className={h2}>{recent}</h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {latest.map((c) => (
          <li key={c.href}>
            <ArticleCard lang={lang} card={c} />
          </li>
        ))}
      </ul>

      <h2 className={`${h2} mt-16`}>{popular}</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {top.slice(0, 2).map((c) => (
          <ArticleCard key={c.href} lang={lang} card={c} size="lg" />
        ))}
        <div className="grid gap-6">
          {top.slice(2, 4).map((c) => (
            <ArticleCard key={c.href} lang={lang} card={c} size="row" />
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link href={articlesPath(lang)} className="inline-block min-w-56 rounded-lg bg-primary px-10 py-2.5 text-lg font-bold text-white hover:bg-primary-deep">
          {viewMore}
        </Link>
      </div>
    </section>
  );
}
