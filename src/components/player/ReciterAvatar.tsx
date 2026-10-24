import Image from "next/image";
import { reciterPhoto } from "@/lib/player/reciters";
import { PIcon } from "./PlayerIcons";

/** Reciter photo (the app's), or a headphones mark for reciters without one. */
export function ReciterAvatar({ reciter, size, className = "" }: { reciter: string; size: number; className?: string }) {
  const src = reciterPhoto(reciter);
  return (
    <span className={`relative grid shrink-0 place-items-center overflow-hidden bg-tint text-primary ${className}`} style={{ width: size, height: size }}>
      {src ? <Image src={src} alt="" width={size} height={size} className="size-full object-cover" /> : <PIcon name="headphones" className="size-1/2" />}
    </span>
  );
}
