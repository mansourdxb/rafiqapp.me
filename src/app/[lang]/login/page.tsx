import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { alternates, social } from "@/i18n/metadata";
import { auth as msgs } from "@/i18n/messages/auth";
import { PageHeader } from "@/components/ui/PageHeader";
import { LoginForm } from "@/components/auth/LoginForm";

export async function generateMetadata({ params }: PageProps<"/[lang]/login">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = msgs[lang];
  return {
    title: t.loginTitle,
    description: t.loginMeta,
    alternates: alternates(lang, "/login/"),
    robots: { index: false, follow: true },
    ...social(lang, "/login/", t.loginTitle, t.loginMeta),
  };
}

export default async function LoginPage({ params }: PageProps<"/[lang]/login">) {
  const { lang: l } = await params;
  if (!isLocale(l)) notFound();
  const lang = l as Locale;
  const t = msgs[lang];
  return (
    <>
      <PageHeader lang={lang} crumbs={[{ label: t.loginTitle }]} title={t.loginTitle} />
      <div className="px-4 pb-16 pt-2">
        <LoginForm lang={lang} />
      </div>
    </>
  );
}
