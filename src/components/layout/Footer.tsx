import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { home } from "@/i18n/messages/home";
import { CATEGORY_IDS, categoryName, categoryPath } from "@/lib/articles";
import { CONTACT_EMAIL } from "@/lib/stores";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { NAV } from "./nav";

export function Footer({ lang }: { lang: Locale }) {
  const t = common[lang];
  const head = "mb-4 text-sm font-bold text-section dark:text-primary-light";
  const item = "text-[13px] text-navy-2 hover:text-primary dark:text-ink-2";
  return (
    <footer className="mt-20 bg-white dark:bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-start gap-4">
            <Image src="/logo-512.png" alt="" width={56} height={56} className="rounded-xl" />
            <div>
              <p className="text-xl font-extrabold text-section dark:text-primary-light">{t.siteName}</p>
              <p className="mt-1 text-navy-2 dark:text-ink">{home[lang].strip.tagline}</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-[13px] leading-6 text-section dark:text-ink-2">{t.footer.about}</p>
          <p className="mt-6 font-bold text-navy-2 dark:text-ink">{t.getAppNow}</p>
          <StoreBadges lang={lang} className="mt-4" />
        </div>
        <div>
          <p className={head}>{t.footer.features}</p>
          <ul className="space-y-2.5">
            {NAV.map((n) => (
              <li key={n.key}>
                <Link href={localePath(lang, n.href)} className={item}>
                  {t.nav[n.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={head}>{t.footer.categories}</p>
          <ul className="space-y-2.5">
            {CATEGORY_IDS.map((c) => (
              <li key={c}>
                <Link href={categoryPath(lang, c)} className={item}>
                  {categoryName(lang, c)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={head}>{t.nav.home}</p>
          <ul className="space-y-2.5">
            {(["articles", "imsakiya", "live", "faq"] as const).map((k) => (
              <li key={k}>
                <Link href={localePath(lang, `/${k}/`)} className={item}>
                  {t.nav[k]}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`${localePath(lang)}#contact`} className={item}>
                {t.footer.contact}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className={head}>{t.footer.contact}</p>
          <ul className="space-y-2.5">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className={item} dir="ltr">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li className={item}>
              {t.footer.website}:{" "}
              <a href="https://rafiqapp.me" className="hover:text-primary" dir="ltr">
                rafiqapp.me
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-orange text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-[15px] font-bold">
          <p>
            © {new Date().getFullYear()} {t.siteName} — {t.footer.rights}
          </p>
          <a href="/privacy.html" className="hover:underline">
            {t.footer.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
