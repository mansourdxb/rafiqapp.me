"use client";
import { useEffect, useState } from "react";
import { intlTag, type Locale } from "@/i18n/config";
import { prayerMsg } from "@/i18n/messages/prayer";
import { MAKKAH, type Place } from "@/lib/prayer/compute";
import { reversePlace } from "@/lib/prayer/location";
import { placeStore, settingsStore } from "@/lib/prayer/store";

export type ShownPlace = Place & { isDefault: boolean; label: string; countryLabel?: string };

function regionName(lang: Locale, cc?: string) {
  try {
    if (!cc) return undefined;
    // Shahmukhi: CLDR's pa-Arab has almost no country names (Saudi Arabia is "SA"), so the Urdu ones, same script.
    if (lang === "pnb") return new Intl.DisplayNames(["ur"], { type: "region" }).of(cc.toUpperCase());
    // Chrome has no Hausa names (it would say "Saudi Arabia"): name the default place, otherwise no country name.
    // Sorani asks for "ckb", Kurmanji for "ku" (Intl reads "ku-Arab" as Kurmanji).
    const tag = intlTag(lang);
    if (!Intl.DisplayNames.supportedLocalesOf([tag]).length) return lang === "ha" && cc.toLowerCase() === "sa" ? "Saudiyya" : undefined;
    return new Intl.DisplayNames([tag], { type: "region" }).of(cc.toUpperCase());
  } catch {
    return undefined;
  }
}

/** The saved place (or Makkah), named in the site language — looked up once per language, like the app. */
export function usePlace(lang: Locale): ShownPlace {
  const saved = placeStore.use();
  useEffect(() => {
    if (!saved || saved.lang === lang || saved.names?.[lang]) return;
    let live = true;
    reversePlace(saved.lat, saved.lng, lang).then((hit) => {
      if (!live || !hit) return;
      const cur = placeStore.get();
      if (!cur || cur.lat !== saved.lat || cur.lng !== saved.lng) return;
      placeStore.set({ ...cur, names: { ...cur.names, [lang]: { name: hit.name, country: hit.country } } });
    });
    return () => {
      live = false;
    };
  }, [saved, lang]);
  if (!saved) return { ...MAKKAH, isDefault: true, label: prayerMsg[lang].makkah, countryLabel: regionName(lang, "sa") };
  const local = saved.lang === lang ? { name: saved.name, country: saved.country } : saved.names?.[lang];
  return {
    ...saved,
    isDefault: false,
    label: local?.name ?? saved.name,
    countryLabel: local?.country ?? regionName(lang, saved.cc) ?? saved.country,
  };
}

export const useSettings = () => settingsStore.use();

/** Current time, refreshed every `ms` (null until mounted, so server and first client render match). */
export function useNow(ms = 1000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, ms);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [ms]);
  return now;
}
