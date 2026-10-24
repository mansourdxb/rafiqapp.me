// Adhkar (Hisn al-Muslim + morning/evening), tasbeeh presets and the 99 Names, from the app's data.
//   src/generated/athkar-<lang>.json  — every category, Arabic text + that language's translation
//   src/generated/athkar-index.json   — category ids, titles (all languages) and sizes, for the grid
//   src/generated/tasbeeh.json        — the app's 15 built-in tasbeeh presets (name/text/virtue per language)
//   src/generated/names.json          — the 99 Names (Arabic, transliteration, meaning/explanation ar+en)
//   public/data/athkar/img/           — the category card illustrations
// Audio stays in the public assets repo; only files that exist there are referenced.
import { copyFileSync, mkdirSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { LOCALES, readJson, writeJson } from "./_lib.mjs";

export default async function (ctx) {
  const client = join(ctx.app, "client");
  const gen = join(ctx.root, "src", "generated");
  const adhkar = readJson(join(client, "assets", "data", "adhkar.json"));
  const tr = readJson(join(client, "assets", "data", "adhkarTranslations.json"));

  // Audio files actually hosted in the assets repo (a missing file on raw.githubusercontent is a 404).
  const audioDir = join(ctx.assets, "azkar", "audio");
  const hosted = new Set(readdirSync(audioDir).filter((f) => f.endsWith(".mp3") && statSync(join(audioDir, f)).size > 2048));
  const audio = (p) => {
    const b = (p || "").split("/").pop();
    return b && hosted.has(b) ? b.replace(/\.mp3$/, "") : undefined;
  };

  let items = 0;
  let withAudio = 0;
  const index = adhkar.map((c) => {
    const t = tr[String(c.id)]?.title ?? {};
    return {
      id: c.id,
      t: Object.fromEntries(LOCALES.map((l) => [l, l === "ar" ? c.category.trim() : t[l] || c.category.trim()])),
      n: c.array.length,
    };
  });

  for (const lang of LOCALES) {
    const out = adhkar.map((c) => {
      const ct = tr[String(c.id)];
      return {
        id: c.id,
        a: audio(c.audio || (c.filename && `${c.filename}.mp3`)),
        items: c.array.map((it) => {
          const t = ct?.items?.[String(it.id)];
          const pick = (f) => (lang !== "ar" && t?.[f]?.[lang]) || it[f] || undefined;
          const a = audio(it.audio || (it.filename && `${it.filename}.mp3`));
          if (lang === "ar") {
            items++;
            if (a) withAudio++;
          }
          return {
            ar: it.text,
            c: it.count || 1,
            tr: lang !== "ar" ? t?.text?.[lang] || undefined : undefined,
            s: pick("subText"),
            r: pick("reference"),
            a,
          };
        }),
      };
    });
    writeJson(join(gen, `athkar-${lang}.json`), out);
  }
  writeJson(join(gen, "athkar-index.json"), index);
  console.log(`  athkar: ${adhkar.length} categories, ${items} adhkar, ${withAudio} with audio`);

  // Card art (only a few small PNGs).
  const img = join(ctx.root, "public", "data", "athkar", "img");
  mkdirSync(img, { recursive: true });
  for (const f of ["azcard_morning.png", "azcard_evening.png", "azcard_after.png", "azcard_sleep.png", "azcard_tasbih.png", "azcard_hisn.png", "hisn_book.png"]) {
    copyFileSync(join(client, "assets", "almosaly", f), join(img, f));
  }

  // Tasbeeh: the built-in presets (id + target from client/types/index.ts DEFAULT_PRESETS, in order).
  const types = readFileSync(join(client, "types", "index.ts"), "utf8");
  const block = types.slice(types.indexOf("DEFAULT_PRESETS"), types.indexOf("];", types.indexOf("DEFAULT_PRESETS")));
  const presets = [...block.matchAll(/id:\s*"([^"]+)"[\s\S]*?target:\s*(\d+)/g)].map((m) => ({ id: m[1], target: Number(m[2]) }));
  const dhikr = readJson(join(client, "data", "tasbeeh-dhikr.json"));
  const fadl = readJson(join(client, "data", "tasbeeh-fadl.json"));
  const tasbeeh = presets
    .filter((p) => dhikr[p.id])
    .map((p) => ({
      id: p.id,
      target: p.target,
      translit: dhikr[p.id].translit,
      name: dhikr[p.id].name,
      text: dhikr[p.id].text,
      fadl: fadl[p.id] ?? {},
    }));
  writeJson(join(gen, "tasbeeh.json"), tasbeeh);
  console.log(`  tasbeeh: ${tasbeeh.length} presets`);

  // 99 Names. The app has meanings/explanations in Arabic and English only (other languages
  // show the English, like the app's AsmaAlHusnaScreen).
  const names = readJson(join(client, "assets", "data", "99names.json")).data.map((n) => ({
    n: n.number,
    ar: n.name,
    tl: n.transliteration,
    // "(3:6)(4:15 8)" → ["3:6", "4:158"] (stray spaces inside the brackets in the source)
    q: [...n.found.matchAll(/\(([^)]*)\)/g)].map((m) => m[1].replace(/\s+/g, "")),
    m: { ar: n.ar.meaning, en: n.en.meaning },
    d: { ar: n.ar.desc, en: n.en.desc.replace(/\\"/g, '"') },
  }));
  writeJson(join(gen, "names.json"), names);
  console.log(`  names: ${names.length}`);
}
