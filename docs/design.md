# Site design — reference style

The site copies the look of the reference site's pages (white pages, navy menu bar, sky/orange accents).
Never show the reference brand name anywhere.

## Colours (Tailwind tokens in src/app/globals.css)
- `navy` #0F1C50 — menu bar, dark sections, "Send"/"Share" pills, the active prayer card
- `navy-2` / `text-ink` #14234E — body text and dark headings
- `section` #174D92 — section and page titles (h1/h2), card titles
- `primary` #00B0E9 — buttons ("View more"), links, icons, breadcrumb, active underline
- `orange` #FF8711 — highlight words in titles, current breadcrumb item, footer bar, stars
- `tint` #DFEDF2 — light-blue bars (group headings like "The Arab world"), selected rows
- `card` #F9F9FF — card background; `edge` #7CB4C8 — outlined pills/cards (`ring-2 ring-edge/70`)
- page background is WHITE (`bg-white` / `bg-canvas`), never a dark hero

## Pieces
- Page header: `PageHeader` (src/components/ui/PageHeader.tsx) — breadcrumb + blue title; or `photo`
  banner (`/images/ref/catHeader1..4.webp`) with white title and orange highlight. No navy gradient heroes.
- Cards: `rounded-[15px] bg-card shadow-[0_5px_25px_rgba(0,0,0,0.16)]`, no borders.
- Inputs / pills: `rounded-full bg-white ring-2 ring-edge/70 shadow-[0_3px_10px_rgba(124,180,200,0.35)] h-12..14`.
- Group bars: `rounded-md bg-tint px-4 py-3 font-bold text-navy-2`.
- Accordions (FAQ): `rounded-lg ring-2 ring-navy` boxes with a navy ▾ at the start.
- Sidebars: `rounded-[15px] bg-[#EFEFEF] p-6` with a blue title ("Search", "Most viewed").
- Primary button: `rounded-lg bg-primary px-10 py-2.5 font-bold text-white`; outline: `rounded-full ring-1 ring-primary`.
- Fonts: Roboto (Latin/Cyrillic), Noto Sans (Hausa pages: Roboto lacks ɓ ɗ ƙ ƴ), Almarai (Arabic), Noto Sans Arabic fallback (Urdu/Persian letters), Noto Sans Devanagari (Hindi), Noto Sans Bengali (Bengali).
- The Qur'an page itself keeps the app's Mushaf look (cream page, frame) — only the chrome around it changes.
