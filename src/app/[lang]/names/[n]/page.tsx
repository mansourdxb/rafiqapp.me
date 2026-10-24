import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dir, isLocale, localePath, locales } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { names } from "@/i18n/messages/names";
import { NAMES, nameText } from "@/lib/athkar/data";
import { localDigits } from "@/lib/digits";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) => NAMES.map((x) => ({ lang, n: String(x.n) })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/names/[n]">): Promise<Metadata> {
  const { lang, n } = await params;
  const x = NAMES.find((y) => String(y.n) === n);
  if (!isLocale(lang) || !x) return {};
  const { meaning, desc } = nameText(lang, x);
  const title = lang === "ar" ? x.ar : `${x.tl} (${x.ar}) — ${meaning}`;
  return { title, description: desc.slice(0, 200), alternates: alternates(lang, `/names/${n}/`) };
}

export default async function NamePage({ params }: PageProps<"/[lang]/names/[n]">) {
  const { lang, n } = await params;
  if (!isLocale(lang)) notFound();
  const i = NAMES.findIndex((y) => String(y.n) === n);
  if (i < 0) notFound();
  const x = NAMES[i];
  const t = names[lang];
  const { meaning, desc, english } = nameText(lang, x);
  const prev = NAMES[i - 1];
  const next = NAMES[i + 1];
  const textDir = english ? "ltr" : dir(lang);

  return (
    <div className="pb-16">
      <PageHeader
        lang={lang}
        crumbs={[{ label: t.title, href: localePath(lang, "/names/") }, { label: lang === "ar" ? x.ar : x.tl }]}
        title={
          <span dir="rtl" lang="ar" className="quran text-5xl leading-[1.6] sm:text-6xl">
            {x.ar}
          </span>
        }
        subtitle={
          <span className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-orange px-3 py-1 text-sm font-bold text-white">{t.nth.replace("{n}", localDigits(lang, x.n))}</span>
            <span className="text-lg font-bold text-primary">{x.tl}</span>
          </span>
        }
      />

      <div className="mx-auto max-w-6xl px-4 [&>*]:max-w-3xl">
        <article className="rounded-[15px] bg-card p-5 shadow-[0_5px_25px_rgba(0,0,0,0.16)] sm:p-8">
          {lang !== "ar" && (
            <>
              <h2 className="text-xs font-bold tracking-wide text-ink-2 uppercase">{t.meaning}</h2>
              <p dir={textDir} className="mt-1 text-2xl font-bold text-section dark:text-primary-light">
                {meaning}
              </p>
            </>
          )}
          <h2 className={`text-xs font-bold tracking-wide text-ink-2 uppercase ${lang !== "ar" ? "mt-6" : ""}`}>{t.explanation}</h2>
          <p dir={textDir} className="mt-2 text-[17px] leading-8 text-ink">
            {desc}
          </p>
          {english && <p className="mt-3 text-xs text-ink-2">{t.englishNote}</p>}

          {x.q.length > 0 && (
            <>
              <h2 className="mt-6 text-xs font-bold tracking-wide text-ink-2 uppercase">{t.inQuran}</h2>
              <ul className="mt-2 flex flex-wrap gap-2" dir="ltr">
                {x.q.map((r) => (
                  <li key={r} className="rounded-full px-3 py-1 text-sm font-bold text-primary tabular-nums ring-1 ring-primary">
                    {localDigits(lang, r)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>

        <nav className="mt-6 grid grid-cols-2 gap-4">
          {prev ? (
            <Link href={localePath(lang, `/names/${prev.n}/`)} className="flex items-center gap-2 rounded-[15px] bg-card p-3 shadow-[0_5px_25px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5">
              <Icon name="chevron" className="size-4 shrink-0 text-primary ltr:rotate-180" />
              <span className="min-w-0">
                <span className="block text-xs text-ink-2">{t.prev}</span>
                <span dir="rtl" lang="ar" className="quran block truncate text-xl text-section dark:text-primary-light">
                  {prev.ar}
                </span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={localePath(lang, `/names/${next.n}/`)} className="flex items-center justify-end gap-2 rounded-[15px] bg-card p-3 text-end shadow-[0_5px_25px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5">
              <span className="min-w-0">
                <span className="block text-xs text-ink-2">{t.next}</span>
                <span dir="rtl" lang="ar" className="quran block truncate text-xl text-section dark:text-primary-light">
                  {next.ar}
                </span>
              </span>
              <Icon name="chevron" className="size-4 shrink-0 text-primary rtl:rotate-180" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
