"use client";
// "Download the app" pop-up, 5 s after a visit starts, in the page language. Shown at most once every
// 3 days (closing it counts); never on the login / profile pages.
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { promo } from "@/i18n/messages/promo";
import { StoreBadges } from "@/components/ui/StoreBadges";

const KEY = "rafiq.promo.shownAt";
const EVERY_MS = 3 * 24 * 60 * 60 * 1000;
const DELAY_MS = 5000;

export function DownloadPrompt({ lang }: { lang: Locale }) {
  const t = promo[lang];
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const skip = /\/(login|profile)\//.test(pathname);

  useEffect(() => {
    if (skip) return;
    let last = 0;
    try {
      last = Number(localStorage.getItem(KEY)) || 0;
    } catch {}
    if (Date.now() - last < EVERY_MS) return;
    const id = setTimeout(() => {
      setOpen(true);
      try {
        localStorage.setItem(KEY, String(Date.now()));
      } catch {}
    }, DELAY_MS);
    return () => clearTimeout(id);
  }, [skip]);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-3 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`${t.before}${t.name}${t.after}`}>
      <button type="button" tabIndex={-1} aria-label={t.close} className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
      <div className="relative grid w-full max-w-4xl items-center gap-6 overflow-hidden rounded-[28px] bg-white px-6 pb-7 pt-12 shadow-2xl sm:px-10 md:grid-cols-[0.9fr_1.1fr] md:gap-10 md:py-12 dark:bg-card">
        <button type="button" onClick={() => setOpen(false)} aria-label={t.close} className="absolute end-4 top-4 grid size-10 place-items-center rounded-full text-navy-2 hover:bg-tint dark:text-white">
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {/* phone on a navy circle */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-[340px] md:block">
          <div className="absolute inset-0 rounded-full bg-navy" />
          <div className="absolute inset-x-[23%] top-[-6%] bottom-[6%] overflow-hidden rounded-[2rem] bg-[#1d1f24] p-[6px] shadow-xl [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
            <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
              <Image src={`/screens/${lang}/01.webp`} alt="" fill sizes="200px" className="object-cover object-top" />
            </div>
          </div>
        </div>
        <div className="text-center md:text-start">
          <Image src="/logo-512.png" alt={common[lang].siteName} width={64} height={64} className="mx-auto mb-4 rounded-2xl shadow md:hidden" />
          <h2 className="text-[26px] font-extrabold leading-snug text-navy-2 sm:text-[32px] dark:text-white">
            {t.before}
            <span className="text-orange">{t.name}</span>
            {t.after}
          </h2>
          <p className="mt-4 text-base leading-8 text-navy-2/85 dark:text-ink-2">{t.body}</p>
          <StoreBadges lang={lang} className="mt-6 justify-center md:justify-start" />
          <button type="button" onClick={() => setOpen(false)} className="mt-5 text-sm font-semibold text-ink-2 hover:text-primary">
            {t.later}
          </button>
        </div>
      </div>
    </div>
  );
}
