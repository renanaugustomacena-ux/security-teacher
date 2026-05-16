# Security Policy

## Reporting a Vulnerability

- **Contact:** renanaugustomacena@gmail.com (also published in [`.well-known/security.txt`](./.well-known/security.txt)).
- **Preferred languages:** Italian, English.
- **Expected response:** within 7 days.
- **Disclosure window:** 90 days from first contact, or on patch ship — whichever is sooner.

Please do not open public GitHub issues for suspected vulnerabilities. Encrypted mail is welcome but not required; include reproduction steps, affected URL, and a minimal PoC.

## Scope

In scope:

- The live deployed site (primary GitHub Pages origin: `https://renanaugustomacena-ux.github.io/security-teacher/`).
- Optional self-hosted Docker/nginx image in this repo (see `nginx.conf`, `Dockerfile`, `docker-compose.yml`).
- JavaScript client code under `js/`, `vendor/`, and the service worker (`sw.js`).
- The static SPA fallback (`404.html`) and the inline scripts in `index.html`.

Out of scope:

- Upstream Google Identity Services SDK loaded from `accounts.google.com`.
- Third-party lyric / translation APIs (LRCLIB, MyMemory) — we only validate and sanitize their responses; the services themselves are not ours.
- Automated vulnerability scanners reporting header-only "A+/B/C" grading without a concrete exploit path.

## Security Model Snapshot

- **Transport:** HTTPS-only, provided by GitHub Pages. Static `<meta>` referrer policy `no-referrer`. HSTS is honoured because GH Pages serves `Strict-Transport-Security` itself.
- **CSP:** static `<meta http-equiv="Content-Security-Policy">` shipped in `index.html` and `404.html`. SHA-256 hashes pin the inline scripts (Trusted Types policy, importmap, SPA decoder, 404 redirector). The `nginx.conf` header mirrors the meta tag byte-for-byte (CI gate enforces parity). See [`DOCTRINE.md` §3](./DOCTRINE.md).
- **Trusted Types:** `default` policy refuses string-based script creation; script URLs limited to same-origin + `accounts.google.com`.
- **Auth:** Google Identity Services, client-only validation (iss/aud/iat/exp/nbf + 24 h session cap). No backend.
- **Storage:** progress data in IndexedDB (sanitized on load + null-prototype rebuild). localStorage keeps only a small marker.
- **Third-party code:** Three.js + Google Fonts are self-hosted under `/vendor/` and pinned by sha256 in `vendor/integrity.json`. Only `accounts.google.com` is still fetched cross-origin.
- **Supply chain:** Docker base image pinned by digest; `npm ci` enforces lockfile; husky hooks are local-only scripts; `npm audit --audit-level=high` runs in CI.
- **Monitoring:** Weekly integrity workflow (`.github/workflows/integrity.yml`) re-hashes vendored assets in production and asserts the meta CSP / X-Frame-Options / referrer tags are still present. Drift opens a `security:integrity` issue.

## Deploy Surface

There is exactly one **primary** production deploy: GitHub Pages, served from the `master` branch via `.github/workflows/deploy.yml`. The `pages` GitHub Environment is the only environment with deploy permissions. PAT-based pushes to `gh-pages` are forbidden by doctrine.

Two **alternative** deploys are kept usable for local development and self-hosting; they are not the source of truth for security headers:

- Docker / nginx (`docker compose up --build -d` → `http://localhost:8080`).
- Static-host fallback: `python -m http.server` from the repo root works because every URL the app emits is relative.

When relaxing or extending CSP or any other security control, **all three configs (meta tag, nginx header, doctrine)** must be updated together. CI rejects drift via `npm run doctrine:check`.

## Incident Runbooks

### 1. Rotate the Google OAuth Client ID

1. Open the [Google Cloud Console](https://console.cloud.google.com/) → _APIs & Services_ → _Credentials_.
2. Create a new **OAuth 2.0 Client ID** (type: _Web application_).
3. Add the production origin (`https://renanaugustomacena-ux.github.io`) under _Authorized JavaScript origins_ (no redirect URIs needed — the app uses One-Tap / popup flow).
4. Replace the value of the `google-client-id` meta tag in `index.html`:

   ```html
   <meta name="google-client-id" content="<NEW_CLIENT_ID>" />
   ```

5. Commit, push to `master`. The `.github/workflows/deploy.yml` pipeline ships the change automatically.
6. Delete the old Client ID from the Cloud Console.
7. Signed-in users must re-authenticate — existing cached JWTs will fail the `aud` check in `AuthService._onCredential` and be dropped.

### 2. Force a clean Service Worker state on every client

Use when a malicious SW may have been cached, or when CSP / vendor pins change in a non-additive way.

1. Bump `CACHE_NAME` in `sw.js` (e.g. `kaio-v7` → `kaio-v8`).
2. Append a one-shot purge block at the top of the new `sw.js`:

   ```js
   // One-shot purge block — remove after the next release.
   self.addEventListener('activate', (event) => {
     event.waitUntil(
       (async () => {
         const keys = await caches.keys();
         await Promise.all(keys.map((k) => caches.delete(k)));
         await self.registration.unregister();
         const clients = await self.clients.matchAll({ type: 'window' });
         clients.forEach((c) => c.navigate(c.url));
       })()
     );
   });
   ```

3. Push to `master`. Every client that visits will receive the new SW, which purges caches and unregisters itself.
4. On the following release, remove the purge block and restore the normal activate handler.

### 3. Revert a compromised vendored asset

1. Verify the live hash:

   ```bash
   curl -sL https://renanaugustomacena-ux.github.io/security-teacher/vendor/three-0.170.0.module.js | sha256sum
   ```

2. Compare to the pin in [`vendor/integrity.json`](./vendor/integrity.json).
3. If different, the attacker has tampered with the deploy or origin. Roll back via _Settings → Pages → Source_: switch source temporarily, then back to `master` after re-pushing a known-good commit (or use _Actions → Deploy → Re-run_ on a green deploy from history).
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

### 5. (intentionally renumbered — see Runbook 7 below for the legacy CSP-violation-report procedure)

> Renumbered on 2026-04-30 (doctrine v1.2.0). The keystore and Android-Client-ID
> runbooks are 6 and 7 below; the original CSP-violation-report runbook is now
> Runbook 8 to keep the new APK-flow runbooks adjacent.

### 6. Generate / rotate the Android signing keystore

> **Severity if leaked:** P0 (§20.4). The keystore is the single most sensitive
> secret in this project — losing it forces every installed user to reinstall.

The keystore is generated **once** and rotated only on compromise. It must live
in GitHub Encrypted Secrets, never on disk after generation, never in the repo
even encrypted (Doctrine §22.8).

```bash
# 1. Generate the keystore (one time, on a clean machine).
keytool -genkey -v \
  -keystore knowledge-aio-release.keystore \
  -alias knowledge-aio \
  -keyalg RSA \
  -keysize 4096 \
  -validity 10000 \
  -dname "CN=Knowledge AIO,O=knowledgeaio,C=IT"
# You will be prompted for a keystore password and a key password.
# Use a long random password from `openssl rand -base64 32`. Save it
# somewhere very safe (a password manager, NOT the repo).

# 2. Get the SHA-1 fingerprint — needed for the Android OAuth Client ID (§22.7).
keytool -list -v -keystore knowledge-aio-release.keystore -alias knowledge-aio
# Copy the "SHA1:" line — you'll paste it into the Google Cloud Console
# when creating the Android OAuth Client ID.

# 3. Encode the keystore as base64 (one-line, no wrapping).
base64 -w 0 knowledge-aio-release.keystore > keystore.b64

# 4. Upload to GitHub Secrets at:
#    https://github.com/renanaugustomacena-ux/security-teacher/settings/secrets/actions
#    Create FOUR secrets (paste the base64 for KEYSTORE_BASE64):
#      KEYSTORE_BASE64         = <contents of keystore.b64>
#      KEYSTORE_PASSWORD       = <keystore password from step 1>
#      KEY_ALIAS               = knowledge-aio
#      KEY_PASSWORD            = <key password from step 1>

# 5. Securely delete the local keystore + the base64 dump.
shred -u knowledge-aio-release.keystore keystore.b64
# Verify they are gone:
ls -la *.keystore keystore.b64 2>&1 | grep -v "No such"   # must be empty
```

**Rotation** (only on suspected compromise): repeat steps 1–4 with a NEW alias
(e.g. `knowledge-aio-2`). The Android Client ID is bound to the keystore SHA-1,
so you must also rotate it (Runbook 7). Existing installs will refuse to update —
this is intentional. Announce the reset; users reinstall.

### 7. Rotate the Android OAuth Client ID

> Severity: P1 (§20.4). Less critical than the keystore but still material.

Use this when: the Android Client ID was leaked into telemetry / logs / a
compromised commit, or when the keystore was rotated (Runbook 6) and the new
SHA-1 must bind to a fresh Client ID.

> **Note on architecture (Doctrine §22.7):** The Android Client ID is a
> Google Cloud Console binding only — it authorizes the APK (`package =
> com.knowledgeaio.app`, fingerprint = keystore SHA-1) to invoke Google
> Sign-In. It is **never** in app code, **never** in `index.html`, and
> **never** in the JWT `aud` claim. Capawesome's plugin requires the
> **Web** Client ID at runtime on all platforms; that's the only Client ID
> the app ever sees. Rotation of the Android Client ID therefore needs
> **no app-side change** — only Cloud Console + a new APK build.

1. Open https://console.cloud.google.com/apis/credentials → select the
   "Knowledge AIO" project.
2. **+ CREATE CREDENTIALS** → **OAuth client ID** → Application type: **Android**.
3. Name: `Knowledge AIO — Android (rotation YYYY-MM-DD)`.
4. Package name: `com.knowledgeaio.app` (must match Doctrine §22.5).
5. SHA-1 certificate fingerprint: paste the SHA-1 from Runbook 6 step 2.
6. **Create**. The new Android Client ID is now active in Google's OAuth
   system — copy the value into a private note for tracking, but do not
   add it to the repo.
7. Build a new APK via Actions → "APK Build" (§22.9). The build uses the
   keystore from GitHub Secrets, which (after Runbook 6) is bound to the
   new SHA-1, which Google now recognizes via the new Android Client ID.
8. Distribute the new APK (GitHub Releases per §22.10). Until users install
   it, sign-in on the OLD APK keeps working via the OLD Android Client ID.
9. Delete the OLD Android Client ID from Cloud Console **only after** you
   have confirmed sign-in works on a fresh install of the new APK. After
   deletion, the old APK loses sign-in (graceful degradation per §8.1; the
   app continues anonymously).

### 8. Investigate a CSP violation report

GitHub Pages does not provide an edge function, so the previous `/csp-report` endpoint is no longer wired up. To investigate suspected attack traffic:

1. Manually reproduce the user's flow with DevTools open. CSP violations log to the browser console.
2. If you need a passive collector, add a temporary `report-to` directive pointing at a small Cloudflare Worker / pastebin endpoint. Keep it on for the minimum window required; the doctrine considers any always-on third-party endpoint as a doctrine amendment.
3. If the report indicates a real exploit attempt (not a browser extension noise), rotate any keys that could have been exfiltrated before the CSP caught the attempt.
4. CSP changes require updating both the `<meta>` tag in `index.html`/`404.html` and the `add_header` line in `nginx.conf`. Run `npm run csp:patch` after editing inline scripts; run `npm run doctrine:check` before pushing.

## Secret Hygiene

- `.env*` files are gitignored and no `.env*` is tracked.
- Google OAuth Client ID is public by design — it is not a secret.
- No API keys, tokens, or private identifiers exist anywhere in the tracked tree (verified via sweep 2026-04-29).
- CI runs `npm audit` at `--audit-level=high`; any high/critical finding fails the build.

## Threat Model Notes

This app has **no backend**. Everything is static + client-side. Consequences:

- There is no session store to invalidate — rotating the Google Client ID is the only way to forcibly re-auth every user.
- Per-user progress lives only in that user's browser. A cross-device sync feature (not in scope today) would move the threat model significantly — revisit this document if it ships.
- Rate-limiting, CAPTCHA, and server-side JWT verification (JWKS + signature check) are intentionally omitted; the only resource an attacker could abuse is GitHub Pages bandwidth, which GitHub already caps (100 GB / month soft limit, 1 GB site quota).

## Native APK (added 2026-04-30 with doctrine v1.2.0)

The repository ships an additional alternative deployment as an Android APK
generated via Capacitor 8.x (Doctrine §22). The threat-model delta:

**What changes:**

- A second runtime exists: an Android WebView serving `https://localhost`
  with the same web bundle. CSP, Trusted Types, sanitization, and storage
  rules apply unchanged because Capacitor maps `'self'` to the WebView host
  (Doctrine §22.2).
- Two OAuth Client IDs (web + Android) are valid simultaneously, both bound
  to the same Google Cloud project. JWT validation accepts either as the
  `aud` claim (Doctrine §22.7).
- A new long-term secret exists: the Android signing keystore. Loss = new
  app identity (P0, see Runbook 6).
- Two new SDK surfaces: Capacitor itself (npm dependency tree, audited via
  `npm audit`) and the Capawesome Google Sign-In plugin (Doctrine §22.6).
  Each new plugin triggers a §20.2 revisit.

**What does NOT change:**

- Local-first storage (Doctrine §9). IndexedDB on Android is per-app and
  isolated from the PWA — APK and PWA users are separate populations on
  the same device.
- No new outbound origin. The CSP `connect-src` allowlist is identical;
  `accounts.google.com` calls are made by the Capawesome plugin via the
  Credential Manager API which uses the system Google account, not a fetch.
- No backend. The threat model assumption "everything is static + client-
  side" still holds for the APK.

**New attack surfaces (and mitigations):**

| Risk | Mitigation |
| --- | --- |
| Keystore leak | GitHub Encrypted Secrets only; never on disk; rotation = new app identity (Runbook 6). |
| Plugin compromise (npm) | `npm audit --audit-level=high` in CI (§6.4); plugins pinned in `package-lock.json`. |
| APK tampering / re-signing | App is signed with our keystore — re-signed APK has a different SHA-1; Google Sign-In rejects it because the Android Client ID is bound to OUR SHA-1. |
| Reverse engineering | Acceptable: the entire web bundle is already public on GH Pages. No new secrets are exposed by APK distribution. |
| Capacitor major upgrade | Triggers §20.2 threat-model revisit. Major Capacitor versions can change WebView config, plugin contracts, or signing assumptions. |

**Out of scope under this doctrine:**

- iOS, Mac Catalyst, Electron, or any non-Android Capacitor target.
- Google Play Store distribution (Play telemetry / reviews / in-app updates
  change the trust surface — would require a doctrine amendment).
- In-app purchases, push notifications, or any other Capacitor plugin not
  listed in §22.

## Version

This runbook is tied to the 2026-04-29 GitHub Pages migration. Re-evaluate on any of:

- Adding a backend or any form of cloud sync.
- Onboarding a new CDN or third-party SDK.
- Relaxing CSP, Trusted Types, or COOP in any direction.
- Shipping a second deployed origin (custom domain in addition to GH Pages project URL) — the runbook paths assume a single origin.
- Doctrine amendment touching §0 / §2 / §3.
