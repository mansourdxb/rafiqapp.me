// After `next build`: writes out/sitemap.xml as a sitemap index, with one sitemap per language
// (out/sitemap-<lang>.xml) and one for the pages outside the language folders (out/sitemap-pages.xml).
// Each URL's hreflang alternates are copied from the page's own <head>, so the sitemap always says what the HTML says.
// No <lastmod>: the static export has no real per-page modification date (the build date would be wrong for most pages).
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const SITE = "https://rafiqalmuslim.org";
const LANGS = ["ar", "en", "ur", "fa", "ru", "ms", "tr", "id", "hi", "bn", "ha", "fr", "zh", "ps", "pa", "pnb", "uz", "uz-Cyrl", "so", "sw", "ku-Arab", "ku-Latn", "ml", "de", "es", "az-Latn", "om", "am", "kk-Cyrl", "ta", "gu", "my"]; // src/i18n/config.ts locales
const MAX_BYTES = 50 * 1024 * 1024; // Google's limits for one sitemap
const MAX_URLS = 50000;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function pages(dir, rel = "") {
  const found = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) found.push(...pages(p, `${rel}${name}/`));
    else if (name === "index.html") found.push(rel);
  }
  return found;
}

/** canonical, robots and hreflang links from a built page's <head>. */
function head(file) {
  const html = readFileSync(file, "utf8");
  const h = html.slice(0, html.indexOf("</head>"));
  const canonical = h.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(h);
  const alts = [...h.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]);
  return { canonical, noindex, alts };
}

function urlset(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`;
}

function write(name, xml, count) {
  const bytes = Buffer.byteLength(xml);
  if (bytes > MAX_BYTES || count > MAX_URLS) throw new Error(`${name}: ${count} urls, ${bytes} bytes — over Google's sitemap limits`);
  writeFileSync(join(OUT, name), xml);
  return bytes;
}

const files = [];
let total = 0;
let biggest = 0;
for (const lang of LANGS) {
  const urls = [];
  for (const p of pages(join(OUT, lang)).sort()) {
    const loc = `${SITE}/${lang}/${p}`;
    const { canonical, noindex, alts } = head(join(OUT, lang, p, "index.html"));
    if (noindex) continue;
    if (canonical !== loc) throw new Error(`${loc}: canonical is ${canonical}`);
    const links = alts.map(([hl, href]) => `<xhtml:link rel="alternate" hreflang="${esc(hl)}" href="${esc(href)}"/>`).join("");
    urls.push(`<url><loc>${esc(loc)}</loc>${links}</url>`);
  }
  const name = `sitemap-${lang}.xml`;
  biggest = Math.max(biggest, write(name, urlset(urls), urls.length));
  files.push(name);
  total += urls.length;
}

// The site root (language picker, x-default of the home pages) and the privacy policy (one page for every language).
const extra = [`${SITE}/`, `${SITE}/privacy.html`].map((u) => `<url><loc>${u}</loc></url>`);
write("sitemap-pages.xml", urlset(extra), extra.length);
files.push("sitemap-pages.xml");
total += extra.length;

write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${files.map((f) => `<sitemap><loc>${SITE}/${f}</loc></sitemap>`).join("\n")}\n</sitemapindex>\n`,
  files.length,
);
console.log(`sitemap: index of ${files.length} sitemaps, ${total} urls, largest ${(biggest / 1e6).toFixed(1)} MB`);
