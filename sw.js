/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'kaio-v4';

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
  './js/progress.js',
  './js/PronunciationManager.js',
  './js/songs.js',
  './js/SRSManager.js',
  './js/StreakCalendarManager.js',
  './js/data/achievements.js',
  './js/services/AIService.js',
  './js/services/AudioService.js',
  './js/services/LyricsService.js',
  './js/services/StorageService.js',
  './js/services/TTSService.js',
  './js/store/index.js',
  './js/utils/DateUtils.js',
  './js/topics/TopicManager.js',
  './js/topics/TopicBossChallenge.js',
  './js/topics/TopicPracticeManager.js',
  './js/topics/registry.js',
  './js/topics/data/cybersecurity.js',
  './js/topics/data/linux.js',
  './js/topics/data/python.js',
  './js/topics/data/software-dev.js',
  './js/topics/data/techtalk-scenarios.js',
];

const EXTERNAL_API_HOSTS = ['lrclib.net', 'mymemory.translated.net'];

const CDN_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net'];

// Install: pre-cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
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

// Cache-first: try cache, fall back to network and cache the response
function cacheFirstStrategy(request) {
  return caches.match(request).then((cached) => {
    if (cached) {
      return cached;
    }
    return fetch(request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => cached);
  });
}

// Network-first for local assets (HTML, etc): try network, fall back to cache.
// The network response is cached so future offline loads still work.
function networkFirstStrategy(request) {
  return fetch(request)
    .then((response) => {
      if (response && response.status === 200 && response.type !== 'opaque') {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
      }
      return response;
    })
    .catch(() => caches.match(request));
}

// Network-only for external APIs: never cache responses. Avoids a single
// compromised response becoming a persistent client-side XSS vector via
// cache poisoning. Offline users simply see a normal fetch failure.
function networkOnlyPassthrough(request) {
  return fetch(request);
}

// Fetch: strategy depends on request type
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Navigation requests: network-first so security updates reach users.
  // Fall back to cached index.html when offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match('./index.html').then((cached) => cached || Response.error())
      )
    );
    return;
  }

  // External API requests: network-only, never cache.
  if (EXTERNAL_API_HOSTS.some((host) => url.hostname.includes(host))) {
    event.respondWith(networkOnlyPassthrough(event.request));
    return;
  }

  // CDN resources: cache-first
  if (CDN_HOSTS.some((host) => url.hostname.includes(host))) {
    event.respondWith(cacheFirstStrategy(event.request));
    return;
  }

  // Same-origin requests: cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirstStrategy(event.request));
    return;
  }

  // All other requests: network only
  event.respondWith(fetch(event.request));
});
