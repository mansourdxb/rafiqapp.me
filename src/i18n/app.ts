// Strings taken from the app (scripts/data/00-app-strings.mjs), so the site names things exactly
// as the app does.
import strings from "@/generated/app-strings.json";
import type { Locale } from "./config";

const S = strings as Record<Locale, Record<string, string>>;

export function appT(lang: Locale, key: string, params?: Record<string, string | number>) {
  let s = S[lang]?.[key] ?? S.en[key] ?? key;
  if (params) for (const [k, v] of Object.entries(params)) s = s.replaceAll(`{{${k}}}`, String(v));
  return s;
}
