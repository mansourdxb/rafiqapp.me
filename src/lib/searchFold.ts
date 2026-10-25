/**
 * Loose form of a string for searching in any of the site's languages: lower case, no diacritics or
 * tashkeel, one shape per Arabic-script letter (Arabic / Persian / Urdu forms of alef, ya, kaf, ha,
 * ta marbuta, hamza seats), Turkish dotless ı = i, Russian ё = е, Hindi with or without nuqta (क़ = क),
 * Bengali as the app folds it (য় = য, ড় = ড, ঢ় = ঢ, no chandrabindu, ী = ি, ূ = ু),
 * Hausa hooked letters as plain ones (ɓ = b, ɗ = d, ƙ = k, ƴ = y) and no apostrophes (Qur'ani = Qurani).
 */
export function searchFold(s = ""): string {
  return s
    .toLocaleLowerCase("en")
    .replace(/ı/g, "i")
    .replace(/ё/g, "е")
    .replace(/ɓ/g, "b")
    .replace(/ɗ/g, "d")
    .replace(/ƙ/g, "k")
    .replace(/ƴ/g, "y")
    .replace(/['‘’ʼ]/g, "")
    .normalize("NFKD")
    .replace(/[̀-ͯؐ-ًؚ-ٰٟۖ-ۭـ]/g, "")
    .replace(/\u093C/g, "")
    .replace(/[\u09BC\u0981\u200C\u200D]/g, "")
    .replace(/\u09C0/g, "\u09BF")
    .replace(/\u09C2/g, "\u09C1")
    .replace(/\u0988/g, "\u0987")
    .replace(/\u098A/g, "\u0989")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/[ىیےۍ]/g, "ي")
    .replace(/[ةۀہھۃ]/g, "ه")
    .replace(/ک/g, "ك")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x6f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x660))
    .replace(/[০-৯]/g, (d) => String(d.charCodeAt(0) - 0x9e6))
    .replace(/\s+/g, " ")
    .trim();
}
