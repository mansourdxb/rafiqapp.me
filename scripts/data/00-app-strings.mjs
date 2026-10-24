// App strings reused by the site, so names match the app exactly: src/generated/app-strings.json.
// Add a prefix here when a page needs more app wording.
import { join } from "node:path";
import { pickAppStrings, writeJson } from "./_lib.mjs";

export const PREFIXES = ["app.name", "alm.svc.", "tab.", "alm.qibla.", "hijri.", "prayer.", "alm.prayer.", "alm.mid.", "alm.month.", "prayerSettings.", "almSettings.calcMethod", "almSettings.madhabRow", "alm.calendar.", "alm.occasions.", "almMore.occasions", "countdown.", "calendar.", "fasting.whiteDays", "hadith.", "hadithLib.", "hadithSearch.", "quranIndex.", "carplay.ayahCount", "tafsir.book", "quran.translation", "quranUI.", "alm.imsakiya.", "more.imsakiya"];

export default async function (ctx) {
  writeJson(join(ctx.root, "src", "generated", "app-strings.json"), pickAppStrings(ctx, PREFIXES));
}
