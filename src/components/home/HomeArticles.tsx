import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Icon } from "@/components/ui/Icon";
import { articlesPath, latestArticles } from "@/lib/articles";

/** "Recent articles" on the home page: three cards and a link to the library. */
export function HomeArticles({ lang, title, viewMore }: { lang: Locale; title: string; viewMore: string }) {
  const cards = latestArticles(lang, 3);
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16">
      <h2 className="text-3xl font-extrabold text-section dark:text-primary-light">{title}</h2>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <li key={c.href}>
            <ArticleCard lang={lang} card={c} />
          </li>
        ))}
      </ul>
      <div className="mt-10 text-center">
        <Link href={articlesPath(lang)} className="inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-3 font-bold text-white hover:bg-primary-deep">
          {viewMore}
          <Icon name="chevron" flip className="size-4" />
        </Link>
      </div>
    </section>
  );
}
