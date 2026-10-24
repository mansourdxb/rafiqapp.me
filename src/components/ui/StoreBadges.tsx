import { STORES } from "@/lib/stores";
import type { Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";

const APPLE = "M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.6 1.3-.1 1.7-.8 3.3-.8 1.5 0 1.9.8 3.3.8 1.4 0 2.2-1.2 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.5-4.1zM13.9 5c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z";
const PLAY = "M3.6 2.2c-.3.3-.4.7-.4 1.2v17.2c0 .5.1.9.4 1.2l9.6-9.8zM16.4 15.2l-3.2-3.2 3.2-3.2 3.7 2.1c1.1.6 1.1 1.6 0 2.2zM15.6 8.2L5 2.1c-.5-.3-1-.3-1.3-.1l9.6 9.8zM15.6 15.8l-2.3-2.3-9.6 9.8c.3.2.8.2 1.3-.1z";
const HUAWEI = "M12 4.5c-1.6 1.4-2.2 3.8-1 6.3l1 2 1-2c1.2-2.5.6-4.9-1-6.3zM4.8 7.4c-.6 2 .3 4.3 2.6 5.8l1.9 1.1-.6-2.1c-.8-2.7-2.3-4.2-3.9-4.8zM19.2 7.4c-1.6.6-3.1 2.1-3.9 4.8l-.6 2.1 1.9-1.1c2.3-1.5 3.2-3.8 2.6-5.8zM3 13c.2 1.8 2 3.4 4.6 3.6h2.2l-1.8-1.3C6.3 14 4.6 13.2 3 13zM21 13c-1.6.2-3.3 1-5 2.3l-1.8 1.3h2.2c2.6-.2 4.4-1.8 4.6-3.6z";

export function StoreBadges({ lang, className = "" }: { lang: Locale; className?: string }) {
  const t = common[lang];
  const items = [
    { href: STORES.appStore, path: APPLE, small: t.downloadOn, big: t.appStore },
    { href: STORES.googlePlay, path: PLAY, small: t.getItOn, big: t.googlePlay },
    { href: STORES.appGallery, path: HUAWEI, small: t.exploreOn, big: t.appGallery },
  ];
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((s) => (
        <a
          key={s.big}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 items-center gap-2 rounded-md bg-white px-2.5 text-black ring-1 ring-black/60 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="currentColor" aria-hidden>
            <path d={s.path} />
          </svg>
          <span className="flex flex-col leading-none">
            <span className="text-[9px] uppercase">{s.small}</span>
            <span className="text-[17px] font-semibold tracking-tight" dir="ltr">
              {s.big}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}
