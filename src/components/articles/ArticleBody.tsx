// Article body. Arabic recitations (Qur'an, duas, tajweed examples) render verbatim in the Uthmanic font, RTL.
import { isRtl, type Locale } from "@/i18n/config";
import { articles as msgs, fill } from "@/i18n/messages/articles";
import { localDigits } from "@/lib/digits";
import type { Block } from "@/lib/articles";

// Arabic-script runs inside a left-to-right paragraph (e.g. «أعوذ بالله…» in an English body) are
// isolated so they keep their own direction.
const ARABIC_RUN = /([؀-ۿݐ-ݿ][؀-ۿݐ-ݿً-ٰ\s،؛]*[؀-ۿݐ-ݿً-ٰ]|[؀-ۿ])/g;

function Inline({ text, rtl }: { text: string; rtl: boolean }) {
  if (rtl) return <>{text}</>;
  const parts = text.split(ARABIC_RUN);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <bdi key={i} lang="ar" dir="rtl" className="font-semibold text-section dark:text-primary-light">
            {p}
          </bdi>
        ) : (
          p
        ),
      )}
    </>
  );
}

// The Uthmanic font draws punctuation (، ؛ — …) as ornaments, so those few marks use the text font.
function Recited({ text }: { text: string }) {
  return (
    <>
      {text.split(/([،؛,—:.()«»"'])/).map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-sans text-[0.75em]">
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  );
}

export function ArticleBody({ lang, blocks }: { lang: Locale; blocks: Block[] }) {
  const t = msgs[lang];
  const rtl = isRtl(lang);
  return (
    <div className="space-y-5 text-[17px] leading-[1.95] text-ink sm:text-lg">
      {blocks.map((b, i) => {
        switch (b.k) {
          case "p":
            return (
              <p key={i} className={i === 0 ? "text-lg leading-[1.95] sm:text-xl" : ""}>
                <Inline text={b.v} rtl={rtl} />
              </p>
            );
          case "h":
            return (
              <h2 key={i} className="flex items-center gap-3 pt-4 text-[22px] font-bold text-section dark:text-primary-light">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange text-base text-white" aria-label={fill(t.step, { n: b.n })}>
                  {localDigits(lang, b.n)}
                </span>
                {b.v}
              </h2>
            );
          case "ar":
            return (
              <figure key={i} className="relative rounded-2xl border border-primary/20 bg-tint px-5 py-5 sm:px-7">
                {(b.l || b.n) && (
                  <figcaption className="mb-2 flex items-center gap-2 text-xs font-bold text-primary">
                    {b.n ? (
                      <span className="grid size-7 place-items-center rounded-full bg-primary text-[13px] text-white">{localDigits(lang, b.n)}</span>
                    ) : null}
                    {b.l}
                  </figcaption>
                )}
                <blockquote lang="ar" dir="rtl" className="quran text-center text-[26px] leading-[2.1] text-ink sm:text-[30px]">
                  <Recited text={b.v} />
                </blockquote>
              </figure>
            );
          case "mean":
            return (
              <p key={i} className="-mt-2 border-s-4 border-orange/70 ps-4 text-base leading-relaxed text-ink">
                <span className="me-2 text-xs font-bold uppercase tracking-wide text-orange">{t.meaning}</span>
                <Inline text={b.v} rtl={rtl} />
              </p>
            );
          case "src":
            return (
              <p key={i} className="-mt-2 flex flex-wrap items-baseline gap-x-2 text-sm text-ink-2">
                <span className="font-bold text-ink-2">{t.source}:</span>
                <bdi dir="auto">{b.v}</bdi>
              </p>
            );
        }
      })}
    </div>
  );
}
