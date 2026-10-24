// Article card: cover art, category chip, reading time, title, excerpt, favourite + share.
// Usable anywhere (home page too): pass a card from latestArticles()/toCard().
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { articles as msgs, fill } from "@/i18n/messages/articles";
import { localDigits } from "@/lib/digits";
import type { ArticleCardData } from "@/lib/articles";
import { CategoryCover } from "./CategoryArt";
import { FavButton } from "./FavButton";
import { ShareMini } from "./ShareBar";

export function shareLabels(lang: Locale) {
  const t = msgs[lang];
  return { share: t.share, shareOn: t.shareOn, copyLink: t.copyLink, copied: t.copied };
}

export function ArticleCard({ lang, card, size = "md" }: { lang: Locale; card: ArticleCardData; size?: "md" | "lg" }) {
  const t = msgs[lang];
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-card shadow-[0_6px_24px_-12px_rgba(13,36,94,0.25)] ring-1 ring-line transition hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(13,36,94,0.35)]">
      <CategoryCover cat={card.category} className={size === "lg" ? "h-48" : "h-40"} iconClass={size === "lg" ? "size-14" : "size-11"} />
      <span className="absolute start-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy shadow-sm backdrop-blur dark:bg-navy/80 dark:text-white">
        {card.categoryName}
      </span>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {card.minutes ? (
          <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
              <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2" />
            </svg>
            {fill(t.minRead, { n: localDigits(lang, card.minutes) })}
          </p>
        ) : null}
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-ink">
          <Link href={card.href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {card.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-ink-2">{card.excerpt}</p>
        <div className="relative z-10 mt-auto flex items-center justify-between pt-3">
          {card.id ? <FavButton id={card.id} addLabel={t.favAdd} removeLabel={t.favRemove} /> : <span />}
          <ShareMini href={card.href} title={card.title} labels={shareLabels(lang)} />
        </div>
      </div>
    </article>
  );
}
