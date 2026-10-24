"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { clampPage } from "@/lib/quran/data";
import { QuranReader } from "./QuranReader";

/** Opens the reader at `?p=` (the page is chosen in the browser; the HTML is the same for every page). */
export function QuranReaderEntry({ lang }: { lang: Locale }) {
  const [page, setPage] = useState<number | null>(null);
  useEffect(() => {
    const read = () => setPage(clampPage(Number(new URLSearchParams(window.location.search).get("p")) || 1));
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);
  if (page === null) return <div className="mushaf min-h-[calc(100dvh-4rem)] bg-[var(--m-outer)]" />;
  return <QuranReader key={page} lang={lang} initialPage={page} initialData={[]} />;
}
