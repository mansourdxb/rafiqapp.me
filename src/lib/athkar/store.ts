"use client";
// Small localStorage-backed state shared by the adhkar, tasbeeh and names pages.
// useSyncExternalStore keeps the server render (and first client render) on the fallback,
// then switches to the saved value without a hydration mismatch.
import { useCallback, useMemo, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function useStored<T>(key: string, fallback: T) {
  const raw = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );
  const value = useMemo<T>(() => {
    if (raw == null) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
    // fallback is a literal at each call site; only the stored text matters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const cur = (() => {
        const r = read(key);
        if (r == null) return fallback;
        try {
          return JSON.parse(r) as T;
        } catch {
          return fallback;
        }
      })();
      const v = typeof next === "function" ? (next as (p: T) => T)(cur) : next;
      try {
        localStorage.setItem(key, JSON.stringify(v));
      } catch {}
      notify();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  return [value, set] as const;
}

/** True after hydration (false during the static render). */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/** Local calendar day, e.g. "2026-10-24" — progress and "today" totals reset with it. */
export function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
