/* eslint-disable no-restricted-globals */
/**
 * Service Worker — Adamantium variant.
 *
 * Key hardening vs. prior revision:
 *   - No unconditional self.skipWaiting() on install. Waiting SW only takes
 *     over when a controlled tab explicitly posts { type: 'SW_SKIP_WAITING' }.
 *     This stops a rogue / bad SW update from silently replacing all open
 *     tabs — even if the attacker briefly controls the origin.
 *   - CDN caching removed. Post phase-1.2 there are no cross-origin JS/CSS
 *     dependencies; only same-origin /vendor/*, /js/*, /css/* get cached.
 *     This eliminates the cross-origin cache-poisoning surface entirely.
 *   - fetch handler integrity gate: cross-origin responses never enter cache,
 *     opaque responses are passed through but never persisted.
 *   - Vendored script integrity: SHA-384 of three.js checked at install time.
 *   - Only GET requests enter cache. Non-GET is always network-only.
 *   - Response size cap: responses > 10 MB are never persisted to cache.
 */
const CACHE_NAME = 'kaio-v10';

const MAX_CACHE_RESPONSE_BYTES = 10 * 1024 * 1024;

const VENDOR_INTEGRITY = {
  './vendor/three-0.170.0.module.js':
    'sha384-SwvIjyNmQwvUEu5SS9l6lbWqQIcOt1xpoP4YzvOp/DrURn0WVrTcgIm2kwWFTmj3',
};

const STATIC_ASSETS = [
  './',
  './index.html',
  './404.html',
  './css/style.css',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './js/app.js',
  './js/sw-register.js',
  './js/AchievementManager.js',
  './js/ConversationManager.js',
  './js/CursorParticles.js',
  './js/DailyGoalsManager.js',
  './js/LeaderboardManager.js',
  './js/LearnManager.js',
  './js/lessons.js',
  './js/MorphBackground.js',
  './js/music.js',
  './js/MusicPlayerUI.js',
  './js/PracticeHUD.js',
  './js/PracticeManager.js',
  './js/PracticeRendering.js',
  './js/ProfileManager.js',
  './js/progress.js',
  './js/ProgressRendering.js',
  './js/ProgressTopics.js',
  './js/PronunciationManager.js',
  './js/songs.js',
  './js/SRSManager.js',
  './js/StreakCalendarManager.js',
  './js/data/achievements.js',
  './js/data/lessons-level-0.js',
  './js/data/lessons-level-1.js',
  './js/data/lessons-level-2.js',
  './js/data/lessons-level-3.js',
  './js/services/AIService.js',
  './js/services/AudioService.js',
  './js/services/data/ai-grammar-rules.js',
  './js/services/data/ai-scenarios.js',
  './js/services/AuthService.js',
  './js/services/LyricsService.js',
  './js/services/SfxService.js',
  './js/services/StorageService.js',
  './js/services/AdaptiveDifficultyService.js',
  './js/services/AnalyticsService.js',
  './js/services/CertificateService.js',
  './js/services/CurrencyService.js',
  './js/services/HintService.js',
  './js/services/MasteryService.js',
  './js/services/NotificationService.js',
  './js/services/PlacementTestService.js',
  './js/services/QuestService.js',
  './js/services/SmartScoreService.js',
  './js/services/StudyPlanService.js',
  './js/services/ReferenceService.js',
  './js/services/KnowledgeGraphService.js',
  './js/services/StatsDashboardService.js',
  './js/services/TTSService.js',
  './js/store/index.js',
  './js/utils/DateUtils.js',
  './js/utils/EventDispatch.js',
  './js/utils/SanitizeHtml.js',
  './js/views/login-wall.js',
  './js/utils/PracticeUtils.js',
  './js/utils/StringDistance.js',
  './js/topics/TopicPlacement.js',
  './js/topics/TopicManager.js',
  './js/topics/TopicBossChallenge.js',
  './js/topics/TopicLessonEngine.js',
  './js/topics/TopicPracticeManager.js',
  './js/topics/TopicPracticeConstants.js',
  './js/topics/TopicPracticeAdvancedModes.js',
  './js/topics/TopicPracticeAdvancedQuestions.js',
  './js/topics/TopicPracticeRendering.js',
  './js/topics/TopicPracticeResultHandler.js',
  './js/topics/TopicVelocita.js',
  './js/topics/registry.js',
  './js/topics/data/topic-lesson-intros.js',
  './js/topics/data/ai-engineering.js',
  './js/topics/data/c-programming.js',
  './js/topics/data/cloud-computing.js',
  './js/topics/data/cpp.js',
  './js/topics/data/cybersecurity.js',
  './js/topics/data/databases.js',
  './js/topics/data/devsecops.js',
  './js/topics/data/docker-k8s.js',
  './js/topics/data/ethical-hacking.js',
  './js/topics/data/git-vcs.js',
  './js/topics/data/linux.js',
  './js/topics/data/networking.js',
  './js/topics/data/nodejs.js',
  './js/topics/data/python.js',
  './js/topics/data/rust.js',
  './js/topics/data/software-dev.js',
  './js/topics/data/system-monitoring.js',
  './js/topics/data/techtalk-scenarios.js',
  './vendor/three-0.170.0.module.js',
  './vendor/fonts/fonts.css',
];

const EXTERNAL_API_HOSTS = ['lrclib.net', 'mymemory.translated.net'];

async function verifyIntegrity(cache) {
  for (const [path, expected] of Object.entries(VENDOR_INTEGRITY)) {
    const resp = await cache.match(path);
    if (!resp) continue;
    const buf = await resp.clone().arrayBuffer();
    const algo = expected.split('-')[0];
    const hash = await crypto.subtle.digest(algo.toUpperCase().replace('SHA', 'SHA-'), buf);
    const b64 = btoa(String.fromCharCode(...new Uint8Array(hash)));
    if (expected !== `${algo}-${b64}`) {
      await cache.delete(path);
      throw new Error(`Integrity mismatch: ${path}`);
    }
  }
}

// Install: pre-cache static assets + verify vendored file integrity.
// NO skipWaiting — the new SW stays in "waiting" state until the user
// opts in via the update toast.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS).then(() => cache))
      .then((cache) => verifyIntegrity(cache))
  );
});

// Activate: drop old cache versions and claim clients. clients.claim() is
// safe here because activation only happens after the waiting SW was
// explicitly promoted via SW_SKIP_WAITING.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

// Controlled update handshake. Tab-side sw-register.js posts this message
// when the user clicks the "Nuova versione disponibile" toast. Only accept
// from controlled clients (same origin) — reject postMessage from foreign
// frames or extension contexts.
self.addEventListener('message', (event) => {
  if (!event.source) return;
  if (event.data && event.data.type === 'SW_SKIP_WAITING') {
    self.skipWaiting();
  }
});

function cacheFirstSameOrigin(request) {
  return caches.match(request).then((cached) => {
    if (cached) return cached;
    return fetch(request)
      .then((response) => {
        if (
          !response ||
          response.status !== 200 ||
          response.type === 'opaque' ||
          response.type === 'error'
        ) {
          return response;
        }
        const size = response.headers.get('content-length');
        if (size && Number(size) > MAX_CACHE_RESPONSE_BYTES) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => cached);
  });
}

self.addEventListener('fetch', (event) => {
  // Only cache GET requests. POST/PUT/DELETE are always network-only.
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Block non-http(s) schemes from reaching the network.
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return;

  // Navigation: network-first so security updates reach users. Offline
  // falls back to cached index.html.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match('./index.html').then((cached) => cached || Response.error())
      )
    );
    return;
  }

  // External APIs: network-only, never cache. Prevents a single malicious
  // response from becoming a persistent client-side attack vector.
  if (EXTERNAL_API_HOSTS.some((host) => url.hostname.includes(host))) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Same-origin: cache-first.
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirstSameOrigin(event.request));
    return;
  }

  // Anything else cross-origin: plain network, no caching.
  event.respondWith(fetch(event.request));
});
