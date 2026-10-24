import { localePath, type Locale } from "@/i18n/config";

/**
 * Address of a chapter. One chapter page per language reads `?b=&c=`: a static page per chapter in
 * 8 languages would push the site past GitHub Pages' 1 GB limit.
 */
export const chapterHref = (lang: Locale, book: string, chapter: number | string, n?: number) =>
  `${localePath(lang, "/hadith/read/")}?b=${book}&c=${chapter}${n ? `#h${n}` : ""}`;
