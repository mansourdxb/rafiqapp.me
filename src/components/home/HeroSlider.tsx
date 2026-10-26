"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import type { Home } from "@/i18n/messages/home";

/** Four slides that rotate like the reference hero: headline with an orange phrase, text, stores, art. */
export function HeroSlider({ slides, getApp, getAppHref, badges, art }: { slides: Home["hero"]["slides"]; getApp: string; getAppHref: string; badges: ReactNode; art: ReactNode[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  // only the first slide's phone screens load with the page; the others mount a moment later
  const [later, setLater] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setLater(true), 2500);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 7000);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="grid">
        {slides.map((s, k) => (
          <div
            key={k}
            aria-hidden={k !== i}
            className={`col-start-1 row-start-1 grid items-center gap-6 transition-opacity duration-700 lg:grid-cols-[1fr_1.25fr] lg:gap-10 ${k === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <div className="order-2 text-center lg:order-1 lg:text-start">
              <h1 className="text-[28px] font-extrabold leading-tight text-navy-2 sm:text-[34px] lg:text-[34px] dark:text-white">
                {s.before}
                <span className="text-orange">{s.highlight}</span>
                {s.after}
              </h1>
              <p className="mx-auto mt-5 max-w-md text-base leading-7 text-navy-2 lg:mx-0 dark:text-ink-2">{s.body}</p>
              <Link href={getAppHref} className="mt-6 inline-flex items-center gap-2 text-base font-bold text-primary hover:text-primary-deep">
                {getApp}
                <svg viewBox="0 0 24 12" className="h-3 w-5 rtl:-scale-x-100" fill="currentColor" aria-hidden>
                  <path d="M0 5h20V1l4 5-4 5V7H0z" />
                </svg>
              </Link>
              <div className="mt-3 flex justify-center lg:justify-start">{badges}</div>
            </div>
            <div className="order-1 lg:order-2">{k === 0 || k === i || later ? art[k] : <div className="mx-auto mb-2 aspect-[1.2] w-full max-w-[580px]" />}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-2" role="tablist">
        {slides.map((_, k) => (
          <button
            key={k}
            role="tab"
            aria-selected={k === i}
            aria-label={`${k + 1}`}
            onClick={() => setI(k)}
            className={`h-1.5 w-8 rounded-full transition ${k === i ? "bg-orange" : "bg-[#E9E9E9] hover:bg-line"}`}
          />
        ))}
      </div>
    </div>
  );
}
