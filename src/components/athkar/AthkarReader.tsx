"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { dir, localePath, type Locale } from "@/i18n/config";
import type { ReaderLabels } from "@/i18n/messages/athkar";
import type { Dhikr } from "@/lib/athkar/data";
import { localDigits } from "@/lib/digits";
import { cleanZikr, stripTashkeel } from "@/lib/athkar/text";
import { useAthkarProgress } from "@/lib/athkar/progress";
import { useStored } from "@/lib/athkar/store";
import { Icon } from "@/components/ui/Icon";

const AUDIO_BASE = "https://raw.githubusercontent.com/mansourdxb/rafiq-al-muslim-assets/main/azkar/audio/";
const FONT_MIN = 18;
const FONT_MAX = 40;

export function AthkarReader({
  lang,
  id,
  title,
  items,
  labels: t,
}: {
  lang: Locale;
  id: number;
  title: string;
  items: Dhikr[];
  labels: ReaderLabels;
}) {
  const d = (n: number | string) => localDigits(lang, n);
  const { cats, save } = useAthkarProgress();
  const counts = items.map((_, i) => cats[id]?.[i] ?? 0);
  const doneCount = items.filter((it, i) => counts[i] >= it.c).length;
  const allDone = doneCount === items.length;

  const [tashkeel, setTashkeel] = useStored("rafiq:athkar:tashkeel", true);
  const [font, setFont] = useStored("rafiq:athkar:font", 24);
  const [expanded, setExpanded] = useState<number[]>([]);
  const [dalil, setDalil] = useState<number[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [playing, setPlaying] = useState<number | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => audio.current?.pause(), []);

  const arabic = (s: string) => (tashkeel ? cleanZikr(s) : stripTashkeel(cleanZikr(s)));

  const scrollTo = (i: number) =>
    document.getElementById(`dhikr-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const count = (i: number) => {
    const it = items[i];
    if (counts[i] >= it.c) return;
    const next = counts.slice();
    next[i] = counts[i] + 1;
    const finished = next[i] >= it.c;
    save(id, next, items.every((x, k) => next[k] >= x.c));
    if (finished) {
      try {
        navigator.vibrate?.([0, 100, 50, 100]);
      } catch {}
      setExpanded((e) => e.filter((x) => x !== i));
      const nextOpen = items.findIndex((x, k) => k > i && next[k] < x.c);
      if (nextOpen >= 0) setTimeout(() => scrollTo(nextOpen), 450);
    }
  };

  const reset = (i: number) => {
    const next = counts.slice();
    next[i] = 0;
    save(id, next, false);
  };

  const restart = () => {
    save(
      id,
      items.map(() => 0),
      false,
    );
    setExpanded([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const togglePlay = (i: number) => {
    audio.current?.pause();
    if (playing === i) {
      setPlaying(null);
      return;
    }
    const a = new Audio(`${AUDIO_BASE}${items[i].a}.mp3`);
    audio.current = a;
    a.onended = () => setPlaying((p) => (p === i ? null : p));
    a.onerror = () => setPlaying((p) => (p === i ? null : p));
    a.play().catch(() => setPlaying(null));
    setPlaying(i);
  };

  const shareText = (i: number) => {
    const it = items[i];
    return [cleanZikr(it.ar), it.tr, `— ${title}`, location.href].filter(Boolean).join("\n\n");
  };

  const copy = async (i: number) => {
    try {
      await navigator.clipboard.writeText(shareText(i));
      setCopied(i);
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 1600);
    } catch {}
  };

  const share = async (i: number) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText(i) });
      } catch {}
    } else copy(i);
  };

  return (
    <div className="pb-20">
      {/* header */}
      <section className="bg-gradient-to-b from-primary to-primary-deep px-4 pt-6 pb-8 text-white">
        <div className="mx-auto max-w-3xl">
          <Link href={localePath(lang, "/athkar/")} className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-semibold text-white/85 hover:bg-white/10">
            <Icon name="chevron" className="size-4 ltr:rotate-180" />
            {t.back}
          </Link>
          <h1 className="mt-2 text-2xl leading-snug font-bold sm:text-3xl">{title}</h1>
        </div>
      </section>

      {/* sticky progress + reading settings */}
      <div className="sticky top-16 z-30 border-b border-line bg-canvas/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
          <div className="min-w-40 flex-1">
            <div className="text-xs font-semibold text-ink-2">{t.readCount.replace("{done}", d(doneCount)).replace("{total}", d(items.length))}</div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(doneCount / items.length) * 100}%` }} />
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={tashkeel}
            onClick={() => setTashkeel(!tashkeel)}
            className="flex items-center gap-2 text-sm font-semibold text-ink"
          >
            {t.tashkeel}
            <span className={`relative h-6 w-10 rounded-full transition ${tashkeel ? "bg-primary" : "bg-line"}`}>
              <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${tashkeel ? "start-[18px]" : "start-0.5"}`} />
            </span>
          </button>
          <div className="flex items-center gap-1" role="group" aria-label={t.fontSize}>
            <button
              type="button"
              onClick={() => setFont(Math.max(FONT_MIN, font - 2))}
              disabled={font <= FONT_MIN}
              aria-label={`${t.fontSize} −`}
              className="grid size-8 place-items-center rounded-full bg-card text-sm font-bold text-primary ring-1 ring-line disabled:opacity-40"
            >
              A−
            </button>
            <button
              type="button"
              onClick={() => setFont(Math.min(FONT_MAX, font + 2))}
              disabled={font >= FONT_MAX}
              aria-label={`${t.fontSize} +`}
              className="grid size-8 place-items-center rounded-full bg-card text-base font-bold text-primary ring-1 ring-line disabled:opacity-40"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      <ol className="mx-auto mt-5 max-w-3xl space-y-4 px-4">
        {items.map((it, i) => {
          const c = counts[i];
          const isDone = c >= it.c;
          const open = !isDone || expanded.includes(i);
          const num = `${d(i + 1)} / ${d(items.length)}`;

          if (!open) {
            return (
              <li key={i} id={`dhikr-${i}`} className="scroll-mt-36">
                <button
                  type="button"
                  onClick={() => setExpanded((e) => [...e, i])}
                  className="flex w-full items-center gap-3 rounded-2xl bg-card/70 p-3 text-start ring-1 ring-line transition hover:bg-card"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#2E9E5B] text-white">
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
                      <path d="M5 12l5 5 9-10" />
                    </svg>
                  </span>
                  <span dir="rtl" lang="ar" className="line-clamp-1 min-w-0 flex-1 text-ink-2">
                    {arabic(it.ar)}
                  </span>
                  <span className="shrink-0 text-xs font-semibold text-[#2E9E5B]">{t.done}</span>
                </button>
              </li>
            );
          }

          const R = 34;
          const C = 2 * Math.PI * R;
          const showDalil = dalil.includes(i);
          return (
            <li key={i} id={`dhikr-${i}`} className="scroll-mt-36">
              <article className="rounded-3xl bg-card p-4 shadow-[0_6px_14px_rgba(22,40,70,0.06)] ring-1 ring-line sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-tint px-2.5 py-1 text-xs font-bold text-primary">{num}</span>
                  {it.c > 1 && (
                    <span className="rounded-full bg-orange/10 px-2.5 py-1 text-xs font-bold text-orange">
                      {t.repeat}: {d(it.c)} {t.times}
                    </span>
                  )}
                  <div className="ms-auto flex items-center gap-1">
                    {it.a && (
                      <ActionBtn label={playing === i ? t.stop : t.listen} onClick={() => togglePlay(i)} active={playing === i}>
                        <Icon name={playing === i ? "pause" : "play"} className="size-4" />
                      </ActionBtn>
                    )}
                    <ActionBtn label={copied === i ? t.copied : t.copy} onClick={() => copy(i)} active={copied === i}>
                      {copied === i ? (
                        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
                          <path d="M5 12l5 5 9-10" />
                        </svg>
                      ) : (
                        <Icon name="copy" className="size-4" />
                      )}
                    </ActionBtn>
                    <ActionBtn label={t.share} onClick={() => share(i)}>
                      <Icon name="share" className="size-4" />
                    </ActionBtn>
                  </div>
                </div>

                <p dir="rtl" lang="ar" className="mt-4 text-start leading-[2.05] text-ink" style={{ fontSize: font }}>
                  {arabic(it.ar)}
                </p>

                {it.tr && (
                  <p dir={dir(lang)} className="mt-4 border-t border-line pt-4 text-[15.5px] leading-7 text-ink/80">
                    {it.tr}
                  </p>
                )}

                {(it.s || it.r) && (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setDalil((x) => (showDalil ? x.filter((k) => k !== i) : [...x, i]))}
                      aria-expanded={showDalil}
                      className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1.5 text-[13px] font-bold text-primary"
                    >
                      <Icon name="chevron" className={`size-3.5 transition ${showDalil ? "-rotate-90" : "rotate-90"}`} />
                      {showDalil ? t.hideDalil : t.showDalil}
                    </button>
                    {showDalil && (
                      <div className="mt-3 rounded-2xl bg-tint p-4 text-[14px] leading-7">
                        {it.s && (
                          <p dir="auto" className="text-ink">
                            {it.s}
                          </p>
                        )}
                        {it.r && (
                          <p dir="auto" className="mt-2 text-[13px] font-semibold text-primary">
                            {it.r}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-5 flex items-center justify-center gap-4">
                  <span className="w-16" aria-hidden />
                  <button
                    type="button"
                    onClick={() => count(i)}
                    aria-label={`${t.tapToCount} — ${d(c)} / ${d(it.c)}`}
                    className="relative grid size-24 place-items-center rounded-full transition active:scale-95"
                  >
                    <svg viewBox="0 0 80 80" className="absolute inset-0 size-full -rotate-90" aria-hidden>
                      <circle cx="40" cy="40" r={R} fill="none" strokeWidth="5" className="stroke-line" />
                      <circle
                        cx="40"
                        cy="40"
                        r={R}
                        fill="none"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className={`transition-all duration-300 ${isDone ? "stroke-[#2E9E5B]" : "stroke-primary"}`}
                        strokeDasharray={C}
                        strokeDashoffset={C * (1 - Math.min(1, c / it.c))}
                      />
                    </svg>
                    <span
                      className={`grid size-[70px] place-items-center rounded-full text-white shadow-lg ${
                        isDone ? "bg-[#2E9E5B]" : "bg-gradient-to-b from-primary-light to-primary"
                      }`}
                    >
                      {isDone ? (
                        <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
                          <path d="M5 12l5 5 9-10" />
                        </svg>
                      ) : (
                        <span className="text-[26px] leading-none font-bold">{c /* Latin digits, like the app's counter */}</span>
                      )}
                    </span>
                  </button>
                  <span className="w-16">
                    {c > 0 && (
                      <button type="button" onClick={() => reset(i)} className="inline-flex items-center gap-1 text-xs font-semibold text-ink-2 hover:text-orange">
                        <Icon name="reset" className="size-3.5" />
                        {t.reset}
                      </button>
                    )}
                  </span>
                </div>
                <p className="mt-2 text-center text-xs text-ink-2">{isDone ? t.done : t.tapToCount}</p>
              </article>
            </li>
          );
        })}
      </ol>

      {allDone && (
        <div className="mx-auto mt-6 max-w-3xl px-4">
          <div className="rounded-3xl bg-gradient-to-b from-[#2E9E5B] to-[#25844B] p-6 text-center text-white">
            <p className="text-lg font-bold">{t.allDone}</p>
            <p className="mt-1 text-sm text-white/80">{t.allDoneSub}</p>
            <button type="button" onClick={restart} className="mt-4 rounded-full bg-white px-5 py-2 text-sm font-bold text-[#25844B]">
              {t.restart}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionBtn({ label, onClick, active, children }: { label: string; onClick: () => void; active?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid size-9 place-items-center rounded-full transition ${active ? "bg-orange text-white" : "bg-tint text-primary hover:bg-primary hover:text-white"}`}
    >
      {children}
    </button>
  );
}
