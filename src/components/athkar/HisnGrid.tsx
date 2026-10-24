"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { localePath, type Locale } from "@/i18n/config";
import { localDigits } from "@/lib/digits";
import { normalize } from "@/lib/athkar/text";
import { useAthkarProgress } from "@/lib/athkar/progress";
import { Icon } from "@/components/ui/Icon";
import { CategoryIcon, type CategoryIconName } from "./CategoryIcon";

type Chapter = { id: number; title: string; ar: string; icon: CategoryIconName; n: number };

// Alternating icon colours (sky / orange / blue / green) on white cards.
const TONES = ["bg-primary/12 text-primary", "bg-orange/12 text-orange", "bg-section/10 text-section dark:text-primary-light", "bg-[#0A9B7A]/12 text-[#0A9B7A]"];

export function HisnGrid({
  lang,
  chapters,
  labels,
}: {
  lang: Locale;
  chapters: Chapter[];
  labels: { search: string; noResults: string; count: string; done: string };
}) {
  const [q, setQ] = useState("");
  const { done } = useAthkarProgress();

  const list = useMemo(() => {
    const n = normalize(q);
    if (!n) return chapters;
    return chapters.filter((c) => normalize(c.title).includes(n) || normalize(c.ar).includes(n));
  }, [q, chapters]);

  return (
    <div className="mt-6">
      <label className="flex h-12 items-center gap-2 rounded-full bg-white px-5 shadow-[0_3px_10px_rgba(124,180,200,0.35)] ring-2 ring-edge/70 focus-within:ring-primary sm:max-w-md dark:bg-card">
        <Icon name="search" className="size-5 text-navy dark:text-primary" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={labels.search}
          aria-label={labels.search}
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-2"
        />
      </label>

      {list.length === 0 ? (
        <p className="py-16 text-center text-ink-2">{labels.noResults}</p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => {
            const isDone = done.includes(c.id);
            return (
              <li key={c.id}>
                <Link
                  href={localePath(lang, `/athkar/${c.id}/`)}
                  className={`relative flex min-h-20 items-center gap-3 rounded-[15px] bg-card p-4 shadow-[0_5px_25px_rgba(0,0,0,0.12)] transition hover:-translate-y-0.5 ${
                    isDone ? "ring-2 ring-[#5FA463]" : ""
                  }`}
                >
                  <span className={`grid size-11 shrink-0 place-items-center rounded-full ${TONES[i % 4]}`}>
                    <CategoryIcon name={c.icon} className="size-5.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-2 text-[14.5px] leading-6 font-bold text-section dark:text-primary-light">{c.title}</span>
                    <span className="text-xs font-semibold text-ink-2">{labels.count.replace("{count}", localDigits(lang, c.n))}</span>
                  </span>
                  {isDone && (
                    <span className="absolute end-2 top-2 grid size-5 place-items-center rounded-full bg-[#5FA463] text-white" title={labels.done}>
                      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
