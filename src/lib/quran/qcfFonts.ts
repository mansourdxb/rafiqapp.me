"use client";
// King Fahd QCF V1 page fonts (p1–p604), loaded on demand with the FontFace API — the web side of
// the app's client/src/lib/quran/qcfFonts.ts. Bases are tried in order (our assets repo, then
// quran.com); a file is used only when its SHA-256 matches the app's list (a different file would
// draw different words). Until a page font is ready the reader draws the Unicode text.
import { useEffect, useSyncExternalStore } from "react";
import fonts from "@/generated/quran-fonts.json";

const BASES = (fonts as { bases: string[] }).bases;
export const qcfFamily = (page: number) => `qcf1_p${page}`;

const ready = new Set<number>();
const failed = new Set<number>();
const pending = new Map<number, Promise<boolean>>();
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

async function sha256Hex(buf: ArrayBuffer): Promise<string | null> {
  if (typeof crypto === "undefined" || !crypto.subtle) return null;
  const d = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(d), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function load(page: number, sha: string): Promise<boolean> {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}p${page}.ttf`, { cache: "force-cache" });
      if (!res.ok) continue;
      const buf = await res.arrayBuffer();
      const hash = await sha256Hex(buf);
      if (hash !== null && hash !== sha) continue;
      const face = new FontFace(qcfFamily(page), buf, { display: "block" });
      await face.load();
      document.fonts.add(face);
      return true;
    } catch {
      // next base
    }
  }
  return false;
}

/** Start loading page `page`'s font (no-op when loaded / loading). */
export function ensureQcf(page: number, sha: string): Promise<boolean> {
  if (ready.has(page)) return Promise.resolve(true);
  const p = pending.get(page);
  if (p) return p;
  const run = load(page, sha).then((ok) => {
    (ok ? ready : failed).add(page);
    pending.delete(page);
    notify();
    return ok;
  });
  pending.set(page, run);
  return run;
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

/** "ready" | "loading" | "failed" for one page (always "loading" on the server). */
export function useQcfFont(page: number, sha: string | undefined): "ready" | "loading" | "failed" {
  const state = useSyncExternalStore(
    subscribe,
    () => (ready.has(page) ? "ready" : failed.has(page) ? "failed" : "loading"),
    () => "loading" as const,
  );
  useEffect(() => {
    if (sha) void ensureQcf(page, sha);
  }, [page, sha]);
  return state;
}
