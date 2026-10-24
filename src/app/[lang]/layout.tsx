import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cairo, Inter } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { dir, isLocale, locales, ogLocale, SITE_URL, type Locale } from "@/i18n/config";
import { common } from "@/i18n/messages/common";
import { alternates } from "@/i18n/metadata";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });

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
  themeColor: "#0D245E",
  width: "device-width",
  initialScale: 1,
};

// Applies the saved (or system) dark mode before first paint.
const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const l = lang as Locale;
  return (
    <html lang={l} dir={dir(l)} className={`${cairo.variable} ${inter.variable}`} suppressHydrationWarning>
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
