"use client";
// FAQ accordion with search. Opens the question named in the URL hash (#qibla-accuracy).
import { useEffect, useMemo, useState } from "react";

type Item = { id: string; q: string; steps: string[] };
type Labels = { searchPlaceholder: string; noResults: string; expandAll: string; collapseAll: string };

const norm = (s: string) =>
  s
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ًͯ-ٰٟ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");

export function FaqList({ items, labels, digits }: { items: Item[]; labels: Labels; digits: string[] }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Set<string>>(new Set());

  useEffect(() => {
    const apply = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (id && items.some((i) => i.id === id)) {
        setOpen((s) => new Set(s).add(id));
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "start" }));
      }
    };
    const raf = requestAnimationFrame(apply);
    window.addEventListener("hashchange", apply);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", apply);
    };
  }, [items]);

  const shown = useMemo(() => {
    const n = norm(q.trim());
    if (!n) return items;
    return items.filter((i) => norm(i.q).includes(n) || i.steps.some((s) => norm(s).includes(n)));
  }, [q, items]);

  const allOpen = shown.length > 0 && shown.every((i) => open.has(i.id));
  const toggle = (id: string) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex h-12 flex-1 items-center gap-2 rounded-full bg-card px-4 ring-1 ring-line focus-within:ring-2 focus-within:ring-primary">
          <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-ink-2" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
            <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={labels.searchPlaceholder}
            aria-label={labels.searchPlaceholder}
            className="h-full w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink-2"
          />
        </label>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(shown.map((i) => i.id)))}
          className="h-12 shrink-0 rounded-full px-5 text-sm font-bold text-primary ring-1 ring-line transition hover:bg-tint"
        >
          {allOpen ? labels.collapseAll : labels.expandAll}
        </button>
      </div>

      {shown.length === 0 ? (
        <p className="mt-8 rounded-3xl bg-card p-8 text-center text-ink-2 ring-1 ring-line">{labels.noResults}</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {shown.map((it) => {
            const isOpen = open.has(it.id);
            return (
              <li key={it.id} id={it.id} className={`scroll-mt-24 overflow-hidden rounded-2xl bg-card ring-1 transition ${isOpen ? "ring-primary/50 shadow-[0_10px_30px_-18px_rgba(2,156,205,0.6)]" : "ring-line"}`}>
                <h2>
                  <button
                    type="button"
                    onClick={() => toggle(it.id)}
                    aria-expanded={isOpen}
                    aria-controls={`${it.id}-a`}
                    className="flex w-full items-center gap-4 px-5 py-4 text-start"
                  >
                    <span className={`grid size-9 shrink-0 place-items-center rounded-xl transition ${isOpen ? "bg-primary text-white" : "bg-tint text-primary"}`}>
                      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                        <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" />
                      </svg>
                    </span>
                    <span className="flex-1 font-bold leading-snug text-ink">{it.q}</span>
                    <svg viewBox="0 0 24 24" className={`size-5 shrink-0 text-ink-2 transition ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </h2>
                {isOpen && (
                  <div id={`${it.id}-a`} className="border-t border-line px-5 pb-5 pt-4">
                    <ol className="space-y-3">
                      {it.steps.map((s, i) => (
                        <li key={i} className="flex gap-3 leading-relaxed text-ink">
                          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-orange text-xs font-bold text-white">{digits[i] ?? i + 1}</span>
                          <span className="flex-1">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
