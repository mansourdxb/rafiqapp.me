import Image from "next/image";

/** Hero illustration: two app screens on a soft blue shape with stars, moon and dots (reference style). */
export function HeroArt({ front, back, alt, priority = false }: { front: string; back: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative mx-auto mb-2 aspect-[1.15] w-full max-w-[560px]">
      <svg viewBox="0 0 540 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d="M120 70c60-60 190-70 270-20s120 140 90 220-130 120-230 110S40 330 40 240 60 130 120 70z" fill="#DFEDF2" />
        <path d="M150 110c40-40 140-50 200-10s80 110 50 170-110 80-180 70-110-50-110-120 10-80 40-110z" fill="#BAE4F0" opacity=".55" />
        <path d="M70 70a16 16 0 1 0 18 22 13 13 0 0 1-18-22z" fill="#29C0F0" />
        <g stroke="#14234E" strokeWidth="2.4" strokeLinecap="round">
          <path d="M70 120l10 10M80 120l-10 10" />
          <path d="M470 60l10 10M480 60l-10 10" />
          <path d="M488 300l8 8M496 300l-8 8" />
        </g>
        <g fill="none" strokeWidth="3">
          <circle cx="455" cy="120" r="6" stroke="#FF8711" />
          <circle cx="60" cy="300" r="5" stroke="#FF8711" />
          <circle cx="500" cy="230" r="9" stroke="#00B0E9" />
        </g>
        <path d="M30 380c40-40 70-50 110-40-30 10-50 25-60 45zM520 370c-30-35-60-45-95-38 25 10 45 25 55 43z" fill="#8FC79B" opacity=".8" />
      </svg>
      <div className="absolute start-[16%] top-[4%] w-[34%] -rotate-3">
        <PhoneFrame src={back} alt="" />
      </div>
      <div className="absolute end-[16%] top-[9%] w-[34%] rotate-2">
        <PhoneFrame src={front} alt={alt} priority={priority} />
      </div>
    </div>
  );
}

function PhoneFrame({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[1320/2868] rounded-[1.8rem] bg-[#1d1f24] p-[5px] shadow-[0_18px_40px_-12px_rgba(20,35,78,0.45)] ring-1 ring-black/40">
      <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
        <Image src={src} alt={alt} fill sizes="200px" className="object-cover" priority={priority} />
      </div>
    </div>
  );
}
