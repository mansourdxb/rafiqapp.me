import Image from "next/image";

/** An app screenshot in a simple phone frame. */
export function Phone({ src, alt, priority = false, className = "" }: { src: string; alt: string; priority?: boolean; className?: string }) {
  return (
    <div className={`relative aspect-[1320/2868] rounded-[2.6rem] bg-[#0b1220] p-2.5 shadow-2xl ring-1 ring-white/10 ${className}`}>
      <div className="relative h-full w-full overflow-hidden rounded-[2.1rem]">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 60vw, 300px" className="object-cover" priority={priority} />
      </div>
    </div>
  );
}
