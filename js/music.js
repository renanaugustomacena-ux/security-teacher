/**
 * MUSIC / KARAOKE MODULE — manual-upload only
 * ===========================================
 *
 * User uploads an .mp3 (required) and optionally a .lrc lyrics file.
 * If no .lrc is given we try to auto-discover synced lyrics on LRCLIB.
 * English + Italian translations render in a scrolling block synced
 * to playback via a requestAnimationFrame driver.
 */

import { audioService } from './services/AudioService.js';
import { lyricsService } from './services/LyricsService.js';
import { storageService } from './services/StorageService.js';
import { stripBidi } from './utils/SanitizeHtml.js';

const OFFSET_STORE_KEY = 'karaoke_offsets';
const OFFSET_SETTINGS_KEY = 'settings';

// Upload guards — defend against memory-exhaustion DoS + malformed-file crashes.
const MAX_AUDIO_BYTES = 100 * 1024 * 1024; // 100 MB — covers a ~60 min FLAC.
const MAX_LRC_BYTES = 2 * 1024 * 1024; // 2 MB — well beyond any real .lrc.
const AUDIO_EXT_RE = /\.(mp3|wav|ogg|flac|m4a|aac|opus)$/i;
const LRC_EXT_RE = /\.(lrc|txt)$/i;

function safeTitleFromFilename(name) {
  return stripBidi(String(name || '').replace(/\.[^/.]+$/, '')).slice(0, 256);
}

export class MusicManager {
  constructor(progressManager) {
    this.progressManager = progressManager;

    this.currentSong = null;
    this.currentAudioFile = null;
    this.syncedLyrics = [];
    this.lyricsLineElements = [];
    this.translationCache = {};
    this.currentLineIndex = -1;

    this.syncOffset = 0;
    this._rafId = null;
    this._pendingLrc = null;
    this._currentOffsetKey = null;
    this._offsetCache = null;
    this._completed = false;

    this.init();
  }

  init() {
    window.musicManager = this;
    this.bindEvents();

    audioService.onPlaybackEnd = () => {
      this.stopSyncLoop();
      this._updatePlayButton(false);
      this._onSongEnded();
    };
  }

  // ═══════════════════════════════════════════
  // UPLOAD HANDLERS
  // ═══════════════════════════════════════════

  async handleAudioUpload(event) {
    const file = event.target?.files?.[0];
    // Reset input so re-uploading same file triggers change event again
    if (event.target) event.target.value = '';
    if (!file) return;

    await this._loadAudioFile(file);
  }

  async _loadAudioFile(file) {
    // Reject oversized files before they hit decodeAudioData. A 500MB
    // buffer through WebAudio can trigger tab OOM on low-end devices.
    if (file.size > MAX_AUDIO_BYTES) {
      this._renderPlaceholder({
        primary: 'File troppo grande / File too large',
        detail: `${Math.round(file.size / 1048576)} MB > 100 MB`,
      });
      return;
    }
    // MIME + extension allowlist. Either signal must vouch for the file —
    // some browsers leave file.type empty for drag-drop, so we fall back
    // to extension. Anything else is ignored.
    const typeLooksAudio = typeof file.type === 'string' && file.type.startsWith('audio/');
    const extLooksAudio = AUDIO_EXT_RE.test(file.name);
    if (!typeLooksAudio && !extLooksAudio) {
      this._renderPlaceholder({
        primary: 'Formato non supportato / Unsupported format',
        detail: file.type || file.name,
      });
      return;
    }

    this.stopPlayback();
    this.syncedLyrics = [];
    this.lyricsLineElements = [];
    this.translationCache = {};
    this.currentLineIndex = -1;
    this.currentAudioFile = file;
    this._completed = false;

    const title = safeTitleFromFilename(file.name);
    this.currentSong = { title, artist: 'Upload Locale' };

    this._showPlayer();
    this._renderRealtimeControls();

    try {
      const buffer = await audioService.loadAudio(file);
      const duration = buffer?.duration || 0;
      this._currentOffsetKey = this._makeOffsetKey(file, duration);
      this.syncOffset = await this._loadPersistedOffset(this._currentOffsetKey);
      this._updateOffsetDisplay();

      if (this._pendingLrc) {
        this._applyLrcText(this._pendingLrc);
        this._pendingLrc = null;
      } else {
        this.fetchLyricsForUploadedSong(title, duration);
      }
    } catch (err) {
      console.error('[karaoke] audio load failed:', err);
      this._renderPlaceholder({
        primary: 'Impossibile decodificare il file / Could not decode file',
        detail: file.name,
        hint: 'Assicurati che sia un file audio valido (MP3, WAV, OGG) / Make sure it is a valid audio file',
      });
    }
  }

  async handleLrcUpload(event) {
    const file = event.target?.files?.[0];
    if (event.target) event.target.value = '';
    if (!file) return;

    if (file.size > MAX_LRC_BYTES) {
      this._renderPlaceholder({
        primary: 'File .lrc troppo grande / .lrc file too large',
        detail: `${Math.round(file.size / 1024)} KB > 2 MB`,
      });
      return;
    }
    if (!LRC_EXT_RE.test(file.name)) {
      this._renderPlaceholder({
        primary: 'Estensione non valida / Invalid extension',
        detail: file.name,
      });
      return;
    }

    try {
      // Strict UTF-8 decode. fatal:true throws on malformed sequences so
      // an attacker can't smuggle bidi overrides or NULL bytes via a
      // truncated multi-byte sequence the tolerant decoder would salvage.
      const bytes = new Uint8Array(await file.arrayBuffer());
      const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
      if (!this.currentAudioFile) {
        this._pendingLrc = text;
        const placeholder = document.getElementById('lyrics-scroll-placeholder');
        if (placeholder) {
          this._renderPlaceholder({
            primary: '.lrc caricato / .lrc loaded',
            detail: stripBidi(file.name),
            hint: 'Ora carica il tuo MP3 / Now upload your MP3',
          });
        }
        return;
      }
      this._applyLrcText(text);
    } catch (err) {
      console.error('[karaoke] lrc read failed:', err);
      this._renderPlaceholder({
        primary: 'Errore lettura .lrc / Error reading .lrc',
        detail: err?.message || 'unknown error',
      });
    }
  }

  _applyLrcText(lrcText) {
    const parsed = lyricsService.parseLrc(lrcText);
    if (!parsed.length) {
      this._renderPlaceholder({
        primary: 'File .lrc non valido / Invalid .lrc file',
        detail: 'Nessun timestamp riconosciuto / No timestamps recognized',
      });
      return;
    }
    this.syncedLyrics = parsed;
    this.renderLyricsBlock();
  }

  // ═══════════════════════════════════════════
  // LRCLIB LYRIC FETCH
  // ═══════════════════════════════════════════

  async fetchLyricsForUploadedSong(title, duration) {
    const placeholder = document.getElementById('lyrics-scroll-placeholder');
    if (placeholder) placeholder.textContent = 'Cercando testi... / Searching lyrics...';

    try {
      const lrcData = await lyricsService.findLyrics('', title, duration);
      if (lrcData?.syncedLyrics) {
        this.syncedLyrics = lyricsService.parseLrc(lrcData.syncedLyrics);
        if (lrcData.artistName && lrcData.trackName) {
          const titleEl = document.getElementById('karaoke-song-title');
          const artistEl = document.getElementById('karaoke-artist');
          if (titleEl) titleEl.textContent = lrcData.trackName;
          if (artistEl) artistEl.textContent = lrcData.artistName;
        }
        this.renderLyricsBlock();
      } else if (lrcData?.plainLyrics) {
        this._renderPlaceholder({
          primary: 'Solo testi non sincronizzati / Unsynced lyrics only',
          detail: 'LRCLIB non ha timestamp per questo brano / LRCLIB has no timings for this track',
          hint: 'Carica un file .lrc per la sincronizzazione / Upload a .lrc file for sync',
        });
      } else {
        this._renderPlaceholder({
          primary: 'Testi non trovati / Lyrics not found',
          detail: `File: "${title}"`,
          hint: 'Rinomina il file come "Artista - Titolo.mp3" oppure carica un .lrc / Rename file as "Artist - Title.mp3" or upload a .lrc',
        });
      }
    } catch (err) {
      console.error('[karaoke] lyrics fetch failed:', err);
      const isTimeout = err?.name === 'AbortError';
      this._renderPlaceholder({
        primary: isTimeout
          ? 'LRCLIB timeout — riprova / LRCLIB timeout — try again'
          : 'Errore nel caricamento testi / Error loading lyrics',
        detail: err?.message || 'network error',
        hint: 'Controlla connessione o carica un .lrc / Check connection or upload a .lrc',
      });
    }
  }

  // ═══════════════════════════════════════════
  // LYRICS BLOCK RENDERING
  // ═══════════════════════════════════════════

  renderLyricsBlock() {
    const viewport = document.getElementById('lyrics-scroll-viewport');
    if (!viewport || this.syncedLyrics.length === 0) return;

    viewport.textContent = '';
    this.lyricsLineElements = [];

    this.syncedLyrics.forEach((line, index) => {
      const div = document.createElement('div');
      div.className = 'lyrics-line upcoming';
      div.dataset.index = String(index);
      div.addEventListener('click', () => this._onLineClick(index));

      const enP = document.createElement('p');
      enP.className = 'lyrics-line-en';
      enP.textContent = line.text;

      const itP = document.createElement('p');
      itP.className = 'lyrics-line-it';
      itP.textContent = '...';

      div.appendChild(enP);
      div.appendChild(itP);
      viewport.appendChild(div);

      this.lyricsLineElements.push({ el: div, enP, itP });
    });

    this.preTranslateBatch(0, 8);
  }

  async preTranslateBatch(start, end) {
    const clampedEnd = Math.min(end, this.syncedLyrics.length);
    for (let i = start; i < clampedEnd; i++) {
      if (this.translationCache[i] !== undefined) continue;

      this.translationCache[i] = null;
      const text = this.syncedLyrics[i]?.text;
      if (!text || !text.trim()) {
        this.translationCache[i] = '';
        continue;
      }

      lyricsService
        .translate(text)
        .then((translation) => {
          this.translationCache[i] = translation || '';
          const row = this.lyricsLineElements[i];
          if (row?.itP) row.itP.textContent = translation || '';
        })
        .catch(() => {
          this.translationCache[i] = '...';
          const row = this.lyricsLineElements[i];
          if (row?.itP) row.itP.textContent = '...';
        });
    }
  }

  // ═══════════════════════════════════════════
  // SYNC DRIVER (rAF) + binary-search active line
  // ═══════════════════════════════════════════

  updateSyncedLyrics(time) {
    if (!this.syncedLyrics.length || !this.lyricsLineElements.length) return;

    const adjustedTime = time + this.syncOffset;
    const index = this._findLineIndex(adjustedTime);

    if (index === -1 || index === this.currentLineIndex) return;
    this.currentLineIndex = index;

    for (let i = 0; i < this.lyricsLineElements.length; i++) {
      const { el } = this.lyricsLineElements[i];
      el.classList.remove('active', 'past', 'upcoming');
      if (i < index) el.classList.add('past');
      else if (i === index) el.classList.add('active');
      else el.classList.add('upcoming');
    }

    const activeEl = this.lyricsLineElements[index].el;
    const container = document.getElementById('lyrics-scroll-container');
    const viewport = document.getElementById('lyrics-scroll-viewport');
    if (container && viewport && activeEl) {
      const targetY = -(
        activeEl.offsetTop -
        container.clientHeight / 2 +
        activeEl.offsetHeight / 2
      );
      viewport.style.transform = `translateY(${targetY}px)`;
    }

    this.preTranslateBatch(index + 1, index + 6);
  }

  _findLineIndex(time) {
    const arr = this.syncedLyrics;
    if (time < arr[0].time) return -1;
    let lo = 0;
    let hi = arr.length - 1;
    let answer = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid].time <= time) {
        answer = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return answer;
  }

  // ═══════════════════════════════════════════
  // PLAYBACK CONTROLS
  // ═══════════════════════════════════════════

  async startPlayback() {
    if (!this.currentAudioFile) return;
    try {
      audioService.play(audioService.pauseOffset);
      this.startSyncLoop();
      this._updatePlayButton(true);
    } catch (err) {
      console.error('[karaoke] start playback failed:', err);
    }
  }

  async togglePlayback() {
    if (audioService.isPlaying) {
      audioService.pause();
      this.stopSyncLoop();
      this._updatePlayButton(false);
    } else {
      await this.startPlayback();
    }
  }

  stopPlayback() {
    audioService.stop();
    this.stopSyncLoop();
    this._updatePlayButton(false);
  }

  startSyncLoop() {
    this.stopSyncLoop();
    const tick = () => {
      if (!audioService.isPlaying) {
        this._rafId = null;
        return;
      }
      this.updateSyncedLyrics(audioService.getCurrentTime());
      this._rafId = requestAnimationFrame(tick);
    };
    this._rafId = requestAnimationFrame(tick);
  }

  stopSyncLoop() {
    if (this._rafId != null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  // ═══════════════════════════════════════════
  // SYNC OFFSET UI
  // ═══════════════════════════════════════════

  adjustSync(delta) {
    this.syncOffset = Math.round((this.syncOffset + delta) * 100) / 100;
    this._applySyncChange();
  }

  resetSync() {
    this.syncOffset = 0;
    this._applySyncChange();
  }

  _onLineClick(index) {
    // Auto-calibrate: align clicked line with CURRENT audio time.
    if (!audioService.isPlaying || !this.syncedLyrics[index]) {
      this.jumpToLine(index);
      return;
    }
    const currentTime = audioService.getCurrentTime();
    const targetTime = this.syncedLyrics[index].time;
    this.syncOffset = Math.round((targetTime - currentTime) * 100) / 100;
    this._applySyncChange();
  }

  _applySyncChange() {
    this._updateOffsetDisplay();
    if (audioService.isPlaying) {
      this.currentLineIndex = -1;
      this.updateSyncedLyrics(audioService.getCurrentTime());
    }
    this._savePersistedOffset(this._currentOffsetKey, this.syncOffset);
  }

  _updateOffsetDisplay() {
    const display = document.getElementById('sync-offset-display');
    if (!display) return;
    const sign = this.syncOffset >= 0 ? '+' : '';
    display.textContent = `Sync: ${sign}${this.syncOffset.toFixed(2)}s`;
  }

  // ═══════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════

  restartSong() {
    this.currentLineIndex = -1;
    audioService.pauseOffset = 0;
    this.stopPlayback();

    const viewport = document.getElementById('lyrics-scroll-viewport');
    if (viewport) viewport.style.transform = 'translateY(0)';
    for (const { el } of this.lyricsLineElements) {
      el.classList.remove('active', 'past');
      el.classList.add('upcoming');
    }

    this._completed = false;
    this._hideCompletion();
    if (this.currentAudioFile) this.startPlayback();
  }

  closeSong() {
    this.stopPlayback();
    this.currentSong = null;
    this.currentAudioFile = null;
    this.syncedLyrics = [];
    this.lyricsLineElements = [];
    this.translationCache = {};
    this.currentLineIndex = -1;
    this.syncOffset = 0;
    this._currentOffsetKey = null;
    this._completed = false;

    const container = document.getElementById('karaoke-container');
    const selection = document.getElementById('song-selection');
    if (container) container.classList.add('hidden');
    if (selection) selection.classList.remove('hidden');
    this._hideCompletion();
  }

  jumpToLine(index) {
    if (index < 0 || index >= this.syncedLyrics.length) return;
    this.currentLineIndex = index - 1;
    this.stopPlayback();
    audioService.play(this.syncedLyrics[index].time);
    this.startSyncLoop();
    this._updatePlayButton(true);
  }

  prevLine() {
    if (!this.syncedLyrics.length) {
      const t = audioService.getCurrentTime();
      audioService.play(Math.max(0, t - 10));
      return;
    }
    this.jumpToLine(Math.max(0, (this.currentLineIndex === -1 ? 1 : this.currentLineIndex) - 1));
  }

  nextLine() {
    if (!this.syncedLyrics.length) {
      const t = audioService.getCurrentTime();
      audioService.play(t + 10);
      return;
    }
    this.jumpToLine(Math.min(this.syncedLyrics.length - 1, this.currentLineIndex + 1));
  }

  // ═══════════════════════════════════════════
  // UI HELPERS
  // ═══════════════════════════════════════════

  _showPlayer() {
    const selection = document.getElementById('song-selection');
    const container = document.getElementById('karaoke-container');
    if (selection) selection.classList.add('hidden');
    if (container) container.classList.remove('hidden');
    this._hideCompletion();

    const titleEl = document.getElementById('karaoke-song-title');
    const artistEl = document.getElementById('karaoke-artist');
    if (titleEl) titleEl.textContent = this.currentSong?.title || '';
    if (artistEl) artistEl.textContent = this.currentSong?.artist || '';

    const scrollContainer = document.getElementById('lyrics-scroll-container');
    if (scrollContainer) scrollContainer.classList.remove('hidden');

    const viewport = document.getElementById('lyrics-scroll-viewport');
    if (viewport) {
      viewport.textContent = '';
      viewport.style.transform = 'translateY(0)';
      const placeholder = document.createElement('div');
      placeholder.className = 'lyrics-scroll-placeholder';
      placeholder.id = 'lyrics-scroll-placeholder';
      placeholder.textContent = 'Sincronizzazione... / Syncing...';
      viewport.appendChild(placeholder);
    }
  }

  _renderRealtimeControls() {
    const nav = document.querySelector('.karaoke-nav');
    if (!nav) return;
    nav.textContent = '';

    const playBtn = document.createElement('button');
    playBtn.className = 'btn btn-primary';
    playBtn.id = 'play-pause-btn';
    playBtn.textContent = 'Riprendi / Play';
    playBtn.addEventListener('click', () => this.togglePlayback());
    nav.appendChild(playBtn);

    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn btn-secondary';
    prevBtn.textContent = '⏮ Linea / Line';
    prevBtn.addEventListener('click', () => this.prevLine());
    nav.appendChild(prevBtn);

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-secondary';
    nextBtn.textContent = 'Linea / Line ⏭';
    nextBtn.addEventListener('click', () => this.nextLine());
    nav.appendChild(nextBtn);

    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn btn-secondary';
    resetBtn.textContent = '↻ Reset';
    resetBtn.addEventListener('click', () => this.restartSong());
    nav.appendChild(resetBtn);

    const syncGroup = document.createElement('div');
    syncGroup.className = 'sync-offset-controls';
    const offsets = [
      { label: '-1s', delta: -1 },
      { label: '-0.5s', delta: -0.5 },
      { label: '-0.1s', delta: -0.1 },
    ];
    const positives = [
      { label: '+0.1s', delta: 0.1 },
      { label: '+0.5s', delta: 0.5 },
      { label: '+1s', delta: 1 },
    ];
    for (const { label, delta } of offsets) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-sync';
      btn.textContent = label;
      btn.addEventListener('click', () => this.adjustSync(delta));
      syncGroup.appendChild(btn);
    }
    const display = document.createElement('span');
    display.id = 'sync-offset-display';
    display.textContent = 'Sync: +0.00s';
    syncGroup.appendChild(display);
    for (const { label, delta } of positives) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-sync';
      btn.textContent = label;
      btn.addEventListener('click', () => this.adjustSync(delta));
      syncGroup.appendChild(btn);
    }
    const resetSync = document.createElement('button');
    resetSync.className = 'btn btn-sync';
    resetSync.textContent = 'Reset sync';
    resetSync.addEventListener('click', () => this.resetSync());
    syncGroup.appendChild(resetSync);

    nav.appendChild(syncGroup);
    this._updateOffsetDisplay();
  }

  _updatePlayButton(isPlaying) {
    const btn = document.getElementById('play-pause-btn');
    if (!btn) return;
    btn.textContent = isPlaying ? '⏸ Pausa / Pause' : '▶ Riprendi / Play';
  }

  _renderPlaceholder({ primary, detail, hint }) {
    const viewport = document.getElementById('lyrics-scroll-viewport');
    if (!viewport) return;
    viewport.textContent = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'lyrics-scroll-placeholder';
    wrapper.id = 'lyrics-scroll-placeholder';

    const p1 = document.createElement('p');
    p1.textContent = primary;
    wrapper.appendChild(p1);

    if (detail) {
      const p2 = document.createElement('p');
      p2.style.fontSize = '0.85rem';
      p2.style.marginTop = '0.5rem';
      p2.style.opacity = '0.7';
      p2.textContent = detail;
      if (hint) {
        p2.appendChild(document.createElement('br'));
        p2.appendChild(document.createTextNode(hint));
      }
      wrapper.appendChild(p2);
    }
    viewport.appendChild(wrapper);
  }

  _hideCompletion() {
    const el = document.getElementById('step-completion');
    if (el) el.classList.add('hidden');
  }

  _onSongEnded() {
    if (this._completed || !this.currentSong) return;
    this._completed = true;
    try {
      this.progressManager?.completeSong?.(this.currentSong.title || 'Upload');
    } catch (err) {
      console.warn('[karaoke] progress update failed:', err);
    }

    const el = document.getElementById('step-completion');
    if (!el) return;
    el.classList.remove('hidden');
    el.textContent = '';
    const content = document.createElement('div');
    content.className = 'completion-content';

    const h3 = document.createElement('h3');
    h3.textContent = 'Canzone Completata! / Song Completed!';
    content.appendChild(h3);

    const p = document.createElement('p');
    p.textContent =
      'Hai ascoltato la canzone fino alla fine. / You finished listening to the song.';
    content.appendChild(p);

    const actions = document.createElement('div');
    actions.className = 'completion-actions';

    const restart = document.createElement('button');
    restart.className = 'btn btn-secondary';
    restart.textContent = 'Ricomincia / Restart';
    restart.addEventListener('click', () => this.restartSong());
    actions.appendChild(restart);

    const close = document.createElement('button');
    close.className = 'btn btn-primary';
    close.textContent = 'Altra Canzone / Another Song';
    close.addEventListener('click', () => this.closeSong());
    actions.appendChild(close);

    content.appendChild(actions);
    el.appendChild(content);
  }

  // ═══════════════════════════════════════════
  // PER-SONG OFFSET PERSISTENCE (IndexedDB settings store)
  // ═══════════════════════════════════════════

  _makeOffsetKey(file, duration) {
    const size = file?.size ?? 0;
    const name = file?.name ?? 'unknown';
    const dur = Number.isFinite(duration) ? Math.round(duration) : 0;
    return `${name}|${size}|${dur}`;
  }

  async _loadPersistedOffset(key) {
    if (!key) return 0;
    try {
      if (!this._offsetCache) {
        const stored = await storageService.load(OFFSET_SETTINGS_KEY, OFFSET_STORE_KEY);
        this._offsetCache = stored?.offsets ?? {};
      }
      const v = this._offsetCache[key];
      return typeof v === 'number' && Number.isFinite(v) ? v : 0;
    } catch (err) {
      console.warn('[karaoke] offset load failed:', err);
      return 0;
    }
  }

  async _savePersistedOffset(key, offset) {
    if (!key) return;
    try {
      if (!this._offsetCache) {
        const stored = await storageService.load(OFFSET_SETTINGS_KEY, OFFSET_STORE_KEY);
        this._offsetCache = stored?.offsets ?? {};
      }
      this._offsetCache[key] = offset;
      await storageService.save(OFFSET_SETTINGS_KEY, {
        key: OFFSET_STORE_KEY,
        offsets: this._offsetCache,
      });
    } catch (err) {
      console.warn('[karaoke] offset save failed:', err);
    }
  }

  // ═══════════════════════════════════════════
  // EVENT BINDING
  // ═══════════════════════════════════════════

  bindEvents() {
    const bindUploadPair = (btnId, inputId, handler) => {
      const btn = document.getElementById(btnId);
      const input = document.getElementById(inputId);
      if (btn && input) {
        btn.addEventListener('click', () => input.click());
        input.addEventListener('change', (e) => handler(e));
      }
    };

    bindUploadPair('main-upload-btn', 'main-audio-input', (e) => this.handleAudioUpload(e));
    bindUploadPair('upload-audio-btn', 'karaoke-audio-input', (e) => this.handleAudioUpload(e));
    bindUploadPair('main-lrc-btn', 'main-lrc-input', (e) => this.handleLrcUpload(e));
    bindUploadPair('upload-lrc-btn', 'karaoke-lrc-input', (e) => this.handleLrcUpload(e));

    const drop = document.getElementById('karaoke-drop-zone');
    if (drop) {
      drop.addEventListener('dragover', (e) => {
        e.preventDefault();
        drop.classList.add('drag-over');
      });
      drop.addEventListener('dragleave', () => drop.classList.remove('drag-over'));
      drop.addEventListener('drop', (e) => {
        e.preventDefault();
        drop.classList.remove('drag-over');
        for (const file of e.dataTransfer?.files || []) {
          if (file.name.toLowerCase().endsWith('.lrc')) {
            this._applyLrcTextFromFile(file);
          } else if (
            file.type.startsWith('audio/') ||
            /\.(mp3|wav|ogg|flac|m4a)$/i.test(file.name)
          ) {
            this._loadAudioFile(file);
          }
        }
      });
    }

    const speedSlider = document.getElementById('speed-slider');
    const speedValue = document.getElementById('speed-value');
    if (speedSlider && speedValue) {
      speedSlider.addEventListener('input', () => {
        const rate = parseFloat(speedSlider.value);
        if (!Number.isFinite(rate)) return;
        speedValue.textContent = `${rate.toFixed(1)}x`;
        audioService.setPlaybackRate(rate);
      });
    }

    window.restartSong = () => this.restartSong();
    window.closeSong = () => this.closeSong();
  }

  async _applyLrcTextFromFile(file) {
    if (file.size > MAX_LRC_BYTES) {
      console.warn('[karaoke] dropped oversized .lrc drop:', file.size);
      return;
    }
    if (!LRC_EXT_RE.test(file.name)) {
      console.warn('[karaoke] dropped non-lrc extension:', file.name);
      return;
    }
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
      if (!this.currentAudioFile) {
        this._pendingLrc = text;
      } else {
        this._applyLrcText(text);
      }
    } catch (err) {
      console.error('[karaoke] lrc read failed:', err);
    }
  }
}
