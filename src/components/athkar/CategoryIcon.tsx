// Line icons for Hisn al-Muslim chapters, picked from the Arabic chapter title like the app's
// AlMosalyHisnScreen (iconFor).
const P = {
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  moon: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z",
  bed: "M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5M7 11.5a1.5 1.5 0 1 0 0-.01",
  home: "M3 11l9-7 9 7M5 9.5V20h5v-6h4v6h5V9.5",
  mosque: "M12 3c-3 2-5 4-5 7h10c0-3-2-5-5-7zM5 21V12M19 21V12M3 21h18M9 21v-4a3 3 0 0 1 6 0v4M5 12V9M19 12V9",
  water: "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z",
  food: "M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-2 6 0 8v10M17 3v18",
  prayer: "M12 4a2 2 0 1 0 0 .01M9 21l1.5-7L8 11l4-3 4 3-2.5 3L15 21",
  plane: "M10.5 13.5L3 11l1.5-1.5 8 1L17 6a2 2 0 0 1 3 3l-4.5 4.5 1 8L15 23l-2.5-7.5L9 19v2.5L7.5 23 6 19l-4-1.5L3.5 16H6z",
  sad: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8.5 16a4.5 4.5 0 0 1 7 0M9 10h.01M15 10h.01",
  shield: "M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z",
  book: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5",
  hands: "M7 21v-5l-3-4V7a1.5 1.5 0 0 1 3 0v4M17 21v-5l3-4V7a1.5 1.5 0 0 0-3 0v4M7 11l3 3V6a1.5 1.5 0 0 1 2 0M17 11l-3 3V6a1.5 1.5 0 0 0-2 0",
  rain: "M7 15a4 4 0 0 1-.5-8 5.5 5.5 0 0 1 10.6 1.5A3.5 3.5 0 0 1 17 15zM8 18l-1 3M12 18l-1 3M16 18l-1 3",
  heart: "M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z",
  star: "M12 3l2 6.5L20.5 12 14 14.5 12 21l-2-6.5L3.5 12 10 9.5z",
} as const;

export type CategoryIconName = keyof typeof P;

export function iconFor(cat: string): CategoryIconName {
  if (cat.includes("صباح")) return "sun";
  if (cat.includes("مساء")) return "moon";
  if (cat.includes("نوم") || cat.includes("يقظ") || cat.includes("استيقاظ")) return "bed";
  if (cat.includes("بيت") || cat.includes("منزل")) return "home";
  if (cat.includes("مسجد")) return "mosque";
  if (cat.includes("طهار") || cat.includes("وضوء") || cat.includes("خلاء")) return "water";
  if (cat.includes("أكل") || cat.includes("اكل") || cat.includes("طعام") || cat.includes("شرب")) return "food";
  if (cat.includes("صلا") || cat.includes("أذان") || cat.includes("آذان") || cat.includes("اذان")) return "prayer";
  if (cat.includes("سفر")) return "plane";
  if (cat.includes("مرض") || cat.includes("هم") || cat.includes("كرب") || cat.includes("حزن")) return "sad";
  if (cat.includes("تعوذ") || cat.includes("استعاذ") || cat.includes("رقية") || cat.includes("شيطان")) return "shield";
  if (cat.includes("قرآن") || cat.includes("قراءة")) return "book";
  if (cat.includes("دعاء") || cat.includes("أدعية") || cat.includes("ادعية")) return "hands";
  if (cat.includes("مطر") || cat.includes("ريح")) return "rain";
  if (cat.includes("استغفار") || cat.includes("توبة")) return "heart";
  return "star";
}

export function CategoryIcon({ name, className = "size-5" }: { name: CategoryIconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d={P[name]} />
    </svg>
  );
}
