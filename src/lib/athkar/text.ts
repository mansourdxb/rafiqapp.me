// Arabic text helpers, same rules as the app's HisnCategoryScreen.

/** Cairo has no Qur'an-annotation marks: map the Qur'anic sukun to the normal one and drop the
 *  marks it cannot draw, so the line stays connected (app: cleanZikr). */
export const cleanZikr = (s = "") => s.replace(/ۡ/g, "ْ").replace(/[ؐ-ؔؖ-ؚۖ-۠ۢ-ۭ]/g, "");

/** Removes tashkeel when the reader turns diacritics off (app: stripTashkeel). */
export const stripTashkeel = (s = "") => s.replace(/[ً-ْٰـ]/g, "");

/** Loose form for search: no diacritics, unified alef/ya/ta marbuta, lower case. */
export const normalize = (s = "") =>
  stripTashkeel(s)
    .replace(/[ؐ-ؚۖ-ۭ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .toLowerCase()
    .trim();
