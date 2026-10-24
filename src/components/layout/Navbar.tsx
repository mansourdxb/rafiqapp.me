"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Icon } from "@/components/ui/Icon";
import { locales, localePath, nativeName, type Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { home } from "@/i18n/messages/home";
import { STORES } from "@/lib/stores";
import { NAV_MAIN, NAV_MORE } from "./nav";

/** Same page in another language: swaps the first path segment, keeps ?query and #hash. */
function switchLang(pathname: string, to: Locale) {
  const parts = pathname.split("/");
  parts[1] = to;
  const q = typeof window === "undefined" ? "" : window.location.search + window.location.hash;
  return (parts.join("/") || `/${to}/`) + q;
}

const STORE_ICONS = [
  { href: STORES.appStore, label: "App Store", path: "M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.6 1.3-.1 1.7-.8 3.3-.8 1.5 0 1.9.8 3.3.8 1.4 0 2.2-1.2 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.5-4.1zM13.9 5c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z" },
  { href: STORES.googlePlay, label: "Google Play", path: "M3.6 2.2c-.3.3-.4.7-.4 1.2v17.2c0 .5.1.9.4 1.2l9.6-9.8zM16.4 15.2l-3.2-3.2 3.2-3.2 3.7 2.1c1.1.6 1.1 1.6 0 2.2zM15.6 8.2L5 2.1c-.5-.3-1-.3-1.3-.1l9.6 9.8zM15.6 15.8l-2.3-2.3-9.6 9.8c.3.2.8.2 1.3-.1z" },
  { href: STORES.appGallery, label: "AppGallery", path: "M12 4.5c-1.6 1.4-2.2 3.8-1 6.3l1 2 1-2c1.2-2.5.6-4.9-1-6.3zM4.8 7.4c-.6 2 .3 4.3 2.6 5.8l1.9 1.1-.6-2.1c-.8-2.7-2.3-4.2-3.9-4.8zM19.2 7.4c-1.6.6-3.1 2.1-3.9 4.8l-.6 2.1 1.9-1.1c2.3-1.5 3.2-3.8 2.6-5.8zM3 13c.2 1.8 2 3.4 4.6 3.6h2.2l-1.8-1.3C6.3 14 4.6 13.2 3 13zM21 13c-1.6.2-3.3 1-5 2.3l-1.8 1.3h2.2c2.6-.2 4.4-1.8 4.6-3.6z" },
];

export function Navbar({ lang }: { lang: Locale }) {
  const t = common[lang];
  const h = home[lang];
  const pathname = usePathname() ?? `/${lang}/`;
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  // dark class is set before paint by the layout script; read it without a mount effect
  const domDark = useSyncExternalStore(
    () => () => {},
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );
  const [picked, setPicked] = useState<boolean | null>(null);
  const dark = picked ?? domDark;

  // close the menus when the page changes
  const [shownPath, setShownPath] = useState(pathname);
  if (shownPath !== pathname) {
    setShownPath(pathname);
    setOpen(false);
    setLangOpen(false);
    setMoreOpen(false);
  }

  const toggleTheme = () => {
    const next = !dark;
    setPicked(next);
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

  const isHome = pathname === `/${lang}/` || pathname === `/${lang}`;
  const active = (href: string) => pathname.startsWith(localePath(lang, href));
  const link = (on: boolean) =>
    `relative whitespace-nowrap px-1 py-2 text-[13px] font-bold text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-1 after:rounded-full after:bg-primary after:transition ${
      on ? "after:opacity-100" : "after:opacity-0 hover:after:opacity-60"
    }`;

  const langMenu = (
    <div className="relative">
      <button onClick={() => setLangOpen((v) => !v)} aria-expanded={langOpen} className="flex items-center gap-1 text-[13px] font-bold text-white">
        {nativeName[lang]}
        <Icon name="chevron" className={`size-3.5 transition ${langOpen ? "-rotate-90" : "rotate-90"}`} />
      </button>
      {langOpen && (
        <ul className="absolute end-0 top-9 z-50 w-48 overflow-hidden rounded-xl bg-white py-1 text-navy-2 shadow-xl ring-1 ring-black/5">
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
  );

  return (
    <header className="sticky top-0 z-40 lg:static">
      {/* top strip: banner + store links (desktop) */}
      <div className="hidden bg-white shadow-[0_6px_20px_-12px_rgba(0,0,0,0.18)] lg:block dark:bg-card">
        <div className="mx-auto flex h-[90px] max-w-7xl items-center justify-between px-6">
          <span className="w-40" />
          <Link
            href={`${localePath(lang)}#download`}
            className="relative flex h-[72px] w-[728px] max-w-full items-center justify-between overflow-hidden rounded-md bg-gradient-to-r from-tint via-white to-white px-6 ring-1 ring-line rtl:bg-gradient-to-l"
          >
            <Image src="/images/ref/catHeader3.webp" alt="" width={300} height={72} className="absolute start-0 top-0 h-full w-60 object-cover opacity-90 [mask-image:linear-gradient(to_right,black,transparent)] rtl:[mask-image:linear-gradient(to_left,black,transparent)]" />
            <span className="relative ms-auto flex items-center gap-4">
              <span className="text-end">
                <span className="block text-xl font-extrabold text-navy-2">{h.strip.tagline}</span>
                <span className="block text-sm font-bold text-orange">{h.strip.sub}</span>
              </span>
              <Image src="/logo-512.png" alt={t.siteName} width={56} height={56} className="rounded-xl" />
            </span>
          </Link>
          <div className="flex w-40 justify-end gap-2.5">
            {STORE_ICONS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid size-9 place-items-center rounded-full bg-primary text-white hover:bg-primary-deep">
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* navy menu bar (desktop) */}
      <nav className="hidden bg-navy lg:block">
        <div className="mx-auto flex h-[87px] max-w-7xl items-center gap-8 px-6">
          <Link href={localePath(lang)} className="shrink-0 rounded-2xl bg-white p-1 shadow-md">
            <Image src="/logo-512.png" alt={t.siteName} width={72} height={72} className="rounded-xl" priority />
          </Link>
          <ul className="mx-auto flex items-center gap-5 xl:gap-7">
            <li>
              <Link href={localePath(lang)} className={link(isHome)}>
                {t.nav.home}
              </Link>
            </li>
            {NAV_MAIN.map((n) => (
              <li key={n.key}>
                <Link href={localePath(lang, n.href)} className={link(active(n.href))}>
                  {t.nav[n.key]}
                </Link>
              </li>
            ))}
            <li className="relative">
              <button onClick={() => setMoreOpen((v) => !v)} aria-expanded={moreOpen} className={`${link(NAV_MORE.some((n) => active(n.href)))} flex items-center gap-1`}>
                {t.nav.more}
                <Icon name="chevron" className={`size-3.5 transition ${moreOpen ? "-rotate-90" : "rotate-90"}`} />
              </button>
              {moreOpen && (
                <ul className="absolute start-0 top-10 z-50 w-60 overflow-hidden rounded-xl bg-white py-1.5 text-navy-2 shadow-xl ring-1 ring-black/5">
                  {NAV_MORE.map((n) => (
                    <li key={n.key}>
                      <Link href={localePath(lang, n.href)} className={`flex items-center gap-3 px-4 py-2.5 text-sm font-bold hover:bg-tint ${active(n.href) ? "text-primary" : ""}`}>
                        <Icon name={n.icon} className="size-4.5 text-primary" />
                        {t.nav[n.key]}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
          <div className="flex shrink-0 items-center gap-4">
            {langMenu}
            <button onClick={toggleTheme} className="text-white/80 hover:text-white" aria-label={dark ? t.theme.light : t.theme.dark}>
              <Icon name={dark ? "sun" : "moon"} className="size-4.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* mobile bar: logo + menu */}
      <div className="flex h-16 items-center justify-between bg-white px-4 shadow-[0_4px_16px_-10px_rgba(0,0,0,0.25)] lg:hidden dark:bg-card">
        <button onClick={() => setOpen((v) => !v)} aria-label={open ? t.close : t.menu} aria-expanded={open} className="text-navy dark:text-white">
          <Icon name={open ? "close" : "menu"} className="size-8" />
        </button>
        <Link href={localePath(lang)} className="flex items-center gap-2">
          <span className="text-base font-extrabold text-navy-2 dark:text-white">{t.siteName}</span>
          <Image src="/logo-512.png" alt="" width={44} height={44} className="rounded-xl" priority />
        </Link>
      </div>
      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto bg-navy px-4 pb-6 pt-3 text-white lg:hidden">
          <ul className="grid gap-1">
            <li>
              <Link href={localePath(lang)} className={`block rounded-xl px-3 py-3 font-bold ${isHome ? "bg-white/10" : ""}`}>
                {t.nav.home}
              </Link>
            </li>
            {[...NAV_MAIN, ...NAV_MORE].map((n) => (
              <li key={n.key}>
                <Link href={localePath(lang, n.href)} className={`flex items-center gap-3 rounded-xl px-3 py-3 font-bold ${active(n.href) ? "bg-white/10" : ""}`}>
                  <Icon name={n.icon} className="size-5 text-primary" />
                  {t.nav[n.key]}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
            {langMenu}
            <button onClick={toggleTheme} className="flex items-center gap-2 text-sm font-bold text-white/85">
              <Icon name={dark ? "sun" : "moon"} className="size-4.5" />
              {dark ? t.theme.light : t.theme.dark}
            </button>
          </div>
        </div>
      )}
      {!isHome && (
        <div className="bg-white py-3 text-center dark:bg-canvas">
          <Link href={`${localePath(lang)}#download`} className="text-base font-bold text-section hover:text-primary dark:text-primary-light">
            {t.getAppNow}
          </Link>
        </div>
      )}
    </header>
  );
}
