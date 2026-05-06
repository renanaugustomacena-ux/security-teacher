<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
  <img src="https://img.shields.io/badge/deploy-GitHub%20Pages-181717.svg?logo=github" alt="GitHub Pages" />
  <img src="https://img.shields.io/badge/docker-alt%20deploy-green.svg" alt="Docker" />
  <img src="https://img.shields.io/badge/JS-Vanilla%20ES6+-F7DF1E.svg" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/3D-Three.js-000000.svg" alt="Three.js" />
  <img src="https://img.shields.io/badge/tests-Vitest-6E9F18.svg" alt="Vitest" />
  <img src="https://img.shields.io/badge/doctrine-154%20rules-d4a574.svg" alt="Doctrine" />
</p>

<h1 align="center">Knowledge AIO</h1>

<p align="center">
  <strong>Learn English through hip-hop music, karaoke practice, and interactive exercises — fully local, fully secure.</strong>
</p>

<p align="center">
  <a href="https://renanaugustomacena-ux.github.io/security-teacher/"><strong>Try it now →</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/renanaugustomacena-ux/security-teacher/releases/latest/download/knowledge-aio-latest.apk"><strong>Download APK ↓</strong></a>
</p>

<p align="center">
  <a href="README.it.md">Italiano</a> &middot;
  <a href="README.pt-br.md">Portugues Brasileiro</a>
</p>

---

### Install on Android

1. On your phone, tap **[Download APK](https://github.com/renanaugustomacena-ux/security-teacher/releases/latest/download/knowledge-aio-latest.apk)**.
2. When prompted, allow your browser or file manager to **Install unknown apps** (Android requires this for sideloaded packages).
3. Tap the downloaded `.apk` and confirm install. Open _Knowledge AIO_ and sign in with Google.

The APK is built and signed by GitHub Actions (`apk.yml`) on tagged dispatches; the keystore lives only in encrypted secrets. Doctrine §22 governs the build and signing pipeline.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Launch Guide](#quick-launch-guide)
- [Development](#development)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Security](#security)
- [Doctrine](#doctrine)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Knowledge AIO** is a local-first single-page application that helps Italian speakers learn English from survival level to C1 proficiency. It combines traditional structured lessons with music-based learning (karaoke with phonetics) and deep technical vocabulary across **17 domains** — from Cybersecurity and Linux to Cloud Computing, Networking, Databases, Git/VCS, AI Engineering, and beyond.

All user data stays on-device via IndexedDB — no accounts, no server-side data collection, no tracking. The app is a pure static site deployed on **GitHub Pages**; it can also run inside a security-hardened Docker container or be served by any static-file host (every URL the app emits is relative).

---

## Features

### Learning Modes

| Mode                   | Description                                                                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Karaoke Learning**   | Step-by-step and real-time modes with phonetic transcription, vocabulary breakdown, and synchronized lyrics                                                                 |
| **Structured Lessons** | 4 levels (0-3) covering Survival, Daily Life, Intermediate Grammar, and C1 Advanced English                                                                                 |
| **7 Practice Modes**   | Listening, Writing, Matching, Fill-in-the-blank, Sentence reconstruction, Comprehension, Scenario                                                                           |
| **Technical Topics**   | 17 bilingual vocabulary domains, up to 24 levels each (40 items per level), 11 exercise types including code challenges, boss challenges, and a Velocità (speed-drill) mode |
| **Word of the Day**    | Deterministic daily vocabulary rotation drawn from all sources                                                                                                              |

### Visual Experience

| Effect               | Description                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| **Splash Screen**    | Animated luxury logo reveal on startup                                                              |
| **3D Matrix Rain**   | Three.js morphing background with cursor-following deformation and refraction                       |
| **Cursor Particles** | Ambient particle trail with ring glow, auto-disabled on touch devices and reduced-motion preference |

### Progress Tracking

- Words learned, songs completed, streaks, and XP — all persisted locally via IndexedDB
- Mode selector grid after lesson completion for guided practice flow
- No cloud sync, no account required

### Accessibility

- Respects `prefers-reduced-motion` — visual effects gracefully degrade
- Keyboard focus rings for full keyboard navigation
- Touch-device fallbacks for all interactive elements
- Page Visibility API pauses effects when the tab is inactive

---

## Quick Launch Guide

The primary deploy lives at **<https://renanaugustomacena-ux.github.io/security-teacher/>**. To run it locally:

### Option A — Static server (recommended, zero deps)

```bash
git clone https://github.com/renanaugustomacena-ux/security-teacher.git
cd security-teacher
python3 -m http.server 8080
# open http://localhost:8080
```

Every URL the app emits is relative, so it works under `/`, `/security-teacher/`, or any other base path with no config.

### Option B — Docker (alternative, hardened nginx)

| Tool               | Minimum Version | Check command            |
| ------------------ | --------------- | ------------------------ |
| **Docker**         | 20.10+          | `docker --version`       |
| **Docker Compose** | v2+             | `docker compose version` |

```bash
docker compose up --build -d
# open http://localhost:8080
```

This builds the **Alpine Nginx** image with the same security headers that the static `<meta>` CSP enforces on GitHub Pages, runs nginx as a **non-root user** (UID 101) with all Linux capabilities dropped, and bind-mounts the source for live edits.

```bash
# Status
docker ps --filter name=Renan-english-app
# Health check
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8080/
# Live logs
docker logs Renan-english-app --tail 50 -f
# Stop
docker compose down
```

### Deploying to your own GitHub Pages

1. Fork the repo.
2. _Settings → Pages → Source_ → **GitHub Actions**.
3. Push to `master` (or run `Deploy` workflow manually).

The deploy workflow runs lint, tests, CSP-hash check, doctrine static gates, and `npm audit --audit-level=high` before publishing.

### Alternative: Static deployment (no Docker)

The app is pure static HTML/CSS/JS — you can serve it with any web server:

```bash
# Using Node.js
npx serve .

# Using Python
python -m http.server 8080
```

---

## Development

### Install tooling dependencies

```bash
npm install
```

This installs ESLint, Prettier, Vitest, Husky, and commitlint — all dev-only, nothing ships to production.

### Run tests

```bash
npm test              # Single run
npm run test:watch    # Watch mode
```

### Run linter and formatter

```bash
npm run lint          # ESLint (Airbnb base)
npm run format        # Prettier
```

### Live code editing

Because the project directory is bind-mounted into the container, any file you save is immediately served by nginx — **no rebuild needed**.

> **Linux users with the project on an NTFS drive:** Docker bind mounts from NTFS3 do not work reliably. Copy the project to a native ext4 filesystem first:
>
> ```bash
> cp -r /path/to/project ~/security-teacher
> cd ~/security-teacher
> sudo docker compose up --build -d
> ```

---

## Architecture

```
Browser
  |
  +-- index.html (SPA shell)
  |
  +-- js/app.js (entry point, routing, view lifecycle)
  |     |
  |     +-- MorphBackground.js -----> Three.js WebGL (3D matrix rain)
  |     +-- CursorParticles.js -----> Canvas 2D (particle trail)
  |     |
  |     +-- LearnManager.js --------> lessons.js (lesson database)
  |     +-- PracticeManager.js -----> 7 practice mode engines
  |     +-- MusicManager.js --------> songs.js + AudioService + LyricsService
  |     +-- TopicManager.js --------> TopicPracticeManager + topic data (lazy-loaded)
  |     +-- ProgressManager.js -----> StorageService (IndexedDB)
  |     |
  |     +-- store/index.js (pub/sub state management)
  |
  +-- css/style.css (all styling, CSS custom properties)
  |
  +-- GitHub Pages (primary)  ·  Nginx/Docker (alt local dev)  ·  any static host
```

### Key design decisions

- **No framework** — Vanilla ES6+ modules, no build step, no bundler
- **No backend** — Pure static site; everything client-side
- **Local-first data** — IndexedDB via `StorageService`, zero server dependency
- **Lazy-loaded topics** — Technical domain data loaded on-demand via dynamic `import()`
- **Relative URLs everywhere** — Works under any base path (GH Pages subpath, custom domain, localhost)
- **Graceful degradation** — Visual effects wrapped in error boundaries, fail silently
- **Service pattern** — `AudioService`, `LyricsService`, `StorageService`, `SfxService` isolate I/O concerns

See [`DOCTRINE.md`](./DOCTRINE.md) for the complete 154-rule engineering specification.

---

## Tech Stack

| Layer              | Technology                                                         |
| ------------------ | ------------------------------------------------------------------ |
| **Language**       | Vanilla JavaScript (ES6+ modules)                                  |
| **3D Effects**     | Three.js (self-hosted, sha256-pinned) + custom WebGL shaders       |
| **Audio**          | Web Audio API — synthesized SFX only, no audio assets              |
| **Lyrics Sync**    | LRCLIB API                                                         |
| **Translation**    | MyMemory Translation API                                           |
| **Persistence**    | IndexedDB (via StorageService) + small `localStorage` markers      |
| **Styling**        | CSS3 with custom properties                                        |
| **Fonts**          | Raleway, Inter, JetBrains Mono (self-hosted under `vendor/fonts/`) |
| **Primary Deploy** | **GitHub Pages** (project pages, served at `/security-teacher/`)   |
| **Alt Deploy**     | Nginx 1.25 on Alpine Linux (Docker, hardened)                      |
| **Auth**           | Google Identity Services (client-only, optional, degrades to anon) |
| **Testing**        | Vitest (80 tests including doctrine static gates)                  |
| **Linting**        | ESLint (Airbnb base) + Prettier                                    |
| **Git Hooks**      | Husky + commitlint (Conventional Commits)                          |
| **CI / CD**        | GitHub Actions: `ci.yml` (per-PR), `deploy.yml`, `integrity.yml`   |

---

## Security

The app ships with a **statically-defined Content-Security-Policy via `<meta http-equiv>`**, SHA-256-pinned for every inline script. Trusted Types `default` policy refuses string-based script creation. No `eval`, no `new Function`, no `document.write` anywhere.

| Control                    | Implementation                                                                                      |
| -------------------------- | --------------------------------------------------------------------------------------------------- |
| **CSP**                    | static `<meta>` with `'self'`, hashed inline scripts, pinned origin allowlist; nginx alt mirrors it |
| **Trusted Types**          | `default` policy enforced via CSP `require-trusted-types-for 'script'`                              |
| **X-Frame-Options**        | `DENY` (also `frame-ancestors 'none'`)                                                              |
| **X-Content-Type-Options** | `nosniff`                                                                                           |
| **Referrer-Policy**        | `no-referrer` (meta tag)                                                                            |
| **Supply chain**           | Three.js + fonts pinned by sha256 in `vendor/integrity.json`; weekly cron re-checks live deploy     |
| **Vendored only**          | No CDN runtime deps; `npm audit --audit-level=high` is a CI gate                                    |
| **Sanitization**           | `js/utils/SanitizeHtml.js` on every user-supplied string boundary; null-prototype rebuild on load   |
| **Service Worker**         | Controlled-update handshake; skipWaiting only on user opt-in; cross-origin responses never cached   |
| **Docker (alt)**           | nginx as UID 101, `cap_drop: ALL`, `read_only: true`, mem/pid/cpu caps, base image pinned by digest |

See [`SECURITY.md`](./SECURITY.md) for the threat model and incident runbooks.

---

## Doctrine

This project is governed by [`DOCTRINE.md`](./DOCTRINE.md) — a 154-rule technical specification covering identity, architecture, deployment, CSP, sanitization, service worker, supply chain, auth, storage, fetch, error handling, state management, performance, aesthetic, accessibility, PWA behaviour, testing, CI, code style, threat model, and amendment governance. Three CI gates enforce it:

- `npm run csp:check` — verifies inline-script SHA-256 hashes match the meta CSP and the nginx mirror.
- `npm run doctrine:check` — verifies CSP directive set, no forbidden runtime sinks, SW STATIC_ASSETS coverage, vendor allowlist.
- The `Forbid absolute /<path> URLs` step in `ci.yml` — verifies §2.1 (relative-URL invariant).

---

## Project Structure

```
knowledge-aio/
├── index.html                       # SPA entry, meta CSP, inline TT policy + importmap
├── 404.html                         # GH Pages SPA fallback (rafgraph redirect)
├── manifest.json                    # PWA manifest (relative start_url + scope)
├── sw.js                            # Service worker (cache-first SO, network-only XO)
├── .nojekyll                        # Disable Jekyll on GH Pages
├── DOCTRINE.md                      # 154-rule engineering spec
├── SECURITY.md                      # Threat model + incident runbooks
├── css/style.css                    # All styles, design tokens
├── icons/                           # PWA icons (192 + 512 + maskable)
├── js/
│   ├── app.js                       # Entry point, routing
│   ├── music.js                     # Karaoke manager
│   ├── lessons.js, songs.js         # Lesson + song databases
│   ├── PracticeManager.js           # 7 practice mode engines
│   ├── PracticeHUD.js               # Practice HUD overlay
│   ├── LearnManager.js              # Lesson UI and flow
│   ├── ConversationManager.js       # AI dialogue practice
│   ├── progress.js                  # Progress tracking + stats
│   ├── ProfileManager.js            # Profile + sign-in
│   ├── DailyGoalsManager.js         # Daily goal widget
│   ├── StreakCalendarManager.js     # Streak calendar
│   ├── LeaderboardManager.js        # Personal-best leaderboard
│   ├── AchievementManager.js        # Badge unlocks
│   ├── SRSManager.js                # Spaced repetition queue
│   ├── PronunciationManager.js      # Pronunciation practice
│   ├── MorphBackground.js           # 3D matrix rain (Three.js)
│   ├── CursorParticles.js           # Cursor particle trail
│   ├── sw-register.js               # Service worker bootstrap
│   ├── data/achievements.js         # Badge definitions
│   ├── services/
│   │   ├── AIService.js             # AI dialogue stub
│   │   ├── AudioService.js          # Web Audio API abstraction
│   │   ├── AuthService.js           # GIS JWT validator
│   │   ├── LyricsService.js         # LRCLIB + translation
│   │   ├── SfxService.js            # Synthesized SFX (oscillator + gain)
│   │   ├── StorageService.js        # IndexedDB wrapper
│   │   └── TTSService.js            # SpeechSynthesis wrapper
│   ├── store/index.js               # Pub/sub state
│   ├── topics/
│   │   ├── TopicManager.js          # Topic hub
│   │   ├── TopicLessonEngine.js     # Lesson runtime
│   │   ├── TopicPracticeManager.js  # 11 topic exercise types
│   │   ├── TopicBossChallenge.js    # Boss challenge
│   │   ├── TopicVelocita.js         # Speed-drill mode
│   │   ├── registry.js              # Topic metadata (17 topics)
│   │   └── data/                    # 18 topic-data files (17 + techtalk-scenarios)
│   └── utils/
│       ├── SanitizeHtml.js          # escapeHtml, escapeAttr
│       ├── StringDistance.js        # Levenshtein + near-miss detection
│       └── DateUtils.js             # Date helpers
├── tests/                           # Vitest suite (80 tests inc. doctrine-static)
├── scripts/
│   ├── compute-csp.mjs              # Hash inline scripts → patch meta CSP
│   ├── check-doctrine.mjs           # Static doctrine gate
│   └── integrity-probe.mjs          # Production drift probe (used by integrity.yml)
├── vendor/                          # Pinned third-party (sha256 in integrity.json)
│   ├── three-0.170.0.module.js
│   ├── integrity.json
│   └── fonts/                       # Self-hosted Raleway + Inter + JetBrains Mono
├── .github/
│   └── workflows/
│       ├── deploy.yml               # Push-to-master → GH Pages
│       ├── ci.yml                   # Per-PR gates
│       └── integrity.yml            # Weekly drift probe
├── nginx.conf                       # Local Docker dev (mirror of meta CSP)
├── docker-compose.yml               # Local Docker dev orchestration
└── Dockerfile                       # Multi-stage Alpine Nginx build
```

---

## Contributing

Commits follow **Conventional Commits** (enforced by Husky + commitlint). Allowed prefixes:

| Prefix      | Usage                                                         |
| ----------- | ------------------------------------------------------------- |
| `feat:`     | New feature                                                   |
| `fix:`      | Bug fix                                                       |
| `docs:`     | Documentation only                                            |
| `style:`    | Formatting (Prettier)                                         |
| `refactor:` | Code restructuring                                            |
| `test:`     | Adding or updating tests                                      |
| `chore:`    | Tooling, dependencies, config                                 |
| `perf:`     | Performance improvement                                       |
| `security:` | Security-only change (no feature work bundled)                |
| `harden:`   | Defensive hardening (CSP, supply chain, input validation)     |
| `doctrine:` | Amendment to `DOCTRINE.md` (only the doctrine + the artifact) |
| `ci:`       | CI / workflow changes                                         |

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes following the convention above
4. Run `npm test`, `npm run lint`, `npm run csp:check`, `npm run doctrine:check`
5. Push to your fork and open a Pull Request

---

## License

MIT — Made by [Renan](https://github.com/renanaugustomacena-ux)
