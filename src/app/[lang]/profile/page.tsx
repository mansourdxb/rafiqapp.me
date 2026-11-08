import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { alternates, social } from "@/i18n/metadata";
import { auth as msgs } from "@/i18n/messages/auth";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProfileView } from "@/components/auth/ProfileView";

export async function generateMetadata({ params }: PageProps<"/[lang]/profile">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = msgs[lang];
  return {
    title: t.profileTitle,
    description: t.profileMeta,
    alternates: alternates(lang, "/profile/"),
    robots: { index: false, follow: true },
    ...social(lang, "/profile/", t.profileTitle, t.profileMeta),
  };
}

export default async function ProfilePage({ params }: PageProps<"/[lang]/profile">) {
  const { lang: l } = await params;
  if (!isLocale(l)) notFound();
  const lang = l as Locale;
  const t = msgs[lang];
  return (
    <>
      <PageHeader lang={lang} crumbs={[{ label: t.profileTitle }]} title={t.profileTitle} />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-2">
        <ProfileView lang={lang} />
      </div>
    </>
  );
}
