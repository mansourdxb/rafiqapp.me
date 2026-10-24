// Place search / reverse geocoding (Nominatim, like the app's cityService) and the place's time zone.
import type { Place } from "./compute";

/** Like the app: non-Arabic-script languages fall back to English for places with no local name. */
const accept = (lang: string) => (["ar", "ur", "fa", "en"].includes(lang) ? lang : `${lang},en`);

type NomAddress = {
  city?: string;
  town?: string;
  village?: string;
  municipality?: string;
  county?: string;
  state?: string;
  country?: string;
  country_code?: string;
};
type NomItem = { lat: string; lon: string; name?: string; display_name?: string; address?: NomAddress };

export type PlaceHit = Omit<Place, "tz"> & { label: string };

function toHit(it: NomItem): PlaceHit | null {
  const lat = Number(it.lat);
  const lng = Number(it.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const a = it.address ?? {};
  const name = a.city ?? a.town ?? a.village ?? a.municipality ?? it.name ?? a.county ?? a.state ?? "";
  return { name, country: a.country, cc: a.country_code, lat, lng, label: it.display_name ?? name };
}

export async function searchPlaces(q: string, lang: string, signal?: AbortSignal): Promise<PlaceHit[]> {
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=8&accept-language=${encodeURIComponent(accept(lang))}&q=${encodeURIComponent(q)}`;
  const r = await fetch(url, { signal, headers: { Accept: "application/json" } });
  if (!r.ok) throw new Error(String(r.status));
  const data = (await r.json()) as NomItem[];
  const seen = new Set<string>();
  return data
    .map(toHit)
    .filter((h): h is PlaceHit => !!h && !!h.name)
    .filter((h) => {
      const k = `${h.name}|${h.country}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
}

export async function reversePlace(lat: number, lng: number, lang: string): Promise<PlaceHit | null> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&lat=${lat}&lon=${lng}&accept-language=${encodeURIComponent(accept(lang))}`;
  try {
    const r = await fetch(url, { headers: { Accept: "application/json" } });
    if (!r.ok) return null;
    const hit = toHit({ ...(await r.json()), lat: String(lat), lon: String(lng) });
    return hit?.name ? hit : null;
  } catch {
    return null;
  }
}

export const browserTz = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
};

const validTz = (tz: unknown): tz is string => {
  if (typeof tz !== "string" || !tz) return false;
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
};

/** IANA zone of a coordinate: Open-Meteo (`timezone=auto`), then timeapi.io, else the browser's. */
export async function lookupTz(lat: number, lng: number): Promise<string> {
  const sources: [string, (j: Record<string, unknown>) => unknown][] = [
    [`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&timezone=auto&forecast_days=1`, (j) => j.timezone],
    [`https://timeapi.io/api/timezone/coordinate?latitude=${lat}&longitude=${lng}`, (j) => j.timeZone],
  ];
  for (const [url, pick] of sources) {
    try {
      const r = await fetch(url);
      if (!r.ok) continue;
      const tz = pick(await r.json());
      if (validTz(tz)) return tz;
    } catch {}
  }
  return browserTz();
}

/** Browser geolocation → a Place (name in `lang`, the device's own time zone). */
function gpsLocate(lang: string): Promise<Place> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation || !window.isSecureContext) return reject(new Error("unsupported"));
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(4));
        const lng = Number(pos.coords.longitude.toFixed(4));
        const hit = await reversePlace(lat, lng, lang);
        resolve({ name: hit?.name ?? `${lat}, ${lng}`, country: hit?.country, cc: hit?.cc, lat, lng, tz: browserTz(), lang });
      },
      (err) => reject(err),
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 600000 },
    );
  });
}

/**
 * Approximate city from the connection (geojs.io, no key) — used when the phone refuses or can't give
 * a position: in-app browsers (WhatsApp, Instagram…) and phones with location turned off for the browser.
 */
async function ipLocate(lang: string): Promise<Place> {
  const r = await fetch("https://get.geojs.io/v1/ip/geo.json");
  if (!r.ok) throw new Error("ip");
  const g = (await r.json()) as { latitude?: string; longitude?: string; timezone?: string; city?: string; country?: string; country_code?: string };
  const lat = Number(Number(g.latitude).toFixed(4));
  const lng = Number(Number(g.longitude).toFixed(4));
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || (lat === 0 && lng === 0)) throw new Error("ip");
  const hit = await reversePlace(lat, lng, lang);
  return {
    name: hit?.name ?? g.city ?? `${lat}, ${lng}`,
    country: hit?.country ?? g.country,
    cc: hit?.cc ?? g.country_code?.toLowerCase(),
    lat,
    lng,
    tz: g.timezone || browserTz(),
    lang,
  };
}

/** The visitor's place: the phone's position, else the approximate city of the connection. */
export async function locate(lang: string): Promise<Place> {
  try {
    return await gpsLocate(lang);
  } catch {
    return ipLocate(lang);
  }
}
