"use client";
// Live prayer-times strip for a dark hero (home page): place pill + search, Hijri/Gregorian date,
// six prayer cards with the next prayer highlighted and counting down. Uses the saved place/settings.
import Link from "next/link";
import { useState } from "react";
import { isRtl, localePath, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { prayerMsg } from "@/i18n/messages/prayer";
import { Icon } from "@/components/ui/Icon";
import { formatDuration, PRAYERS } from "@/lib/prayer/compute";
import { LocationPicker } from "./LocationPicker";
import { dateLine, fmtTime, PrayerIcon, prayerName, useLive } from "./prayerUi";
import { useNow, usePlace, useSettings } from "./usePlace";

export function PrayerStrip({ lang }: { lang: Locale }) {
  const t = prayerMsg[lang];
  const place = usePlace(lang);
  const s = useSettings();
  const now = useNow(1000);
  const live = useLive(place, s, now);
  const fmt = fmtTime(lang, place, s);
  const date = now ? dateLine(lang, now, place.tz) : null;
  const [picking, setPicking] = useState(false);
  const nextKey = live?.mode === "since" ? live.current! : live?.next;

  return (
    <div className="w-full text-white">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={() => setPicking((p) => !p)}
          aria-expanded={picking}
          className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-sm font-semibold backdrop-blur hover:bg-white/20"
        >
          <Icon name="location" className="size-4 shrink-0" />
          <span className="truncate">
            {place.label}
            {place.countryLabel ? `${isRtl(lang) ? "، " : ", "}${place.countryLabel}` : ""}
          </span>
          <Icon name="search" className="size-3.5 shrink-0 opacity-80" />
        </button>
        {date && (
          <p className="text-sm text-white/85">
            {date.weekday} · {date.hijri} · {date.gregorian}
          </p>
        )}
      </div>

      {picking && (
        <div className="mt-3">
          <LocationPicker lang={lang} tone="dark" onDone={() => setPicking(false)} />
        </div>
      )}

      <div className="-mx-4 mt-4 flex snap-x gap-2.5 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0">
        {PRAYERS.map((k) => {
          const active = live && nextKey === k;
          return (
            <div
              key={k}
              className={`flex min-w-[6.5rem] shrink-0 snap-start flex-col items-center gap-1 rounded-2xl px-3 py-3 text-center backdrop-blur md:min-w-0 ${
                active ? "bg-navy shadow-lg ring-1 ring-white/30" : "border border-white/15 bg-white/10"
              }`}
            >
              <span className="text-sm font-bold">{prayerName(lang, k)}</span>
              <PrayerIcon k={k} className={`size-6 ${active ? "text-gold" : "text-white/85"}`} />
              <span className="text-base font-extrabold tabular-nums">{live ? fmt(live.today[k]) : "--:--"}</span>
              {active && live && (
                <span
                  className="text-xs font-bold tabular-nums text-gold"
                  dir="ltr"
                  title={appT(lang, live.mode === "since" ? "alm.prayer.since" : "alm.prayer.after", { prayer: prayerName(lang, k) })}
                >
                  {live.mode === "since" ? "+" : "−"}
                  {formatDuration(live.ms)}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex justify-end">
        <Link href={localePath(lang, "/prayer-times/")} className="inline-flex items-center gap-1 text-sm font-semibold text-white/90 hover:text-white">
          {t.monthly}
          <Icon name="chevron" flip className="size-4" />
        </Link>
      </div>
    </div>
  );
}
