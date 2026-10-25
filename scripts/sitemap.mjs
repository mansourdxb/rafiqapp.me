// After `next build`: lists every page of out/ in out/sitemap.xml (with hreflang alternates).
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const SITE = "https://rafiqapp.me";
const LANGS = ["ar", "en", "ur", "fa", "ru", "ms", "tr", "id", "hi", "bn", "ha", "fr"];

function pages(dir, rel = "") {
  const found = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) found.push(...pages(p, `${rel}${name}/`));
    else if (name === "index.html") found.push(rel);
  }
  return found;
}

// Paths under /ar/ stand for the same page in every language.
const paths = pages(join(OUT, "ar"))
  .filter((p) => !/^(login|profile)\//.test(p))
  .sort();
const today = new Date().toISOString().slice(0, 10);
const urls = paths.flatMap((p) =>
  LANGS.map((l) => {
    const alts = LANGS.map((a) => `<xhtml:link rel="alternate" hreflang="${a}" href="${SITE}/${a}/${p}"/>`).join("");
    return `<url><loc>${SITE}/${l}/${p}</loc><lastmod>${today}</lastmod>${alts}<xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/ar/${p}"/></url>`;
  }),
);
urls.push(`<url><loc>${SITE}/privacy.html</loc></url>`);
writeFileSync(
  join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`,
);
console.log(`sitemap: ${urls.length} urls`);
