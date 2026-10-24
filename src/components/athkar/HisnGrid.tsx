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

// Alternating pastel cards + icon colours, as in the app's Hisn al-Muslim index.
const TONES = [
  "bg-[#E8F7FA] text-[#2E9BD6] dark:bg-[#15303A]",
  "bg-[#EFF6EA] text-[#5FA463] dark:bg-[#1C2E22]",
  "bg-[#FBF1E5] text-[#E0912D] dark:bg-[#33281A]",
  "bg-[#F1F2F5] text-[#7A6FB0] dark:bg-[#24263A]",
];

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
    <div className="mt-5">
      <label className="flex h-12 items-center gap-2 rounded-2xl bg-card px-4 shadow-sm ring-1 ring-line focus-within:ring-2 focus-within:ring-primary">
        <Icon name="search" className="size-5 text-ink-2" />
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
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => {
            const isDone = done.includes(c.id);
            return (
              <li key={c.id}>
                <Link
                  href={localePath(lang, `/athkar/${c.id}/`)}
                  className={`relative flex min-h-20 items-center gap-3 rounded-2xl p-4 transition hover:-translate-y-0.5 hover:shadow-md ${TONES[i % 4]} ${
                    isDone ? "ring-2 ring-[#5FA463]" : "ring-1 ring-black/5 dark:ring-white/10"
                  }`}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white dark:bg-white/10">
                    <CategoryIcon name={c.icon} className="size-5.5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-2 text-[14.5px] leading-6 font-bold text-[#16202B] dark:text-ink">{c.title}</span>
                    <span className="text-xs text-[#7C8A99]">{labels.count.replace("{count}", localDigits(lang, c.n))}</span>
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
