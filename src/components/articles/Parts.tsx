// Small shared pieces of the articles pages (reference style: text chips with a navy active pill,
// blue section titles, photo category tiles, navy "get the app" card).
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { articles as msgs, fill, type CategoryId } from "@/i18n/messages/articles";
import { localDigits } from "@/lib/digits";
import { CATEGORY_IDS, articlesPath, categoryCount, categoryName, categoryPath, searchIndex } from "@/lib/articles";
import { Icon } from "@/components/ui/Icon";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { coverSrc } from "./ArticleCard";
import { ArticleSearch } from "./ArticleSearch";

/** Chip row: "All categories" + each category. `active` = current category (none on the index). */
export function CategoryChips({ lang, active }: { lang: Locale; active?: CategoryId }) {
  const t = msgs[lang];
  const chip = "inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full px-4 text-[15px] font-bold transition";
  const on = "bg-navy text-white dark:bg-primary";
  const off = "text-navy-2 hover:text-primary dark:text-ink";
  return (
    <nav aria-label={t.categoriesTitle} className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ul className="flex gap-x-1 gap-y-1 sm:flex-wrap">
        <li>
          <Link href={articlesPath(lang)} className={`${chip} ${active ? off : on}`} aria-current={active ? undefined : "page"}>
            {t.allCategories}
          </Link>
        </li>
        {CATEGORY_IDS.map((c) => (
          <li key={c}>
            <Link href={categoryPath(lang, c)} className={`${chip} ${active === c ? on : off}`} aria-current={active === c ? "page" : undefined}>
              {categoryName(lang, c)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Under the banner: category chips (start) + search pill (end). */
export function ArticlesToolbar({ lang, active }: { lang: Locale; active?: CategoryId }) {
  const t = msgs[lang];
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 pt-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
      <div className="min-w-0 lg:flex-1">
        <CategoryChips lang={lang} active={active} />
      </div>
      <ArticleSearch index={searchIndex(lang)} placeholder={t.searchPlaceholder} empty={t.noResults} className="lg:max-w-60" />
    </div>
  );
}

/** Category photo tiles (index page "categories" section). */
export function CategoryTiles({ lang }: { lang: Locale }) {
  const t = msgs[lang];
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {CATEGORY_IDS.map((c) => (
        <li key={c}>
          <Link
            href={categoryPath(lang, c)}
            className="group relative flex h-full min-h-52 flex-col justify-end overflow-hidden rounded-[15px] p-5 text-white shadow-[0_5px_25px_rgba(0,0,0,0.16)] transition hover:-translate-y-1"
          >
            <Image src={coverSrc(c)} alt="" fill sizes="(max-width: 640px) 100vw, 300px" className="object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" aria-hidden />
            <span className="relative block">
              <span className="block text-lg font-bold leading-snug">{categoryName(lang, c)}</span>
              <span className="mt-1 line-clamp-2 block text-sm text-white/85">{t.catDesc[c]}</span>
              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-orange px-3 py-1 text-xs font-bold">
                {fill(t.count, { n: localDigits(lang, categoryCount(lang, c)) })}
                <Icon name="chevron" className="size-3.5" flip />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SectionTitle({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <h2 className="text-[28px] font-bold leading-tight text-section sm:text-[34px] dark:text-primary-light">{title}</h2>
      {action}
    </div>
  );
}

/** Grey sidebar box with a blue title (reference "Search" / "Most viewed"). */
export function SideBox({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-[15px] bg-[#EFEFEF] p-6 dark:bg-card ${className}`}>
      <h2 className="mb-5 text-2xl font-bold text-section dark:text-primary-light">{title}</h2>
      {children}
    </section>
  );
}

/** "Get the app" card. */
export function GetAppCard({ lang, compact = false }: { lang: Locale; compact?: boolean }) {
  const t = msgs[lang];
  return (
    <section className={`rounded-[15px] bg-navy text-white shadow-[0_5px_25px_rgba(0,0,0,0.16)] ${compact ? "p-6" : "p-8 sm:p-10"}`}>
      <div className={`flex flex-col gap-5 ${compact ? "" : "lg:flex-row lg:items-center lg:justify-between"}`}>
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={56} height={56} className="size-14 shrink-0 rounded-2xl bg-white p-1" />
          <div>
            <p className="text-sm font-bold text-orange">{common[lang].getApp}</p>
            <h2 className={`font-bold ${compact ? "text-lg" : "text-2xl"}`}>{t.getAppTitle}</h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/80">{t.getAppBody}</p>
          </div>
        </div>
        <StoreBadges lang={lang} className={compact ? "flex-col [&>a]:w-full" : ""} />
      </div>
    </section>
  );
}
