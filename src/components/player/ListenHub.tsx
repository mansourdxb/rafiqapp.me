"use client";
// Listen page (the app's Audio screen + a reciter's surah list), one static page per language:
// /quran/listen/ lists the reciters by category with photos, search and favourites; ?r=<key> shows
// that reciter's 114 surahs — play a surah, or play everything from a surah on.
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { localePath, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { common } from "@/i18n/messages/common";
import { player } from "@/i18n/messages/player";
import { localDigits } from "@/lib/digits";
import { norm, searchSurahs, surahName } from "@/lib/quran/data";
import { CATEGORIES, categoryKey, LISTED_RECITERS, reciterName, reciterOf, reciterShortName, type Reciter } from "@/lib/player/reciters";
import { useLastPlayed, usePlayer } from "@/lib/player/usePlayer";
import { ayahLabel, surahTitle } from "./labels";
import { PIcon } from "./PlayerIcons";
import { ReciterAvatar } from "./ReciterAvatar";

const hubHref = (lang: Locale) => localePath(lang, "/quran/listen/");
const reciterHref = (lang: Locale, key: string) => `${hubHref(lang)}?r=${encodeURIComponent(key)}`;

// ── favourite reciters (localStorage) ──
const FAV_KEY = "player:favs";
const FAV_EVENT = "player:favs";
const subscribeFavs = (cb: () => void) => {
  window.addEventListener(FAV_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(FAV_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};
const readFavs = () => {
  try {
    return localStorage.getItem(FAV_KEY) ?? "[]";
  } catch {
    return "[]";
  }
};
function useFavs(): [string[], (key: string) => void] {
  const raw = useSyncExternalStore(subscribeFavs, readFavs, () => "[]");
  const favs = useMemo(() => {
    try {
      const v = JSON.parse(raw);
      return Array.isArray(v) ? v.filter((k): k is string => typeof k === "string" && !!reciterOf(k)) : [];
    } catch {
      return [];
    }
  }, [raw]);
  const toggle = (key: string) => {
    const nextFavs = favs.includes(key) ? favs.filter((k) => k !== key) : [...favs, key];
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(nextFavs));
    } catch {}
    window.dispatchEvent(new Event(FAV_EVENT));
  };
  return [favs, toggle];
}

/** Reads ?r= (needs the Suspense boundary of the page). */
export function ListenHubRouted({ lang }: { lang: Locale }) {
  const key = useSearchParams().get("r");
  return <ListenHub lang={lang} reciterKey={key} />;
}

export function ListenHub({ lang, reciterKey }: { lang: Locale; reciterKey: string | null }) {
  const reciter = reciterOf(reciterKey);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [reciterKey]);
  return <div className="pb-16">{reciter ? <ReciterSurahs lang={lang} reciter={reciter} /> : <Reciters lang={lang} />}</div>;
}

function Reciters({ lang }: { lang: Locale }) {
  const t = player[lang];
  const p = usePlayer();
  const last = useLastPlayed();
  const [favs, toggleFav] = useFavs();
  const [query, setQuery] = useState("");

  const q = norm(query.trim());
  const match = (r: Reciter) => !q || Object.values(r.names).some((n) => norm(n).includes(q));
  const groups = [
    ...(favs.length ? [{ id: "fav", title: t.favourites, items: favs.map((k) => reciterOf(k)!).filter(match) }] : []),
    ...CATEGORIES.map((c) => ({ id: c.cat, title: appT(lang, c.key), items: LISTED_RECITERS.filter((r) => r.cat === c.cat && match(r)) })),
  ].filter((g) => g.items.length);

  return (
    <>
      <PageHeader
        lang={lang}
        crumbs={[{ label: common[lang].nav.quran, href: localePath(lang, "/quran/") }, { label: appT(lang, "qaudio.title") }]}
        title={appT(lang, "qaudio.title")}
        subtitle={t.subtitle}
      />
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-[15px] bg-tint p-4 sm:p-5">
            <div className="relative">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={appT(lang, "alm.audio.searchReciter")}
                aria-label={appT(lang, "alm.audio.searchReciter")}
                className="h-14 w-full rounded-full bg-white ps-6 pe-12 text-base text-navy-2 shadow-[0_3px_10px_rgba(124,180,200,0.35)] outline-none ring-2 ring-edge/70 placeholder:text-ink-2 focus:ring-primary dark:bg-canvas dark:text-ink"
              />
              <Icon name="search" className="pointer-events-none absolute end-5 top-1/2 size-5 -translate-y-1/2 text-navy-2 dark:text-ink" />
            </div>
          </div>
          {last && !p.visible ? (
            <div className="flex flex-wrap items-center gap-3 rounded-[15px] bg-card p-4 shadow-[0_5px_25px_rgba(0,0,0,0.16)] sm:flex-nowrap sm:p-5 dark:shadow-none dark:ring-1 dark:ring-line">
              <ReciterAvatar reciter={last.reciter} size={48} className="rounded-full" />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-section dark:text-primary-light">{appT(lang, "carplay.continue")}</div>
                <div className="truncate text-sm text-navy-2 dark:text-ink-2">
                  {surahTitle(lang, last.surah)} · {ayahLabel(lang, last.ayah)} · {reciterShortName(lang, last.reciter)}
                </div>
              </div>
              <button type="button" onClick={p.resume} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-deep sm:w-auto">
                <PIcon name="play" className="size-4" />
                {appT(lang, "carplay.continue")}
              </button>
            </div>
          ) : null}
        </div>

        {groups.length ? (
          groups.map((g) => (
            <section key={g.id} className="mt-8">
              <h2 className="flex items-center gap-2 rounded-md bg-tint px-4 py-3 text-[17px] font-bold text-navy-2 dark:text-ink">
                {g.id === "fav" ? <PIcon name="starOn" className="size-4 text-orange" /> : null}
                {g.title}
                <span className="ms-auto text-xs font-semibold text-ink-2">{localDigits(lang, g.items.length)}</span>
              </h2>
              <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((r) => (
                  <ReciterCard key={`${g.id}-${r.key}`} lang={lang} reciter={r} fav={favs.includes(r.key)} onFav={() => toggleFav(r.key)} />
                ))}
              </ul>
            </section>
          ))
        ) : (
          <p className="mt-10 text-center font-bold text-section dark:text-primary-light">{common[lang].noResults}</p>
        )}
      </div>
    </>
  );
}

function ReciterCard({ lang, reciter: r, fav, onFav }: { lang: Locale; reciter: Reciter; fav: boolean; onFav: () => void }) {
  const t = player[lang];
  const p = usePlayer();
  const current = p.visible && p.reciter === r.key;
  const sub = r.cat === "t" && r.tl ? t.langNames[r.tl] : appT(lang, categoryKey(r.cat));
  return (
    <li className={`group relative flex items-center gap-3 rounded-xl bg-white p-3 shadow-[0_3px_10px_rgba(124,180,200,0.3)] ring-2 transition hover:-translate-y-0.5 dark:bg-card ${current ? "ring-primary" : "ring-edge/70 hover:ring-primary"}`}>
      <Link href={reciterHref(lang, r.key)} className="flex min-w-0 flex-1 items-center gap-3 after:absolute after:inset-0 after:rounded-xl">
        <span className="relative">
          <ReciterAvatar reciter={r.key} size={60} className="rounded-full ring-2 ring-tint" />
          {current ? <span className="absolute -bottom-0.5 -end-0.5 size-4 rounded-full bg-orange ring-2 ring-white dark:ring-card" /> : null}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[16px] font-bold text-section group-hover:text-primary dark:text-primary-light">{reciterShortName(lang, r.key)}</span>
          <span className="mt-0.5 block truncate text-[13px] text-navy-2 dark:text-ink-2">{sub}</span>
        </span>
      </Link>
      <button
        type="button"
        onClick={onFav}
        aria-pressed={fav}
        aria-label={fav ? t.removeFavourite : t.addFavourite}
        className={`relative z-10 grid size-9 shrink-0 place-items-center rounded-full transition hover:bg-tint ${fav ? "text-orange" : "text-ink-2/60 hover:text-orange"}`}
      >
        <PIcon name={fav ? "starOn" : "star"} className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => (current && p.playing ? p.toggle(false) : current ? p.toggle(true) : p.playSurah(r.key, 1, 1, { continuous: true }))}
        aria-label={current && p.playing ? t.pause : `${appT(lang, "carplay.playAll")} — ${reciterShortName(lang, r.key)}`}
        className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-primary text-white shadow-sm transition hover:bg-primary-deep"
      >
        <PIcon name={current && p.playing ? "pause" : "play"} className="size-[18px]" />
      </button>
    </li>
  );
}

function ReciterSurahs({ lang, reciter: r }: { lang: Locale; reciter: Reciter }) {
  const t = player[lang];
  const p = usePlayer();
  const [favs, toggleFav] = useFavs();
  const [query, setQuery] = useState("");
  const list = useMemo(() => searchSurahs(query), [query]);
  const fav = favs.includes(r.key);
  const mine = p.visible && p.reciter === r.key;
  const sub = r.cat === "t" && r.tl ? `${appT(lang, categoryKey(r.cat))} · ${t.langNames[r.tl]}` : appT(lang, categoryKey(r.cat));

  return (
    <>
      <PageHeader
        lang={lang}
        crumbs={[
          { label: common[lang].nav.quran, href: localePath(lang, "/quran/") },
          { label: appT(lang, "qaudio.title"), href: hubHref(lang) },
          { label: reciterShortName(lang, r.key) },
        ]}
        title={reciterName(lang, r.key)}
      />
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 rounded-[15px] bg-card p-4 shadow-[0_5px_25px_rgba(0,0,0,0.16)] sm:flex-row sm:items-center sm:p-5 dark:shadow-none dark:ring-1 dark:ring-line">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <ReciterAvatar reciter={r.key} size={96} className="rounded-[20px] ring-4 ring-tint" />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-orange">{sub}</div>
              <div className="mt-1 text-xl font-bold text-section dark:text-primary-light">{reciterShortName(lang, r.key)}</div>
              <div className="mt-1 text-sm text-navy-2 dark:text-ink-2">{localDigits(lang, 114)} · {t.surahs}</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => p.playSurah(r.key, 1, 1, { continuous: true })}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-primary-deep sm:flex-none"
            >
              <PIcon name="play" className="size-4" />
              {appT(lang, "carplay.playAll")}
            </button>
            <button
              type="button"
              onClick={() => toggleFav(r.key)}
              aria-pressed={fav}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold ring-1 transition hover:bg-tint ${fav ? "text-orange ring-orange" : "text-primary ring-primary"}`}
            >
              <PIcon name={fav ? "starOn" : "star"} className="size-4" />
              {fav ? t.removeFavourite : t.addFavourite}
            </button>
            <Link href={hubHref(lang)} className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-bold text-primary ring-1 ring-primary hover:bg-tint">
              <span className="rtl:-scale-x-100">
                <PIcon name="back" className="size-4" />
              </span>
              {t.allReciters}
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-[15px] bg-tint p-4 sm:p-5">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={appT(lang, "alm.audio.searchSurah")}
              aria-label={appT(lang, "alm.audio.searchSurah")}
              className="h-12 w-full rounded-full bg-white ps-6 pe-12 text-base text-navy-2 shadow-[0_3px_10px_rgba(124,180,200,0.35)] outline-none ring-2 ring-edge/70 placeholder:text-ink-2 focus:ring-primary dark:bg-canvas dark:text-ink"
            />
            <Icon name="search" className="pointer-events-none absolute end-5 top-1/2 size-5 -translate-y-1/2 text-navy-2 dark:text-ink" />
          </div>
        </div>

        {list.length ? (
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => {
              const here = mine && p.surah === s.n;
              const playingHere = here && p.playing;
              return (
                <li
                  key={s.n}
                  className={`flex items-center gap-3 rounded-xl bg-white p-3 shadow-[0_3px_10px_rgba(124,180,200,0.3)] ring-2 dark:bg-card ${here ? "ring-primary" : "ring-edge/70"}`}
                >
                  <span className={`grid size-10 shrink-0 place-items-center rounded-full text-[13px] font-bold ${here ? "bg-primary text-white" : "bg-tint text-primary"}`}>
                    {playingHere ? <PIcon name="wave" className="size-5" /> : localDigits(lang, s.n)}
                  </span>
                  <button type="button" onClick={() => (here ? p.toggle() : p.playSurah(r.key, s.n))} className="min-w-0 flex-1 text-start">
                    <span className={`block truncate text-[16px] font-bold ${here ? "text-primary" : "text-section dark:text-primary-light"}`}>{surahTitle(lang, s.n)}</span>
                    <span className="mt-0.5 block truncate text-[13px] text-navy-2 dark:text-ink-2">
                      {lang === "ar" ? appT(lang, "carplay.ayahCount", { n: localDigits(lang, s.ayahs) }) : (
                        <>
                          <bdi lang="ar">{s.ar}</bdi> · {appT(lang, "carplay.ayahCount", { n: localDigits(lang, s.ayahs) })}
                        </>
                      )}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => p.playSurah(r.key, s.n, 1, { continuous: true })}
                    aria-label={`${t.playFromHere} — ${surahName(lang, s.n)}`}
                    title={t.playFromHere}
                    className="grid size-9 shrink-0 place-items-center rounded-full text-primary ring-1 ring-primary/60 transition hover:bg-tint"
                  >
                    <PIcon name="playFrom" className="size-[18px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => (here ? p.toggle() : p.playSurah(r.key, s.n))}
                    aria-label={playingHere ? t.pause : `${t.playSurah} — ${surahName(lang, s.n)}`}
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-white shadow-sm transition hover:bg-primary-deep"
                  >
                    <PIcon name={playingHere ? "pause" : "play"} className="size-[18px]" />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-10 text-center font-bold text-section dark:text-primary-light">{common[lang].noResults}</p>
        )}
      </div>
    </>
  );
}
