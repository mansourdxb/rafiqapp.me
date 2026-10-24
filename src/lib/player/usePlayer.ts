"use client";
// The player API for any page: `const p = usePlayer(); p.playSurah(reciterKey, surah, fromAyah?)`.
import * as engine from "./engine";

const actions = {
  playSurah: engine.playSurah,
  toggle: engine.toggle,
  next: engine.next,
  prev: engine.prev,
  goToAyah: engine.goToAyah,
  seek: engine.seek,
  setRepeat: engine.setRepeat,
  cycleRepeat: engine.cycleRepeat,
  setRate: engine.setRate,
  cycleRate: engine.cycleRate,
  setReciter: engine.setReciter,
  setExpanded: engine.setExpanded,
  close: engine.close,
  resume: engine.resume,
};

export type PlayerApi = engine.PlayerState & typeof actions & { playing: boolean };

/** Player state (without the per-ayah time — see usePlayerProgress) + actions. */
export function usePlayer(): PlayerApi {
  const s = engine.usePlayerState();
  return { ...s, ...actions, playing: s.status === "playing" || s.status === "loading" };
}

export { usePlayerProgress, useLastPlayed, SPEEDS } from "./engine";
export type { PlayerState, Repeat, Status, LastPlayed } from "./engine";
