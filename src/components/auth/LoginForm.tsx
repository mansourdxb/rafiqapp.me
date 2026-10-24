"use client";
// Login / sign-up card, like the app's login screen: logo + title, Google, "or", email form with
// Sign in / Create account tabs and a forgot-password flow. Apple and Facebook are not offered:
// they are not enabled for the web in Firebase.
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { localePath, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { auth as authMsgs } from "@/i18n/messages/auth";
import { common } from "@/i18n/messages/common";
import { authErrorMessage, nextPath, registerWithEmail, sendPasswordReset, signInWithEmail, signInWithGoogle, useAuth } from "@/lib/auth";
import { GoogleIcon } from "./Avatar";

type Mode = "login" | "register" | "reset";

const INPUT =
  "h-12 w-full rounded-full bg-white px-5 text-[15px] text-navy-2 shadow-[0_3px_10px_rgba(124,180,200,0.35)] outline-none ring-2 ring-edge/70 placeholder:text-ink-2 focus:ring-primary dark:bg-canvas dark:text-ink";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

function Spinner() {
  return <span className="inline-block size-5 animate-spin rounded-full border-2 border-current border-e-transparent" aria-hidden />;
}

export function LoginForm({ lang }: { lang: Locale }) {
  const t = authMsgs[lang];
  const a = (k: string) => appT(lang, `alm.auth.${k}`);
  const router = useRouter();
  const { user, loading } = useAuth();

  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState<null | "google" | "email">(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const working = useRef(false);

  const done = () => router.replace(nextPath(localePath(lang, "/profile/")));

  // Already signed in (or back from a Google redirect) → go on. Not while a submit is running,
  // so registration can finish saving the name first.
  useEffect(() => {
    if (user && !working.current) router.replace(nextPath(localePath(lang, "/profile/")));
  }, [user, lang, router]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
    setNotice(null);
  };

  const run = async (kind: "google" | "email", fn: () => Promise<unknown>, after?: () => void) => {
    if (working.current) return;
    working.current = true;
    setBusy(kind);
    setError(null);
    setNotice(null);
    try {
      const r = await fn();
      if (after) after();
      else if (r !== null) done();
    } catch (e) {
      setError(authErrorMessage(lang, e));
    } finally {
      working.current = false;
      setBusy(null);
    }
  };

  const google = () => run("google", signInWithGoogle);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "register" && !name.trim()) return setError(t.nameRequired);
    if (!EMAIL_RE.test(email.trim())) return setError(a("error.invalidEmail"));
    if (mode === "reset")
      return run("email", () => sendPasswordReset(email), () => setNotice(a("resetSent")));
    if (!password) return setError(t.errors.missingPassword);
    if (mode === "register" && password.length < 6) return setError(a("error.weakPassword"));
    run("email", () => (mode === "register" ? registerWithEmail(name, email, password) : signInWithEmail(email, password)));
  };

  if (user && !busy)
    return (
      <Card>
        <p className="flex items-center justify-center gap-3 py-10 font-bold text-section dark:text-primary-light">
          <Spinner /> {t.redirecting}
        </p>
      </Card>
    );

  const termsParts = t.terms.split("{privacy}");

  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <Image src="/logo-512.png" alt={common[lang].siteName} width={96} height={96} className="rounded-[22px] shadow-md" priority />
        <p className="mt-5 text-base font-bold leading-relaxed text-navy-2 dark:text-ink">{a("title")}</p>
      </div>

      {mode !== "reset" && (
        <>
          <button
            type="button"
            onClick={google}
            disabled={!!busy || loading}
            className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-full bg-white px-5 font-bold text-[#1F2937] ring-1 ring-[#D7DCE3] transition hover:bg-[#F6F8FA] disabled:opacity-60 dark:ring-line"
          >
            {busy === "google" ? <Spinner /> : <GoogleIcon />}
            <span>{a("google")}</span>
          </button>

          <div className="my-5 flex items-center gap-3 text-sm font-bold text-ink-2">
            <span className="h-px flex-1 bg-line" />
            {a("or")}
            <span className="h-px flex-1 bg-line" />
          </div>

          <div role="tablist" className="grid grid-cols-2 rounded-full bg-tint p-1">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => switchMode(m)}
                className={`h-10 rounded-full text-sm font-bold transition ${mode === m ? "bg-white text-primary shadow-sm dark:bg-card" : "text-navy-2 hover:text-primary dark:text-ink-2"}`}
              >
                {m === "login" ? a("loginTitle") : a("registerTitle")}
              </button>
            ))}
          </div>
        </>
      )}

      {mode === "reset" && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold text-section dark:text-primary-light">{t.resetTitle}</h2>
          <p className="mt-2 text-sm text-ink-2">{t.resetBody}</p>
        </div>
      )}

      <form onSubmit={submit} noValidate className="mt-5 flex flex-col gap-3.5">
        {mode === "register" && (
          <label className="block">
            <span className="sr-only">{appT(lang, "alm.profile.edit.name")}</span>
            <input className={INPUT} value={name} onChange={(e) => setName(e.target.value)} placeholder={appT(lang, "alm.profile.edit.name")} autoComplete="name" maxLength={60} />
          </label>
        )}
        <label className="block">
          <span className="sr-only">{a("emailLabel")}</span>
          <input
            className={`${INPUT} rtl:text-right`}
            dir="ltr"
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={a("emailLabel")}
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
          />
        </label>
        {mode !== "reset" && (
          <label className="relative block">
            <span className="sr-only">{a("passwordLabel")}</span>
            <input
              className={`${INPUT} pe-12 rtl:text-right`}
              dir="ltr"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={a("passwordLabel")}
              autoComplete={mode === "register" ? "new-password" : "current-password"}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? t.hidePassword : t.showPassword}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-ink-2 hover:text-primary"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
                {showPw && <path d="M3 3l18 18" />}
              </svg>
            </button>
          </label>
        )}
        {mode === "register" && <p className="-mt-1 px-4 text-xs text-ink-2">{t.passwordHint}</p>}
        {mode === "login" && (
          <button type="button" onClick={() => switchMode("reset")} className="-mt-1 self-end px-2 text-sm font-bold text-primary hover:underline">
            {a("forgotPassword")}
          </button>
        )}

        {error && (
          <p role="alert" className="rounded-xl bg-[#FDECEC] px-4 py-3 text-sm font-bold text-[#C62828] dark:bg-[#3A1D1D] dark:text-[#FF8A80]">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="rounded-xl bg-tint px-4 py-3 text-sm font-bold text-section dark:text-primary-light">
            {notice}
          </p>
        )}

        <button
          type="submit"
          disabled={!!busy}
          className="mt-1 flex h-12 items-center justify-center rounded-full bg-primary px-10 font-bold text-white transition hover:bg-primary-deep disabled:opacity-60"
        >
          {busy === "email" ? <Spinner /> : mode === "reset" ? t.resetSend : mode === "register" ? a("registerBtn") : a("loginBtn")}
        </button>

        {mode === "reset" && (
          <button type="button" onClick={() => switchMode("login")} className="text-sm font-bold text-primary hover:underline">
            {t.backToLogin}
          </button>
        )}
      </form>

      <p className="mt-6 text-center text-xs leading-relaxed text-ink-2">{t.sameAccount}</p>
      <p className="mt-2 text-center text-xs leading-relaxed text-ink-2">
        {termsParts[0]}
        <a href="/privacy.html" className="font-bold text-primary hover:underline">
          {t.privacyLink}
        </a>
        {termsParts[1]}
      </p>
    </Card>
  );
}

function Card({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-md rounded-[15px] bg-card px-5 py-8 shadow-[0_5px_25px_rgba(0,0,0,0.16)] sm:px-8">{children}</div>;
}
