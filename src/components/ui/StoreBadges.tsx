import { STORES } from "@/lib/stores";
import type { Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";

// Store logos live in /images/stores/*.svg and the badge look in `.store-badge` (globals.css), so the
// badges that appear on every page (footer, download prompt) add only a few bytes of markup per page.
export function StoreBadges({ lang, className = "" }: { lang: Locale; className?: string }) {
  const t = common[lang];
  const items = [
    { href: STORES.appStore, icon: "apple", small: t.downloadOn, big: t.appStore },
    { href: STORES.googlePlay, icon: "google-play", small: t.getItOn, big: t.googlePlay },
    { href: STORES.appGallery, icon: "appgallery", small: t.exploreOn, big: t.appGallery },
  ];
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((s) => (
        <a key={s.big} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.small} ${s.big}`} className="store-badge">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/stores/${s.icon}.svg`} alt="" width={28} height={28} />
          <span>
            <small>{s.small}</small>
            <b dir="ltr">{s.big}</b>
          </span>
        </a>
      ))}
    </div>
  );
}
