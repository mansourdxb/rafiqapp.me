import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { tasbeeh } from "@/i18n/messages/tasbeeh";
import { TASBEEH } from "@/lib/athkar/data";
import { Tasbeeh, type Preset } from "@/components/tasbeeh/Tasbeeh";

export async function generateMetadata({ params }: PageProps<"/[lang]/tasbeeh">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = tasbeeh[lang];
  return { title: t.title, description: t.description, alternates: alternates(lang, "/tasbeeh/") };
}

export default async function TasbeehPage({ params }: PageProps<"/[lang]/tasbeeh">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tasbeeh[lang];
  // Only this language's wording goes to the client.
  const presets: Preset[] = TASBEEH.map((p) => ({
    id: p.id,
    target: p.target,
    ar: p.text.ar,
    name: p.name[lang],
    // Latin-script languages read the transliteration + meaning (like the app's counter)
    translit: lang === "ar" ? undefined : p.translit,
    meaning: lang === "ar" ? undefined : p.text[lang],
    fadl: p.fadl[lang] || p.fadl.ar || undefined,
  }));

  return (
    <div className="pb-16">
      <section className="bg-gradient-to-b from-[#19A9CC] to-[#1492B8] px-4 pt-10 pb-24 text-center text-white dark:from-[#0E5566] dark:to-[#0A3E4B]">
        <h1 className="text-3xl font-bold sm:text-4xl">{t.title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-white/85">{t.subtitle}</p>
      </section>
      <Tasbeeh lang={lang} presets={presets} t={t} />
    </div>
  );
}
