// Sun and moon positions (low-precision formulas after Meeus / suncalc, ±0.5° — plenty for aiming).
const R = Math.PI / 180;
const DAY = 86_400_000;
const J1970 = 2440588;
const J2000 = 2451545;
const E = R * 23.4397; // obliquity of the ecliptic

const toDays = (t: Date) => t.getTime() / DAY - 0.5 + J1970 - J2000;
const ra = (l: number, b: number) => Math.atan2(Math.sin(l) * Math.cos(E) - Math.tan(b) * Math.sin(E), Math.cos(l));
const dec = (l: number, b: number) => Math.asin(Math.sin(b) * Math.cos(E) + Math.cos(b) * Math.sin(E) * Math.sin(l));
const sidereal = (d: number, lw: number) => R * (280.16 + 360.9856235 * d) - lw;

function horizontal(d: number, lat: number, lng: number, raV: number, decV: number) {
  const lw = R * -lng;
  const phi = R * lat;
  const H = sidereal(d, lw) - raV;
  const az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(decV) * Math.cos(phi)); // from south, westward
  const alt = Math.asin(Math.sin(phi) * Math.sin(decV) + Math.cos(phi) * Math.cos(decV) * Math.cos(H));
  return { azimuth: (((az / R + 180) % 360) + 360) % 360, altitude: alt / R }; // azimuth from north, clockwise
}

export function sunPosition(t: Date, lat: number, lng: number) {
  const d = toDays(t);
  const M = R * (357.5291 + 0.98560028 * d);
  const C = R * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  const L = M + C + R * 102.9372 + Math.PI;
  return horizontal(d, lat, lng, ra(L, 0), dec(L, 0));
}

export function moonPosition(t: Date, lat: number, lng: number) {
  const d = toDays(t);
  const L = R * (218.316 + 13.176396 * d);
  const M = R * (134.963 + 13.064993 * d);
  const F = R * (93.272 + 13.22935 * d);
  const l = L + R * 6.289 * Math.sin(M);
  const b = R * 5.128 * Math.sin(F);
  const p = horizontal(d, lat, lng, ra(l, b), dec(l, b));
  return { ...p, altitude: p.altitude - 0.95 * Math.cos(p.altitude * R) }; // ≈ lunar parallax
}

/** Next time (within 26 h) the body's altitude crosses `h0` going up. */
export function nextRise(pos: (t: Date) => { altitude: number }, from: Date, h0: number) {
  const step = 5 * 60_000;
  let prev = pos(from).altitude;
  for (let t = from.getTime() + step; t < from.getTime() + 26 * 3_600_000; t += step) {
    const a = pos(new Date(t)).altitude;
    if (prev < h0 && a >= h0) return new Date(t - (step * (a - h0)) / (a - prev));
    prev = a;
  }
  return null;
}

/**
 * Times on the day [start, end) when the sun's azimuth equals `target` while it is above the
 * horizon — at those moments shadows point exactly away from (or, with target+180, toward) it.
 */
export function sunAzimuthCrossings(start: Date, end: Date, lat: number, lng: number, target: number) {
  const step = 60_000;
  const out: Date[] = [];
  const diff = (t: number) => ((sunPosition(new Date(t), lat, lng).azimuth - target + 540) % 360) - 180;
  let pt = start.getTime();
  let pd = diff(pt);
  for (let t = pt + step; t <= end.getTime(); t += step) {
    const dv = diff(t);
    if (Math.sign(dv) !== Math.sign(pd) && Math.abs(dv - pd) < 90) {
      const at = new Date(pt + (step * pd) / (pd - dv));
      if (sunPosition(at, lat, lng).altitude > 3) out.push(at);
    }
    pt = t;
    pd = dv;
  }
  return out;
}
