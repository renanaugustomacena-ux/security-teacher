# DOCTRINE.md — Knowledge AIO Engineering Doctrine

> **Version:** 1.1.1 — 2026-04-29
> **Status:** Ratified, in force.
> **Scope:** All code, configuration, deployment artifacts, and operational
> procedures within this repository.

> **v1.1.0 amendments** (post-execution against v1.0.0): §17.3 strengthened
> from "warnings must trend down" to "warnings must be zero on master"; §17.9
> added — a static gate requiring every `js/services/*.js` module to have a
> matching `tests/<kebab-name>.test.js`. The amendments were ratified after
> commit 07ab41e brought every service into compliance.

> **v1.1.1 patch** (clarification per §21.1): Appendix A's stated total
> ("154" in v1.0.0, "155" in v1.1.0) was a mis-sum of the per-section counts.
> The per-section counts themselves were always correct. Recounted total is
> 157. No rule was added or removed by this patch — it only fixes the
> arithmetic.

This doctrine is a precise, technical, and enforceable specification of how
Knowledge AIO is built, secured, deployed, and maintained. Every rule herein
is non-negotiable unless explicitly amended by a doctrine-amendment commit
(prefix: `doctrine:`). When in doubt, follow the doctrine. When the doctrine
is silent, prefer the most restrictive, least surprising option that aligns
with its three pillars: **local-first, security-first, restrained**.

The doctrine is enforced by:

1. The reviewer (human + AI) reading the changeset against this file.
2. The CI gates declared in §17 and §18.
3. The scheduled integrity job declared in §20.

A change that violates any rule must either (a) be revised, or (b) propose
an amendment commit that updates this file in the same PR.

---

## §0. Identity & Scope

| #   | Rule                                                                                                                                                                                                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0.1 | The application is a bilingual English-from-Italian language-learning Progressive Web App. There is exactly one product domain; do not bolt on unrelated features (analytics SaaS, cross-tenant accounts, AI generation services, etc.).                                                                      |
| 0.2 | The user-facing language pair is fixed: Italian primary surface, English target. A third language requires an amendment commit and a translation pass over `index.html`, every README, and every user-visible string.                                                                                         |
| 0.3 | The aesthetic register is **cyber-instrument / trading-terminal HUD**: thin lines, sub-pixel glows, ascending micro-tones, restrained motion, gold-on-graphite palette. Never Duolingo-playful. No confetti, no mascots, no klaxons, no "Great job!" stickers.                                                |
| 0.4 | The primary deployment target is **GitHub Pages**, served from the `master` branch via the official GitHub Actions Pages workflow. Netlify and self-hosted Docker/nginx are demoted to optional alternative deployments and must continue to work but are not the source of truth for security configuration. |
| 0.5 | The canonical public origin is `https://renanaugustomacena-ux.github.io/security-teacher/`. The base path `/security-teacher/` must be assumable by every URL the app emits. Apex/custom domains, if added, must update this rule via an amendment commit.                                                    |

## §1. Architecture & Module Boundaries

| #    | Rule                                                                                                                                                                                                                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.1  | The codebase is **vanilla ES6+ modules**. No bundler, no transpiler, no framework, no build step on the critical path. A future build step is permitted only if it is verifiably reproducible from `package-lock.json` and yields a byte-for-byte identical artifact across two runs on the same input. |
| 1.2  | Every JavaScript module under `js/` must be `type="module"` ES module syntax. CommonJS is permitted only in dev tooling configs (e.g. `commitlint.config.cjs`).                                                                                                                                         |
| 1.3  | I/O concerns must be encapsulated in a service under `js/services/`. UI managers (`*Manager.js`) consume services; they do not perform `fetch`, IndexedDB, Web Audio, or `localStorage` directly.                                                                                                       |
| 1.4  | Topic data files in `js/topics/data/*.js` must be **pure static exports**. They must not import managers, services, or the store. They must not run any code at module top-level beyond the `export default` literal.                                                                                   |
| 1.5  | The store (`js/store/index.js`) is the single source of cross-manager state. Direct `window.someManager` cross-references for shared state are forbidden; pass dependencies through constructors or store subscriptions.                                                                                |
| 1.6  | Topic data must be **lazy-loaded via dynamic `import()`** keyed by topic id. Eagerly importing all 17 topics at boot is forbidden — it would bloat the initial bundle past the §13 budget.                                                                                                              |
| 1.7  | `index.html` must remain a **flat single page**. No iframes, no `<frame>`, no nested-document tricks. The only embedded surface tolerated is the GIS sign-in popup which the browser opens, not the app.                                                                                                |
| 1.8  | The `vendor/` tree is the only place third-party code may live in source form. New `vendor/` additions require: (a) pinning by sha256 in `vendor/integrity.json`, (b) a comment in the file noting the upstream source and version, (c) a §7 verification.                                              |
| 1.9  | A new top-level directory must be motivated in the PR description and reflected in `sw.js`'s `STATIC_ASSETS` list (if it ships to production) and in `.dockerignore` (if it does not).                                                                                                                  |
| 1.10 | Circular module imports are forbidden. If a cycle is detected by ESLint's `import/no-cycle` (when enabled) or by manual review, the cycle must be broken before merge.                                                                                                                                  |

## §2. Deployment: GitHub Pages as Primary

| #    | Rule                                                                                                                                                                                                                                                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.1  | Every URL the app emits — links, fetches, importmap entries, service-worker scope, manifest `start_url`, manifest `scope`, font URLs — must be **relative** (no leading `/`). The page must work identically when served from `/`, `/security-teacher/`, or any other subpath.                                                                                   |
| 2.2  | The deploy workflow is `.github/workflows/deploy.yml`. It runs on push to `master`, on manual dispatch, and is the only path that pushes to the `gh-pages` deployment. It must use `actions/checkout@v4`, `actions/setup-node@v4` with `node-version-file: .nvmrc`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`. |
| 2.3  | The deploy workflow must run `npm ci` (not `npm install`) and must run `npm test` before uploading the artifact. A failing test halts the deploy.                                                                                                                                                                                                                |
| 2.4  | The deploy workflow must **exclude** `node_modules/`, `.git/`, `tests/`, `.husky/`, `.vscode/`, `Dockerfile`, `docker-compose.yml`, `nginx.conf`, `commitlint.config.cjs`, `.eslintrc.json`, `.prettierrc`, `package.json`, `package-lock.json`, `DOCTRINE.md`, `SECURITY.md`, `README*.md`, and `netlify*` artifacts from the Pages artifact.                   |
| 2.5  | The `pages` GitHub Environment must be the **only** environment with deploy permissions. No PAT-based pushes to `gh-pages` are permitted.                                                                                                                                                                                                                        |
| 2.6  | A `404.html` at repo root is required. It implements the standard rafgraph SPA-on-GH-Pages redirect: encode `location.pathname` into `?p=…` and route the user back to `index.html` at the base path. Same security headers (`<meta>` CSP) as `index.html`.                                                                                                      |
| 2.7  | `index.html` must contain the inverse decoder for the `?p=…` redirect, executed before any module loads, so deep-link URLs resolve correctly.                                                                                                                                                                                                                    |
| 2.8  | `manifest.json` must use **relative** `start_url` and `scope` (e.g. `./` and `./`) so the PWA installs correctly under both a custom domain and the project-pages subpath.                                                                                                                                                                                       |
| 2.9  | A `.nojekyll` file at repo root is mandatory. It prevents Jekyll from stripping leading-underscore filenames (which we don't have today, but it's a future-proofing requirement).                                                                                                                                                                                |
| 2.10 | The Netlify config files (`netlify.toml`, `netlify/`, `_redirects`) and the nginx/Docker stack are kept as **alternative deployments**. They must be updated in lockstep with the GH Pages config when security headers, CSP, or routing change. CI rejects PRs that change one without updating the others, unless the PR description names the divergence.     |

## §3. Content-Security-Policy & Trusted Types

| #    | Rule                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.1  | A Content-Security-Policy must be enforced. Because GitHub Pages does not let us emit response headers, CSP is delivered via `<meta http-equiv="Content-Security-Policy" content="…">` placed as the first child of `<head>`, before any script, link, or style.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 3.2  | `script-src` must enumerate the SHA-256 hashes of every legitimate inline script in `index.html`, plus `'self' 'strict-dynamic' https://accounts.google.com`. `'unsafe-inline'` and `'unsafe-eval'` are forbidden. Adding a new inline script requires (a) computing its sha256 and (b) updating both the meta tag and `nginx.conf`.                                                                                                                                                                                                                                                                                                                                                                                |
| 3.3  | `style-src` must enumerate `'self'` and the SHA-256 hashes of any inline `<style>` blocks (currently zero). Inline `style="…"` attributes are tolerated only because the meta-CSP `style-src` includes `'unsafe-inline'` solely for _attributes_; if browsers ever split this into a `style-src-attr` directive, switch to it and drop `'unsafe-inline'` from `style-src` entirely.                                                                                                                                                                                                                                                                                                                                 |
| 3.4  | The CSP must include all of: `default-src 'self'`, `connect-src 'self' https://lrclib.net https://api.mymemory.translated.net https://accounts.google.com https://oauth2.googleapis.com`, `img-src 'self' blob: data: https://lh3.googleusercontent.com https://*.googleusercontent.com`, `media-src 'self' blob: data:`, `font-src 'self'`, `frame-src https://accounts.google.com`, `worker-src 'self'`, `manifest-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`, `upgrade-insecure-requests`, `require-trusted-types-for 'script'`, `trusted-types default`. Adding a new directive or relaxing an existing one requires a security review note in the PR. |
| 3.5  | Removing or weakening any directive in §3.4 is a **doctrine amendment**, not a routine change.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 3.6  | A Trusted Types `default` policy must be installed by the first inline script in `<head>`. `createScript` must throw. `createScriptURL` must allow only same-origin and `https://accounts.google.com`. `createHTML` is pass-through because all template sinks escape user input at the boundary (see §4).                                                                                                                                                                                                                                                                                                                                                                                                          |
| 3.7  | The CSP meta tag and the `nginx.conf` `add_header Content-Security-Policy …` line must be byte-equivalent in their directive set (whitespace and ordering may differ). The CI gate in §17 fails the build if they drift.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 3.8  | `frame-ancestors 'none'` and a `<meta http-equiv="X-Frame-Options" content="DENY">` are both required. The redundancy is intentional — the `X-Frame-Options` meta is honored by older browsers that don't honor `frame-ancestors`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 3.9  | `<meta name="referrer" content="no-referrer">` must be present in `<head>`. This is the GH-Pages-compatible analog of the `Referrer-Policy: no-referrer` response header that we lose without an edge function.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 3.10 | `eval`, `new Function(string)`, `setTimeout(string, …)`, `setInterval(string, …)`, and `document.write` are **prohibited** anywhere in `js/**`. The CI grep in §17 fails the build on any occurrence outside test-only contexts.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

## §4. Input/Output Sanitization

| #   | Rule                                                                                                                                                                                                                                                                                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4.1 | Any user-controlled string (uploaded LRC, translation API response, profile name, custom answer) that ends up in HTML must pass through `js/utils/SanitizeHtml.js#escapeHtml` (or `escapeAttr` for attribute contexts). Direct `.innerHTML = userString` is forbidden.                            |
| 4.2 | `escapeHtml` and `escapeAttr` must escape, at minimum: `&`, `<`, `>`, `"`, `'`, backtick, `=`, `\`, and the JS string escape characters when used in `style=` or event-handler contexts.                                                                                                          |
| 4.3 | Translation API responses (MyMemory) must be **shape-validated** before display: assert `responseStatus === 200`, assert `responseData.translatedText` is a string, length-cap to 4 KB, drop on schema mismatch.                                                                                  |
| 4.4 | LRCLIB responses must be shape-validated similarly: bound the parser to ≤ 5 000 lines and 2 hours of declared timestamps; drop entries with malformed `[mm:ss.xx]` prefixes silently.                                                                                                             |
| 4.5 | LRC files uploaded by the user are bound by the same `client_max_body_size` analog: refuse files > 1 MB before parsing.                                                                                                                                                                           |
| 4.6 | Audio files uploaded by the user must be loaded as `Blob` URLs only; their MIME type must be checked against `audio/*` plus the explicit `.mp3 .wav .ogg .flac .m4a` extension list. Files larger than 50 MB are refused with a user-visible toast.                                               |
| 4.7 | Any string read from `localStorage` or IndexedDB must be sanitized on load: rebuild from a null-prototype shape, strip unexpected keys, type-check every field, and discard the entire blob on shape mismatch (see commit `1841926`). New persisted shapes must extend the loader, not bypass it. |
| 4.8 | Profile and leaderboard fields read from storage must have hard numeric bounds enforced on load (see commit `fb9064f`). A negative XP, a streak > 36 500, a level > 999, or any non-finite number is forced to zero.                                                                              |

## §5. Service Worker

| #   | Rule                                                                                                                                                                                                                                                           |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5.1 | `sw.js` lives at the deploy root so it can claim scope `./`. Its scope must be derived from `registration.scope`, never hard-coded `/`.                                                                                                                        |
| 5.2 | `self.skipWaiting()` must NOT be called unconditionally on install. It is only called in response to a `SW_SKIP_WAITING` postMessage from a controlled tab (see commit `622a799` and `sw-register.js`). A rogue update must not silently replace a running SW. |
| 5.3 | Cross-origin responses must never enter the cache. Opaque responses are passed through but never persisted.                                                                                                                                                    |
| 5.4 | Navigation requests use **network-first** with an `index.html` cache fallback. Same-origin static assets use cache-first. External APIs (LRCLIB, MyMemory) use network-only — never cached.                                                                    |
| 5.5 | `CACHE_NAME` must be incremented on every release that changes a hashed asset, the CSP, the Trusted Types policy, or the static asset list. Failing to bump leaves stale code on installed clients.                                                            |
| 5.6 | `STATIC_ASSETS` must list every same-origin file required for offline boot. Adding a file under `js/`, `css/`, `vendor/`, or `icons/` requires updating this list. CI in §17 asserts no orphaned new module under `js/` is missing from the list.              |
| 5.7 | The service worker must not import anything from outside its file. No `importScripts(…)`, no dynamic `import()` inside the SW.                                                                                                                                 |
| 5.8 | A "force purge" runbook block (see SECURITY.md Runbook 2) must remain documented. It is the only sanctioned way to recover from a poisoned cache.                                                                                                              |

## §6. Vendored Assets & Supply Chain

| #   | Rule                                                                                                                                                                                                                                                                      |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 6.1 | Third-party JavaScript runtime dependencies are **forbidden** in production. Only `vendor/three-0.170.0.module.js` is permitted, pinned by sha256 in `vendor/integrity.json`.                                                                                             |
| 6.2 | Adding a new vendored asset requires: (a) computing `sha256sum` of the file as committed; (b) appending the entry to `vendor/integrity.json`; (c) verifying the upstream npm registry shasum and tarball hash; (d) recording the upstream URL in the file header comment. |
| 6.3 | Fonts are self-hosted under `vendor/fonts/`. Cross-origin font fetches (Google Fonts, CDN font services) are forbidden — they would require relaxing `font-src` and `connect-src`.                                                                                        |
| 6.4 | The dev-only `npm` dependency tree must pass `npm audit --audit-level=high` (configured via `.npmrc`). A high or critical finding fails the CI build.                                                                                                                     |
| 6.5 | `npm ci` is the canonical installation command. `npm install` is permitted only for adding/updating a dependency, and the resulting `package-lock.json` change must be committed alongside.                                                                               |
| 6.6 | `package.json` must keep `"type": "module"`, `"engines": { "node": ">=20" }`, and pin all devDependencies (no `^`/`~` ranges in production-relevant tooling). The `save-exact=true` `.npmrc` flag enforces this for new additions.                                        |
| 6.7 | The Husky hooks under `.husky/` must remain local-only scripts. They must not be skippable (`--no-verify` is not authorized) and they must run `npm run lint` and `npm run format` before allowing a commit.                                                              |
| 6.8 | The Docker base image is pinned by digest, not by tag (see `Dockerfile`). Updating the base image requires re-pinning the digest.                                                                                                                                         |

## §7. Vendored-Asset Verification Procedure

| #   | Rule                                                                                                                                                                                                  |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7.1 | When updating `vendor/three-*.module.js`, follow Runbook 4 in `SECURITY.md` end-to-end. Skipping the npm-registry shasum check is forbidden.                                                          |
| 7.2 | When updating any `vendor/fonts/*.woff2`, recompute the sha256 of `fonts.css` and update `vendor/integrity.json`. Browsers cache fonts aggressively; `CACHE_NAME` must also be bumped.                |
| 7.3 | The scheduled integrity workflow (§18) compares live deployment hashes against `vendor/integrity.json`. A mismatch opens a GitHub issue labeled `security:integrity` and is treated as a P1 incident. |

## §8. Authentication & Identity

| #   | Rule                                                                                                                                                                                                                                                           |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8.1 | The only identity provider is Google Identity Services. The OAuth Client ID is a public value injected at build/deploy time into the `<meta name="google-client-id">` tag. An empty value disables sign-in gracefully — the app must keep working anonymously. |
| 8.2 | Client-side JWT validation must check, at minimum: `iss === "https://accounts.google.com"`, `aud === <our client id>`, `iat ≤ now + 60s`, `exp > now`, `nbf ≤ now + 60s` (when present). A 24-hour session cap is enforced regardless of `exp`.                |
| 8.3 | We do not run server-side JWKS verification because there is no server. We rely on the GIS popup's TLS-pinned token issuance. Treat the validated identity as "low-trust": never use it as the sole gate for any client-stored secret.                         |
| 8.4 | Sign-in must never block the rest of the app. If GIS fails to load (CSP block, network error, Client ID empty), the sign-in section degrades to a hidden state and the app continues anonymously.                                                              |
| 8.5 | The signed-in identity must not be sent to any third-party endpoint. The `connect-src` allowlist intentionally excludes ad/analytics origins.                                                                                                                  |
| 8.6 | Rotating the Google Client ID is the only sanctioned way to forcibly re-auth every user (see SECURITY.md Runbook 1).                                                                                                                                           |

## §9. Storage & Persistence

| #   | Rule                                                                                                                                                                                                                          |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 9.1 | All user-progress data is local-first. IndexedDB is the primary store; `localStorage` is reserved for small markers (current locale, sound-on toggle, "splash seen" flag).                                                    |
| 9.2 | The default IndexedDB database name is `kaio`. Object stores are version-bumped via the `onupgradeneeded` event. Schema migrations must be **forward-only and additive** unless a major-version bump is documented in the PR. |
| 9.3 | A storage write must never block the UI. All writes go through the StorageService promise interface; the UI can render the optimistic state immediately and reconcile on resolve.                                             |
| 9.4 | Loaded data must pass through the §4.7 sanitization gate. Trust the disk no more than you trust the network.                                                                                                                  |
| 9.5 | A "factory reset" path must exist (Profile → Reset). It must wipe IndexedDB, `localStorage`, and any `Cache` instances created by the SW, and unregister the SW.                                                              |
| 9.6 | A cross-device sync feature is **out of scope under this doctrine**. Adding one is an amendment that triggers a full threat-model revisit (see §20).                                                                          |
| 9.7 | Per-user data must never be sent to any external endpoint. The only outbound traffic is anonymous LRCLIB/MyMemory queries (the user's typed text leaves the device, but no identifier accompanies it).                        |
| 9.8 | The leaderboard is **personal-records-only**. There is no global leaderboard, no peer comparison, no server. "Leaderboard" in this app means "your own historical bests".                                                     |

## §10. Network: Fetch & External APIs

| #    | Rule                                                                                                                                                                                                       |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 10.1 | The only allowed cross-origin fetch destinations are listed in CSP `connect-src` (§3.4). Adding a new origin requires a doctrine amendment and a security review.                                          |
| 10.2 | Every external fetch must specify `cache: 'no-store'` for API endpoints (LRCLIB, MyMemory) so the SW does not even temporarily cache them. The SW also network-only's them in `EXTERNAL_API_HOSTS` (§5.4). |
| 10.3 | Every external fetch must have a hard timeout via `AbortController` (default 8 seconds). On timeout the user sees a graceful "could not reach service" toast — never a stuck spinner.                      |
| 10.4 | External-API responses must be JSON-parsed inside a `try/catch`. A malformed body must not crash the manager that called the service.                                                                      |
| 10.5 | Retry policy: at most 1 retry on transient network failures (5xx, network error). Never retry 4xx. Never retry inside a tight loop without exponential backoff.                                            |
| 10.6 | The MyMemory free tier is rate-limited; the app must throttle translation requests client-side to ≤ 1 req/sec per origin.                                                                                  |
| 10.7 | All external requests must omit credentials (`credentials: 'omit'`) unless the endpoint is `accounts.google.com` and the call is made by the GIS SDK itself.                                               |

## §11. Error Handling & Resilience

| #    | Rule                                                                                                                                                                                                                                                               |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 11.1 | Non-critical visual effects (matrix rain, cursor particles, animations) must be wrapped in a top-level try/catch and degrade silently. A WebGL failure must not break the rest of the page.                                                                        |
| 11.2 | Module-load failures (a topic data file 404s) must surface a user-visible "could not load this topic" message and continue. The app must not white-screen on any single module failure.                                                                            |
| 11.3 | `console.error` is permitted in production; it gives the user something to copy-paste in a bug report. `console.warn` for recoverable issues. `console.info` for one-line lifecycle events. `console.debug` and `console.log` are not permitted in committed code. |
| 11.4 | A global `window.addEventListener('error', …)` and `'unhandledrejection'` handler is required. They must clip the message to 512 chars and log via `console.error` — they must not navigate or modify the DOM (an error inside the handler would loop).            |
| 11.5 | Storage failures (IndexedDB quota exceeded, corrupted blob) must trigger a user-visible "your saved progress could not be loaded" state with a one-click reset path.                                                                                               |
| 11.6 | Animations must respect `prefers-reduced-motion: reduce` everywhere — every new effect must gate on it. A user who has set this preference must see a static-equivalent UI, not an effect with diminished intensity.                                               |
| 11.7 | Touch-only devices: any feature that depends on hover, fine-pointer cursor tracking, or keyboard chords must have a touch fallback. The cursor-particles effect auto-disables on touch devices.                                                                    |

## §12. State Management

| #    | Rule                                                                                                                                                                                                                       |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 12.1 | The store (`js/store/index.js`) is a typed pub/sub: `getState`, `setState`, `subscribe(selector, fn)`. Direct mutation of returned state is forbidden — `setState` clones.                                                 |
| 12.2 | Subscribers must be unsubscribable. Every `subscribe` returns a teardown function that the manager must call when its lifecycle ends (e.g. `closePractice`, `backToHub`).                                                  |
| 12.3 | Cross-manager events must go through the store, not through direct method calls between managers. Exception: a manager may directly `await someService.method()` because services have no state.                           |
| 12.4 | The store must not be persisted as-is. Persistence is the StorageService's responsibility; the store is in-memory only.                                                                                                    |
| 12.5 | Async updates (e.g. translation in flight) must use a "loading / success / error" tri-state in the store, never a single boolean. The UI can then render skeletons, results, or retry without races.                       |
| 12.6 | Optimistic updates are permitted for fast actions (mark word as learned). The reconciliation pattern is: (a) update store immediately, (b) write to storage, (c) on storage failure roll back the store and surface §11.5. |

## §13. Performance & Resource Budgets

| #    | Rule                                                                                                                                                                                             |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 13.1 | Initial bundle (HTML + same-origin JS + same-origin CSS, uncompressed) must stay under **500 KB**. Topic data files are excluded (lazy-loaded). The CI gate in §17 fails the build above 500 KB. |
| 13.2 | A single topic data file must stay under **300 KB** uncompressed. Splitting beyond this is an architecture change.                                                                               |
| 13.3 | The matrix-rain WebGL effect must run at ≥ 30 fps on a Pixel 4a-class device. If a new effect drops it below this, the new effect must auto-degrade or gate on a profile toggle.                 |
| 13.4 | Every animation timer (`requestAnimationFrame`, `setInterval`) must pause when `document.visibilityState === 'hidden'`. Wake them on `visibilitychange`.                                         |
| 13.5 | The cursor-particles canvas must not exceed 300 active particles at any time, and must hard-cap CPU usage by sampling frame deltas and skipping a frame when the previous frame took > 16 ms.    |
| 13.6 | `prefers-reduced-data` (when supported) gates network-heavy features: lyric translation, MyMemory translator. The user must opt-in explicitly when this preference is set.                       |

## §14. Aesthetic & UX

| #    | Rule                                                                                                                                                                                                                                                                         |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 14.1 | Wrong-answer feedback must feel like a coach saying "let me show you", not a buzzer. No red shake, no klaxon, no all-caps "WRONG!".                                                                                                                                          |
| 14.2 | Particles or fanfare effects fire only on **real milestones**: level-up, badge unlock, streak ≥ 10, perfect run. Never on routine correct answers.                                                                                                                           |
| 14.3 | Sound effects are **synthesized** via Web Audio `OscillatorNode` + `GainNode` envelopes (see `js/services/SfxService.js`). Bundled `.mp3 / .ogg / .wav` audio files are forbidden in the repo — they would require relaxing `media-src` and inflating the PWA cache surface. |
| 14.4 | Master gain on the SFX bus is capped at -18 dBFS (`master.gain.value = 0.125`). New cinematic moments stack oscillators with staggered start times, not loudness.                                                                                                            |
| 14.5 | The `AudioContext` is lazy-initialized on first user gesture (autoplay policy). It must be lazily resumed on every gesture too, because mobile browsers suspend it after backgrounding.                                                                                      |
| 14.6 | Color palette is gold-on-graphite. Amber `#e67e22` is the warning/highlight register. Red is reserved for hard-fail states only (data corruption, sign-in token rejection) and never for "wrong answer".                                                                     |
| 14.7 | Text is bilingual: every user-visible string must appear in Italian and English, separated by `/` (Italian first). New copy that is monolingual is a bug.                                                                                                                    |
| 14.8 | Iconography is line-based SVG, stroke-width 1.5 to 2, no fills except for accent dots. New icons must visually defer to the existing nav set.                                                                                                                                |

## §15. Accessibility & Reduced Motion

| #    | Rule                                                                                                                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 15.1 | Every interactive element must be reachable via keyboard. `tabindex="-1"` is permitted only to make a focused-but-non-tabbable region (e.g. a modal scroll surface).                                    |
| 15.2 | Every form input must have a programmatically-associated label (`<label for>` or `aria-label`). CI in §17 asserts no input lacks this.                                                                  |
| 15.3 | Color is not the sole carrier of meaning. Right/wrong feedback uses both color and a text label or icon.                                                                                                |
| 15.4 | `prefers-reduced-motion: reduce` disables the matrix-rain rotation, the cursor-particles, the splash animation, and any easing > 200 ms. The static-equivalent state must look intentional, not broken. |
| 15.5 | Focus rings must be visible under both light and dark backgrounds. Removing the default focus outline without a replacement is forbidden.                                                               |
| 15.6 | A "skip to main content" link is required as the first focusable element (currently implicit via the sidebar; surface explicitly when a screen reader audit demands it).                                |

## §16. PWA & Offline Behaviour

| #    | Rule                                                                                                                                                                                                |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 16.1 | The app must boot and render the home, learn, practice, topics, progress, and profile sections fully offline after the first visit.                                                                 |
| 16.2 | The matrix-rain effect must degrade to a static gradient when offline if `vendor/three-*.module.js` is not in cache for any reason.                                                                 |
| 16.3 | Music search via LRCLIB and translation via MyMemory require network. They must show a clear "online required" state when offline, never a stuck spinner.                                           |
| 16.4 | The PWA install prompt must be self-dismissable and must not auto-fire. Show it from a single explicit user action ("Install").                                                                     |
| 16.5 | The manifest's `theme_color` and `background_color` must match the boot splash. Mismatch causes a visible flash on Android.                                                                         |
| 16.6 | Both icons (192 + 512) must include a `maskable` variant (per current `manifest.json`). When updating the icons, regenerate both PNGs from the SVG source and re-pin in §6 if they enter `vendor/`. |

## §17. Testing & Quality Gates (CI per-PR)

| #    | Rule                                                                                                                                                                                                       |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 17.1 | The Vitest suite under `tests/` must pass on every PR. Adding a new manager or service requires at least one test (happy path) before merge.                                                               |
| 17.2 | A regression test is required for every fix commit (`fix:` prefix). The PR description must link the test that would have caught the bug.                                                                  |
| 17.3 | (v1.1.0 amendment) Lint (`npm run lint`) must pass with **zero errors and zero warnings**. The 0-warning baseline was established 2026-04-29 (commit 27f8a62). The `lint` script in `package.json` invokes `eslint . --max-warnings 0`, so a new warning aborts the build. The `.eslintrc.json` `no-console` rule allows `error / warn / info` only — `console.log` and `console.debug` are forbidden in committed code (see §11.3). |
| 17.4 | `npm audit --audit-level=high` must pass. A high/critical finding fails the build.                                                                                                                         |
| 17.5 | The CI workflow asserts no use of `eval`, `new Function(`, `setTimeout('`, `setInterval('`, or `document.write` outside `tests/` and `node_modules/`. A grep failure aborts the build.                     |
| 17.6 | The CI workflow asserts the `<meta http-equiv="Content-Security-Policy">` tag is present in `index.html` and `404.html` and includes every directive listed in §3.4. A missing directive aborts the build. |
| 17.7 | The CI workflow asserts `nginx.conf`'s `Content-Security-Policy` line and the `<meta>` CSP have the same directive set (whitespace and order may differ). Drift aborts the build.                          |
| 17.8 | The CI workflow asserts every file under `js/` (excluding tests) is either listed in `sw.js#STATIC_ASSETS` or is a topic data file under `js/topics/data/`. Orphaned new modules abort the build.          |
| 17.9 | (v1.1.0 amendment) Every committed file under `js/services/*.js` must have a matching test file at `tests/<kebab-case>.test.js` — for example, `AuthService.js` requires `tests/auth-service.test.js`. The `npm run doctrine:check` gate enforces this. The rule operationalises §17.1 across the legacy service surface; it does not yet apply to managers under `js/`, which are tracked separately. |

## §18. CI / CD / Release

| #    | Rule                                                                                                                                                                                                                                                   |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 18.1 | Three GitHub Actions workflows are mandatory: `ci.yml` (per-PR gates), `deploy.yml` (push-to-master deploy), `integrity.yml` (weekly cron + manual dispatch).                                                                                          |
| 18.2 | Workflows pin their action versions to a specific tag (e.g. `actions/checkout@v4`). They must not float on `@main`.                                                                                                                                    |
| 18.3 | The deploy workflow uses the GitHub-provided `GITHUB_TOKEN` with `pages: write` and `id-token: write` permissions. No PATs.                                                                                                                            |
| 18.4 | Concurrency: the deploy workflow uses `concurrency: group: pages, cancel-in-progress: false` so a slower deploy is never aborted by a faster one mid-publish.                                                                                          |
| 18.5 | The integrity workflow runs Mondays 12:00 UTC. It pulls the live deployment, recomputes sha256 for every entry in `vendor/integrity.json`, and asserts the response HTML contains the expected `<meta>` CSP. Drift opens a `security:integrity` issue. |
| 18.6 | Conventional Commits are enforced by `commitlint` via Husky. Allowed prefixes: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `security`, `harden`, `doctrine`, `ci`. Anything else fails the commit.                            |
| 18.7 | A `doctrine:` commit may **only** touch `DOCTRINE.md`, the relevant CI gate, and the file(s) the amendment governs. Bundled feature work in a doctrine commit is not permitted — it splits review attention.                                           |
| 18.8 | Release notes are generated from commit messages. Every `feat:` and `fix:` becomes a bullet in the next deploy's announcement (when announcements are introduced). Until then, the commit history _is_ the release log.                                |

## §19. Code Style & Repository Hygiene

| #    | Rule                                                                                                                                                                                                                                  |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 19.1 | Prettier (`.prettierrc`) is the single formatter of record: `semi: true`, `singleQuote: true`, `tabWidth: 2`, `trailingComma: "es5"`, `printWidth: 100`. Hand-rolled formatting is rewritten on commit.                               |
| 19.2 | ESLint extends `airbnb-base` + `prettier`. The rule overrides in `.eslintrc.json` are intentional; relaxing more rules requires a doctrine amendment.                                                                                 |
| 19.3 | Source files use **LF** line endings (enforced by `.gitattributes`). Mixed CRLF lands in CI as a lint failure.                                                                                                                        |
| 19.4 | Comments default to **none**. Add a comment only when the _why_ is non-obvious — a hidden constraint, a subtle invariant, a workaround for a specific browser bug. Do not narrate what well-named identifiers already say.            |
| 19.5 | Italian explanatory comments at file footers (as in `nginx.conf`, `Dockerfile`, `docker-compose.yml`) are **opt-in tutorial blocks**. Keep them when they exist; do not add them to new files unless the file is a teaching artifact. |
| 19.6 | TODOs must include a date and an issue link: `// TODO 2026-04-29 #42 — drop after migration`. Undated TODOs rot.                                                                                                                      |
| 19.7 | Dead code is deleted, not commented out. Git history preserves it. Commit `677bf92` set the precedent.                                                                                                                                |
| 19.8 | New files must end with a single trailing newline. Binary files (PNG, woff2) are tracked literally; source files are normalized.                                                                                                      |

## §20. Threat Model & Incident Response

| #    | Rule                                                                                                                                                                                                                                                |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20.1 | The threat model is recorded in `SECURITY.md` and assumes: no backend, public OAuth Client ID, untrusted user-supplied LRC/MP3, untrusted external-API responses (LRCLIB, MyMemory).                                                                |
| 20.2 | Adding any of: a backend, cross-device sync, a new third-party SDK, a second deployed origin, or any relaxation of CSP/Trusted Types triggers a **mandatory** threat-model revisit. The PR description must include a "Threat-model delta" section. |
| 20.3 | Vulnerability reports go to the contact in `.well-known/security.txt`. Expected response: ≤ 7 days. Disclosure window: 90 days from first contact, or on patch ship — whichever is sooner.                                                          |
| 20.4 | Incident severity: P0 = active exploit / data exfil. P1 = vendor-asset drift, leaked secret, CSP fail-open. P2 = high-severity dep audit. P3 = degraded-but-recoverable. Each tier has a runbook in `SECURITY.md`.                                  |
| 20.5 | Recovery from a poisoned SW is the §5.8 / SECURITY.md Runbook 2 force-purge procedure. Practice it dry-run at least once per year.                                                                                                                  |
| 20.6 | A `security:` commit prefix labels security-only changes. They must not be batched with feature work.                                                                                                                                               |

## §21. Doctrine Governance

| #    | Rule                                                                                                                                                                                                                     |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 21.1 | This document is versioned by hand at the top. Bump the patch version (`1.0.x`) for clarifications, the minor (`1.x.0`) for added rules, the major (`x.0.0`) for rule removals or weakenings.                            |
| 21.2 | An amendment is a single PR titled `doctrine: …` that touches `DOCTRINE.md` + the artifact(s) the amendment requires. The PR description must state the rationale and the alternative(s) considered.                     |
| 21.3 | The doctrine is **read into context at the start of every coding session by the AI collaborator** (Claude). The first action of any session that proposes a change must be to identify which rule(s) the change touches. |
| 21.4 | A rule that has been violated and survived deserves a footnote, not a silent rewrite. Document the exception, then either fix the codebase or amend the rule.                                                            |

---

## Appendix A — Rule Count

| Section                                    | Count   |
| ------------------------------------------ | ------- |
| §0 Identity & Scope                        | 5       |
| §1 Architecture & Module Boundaries        | 10      |
| §2 Deployment: GitHub Pages as Primary     | 10      |
| §3 Content-Security-Policy & Trusted Types | 10      |
| §4 Input/Output Sanitization               | 8       |
| §5 Service Worker                          | 8       |
| §6 Vendored Assets & Supply Chain          | 8       |
| §7 Vendored-Asset Verification Procedure   | 3       |
| §8 Authentication & Identity               | 6       |
| §9 Storage & Persistence                   | 8       |
| §10 Network: Fetch & External APIs         | 7       |
| §11 Error Handling & Resilience            | 7       |
| §12 State Management                       | 6       |
| §13 Performance & Resource Budgets         | 6       |
| §14 Aesthetic & UX                         | 8       |
| §15 Accessibility & Reduced Motion         | 6       |
| §16 PWA & Offline Behaviour                | 6       |
| §17 Testing & Quality Gates (CI per-PR)    | 9       |
| §18 CI / CD / Release                      | 8       |
| §19 Code Style & Repository Hygiene        | 8       |
| §20 Threat Model & Incident Response       | 6       |
| §21 Doctrine Governance                    | 4       |
| **Total**                                  | **157** |

## Appendix B — Quick-Reference Index

- **Inline-script CSP hashes:** §3.2 — recompute on any edit to inline `<script>` blocks in `index.html` or `404.html`.
- **Adding a vendored asset:** §6.2 + §7.1 + bump `CACHE_NAME` (§5.5) + update `vendor/integrity.json`.
- **Adding an external origin:** §10.1 → CSP `connect-src` → §3.4 → doctrine amendment.
- **Adding a new module under `js/`:** §1.3 + §1.5 + register in `sw.js#STATIC_ASSETS` (§5.6) + add a test (§17.1).
- **Force-purge a poisoned SW:** SECURITY.md Runbook 2.
- **Rotating Google Client ID:** SECURITY.md Runbook 1.
- **Deployment URL:** `https://renanaugustomacena-ux.github.io/security-teacher/` (§0.5).
- **Local dev:** `docker compose up --build -d` → `http://localhost:8080` (§2.10).

## Appendix C — Glossary

| Term                 | Meaning                                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Doctrine**         | This file. The authoritative spec of how this project is built.                                                                     |
| **Amendment**        | A PR (prefix `doctrine:`) that changes a rule herein.                                                                               |
| **Gate**             | An automated CI check that fails the build on rule violation.                                                                       |
| **Runbook**          | A step-by-step procedure documented in `SECURITY.md`.                                                                               |
| **Local-first**      | All user data lives on the user's device; no server is required for any core flow.                                                  |
| **Cyber-instrument** | The aesthetic register: trading-terminal HUD, restrained motion, gold-on-graphite. (See §0.3, §14.)                                 |
| **Adamantium pass**  | Commit `f19a549` — the security hardening pass that established CSP+Trusted Types+supply-chain pinning as load-bearing constraints. |
