"use client";
// Navy mini player fixed to the bottom of every page (as the app's QuranMiniPlayer): reciter photo,
// surah · ayah, previous / play-pause / next, open the full player, close. Fits 360px phones and
// sits above the iPhone home indicator.
import type { Locale } from "@/i18n/config";
import { player } from "@/i18n/messages/player";
import { SURAHS } from "@/lib/quran/data";
import { reciterShortName } from "@/lib/player/reciters";
import { usePlayer, usePlayerProgress } from "@/lib/player/usePlayer";
import { ayahLabel, surahTitle, xOfY } from "./labels";
import { PIcon, Spinner } from "./PlayerIcons";
import { ReciterAvatar } from "./ReciterAvatar";

export const MINI_HEIGHT = 68;

export function MiniPlayer({ lang }: { lang: Locale }) {
  const t = player[lang];
  const p = usePlayer();
  const { position, duration } = usePlayerProgress();
  const count = SURAHS[p.surah - 1]?.ayahs ?? 1;
  const frac = Math.min(1, (p.ayah - 1 + (duration ? position / duration : 0)) / count);
  const sub = p.status === "error" ? t.loadError : p.status === "ended" ? t.ended : `${ayahLabel(lang, p.ayah)} · ${reciterShortName(lang, p.reciter)}`;
  const btn = "grid size-9 shrink-0 place-items-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-white";

  return (
    <div className="fixed inset-x-0 bottom-0 z-[45] bg-navy text-white shadow-[0_-6px_24px_rgba(15,28,80,0.28)]" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }} role="region" aria-label={t.nowPlaying}>
      {/* progress through the surah */}
      <div className="h-[3px] bg-white/15" aria-hidden>
        <div className="h-full bg-primary transition-[width] duration-300 ease-linear" style={{ width: `${frac * 100}%` }} />
      </div>
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 sm:gap-3 sm:px-4" style={{ height: MINI_HEIGHT - 3 }}>
        <button type="button" onClick={() => p.setExpanded(true)} aria-label={t.expand} className="flex min-w-0 flex-1 items-center gap-2.5 text-start">
          <ReciterAvatar reciter={p.reciter} size={44} className="rounded-lg ring-2 ring-white/20" />
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-[15px] font-bold">{surahTitle(lang, p.surah)}</span>
            <span className={`mt-0.5 block truncate text-xs ${p.status === "error" ? "text-orange" : "text-white/70"}`}>{sub}</span>
          </span>
        </button>
        <div dir="ltr" className="flex shrink-0 items-center gap-0.5 sm:gap-1">
          <button type="button" onClick={p.prev} aria-label={t.prevAyah} className={btn}>
            <PIcon name="prev" className="size-[18px]" />
          </button>
          <button
            type="button"
            onClick={() => p.toggle()}
            aria-label={p.playing ? t.pause : t.play}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-white shadow-md transition hover:bg-primary-deep"
          >
            {p.status === "loading" ? <Spinner className="size-5" /> : <PIcon name={p.playing ? "pause" : "play"} className="size-5" />}
          </button>
          <button type="button" onClick={p.next} aria-label={t.nextAyah} className={btn}>
            <PIcon name="next" className="size-[18px]" />
          </button>
        </div>
        <span className="hidden shrink-0 text-xs font-semibold text-white/60 md:inline">{xOfY(lang, p.ayah, count)}</span>
        <button type="button" onClick={() => p.setExpanded(true)} aria-label={t.expand} className={`${btn} max-[389px]:hidden`}>
          <PIcon name="up" className="size-5" />
        </button>
        <button type="button" onClick={p.close} aria-label={t.close} className="grid size-8 shrink-0 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white">
          <PIcon name="close" className="size-4" />
        </button>
      </div>
    </div>
  );
}
