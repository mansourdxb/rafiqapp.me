import { langTag, locales, localePath, SITE_URL, type Locale } from "./config";

/** canonical + hreflang links for one page (`path` relative to the language root). */
export function alternates(lang: Locale, path: string) {
  return {
    canonical: `${SITE_URL}${localePath(lang, path)}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [langTag(l), `${SITE_URL}${localePath(l, path)}`])),
      "x-default": `${SITE_URL}${localePath("ar", path)}`,
    },
  };
}
