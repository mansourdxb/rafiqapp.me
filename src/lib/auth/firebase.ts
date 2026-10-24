// Firebase for the website: the same project as the app (rafiq-al-muslim-500506), web config.
// Web API keys are public by design (access is enforced by Auth + Firestore rules).
// Loaded lazily in the browser only — the site is statically exported, so nothing here may run
// at build / SSR time. Call `loadFirebase()` from effects or event handlers.
import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyC0yBtZ_IJjsiyzjnXKCIZ9E-Qfw073lmg",
  authDomain: "rafiq-al-muslim-500506.firebaseapp.com",
  projectId: "rafiq-al-muslim-500506",
  storageBucket: "rafiq-al-muslim-500506.firebasestorage.app",
  messagingSenderId: "357364415912",
  appId: "1:357364415912:web:2b2adb0bab44f69e5e719d",
};

export type Fb = {
  app: FirebaseApp;
  auth: Auth;
  authMod: typeof import("firebase/auth");
};
export type Fs = { db: Firestore; fsMod: typeof import("firebase/firestore") };

let loading: Promise<Fb> | null = null;
let loaded: Fb | null = null;

/** The Firebase instance if it has already been loaded (lets click handlers open the Google popup synchronously). */
export function firebaseIfLoaded(): Fb | null {
  return loaded;
}

export function loadFirebase(): Promise<Fb> {
  if (typeof window === "undefined") return Promise.reject(new Error("Firebase is browser-only"));
  if (!loading) {
    loading = (async () => {
      const [appMod, authMod] = await Promise.all([import("firebase/app"), import("firebase/auth")]);
      const app = appMod.getApps()[0] ?? appMod.initializeApp(firebaseConfig);
      const auth = authMod.getAuth(app);
      loaded = { app, auth, authMod };
      return loaded;
    })();
    loading.catch(() => {
      loading = null;
    });
  }
  return loading;
}

let fsLoading: Promise<Fs> | null = null;

/** Firestore (users/{uid}) — loaded separately so the header widget only pulls in Auth. */
export function loadFirestore(): Promise<Fs> {
  if (!fsLoading) {
    fsLoading = Promise.all([loadFirebase(), import("firebase/firestore")]).then(([{ app }, fsMod]) => ({ db: fsMod.getFirestore(app), fsMod }));
    fsLoading.catch(() => {
      fsLoading = null;
    });
  }
  return fsLoading;
}
