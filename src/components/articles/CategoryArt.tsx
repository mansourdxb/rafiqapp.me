// Category artwork in the app's colours: a gradient with a faint eight-point-star pattern and a line icon.
import type { CategoryId } from "@/i18n/messages/articles";

export const CATEGORY_STYLE: Record<CategoryId, { from: string; to: string; icon: string }> = {
  seerah: {
    from: "#0D245E",
    to: "#12608F",
    icon: "M4 20h16M6 20v-6a6 6 0 0 1 12 0v6M12 3v3M9 20v-3a3 3 0 0 1 6 0v3",
  },
  prophets: {
    from: "#12608F",
    to: "#029CCD",
    icon: "M12 6.5C10 5 7 4.5 3 5v13c4-.5 7 0 9 1.5 2-1.5 5-2 9-1.5V5c-4-.5-7 0-9 1.5zM12 6.5V19",
  },
  fiqh: {
    from: "#16603F",
    to: "#2E9A63",
    icon: "M3 9l9-5 9 5M4 9h16M6 9v9M10 9v9M14 9v9M18 9v9M3 20.5h18",
  },
  hajj: {
    from: "#7A5512",
    to: "#E8B84B",
    icon: "M4 8l8-4 8 4v9l-8 4-8-4zM4 8l8 4 8-4M12 12v9M4 11.5l8 4 8-4",
  },
  prayer: {
    from: "#1E93C9",
    to: "#29ABE2",
    icon: "M5 21V10a7 7 0 0 1 14 0v11M3 21h18M9 21v-6a3 3 0 0 1 6 0v6M12 3V1.5",
  },
  duas: {
    from: "#5B3399",
    to: "#9C5BD4",
    icon: "M7 21v-5l-3-4V7a1.5 1.5 0 0 1 3 0v4l3 3M17 21v-5l3-4V7a1.5 1.5 0 0 0-3 0v4l-3 3M12 3v3M9 4.5l1.2 1.6M15 4.5l-1.2 1.6",
  },
  ruqyah: {
    from: "#0B6B6A",
    to: "#23A9A3",
    icon: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4",
  },
  tajweed: {
    from: "#D9600F",
    to: "#F7A04D",
    icon: "M3 12h1.5M7 9v6M11 5v14M15 8v8M19 10.5v3M21 12h.5",
  },
};

// One eight-point star (two overlapping squares), tiled.
const PATTERN = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56"><g fill="none" stroke="#fff" stroke-opacity=".14" stroke-width="1.2"><rect x="16" y="16" width="24" height="24"/><rect x="16" y="16" width="24" height="24" transform="rotate(45 28 28)"/><circle cx="28" cy="28" r="5"/></g></svg>',
)}")`;

export function categoryBackground(cat: CategoryId) {
  const s = CATEGORY_STYLE[cat];
  return { backgroundImage: `${PATTERN}, linear-gradient(135deg, ${s.from}, ${s.to})` };
}

export function CategoryIcon({ cat, className = "size-6" }: { cat: CategoryId; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d={CATEGORY_STYLE[cat].icon} />
    </svg>
  );
}

/** The cover art used on cards and headers. */
export function CategoryCover({ cat, className = "", iconClass = "size-14" }: { cat: CategoryId; className?: string; iconClass?: string }) {
  return (
    <div className={`relative grid place-items-center overflow-hidden text-white ${className}`} style={categoryBackground(cat)} aria-hidden>
      <div className="absolute -end-10 -top-10 size-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-14 -start-8 size-36 rounded-full bg-black/10" />
      <div className="relative grid place-items-center rounded-full bg-white/15 p-5 ring-1 ring-white/25 backdrop-blur-sm">
        <CategoryIcon cat={cat} className={iconClass} />
      </div>
    </div>
  );
}
