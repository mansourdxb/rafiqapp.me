"use client";
// Reciter dropdown like the app: photo + name, grouped by recitation style, with search; the
// current reciter is ticked. Opens as a panel under the button (a sheet on phones).
import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { CATEGORIES, LISTED_RECITERS, reciterShortName } from "@/lib/player/reciters";
import { searchFold } from "@/lib/searchFold";
import { ReciterAvatar } from "./ReciterAvatar";

export function ReciterPicker({ lang, value, label, searchLabel, onPick }: { lang: Locale; value: string; label: string; searchLabel: string; onPick: (key: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => box.current && !box.current.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && (e.stopPropagation(), setOpen(false));
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc, true);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc, true);
    };
  }, [open]);

  const groups = useMemo(() => {
    const k = searchFold(q);
    return CATEGORIES.map((c) => ({
      title: appT(lang, c.key),
      list: LISTED_RECITERS.filter((r) => r.cat === c.cat && (!k || Object.values(r.names).some((n) => searchFold(n).includes(k)))),
    })).filter((g) => g.list.length);
  }, [q, lang]);

  return (
    <div ref={box} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex h-9 items-center gap-1 rounded-full px-3.5 text-sm font-bold text-primary ring-1 ring-primary hover:bg-tint"
      >
        {label}
        <svg viewBox="0 0 24 24" className={`size-4 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="fixed left-1/2 top-1/2 z-[80] flex max-h-[min(70dvh,30rem)] w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[15px] bg-white shadow-[0_10px_45px_rgba(0,0,0,0.35)] ring-1 ring-black/10 dark:bg-card">
          <div className="border-b border-line p-2">
            <input
              autoFocus
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={searchLabel}
              aria-label={searchLabel}
              className="h-10 w-full rounded-full bg-white px-4 text-sm text-navy-2 ring-2 ring-edge/70 outline-none focus:ring-primary dark:bg-canvas dark:text-white"
            />
          </div>
          <div className="overflow-y-auto py-1" role="listbox" aria-label={label}>
            {groups.map((g) => (
              <div key={g.title}>
                <p className="sticky top-0 z-10 bg-tint px-3 py-1.5 text-xs font-bold text-navy-2 dark:text-ink">{g.title}</p>
                {g.list.map((r) => {
                  const on = r.key === value;
                  return (
                    <button
                      key={r.key}
                      type="button"
                      role="option"
                      aria-selected={on}
                      onClick={() => {
                        onPick(r.key);
                        setOpen(false);
                        setQ("");
                      }}
                      className={`flex w-full items-center gap-3 px-3 py-2 text-start hover:bg-tint ${on ? "bg-tint" : ""}`}
                    >
                      <ReciterAvatar reciter={r.key} size={36} className="shrink-0 rounded-full" />
                      <span className={`min-w-0 flex-1 truncate text-sm ${on ? "font-bold text-primary" : "font-semibold text-navy-2 dark:text-ink"}`}>{reciterShortName(lang, r.key)}</span>
                      {on && (
                        <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth={2.6} aria-hidden>
                          <path d="M5 12l5 5 9-10" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
