// The strings the client components need, for one language (passed as props, so the browser
// bundle carries one language, not eight).
import type { Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { common } from "@/i18n/messages/common";
import { hadith } from "@/i18n/messages/hadith";

export function hadithLabels(lang: Locale) {
  const h = hadith[lang];
  const c = common[lang];
  return {
    source: appT(lang, "hadith.source"),
    book: appT(lang, "hadith.book"),
    hadithNumber: appT(lang, "hadith.hadithNumber"),
    copied: appT(lang, "hadith.copied"),
    saved: appT(lang, "hadith.saved"),
    removed: appT(lang, "hadith.removed"),
    showTranslation: appT(lang, "hadith.showTranslation"),
    fontSmaller: appT(lang, "hadith.fontSmaller"),
    fontLarger: appT(lang, "hadith.fontLarger"),
    shareHadith: appT(lang, "hadith.shareHadith"),
    booksTab: appT(lang, "hadithLib.booksTab"),
    favoritesTab: appT(lang, "hadithLib.favoritesTab"),
    searchTitle: appT(lang, "hadithSearch.title"),
    searchPlaceholder: appT(lang, "hadithSearch.searchPlaceholder"),
    searchAllBooks: appT(lang, "hadithSearch.searchAllBooks"),
    noResults: appT(lang, "hadithSearch.noResults"),
    tryOther: appT(lang, "hadithSearch.tryOther"),
    resultCount: appT(lang, "hadithSearch.resultCount"),
    hadithN: h.hadithN,
    minChars: h.minChars,
    searchLoading: h.searchLoading,
    searchHintEn: h.searchHintEn,
    noFavorites: h.noFavorites,
    addFavorite: h.addFavorite,
    removeFavorite: h.removeFavorite,
    copy: h.copy,
    share: h.share,
    showMore: h.showMore,
    shownOf: h.shownOf,
    noTranslation: h.noTranslation,
    shareVia: h.shareVia,
    loading: c.loading,
    error: c.error,
    retry: c.retry,
  };
}
export type HadithLabels = ReturnType<typeof hadithLabels>;
