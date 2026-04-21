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
 */
const CACHE_NAME = 'kaio-v5';

const STATIC_ASSETS = [
  './',
  './index.html',
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
  './js/PracticeManager.js',
  './js/ProfileManager.js',
  './js/progress.js',
  './js/PronunciationManager.js',
  './js/songs.js',
  './js/SRSManager.js',
  './js/StreakCalendarManager.js',
  './js/data/achievements.js',
  './js/services/AIService.js',
  './js/services/AudioService.js',
  './js/services/AuthService.js',
  './js/services/LyricsService.js',
  './js/services/StorageService.js',
  './js/services/TTSService.js',
  './js/store/index.js',
  './js/utils/DateUtils.js',
  './js/utils/SanitizeHtml.js',
  './js/topics/TopicManager.js',
  './js/topics/TopicBossChallenge.js',
  './js/topics/TopicPracticeManager.js',
  './js/topics/registry.js',
  './js/topics/data/cybersecurity.js',
  './js/topics/data/linux.js',
  './js/topics/data/python.js',
  './js/topics/data/software-dev.js',
  './js/topics/data/techtalk-scenarios.js',
  './vendor/three-0.170.0.module.js',
  './vendor/fonts/fonts.css',
];

const EXTERNAL_API_HOSTS = ['lrclib.net', 'mymemory.translated.net'];

// Install: pre-cache static assets. NO skipWaiting — the new SW stays in
// "waiting" state until the user opts in via the update toast.
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)));
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
// when the user clicks the "Nuova versione disponibile" toast.
self.addEventListener('message', (event) => {
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
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => cached);
  });
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

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
