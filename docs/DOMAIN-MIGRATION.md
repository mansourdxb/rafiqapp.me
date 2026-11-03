# Domain migration: rafiqapp.me → rafiqalmuslim.org

Code side is done on this branch (canonical, hreflang, sitemap, robots, OG, privacy, footer, CNAME).
**Do not merge/deploy this branch until steps 1–3 are finished**, because the Pages custom domain changes on deploy.
Nothing below is verified until the "Verify" checks pass.

## 1. Cloudflare: new domain
1. Cloudflare → Add a site → `rafiqalmuslim.org` (Free plan).
2. At the registrar, replace the nameservers with the two Cloudflare gives you. Wait until Cloudflare says "Active".
3. DNS records (all **DNS only / grey cloud** until GitHub has issued the certificate):
   - `A  @  185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA @ 2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - `CNAME www  mansourdxb.github.io`
   (These are GitHub Pages' published addresses — confirm against GitHub's "Managing a custom domain for your GitHub Pages site" page before saving.)

## 2. GitHub Pages
Repo Settings → Pages → Custom domain = `rafiqalmuslim.org` → Save → wait for the DNS check → tick **Enforce HTTPS** when it becomes available (certificate can take up to an hour).
Merge this branch to `main` (the workflow deploys; `public/CNAME` already says `rafiqalmuslim.org`).
SSL: GitHub issues and renews the certificate itself. Cloudflare may turn orange-cloud afterwards with SSL mode **Full**.

## 3. Old domain: permanent redirect (Cloudflare)
`rafiqapp.me` stays registered on Cloudflare. After step 2 it can no longer be served by Pages, so redirect at the edge:
1. Keep the existing `rafiqapp.me` and `www` DNS records **proxied (orange cloud)** — the redirect only works while Cloudflare answers.
2. Rules → Redirect Rules → Create rule "old domain to new":
   - If: Hostname **equals** `rafiqapp.me` **or** Hostname **equals** `www.rafiqapp.me`
   - Then: Type **Dynamic**, Expression `concat("https://rafiqalmuslim.org", http.request.uri.path)`, Status **301**, **Preserve query string** ON.
3. SSL/TLS mode for `rafiqapp.me`: Full. Cloudflare's own certificate covers it, so `http://` and `https://` both redirect (keep "Always Use HTTPS" on).
No loop is possible: the target host is a different zone.
Do not remove `rafiqapp.me` from the account or its mail records.

## 4. Email: receiving (Cloudflare Email Routing)
On `rafiqalmuslim.org`: Email → Email Routing → Enable (let it add the MX + SPF records) → Destination addresses: add and **verify** your inbox → Custom addresses:
- `contact@rafiqalmuslim.org` → your inbox
- `support@rafiqalmuslim.org` → your inbox
The old `info@`/`support@rafiqapp.me` routes on `rafiqapp.me` stay as they are.

## 5. Email: sending (Resend)
1. Resend → Domains → Add `rafiqalmuslim.org`.
2. Resend shows the exact DKIM (`resend._domainkey`), SPF and return-path MX/TXT records (on a `send.` subdomain). Copy them into Cloudflare DNS exactly (DNS only), press **Verify**. Do not guess the values.
3. Add DMARC (start in monitor mode): `TXT _dmarc  v=DMARC1; p=none; rua=mailto:contact@rafiqalmuslim.org`.
4. Only after Resend shows **Verified**: in the admin site's Vercel env set `RAFIQ_EMAIL_SENDERS=noreply@rafiqalmuslim.org,support@rafiqalmuslim.org,noreply@rafiqapp.me,info@rafiqapp.me` and `RAFIQ_REPORT_EMAIL=support@rafiqalmuslim.org` (old senders stay as fallback), then redeploy.
5. Send a test mail from the admin Send Email page to Gmail and check headers: SPF=pass, DKIM=pass, DMARC=pass.

## 6. Search engines
1. Search Console → add `rafiqalmuslim.org` as a **Domain** property (DNS TXT verification via Cloudflare). The old `google877990112dc43f1c.html` file only verifies the old site.
2. Submit `https://rafiqalmuslim.org/sitemap.xml`.
3. In the **old** property (`rafiqapp.me`): Settings → **Change of address** → choose the new property → Validate & update (works once the 301s are live).
4. Keep the redirect for at least a year.

## 7. Stores (manual, no new app build needed)
| Field | Value |
|---|---|
| App Store Connect → Marketing URL | `https://rafiqalmuslim.org/` |
| App Store Connect → Support URL | `https://rafiqalmuslim.org/` |
| App Store Connect → Privacy Policy URL (App Privacy) | `https://rafiqalmuslim.org/privacy.html` |
| Play Console → Store settings → Website | `https://rafiqalmuslim.org/` |
| Play Console → Store settings → Email | `support@rafiqalmuslim.org` |
| Play Console → App content → Privacy policy | `https://rafiqalmuslim.org/privacy.html` |
Change these only after step 3 works. Apple and Google accept the change without a binary; the old URLs keep working through the redirect.

## Verify (run after each step)
- `dig +short NS rafiqalmuslim.org` → Cloudflare names
- `curl -sI https://rafiqalmuslim.org/en/` → 200, valid certificate
- `curl -sI "https://rafiqapp.me/en/quran/read/?p=5"` → `301`, `location: https://rafiqalmuslim.org/en/quran/read/?p=5`
- `curl -sI http://rafiqapp.me/privacy.html` → 301 to `https://rafiqalmuslim.org/privacy.html`
- `curl -s https://rafiqalmuslim.org/sitemap.xml | head` and `/robots.txt`
- Send and receive test mails; Resend shows Verified.
