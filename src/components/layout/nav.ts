import type { IconName } from "@/components/ui/Icon";
import type { Common } from "@/i18n/messages/common";

export type NavItem = { key: keyof Common["nav"]; href: string; icon: IconName };

/** Services that work on the site, in menu order. `href` is relative to the language root. */
export const NAV: NavItem[] = [
  { key: "quran", href: "/quran/", icon: "quran" },
  { key: "hadith", href: "/hadith/", icon: "hadith" },
  { key: "athkar", href: "/athkar/", icon: "athkar" },
  { key: "prayer", href: "/prayer-times/", icon: "prayer" },
  { key: "qibla", href: "/qibla/", icon: "qibla" },
  { key: "tasbeeh", href: "/tasbeeh/", icon: "tasbeeh" },
  { key: "names", href: "/names/", icon: "names" },
  { key: "calendar", href: "/calendar/", icon: "calendar" },
];

/** Shown in the header bar; the rest go under "More". */
export const NAV_MAIN: NavItem[] = [
  NAV[0],
  NAV[1],
  NAV[2],
  NAV[3],
  { key: "articles", href: "/articles/", icon: "bookmark" },
];

export const NAV_MORE: NavItem[] = [
  { key: "listen", href: "/quran/listen/", icon: "play" },
  NAV[4],
  NAV[5],
  NAV[6],
  NAV[7],
  { key: "imsakiya", href: "/imsakiya/", icon: "moon" },
  { key: "live", href: "/live/", icon: "play" },
  { key: "faq", href: "/faq/", icon: "search" },
];
