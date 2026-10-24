// Player icons (24×24). Filled shapes for the transport buttons, line icons for the rest.
const LINE = {
  repeat: "M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3",
  up: "M6 15l6-6 6 6",
  down: "M6 9l6 6 6-6",
  close: "M6 6l12 12M18 6L6 18",
  playFrom: "M3 6h11M3 12h11M3 18h7M16 13v8l6-4z",
  star: "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  back: "M15 6l-6 6 6 6",
  wave: "M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10M21 12h0",
  headphones: "M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z",
} as const;
const FILL = {
  play: "M8 5.1v13.8a1 1 0 0 0 1.5.9l11-6.9a1 1 0 0 0 0-1.7l-11-6.9A1 1 0 0 0 8 5.1z",
  pause: "M6 4h4v16H6zM14 4h4v16h-4z",
  next: "M5 5.5v13a1 1 0 0 0 1.6.8L15 13v6h3V5h-3v6L6.6 4.7A1 1 0 0 0 5 5.5z",
  prev: "M19 5.5v13a1 1 0 0 1-1.6.8L9 13v6H6V5h3v6l8.4-6.3a1 1 0 0 1 1.6.8z",
  starOn: "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z",
} as const;

export type PIconName = keyof typeof LINE | keyof typeof FILL;

export function PIcon({ name, className = "size-5" }: { name: PIconName; className?: string }) {
  if (name in FILL)
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
        <path d={FILL[name as keyof typeof FILL]} />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d={LINE[name as keyof typeof LINE]} />
    </svg>
  );
}

/** Spinning ring shown while an ayah loads. */
export function Spinner({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={`${className} animate-spin`}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
