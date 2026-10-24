import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dir, isLocale, localePath, locales } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { names } from "@/i18n/messages/names";
import { NAMES, nameText } from "@/lib/athkar/data";
import { localDigits } from "@/lib/digits";
import { Icon } from "@/components/ui/Icon";

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
      <section className="bg-gradient-to-b from-navy to-navy-2 px-4 pt-6 pb-24 text-white">
        <div className="mx-auto max-w-3xl">
          <Link href={localePath(lang, "/names/")} className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-white/80 hover:bg-white/10">
            <Icon name="chevron" className="size-4 ltr:rotate-180" />
            {t.all}
          </Link>
          <div className="mt-4 text-center">
            <p className="text-sm font-semibold text-white/60">{t.nth.replace("{n}", localDigits(lang, x.n))}</p>
            <h1 dir="rtl" lang="ar" className="quran mt-2 text-6xl leading-[1.5] text-gold sm:text-7xl">
              {x.ar}
            </h1>
            <p className="mt-2 text-lg font-semibold text-primary-light">{x.tl}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto -mt-14 max-w-3xl px-4">
        <article className="rounded-3xl bg-card p-5 shadow-[0_6px_14px_rgba(22,40,70,0.08)] ring-1 ring-line sm:p-8">
          {lang !== "ar" && (
            <>
              <h2 className="text-xs font-bold tracking-wide text-ink-2 uppercase">{t.meaning}</h2>
              <p dir={textDir} className="mt-1 text-2xl font-bold text-ink">
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
                  <li key={r} className="rounded-full bg-tint px-3 py-1 text-sm font-semibold text-primary tabular-nums">
                    {localDigits(lang, r)}
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>

        <nav className="mt-5 grid grid-cols-2 gap-3">
          {prev ? (
            <Link href={localePath(lang, `/names/${prev.n}/`)} className="flex items-center gap-2 rounded-2xl bg-card p-3 ring-1 ring-line hover:ring-primary/40">
              <Icon name="chevron" className="size-4 shrink-0 text-ink-2 ltr:rotate-180" />
              <span className="min-w-0">
                <span className="block text-xs text-ink-2">{t.prev}</span>
                <span dir="rtl" lang="ar" className="quran block truncate text-xl text-ink">
                  {prev.ar}
                </span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={localePath(lang, `/names/${next.n}/`)} className="flex items-center justify-end gap-2 rounded-2xl bg-card p-3 text-end ring-1 ring-line hover:ring-primary/40">
              <span className="min-w-0">
                <span className="block text-xs text-ink-2">{t.next}</span>
                <span dir="rtl" lang="ar" className="quran block truncate text-xl text-ink">
                  {next.ar}
                </span>
              </span>
              <Icon name="chevron" className="size-4 shrink-0 text-ink-2 rtl:rotate-180" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
