// Hijri (Umm al-Qura) dates via Intl, like the app's src/utils/hijriDate.ts. Calendar days are
// handled as UTC-noon instants so no local time zone or DST can shift a day.
import { appT } from "@/i18n/app";
import type { Locale } from "@/i18n/config";
import { localDigits } from "@/lib/digits";

export type Ymd = { y: number; m: number; d: number };
export type Hijri = { hy: number; hm: number; hd: number };

const DAY = 86_400_000;
export const utcNoon = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d, 12));
export const ymdOf = (t: Date): Ymd => ({ y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() });
export const addDays = (g: Ymd, n: number) => ymdOf(new Date(utcNoon(g.y, g.m, g.d).getTime() + n * DAY));
export const sameYmd = (a: Ymd, b: Ymd) => a.y === b.y && a.m === b.m && a.d === b.d;

let fmt: Intl.DateTimeFormat | null = null;
export function toHijri(g: Ymd): Hijri {
  fmt ??= new Intl.DateTimeFormat("en-u-ca-islamic-umalqura-nu-latn", { timeZone: "UTC", day: "numeric", month: "numeric", year: "numeric" });
  const parts = fmt.formatToParts(utcNoon(g.y, g.m, g.d));
  const n = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { hy: n("year"), hm: n("month"), hd: n("day") };
}

/** Gregorian date of a Hijri date, or null when that day doesn't exist (e.g. the 30th of a 29-day month). */
export function fromHijri(hy: number, hm: number, hd: number): Ymd | null {
  // tabular estimate (1 Muharram 1 AH ≈ JD 1948439.5), then search a few days around it
  const jd = 1948439.5 + Math.floor((hy - 1) * 354.36667) + Math.floor((hm - 1) * 29.5306) + hd;
  const est = ymdOf(new Date((jd - 2440587.5) * DAY + DAY / 2));
  for (const off of [0, -1, 1, -2, 2, -3, 3, -4, 4, -5, 5]) {
    const g = addDays(est, off);
    const h = toHijri(g);
    if (h.hy === hy && h.hm === hm && h.hd === hd) return g;
  }
  return null;
}

export const hijriMonthLength = (hy: number, hm: number) => (fromHijri(hy, hm, 30) ? 30 : 29);

/** Today's date on this device. */
export function todayYmd(): Ymd {
  const n = new Date();
  return { y: n.getFullYear(), m: n.getMonth() + 1, d: n.getDate() };
}

export const hijriMonthName = (lang: Locale, hm: number) => appT(lang, `hijri.month${hm}`);

/** "13 Jumada al-Ula 1448 AH" with the app's month names and suffix. */
export function formatHijri(lang: Locale, h: Hijri) {
  return `${localDigits(lang, h.hd)} ${hijriMonthName(lang, h.hm)} ${localDigits(lang, h.hy)} ${appT(lang, "hijri.suffix")}`;
}

// Hausa month and weekday names (CLDR). Chrome's Intl has no Hausa (it falls back to English), so Hausa
// dates are always built from these — the same on the server and in every browser.
const HA_MONTHS = ["Janairu", "Faburairu", "Maris", "Afirilu", "Mayu", "Yuni", "Yuli", "Agusta", "Satumba", "Oktoba", "Nuwamba", "Disamba"];
const HA_MONTHS_SHORT = ["Jan", "Fab", "Mar", "Afi", "May", "Yun", "Yul", "Agu", "Sat", "Okt", "Nuw", "Dis"];
const HA_DAYS = ["Lahadi", "Litinin", "Talata", "Laraba", "Alhamis", "Juma'a", "Asabar"];
const HA_DAYS_SHORT = ["Lah", "Lit", "Tal", "Lar", "Alh", "Jum", "Asa"];

/** "Lahadi, 25 Oktoba, 2026" — the parts asked for in `opts`, in CLDR's Hausa order. */
function formatHausa(g: Ymd, opts: Intl.DateTimeFormatOptions) {
  const wd = utcNoon(g.y, g.m, g.d).getUTCDay();
  const day = opts.day ? String(g.d) : "";
  const month = opts.month === "short" ? HA_MONTHS_SHORT[g.m - 1] : opts.month ? HA_MONTHS[g.m - 1] : "";
  const dm = [day, month].filter(Boolean).join(" ");
  const date = [dm, opts.year ? String(g.y) : ""].filter(Boolean).join(day ? ", " : " ");
  const weekday = opts.weekday === "short" ? HA_DAYS_SHORT[wd] : opts.weekday ? HA_DAYS[wd] : "";
  return [weekday, date].filter(Boolean).join(", ");
}

/** Gregorian date in the site language (Latin digits from Intl, then the app's digit style). */
export function formatGregorian(lang: Locale, g: Ymd, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) {
  try {
    if (lang === "ha") return formatHausa(g, opts);
    return localDigits(lang, new Intl.DateTimeFormat(`${lang}-u-nu-latn`, { ...opts, timeZone: "UTC" }).format(utcNoon(g.y, g.m, g.d)));
  } catch {
    return `${g.y}-${g.m}-${g.d}`;
  }
}

export function weekdayName(lang: Locale, g: Ymd, style: "long" | "short" = "long") {
  return formatGregorian(lang, g, { weekday: style });
}
