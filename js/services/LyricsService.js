/**
 * Lyrics Service
 * Handles fetching synced lyrics, translations, and phonetics.
 * Multi-strategy search with robust filename parsing.
 *
 * Hardening: treat LRCLIB + MyMemory as untrusted third parties. Every
 * user-visible string pulled from their JSON is bidi-stripped + length-capped.
 * Response shapes are validated before use so a compromised CDN cannot
 * coerce consumers with wrong types.
 */
import { stripBidi } from '../utils/SanitizeHtml.js';

const LRCLIB_FETCH_TIMEOUT_MS = 10_000;

// Hard caps for strings coming off the wire. Picked to be larger than any
// realistic real-world value so a malicious response can't exhaust memory
// or smuggle an attack payload past downstream renderers.
const MAX_LYRICS_LEN = 100_000; // plainLyrics / syncedLyrics
const MAX_TITLE_LEN = 512; // trackName / artistName
const MAX_TRANSLATION_LEN = 12_000; // MyMemory translatedText

function sanitizeLyricText(value, max) {
  if (typeof value !== 'string') return '';
  const stripped = stripBidi(value).replace(/\0/g, '');
  return stripped.length > max ? stripped.slice(0, max) : stripped;
}

function sanitizeLrclibResult(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const out = Object.create(null);
  if (raw.plainLyrics != null) {
    out.plainLyrics = sanitizeLyricText(raw.plainLyrics, MAX_LYRICS_LEN);
  }
  if (raw.syncedLyrics != null) {
    out.syncedLyrics = sanitizeLyricText(raw.syncedLyrics, MAX_LYRICS_LEN);
  }
  if (raw.trackName != null) {
    out.trackName = sanitizeLyricText(raw.trackName, MAX_TITLE_LEN);
  }
  if (raw.artistName != null) {
    out.artistName = sanitizeLyricText(raw.artistName, MAX_TITLE_LEN);
  }
  if (typeof raw.duration === 'number' && Number.isFinite(raw.duration)) {
    out.duration = raw.duration;
  }
  return out;
}

class LyricsService {
  constructor() {
    this.baseUrl = 'https://lrclib.net/api';
    this.translationUrl = 'https://api.mymemory.translated.net/get';
    this._translationCache = new Map();
  }

  async _fetchWithTimeout(url, { timeoutMs = LRCLIB_FETCH_TIMEOUT_MS } = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, { signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
  }

  // ═══════════════════════════════════════════
  // FILENAME PARSING
  // ═══════════════════════════════════════════

  parseFilename(filename) {
    let clean = filename.replace(/\.[^/.]+$/, '');

    // Remove ALL content in parentheses: (feat. X), (Official Audio), (Radio Edit), etc.
    clean = clean.replace(/\(.*?\)/g, '');

    // Remove ALL content in brackets: [HD], [Explicit], etc.
    clean = clean.replace(/\[.*?\]/g, '');

    // Replace underscores with spaces
    clean = clean.replace(/_/g, ' ');

    // Remove hashtags
    clean = clean.replace(/#\S+/g, '');

    // Remove noise words
    const noiseWords = [
      'official',
      'audio',
      'video',
      'lyrics',
      'explicit',
      'remaster(?:ed)?',
      'hd',
      'hq',
      '4k',
      '1080p',
      '720p',
      'live',
      'remix',
      'acoustic',
      'clean\\s*version',
      'radio\\s*edit',
      'prod',
      'produced\\s*by',
      'full\\s*album',
      'single',
      'visualizer',
      'extended',
      'bonus\\s*track',
      'deluxe',
      'music\\s*video',
    ];
    const noiseRegex = new RegExp(`\\b(${noiseWords.join('|')})\\b`, 'gi');
    clean = clean.replace(noiseRegex, '');

    // Remove isolated years (1900-2099)
    clean = clean.replace(/\b(19|20)\d{2}\b/g, '');

    // Detect artist-title separator
    const separators = [' _-_ ', ' - ', ' – ', ' — ', ' ~ ', ' : '];
    let artist = '';
    let track = clean;

    for (const sep of separators) {
      if (clean.includes(sep)) {
        const parts = clean.split(sep);
        artist = parts[0].trim();
        track = parts.slice(1).join(sep).trim();
        break;
      }
    }

    // Try "by" pattern if no separator found
    if (!artist) {
      const byMatch = clean.match(/^(.+?)\s+by\s+(.+)$/i);
      if (byMatch) {
        track = byMatch[1].trim();
        artist = byMatch[2].trim();
      }
    }

    // Collapse multiple spaces, trim
    artist = artist.replace(/\s+/g, ' ').trim();
    track = track.replace(/\s+/g, ' ').trim();

    return { artist: artist || 'Unknown Artist', track: track || clean.trim() };
  }

  // ═══════════════════════════════════════════
  // SEARCH HELPERS
  // ═══════════════════════════════════════════

  cleanSearchTerm(text) {
    if (!text) return '';
    return text
      .replace(/\(.*?\)/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/[^\w\s'-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  simplifyTitle(title) {
    const words = title.split(/\s+/);
    const variants = [];
    for (let len = words.length; len >= 1; len--) {
      variants.push(words.slice(0, len).join(' '));
    }
    return variants;
  }

  async _tryGetEndpoint(artist, track, duration) {
    try {
      const url = new URL(`${this.baseUrl}/get`);
      if (artist && artist !== 'Unknown Artist') {
        url.searchParams.append('artist_name', artist);
      }
      url.searchParams.append('track_name', track);
      if (duration) url.searchParams.append('duration', Math.round(duration));
      const response = await this._fetchWithTimeout(url.toString());
      if (!response.ok) return null;
      const data = await response.json();
      return sanitizeLrclibResult(data);
    } catch (err) {
      if (err?.name === 'AbortError') throw err;
      return null;
    }
  }

  async _trySearchEndpoint(query, requireSynced = true) {
    try {
      const url = new URL(`${this.baseUrl}/search`);
      url.searchParams.append('q', query);
      const response = await this._fetchWithTimeout(url.toString());
      if (!response.ok) return null;
      const results = await response.json();
      if (!Array.isArray(results) || results.length === 0) return null;

      const sanitized = results
        .slice(0, 50)
        .map((r) => sanitizeLrclibResult(r))
        .filter(Boolean);
      if (sanitized.length === 0) return null;

      if (requireSynced) {
        const synced = sanitized.find((r) => r.syncedLyrics);
        return synced || null;
      }
      return sanitized[0];
    } catch (err) {
      if (err?.name === 'AbortError') throw err;
      return null;
    }
  }

  _normalizeTitleVariants(cleanTrack) {
    const variants = new Set();
    const stripParen = cleanTrack.replace(/\s+-\s+(feat|ft|with|prod).*$/i, '').trim();
    if (stripParen && stripParen !== cleanTrack) variants.add(stripParen);
    const dropQualifiers = cleanTrack
      .replace(/\b(feat|ft|with|prod)\b.*$/i, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (dropQualifiers && dropQualifiers !== cleanTrack) variants.add(dropQualifiers);
    return [...variants];
  }

  // ═══════════════════════════════════════════
  // MAIN SEARCH - MULTI-STRATEGY CASCADE
  // ═══════════════════════════════════════════

  async findLyrics(artist, trackName, duration) {
    try {
      if (!artist && trackName) {
        const parsed = this.parseFilename(trackName);
        artist = parsed.artist;
        trackName = parsed.track;
      }

      const cleanArtist = this.cleanSearchTerm(artist);
      const cleanTrack = this.cleanSearchTerm(trackName);
      let result;

      // Strategy 1: /api/get with artist + track + duration
      result = await this._tryGetEndpoint(cleanArtist, cleanTrack, duration);
      if (result?.syncedLyrics) return result;

      // Strategy 2: /api/get without duration (file duration may be wrong)
      result = await this._tryGetEndpoint(cleanArtist, cleanTrack, null);
      if (result?.syncedLyrics) return result;

      // Strategy 3: /api/search with "artist track"
      const fullQuery =
        cleanArtist && cleanArtist !== 'Unknown Artist'
          ? `${cleanArtist} ${cleanTrack}`
          : cleanTrack;
      result = await this._trySearchEndpoint(fullQuery, true);
      if (result?.syncedLyrics) return result;

      // Strategy 4: /api/search with track only (no artist)
      if (cleanArtist && cleanArtist !== 'Unknown Artist') {
        result = await this._trySearchEndpoint(cleanTrack, true);
        if (result?.syncedLyrics) return result;
      }

      // Strategy 5: normalized title variants (strip feat./ft./with qualifiers)
      for (const variant of this._normalizeTitleVariants(cleanTrack)) {
        result = await this._trySearchEndpoint(
          cleanArtist && cleanArtist !== 'Unknown Artist' ? `${cleanArtist} ${variant}` : variant,
          true
        );
        if (result?.syncedLyrics) return result;
      }

      // Strategy 6: progressively simplified title
      const titleVariants = this.simplifyTitle(cleanTrack);
      for (let i = 1; i < titleVariants.length; i++) {
        result = await this._trySearchEndpoint(titleVariants[i], true);
        if (result?.syncedLyrics) return result;
      }

      // Strategy 7: retry without requiring synced lyrics
      result = await this._tryGetEndpoint(cleanArtist, cleanTrack, duration);
      if (result?.plainLyrics) return result;

      result = await this._trySearchEndpoint(fullQuery, false);
      if (result) return result;

      result = await this._trySearchEndpoint(cleanTrack, false);
      if (result) return result;

      return null;
    } catch (err) {
      if (err?.name === 'AbortError') throw err;
      console.error('LyricsService Error:', err);
      return null;
    }
  }

  // ═══════════════════════════════════════════
  // TRANSLATION (with cache)
  // ═══════════════════════════════════════════

  async translate(text, langPair = 'en|it') {
    if (!text || !text.trim()) return '';

    const cacheKey = `${langPair}:${text}`;

    // Check cache
    if (this._translationCache.has(cacheKey)) {
      const cached = this._translationCache.get(cacheKey);
      if (typeof cached === 'string') {
        // LRU: move to end by re-inserting
        this._translationCache.delete(cacheKey);
        this._translationCache.set(cacheKey, cached);
        return cached;
      }
      // In-flight: wait for it instead of returning empty
      return new Promise((resolve) => {
        let intervalId;
        const timeoutId = setTimeout(() => {
          if (intervalId) clearInterval(intervalId);
          const val = this._translationCache.get(cacheKey);
          resolve(typeof val === 'string' ? val : '...');
        }, 5000);
        intervalId = setInterval(() => {
          const val = this._translationCache.get(cacheKey);
          if (typeof val === 'string') {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            resolve(val);
          }
        }, 100);
      });
    }

    // Mark as in-flight with a non-string sentinel
    this._translationCache.set(cacheKey, false);

    // LRU cache eviction
    if (this._translationCache.size > 500) {
      const firstKey = this._translationCache.keys().next().value;
      this._translationCache.delete(firstKey);
    }

    try {
      const url = new URL(this.translationUrl);
      url.searchParams.append('q', text);
      url.searchParams.append('langpair', langPair);

      const response = await this._fetchWithTimeout(url.toString(), { timeoutMs: 8000 });
      if (!response.ok) {
        throw new Error(`Translation API returned ${response.status}`);
      }
      const data = await response.json();
      if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error('MyMemory: non-object response');
      }
      const raw = data?.responseData?.translatedText;
      const translated =
        typeof raw === 'string' && raw.length > 0
          ? sanitizeLyricText(raw, MAX_TRANSLATION_LEN)
          : '';

      this._translationCache.set(cacheKey, translated || '...');
      return translated || '...';
    } catch (err) {
      console.warn('Translation failed:', err);
      this._translationCache.set(cacheKey, '...');
      return '...';
    }
  }

  // ═══════════════════════════════════════════
  // PHONETICS
  // ═══════════════════════════════════════════

  getPhonetics(text) {
    if (!text) return '';
    return text
      .toLowerCase()
      .replace(/th/g, '\u03B8')
      .replace(/sh/g, '\u0283')
      .replace(/ch/g, 't\u0283')
      .replace(/ee/g, 'i\u02D0')
      .replace(/oo/g, 'u\u02D0')
      .replace(/a(?=\s|n)/g, '\u0259')
      .replace(/i(?=\s|n)/g, '\u026A');
  }

  // ═══════════════════════════════════════════
  // LRC PARSER
  // ═══════════════════════════════════════════

  parseLrc(lrc) {
    if (!lrc || typeof lrc !== 'string') return [];
    // Upper bounds defend against malicious or truncated inputs causing
    // CPU exhaustion during timestamp scanning.
    const MAX_LRC_BYTES = 1_000_000;
    const MAX_LINES = 10_000;
    const MAX_LINE_LEN = 10_000;
    const MAX_TIMESTAMPS_PER_LINE = 64;

    if (lrc.length > MAX_LRC_BYTES) {
      console.warn('parseLrc: input exceeds size limit, truncating');
      lrc = lrc.slice(0, MAX_LRC_BYTES);
    }

    const MAX_PARSED_LINES = 2000;
    const lines = lrc.split('\n').slice(0, MAX_LINES);
    const lyrics = [];
    const timestampRegex = /\[(\d{1,3}):(\d{2})(?:\.(\d{1,3}))?\]/g;

    for (const line of lines) {
      if (lyrics.length >= MAX_PARSED_LINES) break;
      if (line.length > MAX_LINE_LEN) continue;
      const timestamps = [];
      let match;
      let count = 0;
      while ((match = timestampRegex.exec(line)) !== null) {
        if (++count > MAX_TIMESTAMPS_PER_LINE) break;
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const millisecondsRaw = match[3] || '0';
        const milliseconds = parseInt(millisecondsRaw.padEnd(3, '0'), 10);
        const time = minutes * 60 + seconds + milliseconds / 1000;
        timestamps.push(time);
      }
      timestampRegex.lastIndex = 0;
      const stripped = stripBidi(line.replace(/\[[^\]]+\]/g, '')).trim();
      if (stripped && timestamps.length > 0) {
        for (const time of timestamps) {
          if (lyrics.length >= MAX_PARSED_LINES) break;
          lyrics.push({ time, text: stripped });
        }
      }
    }
    return lyrics.sort((a, b) => a.time - b.time);
  }
}

export const lyricsService = new LyricsService();
