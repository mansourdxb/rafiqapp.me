// Firebase error code → friendly message, in the visitor's language.
// Wording is the app's own (alm.auth.error.*) where the app has it; the rest is in messages/auth.ts.
import type { Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { auth as msgs } from "@/i18n/messages/auth";

export function authErrorMessage(lang: Locale, e: unknown): string | null {
  const code = (e as { code?: string })?.code ?? "";
  const t = msgs[lang].errors;
  switch (code) {
    case "auth/wrong-password":
      return appT(lang, "alm.auth.error.wrongPassword");
    case "auth/invalid-credential":
    case "auth/invalid-login-credentials":
      // Firebase no longer says which of the two is wrong (email enumeration protection).
      return t.invalidCredential;
    case "auth/user-not-found":
      return appT(lang, "alm.auth.error.userNotFound");
    case "auth/email-already-in-use":
      return appT(lang, "alm.auth.error.emailInUse");
    case "auth/weak-password":
      return appT(lang, "alm.auth.error.weakPassword");
    case "auth/invalid-email":
    case "auth/missing-email":
      return appT(lang, "alm.auth.error.invalidEmail");
    case "auth/missing-password":
      return t.missingPassword;
    case "auth/too-many-requests":
      return appT(lang, "alm.auth.error.tooManyRequests");
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
    case "auth/user-cancelled":
      return t.popupClosed;
    case "auth/popup-blocked":
      return t.popupBlocked;
    case "auth/network-request-failed":
    case "auth/internal-error":
    case "unavailable":
      return t.network;
    case "auth/account-exists-with-different-credential":
      return t.differentProvider;
    case "auth/requires-recent-login":
      return t.recentLogin;
    default:
      return appT(lang, "alm.auth.error.generic");
  }
}
