"use client";
// Title search over the current language's articles (index passed from the server: title, href, category).
import { searchFold } from "@/lib/searchFold";
import Link from "next/link";
import { useMemo, useState } from "react";

const norm = searchFold;

export function ArticleSearch({
  index,
  placeholder,
  empty,
  className = "sm:max-w-xs",
}: {
  index: { t: string; h: string; c: string }[];
  placeholder: string;
  empty: string;
  className?: string;
}) {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const n = norm(q.trim());
    if (n.length < 2) return [];
    return index.filter((a) => norm(a.t).includes(n) || norm(a.c).includes(n)).slice(0, 8);
  }, [q, index]);
  return (
    <div className={`relative w-full ${className}`}>
      <label className="flex h-12 items-center gap-2 rounded-full bg-white pe-4 ps-5 shadow-[0_3px_10px_rgba(124,180,200,0.35)] ring-2 ring-edge/70 focus-within:ring-primary dark:bg-card">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="h-full w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink-2"
        />
        <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-navy dark:text-primary" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden>
          <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3" />
        </svg>
      </label>
      {q.trim().length >= 2 && (
        <div className="absolute inset-x-0 top-14 z-30 overflow-hidden rounded-[15px] bg-white shadow-[0_5px_25px_rgba(0,0,0,0.16)] ring-1 ring-line dark:bg-card">
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
