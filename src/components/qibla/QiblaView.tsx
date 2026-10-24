"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { isRtl, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { qiblaMsg } from "@/i18n/messages/qibla";
import { common } from "@/i18n/messages/common";
import { PageHeader } from "@/components/ui/PageHeader";
import { CARD, OUTLINED, PANEL } from "@/components/prayer/prayerUi";
import { localDigits } from "@/lib/digits";
import { distanceKm, qiblaBearing } from "@/lib/qibla/geo";
import { LocationPicker } from "@/components/prayer/LocationPicker";
import { usePlace, useSettings } from "@/components/prayer/usePlace";
import { Icon } from "@/components/ui/Icon";
import { CompassTab } from "./CompassTab";
import { SkyTab } from "./SkyTab";
import { ShadowTab } from "./ShadowTab";
import { MapTab } from "./MapTab";

const TABS = ["compass", "sky", "shadow", "map"] as const;
type Tab = (typeof TABS)[number];
// the reference's method icons; the hash names match the home page's Qibla links (#compass, #sunMoon, …)
const TAB_ICON: Record<Tab, string> = {
  compass: "/images/ref/qibla-navigator.webp",
  sky: "/images/ref/qibla-sunMoon.webp",
  shadow: "/images/ref/qibla-shadow.webp",
  map: "/images/ref/qibla-map.webp",
};
const HASH: Record<string, Tab> = { compass: "compass", sunMoon: "sky", sky: "sky", shadow: "shadow", map: "map" };

export function QiblaView({ lang }: { lang: Locale }) {
  const t = qiblaMsg[lang];
  const place = usePlace(lang);
  const s = useSettings();
  const [tab, setTab] = useState<Tab>("compass");
  useEffect(() => {
    const h = HASH[window.location.hash.slice(1)];
    if (h) setTab(h); // eslint-disable-line react-hooks/set-state-in-effect -- one-time read of the URL hash after mount
  }, []);
  const qibla = qiblaBearing(place.lat, place.lng);
  const km = distanceKm(place.lat, place.lng);
  const num = (v: number, frac = 0) => localDigits(lang, v.toLocaleString("en-US", { maximumFractionDigits: frac, minimumFractionDigits: frac }));
  const tabLabel: Record<Tab, string> = {
    compass: appT(lang, "alm.qibla.tabCompass"),
    sky: appT(lang, "alm.qibla.tabSky"),
    shadow: t.tabShadow,
    map: appT(lang, "alm.qibla.tabMap"),
  };

  return (
    <>
      <PageHeader lang={lang} crumbs={[{ label: common[lang].nav.qibla }]} title={t.title} />
      <div className="mx-auto max-w-6xl px-4 pb-12">
        <div className={PANEL}>
          <LocationPicker lang={lang} />
        </div>
        {place.isDefault && <p className="mt-4 rounded-md bg-tint px-4 py-3 text-sm font-semibold text-navy-2 dark:text-ink">{t.noPlace}</p>}

        {/* place + key numbers */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="flex items-center gap-3 rounded-xl bg-navy px-4 py-4 text-white shadow-lg">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10">
              <Icon name="location" className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-bold">
                {place.label}
                {place.countryLabel ? <span className="text-orange">{`${isRtl(lang) ? "، " : ", "}${place.countryLabel}`}</span> : ""}
              </p>
              <p className="text-xs text-white/70" dir="ltr" style={{ textAlign: isRtl(lang) ? "right" : "left" }}>
                {place.lat.toFixed(4)}°, {place.lng.toFixed(4)}°
              </p>
            </div>
          </div>
          <Stat icon="qibla" label={appT(lang, "alm.qibla.fromNorthLabel")} value={`${num(qibla, 1)}°`} />
          <Stat icon="globe" label={appT(lang, "alm.qibla.distanceLabel")} value={`${num(Math.round(km))} ${appT(lang, "alm.qibla.kmUnit")}`} />
        </div>

        {/* method tabs with the reference icons */}
        <div role="tablist" className="mt-12 grid grid-cols-4 gap-2 sm:gap-4">
          {TABS.map((k) => {
            const on = tab === k;
            return (
              <button
                key={k}
                role="tab"
                type="button"
                aria-selected={on}
                onClick={() => setTab(k)}
                className={`relative flex h-16 flex-col items-center justify-end rounded-xl px-1 pb-2 text-xs font-bold transition hover:-translate-y-0.5 sm:h-[4.5rem] sm:text-sm ${
                  on ? "bg-navy text-white shadow-lg" : `${OUTLINED} text-navy-2 dark:text-white`
                }`}
              >
                <Image src={TAB_ICON[k]} alt="" width={56} height={56} className="absolute -top-7 size-12 object-contain drop-shadow sm:size-14" />
                <span className="truncate">{tabLabel[k]}</span>
              </button>
            );
          })}
        </div>

        <div className={`mt-6 ${CARD} p-4 sm:p-8`}>
          {tab === "compass" && <CompassTab lang={lang} qibla={qibla} />}
          {tab === "sky" && <SkyTab lang={lang} place={place} qibla={qibla} s={s} />}
          {tab === "shadow" && <ShadowTab lang={lang} place={place} qibla={qibla} s={s} />}
          {tab === "map" && <MapTab lang={lang} place={place} km={km} />}
        </div>
      </div>
    </>
  );
}

function Stat({ icon, label, value }: { icon: "qibla" | "globe"; label: string; value: string }) {
  return (
    <div className={`${OUTLINED} flex items-center gap-3 px-4 py-4`}>
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-tint text-primary">
        <Icon name={icon} className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-navy-2 dark:text-ink-2">{label}</p>
        <p className="text-xl font-extrabold text-section dark:text-primary-light">{value}</p>
      </div>
    </div>
  );
}
