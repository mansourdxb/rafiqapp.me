"use client";
// "Prayer time" block of the home page in the reference layout: place / method / date pills and six
// outlined prayer cards, the next prayer as a tall navy card with a live countdown.
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { isRtl, localePath, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { home } from "@/i18n/messages/home";
import { Icon } from "@/components/ui/Icon";
import { LocationPicker } from "@/components/prayer/LocationPicker";
import { dateLine, fmtTime, prayerName, useLive } from "@/components/prayer/prayerUi";
import { useNow, usePlace, useSettings } from "@/components/prayer/usePlace";
import { effectiveMethod, formatDuration, PRAYERS, type PrayerKey } from "@/lib/prayer/compute";
import { METHOD_LABEL } from "@/lib/prayer/methods";

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
  const date = now ? dateLine(lang, now, place.tz) : null;
  const [picking, setPicking] = useState(false);
  const nextKey = live?.mode === "since" ? live.current! : live?.next;
  const sep = isRtl(lang) ? "، " : ", ";

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
        <div className={pill}>
          <span className="shrink-0 text-xs text-navy-2 dark:text-ink-2">{t.method}:</span>
          <span className="min-w-0 truncate text-sm font-bold text-navy-2 dark:text-white">{appT(lang, METHOD_LABEL[effectiveMethod(place, s)])}</span>
        </div>
        <div className={pill}>
          <Icon name="calendar" className="size-7 shrink-0 text-navy-2 dark:text-white" />
          <span className="min-w-0 truncate text-xs font-bold text-navy-2 dark:text-white">{date ? `${date.weekday}${sep}${date.hijri} - ${date.gregorian}` : ""}</span>
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
              <span className="text-sm font-bold tabular-nums">{live ? fmt(live.today[k]) : "--:--"}</span>
            </div>
          ) : (
            <div key={k} className="flex min-w-[9rem] shrink-0 snap-start items-center gap-3 rounded-xl bg-white px-4 py-3 ring-2 ring-edge/70 shadow-[0_3px_10px_rgba(124,180,200,0.3)] md:min-w-0 dark:bg-card">
              <Image src={ICON[k]} alt="" width={30} height={30} className="size-7 shrink-0" />
              <span className="flex flex-col">
                <span className="text-sm font-bold text-navy-2 dark:text-white">{prayerName(lang, k)}</span>
                <span className="text-xs font-bold tabular-nums text-navy-2 dark:text-ink-2">{live ? fmt(live.today[k]) : "--:--"}</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
