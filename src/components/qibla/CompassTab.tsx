"use client";
// Live compass: DeviceOrientationEvent (iOS: webkitCompassHeading after requestPermission on a tap;
// Android/Chrome: deviceorientationabsolute). Without a sensor the dial stays north-up.
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { qiblaMsg } from "@/i18n/messages/qibla";
import { angleDiff, normDeg } from "@/lib/qibla/geo";
import { Dial } from "./Dial";

type Status = "idle" | "waiting" | "on" | "nosensor" | "denied";
type OrientationEv = DeviceOrientationEvent & { webkitCompassHeading?: number };
type DOEStatic = { requestPermission?: () => Promise<"granted" | "denied"> };

export function CompassTab({ lang, qibla }: { lang: Locale; qibla: number }) {
  const t = qiblaMsg[lang];
  const [status, setStatus] = useState<Status>("idle");
  const [heading, setHeading] = useState<number | null>(null);
  const [unwrapped, setUnwrapped] = useState(0); // continuous rotation, so the dial never spins the long way
  const [calib, setCalib] = useState(false);
  const cleanup = useRef<(() => void) | null>(null);
  const last = useRef<number | null>(null);
  const rot = useRef(0);

  useEffect(() => () => cleanup.current?.(), []);

  const start = async () => {
    const DOE = (typeof window !== "undefined" ? window.DeviceOrientationEvent : undefined) as unknown as DOEStatic | undefined;
    cleanup.current?.();
    if (!DOE) return setStatus("nosensor");
    try {
      if (typeof DOE.requestPermission === "function" && (await DOE.requestPermission()) !== "granted") return setStatus("denied");
    } catch {
      return setStatus("denied");
    }
    setStatus("waiting");
    const screenAngle = () => (typeof screen !== "undefined" && screen.orientation ? screen.orientation.angle : 0);
    const apply = (h: number) => {
      const next = normDeg(h + screenAngle());
      const prev = last.current;
      rot.current = prev == null ? -next : rot.current - angleDiff(prev, next);
      last.current = next;
      setHeading(next);
      setUnwrapped(rot.current);
      setStatus("on");
    };
    const onAbs = (e: DeviceOrientationEvent) => {
      if (e.alpha != null) apply(360 - e.alpha);
    };
    const onRel = (e: OrientationEv) => {
      if (e.webkitCompassHeading != null) apply(e.webkitCompassHeading);
      else if (e.absolute && e.alpha != null) apply(360 - e.alpha);
    };
    const absName = "ondeviceorientationabsolute" in window ? "deviceorientationabsolute" : null;
    if (absName) window.addEventListener(absName, onAbs as EventListener);
    else window.addEventListener("deviceorientation", onRel as EventListener);
    const timer = setTimeout(() => setStatus((s) => (s === "waiting" ? "nosensor" : s)), 3000);
    cleanup.current = () => {
      clearTimeout(timer);
      if (absName) window.removeEventListener(absName, onAbs as EventListener);
      else window.removeEventListener("deviceorientation", onRel as EventListener);
    };
  };

  const diff = heading == null ? null : angleDiff(heading, qibla); // + → qibla is to the right
  const aligned = diff != null && Math.abs(diff) <= 5;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-full max-w-[340px]">
        <Dial lang={lang} qibla={qibla} rotation={status === "on" ? unwrapped : 0} aligned={aligned} pointer={status === "on"} className="w-full text-ink" />
      </div>

      {status === "on" && diff != null && (
        <p className={`rounded-md px-4 py-2 text-center text-sm font-bold ${aligned ? "bg-orange text-white" : "bg-tint text-navy-2 dark:text-ink"}`} role="status">
          {aligned ? t.facing : appT(lang, diff > 0 ? "alm.qibla.moveRight" : "alm.qibla.moveLeft")}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2">
        {status !== "on" && (
          <button type="button" onClick={start} disabled={status === "waiting"} className="h-11 rounded-lg bg-primary px-8 text-sm font-bold text-white hover:bg-primary-deep disabled:opacity-70">
            {t.startCompass}
          </button>
        )}
        <button type="button" onClick={() => setCalib((c) => !c)} className="h-11 rounded-full px-6 text-sm font-bold text-navy-2 ring-1 ring-primary hover:bg-tint dark:text-white">
          {t.calibrate}
        </button>
      </div>

      <p className="max-w-md text-center text-sm text-ink-2">
        {status === "on" ? t.compassOn : status === "nosensor" ? t.noSensor : status === "denied" ? t.denied : t.desktopHint}
      </p>
      {status === "on" && <p className="max-w-md text-center text-xs text-ink-2">{appT(lang, "alm.qibla.holdFlat")}</p>}

      {calib && (
        <div className="w-full max-w-md rounded-md bg-tint p-4 text-sm text-navy-2 dark:text-ink">
          <p className="mb-1 font-bold">{appT(lang, "alm.qibla.calibrateTitle")}</p>
          <p>{appT(lang, "alm.qibla.calibrateBody")}</p>
          <svg viewBox="0 0 120 50" className="mx-auto mt-3 h-12 w-28 text-primary" aria-hidden>
            <path d="M60 25c-12-16-40-16-40 0s28 16 40 0 40-16 40 0-28 16-40 0z" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeDasharray="6 5" />
          </svg>
        </div>
      )}
    </div>
  );
}
