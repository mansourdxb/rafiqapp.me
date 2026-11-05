import Image from "next/image";
import { AppleWatchFrame, FILE, NO_APPLE_WATCH_SHOT, RoundWatchFrame } from "./HomeDevices";
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

/** A car head-unit display: dark bezel around the screen. */
function CarScreenFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[800/1280] rounded-[7%/4.4%] bg-gradient-to-br from-[#5b606b] via-[#202329] to-[#454a53] p-[3%] shadow-[0_24px_50px_-14px_rgba(20,35,78,0.55)]">
      <div className="relative h-full w-full overflow-hidden rounded-[5%/3.2%] bg-black ring-[1.5px] ring-black">
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 40vw, 220px" className="object-cover" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent from-55% to-white/10" aria-hidden />
      </div>
    </div>
  );
}

/** Hero slide: the app's real Android Auto screens (Android Automotive emulator), fanned like the phone art. */
export function HeroCarArt({ t, siteName }: { t: Devices; siteName: string }) {
  const alt = `${t.names.androidAuto} — ${siteName}`;
  return (
    <div className="relative mx-auto mb-2 aspect-[1.2] w-full max-w-[580px]">
      <Blob />
      <div className="absolute left-[8%] top-[17%] w-[28%] -rotate-[7deg]">
        <CarScreenFrame src="/devices/car/android-auto-1.webp" alt="" />
      </div>
      <div className="absolute right-[8%] top-[17%] w-[28%] rotate-[7deg]">
        <CarScreenFrame src="/devices/car/android-auto-3.webp" alt="" />
      </div>
      <div className="absolute left-1/2 top-[3%] w-[36%] -translate-x-1/2">
        <CarScreenFrame src="/devices/car/android-auto-2.webp" alt={alt} />
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
