/**
 * MUSIC/KARAOKE MODULE
 * ====================
 *
 * Handles both pre-loaded songs (from songsDatabase) and uploaded audio.
 * Pre-loaded songs use step-by-step mode with vocabulary and phonetics.
 * Uploaded songs use real-time sync with LRCLIB lyrics + scrolling block display.
 */

import { audioService } from './services/AudioService.js';
import { lyricsService } from './services/LyricsService.js';
import { songsDatabase, getSongById } from './songs.js';
import { ttsService } from './services/TTSService.js';

export class MusicManager {
  constructor(progressManager) {
    this.currentSong = null;
    this.progressManager = progressManager;
    this.currentStepIndex = 0;

    this.playbackMode = 'realtime';
    this.syncedLyrics = [];
    this.syncIntervalId = null;
    this.currentAudioFile = null;
    this.currentLineIndex = -1;
    this.isPreloadedSong = false;

    // Sync offset (seconds) — user-adjustable timing correction
    this.syncOffset = 0;

    // Scroll display state
    this.lyricsLineElements = [];
    this.translationCache = {};

    this.init();
  }

  init() {
    this.bindEvents();
    this.renderSongCatalog();
    window.musicManager = this;

    audioService.onPlaybackEnd = () => {
      const playBtn = document.getElementById('play-pause-btn');
      if (playBtn) playBtn.textContent = '▶ Riprendi / Play';
      if (this.syncIntervalId) {
        clearInterval(this.syncIntervalId);
        this.syncIntervalId = null;
      }
    };
  }

  // ═══════════════════════════════════════════
  // SONG CATALOG
  // ═══════════════════════════════════════════

  renderSongCatalog() {
    const grid = document.getElementById('songs-grid');
    if (!grid) return;

    const difficultyLabels = {
      easy: { label: 'Facile / Easy', color: 'var(--success, #10b981)' },
      medium: { label: 'Media / Medium', color: 'var(--warning, #f59e0b)' },
      hard: { label: 'Difficile / Hard', color: 'var(--danger, #ef4444)' },
    };

    grid.innerHTML = `
      <h3 class="catalog-title">Canzoni Disponibili / Available Songs</h3>
      <div class="songs-catalog">
        ${songsDatabase
          .map((song) => {
            const diff = difficultyLabels[song.difficulty] || difficultyLabels.easy;
            return `
            <div class="song-card" onclick="musicManager.selectPreloadedSong('${song.id}')">
              <div class="song-card-emoji">${song.coverEmoji}</div>
              <div class="song-card-info">
                <h4>${song.title}</h4>
                <p class="song-card-artist">${song.artist}</p>
                <span class="song-card-difficulty" style="background: ${diff.color};">${diff.label}</span>
              </div>
              <div class="song-card-steps">${song.steps.length} steps</div>
            </div>
          `;
          })
          .join('')}
      </div>
    `;

    grid.classList.remove('hidden');
  }

  // ═══════════════════════════════════════════
  // PRE-LOADED SONGS (Step-by-step)
  // ═══════════════════════════════════════════

  selectPreloadedSong(songId) {
    const song = getSongById(songId);
    if (!song) return;

    this.currentSong = song;
    this.currentStepIndex = 0;
    this.isPreloadedSong = true;
    this.currentAudioFile = null;
    this.syncedLyrics = [];

    document.getElementById('song-selection').classList.add('hidden');
    document.getElementById('karaoke-container').classList.remove('hidden');
    document.getElementById('step-completion').classList.add('hidden');

    document.getElementById('karaoke-song-title').textContent = song.title;
    document.getElementById('karaoke-artist').textContent = song.artist;

    // Hide scroll container, show step display
    document.getElementById('lyrics-scroll-container')?.classList.add('hidden');
    document.getElementById('lyrics-display-step')?.classList.remove('hidden');

    this.setPlaybackMode('step');
    document.getElementById('total-steps').textContent = song.steps.length;
    this.renderStep();
  }

  renderStep() {
    if (!this.currentSong || !this.isPreloadedSong) return;

    const step = this.currentSong.steps[this.currentStepIndex];
    if (!step) return;

    const totalSteps = this.currentSong.steps.length;

    document.getElementById('current-step').textContent = this.currentStepIndex + 1;
    const progressFill = document.getElementById('step-progress-fill');
    if (progressFill) {
      progressFill.style.width = `${((this.currentStepIndex + 1) / totalSteps) * 100}%`;
    }

    const lyricsEnEl = document.getElementById('lyrics-english');
    if (lyricsEnEl) {
      lyricsEnEl.textContent = step.english;
      if (ttsService.isSupported && step.english) {
        lyricsEnEl.appendChild(ttsService.createSpeakerButton(step.english));
      }
    }
    document.getElementById('lyrics-italian').textContent = step.italian;

    const vocabContainer = document.getElementById('step-vocabulary');
    if (vocabContainer && step.vocabulary?.length) {
      vocabContainer.innerHTML = step.vocabulary
        .map(
          (v) => `
        <div class="vocab-item">
          <div class="vocab-word">${v.word || ''} ${ttsService.isSupported && v.word ? ttsService.speakerButtonHTML(v.word) : ''}</div>
          <div class="vocab-pronunciation">${v.pronunciation || ''}</div>
          <div class="vocab-translation">${v.translation || ''}</div>
          <div class="vocab-example">${v.example || ''}</div>
        </div>
      `
        )
        .join('');
      ttsService.attachTTSListeners(vocabContainer);
    }

    const phoneticsContainer = document.getElementById('step-phonetics');
    if (phoneticsContainer && step.phonetics?.length) {
      phoneticsContainer.innerHTML = step.phonetics
        .map(
          (p) => `
        <div class="phonetic-item">
          <span class="phonetic-text">"${p.text || ''}"</span>
          <span class="phonetic-howto">→ ${p.howTo || ''}</span>
          <span class="phonetic-tip">${p.tip || ''}</span>
        </div>
      `
        )
        .join('');
    }

    document.querySelector('.step-controls')?.classList.remove('hidden');
  }

  // ═══════════════════════════════════════════
  // UPLOADED SONGS (Real-time scroll)
  // ═══════════════════════════════════════════

  async handleAudioUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    this.stopPlayback();
    audioService.pauseOffset = 0;
    this.syncedLyrics = [];
    this.currentAudioFile = file;
    this.currentLineIndex = -1;
    this.isPreloadedSong = false;
    this.lyricsLineElements = [];
    this.translationCache = {};

    const title = file.name.replace(/\.[^/.]+$/, '');
    this.currentSong = { title, artist: 'Upload Locale', steps: [] };

    this.updateUIForNewSong();

    try {
      const buffer = await audioService.loadAudio(file);
      this.setPlaybackMode('realtime');
      this.fetchLyricsForUploadedSong(title, buffer.duration);
    } catch (err) {
      console.error('Failed to load/play uploaded audio:', err);
    }
  }

  updateUIForNewSong() {
    document.getElementById('song-selection').classList.add('hidden');
    document.getElementById('karaoke-container').classList.remove('hidden');
    document.getElementById('step-completion').classList.add('hidden');
    document.getElementById('karaoke-song-title').textContent = this.currentSong.title;
    document.getElementById('karaoke-artist').textContent = this.currentSong.artist;

    // Show scroll container, hide step display
    document.getElementById('lyrics-scroll-container')?.classList.remove('hidden');
    document.getElementById('lyrics-display-step')?.classList.add('hidden');

    // Reset scroll viewport
    const viewport = document.getElementById('lyrics-scroll-viewport');
    if (viewport) {
      const placeholder = document.getElementById('lyrics-scroll-placeholder');
      if (placeholder) placeholder.textContent = 'Sincronizzazione... / Syncing...';
      viewport.style.transform = 'translateY(0)';
    }

    const phoneticsContainer = document.getElementById('step-phonetics');
    if (phoneticsContainer) phoneticsContainer.innerHTML = '...';

    this.setPlaybackMode('realtime');
  }

  async fetchLyricsForUploadedSong(title, duration) {
    const placeholder = document.getElementById('lyrics-scroll-placeholder');
    if (placeholder) placeholder.textContent = 'Cercando testi... / Searching lyrics...';

    try {
      const lrcData = await lyricsService.findLyrics('', title, duration);
      if (lrcData && lrcData.syncedLyrics) {
        this.syncedLyrics = lyricsService.parseLrc(lrcData.syncedLyrics);
        if (lrcData.artistName && lrcData.trackName) {
          document.getElementById('karaoke-song-title').textContent = lrcData.trackName;
          document.getElementById('karaoke-artist').textContent = lrcData.artistName;
        }
        this.renderLyricsBlock();
      } else if (lrcData && lrcData.plainLyrics) {
        if (placeholder) placeholder.textContent = lrcData.plainLyrics;
      } else if (placeholder) {
        placeholder.innerHTML = `
            <div>
              <p>Testi non trovati / Lyrics not found</p>
              <p style="font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.7;">
                File: "${title}"<br>
                Prova a rinominare il file come "Artista - Titolo" /
                Try renaming the file as "Artist - Title"
              </p>
            </div>
          `;
      }
    } catch (err) {
      console.error('Lyrics fetch failed:', err);
      if (placeholder) {
        placeholder.innerHTML = `
          <div>
            <p>Errore nel caricamento testi / Error loading lyrics</p>
            <p style="font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.7;">
              ${err.message || 'Network error'}<br>
              Controlla la connessione / Check your connection
            </p>
          </div>
        `;
      }
    }
  }

  // ═══════════════════════════════════════════
  // LYRICS BLOCK RENDERING
  // ═══════════════════════════════════════════

  renderLyricsBlock() {
    const viewport = document.getElementById('lyrics-scroll-viewport');
    if (!viewport || this.syncedLyrics.length === 0) return;

    // Clear viewport and build all lines
    viewport.innerHTML = '';
    this.lyricsLineElements = [];

    this.syncedLyrics.forEach((line, index) => {
      const div = document.createElement('div');
      div.className = 'lyrics-line upcoming';
      div.dataset.index = index;

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

    // Pre-translate initial batch (first 8 lines)
    this.preTranslateBatch(0, 8);
  }

  async preTranslateBatch(start, end) {
    const clampedEnd = Math.min(end, this.syncedLyrics.length);
    for (let i = start; i < clampedEnd; i++) {
      if (this.translationCache[i] !== undefined) continue; // already started or done

      this.translationCache[i] = null; // mark as in-flight
      const text = this.syncedLyrics[i]?.text;
      if (!text || !text.trim()) {
        this.translationCache[i] = '';
        continue;
      }

      lyricsService
        .translate(text)
        .then((translation) => {
          this.translationCache[i] = translation || '';
          if (this.lyricsLineElements[i]?.itP) {
            this.lyricsLineElements[i].itP.textContent = translation || '';
          }
        })
        .catch(() => {
          this.translationCache[i] = '...';
          if (this.lyricsLineElements[i]?.itP) {
            this.lyricsLineElements[i].itP.textContent = '...';
          }
        });
    }
  }

  // ═══════════════════════════════════════════
  // SYNC LOOP & LYRICS UPDATE
  // ═══════════════════════════════════════════

  updateSyncedLyrics(time) {
    if (!this.syncedLyrics || this.syncedLyrics.length === 0) return;
    if (this.lyricsLineElements.length === 0) return;

    // Apply user-adjustable sync offset
    const adjustedTime = time + this.syncOffset;

    // Find current index from timestamp
    let index = -1;
    for (let i = 0; i < this.syncedLyrics.length; i++) {
      if (adjustedTime >= this.syncedLyrics[i].time) {
        index = i;
      } else {
        break;
      }
    }

    if (index === -1 || index === this.currentLineIndex) return;
    this.currentLineIndex = index;

    // Update CSS classes on all elements
    for (let i = 0; i < this.lyricsLineElements.length; i++) {
      const { el } = this.lyricsLineElements[i];
      el.classList.remove('active', 'past', 'upcoming');
      if (i < index) {
        el.classList.add('past');
      } else if (i === index) {
        el.classList.add('active');
      } else {
        el.classList.add('upcoming');
      }
    }

    // Scroll viewport to center the active line
    const activeEl = this.lyricsLineElements[index].el;
    const container = document.getElementById('lyrics-scroll-container');
    const viewport = document.getElementById('lyrics-scroll-viewport');
    if (container && viewport && activeEl) {
      const containerHeight = container.clientHeight;
      const lineTop = activeEl.offsetTop;
      const lineHeight = activeEl.offsetHeight;
      const targetY = -(lineTop - containerHeight / 2 + lineHeight / 2);
      viewport.style.transform = `translateY(${targetY}px)`;
    }

    // Lookahead: pre-translate next 5 lines
    this.preTranslateBatch(index + 1, index + 6);
  }

  // ═══════════════════════════════════════════
  // PLAYBACK CONTROLS
  // ═══════════════════════════════════════════

  async startPlayback() {
    if (!this.currentAudioFile) return;
    try {
      audioService.play(audioService.pauseOffset);
      this.startSyncLoop();
      const playBtn = document.getElementById('play-pause-btn');
      if (playBtn) playBtn.textContent = '⏸ Pausa / Pause';
    } catch (err) {
      console.error('Start playback failed:', err);
    }
  }

  async togglePlayback() {
    if (audioService.isPlaying) {
      audioService.pause();
      if (this.syncIntervalId) {
        clearInterval(this.syncIntervalId);
        this.syncIntervalId = null;
      }
    } else {
      await this.startPlayback();
    }
    const playBtn = document.getElementById('play-pause-btn');
    if (playBtn)
      playBtn.textContent = audioService.isPlaying ? '⏸ Pausa / Pause' : '▶ Riprendi / Play';
  }

  stopPlayback() {
    audioService.stop();
    if (this.syncIntervalId) {
      clearInterval(this.syncIntervalId);
      this.syncIntervalId = null;
    }
  }

  startSyncLoop() {
    if (this.syncIntervalId) clearInterval(this.syncIntervalId);
    this.syncIntervalId = setInterval(() => {
      if (!audioService.isPlaying) {
        clearInterval(this.syncIntervalId);
        this.syncIntervalId = null;
        return;
      }
      const currentTime = audioService.getCurrentTime();
      this.updateSyncedLyrics(currentTime);
    }, 100);
  }

  adjustSync(delta) {
    this.syncOffset += delta;
    // Round to avoid floating point drift
    this.syncOffset = Math.round(this.syncOffset * 10) / 10;
    const display = document.getElementById('sync-offset-display');
    if (display)
      display.textContent = `Sync: ${this.syncOffset >= 0 ? '+' : ''}${this.syncOffset.toFixed(1)}s`;
    // Force an immediate re-evaluation so the user sees the change
    if (audioService.isPlaying) {
      this.currentLineIndex = -1;
      const currentTime = audioService.getCurrentTime();
      this.updateSyncedLyrics(currentTime);
    }
  }

  // ═══════════════════════════════════════════
  // MODE SWITCHING
  // ═══════════════════════════════════════════

  setPlaybackMode(mode) {
    this.playbackMode = mode;
    document.querySelectorAll('.btn-mode').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    const stepControls = document.querySelector('.step-controls');
    const karaokeNav = document.querySelector('.karaoke-nav');
    const scrollContainer = document.getElementById('lyrics-scroll-container');
    const stepDisplay = document.getElementById('lyrics-display-step');

    if (mode === 'realtime') {
      if (stepControls) stepControls.classList.add('hidden');
      if (scrollContainer) scrollContainer.classList.remove('hidden');
      if (stepDisplay) stepDisplay.classList.add('hidden');
      if (karaokeNav) {
        const { isPlaying } = audioService;
        karaokeNav.innerHTML = `
          <button class="btn btn-primary" id="play-pause-btn">${isPlaying ? 'Pausa / Pause' : 'Riprendi / Play'}</button>
          <button class="btn btn-secondary" onclick="restartSong()">Reset</button>
          <div class="sync-offset-controls">
            <button class="btn btn-sync" onclick="musicManager.adjustSync(-0.5)">-0.5s</button>
            <span id="sync-offset-display">Sync: ${this.syncOffset >= 0 ? '+' : ''}${this.syncOffset.toFixed(1)}s</span>
            <button class="btn btn-sync" onclick="musicManager.adjustSync(0.5)">+0.5s</button>
          </div>
        `;
        const playBtn = document.getElementById('play-pause-btn');
        if (playBtn) playBtn.addEventListener('click', () => this.togglePlayback());
      }
    } else {
      this.stopPlayback();
      if (stepControls) stepControls.classList.remove('hidden');
      if (scrollContainer) scrollContainer.classList.add('hidden');
      if (stepDisplay) stepDisplay.classList.remove('hidden');
      this.restoreStepNav();
    }
  }

  restoreStepNav() {
    const karaokeNav = document.querySelector('.karaoke-nav');
    if (karaokeNav) {
      karaokeNav.innerHTML = `
        <button class="btn btn-secondary" onclick="prevStep()">← Step Precedente / Previous Step</button>
        <button class="btn btn-primary" onclick="nextStep()">Step Successivo / Next Step →</button>
      `;
    }
  }

  // ═══════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════

  restartSong() {
    if (this.isPreloadedSong) {
      this.currentStepIndex = 0;
      document.getElementById('step-completion').classList.add('hidden');
      this.renderStep();
    } else {
      this.currentLineIndex = -1;
      audioService.pauseOffset = 0;
      this.stopPlayback();

      // Reset scroll position
      const viewport = document.getElementById('lyrics-scroll-viewport');
      if (viewport) viewport.style.transform = 'translateY(0)';

      // Reset line states
      for (const { el } of this.lyricsLineElements) {
        el.classList.remove('active', 'past');
        el.classList.add('upcoming');
      }

      if (this.currentAudioFile) this.startPlayback();
    }
  }

  closeSong() {
    this.stopPlayback();
    this.currentSong = null;
    this.syncedLyrics = [];
    this.currentAudioFile = null;
    this.isPreloadedSong = false;
    this.lyricsLineElements = [];
    this.translationCache = {};
    this.currentLineIndex = -1;
    document.getElementById('karaoke-container').classList.add('hidden');
    document.getElementById('song-selection').classList.remove('hidden');
  }

  prevStep() {
    if (this.isPreloadedSong) {
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--;
        this.renderStep();
      }
    } else if (this.syncedLyrics.length > 0) {
      const nextIndex = Math.max(0, this.currentLineIndex - 1);
      this.jumpToLine(nextIndex);
    } else {
      const currentTime = audioService.getCurrentTime();
      audioService.play(Math.max(0, currentTime - 10));
    }
  }

  nextStep() {
    if (this.isPreloadedSong) {
      if (this.currentStepIndex < this.currentSong.steps.length - 1) {
        this.currentStepIndex++;
        this.renderStep();
      } else {
        this.completeSong();
      }
    } else if (this.syncedLyrics.length > 0) {
      const nextIndex = Math.min(this.syncedLyrics.length - 1, this.currentLineIndex + 1);
      this.jumpToLine(nextIndex);
    } else {
      const currentTime = audioService.getCurrentTime();
      audioService.play(currentTime + 10);
    }
  }

  jumpToLine(index) {
    if (index < 0 || index >= this.syncedLyrics.length) return;
    this.currentLineIndex = index - 1;
    this.stopPlayback();
    audioService.play(this.syncedLyrics[index].time);
    this.startSyncLoop();
  }

  // ═══════════════════════════════════════════
  // COMPLETION
  // ═══════════════════════════════════════════

  completeSong() {
    this.progressManager.completeSong(this.currentSong?.title || 'Unknown');

    // Ingest vocabulary from song steps into SRS
    if (window.srsManager && this.currentSong?.steps) {
      const words = [];
      for (const step of this.currentSong.steps) {
        if (step.vocabulary?.length) {
          for (const v of step.vocabulary) {
            if (v.word) {
              words.push({
                english: v.word,
                italian: v.translation || '',
                pronunciation: v.pronunciation || '',
                example: v.example || '',
              });
            }
          }
        }
      }
      if (words.length) {
        const source = `song-${this.currentSong.id || this.currentSong.title}`;
        window.srsManager.addWords(words, source);
      }
    }

    const completionEl = document.getElementById('step-completion');
    if (!completionEl) return;

    const songId = this.currentSong?.id || '';

    completionEl.innerHTML = `
      <div class="completion-content">
        <span class="completion-icon"></span>
        <h3>Canzone Completata! / Song Completed!</h3>
        <p>Hai finito tutti gli step di questa canzone. / You finished all steps of this song.</p>
        <div class="completion-actions">
          <button class="btn btn-secondary" onclick="restartSong()">
            Ricomincia / Restart
          </button>
          ${
            songId
              ? `
            <button class="btn btn-primary" onclick="practiceFromSong()">
              Pratica le Parole / Practice Words
            </button>
          `
              : ''
          }
          <button class="btn btn-secondary" onclick="closeSong()">
            Altra Canzone / Another Song
          </button>
        </div>
      </div>
    `;

    completionEl.classList.remove('hidden');
  }

  practiceFromSong() {
    const songId = this.currentSong?.id;
    if (!songId) return;

    this.closeSong();
    document.querySelector('.nav-item[data-section="practice"]')?.click();

    setTimeout(() => {
      if (window.practiceManager) {
        window.practiceManager.startPractice('listening', songId);
      }
    }, 100);
  }

  // ═══════════════════════════════════════════
  // EVENT BINDING
  // ═══════════════════════════════════════════

  bindEvents() {
    document.querySelectorAll('.btn-mode').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.setPlaybackMode(e.target.dataset.mode);
      });
    });

    const mainUploadBtn = document.getElementById('main-upload-btn');
    const mainFileInput = document.getElementById('main-audio-input');
    if (mainUploadBtn && mainFileInput) {
      mainUploadBtn.addEventListener('click', () => mainFileInput.click());
      mainFileInput.addEventListener('change', (e) => this.handleAudioUpload(e));
    }

    const headerUploadBtn = document.getElementById('upload-audio-btn');
    const headerFileInput = document.getElementById('karaoke-audio-input');
    if (headerUploadBtn && headerFileInput) {
      headerUploadBtn.addEventListener('click', () => headerFileInput.click());
      headerFileInput.addEventListener('change', (e) => this.handleAudioUpload(e));
    }

    const speedSlider = document.getElementById('speed-slider');
    const speedValue = document.getElementById('speed-value');
    if (speedSlider && speedValue) {
      speedSlider.addEventListener('input', () => {
        const rate = parseFloat(speedSlider.value);
        speedValue.textContent = `${rate.toFixed(1)}x`;
        audioService.setPlaybackRate(rate);
      });
    }

    window.prevStep = () => this.prevStep();
    window.nextStep = () => this.nextStep();
    window.restartSong = () => this.restartSong();
    window.closeSong = () => this.closeSong();
    window.practiceFromSong = () => this.practiceFromSong();
    window.adjustSync = (delta) => this.adjustSync(delta);
  }
}
