// Prayer-time computation, ported from the app (client/screens/qibla/services/prayerTimes.ts).
import { Coordinates, HighLatitudeRule, Madhab, PrayerTimes } from "adhan";
import { methodParams, recommendedMethod, type MethodKey } from "./methods";

export const PRAYERS = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"] as const;
export type PrayerKey = (typeof PRAYERS)[number];

export type Place = {
  name: string;
  country?: string;
  cc?: string; // ISO country code (lower case)
  lat: number;
  lng: number;
  tz: string; // IANA time zone of the place
  lang?: string; // language `name`/`country` are in
  names?: Record<string, { name: string; country?: string }>; // the same place named in other languages
};

export type PrayerSettings = {
  method: MethodKey | "auto";
  madhab: "Shafi" | "Hanafi";
  hour12: boolean;
};

export const DEFAULT_SETTINGS: PrayerSettings = { method: "auto", madhab: "Shafi", hour12: true };

export const MAKKAH: Place = { name: "Makkah", cc: "sa", lat: 21.4225, lng: 39.8262, tz: "Asia/Riyadh" };

export type DayTimes = Record<PrayerKey, Date>;

export function effectiveMethod(place: Place, s: PrayerSettings): MethodKey {
  return s.method === "auto" ? recommendedMethod(place.cc, place.lat, place.lng) : s.method;
}

/** Above 48°, summer twilight never ends; the app switches to the twilight-angle rule there. */
export const highLatitude = (lat: number) => Math.abs(lat) > 48;

/** Calendar y/m/d of an instant as seen in `tz`. */
export function ymdInTz(d: Date, tz: string) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: tz, year: "numeric", month: "numeric", day: "numeric" }).formatToParts(d);
  const n = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { y: n("year"), m: n("month"), d: n("day") };
}

/** Times for the city's calendar day y/m/d (adhan reads device-local y/m/d; outputs are true instants). */
export function computeDay(place: Place, s: PrayerSettings, y: number, m: number, d: number): DayTimes {
  const params = methodParams(effectiveMethod(place, s));
  params.madhab = s.madhab === "Hanafi" ? Madhab.Hanafi : Madhab.Shafi;
  if (highLatitude(place.lat)) params.highLatitudeRule = HighLatitudeRule.TwilightAngle;
  const pt = new PrayerTimes(new Coordinates(place.lat, place.lng), new Date(y, m - 1, d), params);
  return { fajr: pt.fajr, sunrise: pt.sunrise, dhuhr: pt.dhuhr, asr: pt.asr, maghrib: pt.maghrib, isha: pt.isha };
}

export type Live = {
  today: DayTimes;
  current: PrayerKey | null; // last prayer that started today (null before Fajr)
  next: PrayerKey;
  nextAt: Date;
  /** "since" for 30 min after a prayer starts, like the app home hero */
  mode: "after" | "since";
  /** ms until next (mode "after") or since current (mode "since") */
  ms: number;
  midnight: Date | null;
  lastThird: Date | null;
};

const SINCE_WINDOW_MS = 30 * 60 * 1000;

export function computeLive(place: Place, s: PrayerSettings, now = new Date()): Live {
  const { y, m, d } = ymdInTz(now, place.tz);
  const today = computeDay(place, s, y, m, d);
  let current: PrayerKey | null = null;
  let next: PrayerKey | null = null;
  for (const k of PRAYERS) {
    if (today[k].getTime() > now.getTime()) {
      next = k;
      break;
    }
    current = k;
  }
  const t = new Date(Date.UTC(y, m - 1, d + 1));
  const tomorrow = computeDay(place, s, t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
  const nextAt = next ? today[next] : tomorrow.fajr;
  const since = current ? now.getTime() - today[current].getTime() : Infinity;
  const mode = current && since < SINCE_WINDOW_MS ? "since" : "after";
  // night (maghrib → next fajr): midnight and the start of its last third
  const mag = today.maghrib.getTime();
  const f = tomorrow.fajr.getTime();
  const night = f > mag ? { mid: new Date(mag + (f - mag) / 2), last: new Date(mag + (2 * (f - mag)) / 3) } : null;
  return {
    today,
    current,
    next: next ?? "fajr",
    nextAt,
    mode,
    ms: mode === "since" ? since : Math.max(0, nextAt.getTime() - now.getTime()),
    midnight: night?.mid ?? null,
    lastThird: night?.last ?? null,
  };
}

const ARABIC_SCRIPT = ["ar", "ur", "fa"];

/** Clock time in the place's zone, like the app's formatTimeInTZ: Latin digits, ص/م for ar/ur/fa. */
export function formatTime(date: Date, tz: string, lang: string, hour12: boolean) {
  try {
    let s = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12, timeZone: tz }).format(date);
    if (hour12) {
      s = ARABIC_SCRIPT.includes(lang)
        ? s.replace(/\s?AM/i, " ص").replace(/\s?PM/i, " م").trim()
        : s.replace(/\s?(AM|PM)/i, " $1").trim();
    } else {
      s = s.replace(/^24:/, "00:");
    }
    return s;
  } catch {
    return "--:--";
  }
}

export const pad2 = (n: number) => String(n).padStart(2, "0");

export function formatDuration(ms: number) {
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const sec = Math.floor((ms % 60_000) / 1000);
  return `${pad2(h)}:${pad2(m)}:${pad2(sec)}`;
}

/** Offset (ms) of `tz` from UTC at instant `t`. */
export function tzOffsetMs(t: number, tz: string) {
  const p = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }).formatToParts(new Date(t));
  const n = (k: string) => Number(p.find((x) => x.type === k)?.value);
  return Date.UTC(n("year"), n("month") - 1, n("day"), n("hour"), n("minute"), n("second")) - Math.floor(t / 1000) * 1000;
}

/** The instant of local midnight starting y/m/d in `tz`. */
export function zonedMidnight(y: number, m: number, d: number, tz: string) {
  const guess = Date.UTC(y, m - 1, d);
  let t = guess - tzOffsetMs(guess, tz);
  t = guess - tzOffsetMs(t, tz);
  return new Date(t);
}
