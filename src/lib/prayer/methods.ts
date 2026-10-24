// Calculation methods — the app's five (client/screens/qibla/services/prayerTimes.ts).
import { CalculationMethod, type CalculationParameters } from "adhan";

export const METHODS = ["MWL", "UmmAlQura", "Egypt", "Karachi", "ISNA"] as const;
export type MethodKey = (typeof METHODS)[number];

/** App string key for each method's name (prayerSettings.method.*). */
export const METHOD_LABEL: Record<MethodKey, string> = {
  MWL: "prayerSettings.method.mwl",
  UmmAlQura: "prayerSettings.method.umm",
  Egypt: "prayerSettings.method.egyptian",
  Karachi: "prayerSettings.method.karachi",
  ISNA: "prayerSettings.method.isna",
};

export function methodParams(m: MethodKey): CalculationParameters {
  switch (m) {
    case "UmmAlQura":
      return CalculationMethod.UmmAlQura();
    case "Egypt":
      return CalculationMethod.Egyptian();
    case "Karachi":
      return CalculationMethod.Karachi();
    case "ISNA":
      return CalculationMethod.NorthAmerica();
    default:
      return CalculationMethod.MuslimWorldLeague();
  }
}

// The app's country lists (getRecommendedMethod), keyed by ISO 3166 code so it works for a place
// name in any language. Nominatim always returns `country_code`.
const BY_COUNTRY: Record<string, MethodKey> = {
  sa: "UmmAlQura", qa: "UmmAlQura", bh: "UmmAlQura", kw: "UmmAlQura", ae: "UmmAlQura", om: "UmmAlQura", ye: "UmmAlQura",
  eg: "Egypt", ly: "Egypt", sd: "Egypt", ss: "Egypt", so: "Egypt", er: "Egypt", dj: "Egypt",
  pk: "Karachi", bd: "Karachi", af: "Karachi", in: "Karachi",
  us: "ISNA", ca: "ISNA",
};

/** The standard method for a place: by country, else by region (same boxes as the app, which also
 * catch e.g. Jordan or Iraq), else MWL. */
export function recommendedMethod(countryCode?: string, lat?: number, lon?: number): MethodKey {
  const byCc = countryCode ? BY_COUNTRY[countryCode.toLowerCase()] : undefined;
  if (byCc) return byCc;
  if (lat != null && lon != null) {
    if (lat >= 12 && lat <= 32 && lon >= 34 && lon <= 60) return "UmmAlQura";
    if (lat >= 4 && lat <= 32 && lon >= 20 && lon < 34) return "Egypt";
    if (lat >= 5 && lat <= 37 && lon >= 60 && lon <= 93) return "Karachi";
    if (lat >= 15 && lat <= 72 && lon >= -170 && lon <= -50) return "ISNA";
  }
  return "MWL";
}
