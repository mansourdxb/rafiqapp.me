// Reads the app's per-user cloud-sync document users/{uid} (written by the app's cloudSync.ts,
// owner-only rules). Read-only here except the profile name (see auth.ts).
import { loadFirestore } from "./firebase";

export type SyncedData = {
  exists: boolean;
  /** نقاط طاعاتك — taat.totalPoints */
  points: number;
  /** الأوسمة — medals from points (same thresholds as the app's profileStatsCore) */
  badges: number;
  streak: number;
  /** days with at least one deed done */
  activeDays: number;
  khatmas: number;
  benefits: number;
  gender: "male" | "female" | null;
  photo: string | null;
  updatedAt: number | null;
};

// Must match the app's MEDAL_THRESHOLDS (client/src/lib/profileStatsCore.ts).
const MEDAL_THRESHOLDS = [5, 100, 250, 500];

type Raw = {
  taat?: { totalPoints?: number; streak?: number; days?: Record<string, { done?: string[] }> };
  khatmaCompleted?: number;
  benefits?: unknown[];
  profile?: { gender?: string | null; photo?: string | null };
  updatedAt?: number;
};

export async function getSyncedData(uid: string): Promise<SyncedData> {
  const { db, fsMod } = await loadFirestore();
  const snap = await fsMod.getDoc(fsMod.doc(db, "users", uid));
  const d = (snap.exists() ? snap.data() : {}) as Raw;
  const points = Number(d.taat?.totalPoints) || 0;
  const activeDays = Object.values(d.taat?.days ?? {}).filter((x) => (x?.done ?? []).length > 0).length;
  const g = d.profile?.gender;
  const photo = d.profile?.photo;
  return {
    exists: snap.exists() && (d.taat !== undefined || d.khatmaCompleted !== undefined || d.benefits !== undefined),
    points,
    badges: MEDAL_THRESHOLDS.filter((th) => points >= th).length,
    streak: Number(d.taat?.streak) || 0,
    activeDays,
    khatmas: Number(d.khatmaCompleted) || 0,
    benefits: Array.isArray(d.benefits) ? d.benefits.length : 0,
    gender: g === "male" || g === "female" ? g : null,
    // the app may store a local file:// photo — only web URLs are usable here
    photo: typeof photo === "string" && /^https:\/\//.test(photo) ? photo : null,
    updatedAt: typeof d.updatedAt === "number" ? d.updatedAt : null,
  };
}
