"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { locales, localePath, nativeName, type Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { NAV_MAIN, NAV_MORE } from "./nav";

/** Same page in another language: swaps the first path segment. */
function switchLang(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  parts[1] = to;
  return parts.join("/") || `/${to}/`;
}

export function Navbar({ lang }: { lang: Locale }) {
  const t = common[lang];
  const pathname = usePathname() ?? `/${lang}/`;
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  const chooseLang = (l: Locale) => {
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };

  const active = (href: string) => pathname.startsWith(localePath(lang, href));

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 text-white backdrop-blur supports-[backdrop-filter]:bg-navy/80">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
        <Link href={localePath(lang)} className="flex min-w-0 items-center gap-2.5">
          <Image src="/logo-512.png" alt="" width={36} height={36} className="shrink-0 rounded-xl" priority />
          <span className="truncate text-base font-bold sm:text-lg">{t.siteName}</span>
        </Link>

        <ul className="ms-6 hidden items-center gap-1 lg:flex">
          {NAV_MAIN.map((n) => (
            <li key={n.key}>
              <Link
                href={localePath(lang, n.href)}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                  active(n.href) ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t.nav[n.key]}
              </Link>
            </li>
          ))}
          <li className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition ${
                NAV_MORE.some((n) => active(n.href)) ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              {t.nav.more}
              <Icon name="chevron" className={`size-4 transition ${moreOpen ? "-rotate-90" : "rotate-90"}`} />
            </button>
            {moreOpen && (
              <ul className="absolute start-0 top-12 w-60 overflow-hidden rounded-2xl border border-line bg-card py-1.5 text-ink shadow-xl">
                {NAV_MORE.map((n) => (
                  <li key={n.key}>
                    <Link
                      href={localePath(lang, n.href)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold hover:bg-tint ${active(n.href) ? "text-primary" : ""}`}
                    >
                      <Icon name={n.icon} className="size-4.5 text-primary" />
                      {t.nav[n.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>

        <div className="ms-auto flex shrink-0 items-center gap-0.5 sm:gap-1.5">
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-white/85 hover:bg-white/10"
              aria-label={t.language}
              aria-expanded={langOpen}
            >
              <Icon name="globe" className="size-4.5" />
              <span className="hidden sm:inline">{nativeName[lang]}</span>
            </button>
            {langOpen && (
              <ul className="absolute end-0 top-12 w-48 overflow-hidden rounded-2xl border border-line bg-card py-1 text-ink shadow-xl">
                {locales.map((l) => (
                  <li key={l}>
                    <Link
                      href={switchLang(pathname, l)}
                      onClick={() => chooseLang(l)}
                      lang={l}
                      className={`block px-4 py-2.5 text-sm hover:bg-tint ${l === lang ? "font-bold text-primary" : ""}`}
                    >
                      {nativeName[l]}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={toggleTheme}
            className="rounded-full p-2.5 text-white/85 hover:bg-white/10"
            aria-label={dark ? t.theme.light : t.theme.dark}
          >
            <Icon name={dark ? "sun" : "moon"} className="size-4.5" />
          </button>
          <Link
            href={`${localePath(lang)}#download`}
            className="hidden rounded-full bg-orange px-4 py-2 text-sm font-bold text-white shadow-sm hover:brightness-110 sm:block"
          >
            {t.getApp}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2.5 text-white/85 hover:bg-white/10 lg:hidden"
            aria-label={open ? t.close : t.menu}
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 lg:hidden">
          <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 py-4 sm:grid-cols-4">
            {[...NAV_MAIN, ...NAV_MORE].map((n) => (
              <li key={n.key}>
                <Link
                  href={localePath(lang, n.href)}
                  className={`flex items-center gap-2.5 rounded-2xl px-3 py-3 text-sm font-semibold ${
                    active(n.href) ? "bg-white/15" : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <Icon name={n.icon} className="size-5 text-primary-light" />
                  {t.nav[n.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
