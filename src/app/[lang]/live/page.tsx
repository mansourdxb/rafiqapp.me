import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { live } from "@/i18n/messages/live";
import { alternates } from "@/i18n/metadata";
import { Icon } from "@/components/ui/Icon";

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
      <section className="bg-navy px-4 py-12 text-center text-white">
        <h1 className="flex items-center justify-center gap-3 text-3xl font-extrabold sm:text-4xl">
          <span className="relative flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-red-500" />
          </span>
          {t.title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-white/75">{t.subtitle}</p>
      </section>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2">
        {STREAMS.map((s) => (
          <article key={s.key} className="overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-line">
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
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <h2 className="text-lg font-bold">{t[s.key]}</h2>
                <p className="text-sm text-ink-2">{s.key === "makkah" ? t.makkahSrc : t.madinahSrc}</p>
              </div>
              <a
                href={`https://www.youtube.com/channel/${s.channel}/live`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-tint px-4 py-2 text-sm font-bold text-primary hover:bg-primary hover:text-white"
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
