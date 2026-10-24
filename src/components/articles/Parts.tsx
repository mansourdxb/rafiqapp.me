// Small shared pieces of the articles pages.
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { articles as msgs, fill, type CategoryId } from "@/i18n/messages/articles";
import { localDigits } from "@/lib/digits";
import { CATEGORY_IDS, articlesPath, categoryCount, categoryName, categoryPath } from "@/lib/articles";
import { Icon } from "@/components/ui/Icon";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { CategoryIcon, CATEGORY_STYLE, categoryBackground } from "./CategoryArt";

/** Chip row: "All categories" + each category. `active` = current category (none on the index). */
export function CategoryChips({ lang, active }: { lang: Locale; active?: CategoryId }) {
  const t = msgs[lang];
  const chip = "inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition";
  const on = "bg-navy text-white shadow-md dark:bg-primary";
  const off = "bg-card text-ink ring-1 ring-line hover:text-primary hover:ring-primary";
  return (
    <nav aria-label={t.categoriesTitle} className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ul className="flex gap-2 sm:flex-wrap">
        <li>
          <Link href={articlesPath(lang)} className={`${chip} ${active ? off : on}`} aria-current={active ? undefined : "page"}>
            {t.allCategories}
          </Link>
        </li>
        {CATEGORY_IDS.map((c) => (
          <li key={c}>
            <Link href={categoryPath(lang, c)} className={`${chip} ${active === c ? on : off}`} aria-current={active === c ? "page" : undefined}>
              <span className="grid size-6 place-items-center rounded-full text-white" style={{ background: CATEGORY_STYLE[c].to }}>
                <CategoryIcon cat={c} className="size-3.5" />
              </span>
              {categoryName(lang, c)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Large category tiles (index page "categories" section). */
export function CategoryTiles({ lang }: { lang: Locale }) {
  const t = msgs[lang];
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CATEGORY_IDS.map((c) => (
        <li key={c}>
          <Link
            href={categoryPath(lang, c)}
            className="group relative flex h-full min-h-44 flex-col justify-between overflow-hidden rounded-3xl p-5 text-white shadow-[0_10px_30px_-14px_rgba(13,36,94,0.5)] transition hover:-translate-y-1"
            style={categoryBackground(c)}
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
              <CategoryIcon cat={c} className="size-7" />
            </span>
            <span className="mt-6 block">
              <span className="block text-lg font-bold leading-snug">{categoryName(lang, c)}</span>
              <span className="mt-1 line-clamp-2 block text-sm text-white/80">{t.catDesc[c]}</span>
              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
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
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="text-2xl font-extrabold text-navy sm:text-3xl dark:text-white">
        <span className="me-3 inline-block h-7 w-1.5 translate-y-1 rounded-full bg-orange align-baseline" aria-hidden />
        {title}
      </h2>
      {action}
    </div>
  );
}

export function Breadcrumbs({ lang, items }: { lang: Locale; items: { label: string; href?: string }[] }) {
  const all = [{ label: msgs[lang].home, href: localePath(lang, "/") }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-white/75">
        {all.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <Icon name="chevron" className="size-3.5 opacity-60" flip />}
            {it.href ? (
              <Link href={it.href} className="hover:text-white hover:underline">
                {it.label}
              </Link>
            ) : (
              <span className="font-semibold text-white" aria-current="page">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** "Get the app" card. */
export function GetAppCard({ lang, compact = false }: { lang: Locale; compact?: boolean }) {
  const t = msgs[lang];
  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-section text-white shadow-[0_16px_40px_-18px_rgba(13,36,94,0.6)] ${compact ? "p-6" : "p-8 sm:p-10"}`}
    >
      <div className="absolute -end-16 -top-16 size-56 rounded-full bg-primary/30 blur-2xl" aria-hidden />
      <div className="absolute -bottom-20 -start-10 size-56 rounded-full bg-orange/20 blur-2xl" aria-hidden />
      <div className={`relative flex flex-col gap-5 ${compact ? "" : "lg:flex-row lg:items-center lg:justify-between"}`}>
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={56} height={56} className="size-14 shrink-0 rounded-2xl bg-white p-1" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-orange">{common[lang].getApp}</p>
            <h2 className={`font-extrabold ${compact ? "text-lg" : "text-2xl"}`}>{t.getAppTitle}</h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/80">{t.getAppBody}</p>
          </div>
        </div>
        <StoreBadges lang={lang} className={compact ? "flex-col [&>a]:w-full" : ""} />
      </div>
    </section>
  );
}
