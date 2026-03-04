<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
  <img src="https://img.shields.io/badge/docker-ready-green.svg" alt="Docker" />
  <img src="https://img.shields.io/badge/deploy-Netlify-00C7B7.svg" alt="Netlify" />
  <img src="https://img.shields.io/badge/JS-Vanilla%20ES6+-F7DF1E.svg" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/3D-Three.js-000000.svg" alt="Three.js" />
  <img src="https://img.shields.io/badge/tests-Vitest-6E9F18.svg" alt="Vitest" />
</p>

<h1 align="center">Knowledge AIO</h1>

<p align="center">
  <strong>Learn English through hip-hop music, karaoke practice, and interactive exercises — fully local, fully secure.</strong>
</p>

<p align="center">
  <a href="https://english-app-renan.netlify.app/"><strong>Try it now</strong></a>
</p>

<p align="center">
  <a href="README.it.md">Italiano</a> &middot;
  <a href="README.pt-br.md">Portugues Brasileiro</a>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Launch Guide](#quick-launch-guide)
- [Development](#development)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Security](#security)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Knowledge AIO** is a local-first single-page application that helps Italian speakers learn English from survival level to C1 proficiency. It combines traditional structured lessons with music-based learning (karaoke with phonetics) and deep technical vocabulary across four domains: Cybersecurity, Python, Linux, and Software Development.

All user data stays on-device via IndexedDB — no accounts, no server-side data collection, no tracking. The app runs inside a security-hardened Docker container or can be deployed as a static site on Netlify.

---

## Features

### Learning Modes

| Mode | Description |
|------|-------------|
| **Karaoke Learning** | Step-by-step and real-time modes with phonetic transcription, vocabulary breakdown, and synchronized lyrics |
| **Structured Lessons** | 4 levels (0-3) covering Survival, Daily Life, Intermediate Grammar, and C1 Advanced English |
| **7 Practice Modes** | Listening, Writing, Matching, Fill-in-the-blank, Sentence reconstruction, Comprehension, Scenario |
| **Technical Topics** | 4 domains (Cybersecurity, Python, Linux, Software Dev), 12 levels each, 11 exercise types including code challenges |
| **Word of the Day** | Deterministic daily vocabulary rotation drawn from all sources |

### Visual Experience

| Effect | Description |
|--------|-------------|
| **Splash Screen** | Animated luxury logo reveal on startup |
| **3D Matrix Rain** | Three.js morphing background with cursor-following deformation and refraction |
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

> Everything you need to get the app running in under 2 minutes.

### Prerequisites

| Tool               | Minimum Version | Check command            |
|--------------------|-----------------|--------------------------|
| **Docker**         | 20.10+          | `docker --version`       |
| **Docker Compose** | v2+             | `docker compose version` |

### 1. Clone the repository

```bash
git clone https://github.com/renanaugustomacena-ux/security-teacher.git
cd security-teacher
```

### 2. Build and launch

```bash
docker compose up --build -d
```

This command:

- Builds the **Alpine Nginx** image with hardened security headers (CSP, X-Frame-Options, MIME protection)
- Runs nginx as a **non-root user** (UID 101) with all capabilities dropped
- Mounts your source code for **live development updates**

### 3. Open the app

```
http://localhost:8080
```

You should see the Knowledge AIO splash screen followed by the dashboard with the matrix rain background.

> The first build downloads the base image and may take 1-2 minutes. Subsequent starts are instant.

### 4. Stop the app

```bash
# Graceful stop (keeps the built image)
docker compose down

# Stop and remove all built images
docker compose down --rmi all
```

### Verify it is running

```bash
# Check container status
docker ps --filter name=Renan-english-app

# Quick HTTP health check
curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:8080/

# View live logs
docker logs Renan-english-app --tail 50 -f
```

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
  +-- Nginx (Docker) or Netlify (static deploy)
```

### Key design decisions

- **No framework** — Vanilla ES6+ modules, no build step, no bundler
- **Local-first data** — IndexedDB via `StorageService`, zero server dependency
- **Lazy-loaded topics** — Technical domain data loaded on-demand via dynamic `import()`
- **Graceful degradation** — Visual effects wrapped in error boundaries, fail silently
- **Service pattern** — `AudioService`, `LyricsService`, `StorageService` isolate I/O concerns

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Language** | Vanilla JavaScript (ES6+ modules) |
| **3D Effects** | Three.js + custom WebGL shaders |
| **Audio** | Web Audio API |
| **Lyrics Sync** | LRCLIB API |
| **Translation** | MyMemory Translation API |
| **Persistence** | IndexedDB (via StorageService) |
| **Styling** | CSS3 with custom properties |
| **Fonts** | Raleway, Inter, JetBrains Mono (Google Fonts) |
| **Container** | Nginx 1.25 on Alpine Linux |
| **Static Deploy** | Netlify |
| **Testing** | Vitest |
| **Linting** | ESLint (Airbnb base) + Prettier |
| **Git Hooks** | Husky + commitlint (Conventional Commits) |

---

## Security

### Docker container hardening

| Control | Implementation |
|---------|---------------|
| **Non-root execution** | nginx runs as UID 101, all capabilities dropped via `cap_drop: ALL` |
| **CSP headers** | Strict allowlist for script, style, connect, font, and media sources |
| **X-Frame-Options** | `DENY` — prevents clickjacking |
| **X-Content-Type-Options** | `nosniff` — prevents MIME-type sniffing |
| **X-XSS-Protection** | Enabled with `mode=block` |
| **Referrer-Policy** | `strict-origin-when-cross-origin` |
| **Healthcheck** | Built-in Docker healthcheck endpoint |
| **Minimal image** | Alpine Linux base, no unnecessary packages |

### Netlify deployment

The same security headers are enforced via `netlify.toml` for static deployments.

---

## Project Structure

```
knowledge-aio/
|-- index.html                  # SPA entry point
|-- css/
|   +-- style.css               # All styles
|-- js/
|   |-- app.js                  # Main entry, routing
|   |-- music.js                # Karaoke manager
|   |-- lessons.js              # English lesson database (Levels 0-3)
|   |-- songs.js                # Song library with vocabulary
|   |-- PracticeManager.js      # 7 practice mode engines
|   |-- LearnManager.js         # Lesson UI and flow
|   |-- progress.js             # Progress tracking + stats
|   |-- MorphBackground.js      # 3D matrix rain (Three.js)
|   |-- CursorParticles.js      # Cursor particle trail
|   |-- services/
|   |   |-- AudioService.js     # Web Audio API abstraction
|   |   |-- LyricsService.js    # LRCLIB integration + translation
|   |   +-- StorageService.js   # IndexedDB wrapper
|   |-- store/
|   |   +-- index.js            # Pub/sub state management
|   +-- topics/
|       |-- TopicManager.js     # Technical topic hub
|       |-- TopicPracticeManager.js  # 11 topic exercise types
|       |-- registry.js         # Topic metadata
|       +-- data/
|           |-- cybersecurity.js
|           |-- python.js
|           |-- linux.js
|           +-- software-dev.js
|-- tests/
|   |-- lessons.test.js
|   |-- songs.test.js
|   +-- store.test.js
|-- Dockerfile                  # Multi-stage Nginx build
|-- docker-compose.yml          # Dev orchestration
|-- nginx.conf                  # Hardened Nginx config
|-- netlify.toml                # Netlify deploy + headers
|-- package.json                # Dev tooling (lint, test, hooks)
+-- _redirects                  # SPA routing for Netlify
```

---

## Contributing

Commits follow **Conventional Commits** (enforced by Husky + commitlint):

| Prefix     | Usage                        |
|------------|------------------------------|
| `feat:`    | New feature                  |
| `fix:`     | Bug fix                      |
| `docs:`    | Documentation only           |
| `style:`   | Formatting (Prettier)        |
| `refactor:`| Code restructuring           |
| `test:`    | Adding or updating tests     |
| `chore:`   | Tooling, dependencies, config|

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes following the convention above
4. Push to your fork and open a Pull Request

---

## License

MIT — Made by [Renan](https://github.com/renanaugustomacena-ux)
