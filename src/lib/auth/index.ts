// Website sign-in (same Firebase project as the app). Browser-only; safe to import from client components.
export { useAuth } from "./store";
export { signInWithGoogle, signInWithEmail, registerWithEmail, sendPasswordReset, signOut, updateDisplayName } from "./auth";
export { authErrorMessage } from "./errors";
export { getSyncedData, type SyncedData } from "./userData";

/** Where to go after signing in: a same-site `?next=` path, else the profile page. */
export function nextPath(fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const n = new URLSearchParams(window.location.search).get("next");
  return n && n.startsWith("/") && !n.startsWith("//") && !n.includes("\\") ? n : fallback;
}
