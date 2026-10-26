"use client";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { calendarMsg } from "@/i18n/messages/calendar";
import { common } from "@/i18n/messages/common";
import { PageHeader } from "@/components/ui/PageHeader";
import { CARD } from "@/components/prayer/prayerUi";
import { Icon } from "@/components/ui/Icon";
import { localDigits } from "@/lib/digits";
import {
  addDays,
  formatGregorian,
  formatHijri,
  fromHijri,
  hijriMonthLength,
  hijriMonthName,
  hijriYear,
  sameYmd,
  toHijri,
  utcNoon,
  weekdayName,
  type Ymd,
} from "@/lib/calendar/hijri";
import { occasionOn, OCCASIONS, upcomingOccasions, WHITE_DAYS } from "@/lib/calendar/occasions";
import { useMounted } from "@/lib/prayer/store";

// 2024-01-07 is a Sunday; weeks start on Sunday like the app
const WEEK = Array.from({ length: 7 }, (_, i) => ({ y: 2024, m: 1, d: 7 + i }));

function deviceToday(): Ymd {
  const n = new Date();
  return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
}

export function CalendarView({ lang }: { lang: Locale }) {
  const t = calendarMsg[lang];
  const mounted = useMounted();
  // before mount, a fixed day keeps the server HTML and hydration identical
  const today = mounted ? deviceToday() : null;
  const th = today ? toHijri(today) : null;
  const [sel, setSel] = useState<{ hy: number; hm: number } | null>(null);
  const cur = sel ?? (th ? { hy: th.hy, hm: th.hm } : { hy: 1448, hm: 1 });
  const n = (v: number) => localDigits(lang, v);

  const grid = (() => {
    const first = fromHijri(cur.hy, cur.hm, 1)!;
    const len = hijriMonthLength(cur.hy, cur.hm);
    const lead = utcNoon(first.y, first.m, first.d).getUTCDay();
    const total = Math.ceil((lead + len) / 7) * 7;
    return Array.from({ length: total }, (_, i) => {
      const g = addDays(first, i - lead);
      const h = toHijri(g);
      return { g, h, inMonth: i >= lead && i < lead + len };
    });
  })();

  const inMonth = grid.filter((c) => c.inMonth);
  const gFirst = inMonth[0].g;
  const gLast = inMonth[inMonth.length - 1].g;
  const gSpan =
    gFirst.m === gLast.m
      ? formatGregorian(lang, gFirst, { month: "long", year: "numeric" })
      : `${formatGregorian(lang, gFirst, gFirst.y === gLast.y ? { month: "long" } : { month: "long", year: "numeric" })} – ${formatGregorian(lang, gLast, { month: "long", year: "numeric" })}`;

  const shift = (d: number) => {
    let hm = cur.hm + d;
    let hy = cur.hy;
    if (hm < 1) {
      hm = 12;
      hy--;
    }
    if (hm > 12) {
      hm = 1;
      hy++;
    }
    setSel({ hy, hm });
  };

  const monthOccasions = OCCASIONS.filter((o) => o.hm === cur.hm);
  const upcoming = today ? upcomingOccasions(today).slice(0, 6) : [];
  const isCurrent = th && th.hy === cur.hy && th.hm === cur.hm;

  return (
    <>
      <PageHeader
        lang={lang}
        crumbs={[{ label: common[lang].nav.calendar }]}
        title={t.title}
        subtitle={today && th ? <span className="font-bold">{weekdayName(lang, today)} · <span className="text-orange">{formatHijri(lang, th)}</span> · {formatGregorian(lang, today)}</span> : <span>&nbsp;</span>}
      />
      <div className="mx-auto max-w-6xl px-4 pb-12">

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* month grid */}
        <section className={`overflow-hidden ${CARD} bg-white dark:bg-card`}>
          <div className="flex items-center justify-between gap-2 bg-navy px-3 py-3 text-white sm:px-5">
            <button type="button" onClick={() => shift(-1)} aria-label={t.prevMonth} className="grid size-10 shrink-0 place-items-center rounded-full bg-primary shadow hover:bg-primary-deep">
              <Icon name="chevron" className="size-5 ltr:-scale-x-100" />
            </button>
            <div className="min-w-0 text-center">
              <p className="text-lg font-bold sm:text-xl">
                {lang === "zh" ? (
                  <>
                    <span className="text-orange">{hijriYear(lang, cur.hy)}</span>
                    {hijriMonthName(lang, cur.hm)}
                  </>
                ) : (
                  <>
                    {hijriMonthName(lang, cur.hm)} <span className="text-orange">{n(cur.hy)} {appT(lang, "hijri.suffix")}</span>
                  </>
                )}
              </p>
              <p className="text-xs text-white/85 sm:text-sm">{gSpan}</p>
            </div>
            <button type="button" onClick={() => shift(1)} aria-label={t.nextMonth} className="grid size-10 shrink-0 place-items-center rounded-full bg-primary shadow hover:bg-primary-deep">
              <Icon name="chevron" className="size-5 rtl:-scale-x-100" />
            </button>
          </div>
          <div className="p-2 sm:p-4">
            <div className="mb-2 grid grid-cols-7 gap-1 rounded-md bg-tint py-2.5 text-center text-[11px] font-bold text-navy-2 sm:text-xs dark:text-ink-2">
              {WEEK.map((g) => (
                <div key={g.d} className="truncate">
                  {weekdayName(lang, g, "short")}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {grid.map(({ g, h, inMonth: im }) => {
                const isToday = today && sameYmd(today, g);
                const occ = im ? occasionOn(h) : null;
                const white = im && WHITE_DAYS.includes(h.hd);
                return (
                  <div
                    key={`${g.y}-${g.m}-${g.d}`}
                    title={occ ? appT(lang, occ.label) : white ? appT(lang, "fasting.whiteDays") : undefined}
                    className={`relative flex aspect-square flex-col items-center justify-center rounded-xl sm:aspect-[1.15] ${
                      isToday ? "bg-primary text-white shadow" : occ ? "text-navy-2 dark:text-ink" : im ? "text-navy-2 dark:text-ink" : "text-ink-2/50"
                    }`}
                    style={occ && !isToday ? { background: `${occ.color}22` } : undefined}
                  >
                    <span className={`text-base font-extrabold leading-none sm:text-xl ${white && !isToday ? "text-[#B8860B] dark:text-gold" : ""}`}>{n(h.hd)}</span>
                    <span className={`mt-1 text-[10px] leading-none sm:text-xs ${isToday ? "text-white/85" : "text-ink-2"} ${im ? "" : "opacity-60"}`}>
                      {n(g.d)}
                      {g.d === 1 && im ? ` ${formatGregorian(lang, g, { month: "short" })}` : ""}
                    </span>
                    {occ && <span className="absolute bottom-1 size-1.5 rounded-full sm:bottom-1.5" style={{ background: isToday ? "#fff" : occ.color }} />}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-xs text-ink-2">
              <span className="inline-flex items-center gap-1.5">
                <span className="size-3 rounded bg-primary" /> {appT(lang, "countdown.today")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="font-extrabold text-[#B8860B] dark:text-gold">{n(13)}</span> {appT(lang, "fasting.whiteDays")}
              </span>
              {!isCurrent && th && (
                <button type="button" onClick={() => setSel(null)} className="ms-auto rounded-full px-5 py-1.5 font-bold text-navy-2 ring-1 ring-primary hover:bg-tint dark:text-white">
                  {appT(lang, "countdown.today")}
                </button>
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[15px] bg-[#EFEFEF] p-6 dark:bg-card">
            <h2 className="mb-4 text-xl font-bold text-section dark:text-primary-light">
              {t.occasionsMonth} — {hijriMonthName(lang, cur.hm)}
            </h2>
            {monthOccasions.length === 0 && <p className="text-sm text-ink-2">{t.noOccasions}</p>}
            <ul className="space-y-2">
              {monthOccasions.map((o) => {
                const g = fromHijri(cur.hy, cur.hm, Math.min(o.hd, hijriMonthLength(cur.hy, cur.hm)));
                return (
                  <li key={o.key} className="flex items-center gap-3 rounded-xl bg-white p-2 ring-2 ring-edge/50 dark:bg-canvas">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg text-sm font-extrabold text-white" style={{ background: o.color }}>
                      {n(o.hd)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-navy-2 dark:text-ink">{appT(lang, o.label)}</span>
                      {g && <span className="block text-xs text-ink-2">{formatGregorian(lang, g, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="rounded-[15px] bg-[#EFEFEF] p-6 dark:bg-card">
            <h2 className="mb-3 text-xl font-bold text-section dark:text-primary-light">{appT(lang, "alm.occasions.upcoming")}</h2>
            <ul className="divide-y divide-black/10 dark:divide-line">
              {upcoming.map((o) => (
                <li key={o.key} className="flex items-center gap-3 py-2.5">
                  <span className="size-2.5 shrink-0 rounded-full" style={{ background: o.color }} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-navy-2 dark:text-ink">{appT(lang, o.label)}</span>
                    <span className="block text-xs text-ink-2">{formatGregorian(lang, o.g!)}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary ring-1 ring-primary dark:bg-canvas">
                    {o.days === 0
                      ? appT(lang, "countdown.today")
                      : o.days === 1
                        ? appT(lang, "countdown.tomorrow")
                        : appT(lang, "alm.occasions.inDays", { n: n(o.days) })}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

        <Converter lang={lang} today={today} />
        <p className="mt-4 text-center text-xs text-ink-2">{t.note}</p>
      </div>
    </>
  );
}

const pad = (v: number) => String(v).padStart(2, "0");
const field = "h-11 w-full rounded-full bg-white px-4 text-sm font-semibold text-navy-2 outline-none ring-2 ring-edge/70 focus:ring-primary dark:bg-card dark:text-ink";

function Converter({ lang, today }: { lang: Locale; today: Ymd | null }) {
  const t = calendarMsg[lang];
  const base = today ?? { y: 2026, m: 1, d: 1 };
  const [gStr, setGStr] = useState<string | null>(null);
  const gValue = gStr ?? `${base.y}-${pad(base.m)}-${pad(base.d)}`;
  const [hIn, setHIn] = useState<{ hy: number; hm: number; hd: number } | null>(null);
  const h0 = hIn ?? toHijri(base);

  const gParts = gValue.split("-").map(Number);
  const gOk = gParts.length === 3 && gParts.every(Number.isFinite) && gParts[0] > 1900 && gParts[0] < 2077;
  const gResult = gOk ? toHijri({ y: gParts[0], m: gParts[1], d: gParts[2] }) : null;
  const hResult = h0.hy >= 1300 && h0.hy <= 1500 ? fromHijri(h0.hy, h0.hm, h0.hd) : null;

  return (
    <section className={`mt-10 ${CARD} p-5 sm:p-6`}>
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-section dark:text-primary-light">
        <Icon name="calendar" className="size-5 text-primary" />
        {t.converter}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-md bg-tint p-4">
          <p className="mb-2 text-sm font-bold text-navy-2 dark:text-ink">{t.gToH}</p>
          <input type="date" value={gValue} min="1900-04-30" max="2076-11-16" onChange={(e) => setGStr(e.target.value)} className={field} aria-label={t.gToH} />
          <p className="mt-3 text-lg font-extrabold text-primary">{gResult ? formatHijri(lang, gResult) : "—"}</p>
          {gResult && gOk && <p className="text-sm text-ink-2">{weekdayName(lang, { y: gParts[0], m: gParts[1], d: gParts[2] })}</p>}
        </div>
        <div className="rounded-md bg-tint p-4">
          <p className="mb-2 text-sm font-bold text-navy-2 dark:text-ink">{t.hToG}</p>
          <div className="grid grid-cols-[1fr_2fr_1.3fr] gap-2">
            <select value={h0.hd} onChange={(e) => setHIn({ ...h0, hd: Number(e.target.value) })} className={field} aria-label={t.day}>
              {Array.from({ length: 30 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {localDigits(lang, i + 1)}
                </option>
              ))}
            </select>
            <select value={h0.hm} onChange={(e) => setHIn({ ...h0, hm: Number(e.target.value) })} className={field} aria-label={t.month}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {hijriMonthName(lang, i + 1)}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={1300}
              max={1500}
              value={h0.hy}
              onChange={(e) => setHIn({ ...h0, hy: Number(e.target.value) })}
              className={field}
              aria-label={t.year}
            />
          </div>
          <p className="mt-3 text-lg font-extrabold text-primary">{hResult ? formatGregorian(lang, hResult, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "—"}</p>
          {!hResult && <p className="text-sm text-orange">{t.invalid}</p>}
        </div>
      </div>
    </section>
  );
}
