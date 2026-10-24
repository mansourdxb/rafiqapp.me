"use client";
// Global Qur'an audio player: ayah-by-ayah from everyayah.com, as the app's quranAudio.ts.
// Two <audio> elements take turns — while one recites, the other already holds the next ayah, so the
// switch on "ended" is near-gapless. State lives here (outside React) so playback survives client
// navigation; components read it with usePlayerState() / usePlayerProgress().
import { useSyncExternalStore } from "react";
import { SURAHS } from "@/lib/quran/data";
import { ayahUrl, DEFAULT_RECITER, isReciter, reciterByFolder } from "./reciters";

export type Repeat = "off" | "surah" | "ayah";
export type Status = "idle" | "loading" | "playing" | "paused" | "ended" | "error";
export type PlayerState = {
  reciter: string;
  surah: number;
  ayah: number;
  status: Status;
  repeat: Repeat;
  rate: number;
  /** carry on into the next surah at the end of this one ("play all from here") */
  continuous: boolean;
  /** the mini player is shown (something was played this visit) */
  visible: boolean;
  expanded: boolean;
};
export type Progress = { position: number; duration: number };
export type LastPlayed = { reciter: string; surah: number; ayah: number; continuous: boolean; at: number };

export const SPEEDS = [1, 1.25, 1.5, 2]; // the app's now-playing speeds
const LAST_KEY = "player:last";
const PREFS_KEY = "player:prefs";
const AYAH_PANEL_RECITER = "quran:reciter"; // the mushaf ayah sheet's reciter (everyayah folder)

const INITIAL: PlayerState = { reciter: DEFAULT_RECITER, surah: 1, ayah: 1, status: "idle", repeat: "off", rate: 1, continuous: false, visible: false, expanded: false };
const NO_PROGRESS: Progress = { position: 0, duration: 0 };

let state: PlayerState = INITIAL;
let progress: Progress = NO_PROGRESS;
let last: LastPlayed | null = null;
let hydrated = false;
const listeners = new Set<() => void>();
const progressListeners = new Set<() => void>();

const ayahCount = (s: number) => SURAHS[s - 1]?.ayahs ?? 0;

function read<T>(key: string): T | null {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null") as T | null;
  } catch {
    return null;
  }
}
function write(key: string, v: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch {}
}

/** First client read: saved speed / repeat, last reciter (or the ayah sheet's), last ayah. */
function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  const prefs = read<{ repeat?: Repeat; rate?: number; reciter?: string }>(PREFS_KEY);
  const l = read<LastPlayed>(LAST_KEY);
  last = l && isReciter(l.reciter) && l.surah >= 1 && l.surah <= 114 && l.ayah >= 1 && l.ayah <= ayahCount(l.surah) ? l : null;
  let sheetReciter: string | undefined;
  try {
    sheetReciter = reciterByFolder(localStorage.getItem(AYAH_PANEL_RECITER))?.key;
  } catch {}
  state = {
    ...state,
    repeat: prefs?.repeat === "surah" || prefs?.repeat === "ayah" ? prefs.repeat : "off",
    rate: SPEEDS.includes(prefs?.rate ?? 1) ? (prefs?.rate ?? 1) : 1,
    reciter: (isReciter(prefs?.reciter) ? prefs.reciter : undefined) ?? last?.reciter ?? sheetReciter ?? DEFAULT_RECITER,
    surah: last?.surah ?? 1,
    ayah: last?.ayah ?? 1,
  };
}

function set(patch: Partial<PlayerState>) {
  const was = state.status;
  state = { ...state, ...patch };
  if (state.status !== was && typeof navigator !== "undefined" && "mediaSession" in navigator)
    navigator.mediaSession.playbackState = state.status === "playing" || state.status === "loading" ? "playing" : state.visible ? "paused" : "none";
  listeners.forEach((l) => l());
}
function setProgress(p: Progress) {
  if (p.position === progress.position && p.duration === progress.duration) return;
  progress = p;
  progressListeners.forEach((l) => l());
}

// ── audio elements ──
let els: HTMLAudioElement[] = [];
let cur = 0;
let gen = 0;
let primed = false;
/** True only while the idle element is being primed (muted) on the first tap. */
let priming = false;
let labeler: ((s: PlayerState) => { title: string; artist: string; album: string; artwork: string }) | null = null;

const urlOf = (el: HTMLAudioElement) => el.dataset.url ?? "";
const active = () => els[cur];

function ensureEls() {
  if (els.length || typeof window === "undefined") return;
  els = [new Audio(), new Audio()];
  els.forEach((el, i) => {
    el.preload = "auto";
    const mine = () => cur === i;
    el.addEventListener("playing", () => {
      // only the active element may sound; anything else (a late play() promise, a stray resume) stops
      if (!mine()) {
        if (!priming) el.pause();
        return;
      }
      set({ status: "playing" });
      preloadNext();
    });
    el.addEventListener("waiting", () => mine() && state.status === "playing" && set({ status: "loading" }));
    el.addEventListener("pause", () => mine() && !el.ended && (state.status === "playing" || state.status === "loading") && set({ status: "paused" }));
    el.addEventListener("timeupdate", () => mine() && setProgress({ position: el.currentTime, duration: Number.isFinite(el.duration) ? el.duration : 0 }));
    el.addEventListener("durationchange", () => {
      if (!mine()) return;
      setProgress({ position: el.currentTime, duration: Number.isFinite(el.duration) ? el.duration : 0 });
      updatePositionState();
    });
    el.addEventListener("ended", () => mine() && onEnded());
    el.addEventListener("error", () => {
      if (!mine() || !el.dataset.url) return;
      set({ status: "error" });
    });
  });
  setupMediaSession();
  if (process.env.NODE_ENV !== "production") (window as unknown as { __player: unknown }).__player = { els, get cur() { return cur; }, get state() { return state; } };
}

/** The ayah after s:a, honouring repeat-surah and continuous play (null = stop). */
function nextOf(s: number, a: number): { s: number; a: number } | null {
  if (a < ayahCount(s)) return { s, a: a + 1 };
  if (state.repeat === "surah") return { s, a: 1 };
  if (state.continuous && s < 114) return { s: s + 1, a: 1 };
  return null;
}

/** Puts the next ayah into the idle element so it is buffered before this one ends. */
function preloadNext() {
  if (state.repeat === "ayah") return;
  const n = nextOf(state.surah, state.ayah);
  if (!n) return;
  const url = ayahUrl(state.reciter, n.s, n.a);
  const other = els[1 - cur];
  if (urlOf(other) === url) return;
  other.dataset.url = url;
  other.src = url;
  other.load();
}

function onEnded() {
  if (state.repeat === "ayah") {
    const el = active();
    el.currentTime = 0;
    void el.play().catch(() => set({ status: "paused" }));
    return;
  }
  const n = nextOf(state.surah, state.ayah);
  if (!n) {
    set({ status: "ended" });
    return;
  }
  load(n.s, n.a, true);
}

/** Loads ayah s:a into the active element (swapping in the preloaded one when it holds it). */
function load(s: number, a: number, autoplay: boolean) {
  ensureEls();
  const my = ++gen;
  const url = ayahUrl(state.reciter, s, a);
  const prev = active();
  if (urlOf(els[1 - cur]) === url) {
    cur = 1 - cur;
    prev.pause();
  } else {
    els[1 - cur].pause();
    if (urlOf(prev) !== url) {
      prev.dataset.url = url;
      prev.src = url;
    }
  }
  const el = active();
  if (el.currentTime) el.currentTime = 0;
  el.defaultPlaybackRate = state.rate;
  el.playbackRate = state.rate;
  set({ surah: s, ayah: a, status: autoplay ? "loading" : "paused", visible: true });
  setProgress({ position: 0, duration: Number.isFinite(el.duration) ? el.duration : 0 });
  saveLast();
  updateMetadata();
  if (autoplay)
    void el.play().catch((e: unknown) => {
      if (my !== gen) return;
      set({ status: (e as { name?: string })?.name === "NotAllowedError" ? "paused" : "error" });
    });
}

/**
 * iOS lets an <audio> element start on its own only after it has once played from a tap. On the first
 * tap, the idle element plays the next ayah silently for a moment, so it may take over later.
 */
function prime() {
  if (primed) return;
  primed = true;
  const n = nextOf(state.surah, state.ayah);
  const other = els[1 - cur];
  if (!n || !other) return;
  const url = ayahUrl(state.reciter, n.s, n.a);
  other.dataset.url = url;
  other.src = url;
  other.muted = true;
  priming = true;
  const done = () => {
    priming = false;
    if (other !== active()) other.pause();
    other.muted = false;
    if (other !== active() && other.currentTime) other.currentTime = 0;
  };
  void other.play().then(done, done);
}

function saveLast() {
  last = { reciter: state.reciter, surah: state.surah, ayah: state.ayah, continuous: state.continuous, at: Date.now() };
  write(LAST_KEY, last);
}
const savePrefs = () => write(PREFS_KEY, { repeat: state.repeat, rate: state.rate, reciter: state.reciter });

// ── media session (lock screen / headset / notification controls) ──
function setupMediaSession() {
  if (!("mediaSession" in navigator)) return;
  const ms = navigator.mediaSession;
  const on = (a: MediaSessionAction, h: MediaSessionActionHandler) => {
    try {
      ms.setActionHandler(a, h);
    } catch {}
  };
  on("play", () => toggle(true));
  on("pause", () => toggle(false));
  on("previoustrack", () => prev());
  on("nexttrack", () => next());
  on("stop", () => close());
  on("seekto", (d) => d.seekTime != null && seek(d.seekTime));
}
function updateMetadata() {
  if (!("mediaSession" in navigator) || !labeler || typeof MediaMetadata === "undefined") return;
  const l = labeler(state);
  const src = new URL(l.artwork, window.location.origin).href;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: l.title,
    artist: l.artist,
    album: l.album,
    artwork: [{ src, sizes: "200x200", type: src.endsWith(".webp") ? "image/webp" : "image/png" }],
  });
}
function updatePositionState() {
  const el = active();
  if (!el || !("mediaSession" in navigator) || !Number.isFinite(el.duration) || !el.duration) return;
  try {
    navigator.mediaSession.setPositionState({ duration: el.duration, position: Math.min(el.currentTime, el.duration), playbackRate: state.rate });
  } catch {}
}

// ── actions ──
/** Plays a surah from `fromAyah` (default 1). `continuous` carries on into the following surahs. */
export function playSurah(reciter: string, surah: number, fromAyah = 1, opts: { continuous?: boolean } = {}) {
  hydrate();
  ensureEls();
  const s = Math.min(114, Math.max(1, Math.round(surah)));
  const a = Math.min(ayahCount(s), Math.max(1, Math.round(fromAyah)));
  set({ reciter: isReciter(reciter) ? reciter : state.reciter, continuous: !!opts.continuous, visible: true });
  savePrefs();
  load(s, a, true);
  prime();
}

/** Plays (true), pauses (false) or toggles. */
export function toggle(play?: boolean) {
  hydrate();
  ensureEls();
  const playing = state.status === "playing" || state.status === "loading";
  const want = play ?? !playing;
  const el = active();
  if (!want) {
    ++gen; // a play() still pending must not resume after this pause
    els.forEach((x) => x.pause());
    set({ status: "paused" });
    return;
  }
  if (state.status === "ended") {
    load(state.surah, 1, true);
    return;
  }
  if (state.status === "error" || urlOf(el) !== ayahUrl(state.reciter, state.surah, state.ayah)) {
    load(state.surah, state.ayah, true);
    prime();
    return;
  }
  set({ status: "loading", visible: true });
  void el.play().catch(() => set({ status: "paused" }));
  prime();
}

const keepPlaying = () => state.status === "playing" || state.status === "loading" || state.status === "ended";

export function next() {
  let n = nextOf(state.surah, state.ayah);
  if (!n && state.surah < 114) n = { s: state.surah + 1, a: 1 };
  if (n) load(n.s, n.a, keepPlaying());
}
export function prev() {
  const { surah: s, ayah: a } = state;
  if (a > 1) load(s, a - 1, keepPlaying());
  else if (s > 1) load(s - 1, ayahCount(s - 1), keepPlaying());
  else load(1, 1, keepPlaying());
}
/** Jumps to ayah `a` of the current surah. */
export function goToAyah(a: number) {
  load(state.surah, Math.min(ayahCount(state.surah), Math.max(1, a)), state.status !== "paused" && state.status !== "idle");
}
/** Seeks inside the current ayah (seconds). */
export function seek(sec: number) {
  const el = active();
  if (!el || !Number.isFinite(el.duration)) return;
  el.currentTime = Math.min(el.duration, Math.max(0, sec));
  setProgress({ position: el.currentTime, duration: el.duration });
  updatePositionState();
}
export function setRepeat(repeat: Repeat) {
  set({ repeat });
  savePrefs();
  // the idle element may now hold the wrong "next" ayah — it is simply replaced on the next preload
  if (state.status === "playing") preloadNext();
}
export function cycleRepeat() {
  setRepeat(state.repeat === "off" ? "surah" : state.repeat === "surah" ? "ayah" : "off");
}
export function setRate(rate: number) {
  set({ rate });
  savePrefs();
  els.forEach((el) => {
    el.defaultPlaybackRate = rate;
    el.playbackRate = rate;
  });
  updatePositionState();
}
export function cycleRate() {
  setRate(SPEEDS[(SPEEDS.indexOf(state.rate) + 1) % SPEEDS.length]);
}
/** Switches reciter, staying on the same ayah. */
export function setReciter(reciter: string) {
  if (!isReciter(reciter) || reciter === state.reciter) return;
  hydrate();
  const wasPlaying = state.status === "playing" || state.status === "loading";
  set({ reciter });
  savePrefs();
  if (state.visible) load(state.surah, state.ayah, wasPlaying);
}
export function setExpanded(expanded: boolean) {
  set({ expanded });
}
export function close() {
  gen++;
  els.forEach((el) => el.pause());
  set({ status: "paused", visible: false, expanded: false });
}
/** Picks up where the visitor last stopped. */
export function resume() {
  hydrate();
  if (last) playSurah(last.reciter, last.surah, last.ayah, { continuous: last.continuous });
}
export function setLabeler(fn: typeof labeler) {
  labeler = fn;
  if (state.visible) updateMetadata();
}

// ── React bindings ──
function subscribe(cb: () => void) {
  hydrate();
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function subscribeProgress(cb: () => void) {
  progressListeners.add(cb);
  return () => progressListeners.delete(cb);
}
const getState = () => state;
const getServerState = () => INITIAL;
const getProgress = () => progress;
const getServerProgress = () => NO_PROGRESS;
const getLast = () => last;
const getServerLast = () => null;

export const usePlayerState = () => useSyncExternalStore(subscribe, getState, getServerState);
export const usePlayerProgress = () => useSyncExternalStore(subscribeProgress, getProgress, getServerProgress);
/** Where the visitor last stopped (null on the server / never played). */
export const useLastPlayed = () => useSyncExternalStore(subscribe, getLast, getServerLast);
