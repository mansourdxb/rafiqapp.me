"use client";
// Profile page body: account card (avatar, editable name, email, provider, member since), the
// user's data synced from the app (users/{uid}), and sign out. Signed out → a prompt to log in.
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { localePath, type Locale } from "@/i18n/config";
import { appT } from "@/i18n/app";
import { auth as authMsgs } from "@/i18n/messages/auth";
import { common } from "@/i18n/messages/common";
import { formatGregorian, ymdOf } from "@/lib/calendar/hijri";
import { localDigits } from "@/lib/digits";
import { authErrorMessage, getSyncedData, signOut, updateDisplayName, useAuth, type SyncedData } from "@/lib/auth";
import { Avatar, displayName } from "./Avatar";

const fmtDate = (lang: Locale, v: string | number) => {
  try {
    if (lang === "ha") return formatGregorian(lang, ymdOf(new Date(v)));
    return new Intl.DateTimeFormat(`${lang}-u-nu-${lang === "ar" || lang === "fa" || lang === "ur" ? "arab" : "latn"}`, { year: "numeric", month: "long", day: "numeric" }).format(new Date(v));
  } catch {
    return "";
  }
};

export function ProfileView({ lang }: { lang: Locale }) {
  const t = authMsgs[lang];
  const p = (k: string) => appT(lang, `alm.profile.${k}`);
  const { user, loading } = useAuth();
  const n = (v: number) => localDigits(lang, v);

  // keyed by uid so another account never sees the previous one's figures
  const [loaded, setLoaded] = useState<{ uid: string; data: SyncedData | null; err: boolean } | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const uid = user?.uid;
  useEffect(() => {
    if (!uid) return;
    let alive = true;
    getSyncedData(uid)
      .then((d) => alive && setLoaded({ uid, data: d, err: false }))
      .catch(() => alive && setLoaded({ uid, data: null, err: true }));
    return () => {
      alive = false;
    };
  }, [uid]);

  if (loading)
    return (
      <div className="flex justify-center py-24" aria-busy>
        <span className="inline-block size-8 animate-spin rounded-full border-[3px] border-primary border-e-transparent" />
      </div>
    );

  if (!user)
    return (
      <div className="mx-auto max-w-md rounded-[15px] bg-card px-6 py-10 text-center shadow-[0_5px_25px_rgba(0,0,0,0.16)]">
        <Image src="/logo-512.png" alt={common[lang].siteName} width={84} height={84} className="mx-auto rounded-[20px] shadow-md" />
        <h2 className="mt-5 text-xl font-bold text-section dark:text-primary-light">{t.signedOutTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">{t.signedOutBody}</p>
        <Link
          href={`${localePath(lang, "/login/")}?next=${encodeURIComponent(localePath(lang, "/profile/"))}`}
          className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-primary px-10 font-bold text-white hover:bg-primary-deep"
        >
          {t.loginSignup}
        </Link>
      </div>
    );

  const mine = loaded?.uid === user.uid ? loaded : null;
  const data = mine?.data ?? null;
  const dataErr = !!mine?.err;
  const name = displayName(user);
  const isGoogle = user.providerData.some((x) => x.providerId === "google.com");
  const created = user.metadata.creationTime;

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return setMsg({ ok: false, text: t.nameRequired });
    setSaving(true);
    setMsg(null);
    try {
      await updateDisplayName(draft);
      setEditing(false);
      setMsg({ ok: true, text: t.saved });
    } catch (err) {
      setMsg({ ok: false, text: authErrorMessage(lang, err) ?? "" });
    } finally {
      setSaving(false);
    }
  };

  const stats = data
    ? [
        { key: "deeds", label: p("deedsPts"), val: data.points, icon: "🥇" },
        { key: "badges", label: p("badges"), val: data.badges, icon: "🏅" },
        { key: "khatmas", label: p("khatmaUnit"), val: data.khatmas, icon: "📖" },
        { key: "benefits", label: p("benefitUnit"), val: data.benefits, icon: "💡" },
        { key: "streak", label: t.streak, val: data.streak, icon: "🔥" },
        { key: "days", label: t.activeDays, val: data.activeDays, icon: "📅" },
      ]
    : [];

  return (
    <div className="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)]">
      {/* account card */}
      <section className="h-fit rounded-[15px] bg-card px-6 py-8 text-center shadow-[0_5px_25px_rgba(0,0,0,0.16)]">
        <Avatar user={user} photo={data?.photo} gender={data?.gender} className="mx-auto size-24 text-3xl ring-4 ring-white shadow-md dark:ring-card" />
        {editing ? (
          <form onSubmit={save} className="mt-5 flex flex-col gap-3">
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={60}
              aria-label={p("edit.name")}
              placeholder={p("edit.name")}
              className="h-12 w-full rounded-full bg-white px-5 text-center font-bold text-navy-2 shadow-[0_3px_10px_rgba(124,180,200,0.35)] outline-none ring-2 ring-edge/70 focus:ring-primary dark:bg-canvas dark:text-ink"
            />
            <div className="flex gap-2">
              <button type="submit" disabled={saving} className="h-10 flex-1 rounded-full bg-primary font-bold text-white hover:bg-primary-deep disabled:opacity-60">
                {p("edit.save")}
              </button>
              <button type="button" onClick={() => (setEditing(false), setMsg(null))} className="h-10 flex-1 rounded-full font-bold text-primary ring-1 ring-primary">
                {t.cancel}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4 flex items-center justify-center gap-2">
            <h2 className="truncate text-xl font-bold text-primary">{name || p("member")}</h2>
            <button
              type="button"
              onClick={() => (setDraft(user.displayName ?? ""), setEditing(true), setMsg(null))}
              aria-label={t.editName}
              title={t.editName}
              className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-white hover:bg-primary-deep"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
              </svg>
            </button>
          </div>
        )}
        {msg && <p role={msg.ok ? "status" : "alert"} className={`mt-2 text-sm font-bold ${msg.ok ? "text-[#2E7D32]" : "text-[#C62828]"}`}>{msg.text}</p>}

        <dl className="mt-6 space-y-3 text-start text-sm">
          {user.email && (
            <Row label={t.email}>
              <span dir="ltr" className="[overflow-wrap:anywhere]">{user.email}</span>
            </Row>
          )}
          <Row label={t.provider}>{isGoogle ? t.providerGoogle : t.providerEmail}</Row>
          {created && <Row label={t.memberSince}>{fmtDate(lang, created)}</Row>}
        </dl>

        <button
          type="button"
          onClick={() => signOut()}
          className="mt-7 rounded-full px-8 py-2 text-sm font-bold text-[#E5392F] ring-1 ring-[#E5392F] hover:bg-[#E5392F] hover:text-white"
        >
          {p("signOut")}
        </button>
      </section>

      {/* synced data */}
      <section className="min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-section dark:text-primary-light">{t.syncedTitle}</h2>
          <span className="inline-flex items-center gap-2 rounded-full bg-tint px-3 py-1.5 text-xs font-bold text-section dark:text-primary-light">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 12a9 9 0 0 1-15.5 6.2M3 12A9 9 0 0 1 18.5 5.8M18 2v4h-4M6 22v-4h4" />
            </svg>
            {t.syncedNote}
          </span>
        </div>

        {dataErr ? (
          <p className="mt-6 rounded-xl bg-[#FDECEC] px-4 py-3 text-sm font-bold text-[#C62828]">{t.loadError}</p>
        ) : !data ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="h-[132px] animate-pulse rounded-[15px] bg-tint" />
            ))}
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.key} className="flex flex-col items-center gap-2 rounded-[15px] bg-card px-3 py-5 text-center shadow-[0_5px_25px_rgba(0,0,0,0.12)]">
                  <span className="text-3xl" aria-hidden>{s.icon}</span>
                  <span className="text-xs font-bold text-ink-2">{s.label}</span>
                  <span className="text-2xl font-bold text-primary">{n(s.val)}</span>
                </div>
              ))}
            </div>
            {!data.exists && <p className="mt-5 rounded-md bg-tint px-4 py-3 text-sm font-bold text-navy-2 dark:text-ink">{t.noData}</p>}
            {data.exists && data.updatedAt && (
              <p className="mt-4 text-xs text-ink-2">
                {t.lastSync}: {fmtDate(lang, data.updatedAt)}
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl bg-white px-4 py-3 dark:bg-canvas">
      <dt className="text-xs font-bold text-ink-2">{label}</dt>
      <dd className="mt-0.5 font-bold text-navy-2 dark:text-ink">{children}</dd>
    </div>
  );
}
