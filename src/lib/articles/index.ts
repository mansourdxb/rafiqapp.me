// Articles library: the app's reviewed content (scripts/data/50-articles.mjs), one JSON per language.
// Server-only: pages pass the slices a client component needs, so the library never ships whole.
import ar from "@/generated/articles-ar.json";
import en from "@/generated/articles-en.json";
import ur from "@/generated/articles-ur.json";
import fa from "@/generated/articles-fa.json";
import ru from "@/generated/articles-ru.json";
import ms from "@/generated/articles-ms.json";
import tr from "@/generated/articles-tr.json";
import id from "@/generated/articles-id.json";
import hi from "@/generated/articles-hi.json";
import bn from "@/generated/articles-bn.json";
import { localePath, type Locale } from "@/i18n/config";
import { articles as msgs, type CategoryId } from "@/i18n/messages/articles";

/** Body blocks: p = paragraph, h = numbered step heading, ar = Arabic recitation (verbatim), mean = meaning, src = source. */
export type Block =
  | { k: "p"; v: string }
  | { k: "h"; v: string; n: number }
  | { k: "ar"; v: string; l?: string; n?: number }
  | { k: "mean"; v: string }
  | { k: "src"; v: string };

/** c = category, s = slug, t = title, k = kicker, x = excerpt, m = minutes to read, b = body. */
export type Article = { c: CategoryId; s: string; t: string; k?: string; x: string; m: number; b: Block[] };
type Library = { categories: { id: CategoryId; name?: string; n: number }[]; articles: Article[] };

const DATA = { ar, en, ur, fa, ru, ms, tr, id, hi, bn } as unknown as Record<Locale, Library>;

export const CATEGORY_IDS: CategoryId[] = ["seerah", "prophets", "fiqh", "hajj", "prayer", "duas", "ruqyah", "tajweed"];
export const isCategory = (v: string): v is CategoryId => (CATEGORY_IDS as string[]).includes(v);

export const allArticles = (lang: Locale) => DATA[lang].articles;
export const categoryArticles = (lang: Locale, cat: CategoryId) => DATA[lang].articles.filter((a) => a.c === cat);
export const getArticle = (lang: Locale, cat: string, slug: string) => DATA[lang].articles.find((a) => a.c === cat && a.s === slug);
export const categoryCount = (lang: Locale, cat: CategoryId) => DATA[lang].categories.find((c) => c.id === cat)?.n ?? 0;

/** Category name: the app's own wording where the app has one, else the site's. */
export function categoryName(lang: Locale, cat: CategoryId) {
  const fromApp = DATA[lang].categories.find((c) => c.id === cat)?.name;
  return fromApp ?? (cat === "fiqh" || cat === "duas" ? msgs[lang].cat[cat] : cat);
}

export const articlesPath = (lang: Locale) => localePath(lang, "/articles/");
export const categoryPath = (lang: Locale, cat: CategoryId) => localePath(lang, `/articles/${cat}/`);
export const articlePath = (lang: Locale, a: Pick<Article, "c" | "s">) => localePath(lang, `/articles/${a.c}/${a.s}/`);

export type ArticleCardData = {
  title: string;
  excerpt: string;
  href: string;
  category: CategoryId;
  categoryName: string;
  minutes?: number;
  id?: string;
};

export function toCard(lang: Locale, a: Article): ArticleCardData {
  return { title: a.t, excerpt: a.x, href: articlePath(lang, a), category: a.c, categoryName: categoryName(lang, a.c), minutes: a.m, id: `${a.c}/${a.s}` };
}

// A varied pick: one article per category in turn, starting from each category's newest-looking end.
const RECENT_ORDER: [CategoryId, number][] = [
  ["seerah", 7],
  ["duas", 1],
  ["tajweed", 2],
  ["prophets", 10],
  ["prayer", 0],
  ["ruqyah", 4],
  ["fiqh", 1],
  ["hajj", 1],
  ["seerah", 12],
  ["prophets", 13],
  ["duas", 7],
  ["tajweed", 9],
];

/** Cards for the home page / "Recent articles": a varied set across categories. */
export function latestArticles(lang: Locale, n: number): ArticleCardData[] {
  const out: ArticleCardData[] = [];
  for (const [cat, i] of RECENT_ORDER) {
    const a = categoryArticles(lang, cat)[i];
    if (a) out.push(toCard(lang, a));
    if (out.length >= n) break;
  }
  return out;
}

// "Most read": a curated order (the site has no view counts and shows none).
const MOST_READ: [CategoryId, string][] = [
  ["prayer", "prayer-salah"],
  ["ruqyah", "ayat-al-kursi"],
  ["hajj", "umrah"],
  ["duas", "the-istikharah-dua"],
  ["prophets", "yusuf-joseph"],
  ["seerah", "the-migration-to-medina"],
];

export function mostRead(lang: Locale, n = MOST_READ.length): ArticleCardData[] {
  return MOST_READ.map(([c, s]) => getArticle(lang, c, s))
    .filter((a): a is Article => !!a)
    .slice(0, n)
    .map((a) => toCard(lang, a));
}

/** Neighbours in the same category (next ones first, wrapping), then other categories. */
export function relatedArticles(lang: Locale, a: Article, n = 3): ArticleCardData[] {
  const same = categoryArticles(lang, a.c);
  const i = same.findIndex((x) => x.s === a.s);
  const rotated = [...same.slice(i + 1), ...same.slice(0, i)];
  const picks = rotated.slice(0, n);
  if (picks.length < n) picks.push(...mostRead(lang).map((c) => getArticle(lang, c.category, c.id!.split("/")[1])!).filter((x) => x.s !== a.s && x.c !== a.c).slice(0, n - picks.length));
  return picks.map((x) => toCard(lang, x));
}

/** Previous / next article in the category, for in-series reading (seerah chapters, steps…). */
export function siblings(lang: Locale, a: Article) {
  const same = categoryArticles(lang, a.c);
  const i = same.findIndex((x) => x.s === a.s);
  return { prev: i > 0 ? same[i - 1] : undefined, next: i < same.length - 1 ? same[i + 1] : undefined };
}

/** Title index for the client-side search box (small: title + href + category). */
export function searchIndex(lang: Locale) {
  return allArticles(lang).map((a) => ({ t: a.t, h: articlePath(lang, a), c: categoryName(lang, a.c) }));
}
