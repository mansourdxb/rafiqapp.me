// Qibla bearing + distance (same formulas as the app's AlMosalyQiblaScreen) and the great-circle path.
export const KAABA = { lat: 21.4225, lng: 39.8262 };
const R = Math.PI / 180;

export const normDeg = (d: number) => ((d % 360) + 360) % 360;
/** Signed smallest angle from a to b, in (-180, 180]. */
export const angleDiff = (a: number, b: number) => ((b - a + 540) % 360) - 180;

/** True bearing from north (0–360°) of the Kaaba from lat/lng. */
export function qiblaBearing(lat: number, lng: number) {
  const phi = lat * R;
  const dl = (KAABA.lng - lng) * R;
  return normDeg(Math.atan2(Math.sin(dl), Math.cos(phi) * Math.tan(KAABA.lat * R) - Math.sin(phi) * Math.cos(dl)) / R);
}

export function distanceKm(lat: number, lng: number) {
  const dLat = (KAABA.lat - lat) * R;
  const dLon = (KAABA.lng - lng) * R;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat * R) * Math.cos(KAABA.lat * R) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Points along the great circle to the Kaaba; longitudes are unwrapped (may leave ±180). */
export function greatCircle(lat: number, lng: number, n = 64) {
  const p1 = [lat * R, lng * R];
  const p2 = [KAABA.lat * R, KAABA.lng * R];
  const d = 2 * Math.asin(Math.sqrt(Math.sin((p2[0] - p1[0]) / 2) ** 2 + Math.cos(p1[0]) * Math.cos(p2[0]) * Math.sin((p2[1] - p1[1]) / 2) ** 2));
  const out: { lat: number; lng: number }[] = [];
  let prev = lng;
  for (let i = 0; i <= n; i++) {
    const f = i / n;
    let la: number, lo: number;
    if (d < 1e-9) {
      la = lat;
      lo = lng;
    } else {
      const A = Math.sin((1 - f) * d) / Math.sin(d);
      const B = Math.sin(f * d) / Math.sin(d);
      const x = A * Math.cos(p1[0]) * Math.cos(p1[1]) + B * Math.cos(p2[0]) * Math.cos(p2[1]);
      const y = A * Math.cos(p1[0]) * Math.sin(p1[1]) + B * Math.cos(p2[0]) * Math.sin(p2[1]);
      const z = A * Math.sin(p1[0]) + B * Math.sin(p2[0]);
      la = Math.atan2(z, Math.sqrt(x * x + y * y)) / R;
      lo = Math.atan2(y, x) / R;
    }
    while (lo - prev > 180) lo -= 360;
    while (lo - prev < -180) lo += 360;
    prev = lo;
    out.push({ lat: la, lng: lo });
  }
  return out;
}

/** Web-Mercator world pixel at zoom z (256-px tiles). */
export function project(lat: number, lng: number, z: number) {
  const s = 256 * 2 ** z;
  const sin = Math.min(Math.max(Math.sin(lat * R), -0.9999), 0.9999);
  return { x: ((lng + 180) / 360) * s, y: (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * s };
}
