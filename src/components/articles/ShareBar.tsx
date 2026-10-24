"use client";
// Share buttons: the system share sheet (Web Share API) when available, plus direct links and copy.
import { useState } from "react";
import { SITE_URL } from "@/i18n/config";

const BRANDS = {
  facebook: {
    name: "Facebook",
    bg: "#3B5998",
    d: "M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21z",
    url: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
  },
  whatsapp: {
    name: "WhatsApp",
    bg: "#25D366",
    d: "M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm4.4 12.4c-.2.5-1.1 1-1.6 1-.4.1-.9.1-1.5-.1-.3-.1-.8-.3-1.3-.5-2.3-1-3.8-3.3-3.9-3.5-.1-.1-.9-1.2-.9-2.3s.6-1.6.8-1.8c.2-.2.4-.3.6-.3h.4c.1 0 .3 0 .5.4l.7 1.6c.1.1.1.3 0 .4l-.2.4-.3.4c-.1.1-.2.3-.1.5.1.2.6 1 1.3 1.6.9.8 1.6 1 1.9 1.1.2.1.4.1.5-.1l.7-.9c.2-.2.3-.2.5-.1l1.5.7c.2.1.4.2.4.3.1.1.1.5-.1 1z",
    url: (u: string, t: string) => `https://wa.me/?text=${encodeURIComponent(`${t}\n${u}`)}`,
  },
  x: {
    name: "X",
    bg: "#000000",
    d: "M17.8 3.5h2.9l-6.4 7.3 7.5 9.7h-5.9l-4.6-6-5.3 6H3.1l6.8-7.8L2.7 3.5h6l4.2 5.5zm-1 15.3h1.6L7.3 5.1H5.6z",
    url: (u: string, t: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  },
  telegram: {
    name: "Telegram",
    bg: "#2AA3DD",
    d: "M20.7 4.3 2.9 11.2c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.8 5.4c.2.6.4.8.8.8s.6-.2.9-.5l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14.1c.3-1.2-.5-1.8-1.5-1.4zm-3.3 3.3-8 7.2-.3 3.3-1.6-4.8 9.4-5.9c.4-.3.8 0 .5.2z",
    url: (u: string, t: string) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}`,
  },
} as const;

type Labels = { share: string; shareOn: string; copyLink: string; copied: string };

function useShare(href: string, title: string, labels: Labels) {
  const url = `${SITE_URL}${href}`;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  const native = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, url });
      } catch {}
    } else copy();
  };
  return { url, copied, copy, native, labels };
}

const SHARE_ICON = "M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13";

const COPY_ICON = "M9 9h11v11H9zM5 15H4V4h11v1";
const round = "grid size-10 place-items-center rounded-full text-white transition hover:-translate-y-0.5 hover:opacity-90";

/** Full share row for the article page: round coloured icons, as in the reference. */
export function ShareBar({ href, title, labels }: { href: string; title: string; labels: Labels }) {
  const { url, copied, copy, native } = useShare(href, title, labels);
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {(Object.keys(BRANDS) as (keyof typeof BRANDS)[]).map((k) => {
        const b = BRANDS[k];
        const label = labels.shareOn.replace("{x}", b.name);
        return (
          <a key={k} href={b.url(url, title)} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={round} style={{ background: b.bg }}>
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
              <path d={b.d} />
            </svg>
          </a>
        );
      })}
      <button type="button" onClick={copy} aria-label={copied ? labels.copied : labels.copyLink} title={copied ? labels.copied : labels.copyLink} className={`${round} bg-section`}>
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d={copied ? "M5 12l5 5L20 7" : COPY_ICON} />
        </svg>
      </button>
      <button type="button" onClick={native} aria-label={labels.share} title={labels.share} className={`${round} bg-navy dark:bg-primary`}>
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d={SHARE_ICON} />
        </svg>
      </button>
      <span aria-live="polite" className="text-sm font-semibold text-primary">
        {copied ? labels.copied : ""}
      </span>
    </div>
  );
}

/** Small share button for cards: share sheet, or copy the link where there is none. */
export function ShareMini({ href, title, labels }: { href: string; title: string; labels: Labels }) {
  const { copied, native } = useShare(href, title, labels);
  return (
    <button
      type="button"
      onClick={native}
      aria-label={copied ? labels.copied : labels.share}
      title={copied ? labels.copied : labels.share}
      className="inline-flex h-8 items-center gap-1.5 rounded-full bg-navy px-3 text-xs font-semibold text-white transition hover:bg-section dark:bg-primary/90 dark:hover:bg-primary"
    >
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {copied ? <path d="M5 12l5 5L20 7" /> : <path d={SHARE_ICON} />}
      </svg>
      {copied ? labels.copied : labels.share}
    </button>
  );
}
