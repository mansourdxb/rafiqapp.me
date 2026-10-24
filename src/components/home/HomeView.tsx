import type { Locale } from "@/i18n/config";
export function HomeView({ lang }: { lang: Locale }) {
  return <div className="p-10">home {lang}</div>;
}
