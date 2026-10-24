import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { localePath, type Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";

type Crumb = { label: string; href?: string };

/**
 * Inner-page header in the reference style. Plain: breadcrumb (sky ">>" orange) + blue title + optional
 * line. With `photo`: a wide photo banner with the title in white and an orange highlight.
 */
export function PageHeader({
  lang,
  crumbs = [],
  title,
  highlight,
  subtitle,
  photo,
  children,
}: {
  lang: Locale;
  crumbs?: Crumb[];
  title: ReactNode;
  highlight?: ReactNode;
  subtitle?: ReactNode;
  photo?: string;
  children?: ReactNode;
}) {
  const all: Crumb[] = [{ label: common[lang].nav.home, href: localePath(lang) }, ...crumbs];
  const trail = (
    <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-1 text-sm font-bold">
      {all.map((c, i) => {
        const last = i === all.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {c.href && !last ? (
              <Link href={c.href} className="text-primary hover:underline">
                {c.label}
              </Link>
            ) : (
              <span className={last ? "text-orange" : "text-primary"}>{c.label}</span>
            )}
            {!last && <span className="text-primary">&gt;&gt;</span>}
          </span>
        );
      })}
    </nav>
  );

  if (photo)
    return (
      <section className="relative overflow-hidden bg-[#2b2b2b] text-white">
        <Image src={photo} alt="" fill priority sizes="100vw" className="object-cover rtl:-scale-x-100" />
        <div className="absolute inset-0 bg-black/55 md:bg-transparent md:bg-gradient-to-l md:from-black/75 md:via-black/50 md:to-black/10" />
        <div className="relative mx-auto flex min-h-[260px] max-w-6xl flex-col justify-center px-4 py-10 md:min-h-[420px] md:items-end md:text-end rtl:md:items-start rtl:md:text-start">
          <h1 className="max-w-xl text-[28px] font-bold leading-snug md:text-[32px]">
            {highlight && <span className="text-orange">{highlight} </span>}
            {title}
          </h1>
          {subtitle && <div className="mt-3 max-w-xl text-white/90">{subtitle}</div>}
          {children}
        </div>
      </section>
    );

  return (
    <section className="bg-white dark:bg-canvas">
      <div className="mx-auto max-w-6xl px-4 pb-6 pt-8">
        {trail}
        <h1 className="mt-6 text-[30px] font-bold leading-tight text-section md:text-[34px] dark:text-primary-light">
          {highlight && <span className="text-orange">{highlight} </span>}
          {title}
        </h1>
        {subtitle && <div className="mt-2 text-base text-navy-2 dark:text-ink-2">{subtitle}</div>}
        {children}
      </div>
    </section>
  );
}
