import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, localePath } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { athkar, fill } from "@/i18n/messages/athkar";
import { CATEGORIES, FEATURED } from "@/lib/athkar/data";
import { localDigits } from "@/lib/digits";
import { iconFor } from "@/components/athkar/CategoryIcon";
import { HisnGrid } from "@/components/athkar/HisnGrid";
import { PageHeader } from "@/components/ui/PageHeader";

export async function generateMetadata({ params }: PageProps<"/[lang]/athkar">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = athkar[lang];
  return { title: t.title, description: t.description, alternates: alternates(lang, "/athkar/") };
}

export default async function AthkarPage({ params }: PageProps<"/[lang]/athkar">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = athkar[lang];
  const count = (n: number) => fill(t.count, { count: localDigits(lang, n) });

  const chapters = CATEGORIES.map((c) => ({
    id: c.id,
    title: c.t[lang],
    ar: c.t.ar,
    icon: iconFor(c.t.ar),
    n: c.n,
  }));

  return (
    <div className="pb-16">
      <PageHeader
        lang={lang}
        crumbs={[{ label: t.title }]}
        title={t.title}
        subtitle={
          <span dir={lang === "ar" ? "rtl" : undefined} className={lang === "ar" ? "quran text-xl" : undefined}>
            {t.subtitle}
          </span>
        }
      />

      <div className="mx-auto max-w-6xl px-4">
        <h2 className="sr-only">{t.daily}</h2>
        <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {FEATURED.map((f) => {
            const c = CATEGORIES.find((x) => x.id === f.id);
            return (
              <li key={f.id}>
                <Link
                  href={localePath(lang, `/athkar/${f.id}/`)}
                  className="group block overflow-hidden rounded-[15px] shadow-[0_5px_25px_rgba(0,0,0,0.16)] transition hover:-translate-y-1"
                  style={{ background: f.bg }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/data/athkar/img/${f.img}`} alt="" width={200} height={200} className="mx-auto h-28 w-full object-cover" />
                  <div className="px-2 pb-3 text-center">
                    <div className="text-sm font-bold" style={{ color: f.fg }}>
                      {t.cats[f.key]}
                    </div>
                    {c && <div className="mt-0.5 text-xs text-[#7C8A99]">{count(c.n)}</div>}
                  </div>
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={localePath(lang, "/tasbeeh/")}
              className="group block overflow-hidden rounded-[15px] bg-card shadow-[0_5px_25px_rgba(0,0,0,0.16)] transition hover:-translate-y-1"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/data/athkar/img/azcard_tasbih.png" alt="" width={200} height={200} className="mx-auto h-28 w-full object-cover" />
              <div className="px-2 pb-3 text-center">
                <div className="text-sm font-bold text-section dark:text-primary-light">{t.tasbih}</div>
                <div className="mt-0.5 line-clamp-1 text-xs text-[#7C8A99]">{t.tasbihSub}</div>
              </div>
            </Link>
          </li>
        </ul>

        <section className="mt-14">
          <h2 className="text-[28px] font-bold text-section sm:text-[34px] dark:text-primary-light">{t.hisn}</h2>
          <div className="mt-4 flex items-center gap-4 rounded-md bg-tint px-4 py-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/data/athkar/img/hisn_book.png" alt="" width={130} height={110} className="h-12 w-auto" />
            <p className="min-w-0 flex-1 font-bold text-navy-2 dark:text-ink">
              {t.hisnSub} · <span className="text-primary">{count(CATEGORIES.reduce((a, c) => a + c.n, 0))}</span>
            </p>
          </div>
          <HisnGrid
            lang={lang}
            chapters={chapters}
            labels={{ search: t.search, noResults: t.noResults, count: t.count, done: t.done }}
          />
        </section>
      </div>
    </div>
  );
}
