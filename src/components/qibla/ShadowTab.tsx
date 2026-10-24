"use client";
// Shadow method: today's moments when the sun's azimuth equals the Qibla bearing (face the sun) or
// its opposite (the shadow points to the Qibla).
import { useMemo } from "react";
import type { Locale } from "@/i18n/config";
import { qiblaMsg } from "@/i18n/messages/qibla";
import { formatTime, ymdInTz, zonedMidnight, type Place, type PrayerSettings } from "@/lib/prayer/compute";
import { sunAzimuthCrossings } from "@/lib/qibla/astro";
import { normDeg } from "@/lib/qibla/geo";
import { useNow } from "@/components/prayer/usePlace";

export function ShadowTab({ lang, place, qibla, s }: { lang: Locale; place: Place; qibla: number; s: PrayerSettings }) {
  const t = qiblaMsg[lang];
  const now = useNow(60_000);
  const day = now ? ymdInTz(now, place.tz) : null;
  const events = useMemo(() => {
    if (!day) return [];
    const start = zonedMidnight(day.y, day.m, day.d, place.tz);
    const end = new Date(start.getTime() + 86_400_000);
    return [
      ...sunAzimuthCrossings(start, end, place.lat, place.lng, normDeg(qibla + 180)).map((at) => ({ at, toward: true })),
      ...sunAzimuthCrossings(start, end, place.lat, place.lng, qibla).map((at) => ({ at, toward: false })),
    ].sort((a, b) => a.at.getTime() - b.at.getTime());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day?.y, day?.m, day?.d, place.lat, place.lng, place.tz, qibla]);

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:items-center">
      <svg viewBox="0 0 240 170" className="mx-auto w-full max-w-[300px]" aria-hidden>
        <ellipse cx="120" cy="140" rx="110" ry="22" fill="var(--tint)" />
        <circle cx="200" cy="34" r="16" fill="#F9A825" />
        <path d="M200 8v6M200 54v6M174 34h6M220 34h6M182 16l4 4M214 48l4 4M182 52l4-4M214 20l4-4" stroke="#F9A825" strokeWidth="3" strokeLinecap="round" />
        <path d="M110 140L30 152" stroke="#16202B" strokeOpacity="0.35" strokeWidth="9" strokeLinecap="round" />
        <rect x="106" y="62" width="8" height="80" rx="3" fill="#8D6E63" />
        <path d="M84 158L22 166" stroke="#029CCD" strokeWidth="3" strokeLinecap="round" />
        <path d="M30 160L20 166L31 170" fill="none" stroke="#029CCD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <g transform="translate(12 150)">
          <rect x="-9" y="-30" width="18" height="20" rx="2" fill="#16202B" stroke="#E8B84B" strokeWidth="1.5" />
          <line x1="-9" y1="-24" x2="9" y2="-24" stroke="#E8B84B" strokeWidth="2" />
        </g>
      </svg>
      <div className="space-y-3">
        <p className="text-sm text-ink">{t.shadowIntro}</p>
        {now && events.length === 0 && <p className="rounded-xl bg-tint p-3 text-sm text-ink">{t.shadowNone}</p>}
        {events.map(({ at, toward }) => {
          const passed = now != null && at.getTime() < now.getTime();
          return (
            <div key={at.getTime()} className={`flex items-center gap-4 rounded-2xl border border-line p-4 ${passed ? "opacity-60" : ""}`}>
              <span className="min-w-[5.5rem] text-center text-xl font-extrabold tabular-nums text-primary">{formatTime(at, place.tz, lang, s.hour12)}</span>
              <div className="min-w-0">
                <p className="font-bold text-ink">
                  {toward ? t.shadowToward : t.shadowAway}
                  {passed && <span className="ms-2 rounded-full bg-canvas px-2 py-0.5 text-xs font-semibold text-ink-2">{t.shadowPassed}</span>}
                </p>
                <p className="text-sm text-ink-2">{toward ? t.shadowTowardHint : t.shadowAwayHint}</p>
              </div>
            </div>
          );
        })}
        <p className="rounded-xl bg-tint p-3 text-xs leading-relaxed text-ink">{t.kaabaFact}</p>
      </div>
    </div>
  );
}
