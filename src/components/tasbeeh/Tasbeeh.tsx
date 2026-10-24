"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { dir, type Locale } from "@/i18n/config";
import type { TasbeehMessages } from "@/i18n/messages/tasbeeh";
import { localDigits } from "@/lib/digits";
import { cleanZikr } from "@/lib/athkar/text";
import { today, useStored } from "@/lib/athkar/store";
import { Icon } from "@/components/ui/Icon";

export type Preset = {
  id: string;
  target: number;
  ar: string;
  name: string;
  translit?: string;
  meaning?: string;
  fadl?: string;
};
type Custom = { id: string; text: string; target: number };
type Saved = {
  sel: string;
  counts: Record<string, number>;
  custom: Custom[];
  day: string;
  today: number;
  all: number;
  vib: boolean;
  snd: boolean;
};
const INIT: Saved = { sel: "subhanallah", counts: {}, custom: [], day: "", today: 0, all: 0, vib: true, snd: false };
const BEADS = 33;

export function Tasbeeh({ lang, presets, t }: { lang: Locale; presets: Preset[]; t: TasbeehMessages }) {
  const d = (n: number | string) => localDigits(lang, n);
  const [s, set] = useStored<Saved>("rafiq:tasbeeh", INIT);
  const [fadlOpen, setFadlOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ text: "", target: "33" });
  const [pulse, setPulse] = useState(0);
  const audioCtx = useRef<AudioContext | null>(null);

  const preset = presets.find((p) => p.id === s.sel);
  const custom = s.custom.find((c) => c.id === s.sel);
  const current = preset ?? custom ?? presets[0];
  const sel = preset || custom ? s.sel : presets[0].id;
  const target = current.target;
  const count = s.counts[sel] ?? 0;
  const done = count >= target;
  const todayTotal = s.day === today() ? s.today : 0;

  const tick = useCallback((strong: boolean) => {
    try {
      const ctx = (audioCtx.current ??= new AudioContext());
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = strong ? 880 : 1400;
      g.gain.setValueAtTime(0.12, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (strong ? 0.5 : 0.06));
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + (strong ? 0.5 : 0.06));
    } catch {}
  }, []);

  const increment = useCallback(() => {
    set((prev) => {
      const id = [...presets.map((p) => p.id), ...prev.custom.map((c) => c.id)].includes(prev.sel) ? prev.sel : presets[0].id;
      const tgt = presets.find((p) => p.id === id)?.target ?? prev.custom.find((c) => c.id === id)?.target ?? 33;
      const n = (prev.counts[id] ?? 0) + 1;
      const day = today();
      const reached = n === tgt;
      if (reached) {
        if (prev.vib) {
          try {
            navigator.vibrate?.([0, 100, 50, 100]);
          } catch {}
        }
      } else if (prev.vib) {
        try {
          navigator.vibrate?.(15);
        } catch {}
      }
      if (prev.snd) tick(reached);
      return {
        ...prev,
        sel: id,
        counts: { ...prev.counts, [id]: n },
        day,
        today: (prev.day === day ? prev.today : 0) + 1,
        all: prev.all + 1,
      };
    });
    setPulse((p) => p + 1);
  }, [presets, set, tick]);

  // Space bar counts (not while typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.key !== " ") return;
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName))) return;
      e.preventDefault();
      if (!e.repeat) increment();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [increment]);

  const choose = (id: string) => {
    set((p) => ({ ...p, sel: id }));
    setFadlOpen(false);
  };
  const reset = () => set((p) => ({ ...p, counts: { ...p.counts, [sel]: 0 } }));
  const remove = (id: string) =>
    set((p) => ({ ...p, custom: p.custom.filter((c) => c.id !== id), sel: p.sel === id ? presets[0].id : p.sel }));
  const addCustom = () => {
    const text = draft.text.trim();
    const tgt = Math.max(1, Math.min(100000, Math.round(Number(draft.target)) || 33));
    if (!text) return;
    const id = `c${Date.now()}`;
    set((p) => ({ ...p, custom: [...p.custom, { id, text, target: tgt }], sel: id }));
    setDraft({ text: "", target: "33" });
    setAdding(false);
  };

  // Beads: the counted part of the current round of 33 is filled.
  const inRound = count === 0 ? 0 : ((count - 1) % BEADS) + 1;
  const R = 128;
  const ring = 2 * Math.PI * 100;
  const gid = useId().replace(/:/g, "");

  const arText = preset ? cleanZikr(preset.ar) : custom?.text ?? "";

  return (
    <div className="mx-auto -mt-16 grid max-w-6xl gap-6 px-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      {/* counter */}
      <section className="rounded-3xl bg-card p-5 shadow-[0_6px_14px_rgba(22,40,70,0.08)] ring-1 ring-line sm:p-8">
        <div className="text-center">
          <p dir="auto" className="text-[26px] leading-[1.9] font-bold text-[#16384A] dark:text-ink sm:text-3xl" lang={preset ? "ar" : undefined}>
            {arText}
          </p>
          {preset?.translit && dir(lang) === "ltr" && <p className="mt-1 text-sm font-semibold text-primary">{preset.translit}</p>}
          {preset?.meaning && (
            <p dir={dir(lang)} className="mt-1 text-[15px] text-ink-2">
              {preset.meaning}
            </p>
          )}
          {preset?.fadl && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setFadlOpen((v) => !v)}
                aria-expanded={fadlOpen}
                className="inline-flex items-center gap-1 rounded-full border border-dashed border-primary/50 px-3 py-1 text-[13px] font-bold text-primary"
              >
                {t.fadl}
                <Icon name="chevron" className={`size-3.5 transition ${fadlOpen ? "-rotate-90" : "rotate-90"}`} />
              </button>
              {fadlOpen && (
                <p dir="auto" className="mx-auto mt-3 max-h-56 max-w-2xl overflow-y-auto rounded-2xl bg-tint p-4 text-start text-[14.5px] leading-7 whitespace-pre-line text-ink">
                  {preset.fadl}
                </p>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={increment}
          aria-label={`${t.tapHint} — ${d(count)} / ${d(target)}`}
          className="relative mx-auto mt-6 block aspect-square w-full max-w-[320px] touch-manipulation rounded-full outline-none select-none focus-visible:ring-4 focus-visible:ring-primary/40"
        >
          <svg viewBox="0 0 300 300" className="size-full" aria-hidden>
            <defs>
              <radialGradient id={`${gid}p`} cx="36%" cy="30%" r="72%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="45%" stopColor="#EEF3F6" />
                <stop offset="85%" stopColor="#B9C7D0" />
                <stop offset="100%" stopColor="#8EA0AB" />
              </radialGradient>
              <radialGradient id={`${gid}n`} cx="36%" cy="30%" r="72%">
                <stop offset="0%" stopColor="#9CC9E6" />
                <stop offset="35%" stopColor="#2C5A84" />
                <stop offset="85%" stopColor="#163049" />
                <stop offset="100%" stopColor="#0C1C2C" />
              </radialGradient>
              <radialGradient id={`${gid}g`} cx="36%" cy="30%" r="72%">
                <stop offset="0%" stopColor="#B7EBCB" />
                <stop offset="40%" stopColor="#2E9E5B" />
                <stop offset="100%" stopColor="#14502C" />
              </radialGradient>
            </defs>
            {/* string */}
            <circle cx="150" cy="150" r={R} fill="none" strokeWidth="1.5" className="stroke-[#C9A24B]/60" />
            {/* progress toward the target */}
            <circle cx="150" cy="150" r="100" fill="none" strokeWidth="8" className="stroke-line" />
            <circle
              cx="150"
              cy="150"
              r="100"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              transform="rotate(-90 150 150)"
              className={`transition-all duration-300 ${done ? "stroke-[#2E9E5B]" : "stroke-primary"}`}
              strokeDasharray={ring}
              strokeDashoffset={ring * (1 - Math.min(1, count / target))}
            />
            {Array.from({ length: BEADS }, (_, i) => {
              const a = (i / BEADS) * 2 * Math.PI - Math.PI / 2;
              const on = i < inRound;
              const last = on && i === inRound - 1;
              return (
                <g key={i} transform={`translate(${(150 + R * Math.cos(a)).toFixed(2)} ${(150 + R * Math.sin(a)).toFixed(2)})`}>
                  <circle
                    r={last ? 11.5 : 10}
                    fill={`url(#${gid}${on ? (done ? "g" : "n") : "p"})`}
                    className="transition-all duration-200"
                    style={{ filter: "drop-shadow(0 1.5px 1.5px rgba(20,60,80,0.3))" }}
                  />
                  <ellipse cx="-3" cy="-3.5" rx="3" ry="2" fill="#fff" opacity="0.85" />
                </g>
              );
            })}
            {/* imame (head bead) */}
            <circle cx="150" cy={150 - R - 2} r="5" className="fill-[#C9A24B]" />
          </svg>
          <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span key={pulse} className="animate-[tasbeeh-pop_180ms_ease-out] text-6xl font-bold text-[#1E6A93] tabular-nums dark:text-[#5FB4D6]">
              {/* Latin digits in the big counter, like the app's CircularCounter */}
              {count}
            </span>
            <span className="mt-1 text-sm font-semibold text-ink-2">{t.ofTarget.replace("{target}", d(target))}</span>
          </span>
        </button>
        <style>{`@keyframes tasbeeh-pop{0%{transform:scale(1.18)}100%{transform:scale(1)}}`}</style>

        <p className="mt-4 text-center text-xs text-ink-2">{t.tapHint}</p>

        {done && (
          <div className="mx-auto mt-4 max-w-md rounded-2xl bg-[#2E9E5B]/10 p-3 text-center" role="status">
            <p className="font-bold text-[#2E9E5B]">{t.completed}</p>
            <p className="text-sm text-ink-2">{t.completedSub}</p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={reset}
            disabled={count === 0}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#E98127] px-5 py-2.5 text-sm font-bold text-white transition disabled:opacity-40"
          >
            <Icon name="reset" className="size-4" />
            {t.reset}
          </button>
          <Toggle on={s.vib} label={t.vibrate} onClick={() => set((p) => ({ ...p, vib: !p.vib }))} />
          <Toggle on={s.snd} label={t.sound} onClick={() => set((p) => ({ ...p, snd: !p.snd }))} />
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-2 text-center">
          {[
            [t.thisDhikr, count],
            [t.today, todayTotal],
            [t.allTime, s.all],
          ].map(([k, v]) => (
            <div key={k as string} className="rounded-2xl bg-tint px-2 py-3">
              <dt className="text-xs font-semibold text-ink-2">{k}</dt>
              <dd className="mt-0.5 text-xl font-bold text-ink tabular-nums">{d(v as number)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* dhikr list */}
      <aside className="rounded-3xl bg-card p-4 shadow-[0_6px_14px_rgba(22,40,70,0.08)] ring-1 ring-line lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto">
        <h2 className="px-1 text-lg font-bold text-ink">{t.choose}</h2>
        <p className="mt-3 px-1 text-xs font-bold tracking-wide text-ink-2">{t.builtIn}</p>
        <ul className="mt-2 space-y-1.5">
          {presets.map((p) => (
            <li key={p.id}>
              <DhikrRow
                active={sel === p.id}
                title={p.name}
                sub={lang === "ar" ? undefined : cleanZikr(p.ar)}
                target={d(p.target)}
                count={d(s.counts[p.id] ?? 0)}
                onClick={() => choose(p.id)}
              />
            </li>
          ))}
        </ul>

        <p className="mt-5 px-1 text-xs font-bold tracking-wide text-ink-2">{t.mine}</p>
        <ul className="mt-2 space-y-1.5">
          {s.custom.map((c) => (
            <li key={c.id} className="flex items-center gap-1">
              <div className="min-w-0 flex-1">
                <DhikrRow active={sel === c.id} title={c.text} target={d(c.target)} count={d(s.counts[c.id] ?? 0)} onClick={() => choose(c.id)} />
              </div>
              <button
                type="button"
                onClick={() => remove(c.id)}
                aria-label={t.remove}
                title={t.remove}
                className="grid size-9 shrink-0 place-items-center rounded-full text-ink-2 hover:bg-orange/10 hover:text-orange"
              >
                <Icon name="close" className="size-4" />
              </button>
            </li>
          ))}
        </ul>

        {adding ? (
          <form
            className="mt-3 space-y-2 rounded-2xl bg-tint p-3"
            onSubmit={(e) => {
              e.preventDefault();
              addCustom();
            }}
          >
            <p className="text-sm font-bold text-ink">{t.addTitle}</p>
            <textarea
              value={draft.text}
              onChange={(e) => setDraft((x) => ({ ...x, text: e.target.value }))}
              placeholder={t.textPlaceholder}
              dir="auto"
              rows={2}
              maxLength={300}
              autoFocus
              className="w-full resize-none rounded-xl bg-card p-2.5 text-[15px] text-ink ring-1 ring-line outline-none focus:ring-2 focus:ring-primary"
            />
            <label className="flex items-center gap-2 text-sm text-ink-2">
              {t.target}
              <input
                type="number"
                inputMode="numeric"
                min={1}
                max={100000}
                value={draft.target}
                onChange={(e) => setDraft((x) => ({ ...x, target: e.target.value }))}
                className="w-24 rounded-xl bg-card px-2.5 py-1.5 text-ink ring-1 ring-line outline-none focus:ring-2 focus:ring-primary"
              />
            </label>
            <div className="flex gap-2">
              <button type="submit" disabled={!draft.text.trim()} className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white disabled:opacity-40">
                {t.save}
              </button>
              <button type="button" onClick={() => setAdding(false)} className="rounded-full px-4 py-2 text-sm font-bold text-ink-2 hover:bg-card">
                {t.cancel}
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-primary/40 py-3 text-sm font-bold text-primary hover:bg-primary/5"
          >
            <span className="text-lg leading-none">+</span>
            {t.add}
          </button>
        )}
      </aside>
    </div>
  );
}

function DhikrRow({ active, title, sub, target, count, onClick }: { active: boolean; title: string; sub?: string; target: string; count: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-start transition ${
        active ? "bg-primary text-white shadow" : "text-ink hover:bg-tint"
      }`}
    >
      <span className="min-w-0 flex-1">
        <span dir="auto" className="line-clamp-2 block text-[14.5px] leading-6 font-bold">
          {title}
        </span>
        {sub && (
          <span dir="rtl" lang="ar" className={`line-clamp-1 block text-[13px] ${active ? "text-white/80" : "text-ink-2"}`}>
            {sub}
          </span>
        )}
      </span>
      <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold tabular-nums ${active ? "bg-white/20" : "bg-tint text-primary"}`}>
        {count} / {target}
      </span>
    </button>
  );
}

function Toggle({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onClick}
      className={`rounded-full px-4 py-2.5 text-sm font-bold ring-1 transition ${on ? "bg-primary/10 text-primary ring-primary/40" : "text-ink-2 ring-line"}`}
    >
      {label}
    </button>
  );
}
