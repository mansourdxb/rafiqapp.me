# rafiqapp.me

Website of **Rafiq Al-Muslim (رفيق المسلم)** — Next.js static site in 9 languages, published to GitHub Pages.

- `npm run dev` — local dev server
- `npm run data` — refresh data and strings from the app repo (`../Rafiq-Al-Muslim`) and the assets repo
  (`../rafiq-al-muslim-assets`); output is committed
- `npm run build` — static export to `out/`
- Push to `main` → `.github/workflows/deploy.yml` builds and deploys.

`public/privacy.html` is the app's privacy policy (linked from the stores) — keep its URL.
