import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { IslamicBand, StarPattern } from "@/components/ui/IslamicBand";
import { Phone } from "@/components/ui/Phone";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { NAV } from "@/components/layout/nav";
import { localePath, type Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { home } from "@/i18n/messages/home";
import { localDigits } from "@/lib/digits";
import { STORES } from "@/lib/stores";
import { REVIEWS } from "@/data/reviews";
import { ContactForm } from "./ContactForm";
import { HomePrayer } from "./HomePrayer";
import { HomeArticles } from "./HomeArticles";

export function HomeView({ lang }: { lang: Locale }) {
  const t = home[lang];
  const c = common[lang];
  const shot = (n: string) => `/screens/${lang}/${n}.webp`;

  return (
    <>
      {/* Hero: headline, stores, phone, and today's prayer times for the visitor's place */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Image src="/images/hero-mosque.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/60 to-navy" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-10 pt-12 md:grid-cols-[1.25fr_1fr] md:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold ring-1 ring-white/15">
              <span className="size-2 rounded-full bg-orange" />
              {c.footer.free}
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{t.hero.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/80 sm:text-lg">{t.hero.subtitle}</p>
            <Link href="#download" className="mt-7 inline-flex items-center gap-2 font-bold text-white hover:text-orange">
              {t.hero.getApp}
              <Icon name="chevron" flip className="size-4" />
            </Link>
            <StoreBadges lang={lang} className="mt-4" />
          </div>
          <div className="relative mx-auto hidden w-60 md:block lg:w-64">
            <div className="absolute -inset-10 rounded-full bg-primary/30 blur-3xl" />
            <Phone src={shot("01")} alt={c.siteName} priority className="relative rotate-[-3deg]" />
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pb-12">
          <HomePrayer lang={lang} />
        </div>
      </section>
      <IslamicBand />

      {/* Services that work on the site */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-center text-3xl font-extrabold text-section dark:text-primary-light">{t.services.title}</h2>
        <p className="mt-3 text-center text-ink-2">{t.services.subtitle}</p>
        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {NAV.map((n) => (
            <li key={n.key}>
              <Link
                href={localePath(lang, n.href)}
                className="group flex h-full flex-col rounded-3xl bg-card p-5 shadow-sm ring-1 ring-line transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-tint text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon name={n.icon as IconName} className="size-6" />
                </span>
                <span className="mt-4 text-lg font-bold">{c.nav[n.key]}</span>
                <span className="mt-1.5 hidden text-sm leading-6 text-ink-2 sm:block">{t.services.items[n.key as keyof typeof t.services.items]}</span>
                <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-bold text-primary">
                  {t.services.open}
                  <Icon name="chevron" flip className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <HomeArticles lang={lang} title={t.articles.title} viewMore={t.articles.viewMore} />

      {/* Qibla */}
      <section className="relative overflow-hidden bg-black text-white">
        <Image src="/images/kaaba.webp" alt="" fill sizes="100vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-linear-to-r rtl:bg-linear-to-l from-black/85 via-black/55 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <h2 className="max-w-2xl text-3xl font-extrabold leading-snug sm:text-4xl">
            {t.qibla.before}
            <span className="text-orange">{t.qibla.highlight}</span>
            {t.qibla.after}
          </h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {(
              [
                ["compass", "qibla"],
                ["sunMoon", "sun"],
                ["shadow", "moon"],
                ["map", "location"],
              ] as const
            ).map(([k, icon]) => (
              <li key={k}>
                <Link
                  href={`${localePath(lang, "/qibla/")}#${k}`}
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/20 backdrop-blur hover:bg-white/20"
                >
                  <Icon name={icon} className="size-4.5 text-primary-light" />
                  {t.qibla.methods[k]}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={localePath(lang, "/qibla/")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold hover:bg-primary-deep"
          >
            {t.qibla.open}
            <Icon name="chevron" flip className="size-4" />
          </Link>
          <StoreBadges lang={lang} className="mt-8" />
        </div>
      </section>
      <IslamicBand />

      {/* About + numbers */}
      <section className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-section dark:text-primary-light">{t.about.title}</h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-ink-2">{t.about.body}</p>
        <ul className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {(
            [
              [604, t.about.stats.pages, "quran"],
              [9, t.about.stats.books, "hadith"],
              [8, t.about.stats.languages, "globe"],
              [0, t.about.stats.ads, "names"],
            ] as const
          ).map(([n, label, icon]) => (
            <li key={label} className="flex flex-col items-center gap-2">
              <Icon name={icon} className="size-9 text-primary" />
              <span className="text-3xl font-extrabold text-section dark:text-primary-light">{localDigits(lang, n)}</span>
              <span className="text-sm text-ink-2">{label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* App showcase */}
      <section className="bg-card py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-extrabold text-section dark:text-primary-light">{t.showcase.title}</h2>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.showcase.items.map((it, i) => (
              <li key={it.title} className="flex flex-col items-center text-center">
                <Phone src={shot(["05", "07", "04", "02"][i])} alt={it.title} className="w-48" />
                <h3 className="mt-6 text-lg font-bold">{it.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-2">{it.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews (real store reviews only) */}
      <section className="relative overflow-hidden bg-navy py-16 text-white">
        <StarPattern className="text-white/[0.06]" />
        <div className="relative mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-extrabold text-orange">{t.reviews.title}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-white/80">{t.reviews.body}</p>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <li key={r.name} className="flex flex-col rounded-3xl bg-white p-6 text-ink shadow-xl dark:bg-card">
                <span className="text-orange" aria-label={`${r.rating}/5`}>
                  {"★".repeat(r.rating)}
                </span>
                <p className="mt-3 font-bold" dir="auto">
                  {r.title}
                </p>
                <p className="mt-1 leading-7 text-ink-2" dir="auto">
                  {r.body}
                </p>
                <p className="mt-auto pt-5 text-sm font-semibold" dir="auto">
                  {r.name} <span className="font-normal text-ink-2">· {r.store}</span>
                </p>
              </li>
            ))}
            <li className="flex flex-col justify-center gap-3 rounded-3xl border-2 border-dashed border-white/25 p-6">
              <p className="text-lg font-bold">{t.reviews.write}</p>
              <div className="flex flex-wrap gap-2">
                <a href={`${STORES.appStore}?action=write-review`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">
                  App Store
                </a>
                <a href={STORES.googlePlay} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">
                  Google Play
                </a>
                <a href={STORES.appGallery} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">
                  AppGallery
                </a>
              </div>
            </li>
          </ul>

          {/* Contact */}
          <div id="contact" className="mt-16 grid gap-8 rounded-[2rem] bg-primary p-7 shadow-2xl md:grid-cols-[1fr_1.4fr] md:p-10">
            <div>
              <h2 className="text-3xl font-extrabold">{t.contact.title}</h2>
              <p className="mt-3 leading-7 text-white/90">{t.contact.body}</p>
            </div>
            <ContactForm labels={t.contact} siteName={c.siteName} />
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="download" className="mx-auto max-w-7xl scroll-mt-20 px-4 pt-16">
        <div className="relative grid items-center gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-section p-8 text-white md:grid-cols-[1.3fr_1fr] md:p-12">
          <StarPattern className="text-white/[0.07]" />
          <div className="relative">
            <div className="flex items-center gap-4">
              <Image src="/logo-512.png" alt={c.siteName} width={72} height={72} className="rounded-2xl shadow-lg" />
              <div>
                <h2 className="text-2xl font-extrabold sm:text-3xl">{t.download.title}</h2>
                <p className="mt-1 text-sm text-white/80" dir="ltr">
                  {t.download.platforms}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-lg leading-7 text-white/90">{t.download.body}</p>
            <StoreBadges lang={lang} className="mt-6" />
          </div>
          <div className="relative mx-auto hidden w-48 md:block">
            <Phone src={shot("03")} alt={c.siteName} className="rotate-[4deg]" />
          </div>
        </div>
      </section>
    </>
  );
}
