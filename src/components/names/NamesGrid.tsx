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
    // transliteration: no spaces / hyphens / apostrophes, long vowels as short ("Ar-Rahmaan" ~ "rahman")
    const tl = (v: string) => normalize(v).replace(/[\s'’-]/g, "").replace(/aa/g, "a").replace(/ee|ii/g, "i").replace(/oo|uu|ou/g, "u");
    return list.filter(
      (x) =>
        normalize(x.ar).includes(k) ||
        tl(x.tl).includes(tl(k)) ||
        normalize(x.m).includes(k) ||
        normalize(x.en).includes(k) ||
        String(x.n) === k,
    );
  }, [q, list]);

  return (
    <div className="mx-auto max-w-6xl px-4">
      <label className="flex h-12 max-w-md items-center gap-2 rounded-full bg-white px-5 shadow-[0_3px_10px_rgba(124,180,200,0.35)] ring-2 ring-edge/70 focus-within:ring-primary dark:bg-card">
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
      {labels.note && <p className="mt-3 text-xs text-ink-2">{labels.note}</p>}

      {shown.length === 0 ? (
        <p className="py-16 text-center text-ink-2">{labels.noResults}</p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((x) => (
            <li key={x.n}>
              <Link
                href={localePath(lang, `/names/${x.n}/`)}
                className="group relative flex h-full flex-col items-center rounded-[15px] bg-card px-3 pt-6 pb-5 text-center shadow-[0_5px_25px_rgba(0,0,0,0.16)] transition hover:-translate-y-1"
              >
                <span className="absolute start-3 top-3 grid size-7 place-items-center rounded-full bg-orange text-xs font-bold text-white">{localDigits(lang, x.n)}</span>
                <span dir="rtl" lang="ar" className="quran text-[34px] leading-[1.6] text-section dark:text-primary-light">
                  {x.ar}
                </span>
                <span className="mt-1 text-[13px] font-semibold text-primary">{x.tl}</span>
                {lang !== "ar" && <span className="mt-1 line-clamp-2 text-[13px] leading-5 text-navy-2 dark:text-ink-2">{x.m}</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
