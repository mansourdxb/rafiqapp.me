import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Almarai, Noto_Sans_Arabic, Roboto } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { dir, isLocale, locales, ogLocale, SITE_URL, type Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { alternates } from "@/i18n/metadata";

const roboto = Roboto({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "700", "900"], variable: "--font-roboto", display: "swap" });
const almarai = Almarai({ subsets: ["arabic"], weight: ["300", "400", "700", "800"], variable: "--font-almarai", display: "swap" });
// Urdu / Persian letters Almarai lacks (ٹ ڈ ڑ ں ے ک ی …) fall back to Noto Sans Arabic.
const notoAr = Noto_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-noto-ar", display: "swap", preload: false });

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
};

// Light like the reference; dark only when the visitor picked it.
const THEME_SCRIPT = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  return (
    <html lang={l} dir={dir(l)} className={`${roboto.variable} ${almarai.variable} ${notoAr.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-dvh font-sans antialiased">
        <Navbar lang={l} />
        <main>{children}</main>
        <Footer lang={l} />
      </body>
    </html>
  );
}
