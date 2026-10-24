import { localePath, type Locale } from "@/i18n/config";

/**
 * Reader address for a mushaf page. One reader page per language reads `?p=`: 604 static pages × 8
 * languages would push the site past GitHub Pages' 1 GB limit.
 */
export const quranPageHref = (lang: Locale, p: number) => `${localePath(lang, "/quran/read/")}?p=${p}`;
