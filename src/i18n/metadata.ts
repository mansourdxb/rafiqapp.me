import { hreflangTag, locales, localePath, ogLocale, SITE_URL, type Locale } from "./config";
import { common } from "./messages/common";

/** canonical + hreflang links for one page (`path` relative to the language root). The home pages' x-default is the
 * site root, which picks the visitor's language (public/index.html); other pages fall back to Arabic, as the root does. */
export function alternates(lang: Locale, path: string) {
  const home = localePath("ar", path) === "/ar/";
  return {
    canonical: `${SITE_URL}${localePath(lang, path)}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [hreflangTag(l), `${SITE_URL}${localePath(l, path)}`])),
      "x-default": home ? `${SITE_URL}/` : `${SITE_URL}${localePath("ar", path)}`,
    },
  };
}

/** Open Graph + Twitter card for one page, so shared links show the page's own title and URL. */
export function social(lang: Locale, path: string, title: string, description?: string, extra: { type?: "website" | "article"; section?: string } = {}) {
  const images = [{ url: "/og-image.png", width: 1200, height: 630 }];
  return {
    openGraph: {
      title,
      description,
      type: extra.type ?? "website",
      ...(extra.section ? { section: extra.section } : {}),
      url: `${SITE_URL}${localePath(lang, path)}`,
      locale: ogLocale[lang],
      siteName: common[lang].siteName,
      images,
    },
    twitter: { card: "summary_large_image" as const, title, description, images: ["/og-image.png"] },
  };
}
