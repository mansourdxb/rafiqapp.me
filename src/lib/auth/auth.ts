// Sign-in actions for the website. Same Firebase Auth project as the app, so an account made on
// the site works in the app (and the other way round). Providers enabled for web: Google, Email.
import type { User } from "firebase/auth";
import { firebaseIfLoaded, loadFirebase, loadFirestore, type Fb } from "./firebase";
import { notifyAuthChanged } from "./store";

const fb = async (): Promise<Fb> => firebaseIfLoaded() ?? loadFirebase();

/** In-app browsers (Facebook, Instagram, Line, Android WebView…) can't open sign-in popups. */
function isInAppBrowser() {
  const ua = navigator.userAgent || "";
  return /FBAN|FBAV|Instagram|Line\/|; wv\)|Snapchat|TikTok|MicroMessenger/i.test(ua);
}

/**
 * Google sign-in: popup first (works on desktop and on mobile Safari / Chrome when started by a tap);
 * falls back to a full-page redirect when the popup is blocked or the browser can't do popups.
 * Resolves with the user, or with null when a redirect was started (the page navigates away).
 */
export async function signInWithGoogle(): Promise<User | null> {
  // Use the already-loaded instance so the popup opens inside the click (no await before it).
  const f = firebaseIfLoaded() ?? (await loadFirebase());
  const { authMod, auth } = f;
  const provider = new authMod.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  if (isInAppBrowser()) {
    await authMod.signInWithRedirect(auth, provider);
    return null;
  }
  try {
    const res = await authMod.signInWithPopup(auth, provider);
    return res.user;
  } catch (e) {
    const code = (e as { code?: string })?.code;
    if (code === "auth/popup-blocked" || code === "auth/operation-not-supported-in-this-environment" || code === "auth/web-storage-unsupported") {
      await authMod.signInWithRedirect(auth, provider);
      return null;
    }
    throw e;
  }
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const { authMod, auth } = await fb();
  const res = await authMod.signInWithEmailAndPassword(auth, email.trim(), password);
  return res.user;
}

/** Creates the account, sets its display name, and stores the name in users/{uid}.profile for the app. */
export async function registerWithEmail(name: string, email: string, password: string): Promise<User> {
  const { authMod, auth } = await fb();
  const res = await authMod.createUserWithEmailAndPassword(auth, email.trim(), password);
  const n = name.trim();
  if (n) {
    await authMod.updateProfile(res.user, { displayName: n });
    await saveProfileName(res.user.uid, n, res.user.email).catch(() => {});
    notifyAuthChanged();
  }
  return res.user;
}

export async function sendPasswordReset(email: string): Promise<void> {
  const { authMod, auth } = await fb();
  auth.languageCode = document.documentElement.lang || null;
  await authMod.sendPasswordResetEmail(auth, email.trim());
}

export async function signOut(): Promise<void> {
  const { authMod, auth } = await fb();
  await authMod.signOut(auth);
}

/** Renames the signed-in user (Auth display name + users/{uid}.profile.name, which the app reads). */
export async function updateDisplayName(name: string): Promise<void> {
  const { authMod, auth } = await fb();
  const user = auth.currentUser;
  if (!user) throw Object.assign(new Error("not signed in"), { code: "auth/no-current-user" });
  const n = name.trim();
  await authMod.updateProfile(user, { displayName: n });
  await saveProfileName(user.uid, n, user.email).catch(() => {});
  notifyAuthChanged();
}

async function saveProfileName(uid: string, name: string, email: string | null) {
  const { db, fsMod } = await loadFirestore();
  // merge: only touches profile.name / profile.email, never the app's synced data
  await fsMod.setDoc(fsMod.doc(db, "users", uid), { profile: { name, ...(email ? { email } : {}) } }, { merge: true });
}
