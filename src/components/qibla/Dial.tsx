// Compass dial (north-up at rotation 0): degree bezel, cardinal letters from the app, Kaaba badge and
// Qibla needle at `qibla`, optional sun/moon marks. `rotation` turns the whole card (live compass).
import type { Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";

const C = 150;
// rounded, so server and browser render identical attributes
const r2 = (v: number) => Math.round(v * 100) / 100;
const pt = (deg: number, r: number) => ({ x: r2(C + r * Math.sin((deg * Math.PI) / 180)), y: r2(C - r * Math.cos((deg * Math.PI) / 180)) });
const CARDINALS = [
  ["n", 0, true],
  ["ne", 45, false],
  ["e", 90, true],
  ["se", 135, false],
  ["s", 180, true],
  ["sw", 225, false],
  ["w", 270, true],
  ["nw", 315, false],
] as const;

export type DialMark = { deg: number; kind: "sun" | "moon"; dim?: boolean };

export function Dial({
  lang,
  qibla,
  rotation = 0,
  aligned = false,
  marks = [],
  pointer = false,
  className = "",
}: {
  lang: Locale;
  qibla: number;
  rotation?: number;
  aligned?: boolean;
  marks?: DialMark[];
  pointer?: boolean;
  className?: string;
}) {
  const ticks = [];
  for (let d = 0; d < 360; d += 5) {
    const major = d % 30 === 0;
    const a = pt(d, 144);
    const b = pt(d, major ? 132 : 138);
    ticks.push(<line key={d} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeWidth={major ? 1.6 : 0.8} opacity={major ? 0.7 : 0.4} />);
  }
  const nums = [];
  for (let d = 30; d < 360; d += 30) {
    if (d % 90 === 0) continue;
    const p = pt(d, 121);
    nums.push(
      <text key={d} x={p.x} y={p.y} fontSize="10" fontWeight="600" textAnchor="middle" dominantBaseline="central" fill="currentColor" opacity={0.55} transform={`rotate(${d} ${p.x} ${p.y})`}>
        {d}
      </text>,
    );
  }
  const needleColor = aligned ? "#F47A1F" : "#029CCD";
  const k = pt(qibla, 78);
  return (
    <svg viewBox="0 0 300 300" className={className} role="img" aria-label={`${Math.round(qibla)}°`}>
      <defs>
        <radialGradient id="dialFace" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="var(--card)" />
          <stop offset="100%" stopColor="var(--tint)" />
        </radialGradient>
      </defs>
      <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "150px 150px", transition: "transform 0.25s ease-out" }}>
        <circle cx={C} cy={C} r={147} fill="#E8B84B" opacity={0.18} />
        <circle cx={C} cy={C} r={128} fill="url(#dialFace)" stroke="var(--line)" />
        <g className="text-ink">{ticks}</g>
        <g className="text-ink-2">{nums}</g>
        {CARDINALS.map(([key, deg, primary]) => {
          const p = pt(deg, primary ? 104 : 108);
          return (
            <text
              key={key}
              x={p.x}
              y={p.y}
              fontSize={primary ? 17 : 10}
              fontWeight={primary ? 800 : 600}
              textAnchor="middle"
              dominantBaseline="central"
              fill={deg === 0 ? "#F47A1F" : primary ? "var(--ink)" : "var(--ink-2)"}
              transform={`rotate(${deg} ${p.x} ${p.y})`}
            >
              {appT(lang, `alm.qibla.dir.${key}`)}
            </text>
          );
        })}
        {marks.map((m) => {
          const p = pt(m.deg, 140);
          return m.kind === "sun" ? (
            <g key="sun" opacity={m.dim ? 0.35 : 1}>
              <circle cx={p.x} cy={p.y} r={9} fill="#F9A825" stroke="#fff" strokeWidth={2} />
            </g>
          ) : (
            <g key="moon" opacity={m.dim ? 0.35 : 1}>
              <circle cx={p.x} cy={p.y} r={8} fill="#B0BEC5" stroke="#fff" strokeWidth={2} />
              <circle cx={p.x + 3} cy={p.y - 2} r={6} fill="#ECEFF1" />
            </g>
          );
        })}
        {/* qibla needle */}
        <g transform={`rotate(${qibla} ${C} ${C})`}>
          <path d={`M${C} ${C - 64}L${C + 11} ${C}L${C} ${C + 14}L${C - 11} ${C}Z`} fill={needleColor} />
          <path d={`M${C} ${C - 64}L${C + 11} ${C}L${C - 11} ${C}Z`} fill="#000" opacity={0.12} />
        </g>
        {/* kaaba badge */}
        <g transform={`translate(${k.x} ${k.y}) rotate(${qibla})`}>
          <rect x={-10} y={-11} width={20} height={22} rx={2} fill={aligned ? "#F47A1F" : "#16202B"} stroke="#E8B84B" strokeWidth={1.5} />
          <line x1={-10} y1={-4} x2={10} y2={-4} stroke="#E8B84B" strokeWidth={2.2} />
        </g>
        <circle cx={C} cy={C} r={13} fill="var(--card)" stroke={needleColor} strokeWidth={3} />
        <circle cx={C} cy={C} r={4} fill={needleColor} />
      </g>
      {pointer && <path d={`M${C} 2L${C + 9} 18H${C - 9}Z`} fill={aligned ? "#F47A1F" : "#0D245E"} className="dark:fill-white" />}
    </svg>
  );
}
