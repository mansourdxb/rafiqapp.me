// Copies the app's data and strings into this site (public/data, src/generated).
// Run with `npm run data` when the app's content changes; the output is committed, so the
// GitHub Pages build needs nothing outside this repo.
//   APP    = the Rafiq-Al-Muslim app repo   (default ../Rafiq-Al-Muslim)
//   ASSETS = the rafiq-al-muslim-assets repo (default ../rafiq-al-muslim-assets)
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ctx = {
  root,
  app: process.env.APP ?? join(root, "..", "Rafiq-Al-Muslim"),
  assets: process.env.ASSETS ?? join(root, "..", "rafiq-al-muslim-assets"),
};

// One module per feature in scripts/data/, each `export default async (ctx) => {}`.
const only = process.argv.slice(2);
for (const f of readdirSync(join(root, "scripts", "data")).filter((f) => f.endsWith(".mjs") && !f.startsWith("_")).sort()) {
  if (only.length && !only.some((o) => f.includes(o))) continue;
  const mod = await import(pathToFileURL(join(root, "scripts", "data", f)).href);
  await mod.default(ctx);
  console.log("data:", f);
}
