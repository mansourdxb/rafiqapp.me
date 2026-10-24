"use client";
// Header account widget. Signed out → "Log in / Sign up" (desktop: outlined white pill on the navy
// bar; mobile: compact icon button for the white header). Signed in → avatar + first name with a
// small menu (Profile, Sign out).
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { localePath, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { auth as authMsgs } from "@/i18n/messages/auth";
import { signOut, useAuth } from "@/lib/auth";
import { Avatar, displayName } from "./Avatar";

function UserIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

export function AuthButton({ lang, variant }: { lang: Locale; variant: "desktop" | "mobile" }) {
  const t = authMsgs[lang];
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const desktop = variant === "desktop";

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  // Same footprint while Firebase loads, so the header doesn't jump.
  if (loading) return <span aria-hidden className={desktop ? "inline-block h-9 w-28" : "inline-block size-9"} />;

  if (!user) {
    const loginHref = localePath(lang, "/login/");
    const href = pathname && !pathname.includes("/login") ? `${loginHref}?next=${encodeURIComponent(pathname)}` : loginHref;
    return desktop ? (
      <Link href={href} className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[13px] font-bold text-white ring-1 ring-white/90 transition hover:bg-white hover:text-navy">
        <UserIcon className="size-4" />
        {t.loginSignup}
      </Link>
    ) : (
      <Link
        href={href}
        aria-label={t.loginSignup}
        className="inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-[13px] font-bold text-navy ring-1 ring-navy/25 dark:text-white dark:ring-white/30"
      >
        <UserIcon className="size-5" />
        <span className="max-[359px]:sr-only">{t.loginShort}</span>
      </Link>
    );
  }

  const first = displayName(user).split(/\s+/)[0] ?? "";

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t.menu}
        className={`flex items-center gap-2 rounded-full ${desktop ? "py-1 pe-3 ps-1 text-[13px] font-bold text-white ring-1 ring-white/40 hover:ring-white" : "p-0.5 text-navy dark:text-white"}`}
      >
        <Avatar user={user} className={`${desktop ? "size-8" : "size-9"} text-xs`} />
        {desktop && <span className="max-w-28 truncate">{first}</span>}
        {desktop && (
          <svg viewBox="0 0 24 24" className={`size-3.5 transition ${open ? "-rotate-90" : "rotate-90"}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M9 6l6 6-6 6" />
          </svg>
        )}
      </button>
      {open && (
        <div role="menu" className="absolute end-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl bg-white py-1.5 text-navy-2 shadow-xl ring-1 ring-black/5 dark:bg-card dark:text-ink">
          <div className="border-b border-line px-4 pb-2.5 pt-1.5">
            <p className="truncate text-sm font-bold">{displayName(user)}</p>
            {user.email && <p dir="ltr" className="truncate text-xs text-ink-2 rtl:text-right">{user.email}</p>}
          </div>
          <Link role="menuitem" href={localePath(lang, "/profile/")} onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold hover:bg-tint">
            <UserIcon className="size-4.5 text-primary" />
            {t.myProfile}
          </Link>
          <button
            role="menuitem"
            type="button"
            onClick={() => (setOpen(false), signOut())}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-start text-sm font-bold text-[#E5392F] hover:bg-tint"
          >
            <svg viewBox="0 0 24 24" className="size-4.5 rtl:-scale-x-100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            {appT(lang, "alm.profile.signOut")}
          </button>
        </div>
      )}
    </div>
  );
}
