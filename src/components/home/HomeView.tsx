import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { localePath, type Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { home } from "@/i18n/messages/home";
import { localDigits } from "@/lib/digits";
import { STORES } from "@/lib/stores";
import { REVIEWS } from "@/data/reviews";
import { ContactForm } from "./ContactForm";
import { HeroArt } from "./HeroArt";
import { HeroSlider } from "./HeroSlider";
import { HomeArticles } from "./HomeArticles";
import { HomePrayer } from "./HomePrayer";

// app screens shown on each hero slide: [front, back]
const SLIDE_SHOTS: [string, string][] = [
  ["01", "07"],
  ["04", "03"],
  ["05", "06"],
  ["02", "08"],
];

const QIBLA_METHODS = [
  ["compass", "/images/ref/qibla-navigator.webp"],
  ["sunMoon", "/images/ref/qibla-sunMoon.webp"],
  ["shadow", "/images/ref/qibla-shadow.webp"],
  ["map", "/images/ref/qibla-map.webp"],
] as const;

const STAT_ICONS: IconName[] = ["quran", "hadith", "globe", "names"];

function Arrow() {
  return (
    <svg viewBox="0 0 24 12" className="h-3 w-5 rtl:-scale-x-100" fill="currentColor" aria-hidden>
      <path d="M0 5h20V1l4 5-4 5V7H0z" />
    </svg>
  );
}

export function HomeView({ lang }: { lang: Locale }) {
  const t = home[lang];
  const c = common[lang];
  const shot = (n: string) => `/screens/${lang}/${n}.webp`;
  const download = `${localePath(lang)}#download`;

  return (
    <>
      {/* hero slider */}
      <section id="download" className="relative scroll-mt-24 overflow-hidden bg-white pb-6 pt-8 lg:pt-14 dark:bg-canvas">
        <div className="mx-auto max-w-6xl px-4">
          <HeroSlider
            slides={t.hero.slides}
            getApp={t.hero.getApp}
            getAppHref={download}
            badges={<StoreBadges lang={lang} className="justify-center lg:justify-start" />}
            art={SLIDE_SHOTS.map(([f, b], k) => (
              <HeroArt key={k} front={shot(f)} back={shot(b)} alt={c.siteName} priority={k === 0} />
            ))}
          />
        </div>
      </section>

      {/* prayer times, with the books image at the page edge like the reference */}
      <div className="relative pb-6 pt-4">
        <Image src="/images/ref/books.webp" alt="" width={120} height={354} className="pointer-events-none absolute end-0 top-24 -z-0 hidden w-14 opacity-90 min-[1440px]:block" />
        <HomePrayer lang={lang} />
      </div>

      <HomeArticles lang={lang} recent={t.articles.recent} popular={t.articles.mostRead} viewMore={t.articles.viewMore} />

      {/* Qibla */}
      <section className="relative mt-16 overflow-hidden bg-[#1b1b1d] text-white">
        <Image src="/images/ref/qibla-bg.webp" alt="" fill sizes="100vw" className="object-cover object-[70%_50%] rtl:-scale-x-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent rtl:bg-gradient-to-l md:from-black/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h2 className="max-w-xl text-[26px] font-bold leading-snug sm:text-[30px]">
            {t.qibla.before}
            <span className="text-orange">{t.qibla.highlight}</span>
            {t.qibla.after}
          </h2>
          <ul className="mt-16 flex flex-wrap gap-3">
            {QIBLA_METHODS.map(([k, img]) => (
              <li key={k}>
                <Link href={`${localePath(lang, "/qibla/")}#${k}`} className="relative flex h-[52px] min-w-[74px] flex-col items-center justify-end rounded-lg bg-white px-3 pb-1.5 text-[11px] font-bold text-black shadow-lg transition hover:-translate-y-0.5">
                  <Image src={img} alt="" width={52} height={52} className="absolute -top-7 size-12 object-contain drop-shadow" />
                  {t.qibla.methods[k]}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={download} className="mt-14 inline-flex items-center gap-2 text-base font-bold text-white hover:text-orange">
            {t.hero.getApp}
            <Arrow />
          </Link>
          <StoreBadges lang={lang} className="mt-5" />
        </div>
      </section>

      {/* stars band + about */}
      <section className="relative bg-white dark:bg-canvas">
        <div className="h-[120px] bg-[url('/images/ref/stars-band.webp')] bg-[length:auto_120px] bg-top bg-repeat-x sm:h-[180px] sm:bg-[length:auto_180px]" aria-hidden />
        <div className="mx-auto max-w-6xl px-4 pb-16 text-center">
          <h2 className="text-[26px] font-bold text-section sm:text-[34px] dark:text-primary-light">{t.about.title}</h2>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-black dark:text-ink">{t.about.body}</p>
          <ul className="mt-12 grid grid-cols-2 gap-8 text-start md:grid-cols-4">
            {t.about.stats.map((s, i) => (
              <li key={s.label} className="flex items-start gap-4">
                <Icon name={STAT_ICONS[i]} className="size-10 shrink-0 text-primary" />
                <span>
                  <span className="block text-lg font-bold text-section dark:text-primary-light">{localDigits(lang, s.value)}</span>
                  <span className="block text-sm text-navy-2 dark:text-ink-2">{s.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* reviews + contact */}
      <section className="relative bg-navy pb-0 pt-16 text-white">
        <div className="absolute inset-0 bg-[url('/images/ref/reviews-bg.webp')] bg-cover bg-center opacity-90" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <h2 className="text-[34px] font-bold text-orange">{t.reviews.title}</h2>
              <p className="mt-3 text-lg leading-8">{t.reviews.body}</p>
            </div>
          </div>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <li key={r.name} className="flex min-h-[340px] flex-col rounded-xl bg-white p-10 text-navy-2 shadow-xl">
                <span className="text-sm tracking-widest text-orange" aria-label={`${r.rating}/5`}>
                  {"★".repeat(r.rating)}
                </span>
                <p className="mt-5 text-lg font-bold" dir="auto">
                  {r.title}
                </p>
                <p className="mt-2 text-lg leading-8" dir="auto">
                  {r.body}
                </p>
                <div className="mt-auto flex items-center gap-3 pt-6">
                  <Image src="/images/ref/ellipse_76-3x.webp" alt="" width={50} height={50} className="size-12 rounded-full" />
                  <span className="text-xs font-bold text-section" dir="auto">
                    {r.name}
                    <span className="block font-normal text-ink-2">{r.store}</span>
                  </span>
                </div>
              </li>
            ))}
            <li className="flex min-h-[340px] flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-white/30 p-10 text-center">
              <span className="text-2xl tracking-widest text-orange">★★★★★</span>
              <p className="text-lg font-bold">{t.reviews.write}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  ["App Store", `${STORES.appStore}?action=write-review`],
                  ["Google Play", STORES.googlePlay],
                  ["AppGallery", STORES.appGallery],
                ].map(([n, href]) => (
                  <a key={n} href={href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20">
                    {n}
                  </a>
                ))}
              </div>
            </li>
          </ul>

          <div id="contact" className="relative z-10 mx-auto mt-24 max-w-4xl translate-y-1/3 scroll-mt-24 rounded-md bg-white p-2.5 shadow-xl">
            <div className="grid items-center gap-6 rounded bg-primary px-8 py-10 md:grid-cols-[1fr_1.1fr]">
              <div>
                <h2 className="text-2xl font-bold">{t.contact.title}</h2>
                <p className="mt-2 text-xs leading-5 text-white/95">{t.contact.body}</p>
              </div>
              <ContactForm placeholder={t.contact.message} send={t.contact.send} siteName={c.siteName} />
            </div>
          </div>
        </div>
      </section>
      <div className="h-6 bg-white dark:bg-canvas" />
    </>
  );
}
