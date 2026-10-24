// App strings reused by the site, so names match the app exactly: src/generated/app-strings.json.
// Add a prefix here when a page needs more app wording.
import { join } from "node:path";
import { pickAppStrings, writeJson } from "./_lib.mjs";

export const PREFIXES = ["app.name", "alm.svc.", "tab.", "alm.qibla.", "hijri.", "prayer."];

export default async function (ctx) {
  writeJson(join(ctx.root, "src", "generated", "app-strings.json"), pickAppStrings(ctx, PREFIXES));
}
