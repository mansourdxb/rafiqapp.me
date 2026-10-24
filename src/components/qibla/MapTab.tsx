"use client";
// Map: OpenStreetMap tiles drawn as SVG <image>s with the great-circle line to the Kaaba (no map library).
import { useMemo } from "react";
import type { Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { qiblaMsg } from "@/i18n/messages/qibla";
import { localDigits } from "@/lib/digits";
import type { Place } from "@/lib/prayer/compute";
import { greatCircle, KAABA, project } from "@/lib/qibla/geo";

const W = 640;
const H = 420;
const PAD = 48;

export function MapTab({ lang, place, km }: { lang: Locale; place: Place; km: number }) {
  const t = qiblaMsg[lang];
  const view = useMemo(() => {
    const path = greatCircle(place.lat, place.lng);
    let z = 14;
    for (; z > 1; z--) {
      const ps = path.map((p) => project(p.lat, p.lng, z));
      const w = Math.max(...ps.map((p) => p.x)) - Math.min(...ps.map((p) => p.x));
      const h = Math.max(...ps.map((p) => p.y)) - Math.min(...ps.map((p) => p.y));
      if (w <= W - 2 * PAD && h <= H - 2 * PAD) break;
    }
    const ps = path.map((p) => project(p.lat, p.lng, z));
    const cx = (Math.max(...ps.map((p) => p.x)) + Math.min(...ps.map((p) => p.x))) / 2;
    const cy = (Math.max(...ps.map((p) => p.y)) + Math.min(...ps.map((p) => p.y))) / 2;
    const x0 = cx - W / 2;
    const y0 = cy - H / 2;
    const n = 2 ** z;
    const tiles: { key: string; x: number; y: number; href: string }[] = [];
    for (let tx = Math.floor(x0 / 256); tx <= Math.floor((x0 + W) / 256); tx++) {
      for (let ty = Math.max(0, Math.floor(y0 / 256)); ty <= Math.min(n - 1, Math.floor((y0 + H) / 256)); ty++) {
        const wx = ((tx % n) + n) % n;
        tiles.push({ key: `${tx}/${ty}`, x: tx * 256 - x0, y: ty * 256 - y0, href: `https://tile.openstreetmap.org/${z}/${wx}/${ty}.png` });
      }
    }
    // the path ends at the Kaaba with the same unwrapped longitude
    const last = path[path.length - 1];
    const k = project(KAABA.lat, last.lng, z);
    return {
      tiles,
      line: ps.map((p) => `${(p.x - x0).toFixed(1)},${(p.y - y0).toFixed(1)}`).join(" "),
      me: { x: ps[0].x - x0, y: ps[0].y - y0 },
      kaaba: { x: k.x - x0, y: k.y - y0 },
    };
  }, [place.lat, place.lng]);

  return (
    <div>
      <div className="overflow-hidden rounded-xl bg-tint ring-2 ring-edge/70">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={appT(lang, "alm.qibla.mapDirection")}>
          {view.tiles.map((tl) => (
            <image key={tl.key} href={tl.href} x={tl.x} y={tl.y} width={256} height={256} />
          ))}
          <polyline points={view.line} fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
          <polyline points={view.line} fill="none" stroke="#F47A1F" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          <g transform={`translate(${view.me.x} ${view.me.y})`}>
            <circle r={11} fill="#029CCD" opacity={0.25} />
            <circle r={6.5} fill="#029CCD" stroke="#fff" strokeWidth={2.5} />
          </g>
          <g transform={`translate(${view.kaaba.x} ${view.kaaba.y})`}>
            <rect x={-10} y={-11} width={20} height={22} rx={2} fill="#16202B" stroke="#E8B84B" strokeWidth={1.6} />
            <line x1={-10} y1={-4} x2={10} y2={-4} stroke="#E8B84B" strokeWidth={2.2} />
          </g>
          <rect x={W - 178} y={H - 20} width={178} height={20} fill="#fff" opacity={0.8} />
          <text x={W - 6} y={H - 6} fontSize={11} textAnchor="end" fill="#333">
            © OpenStreetMap contributors
          </text>
        </svg>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
        <p className="text-ink-2">{t.mapNote}</p>
        <p className="font-bold text-ink">
          {appT(lang, "alm.qibla.distanceLabel")}: {localDigits(lang, Math.round(km).toLocaleString("en-US"))} {appT(lang, "alm.qibla.kmUnit")}
        </p>
      </div>
    </div>
  );
}
