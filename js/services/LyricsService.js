/**
 * Lyrics Service
 * Handles fetching synced lyrics, translations, and phonetics.
 * Multi-strategy search with robust filename parsing.
 */
class LyricsService {
  constructor() {
    this.baseUrl = 'https://lrclib.net/api';
    this.translationUrl = 'https://api.mymemory.translated.net/get';
    this._translationCache = new Map();
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
      const response = await fetch(url.toString());
      if (!response.ok) return null;
      const data = await response.json();
      return data;
    } catch {
      return null;
    }
  }

  async _trySearchEndpoint(query, requireSynced = true) {
    try {
      const url = new URL(`${this.baseUrl}/search`);
      url.searchParams.append('q', query);
      const response = await fetch(url.toString());
      if (!response.ok) return null;
      const results = await response.json();
      if (!results || results.length === 0) return null;

      if (requireSynced) {
        const synced = results.find((r) => r.syncedLyrics);
        return synced || null;
      }
      return results[0];
    } catch {
      return null;
    }
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

      // Strategy 5: progressively simplified title
      const titleVariants = this.simplifyTitle(cleanTrack);
      for (let i = 1; i < titleVariants.length; i++) {
        result = await this._trySearchEndpoint(titleVariants[i], true);
        if (result?.syncedLyrics) return result;
      }

      // Strategy 6: retry all without requiring synced lyrics
      result = await this._tryGetEndpoint(cleanArtist, cleanTrack, duration);
      if (result?.plainLyrics) return result;

      result = await this._trySearchEndpoint(fullQuery, false);
      if (result) return result;

      result = await this._trySearchEndpoint(cleanTrack, false);
      if (result) return result;

      return null;
    } catch (err) {
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

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`Translation API returned ${response.status}`);
      }
      const data = await response.json();
      const translated = data.responseData?.translatedText || '';

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
    if (!lrc) return [];
    const lines = lrc.split('\n');
    const lyrics = [];
    const timestampRegex = /\[(\d{1,3}):(\d{2})(?:\.(\d{1,3}))?\]/g;

    lines.forEach((line) => {
      const timestamps = [];
      let match;
      while ((match = timestampRegex.exec(line)) !== null) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const millisecondsRaw = match[3] || '0';
        const milliseconds = parseInt(millisecondsRaw.padEnd(3, '0'), 10);
        const time = minutes * 60 + seconds + milliseconds / 1000;
        timestamps.push(time);
      }
      const text = line.replace(/\[[^\]]+\]/g, '').trim();
      if (text && timestamps.length > 0) {
        timestamps.forEach((time) => lyrics.push({ time, text }));
      }
    });
    return lyrics.sort((a, b) => a.time - b.time);
  }
}

export const lyricsService = new LyricsService();
