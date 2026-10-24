"use client";
import { useState } from "react";
import { isRtl, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { qiblaMsg } from "@/i18n/messages/qibla";
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

export function QiblaView({ lang }: { lang: Locale }) {
  const t = qiblaMsg[lang];
  const place = usePlace(lang);
  const s = useSettings();
  const [tab, setTab] = useState<Tab>("compass");
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
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-2xl font-extrabold text-ink sm:text-3xl">{t.title}</h1>
        <div className="w-full lg:max-w-xl">
          <LocationPicker lang={lang} />
        </div>
      </div>
      {place.isDefault && <p className="mb-4 rounded-xl border border-primary/25 bg-tint px-4 py-3 text-sm text-ink">{t.noPlace}</p>}

      {/* place + key numbers */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-2xl bg-navy px-4 py-4 text-white">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10">
            <Icon name="location" className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold">
              {place.label}
              {place.countryLabel ? `${isRtl(lang) ? "، " : ", "}${place.countryLabel}` : ""}
            </p>
            <p className="text-xs text-white/70" dir="ltr" style={{ textAlign: isRtl(lang) ? "right" : "left" }}>
              {place.lat.toFixed(4)}°, {place.lng.toFixed(4)}°
            </p>
          </div>
        </div>
        <Stat icon="qibla" label={appT(lang, "alm.qibla.fromNorthLabel")} value={`${num(qibla, 1)}°`} />
        <Stat icon="globe" label={appT(lang, "alm.qibla.distanceLabel")} value={`${num(Math.round(km))} ${appT(lang, "alm.qibla.kmUnit")}`} />
      </div>

      {/* method tabs */}
      <div role="tablist" className="mt-6 grid grid-cols-4 gap-1 rounded-2xl border border-line bg-card p-1">
        {TABS.map((k) => (
          <button
            key={k}
            role="tab"
            type="button"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={`rounded-xl px-1 py-2.5 text-xs font-bold transition sm:text-sm ${tab === k ? "bg-primary text-white shadow" : "text-ink-2 hover:bg-tint hover:text-ink"}`}
          >
            {tabLabel[k]}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-3xl border border-line bg-card p-4 sm:p-8">
        {tab === "compass" && <CompassTab lang={lang} qibla={qibla} />}
        {tab === "sky" && <SkyTab lang={lang} place={place} qibla={qibla} s={s} />}
        {tab === "shadow" && <ShadowTab lang={lang} place={place} qibla={qibla} s={s} />}
        {tab === "map" && <MapTab lang={lang} place={place} km={km} />}
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: "qibla" | "globe"; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-card px-4 py-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-tint text-primary">
        <Icon name={icon} className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-ink-2">{label}</p>
        <p className="text-xl font-extrabold text-ink">{value}</p>
      </div>
    </div>
  );
}
