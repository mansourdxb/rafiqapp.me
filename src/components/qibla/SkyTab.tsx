"use client";
// Sun & moon: where they are now relative to north, and the Qibla's angle from each (as in the app).
import type { Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { qiblaMsg } from "@/i18n/messages/qibla";
import { localDigits } from "@/lib/digits";
import { formatTime, type Place, type PrayerSettings } from "@/lib/prayer/compute";
import { moonPosition, nextRise, sunPosition } from "@/lib/qibla/astro";
import { normDeg } from "@/lib/qibla/geo";
import { useNow } from "@/components/prayer/usePlace";
import { Dial, type DialMark } from "./Dial";

export function SkyTab({ lang, place, qibla, s }: { lang: Locale; place: Place; qibla: number; s: PrayerSettings }) {
  const t = qiblaMsg[lang];
  const now = useNow(30_000);
  if (!now) return <div className="aspect-square w-full max-w-[340px]" />;
  const sun = sunPosition(now, place.lat, place.lng);
  const moon = moonPosition(now, place.lat, place.lng);
  const sunUp = sun.altitude > -0.83;
  const moonUp = moon.altitude > 0;
  const marks: DialMark[] = [
    { deg: sun.azimuth, kind: "sun", dim: !sunUp },
    { deg: moon.azimuth, kind: "moon", dim: !moonUp },
  ];
  const deg = (v: number) => localDigits(lang, Math.round(normDeg(v)));
  const time = (d: Date | null) => (d ? formatTime(d, place.tz, lang, s.hour12) : "—");

  const card = (kind: "sun" | "moon", up: boolean, az: number, alt: number) => (
    <div className={`rounded-2xl border p-4 ${up ? "border-primary/30 bg-tint" : "border-line bg-canvas opacity-80"}`}>
      <p className="flex items-center gap-2 font-bold text-ink">
        <span className={`inline-block size-3 rounded-full ${kind === "sun" ? "bg-[#F9A825]" : "bg-[#B0BEC5]"}`} />
        {appT(lang, kind === "sun" ? "alm.qibla.sun" : "alm.qibla.moon")}
      </p>
      <dl className="mt-2 grid grid-cols-2 gap-2 text-sm">
        <div>
          <dt className="text-ink-2">{t.azimuth}</dt>
          <dd className="font-bold text-ink">{deg(az)}°</dd>
        </div>
        <div>
          <dt className="text-ink-2">{t.altitude}</dt>
          <dd className="font-bold text-ink">{localDigits(lang, Math.round(alt))}°</dd>
        </div>
      </dl>
      {up ? (
        <p className="mt-3 text-sm font-semibold text-primary">
          {appT(lang, kind === "sun" ? "alm.qibla.fromSun" : "alm.qibla.fromMoon", { deg: deg(qibla - az) })}
        </p>
      ) : (
        <p className="mt-3 text-sm text-ink-2" dir="auto">
          {appT(lang, kind === "sun" ? "alm.qibla.nextSun" : "alm.qibla.nextMoon", {
            time: time(nextRise((d) => (kind === "sun" ? sunPosition(d, place.lat, place.lng) : moonPosition(d, place.lat, place.lng)), now, kind === "sun" ? -0.83 : 0)),
          })}
        </p>
      )}
    </div>
  );

  return (
    <div className="grid items-center gap-6 md:grid-cols-2">
      <div className="mx-auto w-full max-w-[340px]">
        <Dial lang={lang} qibla={qibla} marks={marks} className="w-full" />
      </div>
      <div className="space-y-3">
        <p className="text-sm text-ink">
          {sunUp ? appT(lang, "alm.qibla.pointSun") : moonUp ? appT(lang, "alm.qibla.pointMoon") : appT(lang, "alm.qibla.belowHorizon")}
        </p>
        {sunUp && sun.altitude > 75 && <p className="text-sm text-orange">{appT(lang, "alm.qibla.sunTooHigh")}</p>}
        {card("sun", sunUp, sun.azimuth, sun.altitude)}
        {card("moon", moonUp, moon.azimuth, moon.altitude)}
      </div>
    </div>
  );
}
