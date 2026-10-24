"use client";
// Qur'an index (the app's AlMosalyQuranIndex): Surahs / Juz tabs, diacritics-insensitive search,
// "continue reading" from the last page read. Every row opens the mushaf at its page.
import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { isRtl, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { common } from "@/i18n/messages/common";
import { fill, quran } from "@/i18n/messages/quran";
import { localDigits } from "@/lib/digits";
import { arabicIndic, hizbTitleAr, juzTitleAr, QUARTERS, searchSurahs, SURAHS, surahName, surahOfPage, type Quarter } from "@/lib/quran/data";
import { useLastRead } from "@/lib/quran/client";
import { quranPageHref } from "@/lib/quran/href";

export function QuranIndex({ lang }: { lang: Locale }) {
  const t = quran[lang];
  const arabic = lang === "ar";
  const [tab, setTab] = useState<"surah" | "juz">("surah");
  const [query, setQuery] = useState("");
  const last = useLastRead();

  const results = useMemo(() => searchSurahs(query), [query]);
  const digits = (n: number) => localDigits(lang, n);
  const pageHref = (p: number) => quranPageHref(lang, p);

  const juzSections = useMemo(() => {
    const out: { juz: number; items: { q: Quarter; idx: number }[] }[] = [];
    QUARTERS.forEach((q, idx) => {
      if (!out.length || out[out.length - 1].juz !== q.j) out.push({ juz: q.j, items: [] });
      out[out.length - 1].items.push({ q, idx });
    });
    return out;
  }, []);

  return (
    <div className="pb-16">
      {/* hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_20%_20%,#29ABE2_0,transparent_45%),radial-gradient(circle_at_85%_70%,#F47A1F_0,transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 sm:pt-14">
          {/* 73:4, text from the app's qpc-hafs.json */}
          <p className="quran text-2xl leading-loose text-gold sm:text-3xl" dir="rtl" lang="ar" style={{ textAlign: isRtl(lang) ? "right" : "left" }}>
            ﴿أَوۡ زِدۡ عَلَيۡهِ وَرَتِّلِ ٱلۡقُرۡءَانَ تَرۡتِيلًا﴾ <span className="font-sans text-sm text-white/60">[المزمل: ٤]</span>
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{t.title}</h1>
          <p className="mt-2 max-w-2xl text-white/75">{t.heroSub}</p>
          <div className="relative mt-6 max-w-xl">
            <Icon name="search" className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-ink-2" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setTab("surah");
              }}
              placeholder={appT(lang, "quranIndex.searchSurah")}
              aria-label={appT(lang, "quranIndex.searchSurah")}
              className="h-12 w-full rounded-2xl border-0 bg-white ps-12 pe-4 text-base text-[#16202B] shadow-lg outline-none ring-2 ring-transparent placeholder:text-[#7C8A99] focus:ring-primary-light"
            />
          </div>
        </div>
      </section>

      <div className="relative mx-auto -mt-12 max-w-6xl px-4">
        {/* continue reading / start */}
        <div className="flex flex-wrap items-center gap-3 rounded-3xl bg-card p-4 shadow-[0_10px_30px_-12px_rgba(13,36,94,0.25)] ring-1 ring-line sm:flex-nowrap sm:p-5">
          <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-tint text-primary">
            <Icon name={last ? "bookmark" : "quran"} className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-bold text-ink">{last ? appT(lang, "quranIndex.continueReading") : t.startReading}</div>
            <div className="truncate text-sm text-ink-2">
              {last ? `${fill(t.lastRead, { page: digits(last.page) })} · ${surahName(lang, surahOfPage(last.page))}` : `${surahName(lang, 1)} · ${t.page} ${digits(1)}`}
            </div>
          </div>
          <Link href={pageHref(last?.page ?? 1)} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange px-5 py-2.5 sm:w-auto text-sm font-bold text-white shadow-sm hover:brightness-105">
            {last ? appT(lang, "quranIndex.continueReading") : t.startReading}
            <Icon name="chevron" className="size-4" flip />
          </Link>
        </div>

        {/* tabs */}
        <div role="tablist" className="mx-auto mt-6 grid max-w-md grid-cols-2 rounded-2xl bg-card p-1 shadow-sm ring-1 ring-line">
          {(["surah", "juz"] as const).map((k) => (
            <button
              key={k}
              role="tab"
              type="button"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`rounded-xl py-2.5 text-[15px] font-bold transition ${tab === k ? "bg-primary text-white shadow" : "text-ink-2 hover:text-ink"}`}
            >
              {arabic ? (k === "surah" ? "السور" : "الأجزاء") : appT(lang, k === "surah" ? "quranIndex.surahsTab" : "quranIndex.juzTab")}
            </button>
          ))}
        </div>

        {tab === "surah" ? (
          results.length ? (
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((s) => {
                const type = appT(lang, s.type === "meccan" ? "quranIndex.meccan" : "quranIndex.madinan");
                return (
                  <li key={s.n}>
                    <Link href={pageHref(s.page)} className="group flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-sm ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/40">
                      <NumberBadge label={digits(s.n)} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[16px] font-bold text-ink group-hover:text-primary">{arabic ? `سورة ${s.ar}` : surahName(lang, s.n)}</div>
                        <div className="mt-0.5 flex items-center gap-1 truncate text-[13px] text-ink-2">
                          <Icon name="location" className="size-3.5 shrink-0 text-orange" />
                          {arabic ? `${type} - آياتها ${arabicIndic(s.ayahs)}` : `${type} · ${appT(lang, "carplay.ayahCount", { n: digits(s.ayahs) })}`}
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-0.5 text-end">
                        {!arabic ? (
                          <span className="quran text-xl leading-tight text-section dark:text-primary-light" dir="rtl" lang="ar">
                            {s.ar}
                          </span>
                        ) : null}
                        <span className="text-xs font-semibold text-ink-2">{arabic ? `صفحة ${arabicIndic(s.page)}` : appT(lang, "quranIndex.page").replace("{0}", digits(s.page))}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-10 text-center text-ink-2">{common[lang].noResults}</p>
          )
        ) : (
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {juzSections.map(({ juz, items }) => (
              <section key={juz} className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-line">
                <h2 className="flex items-center justify-between bg-tint px-4 py-2.5 text-[15px] font-bold text-section dark:text-primary-light">
                  <span>{arabic ? juzTitleAr(juz) : appT(lang, "quranIndex.juz").replace("{0}", digits(juz))}</span>
                  <Link href={pageHref(items[0].q.p)} className="text-xs font-semibold text-primary hover:underline">
                    {arabic ? `صفحة ${arabicIndic(items[0].q.p)}` : appT(lang, "quranIndex.page").replace("{0}", digits(items[0].q.p))}
                  </Link>
                </h2>
                <ul className="divide-y divide-line">
                  {items.map(({ q, idx }) => {
                    const quarter = idx % 4;
                    const hizb = Math.floor(idx / 4) + 1;
                    return (
                      <li key={idx}>
                        <Link href={pageHref(q.p)} className="flex items-center gap-3 px-4 py-3 transition hover:bg-tint/60">
                          <QuarterStar quarter={quarter} hizb={hizb} />
                          <div className="min-w-0 flex-1">
                            {quarter === 0 ? <div className="text-xs font-semibold text-orange">{arabic ? hizbTitleAr(hizb) : appT(lang, "quranIndex.hizb").replace("{0}", digits(hizb))}</div> : null}
                            <div className="quran truncate text-[19px] leading-9 text-ink" dir="rtl" lang="ar" style={{ textAlign: isRtl(lang) ? "right" : "left" }}>
                              {q.t}
                            </div>
                            <div className="truncate text-xs text-ink-2">
                              {arabic ? `سورة ${SURAHS[q.s - 1].ar} – آية ${arabicIndic(q.a)}` : appT(lang, "quranIndex.surahAyah").replace("{0}", surahName(lang, q.s)).replace("{1}", digits(q.a))}
                            </div>
                          </div>
                          <span className="shrink-0 text-xs font-semibold text-ink-2">{digits(q.p)}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Surah number in an 8-point star badge. */
function NumberBadge({ label }: { label: string }) {
  return (
    <span className="relative grid size-11 shrink-0 place-items-center text-[13px] font-bold text-primary">
      <svg viewBox="0 0 44 44" className="absolute inset-0 size-full" aria-hidden>
        <rect x="9" y="9" width="26" height="26" rx="4" className="fill-tint stroke-primary/40" strokeWidth="1.5" />
        <rect x="9" y="9" width="26" height="26" rx="4" transform="rotate(45 22 22)" className="fill-tint stroke-primary/40" strokeWidth="1.5" />
      </svg>
      <span className="relative">{label}</span>
    </span>
  );
}

/** 8-point star: quarter 0 = hizb start (shows the hizb number), 1–3 = elapsed quarters (AlMosalyQuranIndex). */
function QuarterStar({ quarter, hizb, size = 38 }: { quarter: number; hizb: number; size?: number }) {
  const c = size / 2;
  const R = size / 2 - 1;
  const r = R * 0.78;
  const pts: [number, number][] = [];
  for (let k = 0; k < 16; k++) {
    const ang = (Math.PI * 2 * k) / 16 - Math.PI / 2;
    const rad = k % 2 === 0 ? R : r;
    pts.push([c + rad * Math.cos(ang), c + rad * Math.sin(ang)]);
  }
  const star = `M${pts.map((p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join("L")}Z`;
  const brownPts = quarter > 0 ? pts.slice(0, quarter * 4 + 1) : [];
  const brown = brownPts.length ? `M${c} ${c}L${brownPts.map((p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join("L")}Z` : "";
  return (
    <svg width={size} height={size} className="shrink-0" aria-hidden>
      <path d={star} fill="#E8902C" />
      {brown ? <path d={brown} fill="#8B6A4E" /> : null}
      {quarter > 0 ? (
        <path d={`M${c} ${c - R}L${c} ${c + R}M${c - R} ${c}L${c + R} ${c}`} stroke="#FFFFFF" strokeWidth={1} />
      ) : (
        <>
          <path d={`M${c - r * 0.55} ${c - r * 0.55}h${r * 1.1}v${r * 1.1}h${-r * 1.1}Z`} fill="none" stroke="#FFFFFF" strokeWidth={1.2} transform={`rotate(45 ${c} ${c})`} />
          <text x={c} y={c + size * 0.13} fontSize={size * 0.34} fontWeight="700" fill="#FFFFFF" textAnchor="middle">
            {hizb}
          </text>
        </>
      )}
    </svg>
  );
}
