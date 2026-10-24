// Articles library + FAQ, built from the app's reviewed content (client/data/*.json):
//   src/generated/articles-<lang>.json — categories + every article (title, excerpt, body blocks) in that language
//   src/generated/faq-<lang>.json      — the app's FAQ (q + steps) in that language
// Text is taken exactly as the app shows it: translations from the *Translations.json files, falling
// back to the Arabic source like the app's kidsContentText/duaText helpers. Arabic religious text
// (Qur'an, duas, recitations, tajweed examples) is copied verbatim.
// Not used on purpose: fawaid.json (unreviewed drafts), onThisDay.json (temporary), and the women's
// fiqh section (the app's new design doesn't show it).
import { join } from "node:path";
import { LOCALES, appI18n, readJson, writeJson } from "./_lib.mjs";

// Category order = order of the chips on the site. `key` = app string for the name (null → site message).
export const CATEGORIES = [
  { id: "seerah", key: "more.seerah" },
  { id: "prophets", key: "more.prophets" },
  { id: "fiqh", key: null },
  { id: "hajj", key: "more.hajj" },
  { id: "prayer", key: "more.howtopray" },
  { id: "duas", key: null },
  { id: "ruqyah", key: "more.ruqyah" },
  { id: "tajweed", key: "more.tajweed" },
];

const EASTERN = "٠١٢٣٤٥٦٧٨٩";
const digits = (lang, v) => (["ar", "fa", "ur"].includes(lang) ? String(v).replace(/[0-9]/g, (d) => EASTERN[d]) : String(v));

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[‘’'ʿʾ`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function (ctx) {
  const data = join(ctx.app, "client", "data");
  const J = (f) => readJson(join(data, f));
  const seerah = J("seerah.json").chapters;
  const seerahT = J("seerahTranslations.json");
  const prophets = J("prophets.json").prophets;
  const prophetsT = J("prophetsTranslations.json");
  const fiqh = J("fiqh.json");
  const fiqhT = J("fiqhTranslations.json");
  const hajj = J("hajj.json").steps;
  const hajjT = J("hajjTranslations.json");
  const pray = J("howtopray.json").steps;
  const prayT = J("howtoprayTranslations.json");
  const duas = J("duas.json");
  const duaT = J("duaTranslations.json");
  const duaM = J("duaMeanings.json");
  const ruqyah = J("ruqyah.json").items;
  const tajweed = J("tajweed.json").rules;
  const tajweedT = J("tajweedTranslations.json");
  const faq = J("faq.json").items;
  const surahs = readJson(join(ctx.root, "src", "generated", "quran-surahs.json"));

  // Same rule as the app: Arabic UI → Arabic source; otherwise the translation, else the Arabic.
  const pick = (entry, lang, ar) => (lang === "ar" ? ar : entry?.[lang] ?? ar);

  const surahName = (n, lang, fb) => {
    const s = surahs.find((x) => x.n === n);
    if (!s) return fb;
    if (lang === "en" || lang === "ms") return s.lat;
    return s.names?.[lang] || s.ar;
  };
  // Qur'an citation "<سورة> 2:30-37" → localized, like duaText.duaRef; anything else stays as written.
  const quranRef = (ref, lang) => {
    if (lang === "ar") return ref;
    const m = /(\d+):([\d-]+)$/.exec(ref);
    if (!m) return ref;
    const ayahs = m[2].split("-").map((p) => digits(lang, p)).join("-");
    return `${surahName(Number(m[1]), lang, ref)} ${digits(lang, m[1])}:${ayahs}`;
  };
  const duaRef = (ref, lang) => {
    if (!ref) return "";
    const known = duaT.refs[ref];
    if (known || lang === "ar") return pick(known, lang, ref);
    return quranRef(ref, lang);
  };
  const multiRef = (refs, lang) =>
    refs
      .split("؛")
      .map((r) => quranRef(r.trim(), lang))
      .join(["ar", "ur", "fa"].includes(lang) ? "؛ " : "; ");

  // Dua meaning keys: "<cat>:<index within category>" over the whole array (duaText.buildDuaMeaningIndex).
  const seen = {};
  const duaKeyed = duas.duas.map((d) => {
    const i = seen[d.cat] ?? 0;
    seen[d.cat] = i + 1;
    return { ...d, key: `${d.cat}:${i}` };
  });

  // Slugs come from the English titles so every language shares one URL.
  const used = new Set();
  const slug = (base) => {
    let s = slugify(base) || "article";
    while (used.has(s)) s += "-2";
    used.add(s);
    return s;
  };
  const prophetSlug = (en) => en.replace(/,?\s*peace be upon (him|them).*$/i, "");

  // Language-independent skeletons; each one renders per language.
  const defs = [];
  for (const c of seerah) {
    const T = seerahT[String(c.id)];
    defs.push({
      cat: "seerah",
      slug: slug(T?.title?.en ?? `seerah-${c.id}`),
      render: (lang) => ({
        t: pick(T?.title, lang, c.title_ar),
        k: pick(T?.period, lang, c.period_ar),
        b: [{ k: "p", v: pick(T?.content, lang, c.content_ar) }],
      }),
    });
  }
  for (const p of prophets) {
    const T = prophetsT[String(p.id)];
    defs.push({
      cat: "prophets",
      slug: slug(prophetSlug(T?.name?.en ?? `prophet-${p.id}`)),
      render: (lang) => ({
        t: pick(T?.name, lang, p.name_ar),
        b: [{ k: "p", v: pick(T?.summary, lang, p.summary_ar) }, ...(p.refs ? [{ k: "src", v: multiRef(p.refs, lang) }] : [])],
      }),
    });
  }
  for (const section of ["pillars", "udhiyah"]) {
    fiqh[section].forEach((x, i) => {
      const T = fiqhT[section]?.[String(i)];
      defs.push({
        cat: "fiqh",
        slug: slug(T?.title?.en ?? `${section}-${i + 1}`),
        render: (lang, app) => ({
          t: pick(T?.title, lang, x.title_ar),
          k: app(`more.${section}`),
          b: [{ k: "p", v: pick(T?.body, lang, x.body_ar) }, ...(x.ref ? [{ k: "src", v: x.ref }] : [])],
        }),
      });
    });
  }
  // Hajj & Umrah, How to pray: one article per phase, its steps in order.
  const phased = (cat, steps, T, recitedField) => {
    const phases = [...new Set(steps.map((s) => s.phase_ar))];
    for (const ph of phases) {
      const idx = steps.map((s, i) => i).filter((i) => steps[i].phase_ar === ph);
      defs.push({
        cat,
        slug: slug(T[String(idx[0])]?.phase?.en ?? `${cat}-${ph}`),
        render: (lang, app) => ({
          t: pick(T[String(idx[0])]?.phase, lang, ph),
          b: idx.flatMap((i, n) => {
            const s = steps[i];
            const st = T[String(i)];
            const out = [
              { k: "h", n: n + 1, v: pick(st?.title, lang, s.title_ar) },
              { k: "p", v: pick(st?.desc, lang, s.desc_ar) },
            ];
            if (s[recitedField]) out.push({ k: "ar", l: app("more.recited"), v: s[recitedField] });
            return out;
          }),
        }),
      });
    }
  };
  phased("hajj", hajj, hajjT, "dua_ar");
  phased("prayer", pray, prayT, "recited_ar");
  for (const c of duas.categories) {
    const items = duaKeyed.filter((d) => d.cat === c.id);
    defs.push({
      cat: "duas",
      slug: slug(duaT.categories[c.id]?.en ?? c.id),
      render: (lang) => ({
        t: pick(duaT.categories[c.id], lang, c.ar),
        b: items.flatMap((d, n) => {
          const out = [{ k: "ar", n: n + 1, v: d.arabic }];
          const meaning = lang === "ar" ? "" : duaM.duas[d.key]?.[lang] ?? "";
          if (meaning) out.push({ k: "mean", v: meaning });
          if (d.ref) out.push({ k: "src", v: duaRef(d.ref, lang) });
          return out;
        }),
      }),
    });
  }
  for (const r of ruqyah) {
    defs.push({
      cat: "ruqyah",
      slug: slug(duaT.ruqyahTitles[r.id]?.en ?? r.id),
      render: (lang) => {
        const meaning = lang === "ar" ? "" : duaM.ruqyah[r.id]?.[lang] ?? "";
        return {
          t: pick(duaT.ruqyahTitles[r.id], lang, r.title_ar),
          b: [{ k: "ar", v: r.arabic }, ...(meaning ? [{ k: "mean", v: meaning }] : []), ...(r.ref ? [{ k: "src", v: duaRef(r.ref, lang) }] : [])],
        };
      },
    });
  }
  tajweed.forEach((r, i) => {
    const T = tajweedT[String(i)];
    defs.push({
      cat: "tajweed",
      slug: slug(T?.title?.en ?? `tajweed-${i + 1}`),
      render: (lang, app) => ({
        t: pick(T?.title, lang, r.title_ar),
        b: [
          { k: "p", v: pick(T?.body, lang, r.body_ar) },
          ...(r.example_ar ? [{ k: "ar", l: app("tajweed.example"), v: r.example_ar }] : []),
          ...(r.ref ? [{ k: "src", v: r.ref }] : []),
        ],
      }),
    });
  });

  const words = (s) => s.split(/\s+/).filter(Boolean).length;
  const excerptOf = (lang, blocks) => {
    const src = blocks.find((b) => b.k === "p") ?? (lang === "ar" ? null : blocks.find((b) => b.k === "mean")) ?? blocks.find((b) => b.k === "ar");
    const s = (src?.v ?? "").replace(/\s+/g, " ").trim();
    if (s.length <= 170) return s;
    const cut = s.slice(0, 170);
    const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("۔ "), cut.lastIndexOf("। "));
    if (end > 90) return cut.slice(0, end + 1);
    const sp = cut.lastIndexOf(" ");
    return `${cut.slice(0, sp > 100 ? sp : 170).replace(/[\s,،.؛;:]+$/, "")}…`;
  };

  const counts = {};
  for (const lang of LOCALES) {
    const strings = appI18n(ctx, lang);
    const en = appI18n(ctx, "en");
    const app = (k) => strings[k] ?? en[k] ?? k;
    const articles = defs.map((d) => {
      const r = d.render(lang, app);
      const w = r.b.reduce((n, b) => n + words(b.v), 0);
      return { c: d.cat, s: d.slug, t: r.t, ...(r.k ? { k: r.k } : {}), x: excerptOf(lang, r.b), m: Math.max(1, Math.round(w / 180)), b: r.b };
    });
    const categories = CATEGORIES.map((c) => ({ id: c.id, ...(c.key ? { name: app(c.key) } : {}), n: articles.filter((a) => a.c === c.id).length }));
    writeJson(join(ctx.root, "src", "generated", `articles-${lang}.json`), { categories, articles });
    writeJson(join(ctx.root, "src", "generated", `faq-${lang}.json`), {
      title: app("alm.faq.title"),
      items: faq.map((f) => ({ id: f.id, q: f.q[lang] ?? f.q.en, steps: f.steps[lang] ?? f.steps.en })),
    });
    counts[lang] = articles.length;
  }
  console.log("articles:", Object.fromEntries(CATEGORIES.map((c) => [c.id, defs.filter((d) => d.cat === c.id).length])), "per language:", counts[LOCALES[0]], "faq:", faq.length);
}
