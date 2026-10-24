/**
 * Loose form of a string for searching in any of the site's languages: lower case, no diacritics or
 * tashkeel, one shape per Arabic-script letter (Arabic / Persian / Urdu forms of alef, ya, kaf, ha,
 * ta marbuta, hamza seats), Turkish dotless ı = i, Russian ё = е.
 */
export function searchFold(s = ""): string {
  return s
    .toLocaleLowerCase("en")
    .replace(/ı/g, "i")
    .replace(/ё/g, "е")
    .normalize("NFKD")
    .replace(/[̀-ͯؐ-ًؚ-ٰٟۖ-ۭـ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/[ىیےۍ]/g, "ي")
    .replace(/[ةۀہھۃ]/g, "ه")
    .replace(/ک/g, "ك")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x6f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660))
    .replace(/\s+/g, " ")
    .trim();
}
