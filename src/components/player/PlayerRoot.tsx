"use client";
// Global Qur'an player: wraps the site so recitation keeps going across client navigation, and shows
// the mini player bar (and the now-playing sheet) while something is playing. Mounted once in the
// language layout. Other components start playback with usePlayer().playSurah(…).
import { useEffect, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { setLabeler } from "@/lib/player/engine";
import { reciterName, reciterPhoto } from "@/lib/player/reciters";
import { usePlayer } from "@/lib/player/usePlayer";
import { ayahLabel, surahTitle } from "./labels";
import { MiniPlayer, MINI_HEIGHT } from "./MiniPlayer";
import { NowPlaying } from "./NowPlaying";

export { usePlayer } from "@/lib/player/usePlayer";

export function PlayerRoot({ lang, children }: { lang: Locale; children: ReactNode }) {
  const p = usePlayer();

  // lock-screen / notification text in the page language
  useEffect(() => {
    setLabeler((s) => ({
      title: `${surahTitle(lang, s.surah)} · ${ayahLabel(lang, s.ayah)}`,
      artist: reciterName(lang, s.reciter),
      album: common[lang].siteName,
      artwork: reciterPhoto(s.reciter) ?? "/logo.png",
    }));
  }, [lang]);

  return (
    <>
      {children}
      {p.visible ? (
        <>
          {/* keeps the end of every page clear of the fixed bar */}
          <div aria-hidden style={{ height: `calc(${MINI_HEIGHT}px + env(safe-area-inset-bottom, 0px))` }} />
          <MiniPlayer lang={lang} />
        </>
      ) : null}
      {p.visible && p.expanded ? <NowPlaying lang={lang} /> : null}
    </>
  );
}
