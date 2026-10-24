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
import { Icon } from "@/components/ui/Icon";

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
      <section className="bg-gradient-to-b from-primary to-primary-deep px-4 pt-10 pb-20 text-center text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">{t.title}</h1>
        <p dir={lang === "ar" ? "rtl" : undefined} className={`mx-auto mt-3 max-w-xl text-white/85 ${lang === "ar" ? "quran text-xl" : "text-base"}`}>
          {t.subtitle}
        </p>
      </section>

      <div className="mx-auto -mt-12 max-w-6xl px-4">
        <h2 className="sr-only">{t.daily}</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {FEATURED.map((f) => {
            const c = CATEGORIES.find((x) => x.id === f.id);
            return (
              <li key={f.id}>
                <Link
                  href={localePath(lang, `/athkar/${f.id}/`)}
                  className="group block overflow-hidden rounded-3xl shadow-[0_6px_14px_rgba(22,40,70,0.08)] ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg dark:ring-white/10"
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
              className="group block overflow-hidden rounded-3xl bg-[#F2F2FF] shadow-[0_6px_14px_rgba(22,40,70,0.08)] ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg dark:ring-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/data/athkar/img/azcard_tasbih.png" alt="" width={200} height={200} className="mx-auto h-28 w-full object-cover" />
              <div className="px-2 pb-3 text-center">
                <div className="text-sm font-bold text-navy-2">{t.tasbih}</div>
                <div className="mt-0.5 line-clamp-1 text-xs text-[#7C8A99]">{t.tasbihSub}</div>
              </div>
            </Link>
          </li>
        </ul>

        <section className="mt-12">
          <div className="flex items-center gap-4 rounded-3xl bg-gradient-to-b from-[#039BCC] to-[#0286B4] p-5 text-white sm:p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/data/athkar/img/hisn_book.png" alt="" width={130} height={110} className="hidden h-20 w-auto sm:block" />
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold">{t.hisn}</h2>
              <p className="mt-1 text-sm text-white/85">
                {t.hisnSub} · {count(CATEGORIES.reduce((a, c) => a + c.n, 0))}
              </p>
            </div>
            <Icon name="athkar" className="size-10 shrink-0 text-white/40 sm:hidden" />
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
