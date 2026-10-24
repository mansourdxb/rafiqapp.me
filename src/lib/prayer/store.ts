// Tiny localStorage-backed stores read with useSyncExternalStore (no setState-in-effect, SSR-safe).
import { useSyncExternalStore } from "react";
import { DEFAULT_SETTINGS, type Place, type PrayerSettings } from "./compute";

export function createStore<T>(key: string, parse: (raw: string | null) => T) {
  const listeners = new Set<() => void>();
  let mem: string | null = null; // used when storage is blocked
  let cache: { raw: string | null; val: T } | null = null;
  const read = () => {
    try {
      return localStorage.getItem(key) ?? mem;
    } catch {
      return mem;
    }
  };
  const get = () => {
    const raw = read();
    if (!cache || cache.raw !== raw) cache = { raw, val: parse(raw) };
    return cache.val;
  };
  const server = parse(null);
  const subscribe = (l: () => void) => {
    listeners.add(l);
    const onStorage = (e: StorageEvent) => e.key === key && l();
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(l);
      window.removeEventListener("storage", onStorage);
    };
  };
  return {
    get,
    set(v: T) {
      mem = JSON.stringify(v);
      try {
        localStorage.setItem(key, mem);
      } catch {}
      listeners.forEach((l) => l());
    },
    use() {
      return useSyncExternalStore(subscribe, get, () => server);
    },
  };
}

function safeJson(raw: string | null): unknown {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const placeStore = createStore<Place | null>("rafiq.place.v1", (raw) => {
  const v = safeJson(raw) as Place | null;
  return v && Number.isFinite(v.lat) && Number.isFinite(v.lng) && typeof v.tz === "string" ? v : null;
});

export const settingsStore = createStore<PrayerSettings>("rafiq.prayerSettings.v1", (raw) => {
  const v = safeJson(raw) as Partial<PrayerSettings> | null;
  return { ...DEFAULT_SETTINGS, ...(v ?? {}) };
});

/** Hydration-safe "has mounted" flag (false on the server and during hydration). */
const noop = () => () => {};
export function useMounted() {
  return useSyncExternalStore(noop, () => true, () => false);
}
