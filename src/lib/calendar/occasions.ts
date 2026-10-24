// Islamic occasions — the app's list (client/screens/almosaly/occasions/OccasionsScreen.tsx) plus
// the last ten nights of Ramadan and the white days. Names come from the app strings.
import { fromHijri, hijriMonthLength, toHijri, type Hijri, type Ymd } from "./hijri";

export type Occasion = { key: string; label: string; hm: number; hd: number; color: string };

export const OCCASIONS: Occasion[] = [
  { key: "hijriNewYear", label: "countdown.hijriNewYear", hm: 1, hd: 1, color: "#8E24AA" },
  { key: "ashura", label: "countdown.ashura", hm: 1, hd: 10, color: "#0288D1" },
  { key: "mawlid", label: "countdown.mawlid", hm: 3, hd: 12, color: "#00897B" },
  { key: "isra", label: "countdown.isra", hm: 7, hd: 27, color: "#3949AB" },
  { key: "nisfShaban", label: "countdown.nisfShaban", hm: 8, hd: 15, color: "#7E57C2" },
  { key: "ramadan", label: "countdown.ramadan", hm: 9, hd: 1, color: "#5C6BC0" },
  { key: "lastTen", label: "calendar.lastTenNights", hm: 9, hd: 21, color: "#3F51B5" },
  { key: "eidFitr", label: "countdown.eidFitr", hm: 10, hd: 1, color: "#43A047" },
  { key: "arafah", label: "countdown.arafah", hm: 12, hd: 9, color: "#F9A825" },
  { key: "eidAdha", label: "countdown.eidAdha", hm: 12, hd: 10, color: "#FB8C00" },
];

export const WHITE_DAYS = [13, 14, 15];

export function occasionOn(h: Hijri) {
  return OCCASIONS.find((o) => o.hm === h.hm && o.hd === h.hd) ?? null;
}

/** The next date (today included) of each occasion, soonest first. */
export function upcomingOccasions(today: Ymd) {
  const h = toHijri(today);
  const t0 = Date.UTC(today.y, today.m - 1, today.d);
  return OCCASIONS.map((o) => {
    let hy = h.hy;
    if (o.hm < h.hm || (o.hm === h.hm && o.hd < h.hd)) hy += 1;
    const g = fromHijri(hy, o.hm, Math.min(o.hd, hijriMonthLength(hy, o.hm)));
    const days = g ? Math.round((Date.UTC(g.y, g.m - 1, g.d) - t0) / 86_400_000) : Infinity;
    return { ...o, hy, g, days };
  })
    .filter((o) => o.g)
    .sort((a, b) => a.days - b.days);
}
