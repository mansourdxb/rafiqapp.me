"use client";
// Favourite toggle, kept in this browser only (localStorage).
import { useSyncExternalStore } from "react";

const KEY = "fav-articles";
const EVENT = "fav-articles-change";

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function FavButton({ id, addLabel, removeLabel, className = "" }: { id: string; addLabel: string; removeLabel: string; className?: string }) {
  const on = useSyncExternalStore(
    subscribe,
    () => read().includes(id),
    () => false,
  );
  const toggle = () => {
    const list = read().filter((x) => x !== id);
    if (!on) list.push(id);
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch {}
    window.dispatchEvent(new Event(EVENT));
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? removeLabel : addLabel}
      title={on ? removeLabel : addLabel}
      className={`grid size-9 place-items-center rounded-full transition hover:bg-tint ${on ? "text-orange" : "text-ink-2 hover:text-orange"} ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round" aria-hidden>
        <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />
      </svg>
    </button>
  );
}
