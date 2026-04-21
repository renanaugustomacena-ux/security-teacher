# Security Policy

## Reporting a Vulnerability

- **Contact:** ciupsciups@libero.it (also published in [`.well-known/security.txt`](./.well-known/security.txt)).
- **Preferred languages:** Italian, English.
- **Expected response:** within 7 days.
- **Disclosure window:** 90 days from first contact, or on patch ship — whichever is sooner.

Please do not open public GitHub issues for suspected vulnerabilities. Encrypted mail is welcome but not required; include reproduction steps, affected URL, and a minimal PoC.

## Scope

In scope:

- The live deployed site (primary Netlify origin).
- Optional self-hosted Docker/nginx image in this repo.
- JavaScript client code under `js/`, `vendor/`, and service worker.

Out of scope:

- Upstream Google Identity Services SDK loaded from `accounts.google.com`.
- Third-party lyric / translation APIs (LRCLIB, MyMemory) — we only validate and sanitize their responses; the services themselves are not ours.
- Automated vulnerability scanners reporting header-only "A+/B/C" grading without a concrete exploit path.

## Security Model Snapshot

- **Transport:** HTTPS-only, HSTS preload, upgrade-insecure-requests.
- **CSP:** per-request nonce via Netlify Edge Function (`netlify/edge-functions/csp.ts`), `strict-dynamic`, Trusted Types policy.
- **Auth:** Google Identity Services, client-only validation (iss/aud/iat/exp/nbf + 24 h session cap). No backend.
- **Storage:** progress data in IndexedDB (sanitized on load + null-prototype rebuild). localStorage keeps only a small marker.
- **Third-party code:** Three.js + Google Fonts are self-hosted under `/vendor/` and pinned by sha256 in `vendor/integrity.json`. Only `accounts.google.com` is still fetched cross-origin.
- **Supply chain:** Docker base image pinned by digest; `npm ci` enforces lockfile; husky hooks are local-only scripts.
- **Monitoring:** CSP violation reporter (`netlify/edge-functions/csp-report.ts`) + weekly integrity cron (`netlify/functions/integrity-check.mts`).

## Incident Runbooks

### 1. Rotate the Google OAuth Client ID

1. Open the [Google Cloud Console](https://console.cloud.google.com/) → *APIs & Services* → *Credentials*.
2. Create a new **OAuth 2.0 Client ID** (type: *Web application*).
3. Add the production origin under *Authorized JavaScript origins* (no redirect URIs needed — app uses One-Tap / popup flow).
4. Replace the value of the `google-client-id` meta tag at runtime (Netlify env-injected) or edit `index.html` directly:

   ```html
   <meta name="google-client-id" content="<NEW_CLIENT_ID>" />
   ```

5. Delete the old Client ID from the Cloud Console.
6. Deploy. Signed-in users must re-authenticate — existing cached JWTs will fail the `aud` check in `AuthService._onCredential` and be dropped.

### 2. Force a clean Service Worker state on every client

Use when a malicious SW may have been cached, or when CSP / vendor pins change in a non-additive way.

1. Bump `CACHE_NAME` in `sw.js` (e.g. `kaio-v5` → `kaio-v6`).
2. Append a one-shot purge block at the top of the new `sw.js`:

   ```js
   // One-shot purge block — remove after the next release.
   self.addEventListener('activate', (event) => {
     event.waitUntil((async () => {
       const keys = await caches.keys();
       await Promise.all(keys.map((k) => caches.delete(k)));
       await self.registration.unregister();
       const clients = await self.clients.matchAll({ type: 'window' });
       clients.forEach((c) => c.navigate(c.url));
     })());
   });
   ```

3. Deploy. Every client that visits will receive the new SW, which purges caches and unregisters itself.
4. On the following release, remove the purge block and restore the normal activate handler.

### 3. Revert a compromised vendored asset

1. Verify the live hash:

   ```bash
   curl -s https://<prod>/vendor/three-0.170.0.module.js | sha256sum
   ```

2. Compare to the pin in [`vendor/integrity.json`](./vendor/integrity.json).
3. If different, the attacker has tampered with the deploy or origin. Roll back to a known-good Netlify deploy (Netlify UI → *Deploys* → three-dot menu → *Publish deploy*).
4. Re-pin the asset locally:

   ```bash
   sha256sum vendor/three-0.170.0.module.js
   ```

   Update `vendor/integrity.json` and commit.

### 4. Re-verify a vendored library end-to-end

For Three.js (example):

```bash
# 1. npm registry metadata
curl -s https://registry.npmjs.org/three/0.170.0 | jq '.dist'

# 2. tarball
curl -sLo /tmp/three.tgz https://registry.npmjs.org/three/-/three-0.170.0.tgz
echo "<dist.shasum from step 1>  /tmp/three.tgz" | sha1sum -c

# 3. extracted module
tar -xzf /tmp/three.tgz -C /tmp package/build/three.module.js
sha256sum /tmp/package/build/three.module.js   # should match upstream pin

# 4. our vendored copy, after the header comment is stripped
sed -e '/^\/\*\*$/,/^ \*\//d' vendor/three-0.170.0.module.js | sha256sum
```

### 5. Respond to a CSP violation spike

1. Tail the edge function logs:

   ```bash
   netlify functions:log csp-report --follow
   ```

2. Group reports by `violatedDirective` + `blockedUri`. Repeat hits on a directive we control indicate real attack traffic; hits on a browser extension origin are background noise.
3. If hits are attack traffic, confirm whether the source is an uploaded lyric / translation response or a reflected URL parameter.
4. Rotate any keys that could have been exfiltrated before the CSP caught the attempt.
5. If CSP needs to change, update both `netlify/edge-functions/csp.ts` **and** `nginx.conf` — they must stay in sync.

## Secret Hygiene

- `.env*` files are gitignored and no `.env*` is tracked.
- Google OAuth Client ID is public by design — it is not a secret.
- No API keys, tokens, or private identifiers exist anywhere in the tracked tree (verified via sweep 2026-04-22).
- CI runs `npm audit` at `--audit-level=high`; any high/critical finding fails the build.

## Threat Model Notes

This app has **no backend**. Everything is static + client-side. Consequences:

- There is no session store to invalidate — rotating the Google Client ID is the only way to forcibly re-auth every user.
- Per-user progress lives only in that user's browser. A cross-device sync feature (not in scope today) would move the threat model significantly — revisit this document if it ships.
- Rate-limiting, CAPTCHA, and server-side JWT verification (JWKS + signature check) are intentionally omitted; the only resource an attacker could abuse is Netlify bandwidth, which Netlify already caps.

## Version

This runbook is tied to the 2026-04-22 adamantium hardening pass. Re-evaluate on any of:

- Adding a backend or any form of cloud sync.
- Onboarding a new CDN or third-party SDK.
- Relaxing CSP, Trusted Types, or COOP in any direction.
- Shipping a second deployed domain (Netlify + custom apex) — the runbook paths assume a single origin.
