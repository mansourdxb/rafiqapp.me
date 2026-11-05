import { AppleWatchFrame, Dashboard, FILE, NO_APPLE_WATCH_SHOT, RoundWatchFrame } from "./HomeDevices";
import type { Locale } from "@/i18n/config";
import type { Devices } from "@/i18n/messages/devices";

/** Soft blue shape behind the device art, same look as the phone art. */
function Blob() {
  return (
    <svg viewBox="0 0 580 483" className="absolute inset-0 h-full w-full" aria-hidden>
      <g transform="translate(290 250) scale(1.12) translate(-290 -250)">
        <path d="M118 96c66-72 214-86 304-30s138 156 104 246-150 140-262 128S38 380 36 282 52 168 118 96z" fill="#D3EEF8" />
        <path d="M168 132c48-46 160-56 228-12s92 124 56 192-124 92-204 80-124-58-124-138 12-90 44-122z" fill="#8FD6F1" opacity=".55" />
      </g>
      <ellipse cx="290" cy="462" rx="210" ry="14" fill="#14234E" opacity=".08" />
      <path d="M150 18a24 24 0 1 0 28 32 19 19 0 0 1-28-32z" fill="#29C0F0" />
    </svg>
  );
}

/** Hero slide: CarPlay and Android Auto dashboards. */
export function HeroCarArt({ t }: { t: Devices }) {
  return (
    <div className="relative mx-auto mb-2 aspect-[1.2] w-full max-w-[580px]">
      <Blob />
      <div className="absolute inset-x-[8%] top-[18%] flex flex-col gap-[7%]">
        {(["carPlay", "androidAuto"] as const).map((p) => (
          <div key={p} className="flex flex-col items-center rounded-2xl bg-white px-4 pb-3 pt-3 text-center shadow-[0_10px_30px_-12px_rgba(20,35,78,0.35)] dark:bg-canvas">
            <div className="w-[48%]">
              <Dashboard kind={p} />
            </div>
            <p className="mt-1 text-sm font-bold text-section dark:text-primary-light" dir="auto">
              {t.names[p]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Hero slide: Apple Watch, Wear OS and HUAWEI WATCH, overlapping in a row. */
export function HeroWatchArt({ lang, t, siteName }: { lang: Locale; t: Devices; siteName: string }) {
  const shot = (p: "appleWatch" | "wearOs" | "huaweiWatch") => `/devices/${p === "appleWatch" && NO_APPLE_WATCH_SHOT.includes(lang) ? "en" : lang}/${FILE[p]}.webp`;
  return (
    <div className="relative mx-auto mb-2 aspect-[1.2] w-full max-w-[580px]">
      <Blob />
      <div className="absolute left-[4%] top-[33%] w-[30%]">
        <AppleWatchFrame src={shot("appleWatch")} alt={`${t.names.appleWatch} — ${siteName}`} width="100%" />
      </div>
      <div className="absolute left-[35%] top-[21%] w-[31%]">
        <RoundWatchFrame src={shot("wearOs")} alt={`${t.names.wearOs} — ${siteName}`} huawei={false} width="100%" />
      </div>
      <div className="absolute left-[66%] top-[33%] w-[30%]">
        <RoundWatchFrame src={shot("huaweiWatch")} alt={`${t.names.huaweiWatch} — ${siteName}`} huawei width="100%" />
      </div>
    </div>
  );
}
