import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { CONTACT_EMAIL } from "@/lib/stores";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { NAV } from "./nav";

export function Footer({ lang }: { lang: Locale }) {
  const t = common[lang];
  return (
    <footer className="mt-20 bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo-512.png" alt="" width={44} height={44} className="rounded-2xl" />
            <div>
              <p className="text-xl font-bold">{t.siteName}</p>
              <p className="text-sm text-white/65">{t.tagline}</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/70">{t.footer.about}</p>
          <StoreBadges lang={lang} className="mt-6" />
        </div>
        <div>
          <p className="mb-4 text-sm font-bold text-primary-light">{t.footer.services}</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-white/75">
            {NAV.map((n) => (
              <li key={n.key}>
                <Link href={localePath(lang, n.href)} className="hover:text-white">
                  {t.nav[n.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 text-sm font-bold text-primary-light">{t.nav.more}</p>
          <ul className="space-y-2.5 text-sm text-white/75">
            {(["articles", "imsakiya", "live", "faq"] as const).map((k) => (
              <li key={k}>
                <Link href={localePath(lang, `/${k}/`)} className="hover:text-white">
                  {t.nav[k]}
                </Link>
              </li>
            ))}
            <li>
              <a href="/privacy.html" className="hover:text-white">
                {t.footer.privacy}
              </a>
            </li>
            <li>
              <a href={`${localePath(lang)}#contact`} className="hover:text-white">
                {t.footer.contact}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white" dir="ltr">
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/55">
        © {new Date().getFullYear()} {t.siteName} — {t.footer.rights}
      </div>
    </footer>
  );
}
