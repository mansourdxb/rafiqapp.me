// User avatar: provider photo → the app's male / female illustration → initials.
/* eslint-disable @next/next/no-img-element -- remote provider photos (Google), static export */
import type { User } from "firebase/auth";

const FACE = "#E79A80";
const LINE = "#E4E4E6";

// Same flat illustrations as the app's profile gender picker (GenderAvatars).
function Male() {
  return (
    <svg viewBox="0 0 100 100" className="size-full" aria-hidden>
      <path d="M50 46 C33 46 20 58 18 80 C17 90 18 100 18 100 L82 100 C82 100 83 90 82 80 C80 58 67 46 50 46 Z" fill="#fff" stroke={LINE} strokeWidth="1.2" />
      <path d="M43 42 h14 v10 h-14 Z" fill={FACE} />
      <ellipse cx="50" cy="34" rx="17" ry="19" fill={FACE} />
      <path d="M32 34 C29 15 44 11 50 11 C56 11 71 15 68 34 C68 34 64 23 50 23 C36 23 32 34 32 34 Z" fill="#2C2A2E" />
    </svg>
  );
}
function Female() {
  return (
    <svg viewBox="0 0 100 100" className="size-full" aria-hidden>
      <path d="M50 48 C34 48 22 60 20 82 C19 92 20 100 20 100 L80 100 C80 100 81 92 80 82 C78 60 66 48 50 48 Z" fill="#fff" stroke={LINE} strokeWidth="1.2" />
      <path d="M50 12 C28 12 20 33 22 55 C23 68 31 78 31 78 L69 78 C69 78 77 68 78 55 C80 33 72 12 50 12 Z" fill="#fff" stroke={LINE} strokeWidth="1.2" />
      <ellipse cx="50" cy="45" rx="15" ry="18" fill={FACE} />
    </svg>
  );
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0] ?? "").slice(0, 2)).toUpperCase();
}

export function displayName(user: User) {
  return user.displayName?.trim() || user.email?.split("@")[0] || "";
}

export function Avatar({
  user,
  photo,
  gender,
  className = "size-10 text-sm",
}: {
  user: User;
  photo?: string | null;
  gender?: "male" | "female" | null;
  className?: string;
}) {
  const src = user.photoURL || photo;
  const base = `relative grid shrink-0 place-items-center overflow-hidden rounded-full ${className}`;
  if (src) return <img src={src} alt="" referrerPolicy="no-referrer" className={`${base} object-cover`} />;
  if (gender)
    return <span className={`${base} ${gender === "male" ? "bg-[#D9EAF7]" : "bg-[#ECEAEC]"}`}>{gender === "male" ? <Male /> : <Female />}</span>;
  return <span className={`${base} bg-primary font-bold text-white`}>{initials(displayName(user)) || "•"}</span>;
}

export function GoogleIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
