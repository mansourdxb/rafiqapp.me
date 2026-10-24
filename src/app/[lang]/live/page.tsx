import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { live } from "@/i18n/messages/live";
import { alternates } from "@/i18n/metadata";
import { Icon } from "@/components/ui/Icon";
import { PageHeader } from "@/components/ui/PageHeader";

// Official Saudi channels' 24/7 streams (Saudi Broadcasting Authority). Quran TV runs several live
// streams, so YouTube's "channel live" embed can't pick one — it embeds the Makkah stream's video id
// (check https://www.youtube.com/channel/<id>/streams if it ever ends).
const STREAMS = [
  { key: "makkah", channel: "UCos52azQNBgW63_9uDJoPDA", embed: "eC4LfEVxvKg" },
  { key: "madinah", channel: "UCROKYPep-UuODNwyipe6JMw", embed: "live_stream?channel=UCROKYPep-UuODNwyipe6JMw" },
] as const;

export async function generateMetadata({ params }: PageProps<"/[lang]/live">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = live[lang];
  return { title: t.title, description: t.subtitle, alternates: alternates(lang, "/live/") };
}

export default async function LivePage({ params }: PageProps<"/[lang]/live">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = live[lang];
  return (
    <>
      <PageHeader lang={lang} crumbs={[{ label: t.title }]} title={t.title} subtitle={t.subtitle} />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 pt-2 md:grid-cols-2">
        {STREAMS.map((s) => (
          <article key={s.key} className="overflow-hidden rounded-[15px] bg-card shadow-[0_5px_25px_rgba(0,0,0,0.16)]">
            <div className="aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${s.embed}`}
                title={t[s.key]}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold text-section dark:text-primary-light">
                  <span className="relative flex size-2.5 shrink-0">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
                  </span>
                  {t[s.key]}
                </h2>
                <p className="text-sm text-navy-2 dark:text-ink-2">{s.key === "makkah" ? t.makkahSrc : t.madinahSrc}</p>
              </div>
              <a
                href={`https://www.youtube.com/channel/${s.channel}/live`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-primary ring-1 ring-primary transition hover:bg-primary hover:text-white"
              >
                <Icon name="play" className="size-4" />
                {t.openYoutube}
              </a>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
