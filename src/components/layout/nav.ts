import type { IconName } from "@/components/ui/Icon";
import type { Common } from "@/i18n/messages/common";

export type NavItem = { key: keyof Common["nav"]; href: string; icon: IconName };

/** Main sections, in menu order. `href` is relative to the language root. */
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
