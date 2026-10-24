"use client";
// One shared auth state for the whole page: undefined = still loading, null = signed out.
import { useSyncExternalStore } from "react";
import type { User } from "firebase/auth";
import { loadFirebase } from "./firebase";

type Snap = { user: User | null | undefined };

let snap: Snap = { user: undefined };
const SERVER_SNAP: Snap = { user: undefined };
const listeners = new Set<() => void>();
let started = false;

function emit(user: User | null | undefined) {
  snap = { user };
  listeners.forEach((l) => l());
}

/** Re-render subscribers after a profile change (onAuthStateChanged doesn't fire for display-name edits). */
export function notifyAuthChanged() {
  emit(snap.user);
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  loadFirebase()
    .then(({ auth, authMod }) => {
      authMod.onAuthStateChanged(auth, (u) => emit(u));
      // Finishes a Google redirect sign-in (fallback path); the user arrives via onAuthStateChanged.
      authMod.getRedirectResult(auth).catch(() => {});
    })
    .catch(() => emit(null));
}

function subscribe(l: () => void) {
  listeners.add(l);
  start();
  return () => {
    listeners.delete(l);
  };
}

export function useAuth(): { user: User | null; loading: boolean } {
  const s = useSyncExternalStore(subscribe, () => snap, () => SERVER_SNAP);
  return { user: s.user ?? null, loading: s.user === undefined };
}
