// A band of eight-pointed stars — the geometric border used between sections.
export function IslamicBand({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`h-5 w-full ${className}`}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="band" width="44" height="20" patternUnits="userSpaceOnUse">
            <rect width="44" height="20" fill="#0D245E" />
            <path d="M0 10h44" stroke="#29ABE2" strokeOpacity=".45" strokeWidth="1" />
            <g transform="translate(22 10)">
              <rect x="-5" y="-5" width="10" height="10" fill="#0D245E" stroke="#EAF6FC" strokeWidth="1.2" />
              <rect x="-5" y="-5" width="10" height="10" fill="none" stroke="#EAF6FC" strokeWidth="1.2" transform="rotate(45)" />
              <circle r="1.6" fill="#F47A1F" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#band)" />
      </svg>
    </div>
  );
}

/** Faint star lattice for dark section backgrounds. */
export function StarPattern({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id="stars" width="80" height="80" patternUnits="userSpaceOnUse">
          <g transform="translate(40 40)" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="-14" y="-14" width="28" height="28" />
            <rect x="-14" y="-14" width="28" height="28" transform="rotate(45)" />
            <circle r="6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#stars)" />
    </svg>
  );
}
