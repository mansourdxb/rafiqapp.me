"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { localePath, type Locale } from "@/i18n/config";
import { localDigits } from "@/lib/digits";
import { normalize } from "@/lib/athkar/text";
import { Icon } from "@/components/ui/Icon";

type Item = { n: number; ar: string; tl: string; m: string; en: string };

export function NamesGrid({ lang, list, labels }: { lang: Locale; list: Item[]; labels: { search: string; noResults: string; note: string } }) {
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const k = normalize(q);
    if (!k) return list;
    return list.filter(
      (x) =>
        normalize(x.ar).includes(k) ||
        normalize(x.tl).replace(/[\s'-]/g, "").includes(k.replace(/[\s'-]/g, "")) ||
        normalize(x.m).includes(k) ||
        normalize(x.en).includes(k) ||
        String(x.n) === k,
    );
  }, [q, list]);

  return (
    <div className="mx-auto -mt-14 max-w-6xl px-4">
      <label className="mx-auto flex h-12 max-w-xl items-center gap-2 rounded-2xl bg-card px-4 shadow-md ring-1 ring-line focus-within:ring-2 focus-within:ring-primary">
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
      {labels.note && <p className="mt-3 text-center text-xs text-ink-2">{labels.note}</p>}

      {shown.length === 0 ? (
        <p className="py-16 text-center text-ink-2">{labels.noResults}</p>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((x) => (
            <li key={x.n}>
              <Link
                href={localePath(lang, `/names/${x.n}/`)}
                className="group relative flex h-full flex-col items-center rounded-3xl bg-card px-3 pt-5 pb-4 text-center shadow-[0_6px_14px_rgba(22,40,70,0.06)] ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-primary/40"
              >
                <span className="absolute start-3 top-3 grid size-7 place-items-center rounded-full bg-tint text-xs font-bold text-primary">{localDigits(lang, x.n)}</span>
                <span dir="rtl" lang="ar" className="quran text-[34px] leading-[1.6] text-navy dark:text-gold">
                  {x.ar}
                </span>
                <span className="mt-1 text-[13px] font-semibold text-primary">{x.tl}</span>
                {lang !== "ar" && <span className="mt-1 line-clamp-2 text-[13px] leading-5 text-ink-2">{x.m}</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
