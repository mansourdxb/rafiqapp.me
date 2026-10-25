import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Almarai, Noto_Sans_Arabic, Noto_Sans_Bengali, Noto_Sans_Devanagari, Roboto } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PlayerRoot } from "@/components/player/PlayerRoot";
import { DownloadPrompt } from "@/components/layout/DownloadPrompt";
import { dir, isLocale, locales, ogLocale, SITE_URL, type Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { alternates } from "@/i18n/metadata";

const roboto = Roboto({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "700", "900"], variable: "--font-roboto", display: "swap" });
const almarai = Almarai({ subsets: ["arabic"], weight: ["300", "400", "700", "800"], variable: "--font-almarai", display: "swap" });
// Urdu / Persian letters Almarai lacks (ٹ ڈ ڑ ں ے ک ی …) fall back to Noto Sans Arabic.
const notoAr = Noto_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-noto-ar", display: "swap", preload: false });
// Hindi (Devanagari) — Roboto has no Devanagari letters.
const notoDeva = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["400", "500", "700", "900"], variable: "--font-noto-deva", display: "swap", preload: false });
// Bengali (Bengali script) — Roboto has no Bengali letters.
const notoBeng = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "700", "900"], variable: "--font-noto-beng", display: "swap", preload: false });

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
    openGraph: {
      title,
      description: t.description,
      type: "website",
      locale: ogLocale[lang],
      siteName: t.siteName,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description: t.description, images: ["/og-image.png"] },
    icons: { icon: "/logo.png", apple: "/logo.png" },
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
    <html lang={l} dir={dir(l)} className={`${roboto.variable} ${almarai.variable} ${notoAr.variable} ${notoDeva.variable} ${notoBeng.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
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
