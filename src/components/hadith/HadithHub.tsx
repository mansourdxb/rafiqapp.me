"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { localePath, type Locale } from "@/i18n/config";
import { localDigits } from "@/lib/digits";
import type { NameMap } from "@/lib/hadith/books";
import { favId, loadChapter, queryTerms, searchHadith, toggleFavorite, useFavorites, type HadithRow, type SearchHit } from "@/lib/hadith/client";
import type { HadithLabels } from "@/lib/hadith/labels";
import { HadithCard, HadithSkeleton, LoadError } from "./HadithCard";
import { HadithArabic } from "./HadithText";

type Props = { lang: Locale; L: HadithLabels; names: NameMap; books: { key: string; hasEn: boolean }[]; children: ReactNode };

const PAGE = 20;

export function HadithHub({ lang, L, names, books, children }: Props) {
  const [tab, setTab] = useState<"books" | "favorites">("books");
  const [q, setQ] = useState("");
  const [scope, setScope] = useState("all");
  const favs = useFavorites();

  // ?book=<key> preselects a book (link from a book page); #favorites opens that tab.
  useEffect(() => {
    const b = new URLSearchParams(window.location.search).get("book");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading the URL after hydration
    if (b && names[b]) setScope(b);
    if (window.location.hash === "#favorites") setTab("favorites");
  }, [names]);

  const query = q.trim();
  const scoped = useMemo(() => (scope === "all" ? books : books.filter((b) => b.key === scope)), [books, scope]);
  const tabBtn = (on: boolean) =>
    `flex-1 rounded-full px-4 py-2 text-sm font-bold transition sm:flex-none sm:px-6 ${on ? "bg-primary text-white shadow-sm" : "text-ink-2 hover:text-ink"}`;

  return (
    <div>
      <div className="rounded-3xl bg-card p-3 shadow-[0_8px_30px_rgba(13,36,94,0.10)] ring-1 ring-line/60 sm:p-4 dark:shadow-none dark:ring-line">
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">{L.searchTitle}</span>
            <Icon name="search" className="pointer-events-none absolute start-3.5 top-1/2 size-5 -translate-y-1/2 text-ink-2" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={L.searchPlaceholder}
              className="h-12 w-full rounded-2xl bg-canvas ps-11 pe-4 text-base text-ink outline-none ring-primary/40 placeholder:text-ink-2 focus:ring-2"
            />
          </label>
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            aria-label={L.booksTab}
            className="h-12 rounded-2xl bg-canvas px-3 text-sm font-semibold text-ink outline-none ring-primary/40 focus:ring-2 sm:w-56"
          >
            <option value="all">{L.searchAllBooks}</option>
            {books.map((b) => (
              <option key={b.key} value={b.key}>
                {names[b.key].name}
              </option>
            ))}
          </select>
        </div>
        {lang !== "ar" ? <p className="mt-2 px-1 text-xs text-ink-2">{L.searchHintEn}</p> : null}
      </div>

      {query ? (
        <SearchResults key={`${scope}|${query}`} lang={lang} L={L} names={names} books={scoped} query={query} />
      ) : (
        <>
          <div role="tablist" className="mx-auto mt-8 mb-6 flex w-full max-w-sm gap-1 rounded-full bg-card p-1 ring-1 ring-line/60 sm:w-fit dark:ring-line">
            <button role="tab" aria-selected={tab === "books"} onClick={() => setTab("books")} className={tabBtn(tab === "books")}>
              {L.booksTab}
            </button>
            <button role="tab" aria-selected={tab === "favorites"} onClick={() => setTab("favorites")} className={tabBtn(tab === "favorites")}>
              {L.favoritesTab}
              {favs.length ? <span className="ms-1.5 opacity-80">({localDigits(lang, favs.length)})</span> : null}
            </button>
          </div>
          {tab === "books" ? children : <Favorites lang={lang} L={L} names={names} />}
        </>
      )}
    </div>
  );
}

function Favorites({ lang, L, names }: { lang: Locale; L: HadithLabels; names: NameMap }) {
  const favs = useFavorites();
  if (!favs.length)
    return (
      <div className="rounded-2xl bg-card px-6 py-12 text-center ring-1 ring-line/60 dark:ring-line">
        <svg viewBox="0 0 24 24" className="mx-auto mb-3 size-10 text-primary/60" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
          <path d="M6 3h12v18l-6-4-6 4z" />
        </svg>
        <p className="text-ink-2">{L.noFavorites}</p>
      </div>
    );
  return (
    <div className="space-y-4">
      {favs.map((f) => {
        const b = names[f.book];
        const href = `${localePath(lang, `/hadith/${f.book}/${f.chapter}/`)}#h${f.n}`;
        return (
          <article key={f.id} className="rounded-2xl bg-card p-4 ring-1 ring-line/60 sm:p-6 dark:ring-line">
            <header className="mb-3 flex items-center gap-2">
              <Link href={href} className="min-w-0 truncate text-sm font-bold text-primary hover:underline">
                {b?.name} · {b?.chapters[f.chapter]} · {L.hadithN.replace("{n}", localDigits(lang, f.n))}
              </Link>
              <button
                onClick={() => toggleFavorite(f)}
                className="ms-auto grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                aria-label={L.removeFavorite}
                title={L.removeFavorite}
              >
                <svg viewBox="0 0 24 24" className="size-4.5" fill="currentColor" aria-hidden>
                  <path d="M6 3h12v18l-6-4-6 4z" />
                </svg>
              </button>
            </header>
            <Link href={href} className="block">
              <HadithArabic raw={f.text} />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

function SearchResults({ lang, L, names, books, query }: { lang: Locale; L: HadithLabels; names: NameMap; books: { key: string; hasEn: boolean }[]; query: string }) {
  const [state, setState] = useState<{ hits: SearchHit[]; more: boolean } | null | "error">(null);
  const [shown, setShown] = useState(PAGE);
  const [attempt, setAttempt] = useState(0);
  const { terms, arabic } = useMemo(() => queryTerms(query), [query]);
  const tooShort = query.replace(/\s/g, "").length < 2;

  useEffect(() => {
    if (tooShort) return;
    let live = true;
    const t = setTimeout(() => {
      searchHadith(books, query)
        .then((r) => live && setState(r))
        .catch(() => live && setState("error"));
    }, 250);
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [books, query, tooShort, attempt]);

  const box = "mt-6";
  if (tooShort) return <p className={`${box} text-center text-ink-2`}>{L.minChars}</p>;
  if (state === "error")
    return (
      <div className={box}>
        <LoadError
          L={L}
          onRetry={() => {
            setState(null);
            setAttempt((a) => a + 1);
          }}
        />
      </div>
    );
  if (!state)
    return (
      <div className={box} role="status">
        <p className="mb-4 text-center text-sm text-ink-2">{L.searchLoading}</p>
        <HadithSkeleton count={2} />
      </div>
    );
  if (!state.hits.length)
    return (
      <div className={`${box} rounded-2xl bg-card px-6 py-12 text-center ring-1 ring-line/60 dark:ring-line`}>
        <p className="font-bold text-ink">{L.noResults}</p>
        <p className="mt-1 text-sm text-ink-2">{L.tryOther}</p>
      </div>
    );

  const count = localDigits(lang, state.hits.length) + (state.more ? "+" : "");
  return (
    <div className={box}>
      <p className="mb-4 text-sm font-semibold text-ink-2">{L.resultCount.replace("{0}", count)}</p>
      <div className="space-y-4">
        {state.hits.slice(0, shown).map((h) => (
          <SearchHitCard key={`${h.book}:${h.chapter}:${h.n}`} lang={lang} L={L} names={names} hit={h} terms={terms} latin={!arabic} hasEn={books.find((b) => b.key === h.book)?.hasEn ?? false} />
        ))}
      </div>
      {shown < state.hits.length ? (
        <div className="pt-6 text-center">
          <button onClick={() => setShown((s) => s + PAGE)} className="rounded-full bg-card px-6 py-2.5 text-sm font-bold text-primary ring-1 ring-line hover:bg-tint">
            {L.showMore}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function SearchHitCard({ lang, L, names, hit, terms, latin, hasEn }: { lang: Locale; L: HadithLabels; names: NameMap; hit: SearchHit; terms: string[]; latin: boolean; hasEn: boolean }) {
  const [row, setRow] = useState<HadithRow | null | "error">(null);
  const favs = useFavorites();
  useEffect(() => {
    let live = true;
    loadChapter(hit.book, hit.chapter)
      .then((rows) => live && setRow(rows.find((r) => r[0] === hit.n) ?? "error"))
      .catch(() => live && setRow("error"));
    return () => {
      live = false;
    };
  }, [hit]);
  const b = names[hit.book];
  const href = `${localePath(lang, `/hadith/${hit.book}/${hit.chapter}/`)}#h${hit.n}`;
  return (
    <div>
      <Link href={href} className="mb-1.5 flex items-center gap-1 px-1 text-sm font-bold text-primary hover:underline">
        <span className="truncate">
          {b.name} · {b.chapters[hit.chapter]}
        </span>
        <Icon name="chevron" flip className="size-4 shrink-0" />
      </Link>
      {row === "error" ? null : row ? (
        <HadithCard
          lang={lang}
          L={L}
          book={hit.book}
          chapter={hit.chapter}
          row={row}
          bookName={b.name}
          chapterName={b.chapters[hit.chapter]}
          showTranslation={latin || (lang !== "ar" && hasEn)}
          isFav={favs.some((f) => f.id === favId(hit.book, hit.chapter, hit.n))}
          terms={terms}
          latin={latin}
        />
      ) : (
        <HadithSkeleton count={1} />
      )}
    </div>
  );
}
