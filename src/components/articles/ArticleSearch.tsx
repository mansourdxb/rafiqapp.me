"use client";
// Title search over the current language's articles (index passed from the server: title, href, category).
import Link from "next/link";
import { useMemo, useState } from "react";

const norm = (s: string) =>
  s
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ًͯ-ٰٟ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");

export function ArticleSearch({ index, placeholder, empty }: { index: { t: string; h: string; c: string }[]; placeholder: string; empty: string }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const n = norm(q.trim());
    if (n.length < 2) return [];
    return index.filter((a) => norm(a.t).includes(n) || norm(a.c).includes(n)).slice(0, 8);
  }, [q, index]);
  return (
    <div className="relative w-full sm:max-w-sm">
      <label className="flex h-12 items-center gap-2 rounded-full bg-card px-4 ring-1 ring-line focus-within:ring-2 focus-within:ring-primary">
        <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-ink-2" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
          <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="h-full w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink-2"
        />
      </label>
      {q.trim().length >= 2 && (
        <div className="absolute inset-x-0 top-14 z-30 overflow-hidden rounded-2xl bg-card shadow-xl ring-1 ring-line">
          {results.length ? (
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.map((r) => (
                <li key={r.h}>
                  <Link href={r.h} className="block px-4 py-2.5 hover:bg-tint">
                    <span className="block text-sm font-semibold text-ink">{r.t}</span>
                    <span className="block text-xs text-ink-2">{r.c}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-4 text-sm text-ink-2">{empty}</p>
          )}
        </div>
      )}
    </div>
  );
}
