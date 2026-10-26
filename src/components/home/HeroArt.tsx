import Image from "next/image";

/** Hero illustration: three app screens in device frames, fanned over a soft blue shape with stars, moon and leaves. */
export function HeroArt({ front, left, right, alt, priority = false }: { front: string; left: string; right: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative mx-auto mb-2 aspect-[1.2] w-full max-w-[580px]">
      <svg viewBox="0 0 580 483" className="absolute inset-0 h-full w-full" aria-hidden>
        {/* soft background shapes + floor shadow */}
        <g transform="translate(290 250) scale(1.12) translate(-290 -250)">
          <path d="M118 96c66-72 214-86 304-30s138 156 104 246-150 140-262 128S38 380 36 282 52 168 118 96z" fill="#D3EEF8" />
          <path d="M168 132c48-46 160-56 228-12s92 124 56 192-124 92-204 80-124-58-124-138 12-90 44-122z" fill="#8FD6F1" opacity=".55" />
        </g>
        <ellipse cx="290" cy="462" rx="210" ry="14" fill="#14234E" opacity=".08" />
        {/* crescent */}
        <path d="M150 18a24 24 0 1 0 28 32 19 19 0 0 1-28-32z" fill="#29C0F0" />
        {/* eight-pointed stars */}
        <g fill="none" stroke="#29C0F0" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M532 52h20v20h-20zM542 47.9l14.1 14.1-14.1 14.1-14.1-14.1z" />
          <path d="M44 300h14v14H44zM51 297.1l9.9 9.9-9.9 9.9-9.9-9.9z" />
        </g>
        {/* sparkles */}
        <g stroke="#14234E" strokeWidth="2.4" strokeLinecap="round">
          <path d="M60 170l10 10M70 170l-10 10" />
          <path d="M440 18l10 10M450 18l-10 10" />
          <path d="M540 330l8 8M548 330l-8 8" />
        </g>
        <g fill="none" strokeWidth="3">
          <circle cx="488" cy="190" r="6" stroke="#FF8711" />
          <circle cx="90" cy="400" r="5" stroke="#FF8711" />
          <circle cx="545" cy="250" r="9" stroke="#00B0E9" />
        </g>
        <circle cx="36" cy="230" r="4" fill="#174D92" />
        <circle cx="560" cy="150" r="3.5" fill="#174D92" />
        {/* leaves */}
        <g opacity=".9">
          <path d="M20 452c22-58 62-86 118-82-36 18-62 46-78 84z" fill="#8FC79B" />
          <path d="M60 456c10-40 36-62 76-66-22 16-38 38-46 66z" fill="#5FAE72" />
          <path d="M560 446c-24-54-62-78-112-72 34 16 58 42 72 76z" fill="#8FC79B" />
          <path d="M524 452c-10-36-34-56-70-58 20 14 34 34 42 58z" fill="#5FAE72" />
        </g>
      </svg>
      <div className="absolute left-[9%] top-[17%] w-[27%] -rotate-[8deg]">
        <PhoneFrame src={left} alt="" />
      </div>
      <div className="absolute right-[9%] top-[17%] w-[27%] rotate-[8deg]">
        <PhoneFrame src={right} alt="" />
      </div>
      <div className="absolute left-1/2 top-[3%] w-[34%] -translate-x-1/2">
        <PhoneFrame src={front} alt={alt} priority={priority} />
      </div>
    </div>
  );
}

/** A modern phone: metal rim, side keys, camera island and a light glare over the screen. */
function PhoneFrame({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[1320/2868] rounded-[17%/7.8%] bg-gradient-to-br from-[#5b606b] via-[#202329] to-[#454a53] p-[3.4%] shadow-[0_24px_50px_-14px_rgba(20,35,78,0.55)]">
      <span className="absolute -left-[1.6%] top-[17%] h-[4%] w-[2%] rounded-l-sm bg-[#30343b]" aria-hidden />
      <span className="absolute -left-[1.6%] top-[24%] h-[7.5%] w-[2%] rounded-l-sm bg-[#30343b]" aria-hidden />
      <span className="absolute -right-[1.6%] top-[22%] h-[10%] w-[2%] rounded-r-sm bg-[#30343b]" aria-hidden />
      <div className="relative h-full w-full overflow-hidden rounded-[14%/6.5%] bg-black ring-[1.5px] ring-black">
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 40vw, 220px" className="object-cover" priority={priority} />
        <span className="absolute left-1/2 top-[1.3%] h-[3%] w-[30%] -translate-x-1/2 rounded-full bg-black" aria-hidden />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent from-55% to-white/15" aria-hidden />
      </div>
    </div>
  );
}
