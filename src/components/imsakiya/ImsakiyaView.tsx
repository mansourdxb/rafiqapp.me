"use client";
// Ramadan imsakiya for the saved place, after the app's RamadanImsakiyaScreen (3 colour themes, print).
import { isRtl, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { imsakiyaMsg } from "@/i18n/messages/imsakiya";
import { prayerMsg } from "@/i18n/messages/prayer";
import { Icon } from "@/components/ui/Icon";
import { localDigits } from "@/lib/digits";
import { computeDay, effectiveMethod, formatTime, ymdInTz } from "@/lib/prayer/compute";
import { METHOD_LABEL } from "@/lib/prayer/methods";
import { createStore } from "@/lib/prayer/store";
import { addDays, formatGregorian, fromHijri, hijriMonthLength, toHijri, weekdayName } from "@/lib/calendar/hijri";
import { LocationPicker } from "@/components/prayer/LocationPicker";
import { useNow, usePlace, useSettings } from "@/components/prayer/usePlace";
import { PRINT_CSS } from "@/components/prayer/printCss";

type ThemeId = "night" | "sunset" | "day";
// the app's three themes (header, table header, rows, text, pill)
const THEMES: Record<ThemeId, { swatch: string; header: string; head: string; row: string; alt: string; text: string; pillBg: string; pillText: string; title: string }> = {
  night: { swatch: "#4B3C6C", header: "#4B3C6C", head: "#006E9C", row: "#3A3152", alt: "#332B4A", text: "#FFFFFF", pillBg: "#FFFFFF", pillText: "#EB8D1B", title: "#FFFFFF" },
  sunset: { swatch: "#EE4F63", header: "#34100B", head: "#FB4867", row: "#FFFFFF", alt: "#EAEAEA", text: "#2B2B2B", pillBg: "#FFFFFF", pillText: "#34100B", title: "#FFFFFF" },
  day: { swatch: "#F5F0E8", header: "#E1F2F1", head: "#0B5A85", row: "#FFFFFF", alt: "#EAEAEA", text: "#103754", pillBg: "#103754", pillText: "#FFFFFF", title: "#103754" },
};
const ORDER: ThemeId[] = ["night", "sunset", "day"];
const themeStore = createStore<ThemeId>("rafiq.imsakiya.theme.v1", (raw) => {
  const v = raw ? raw.replace(/"/g, "") : "";
  return (ORDER as string[]).includes(v) ? (v as ThemeId) : "night";
});

const COLS = ["imsak", "fajr", "dhuhr", "asr", "maghrib", "isha"] as const;

export function ImsakiyaView({ lang }: { lang: Locale }) {
  const t = imsakiyaMsg[lang];
  const place = usePlace(lang);
  const s = useSettings();
  const now = useNow(60_000);
  const themeId = themeStore.use();
  const th = THEMES[themeId];
  const today = now ? ymdInTz(now, place.tz) : null;
  const h = today ? toHijri(today) : null;
  const year = h ? (h.hm > 9 ? h.hy + 1 : h.hy) : null; // the app: this year's Ramadan, or next year's once it has passed

  const rows = (() => {
    if (!year) return [];
    const start = fromHijri(year, 9, 1);
    if (!start) return [];
    return Array.from({ length: hijriMonthLength(year, 9) }, (_, i) => {
      const g = addDays(start, i);
      const tm = computeDay(place, s, g.y, g.m, g.d);
      return { day: i + 1, g, times: { imsak: new Date(tm.fajr.getTime() - 10 * 60_000), ...tm } };
    });
  })();

  const first = rows[0]?.g;
  const daysLeft = first && today ? Math.round((Date.UTC(first.y, first.m - 1, first.d) - Date.UTC(today.y, today.m - 1, today.d)) / 86_400_000) : null;
  const fmt = (d: Date) => formatTime(d, place.tz, lang, s.hour12).replace(/\s*(AM|PM|ص|م)$/u, "");
  const label = (k: (typeof COLS)[number]) =>
    k === "imsak" ? appT(lang, "alm.imsakiya.imsak") : k === "maghrib" ? `${appT(lang, "prayer.maghrib")} · ${appT(lang, "alm.imsakiya.iftar")}` : appT(lang, `prayer.${k}`);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
      <style>{PRINT_CSS}</style>
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{appT(lang, "more.imsakiya")}</h1>
        <div className="w-full lg:max-w-xl">
          <LocationPicker lang={lang} />
        </div>
      </div>
      {place.isDefault && <p className="mb-4 rounded-xl border border-primary/25 bg-tint px-4 py-3 text-sm text-ink">{prayerMsg[lang].defaultNotice}</p>}

      <section className="print-area overflow-hidden rounded-3xl shadow-lg" style={{ background: th.row }}>
        <div className="relative px-5 py-6 text-center sm:px-8" style={{ background: th.header, color: th.title }}>
          <div className="no-print absolute end-4 top-4 flex items-center gap-2">
            {ORDER.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => themeStore.set(id)}
                aria-label={`${t.theme}: ${t.themes[id]}`}
                aria-pressed={themeId === id}
                title={t.themes[id]}
                className={`size-7 rounded-full border-2 transition ${themeId === id ? "scale-110 border-current" : "border-white/40"}`}
                style={{ background: THEMES[id].swatch }}
              />
            ))}
          </div>
          <svg viewBox="0 0 24 24" className="mx-auto mb-2 size-9 opacity-90" fill="currentColor" aria-hidden>
            <path d="M15.5 3a8.5 8.5 0 1 0 5.4 15.1A9 9 0 0 1 15.5 3z" />
          </svg>
          <h2 className="text-xl font-extrabold sm:text-2xl">{year ? appT(lang, "alm.imsakiya.title", { year: localDigits(lang, year) }) : appT(lang, "more.imsakiya")}</h2>
          <p className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold" style={{ background: th.pillBg, color: th.pillText }}>
            <Icon name="location" className="size-4 shrink-0" />
            <span className="truncate">
              {place.label}
              {place.countryLabel ? `${isRtl(lang) ? "، " : ", "}${place.countryLabel}` : ""}
            </span>
          </p>
          {daysLeft != null && (
            <p className="mt-2 text-sm opacity-85">{daysLeft > 0 ? t.daysLeft.replace("{{n}}", localDigits(lang, daysLeft)) : t.started}</p>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-center text-sm" style={{ color: th.text }}>
            <thead>
              <tr style={{ background: th.head }} className="text-xs font-bold text-white">
                <th className="px-2 py-3 text-start">{appT(lang, "alm.imsakiya.colDay")}</th>
                <th className="px-2 py-3">{appT(lang, "alm.imsakiya.colRamadan")}</th>
                <th className="px-2 py-3">{appT(lang, "alm.imsakiya.colGreg")}</th>
                {COLS.map((k) => (
                  <th key={k} className="px-2 py-3">
                    {label(k)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const isToday = today && today.y === r.g.y && today.m === r.g.m && today.d === r.g.d;
                return (
                  <tr key={r.day} style={isToday ? { background: "#F47A1F", color: "#fff" } : { background: i % 2 ? th.alt : th.row }} className={isToday ? "font-bold" : ""}>
                    <td className="px-2 py-2 text-start whitespace-nowrap">{weekdayName(lang, r.g)}</td>
                    <td className="px-2 py-2 font-bold">{localDigits(lang, r.day)}</td>
                    <td className="px-2 py-2 whitespace-nowrap">{formatGregorian(lang, r.g, { day: "numeric", month: "short" })}</td>
                    {COLS.map((k) => (
                      <td key={k} className={`px-2 py-2 tabular-nums ${k === "imsak" || k === "maghrib" ? "font-extrabold" : ""}`} dir="ltr">
                        {fmt(r.times[k])}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-xs" style={{ color: th.text, background: th.alt }}>
          <p className="max-w-xl">
            {t.imsakNote} · {appT(lang, METHOD_LABEL[effectiveMethod(place, s)])} · {place.tz} · {appT(lang, "app.name")} — rafiqapp.me
          </p>
          <button type="button" onClick={() => window.print()} className="no-print inline-flex h-10 items-center gap-1.5 rounded-xl bg-orange px-4 text-sm font-bold text-white hover:brightness-110">
            {prayerMsg[lang].print}
          </button>
        </div>
      </section>
    </div>
  );
}
