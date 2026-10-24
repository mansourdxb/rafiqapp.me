"use client";
// Small pieces shared by the prayer page, the home strip and the imsakiya.
import { useMemo } from "react";
import type { Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { computeLive, formatTime, type Place, type PrayerKey, type PrayerSettings } from "@/lib/prayer/compute";
import { formatGregorian, formatHijri, toHijri, weekdayName, type Ymd } from "@/lib/calendar/hijri";
import { ymdInTz } from "@/lib/prayer/compute";

/** Hero colours per prayer period — the app's six scenes as gradients. */
export const SCENES: Record<PrayerKey, string> = {
  fajr: "linear-gradient(160deg,#0D245E 0%,#3B5B9E 60%,#7C6AA6 100%)",
  sunrise: "linear-gradient(160deg,#3B5B9E 0%,#7C6AA6 45%,#E7B58E 100%)",
  dhuhr: "linear-gradient(160deg,#1E93C9 0%,#29ABE2 55%,#7FCBEA 100%)",
  asr: "linear-gradient(160deg,#1E6FA8 0%,#C98A5E 70%,#E8B84B 100%)",
  maghrib: "linear-gradient(160deg,#45213A 0%,#7C2A44 40%,#C98AA0 75%,#E7B58E 100%)",
  isha: "linear-gradient(160deg,#0B1736 0%,#0D245E 55%,#15294D 100%)",
};

export const prayerName = (lang: Locale, k: PrayerKey) => appT(lang, `prayer.${k}`);

export function PrayerIcon({ k, className = "size-6" }: { k: PrayerKey; className?: string }) {
  const sun = <circle cx="12" cy="12" r="4" />;
  const rays = "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4";
  const paths: Record<PrayerKey, React.ReactNode> = {
    fajr: (
      <>
        <path d="M3 18h18M7 18a5 5 0 0 1 10 0" />
        <path d="M18.5 4.5a3 3 0 1 0 2 4.6 3.5 3.5 0 0 1-2-4.6z" />
      </>
    ),
    sunrise: (
      <>
        <path d="M3 19h18M6.5 19a5.5 5.5 0 0 1 11 0M12 4v4M9.5 6.5L12 4l2.5 2.5M4.5 12.5l1.4 1M19.5 12.5l-1.4 1" />
      </>
    ),
    dhuhr: (
      <>
        {sun}
        <path d={rays} />
      </>
    ),
    asr: (
      <>
        <circle cx="13" cy="10" r="3.5" />
        <path d="M13 3v1.5M20 10h-1.5M18 5l-1 1M8 5l1 1M3 20h18M5 16.5h14" />
      </>
    ),
    maghrib: (
      <>
        <path d="M3 17h18M6.5 17a5.5 5.5 0 0 1 11 0M12 5v4M9.5 6.5L12 9l2.5-2.5M5 21h14" />
      </>
    ),
    isha: (
      <>
        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
        <path d="M17 3.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {paths[k]}
    </svg>
  );
}

/** Live prayer state for a place; null until mounted. */
export function useLive(place: Place, s: PrayerSettings, now: Date | null) {
  // recompute each tick (cheap); the day's times only change at midnight
  return useMemo(() => (now ? computeLive(place, s, now) : null), [place, s, now]);
}

export const fmtTime = (lang: Locale, place: Place, s: PrayerSettings) => (d: Date | null | undefined) =>
  d ? formatTime(d, place.tz, lang, s.hour12) : "--:--";

/** "Saturday · 13 Jumada al-Ula 1448 AH · 24 October 2026" for the place's current day. */
export function dateLine(lang: Locale, now: Date, tz: string) {
  const { y, m, d } = ymdInTz(now, tz);
  const g: Ymd = { y, m, d };
  return { weekday: weekdayName(lang, g), hijri: formatHijri(lang, toHijri(g)), gregorian: formatGregorian(lang, g) };
}

/** Mosque skyline drawn at the bottom of the heroes. */
export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 80" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden fill="currentColor">
      <path d="M0 80V62h18V48l4-6 4 6v14h22V58c0-10 8-18 16-22 8 4 16 12 16 22v4h10V30l3-8 3 8v32h14V52c0-16 14-30 30-34 2-6 4-8 4-8s2 2 4 8c16 4 30 18 30 34v10h14V30l3-8 3 8v32h10v-4c0-10 8-18 16-22 8 4 16 12 16 22v4h24V44l4-6 4 6v18h20V54c0-6 6-12 12-14 6 2 12 8 12 14v8h26V80z" />
    </svg>
  );
}
