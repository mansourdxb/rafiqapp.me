"use client";
// "Prayer time" block of the home page in the reference layout: place / method / date pills and six
// outlined prayer cards, the next prayer as a tall navy card with a live countdown.
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { prayerMsg } from "@/i18n/messages/prayer";
import { isRtl, localePath, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { home } from "@/i18n/messages/home";
import { Icon } from "@/components/ui/Icon";
import { LocationPicker } from "@/components/prayer/LocationPicker";
import { dateLine, fmtTime, prayerName, useLive } from "@/components/prayer/prayerUi";
import { useNow, usePlace, useSettings } from "@/components/prayer/usePlace";
import { computeDay, effectiveMethod, formatDuration, PRAYERS, ymdInTz, type PrayerKey } from "@/lib/prayer/compute";
import { METHOD_LABEL, METHODS, type MethodKey } from "@/lib/prayer/methods";
import { settingsStore } from "@/lib/prayer/store";

const ICON: Record<PrayerKey, string> = {
  fajr: "/images/ref/p-fajr.svg",
  sunrise: "/images/ref/p-sunrise.svg",
  dhuhr: "/images/ref/p-dhuhr.svg",
  asr: "/images/ref/p-asr.svg",
  maghrib: "/images/ref/p-maghrib.svg",
  isha: "/images/ref/p-isha.svg",
};

const pill = "flex h-14 min-w-0 items-center gap-3 rounded-full bg-white px-5 shadow-[0_3px_10px_rgba(124,180,200,0.35)] ring-2 ring-edge/70 dark:bg-card";

export function HomePrayer({ lang }: { lang: Locale }) {
  const t = home[lang].prayer;
  const place = usePlace(lang);
  const s = useSettings();
  const now = useNow(1000);
  const live = useLive(place, s, now);
  const fmt = fmtTime(lang, place, s);
  const [picking, setPicking] = useState(false);
  const sep = isRtl(lang) ? "، " : ", ";

  // another day picked in the date pill: show that day's times (no countdown)
  const [day, setDay] = useState<string | null>(null);
  const todayYmd = now ? ymdInTz(now, place.tz) : null;
  const todayIso = todayYmd ? `${todayYmd.y}-${String(todayYmd.m).padStart(2, "0")}-${String(todayYmd.d).padStart(2, "0")}` : "";
  const other = day && day !== todayIso ? day.split("-").map(Number) : null;
  const shown = other ? computeDay(place, s, other[0], other[1], other[2]) : live?.today;
  const date = other ? dateLine(lang, new Date(Date.UTC(other[0], other[1] - 1, other[2], 12)), place.tz) : now ? dateLine(lang, now, place.tz) : null;
  const nextKey = other ? undefined : live?.mode === "since" ? live.current! : live?.next;
  const todayWord = new Intl.RelativeTimeFormat(lang, { numeric: "auto" }).format(0, "day");
  const autoMethod = effectiveMethod(place, { ...s, method: "auto" });

  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[23px] font-bold text-navy-2 dark:text-white">{t.title}</h2>
        <Link href={localePath(lang, "/prayer-times/")} className="rounded-full px-8 py-2.5 text-sm font-bold text-navy-2 ring-1 ring-primary hover:bg-tint dark:text-white">
          {t.more}
        </Link>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-[1.1fr_1fr_1.1fr] md:gap-4">
        <button type="button" onClick={() => setPicking((v) => !v)} aria-expanded={picking} className={`${pill} text-start`}>
          <Icon name="location" className="size-6 shrink-0 text-navy-2 dark:text-white" />
          <span className="min-w-0 flex-1 truncate text-sm font-bold text-navy-2 dark:text-white">
            {place.label}
            {place.countryLabel ? `${sep}${place.countryLabel}` : ""}
          </span>
          <Icon name="search" className="size-5 shrink-0 text-navy-2 dark:text-white" />
        </button>
        <label className={`${pill} relative cursor-pointer`}>
          <span className="shrink-0 text-xs text-navy-2 dark:text-ink-2">{t.method}:</span>
          <span className="min-w-0 flex-1 truncate text-sm font-bold text-navy-2 dark:text-white">{appT(lang, METHOD_LABEL[effectiveMethod(place, s)])}</span>
          <Icon name="chevron" className="size-4 shrink-0 rotate-90 text-navy-2 dark:text-white" />
          <select
            value={s.method}
            onChange={(e) => settingsStore.set({ ...s, method: e.target.value as MethodKey | "auto" })}
            aria-label={t.method}
            className="absolute inset-0 cursor-pointer opacity-0"
          >
            <option value="auto">{prayerMsg[lang].auto.replace("{{method}}", appT(lang, METHOD_LABEL[autoMethod]))}</option>
            {METHODS.map((m) => (
              <option key={m} value={m}>
                {appT(lang, METHOD_LABEL[m])}
              </option>
            ))}
          </select>
        </label>
        <div className={`${pill} relative`}>
          <label className="relative flex min-w-0 flex-1 cursor-pointer items-center gap-3">
            <Icon name="calendar" className="size-7 shrink-0 text-navy-2 dark:text-white" />
            <span className="min-w-0 flex-1 truncate text-xs font-bold text-navy-2 dark:text-white">{date ? `${date.weekday}${sep}${date.hijri} - ${date.gregorian}` : ""}</span>
            <input
              type="date"
              value={day ?? todayIso}
              onChange={(e) => setDay(e.target.value || null)}
              aria-label={t.title}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </label>
          {other && (
            <button type="button" onClick={() => setDay(null)} className="shrink-0 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
              {todayWord}
            </button>
          )}
        </div>
      </div>
      {picking && (
        <div className="mt-3">
          <LocationPicker lang={lang} onDone={() => setPicking(false)} />
        </div>
      )}

      <div className="-mx-4 mt-6 flex snap-x items-center gap-3 md:items-end overflow-x-auto px-4 pb-3 pt-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0">
        {PRAYERS.map((k) => {
          const on = live && nextKey === k;
          return on ? (
            <div key={k} className="flex min-w-[9.5rem] shrink-0 snap-start flex-col items-center gap-1 rounded-t-2xl rounded-b-xl bg-navy px-3 pb-3 pt-3 text-center text-white shadow-lg md:-mt-4 md:min-w-0">
              <span className="text-[11px] font-semibold text-white/85">{t.next}</span>
              <div className="flex w-full items-center justify-center gap-2.5">
                <Image src={ICON[k]} alt="" width={30} height={30} className="size-7 brightness-0 invert" />
                <span className="text-sm font-bold">{prayerName(lang, k)}</span>
              </div>
              {live && (
                <span className="text-xl font-extrabold tabular-nums" dir="ltr">
                  {formatDuration(live.ms)}
                </span>
              )}
              <span className="text-sm font-bold tabular-nums">{shown ? fmt(shown[k]) : "--:--"}</span>
            </div>
          ) : (
            <div key={k} className="flex min-w-[9rem] shrink-0 snap-start items-center gap-3 rounded-xl bg-white px-4 py-3 ring-2 ring-edge/70 shadow-[0_3px_10px_rgba(124,180,200,0.3)] md:min-w-0 dark:bg-card">
              <Image src={ICON[k]} alt="" width={30} height={30} className="size-7 shrink-0" />
              <span className="flex flex-col">
                <span className="text-sm font-bold text-navy-2 dark:text-white">{prayerName(lang, k)}</span>
                <span className="text-xs font-bold tabular-nums text-navy-2 dark:text-ink-2">{shown ? fmt(shown[k]) : "--:--"}</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
