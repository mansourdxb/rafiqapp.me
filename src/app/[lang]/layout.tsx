import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Almarai, Noto_Sans, Noto_Sans_Arabic, Noto_Sans_Bengali, Noto_Sans_Devanagari, Noto_Sans_Ethiopic, Noto_Sans_Gujarati, Noto_Sans_Gurmukhi, Noto_Sans_Malayalam, Noto_Sans_Myanmar, Noto_Sans_Tamil, Roboto } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PlayerRoot } from "@/components/player/PlayerRoot";
import { DownloadPrompt } from "@/components/layout/DownloadPrompt";
import { dir, isLocale, langTag, locales, SITE_URL, type Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { alternates, social } from "@/i18n/metadata";
import { siteJsonLd } from "@/lib/jsonld";

const roboto = Roboto({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "700", "900"], variable: "--font-roboto", display: "swap" });
// Uzbek Cyrillic letters ғ қ ҳ are in Roboto's cyrillic-ext subset (used only on uz-Cyrl pages, globals.css).
const robotoCyrExt = Roboto({ subsets: ["cyrillic-ext"], weight: ["400", "500", "700", "900"], variable: "--font-roboto-cyrext", display: "swap", preload: false });
const almarai = Almarai({ subsets: ["arabic"], weight: ["300", "400", "700", "800"], variable: "--font-almarai", display: "swap" });
// Urdu / Persian letters Almarai lacks (ٹ ڈ ڑ ں ے ک ی …) fall back to Noto Sans Arabic.
const notoAr = Noto_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-noto-ar", display: "swap", preload: false });
// Hindi (Devanagari) — Roboto has no Devanagari letters.
const notoDeva = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["400", "500", "700", "900"], variable: "--font-noto-deva", display: "swap", preload: false });
// Bengali (Bengali script) — Roboto has no Bengali letters.
const notoBeng = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "700", "900"], variable: "--font-noto-beng", display: "swap", preload: false });
// Punjabi in Gurmukhi — Roboto has no Gurmukhi letters (used only on Gurmukhi pages, globals.css).
const notoGuru = Noto_Sans_Gurmukhi({ subsets: ["gurmukhi"], weight: ["400", "500", "700", "900"], variable: "--font-noto-guru", display: "swap", preload: false });
// Malayalam — Roboto has no Malayalam letters (used only on Malayalam pages, globals.css).
const notoMlym = Noto_Sans_Malayalam({ subsets: ["malayalam"], weight: ["400", "500", "700", "900"], variable: "--font-noto-mlym", display: "swap", preload: false });
// Amharic (Ethiopic), Tamil, Gujarati, Burmese (Myanmar) — Roboto has none of these scripts (used only on their own pages, globals.css).
const notoEthi = Noto_Sans_Ethiopic({ subsets: ["ethiopic"], weight: ["400", "500", "700", "900"], variable: "--font-noto-ethi", display: "swap", preload: false });
const notoTaml = Noto_Sans_Tamil({ subsets: ["tamil"], weight: ["400", "500", "700", "900"], variable: "--font-noto-taml", display: "swap", preload: false });
const notoGujr = Noto_Sans_Gujarati({ subsets: ["gujarati"], weight: ["400", "500", "700", "900"], variable: "--font-noto-gujr", display: "swap", preload: false });
const notoMymr = Noto_Sans_Myanmar({ subsets: ["myanmar"], weight: ["400", "500", "700", "900"], variable: "--font-noto-mymr", display: "swap", preload: false });
// Hausa — Roboto has no hooked letters (ɓ ɗ ƙ ƴ), so Hausa pages are set in Noto Sans, which has them.
const notoLatin = Noto_Sans({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "700", "900"], variable: "--font-noto-latin", display: "swap", preload: false });

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = common[lang];
  const title = `${t.siteName} — ${t.tagline}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${t.siteName}` },
    description: t.description,
    alternates: alternates(lang, "/"),
    ...social(lang, "/", title, t.description),
    icons: { icon: "/logo.png", apple: "/logo.png" },
    manifest: "/manifest.webmanifest",
    other: { "apple-itunes-app": "app-id=6759387456" },
  };
}

export const viewport: Viewport = {
  themeColor: "#0F1C50",
  width: "device-width",
  initialScale: 1,
  // lets the player bar sit above the iPhone home indicator (env(safe-area-inset-bottom))
  viewportFit: "cover",
};

// Always https (phones only allow location on secure pages; the domain also answers on http).
// Light like the reference; dark only when the visitor picked it.
const THEME_SCRIPT = `if(location.protocol==="http:"&&!/^(localhost|127\\.|192\\.168\\.)/.test(location.hostname))location.replace("https://"+location.host+location.pathname+location.search+location.hash);try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  return (
    <html lang={langTag(l)} dir={dir(l)} className={`${roboto.variable} ${robotoCyrExt.variable} ${almarai.variable} ${notoAr.variable} ${notoDeva.variable} ${notoBeng.variable} ${notoGuru.variable} ${notoMlym.variable} ${notoEthi.variable} ${notoTaml.variable} ${notoGujr.variable} ${notoMymr.variable} ${notoLatin.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
      </head>
      <body className="min-h-dvh font-sans antialiased">
        <PlayerRoot lang={l}>
          <Navbar lang={l} />
          <main>{children}</main>
          <Footer lang={l} />
          <DownloadPrompt lang={l} />
        </PlayerRoot>
      </body>
    </html>
  );
}
