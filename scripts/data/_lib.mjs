import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export const LOCALES = ["ar", "en", "ur", "fa", "ru", "tr", "id", "ms", "hi", "bn"];

export function readJson(p) {
  return JSON.parse(readFileSync(p, "utf8"));
}

/** Writes compact JSON, creating folders. */
export function writeJson(p, data) {
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, JSON.stringify(data));
}

const appStrings = new Map();
/** The app's flat key→string map for one language (client/i18n/<lang>.ts). */
export function appI18n(ctx, lang) {
  if (!appStrings.has(lang)) {
    const src = readFileSync(join(ctx.app, "client", "i18n", `${lang}.ts`), "utf8");
    const start = src.search(/=\s*\{/);
    const body = src.slice(src.indexOf("{", start), src.lastIndexOf("}") + 1);
    appStrings.set(lang, new Function(`return ${body}`)());
  }
  return appStrings.get(lang);
}

/** Picks the app strings whose key starts with one of `prefixes`, for every language. */
export function pickAppStrings(ctx, prefixes) {
  const out = {};
  for (const lang of LOCALES) {
    const all = appI18n(ctx, lang);
    out[lang] = Object.fromEntries(Object.entries(all).filter(([k]) => prefixes.some((p) => k === p || k.startsWith(p))));
  }
  return out;
}
