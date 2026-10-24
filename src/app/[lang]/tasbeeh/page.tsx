import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { alternates } from "@/i18n/metadata";
import { tasbeeh } from "@/i18n/messages/tasbeeh";
import { TASBEEH } from "@/lib/athkar/data";
import { Tasbeeh, type Preset } from "@/components/tasbeeh/Tasbeeh";
import { PageHeader } from "@/components/ui/PageHeader";

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
      <PageHeader lang={lang} crumbs={[{ label: t.title }]} title={t.title} subtitle={t.subtitle} />
      <Tasbeeh lang={lang} presets={presets} t={t} />
    </div>
  );
}
