"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { isRtl, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { prayerMsg } from "@/i18n/messages/prayer";
import { common } from "@/i18n/messages/common";
import { PageHeader } from "@/components/ui/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { localDigits } from "@/lib/digits";
import { computeDay, effectiveMethod, formatDuration, highLatitude, PRAYERS, ymdInTz, type Place, type PrayerSettings } from "@/lib/prayer/compute";
import { METHOD_LABEL, METHODS, type MethodKey } from "@/lib/prayer/methods";
import { settingsStore } from "@/lib/prayer/store";
import { formatGregorian, hijriMonthName, toHijri, weekdayName } from "@/lib/calendar/hijri";
import { LocationPicker } from "./LocationPicker";
import { CARD, dateLine, fmtTime, OUTLINED, PANEL, PILL, PRAYER_ICON_SRC, prayerName, useLive } from "./prayerUi";
import { useNow, usePlace, useSettings, type ShownPlace } from "./usePlace";
import { PRINT_CSS } from "./printCss";

export function PrayerTimesView({ lang }: { lang: Locale }) {
  const t = prayerMsg[lang];
  const place = usePlace(lang);
  const s = useSettings();
  const now = useNow(1000);
  const live = useLive(place, s, now);
  const fmt = fmtTime(lang, place, s);
  const date = now ? dateLine(lang, now, place.tz) : null;
  const nextKey = live?.mode === "since" ? live.current! : live?.next;
  const sep = isRtl(lang) ? "، " : ", ";
  const where = `${place.label}${place.countryLabel ? `${sep}${place.countryLabel}` : ""}`;

  return (
    <>
      <style>{PRINT_CSS}</style>
      <div className="no-print">
        <PageHeader
          lang={lang}
          crumbs={[{ label: common[lang].nav.prayer }]}
          title={
            <>
              {t.title} <span className="text-orange">{where}</span>
            </>
          }
        />
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-12">
        {/* place search + method + date, in a light-blue panel like the reference */}
        <div className={`no-print ${PANEL} grid gap-3`}>
          <LocationPicker lang={lang} />
          <div className="grid gap-3 md:grid-cols-[1fr_1fr_1.2fr]">
            <div className={PILL}>
              <Icon name="location" className="size-5 shrink-0 text-navy-2 dark:text-white" />
              <span className="min-w-0 truncate text-sm font-bold text-navy-2 dark:text-white">{where}</span>
            </div>
            <label className={`${PILL} relative cursor-pointer`}>
              <Icon name="settings" className="size-5 shrink-0 text-navy-2 dark:text-white" />
              <span className="min-w-0 flex-1 truncate text-sm font-bold text-navy-2 dark:text-white">{appT(lang, METHOD_LABEL[effectiveMethod(place, s)])}</span>
              <Icon name="chevron" className="size-4 shrink-0 rotate-90 text-navy-2 dark:text-white" />
              <select
                value={s.method}
                onChange={(e) => settingsStore.set({ ...s, method: e.target.value as MethodKey | "auto" })}
                aria-label={appT(lang, "almSettings.calcMethod")}
                className="absolute inset-0 cursor-pointer opacity-0"
              >
                <option value="auto">{t.auto.replace("{{method}}", appT(lang, METHOD_LABEL[effectiveMethod(place, { ...s, method: "auto" })]))}</option>
                {METHODS.map((m) => (
                  <option key={m} value={m}>
                    {appT(lang, METHOD_LABEL[m])}
                  </option>
                ))}
              </select>
            </label>
            <a href="#monthly" className={PILL}>
              <Icon name="calendar" className="size-5 shrink-0 text-navy-2 dark:text-white" />
              <span className="min-w-0 flex-1 truncate text-xs font-bold text-navy-2 dark:text-white">{date ? `${date.weekday}${sep}${date.hijri} - ${date.gregorian}` : ""}</span>
              <Icon name="chevron" className="size-4 shrink-0 rotate-90 text-navy-2 dark:text-white" />
            </a>
          </div>
        </div>

        {place.isDefault && (
          <p className="no-print mt-4 rounded-md bg-tint px-4 py-3 text-sm font-semibold text-navy-2 dark:text-ink">{t.defaultNotice}</p>
        )}

        {/* six prayer cards; the next (or current) prayer is the navy card with the countdown */}
        <div className="no-print mt-8 grid grid-cols-2 items-end gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
          {PRAYERS.map((k) => {
            const on = live && nextKey === k;
            return on ? (
              <div key={k} className="col-span-2 flex flex-col items-center gap-1 rounded-t-2xl rounded-b-xl bg-navy px-3 pb-3 pt-3 text-center text-white shadow-lg sm:col-span-1 md:-mt-4">
                <span className="text-[11px] font-semibold text-white/85">
                  {appT(lang, live.mode === "since" ? "alm.prayer.since" : "alm.prayer.after", { prayer: prayerName(lang, k) })}
                </span>
                <div className="flex w-full items-center justify-center gap-2.5">
                  <Image src={PRAYER_ICON_SRC[k]} alt="" width={30} height={30} className="size-7 brightness-0 invert" />
                  <span className="text-sm font-bold">{prayerName(lang, k)}</span>
                </div>
                <span className="text-2xl font-extrabold tabular-nums" dir="ltr">
                  {formatDuration(live.ms)}
                </span>
                <span className="text-sm font-bold tabular-nums">{fmt(live.today[k])}</span>
              </div>
            ) : (
              <div key={k} className={`${OUTLINED} flex items-center gap-3 px-4 py-3`}>
                <Image src={PRAYER_ICON_SRC[k]} alt="" width={30} height={30} className="size-7 shrink-0" />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-bold text-navy-2 dark:text-white">{prayerName(lang, k)}</span>
                  <span className="text-sm font-bold tabular-nums text-navy-2 dark:text-ink-2">{live ? fmt(live.today[k]) : "--:--"}</span>
                </span>
              </div>
            );
          })}
        </div>

        {live && (live.midnight || live.lastThird) && (
          <div className="no-print mt-5 flex flex-wrap justify-center gap-3 text-sm">
            {live.midnight && (
              <span className="rounded-full bg-white px-5 py-2 text-navy-2 ring-2 ring-edge/70 dark:bg-card dark:text-ink">
                {appT(lang, "alm.mid.midnight")} <b className="ms-1 tabular-nums">{fmt(live.midnight)}</b>
              </span>
            )}
            {live.lastThird && (
              <span className="rounded-full bg-white px-5 py-2 text-navy-2 ring-2 ring-edge/70 dark:bg-card dark:text-ink">
                {appT(lang, "alm.mid.lastThird")} <b className="ms-1 tabular-nums">{fmt(live.lastThird)}</b>
              </span>
            )}
          </div>
        )}

        <p className="no-print mt-3 text-center text-xs text-ink-2">
          {t.tzNote.replace("{{city}}", place.label).replace("{{tz}}", place.tz)} · {appT(lang, METHOD_LABEL[effectiveMethod(place, s)])}
        </p>

        <SettingsCard lang={lang} place={place} s={s} />
        <div id="monthly" className="scroll-mt-24">
          <MonthlyTable lang={lang} place={place} s={s} today={now ? ymdInTz(now, place.tz) : null} />
        </div>
      </div>
    </>
  );
}

function Seg<T extends string>({ value, options, onChange }: { value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <div className="inline-flex w-full rounded-full bg-white p-1 ring-2 ring-edge/70 dark:bg-card">
      {options.map(([v, label]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={value === v}
          className={`flex-1 rounded-full px-3 py-2 text-sm font-bold transition ${value === v ? "bg-gradient-to-b from-primary-light to-primary-deep text-white shadow" : "text-navy-2 hover:bg-tint dark:text-ink"}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function SettingsCard({ lang, place, s }: { lang: Locale; place: ShownPlace; s: PrayerSettings }) {
  const t = prayerMsg[lang];
  const set = (patch: Partial<PrayerSettings>) => settingsStore.set({ ...s, ...patch });
  const auto = effectiveMethod(place, { ...s, method: "auto" });
  return (
    <section className={`no-print mt-10 ${CARD} p-5 sm:p-6`}>
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-section dark:text-primary-light">
        <Icon name="settings" className="size-5 text-primary" />
        {t.settings}
      </h2>
      <div className="grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-navy-2 dark:text-ink-2">{appT(lang, "almSettings.calcMethod")}</span>
          <select
            value={s.method}
            onChange={(e) => set({ method: e.target.value as MethodKey | "auto" })}
            className="h-11 w-full rounded-full bg-white px-4 text-sm font-semibold text-navy-2 outline-none ring-2 ring-edge/70 focus:ring-primary dark:bg-card dark:text-ink"
          >
            <option value="auto">{t.auto.replace("{{method}}", appT(lang, METHOD_LABEL[auto]))}</option>
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {appT(lang, METHOD_LABEL[m])}
              </option>
            ))}
          </select>
        </label>
        <div>
          <span className="mb-1.5 block text-sm font-bold text-navy-2 dark:text-ink-2">{appT(lang, "almSettings.madhabRow")}</span>
          <Seg
            value={s.madhab}
            onChange={(madhab) => set({ madhab })}
            options={[
              ["Shafi", appT(lang, "prayerSettings.shafii")],
              ["Hanafi", appT(lang, "prayerSettings.hanafi")],
            ]}
          />
        </div>
        <div>
          <span className="mb-1.5 block text-sm font-bold text-navy-2 dark:text-ink-2">{t.timeFormat}</span>
          <Seg
            value={s.hour12 ? "12" : "24"}
            onChange={(v) => set({ hour12: v === "12" })}
            options={[
              ["12", t.h12],
              ["24", t.h24],
            ]}
          />
        </div>
      </div>
      {highLatitude(place.lat) && <p className="mt-4 text-sm text-ink-2">{t.highLat}</p>}
    </section>
  );
}

const bare = (s: string) => s.replace(/\s*(AM|PM|ص|م)$/u, "");

function MonthlyTable({ lang, place, s, today }: { lang: Locale; place: Place & { label: string }; s: PrayerSettings; today: { y: number; m: number; d: number } | null }) {
  const t = prayerMsg[lang];
  const [offset, setOffset] = useState(0);
  const base = today ?? { y: 2026, m: 1, d: 1 };
  const first = new Date(Date.UTC(base.y, base.m - 1 + offset, 1));
  const y = first.getUTCFullYear();
  const m = first.getUTCMonth() + 1;
  const fmt = fmtTime(lang, place, s);
  const rows = useMemo(() => {
    const n = new Date(Date.UTC(y, m, 0)).getUTCDate();
    return Array.from({ length: n }, (_, i) => {
      const g = { y, m, d: i + 1 };
      return { g, h: toHijri(g), times: computeDay(place, s, y, m, i + 1) };
    });
  }, [y, m, place, s]);
  const monthLabel = formatGregorian(lang, { y, m, d: 1 }, { month: "long", year: "numeric" });
  const h1 = rows[0]?.h;
  const h2 = rows[rows.length - 1]?.h;
  const hijriSpan = h1 && h2 ? `${hijriMonthName(lang, h1.hm)}${h1.hm !== h2.hm ? ` – ${hijriMonthName(lang, h2.hm)}` : ""} ${localDigits(lang, h2.hy)} ${appT(lang, "hijri.suffix")}` : "";

  const navBtn = "grid size-12 place-items-center rounded-full bg-primary text-white shadow-md hover:bg-primary-deep sm:size-14";

  return (
    <section className="print-area mt-10">
      <div className={`overflow-hidden ${CARD} bg-white dark:bg-card`}>
        <div className="flex flex-wrap items-center justify-between gap-3 bg-navy px-5 py-4 text-white sm:px-6">
          <div className="min-w-0">
            <h2 className="text-xl font-bold">
              {t.monthly} <span className="text-orange">{place.label}</span>
            </h2>
            <p className="text-sm text-white/80">
              {monthLabel} · {hijriSpan}
            </p>
          </div>
          <button type="button" onClick={() => window.print()} className="no-print inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-6 text-sm font-bold text-navy hover:bg-tint">
            {t.print}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-center text-sm font-bold text-navy-2 dark:text-ink">
            <thead>
              <tr className="bg-tint text-xs font-bold text-navy-2 dark:text-ink-2">
                <th className="px-2 py-3 text-start">{appT(lang, "alm.month.day")}</th>
                <th className="px-2 py-3">{t.date}</th>
                {PRAYERS.map((k) => (
                  <th key={k} className="px-2 py-3">
                    {prayerName(lang, k)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ g, h, times }) => {
                const isToday = today && today.y === g.y && today.m === g.m && today.d === g.d;
                const side = isToday ? "" : "bg-[#EFEFEF] dark:bg-white/5";
                return (
                  <tr key={g.d} className={isToday ? "bg-primary text-white" : ""}>
                    <td className={`px-2 py-2.5 text-start whitespace-nowrap ${side}`}>{weekdayName(lang, g, "short")}</td>
                    <td className={`px-2 py-2.5 whitespace-nowrap ${side}`}>
                      {localDigits(lang, g.d)} <span className={isToday ? "text-white/85" : "text-ink-2"}>/ {localDigits(lang, h.hd)}</span>
                    </td>
                    {PRAYERS.map((k) => (
                      <td key={k} className="px-2 py-2.5 tabular-nums" dir="ltr">
                        {bare(fmt(times[k]))}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="px-5 py-3 text-xs text-ink-2 sm:px-6">
          {appT(lang, METHOD_LABEL[effectiveMethod(place, s)])} · {place.tz} · {appT(lang, "app.name")} — rafiqapp.me
        </p>
      </div>
      {/* month navigation: round sky buttons around the month, like the reference */}
      <div className="no-print mt-8 flex items-center justify-center gap-5 sm:gap-8">
        <button type="button" onClick={() => setOffset((o) => o - 1)} aria-label={t.prevMonth} className={navBtn}>
          <Icon name="chevron" className="size-6 ltr:-scale-x-100" />
        </button>
        <div className="min-w-[9rem] text-center">
          <p className="text-lg font-bold text-navy-2 dark:text-white">{monthLabel}</p>
          {offset !== 0 && (
            <button type="button" onClick={() => setOffset(0)} className="mt-1 text-sm font-bold text-primary hover:underline">
              {t.thisMonth}
            </button>
          )}
        </div>
        <button type="button" onClick={() => setOffset((o) => o + 1)} aria-label={t.nextMonth} className={navBtn}>
          <Icon name="chevron" className="size-6 rtl:-scale-x-100" />
        </button>
      </div>
    </section>
  );
}
