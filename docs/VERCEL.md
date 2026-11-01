# Moving rafiqapp.me from GitHub Pages to Vercel

The site is a Next.js static export (`output: "export"` in `next.config.ts`). Everything the build needs
is committed: `src/generated/` and `public/data/` are written by `npm run data` from the app and assets
repos, and that step is **not** part of `npm run build`. A clean clone builds on its own, so Vercel needs
nothing outside this repo.

`vercel.json` pins the settings:

| Setting | Value |
| --- | --- |
| Framework | Next.js |
| Install command | `npm ci` |
| Build command | `npm run build` (= `next build` + `scripts/trim-out.mjs` + `scripts/sitemap.mjs`; no data step) |
| Output | `out/` — Vercel picks it up automatically for `output: "export"`, so no output directory is set |
| Trailing slashes | `trailingSlash: true`, same as `next.config.ts` (`/en` → `/en/`) |

`public/CNAME` and `.github/workflows/deploy.yml` are left as they are, so GitHub Pages keeps working until
you switch it off (step 5).

## 1. Import the repo

1. Sign in at https://vercel.com with the GitHub account that owns `mansourdxb/rafiqapp.me`.
2. **Add New… → Project → Import Git Repository** → pick `rafiqapp.me` (grant the Vercel GitHub app access
   to that repo if asked).
3. On the configure screen:
   - Framework Preset: **Next.js** (read from `vercel.json`).
   - Root Directory: `./`
   - Build / Install commands: leave the defaults — `vercel.json` overrides them.
   - Environment variables: none. (The Firebase web config is in the source, as on GitHub Pages.)
4. **Settings → General → Node.js Version: 22.x** (the GitHub Actions build uses Node 22).
5. **Deploy.** The first build takes several minutes (thousands of static pages in 16 languages).
6. Open the `*.vercel.app` preview URL and check: `/` redirects to a language, `/ar/`, `/pa/`, `/pnb/`,
   `/en/quran/read/`, `/privacy.html`, `/sitemap.xml`, and a missing page (e.g. `/en/nope/`) shows the site's 404.

Production branch: `main` (Settings → Git). Every pull request also gets its own preview URL.

## 2. Add the domain

**Settings → Domains → Add**:

1. `rafiqapp.me` — production.
2. `www.rafiqapp.me` — Vercel offers to redirect it to `rafiqapp.me`; accept.

Vercel then shows the exact DNS records it expects. Use the values it shows; at the time of writing they are:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `76.76.21.21` (newer projects may be shown `216.198.79.1` — use what Vercel shows) |
| CNAME | `www` | `cname.vercel-dns.com` (or the project-specific `…vercel-dns-0xx.com` Vercel shows) |

## 3. Change DNS at the registrar

At the registrar's DNS panel for `rafiqapp.me`:

1. **Delete** the GitHub Pages records:
   - A `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - AAAA `@` → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` (if present)
   - CNAME `www` → `mansourdxb.github.io` (if present)
2. **Add** the Vercel records from step 2.
3. Keep every other record as it is (MX/mail, TXT such as Google Search Console verification, etc.).
   `public/google877990112dc43f1c.html` is deployed on Vercel too, so the file-based Search Console
   verification keeps working.
4. Wait for Vercel's Domains page to show both domains as **Valid Configuration**; it then issues the HTTPS
   certificate by itself (minutes to a few hours, depending on the old records' TTL).

If you prefer Vercel to run the whole DNS zone, set the registrar's nameservers to `ns1.vercel-dns.com` and
`ns2.vercel-dns.com` instead, and re-create the mail/TXT records in Vercel first.

## 4. Check the live site

- `https://rafiqapp.me/` opens the saved/browser language; `http://` goes to `https://`.
- `/pa/` is `<html lang="pa-Guru" dir="ltr">`, `/pnb/` is `<html lang="pa-Arab" dir="rtl">`.
- `/privacy.html` loads (it is linked from the app stores — it must keep this exact URL).
- Search Console: resubmit `https://rafiqapp.me/sitemap.xml`.

## 5. Switch off GitHub Pages (after the domain works on Vercel)

1. GitHub repo → **Settings → Pages** → under *Custom domain* click **Remove**, then set *Source* to
   **None** / unpublish the site.
2. Stop the deploy job: **Actions → Deploy site → ⋯ → Disable workflow** (or delete
   `.github/workflows/deploy.yml` in a later commit).
3. `public/CNAME` can then be deleted in a later commit; Vercel ignores it.

Order matters: changing DNS first and removing the GitHub custom domain afterwards avoids downtime.

## Differences between GitHub Pages and Vercel

- **Size limit.** GitHub Pages refuses sites over 1 GB; `scripts/trim-out.mjs` exists only to stay under it.
  Vercel has no such per-site cap for static output, so the trim step is harmless but no longer required.
  (Check the current Vercel plan limits — Hobby is for non-commercial use; the free, ad-free site fits that,
  but it is your call.)
- **Trailing slashes.** Both serve `out/<path>/index.html` at `/<path>/`. GitHub Pages redirects `/en` → `/en/`
  on its own; on Vercel `trailingSlash: true` in `vercel.json` does it (308 redirect). Files with an extension
  (`/privacy.html`, `/sitemap.xml`, `/data/...json`) should be served as they are, without a slash — confirm
  `/privacy.html` on the preview URL (step 1.6) before changing DNS.
- **404 page.** Both serve `out/404.html` for unknown paths.
- **`privacy.html` and `App/`.** Plain files in `public/`, served the same on both hosts.
- **HTTP → HTTPS.** GitHub Pages needed the in-page redirect in `public/index.html` and the layout script;
  Vercel redirects to HTTPS itself. The scripts stay (they do nothing on HTTPS).
- **Caching.** Vercel's CDN caches static files and purges on every deploy; no `max-age=600` limit as on Pages.
- **Deploys.** Pushes to `main` deploy on Vercel automatically; while the GitHub workflow is still enabled,
  both hosts deploy each push, which is fine.
