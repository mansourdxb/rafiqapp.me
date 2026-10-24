// Article card in the reference style: photo cover with a coloured category pill, reading time,
// blue title, excerpt, favourite + share. `row` = the small side-by-side card of "Most read".
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { articles as msgs, fill, type CategoryId } from "@/i18n/messages/articles";
import { localDigits } from "@/lib/digits";
import type { ArticleCardData } from "@/lib/articles";
import { FavButton } from "./FavButton";
import { ShareMini } from "./ShareBar";

export function shareLabels(lang: Locale) {
  const t = msgs[lang];
  return { share: t.share, shareOn: t.shareOn, copyLink: t.copyLink, copied: t.copied };
}

/** Pill colour per category (the reference colours its category tags). */
export const CATEGORY_TONE: Record<CategoryId, string> = {
  seerah: "bg-[#CC4EC4]",
  prophets: "bg-orange",
  fiqh: "bg-section",
  hajj: "bg-[#0A9B7A]",
  prayer: "bg-primary",
  duas: "bg-[#7B4FC9]",
  ruqyah: "bg-[#D6457A]",
  tajweed: "bg-[#C98A1E]",
};

export const coverSrc = (cat: CategoryId) => `/images/covers/${cat}.webp`;

function Meta({ lang, card }: { lang: Locale; card: ArticleCardData }) {
  if (!card.minutes) return null;
  return (
    <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
      <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
        <path d="M7 2h2v2h6V2h2v2h3v18H4V4h3zm-1 8v10h12V10zm2 2h3v3H8z" />
      </svg>
      {fill(msgs[lang].minRead, { n: localDigits(lang, card.minutes) })}
    </p>
  );
}

function Actions({ lang, card }: { lang: Locale; card: ArticleCardData }) {
  const t = msgs[lang];
  return (
    <div className="relative z-10 mt-auto flex items-center justify-between pt-3">
      {card.id ? <FavButton id={card.id} addLabel={t.favAdd} removeLabel={t.favRemove} className="!size-8" /> : <span />}
      <ShareMini href={card.href} title={card.title} labels={shareLabels(lang)} />
    </div>
  );
}

export function ArticleCard({ lang, card, size = "md" }: { lang: Locale; card: ArticleCardData; size?: "md" | "lg" | "row" }) {
  const pill = (
    <span className={`absolute start-2.5 top-2.5 z-10 rounded-full px-3 py-1 text-[11px] font-bold text-white shadow-sm ${CATEGORY_TONE[card.category]}`}>
      {card.categoryName}
    </span>
  );
  const title = (cls: string) => (
    <h3 className={`font-bold leading-snug text-section dark:text-primary-light ${cls}`}>
      <Link href={card.href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
        {card.title}
      </Link>
    </h3>
  );

  if (size === "row")
    return (
      <article className="group relative flex overflow-hidden rounded-[15px] bg-card shadow-[0_5px_25px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5">
        <div className="relative w-2/5 shrink-0">
          <Image src={coverSrc(card.category)} alt="" fill sizes="200px" className="object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-4">
          <Meta lang={lang} card={card} />
          {title("line-clamp-2 text-sm")}
          <p className="line-clamp-2 text-xs leading-relaxed text-navy-2 dark:text-ink-2">{card.excerpt}</p>
          <Actions lang={lang} card={card} />
        </div>
      </article>
    );

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[15px] bg-card shadow-[0_5px_25px_rgba(0,0,0,0.16)] transition hover:-translate-y-1">
      <div className={`relative ${size === "lg" ? "h-52" : "h-40"}`}>
        {pill}
        <Image src={coverSrc(card.category)} alt="" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-5 pb-4 pt-4">
        <Meta lang={lang} card={card} />
        {title("line-clamp-2 text-base")}
        <p className="line-clamp-2 text-xs leading-relaxed text-navy-2 dark:text-ink-2">{card.excerpt}</p>
        <Actions lang={lang} card={card} />
      </div>
    </article>
  );
}
