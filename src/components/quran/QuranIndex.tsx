"use client";
// Qur'an index (the app's AlMosalyQuranIndex): Surahs / Juz tabs, diacritics-insensitive search,
// "continue reading" from the last page read. Every row opens the mushaf at its page.
import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";
import { isRtl, localePath, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { common } from "@/i18n/messages/common";
import { fill, quran } from "@/i18n/messages/quran";
import { localDigits } from "@/lib/digits";
import { arabicIndic, hizbTitleAr, juzTitleAr, QUARTERS, searchSurahs, SURAHS, surahName, surahOfPage, type Quarter } from "@/lib/quran/data";
import { useLastRead } from "@/lib/quran/client";
import { quranPageHref } from "@/lib/quran/href";
import { usePlayer } from "@/lib/player/usePlayer";
import { PIcon } from "@/components/player/PlayerIcons";
import { player } from "@/i18n/messages/player";

export function QuranIndex({ lang }: { lang: Locale }) {
  const t = quran[lang];
  const arabic = lang === "ar";
  const [tab, setTab] = useState<"surah" | "juz">("surah");
  const [query, setQuery] = useState("");
  const last = useLastRead();
  const audio = usePlayer();

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
      <PageHeader lang={lang} crumbs={[{ label: common[lang].nav.quran }]} title={t.title} subtitle={t.heroSub} photo="/images/ref/catHeader1.webp">
        {/* 73:4, text from the app's qpc-hafs.json */}
        <p className="quran mt-4 text-2xl leading-loose text-white sm:text-[26px]" dir="rtl" lang="ar">
          ﴿أَوۡ زِدۡ عَلَيۡهِ وَرَتِّلِ ٱلۡقُرۡءَانَ تَرۡتِيلًا﴾ <span className="font-sans text-sm text-white/75">[المزمل: ٤]</span>
        </p>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 pt-10">
        {/* search (tinted box with a pill field, as the reference) + continue reading */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-[15px] bg-tint p-4 sm:p-5">
            <div className="relative">
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setTab("surah");
                }}
                placeholder={appT(lang, "quranIndex.searchSurah")}
                aria-label={appT(lang, "quranIndex.searchSurah")}
                className="h-14 w-full rounded-full bg-white ps-6 pe-12 text-base text-navy-2 shadow-[0_3px_10px_rgba(124,180,200,0.35)] outline-none ring-2 ring-edge/70 placeholder:text-ink-2 focus:ring-primary dark:bg-canvas dark:text-ink"
              />
              <Icon name="search" className="pointer-events-none absolute end-5 top-1/2 size-5 -translate-y-1/2 text-navy-2 dark:text-ink" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 rounded-[15px] bg-card p-4 shadow-[0_5px_25px_rgba(0,0,0,0.16)] sm:flex-nowrap sm:p-5 dark:shadow-none dark:ring-1 dark:ring-line">
            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-white">
              <Icon name={last ? "bookmark" : "quran"} className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-section dark:text-primary-light">{last ? appT(lang, "quranIndex.continueReading") : t.startReading}</div>
              <div className="truncate text-sm text-navy-2 dark:text-ink-2">
                {last ? `${fill(t.lastRead, { page: digits(last.page) })} · ${surahName(lang, surahOfPage(last.page))}` : `${surahName(lang, 1)} · ${t.page} ${digits(1)}`}
              </div>
            </div>
            <Link href={pageHref(last?.page ?? 1)} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-deep sm:w-auto">
              {last ? appT(lang, "quranIndex.continueReading") : t.startReading}
              <Icon name="chevron" className="size-4" flip />
            </Link>
          </div>
        </div>

        {/* tabs */}
        <div role="tablist" className="mt-8 flex flex-wrap items-center gap-2">
          {(["surah", "juz"] as const).map((k) => (
            <button
              key={k}
              role="tab"
              type="button"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`rounded-full px-6 py-3 text-[15px] font-bold transition ${tab === k ? "bg-navy text-white shadow-sm" : "text-navy-2 hover:text-primary dark:text-ink"}`}
            >
              {arabic ? (k === "surah" ? "السور" : "الأجزاء") : appT(lang, k === "surah" ? "quranIndex.surahsTab" : "quranIndex.juzTab")}
            </button>
          ))}
          <Link href={localePath(lang, "/quran/listen/")} className="ms-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-primary ring-1 ring-primary hover:bg-tint">
            <PIcon name="headphones" className="size-4" />
            {appT(lang, "qaudio.title")}
          </Link>
        </div>

        {tab === "surah" ? (
          results.length ? (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((s) => {
                const type = appT(lang, s.type === "meccan" ? "quranIndex.meccan" : "quranIndex.madinan");
                return (
                  <li key={s.n} className="relative">
                    <Link href={pageHref(s.page)} className="group flex items-center gap-3 rounded-xl bg-white p-3.5 pe-16 shadow-[0_3px_10px_rgba(124,180,200,0.3)] ring-2 ring-edge/70 transition hover:-translate-y-0.5 hover:ring-primary dark:bg-card">
                      <NumberBadge label={digits(s.n)} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[16px] font-bold text-section group-hover:text-primary dark:text-primary-light">{arabic ? `سورة ${s.ar}` : surahName(lang, s.n)}</div>
                        <div className="mt-0.5 flex items-center gap-1 truncate text-[13px] text-navy-2 dark:text-ink-2">
                          <Icon name="location" className="size-3.5 shrink-0 text-orange" />
                          {arabic ? `${type} - آياتها ${arabicIndic(s.ayahs)}` : `${type} · ${appT(lang, "carplay.ayahCount", { n: digits(s.ayahs) })}`}
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-0.5 text-end">
                        {!arabic ? (
                          <span className="quran text-xl leading-tight text-navy-2 dark:text-ink" dir="rtl" lang="ar">
                            {s.ar}
                          </span>
                        ) : null}
                        <span className="text-xs font-semibold text-primary">{arabic ? `صفحة ${arabicIndic(s.page)}` : appT(lang, "quranIndex.page").replace("{0}", digits(s.page))}</span>
                      </div>
                    </Link>
                    <button
                      type="button"
                      onClick={() => (audio.visible && audio.surah === s.n ? audio.toggle() : audio.playSurah(audio.reciter, s.n))}
                      aria-label={audio.visible && audio.surah === s.n && audio.playing ? player[lang].pause : fill(player[lang].listenSurah, { surah: surahName(lang, s.n) })}
                      title={player[lang].listen}
                      className="absolute end-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-primary text-white shadow-sm transition hover:bg-primary-deep"
                    >
                      <PIcon name={audio.visible && audio.surah === s.n && audio.playing ? "pause" : "play"} className="size-[18px]" />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-10 text-center font-bold text-section dark:text-primary-light">{common[lang].noResults}</p>
          )
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {juzSections.map(({ juz, items }) => (
              <section key={juz}>
                <h2 className="flex items-center justify-between rounded-md bg-tint px-4 py-3 text-[17px] font-bold text-navy-2 dark:text-ink">
                  <span>{arabic ? juzTitleAr(juz) : appT(lang, "quranIndex.juz").replace("{0}", digits(juz))}</span>
                  <Link href={pageHref(items[0].q.p)} className="text-xs font-bold text-primary hover:underline">
                    {arabic ? `صفحة ${arabicIndic(items[0].q.p)}` : appT(lang, "quranIndex.page").replace("{0}", digits(items[0].q.p))}
                  </Link>
                </h2>
                <ul className="divide-y divide-line px-1">
                  {items.map(({ q, idx }) => {
                    const quarter = idx % 4;
                    const hizb = Math.floor(idx / 4) + 1;
                    return (
                      <li key={idx}>
                        <Link href={pageHref(q.p)} className="flex items-center gap-3 rounded-md px-3 py-3 transition hover:bg-tint/60">
                          <QuarterStar quarter={quarter} hizb={hizb} />
                          <div className="min-w-0 flex-1">
                            {quarter === 0 ? <div className="text-xs font-semibold text-orange">{arabic ? hizbTitleAr(hizb) : appT(lang, "quranIndex.hizb").replace("{0}", digits(hizb))}</div> : null}
                            <div className="quran truncate text-[19px] leading-9 text-navy-2 dark:text-ink" dir="rtl" lang="ar" style={{ textAlign: isRtl(lang) ? "right" : "left" }}>
                              {q.t}
                            </div>
                            <div className="truncate text-xs text-ink-2">
                              {arabic ? `سورة ${SURAHS[q.s - 1].ar} – آية ${arabicIndic(q.a)}` : appT(lang, "quranIndex.surahAyah").replace("{0}", surahName(lang, q.s)).replace("{1}", digits(q.a))}
                            </div>
                          </div>
                          <span className="shrink-0 text-xs font-bold text-primary">{digits(q.p)}</span>
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
        <rect x="9" y="9" width="26" height="26" rx="4" className="fill-tint stroke-primary/60" strokeWidth="1.5" />
        <rect x="9" y="9" width="26" height="26" rx="4" transform="rotate(45 22 22)" className="fill-tint stroke-primary/60" strokeWidth="1.5" />
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
