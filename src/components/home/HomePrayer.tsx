import type { Locale } from "@/i18n/config";
import { PrayerStrip } from "@/components/prayer/PrayerStrip";

/** Today's prayer times on the hero, for the visitor's saved place. */
export function HomePrayer({ lang }: { lang: Locale }) {
  return <PrayerStrip lang={lang} />;
}
