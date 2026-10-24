"use client";
// "Use my location" + city search (Nominatim, results in the site language). Saves the chosen place.
import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { prayerMsg } from "@/i18n/messages/prayer";
import { Icon } from "@/components/ui/Icon";
import { locate, lookupTz, searchPlaces, type PlaceHit } from "@/lib/prayer/location";
import { placeStore } from "@/lib/prayer/store";

export function LocationPicker({ lang, tone = "light", onDone }: { lang: Locale; tone?: "light" | "dark"; onDone?: () => void }) {
  const t = prayerMsg[lang];
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<PlaceHit[] | null>(null);
  const [busy, setBusy] = useState<"search" | "locate" | "pick" | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  // debounced search (Nominatim asks for ≤ 1 request/second)
  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) return;
    const ctl = new AbortController();
    const id = setTimeout(() => {
      setBusy("search");
      setErr(null);
      searchPlaces(term, lang, ctl.signal)
        .then((r) => {
          setHits(r);
          setOpen(true);
        })
        .catch((e) => {
          if (e?.name !== "AbortError") setErr(t.searchError);
        })
        .finally(() => setBusy((b) => (b === "search" ? null : b)));
    }, 700);
    return () => {
      clearTimeout(id);
      ctl.abort();
    };
  }, [q, lang, t.searchError]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const pick = async (h: PlaceHit) => {
    setBusy("pick");
    setOpen(false);
    const tz = await lookupTz(h.lat, h.lng);
    placeStore.set({ name: h.name, country: h.country, cc: h.cc, lat: h.lat, lng: h.lng, tz, lang });
    setQ("");
    setHits(null);
    setBusy(null);
    onDone?.();
  };

  const useMine = async () => {
    setBusy("locate");
    setErr(null);
    try {
      placeStore.set(await locate(lang));
      onDone?.();
    } catch {
      setErr(t.locError);
    } finally {
      setBusy(null);
    }
  };

  const dark = tone === "dark";
  return (
    <div ref={boxRef} className="relative flex w-full flex-col gap-2 sm:flex-row sm:items-start">
      <div className="relative min-w-0 flex-1">
        <span className={`pointer-events-none absolute inset-y-0 start-3 flex items-center ${dark ? "text-white/70" : "text-ink-2"}`}>
          <Icon name="search" className="size-4.5" />
        </span>
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            if (e.target.value.trim().length < 2) setHits(null);
          }}
          onFocus={() => hits && setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && hits?.[0]) pick(hits[0]);
            if (e.key === "Escape") setOpen(false);
          }}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchPlaceholder}
          aria-controls={listId}
          aria-expanded={open}
          role="combobox"
          autoComplete="off"
          className={`h-11 w-full rounded-xl ps-10 pe-3 text-[15px] outline-none transition focus:ring-2 ${
            dark
              ? "bg-white/12 text-white placeholder:text-white/60 ring-white/40 border border-white/20"
              : "border border-line bg-card text-ink placeholder:text-ink-2 ring-primary/40"
          }`}
        />
        {open && (hits || busy === "search") && (
          <ul
            id={listId}
            role="listbox"
            className="absolute inset-x-0 top-12 z-30 max-h-72 overflow-auto rounded-xl border border-line bg-card p-1 text-ink shadow-xl"
          >
            {busy === "search" && !hits?.length && <li className="px-3 py-2.5 text-sm text-ink-2">{t.searching}</li>}
            {hits?.length === 0 && busy !== "search" && <li className="px-3 py-2.5 text-sm text-ink-2">{t.noResults}</li>}
            {hits?.map((h) => (
              <li key={`${h.lat},${h.lng}`} role="option" aria-selected={false}>
                <button
                  type="button"
                  onClick={() => pick(h)}
                  className="flex w-full items-start gap-2 rounded-lg px-3 py-2 text-start hover:bg-tint focus:bg-tint focus:outline-none"
                >
                  <Icon name="location" className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{h.name}</span>
                    <span className="block truncate text-xs text-ink-2">{h.label}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="button"
        onClick={useMine}
        disabled={busy === "locate"}
        className={`inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition disabled:opacity-70 ${
          dark ? "bg-white text-navy hover:bg-white/90" : "bg-primary text-white hover:bg-primary-deep"
        }`}
      >
        <Icon name="location" className="size-4.5" />
        {busy === "locate" ? t.locating : t.useLocation}
      </button>
      {(err || busy === "pick") && (
        <p className={`text-sm sm:absolute sm:top-12 sm:start-0 ${dark ? "text-white/85" : err ? "text-orange" : "text-ink-2"}`} role="status">
          {err ?? t.searching}
        </p>
      )}
    </div>
  );
}
