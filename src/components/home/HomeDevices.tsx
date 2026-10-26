import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { devices } from "@/i18n/messages/devices";

// Real watch screenshots in public/devices/<lang>/. The App Store has no Persian or Hausa listing,
// so those two pages show the English Apple Watch shot.
const NO_APPLE_WATCH_SHOT: readonly Locale[] = ["fa", "ha"];

const WATCHES = ["appleWatch", "wearOs", "huaweiWatch"] as const;
const CARS = ["carPlay", "androidAuto"] as const;
const FILE: Record<(typeof WATCHES)[number], string> = { appleWatch: "apple-watch", wearOs: "wear-os", huaweiWatch: "huawei-watch" };

/** "Rafiq Al-Muslim in your car and on your wrist": watch screenshots in device frames, then the two car platforms. */
export function HomeDevices({ lang, siteName }: { lang: Locale; siteName: string }) {
  const t = devices[lang];
  const shot = (p: (typeof WATCHES)[number]) =>
    `/devices/${p === "appleWatch" && NO_APPLE_WATCH_SHOT.includes(lang) ? "en" : lang}/${FILE[p]}.webp`;
  const label = "text-sm font-bold uppercase tracking-wider text-primary-deep dark:text-primary-light";

  return (
    <section className="relative bg-tint/60 py-16 dark:bg-tint">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-[26px] font-bold leading-snug text-section sm:text-[34px] dark:text-primary-light">
            {siteName} <span className="text-orange">{t.title}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-navy-2 dark:text-ink">{t.sub}</p>
        </div>

        <h3 className={`${label} mt-12 text-center`}>{t.wrist}</h3>
        <ul className="mt-8 grid gap-12 sm:grid-cols-3 sm:gap-6">
          {WATCHES.map((p) => (
            <li key={p} className="flex flex-col items-center text-center">
              <div className="flex h-[250px] items-center justify-center">
                {p === "appleWatch" ? (
                  <AppleWatchFrame src={shot(p)} alt={`${t.names[p]} — ${siteName}`} />
                ) : (
                  <RoundWatchFrame src={shot(p)} alt={`${t.names[p]} — ${siteName}`} huawei={p === "huaweiWatch"} />
                )}
              </div>
              <PlatformText name={t.names[p]} text={t.text[p]} />
            </li>
          ))}
        </ul>

        <h3 className={`${label} mt-16 text-center`}>{t.car}</h3>
        <ul className="mx-auto mt-8 grid max-w-4xl gap-6 sm:grid-cols-2">
          {CARS.map((p) => (
            <li key={p} className="flex flex-col items-center rounded-2xl bg-white px-6 pb-7 pt-6 text-center shadow-[0_10px_30px_-12px_rgba(20,35,78,0.25)] dark:bg-card">
              <Dashboard kind={p} />
              <PlatformText name={t.names[p]} text={t.text[p]} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PlatformText({ name, text }: { name: string; text: string }) {
  return (
    <>
      <p className="mt-5 text-lg font-bold text-section dark:text-primary-light" dir="auto">
        {name}
      </p>
      <p className="mt-1.5 max-w-xs text-[15px] leading-7 text-navy-2 dark:text-ink-2">{text}</p>
    </>
  );
}

const METAL = "bg-gradient-to-br from-[#5b606b] via-[#202329] to-[#454a53]";
const STRAP = "absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-[#2b2f36] to-[#1c1f24]";

/** Apple Watch: rounded-rectangle case, Digital Crown and side button on the right, strap stubs. */
function AppleWatchFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-[164px]">
      <span className={`${STRAP} -top-[30px] h-[44px] w-[70%] rounded-t-[14px]`} aria-hidden />
      <span className={`${STRAP} -bottom-[30px] h-[44px] w-[70%] rounded-b-[14px]`} aria-hidden />
      <span className="absolute -right-[7px] top-[24%] h-[17%] w-[9px] rounded-r-[4px] bg-gradient-to-r from-[#4a4f58] to-[#2a2d33]" aria-hidden />
      <span className="absolute -right-[4px] top-[50%] h-[20%] w-[5px] rounded-r-sm bg-[#30343b]" aria-hidden />
      <div className={`relative aspect-[448/528] rounded-[26%/22%] ${METAL} p-[8px] shadow-[0_24px_40px_-14px_rgba(20,35,78,0.55)]`}>
        <div className="relative h-full w-full overflow-hidden rounded-[22%/18.5%] bg-black ring-[1.5px] ring-black">
          <Image src={src} alt={alt} fill sizes="164px" className="object-cover" />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent from-55% to-white/15" aria-hidden />
        </div>
      </div>
    </div>
  );
}

/** Round watch (Wear OS / HUAWEI WATCH): circular case and straps; the Huawei one has a ticked bezel and two buttons. */
function RoundWatchFrame({ src, alt, huawei }: { src: string; alt: string; huawei: boolean }) {
  return (
    <div className="relative w-[184px]">
      <span className={`${STRAP} -top-[28px] h-[52px] w-[46%] rounded-t-[12px]`} aria-hidden />
      <span className={`${STRAP} -bottom-[28px] h-[52px] w-[46%] rounded-b-[12px]`} aria-hidden />
      {huawei ? (
        <>
          <span className="absolute -right-[6px] top-[28%] h-[11%] w-[9px] rounded-r-[4px] bg-gradient-to-r from-[#4a4f58] to-[#2a2d33]" aria-hidden />
          <span className="absolute -right-[6px] top-[61%] h-[11%] w-[9px] rounded-r-[4px] bg-gradient-to-r from-[#4a4f58] to-[#2a2d33]" aria-hidden />
        </>
      ) : (
        <span className="absolute -right-[7px] top-[43%] h-[14%] w-[10px] rounded-r-[5px] bg-gradient-to-r from-[#4a4f58] to-[#2a2d33]" aria-hidden />
      )}
      <div className={`relative aspect-square rounded-full ${METAL} ${huawei ? "p-[16px]" : "p-[9px]"} shadow-[0_24px_40px_-14px_rgba(20,35,78,0.55)]`}>
        {huawei && (
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
            <circle cx="50" cy="50" r="45.6" fill="none" stroke="#ffffff" strokeOpacity=".35" strokeWidth="2.6" strokeDasharray="0.6 4.175" />
          </svg>
        )}
        <div className="relative h-full w-full overflow-hidden rounded-full bg-black ring-[1.5px] ring-black">
          <Image src={src} alt={alt} fill sizes="184px" className="object-cover" />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent from-55% to-white/15" aria-hidden />
        </div>
      </div>
    </div>
  );
}

/** Generic line drawing of a car dashboard (wheel + centre screen) — an icon, not a screenshot. */
function Dashboard({ kind }: { kind: (typeof CARS)[number] }) {
  return (
    <svg viewBox="0 0 240 120" className="h-auto w-full max-w-[260px] text-section dark:text-primary-light" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {/* dashboard outline */}
      <path d="M8 100c6-40 34-66 112-66s106 26 112 66" />
      <path d="M8 100h224" />
      {/* steering wheel */}
      <circle cx="58" cy="92" r="26" />
      <circle cx="58" cy="92" r="7" />
      <path d="M33 86h18M65 86h18M58 99v19" />
      {/* centre screen */}
      <rect x="104" y="46" width="98" height="54" rx="8" className="fill-primary/10" />
      {kind === "carPlay" ? (
        <g className="fill-primary stroke-none">
          {[0, 1, 2, 3].map((c) =>
            [0, 1].map((r) => <rect key={`${c}${r}`} x={118 + c * 19} y={56 + r * 19} width="12" height="12" rx="3.5" />),
          )}
        </g>
      ) : (
        <g className="stroke-primary" strokeWidth="2.5">
          <path d="M116 56v34" />
          <rect x="126" y="55" width="40" height="36" rx="4" className="fill-primary/25" />
          <rect x="172" y="55" width="22" height="16" rx="3" />
          <rect x="172" y="75" width="22" height="16" rx="3" />
        </g>
      )}
    </svg>
  );
}
