"use client";
import { useMemo, useState } from "react";
import { isRtl, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { prayerMsg } from "@/i18n/messages/prayer";
import { Icon } from "@/components/ui/Icon";
import { localDigits } from "@/lib/digits";
import { computeDay, effectiveMethod, formatDuration, highLatitude, PRAYERS, ymdInTz, type Place, type PrayerSettings } from "@/lib/prayer/compute";
import { METHOD_LABEL, METHODS, type MethodKey } from "@/lib/prayer/methods";
import { settingsStore } from "@/lib/prayer/store";
import { formatGregorian, hijriMonthName, toHijri, weekdayName } from "@/lib/calendar/hijri";
import { LocationPicker } from "./LocationPicker";
import { dateLine, fmtTime, PrayerIcon, prayerName, SCENES, Skyline, useLive } from "./prayerUi";
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
  const scene = live ? (live.current ?? "isha") : "isha";
  const nextKey = live?.mode === "since" ? live.current! : live?.next;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
      <style>{PRINT_CSS}</style>
      <div className="no-print mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{t.title}</h1>
        <div className="w-full lg:max-w-xl">
          <LocationPicker lang={lang} />
        </div>
      </div>

      {place.isDefault && (
        <p className="mb-4 rounded-xl border border-primary/25 bg-tint px-4 py-3 text-sm text-ink">{t.defaultNotice}</p>
      )}

      {/* hero */}
      <section
        className="relative overflow-hidden rounded-3xl px-5 pb-28 pt-5 text-white shadow-lg sm:px-8 sm:pb-36 sm:pt-7"
        style={{ background: SCENES[scene] }}
      >
        <Skyline className="pointer-events-none absolute inset-x-0 bottom-12 h-16 w-full text-navy/40 sm:bottom-16 sm:h-20" />
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/25 bg-navy-2/80 px-3 py-1.5 text-sm font-semibold">
            <Icon name="location" className="size-4 shrink-0" />
            <span className="truncate">
              {place.label}
              {place.countryLabel ? `${isRtl(lang) ? "، " : ", "}${place.countryLabel}` : ""}
            </span>
          </span>
          {date && (
            <span className="text-sm text-white/85">
              {date.weekday} · {date.hijri}
            </span>
          )}
        </div>
        <div className="relative mt-6 sm:mt-8">
          <p className="text-base font-semibold text-white/90 sm:text-lg">
            {live ? appT(lang, live.mode === "since" ? "alm.prayer.since" : "alm.prayer.after", { prayer: prayerName(lang, nextKey!) }) : " "}
          </p>
          <p className="mt-1 font-sans text-5xl font-extrabold tabular-nums tracking-wide sm:text-7xl">
            <span className="inline-block" dir="ltr">
              {live ? formatDuration(live.ms) : "--:--:--"}
            </span>
          </p>
          {date && <p className="mt-2 text-sm text-white/80">{date.gregorian}</p>}
        </div>
      </section>

      {/* prayer cards */}
      <div className="relative z-10 -mt-16 grid grid-cols-3 gap-2.5 px-2 sm:-mt-20 sm:grid-cols-6 sm:gap-3 sm:px-5">
        {PRAYERS.map((k) => {
          const active = live && nextKey === k;
          return (
            <div
              key={k}
              className={`flex flex-col items-center gap-1.5 rounded-2xl px-2 py-3 text-center shadow-md transition sm:py-4 ${
                active ? "bg-navy text-white ring-2 ring-orange" : "bg-card text-ink"
              }`}
            >
              <span className={`text-sm font-bold ${active ? "text-white" : "text-ink"}`}>{prayerName(lang, k)}</span>
              <PrayerIcon k={k} className={`size-7 ${active ? "text-gold" : "text-primary"}`} />
              <span className="text-base font-extrabold tabular-nums sm:text-lg">
                {live ? fmt(live.today[k]) : "--:--"}
              </span>
            </div>
          );
        })}
      </div>

      {live && (live.midnight || live.lastThird) && (
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
          {live.midnight && (
            <span className="rounded-full bg-card px-4 py-1.5 text-ink shadow-sm">
              {appT(lang, "alm.mid.midnight")} <b className="ms-1 tabular-nums">{fmt(live.midnight)}</b>
            </span>
          )}
          {live.lastThird && (
            <span className="rounded-full bg-card px-4 py-1.5 text-ink shadow-sm">
              {appT(lang, "alm.mid.lastThird")} <b className="ms-1 tabular-nums">{fmt(live.lastThird)}</b>
            </span>
          )}
        </div>
      )}

      <p className="mt-3 text-center text-xs text-ink-2">
        {t.tzNote.replace("{{city}}", place.label).replace("{{tz}}", place.tz)} · {appT(lang, METHOD_LABEL[effectiveMethod(place, s)])}
      </p>

      <SettingsCard lang={lang} place={place} s={s} />
      <MonthlyTable lang={lang} place={place} s={s} today={now ? ymdInTz(now, place.tz) : null} />
    </div>
  );
}

function Seg<T extends string>({ value, options, onChange }: { value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <div className="inline-flex w-full rounded-xl border border-line bg-canvas p-1">
      {options.map(([v, label]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={value === v}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${value === v ? "bg-primary text-white shadow" : "text-ink-2 hover:text-ink"}`}
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
    <section className="no-print mt-8 rounded-2xl border border-line bg-card p-5 sm:p-6">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-ink">
        <Icon name="settings" className="size-5 text-primary" />
        {t.settings}
      </h2>
      <div className="grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink-2">{appT(lang, "almSettings.calcMethod")}</span>
          <select
            value={s.method}
            onChange={(e) => set({ method: e.target.value as MethodKey | "auto" })}
            className="h-11 w-full rounded-xl border border-line bg-canvas px-3 text-sm text-ink outline-none focus:ring-2 focus:ring-primary/40"
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
          <span className="mb-1.5 block text-sm font-semibold text-ink-2">{appT(lang, "almSettings.madhabRow")}</span>
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
          <span className="mb-1.5 block text-sm font-semibold text-ink-2">{t.timeFormat}</span>
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

  return (
    <section className="print-area mt-8 overflow-hidden rounded-2xl border border-line bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-navy px-4 py-4 text-white sm:px-6">
        <div>
          <h2 className="text-lg font-bold">{t.monthly}</h2>
          <p className="text-sm text-white/80">
            {place.label} · {monthLabel} · {hijriSpan}
          </p>
        </div>
        <div className="no-print flex items-center gap-1.5">
          <button type="button" onClick={() => setOffset((o) => o - 1)} aria-label={t.prevMonth} className="grid size-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20">
            <Icon name="chevron" className="size-5 ltr:-scale-x-100" />
          </button>
          {offset !== 0 && (
            <button type="button" onClick={() => setOffset(0)} className="h-9 rounded-lg bg-white/10 px-3 text-sm font-semibold hover:bg-white/20">
              {t.thisMonth}
            </button>
          )}
          <button type="button" onClick={() => setOffset((o) => o + 1)} aria-label={t.nextMonth} className="grid size-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20">
            <Icon name="chevron" className="size-5 rtl:-scale-x-100" />
          </button>
          <button type="button" onClick={() => window.print()} className="ms-1 inline-flex h-9 items-center gap-1.5 rounded-lg bg-orange px-3 text-sm font-bold hover:brightness-110">
            {t.print}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-center text-sm">
          <thead>
            <tr className="border-b border-line bg-tint text-xs font-bold text-ink-2">
              <th className="px-2 py-2.5 text-start">{appT(lang, "alm.month.day")}</th>
              <th className="px-2 py-2.5">{t.date}</th>
              {PRAYERS.map((k) => (
                <th key={k} className="px-2 py-2.5">
                  {prayerName(lang, k)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ g, h, times }) => {
              const isToday = today && today.y === g.y && today.m === g.m && today.d === g.d;
              return (
                <tr key={g.d} className={`border-b border-line last:border-0 ${isToday ? "bg-primary font-bold text-white" : "text-ink even:bg-canvas/60"}`}>
                  <td className="px-2 py-2 text-start whitespace-nowrap">{weekdayName(lang, g, "short")}</td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    {localDigits(lang, g.d)} <span className={isToday ? "text-white/80" : "text-ink-2"}>/ {localDigits(lang, h.hd)}</span>
                  </td>
                  {PRAYERS.map((k) => (
                    <td key={k} className="px-2 py-2 tabular-nums" dir="ltr">
                      {bare(fmt(times[k]))}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="px-4 py-3 text-xs text-ink-2 sm:px-6">
        {appT(lang, METHOD_LABEL[effectiveMethod(place, s)])} · {place.tz} · {appT(lang, "app.name")} — rafiqapp.me
      </p>
    </section>
  );
}
