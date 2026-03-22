/* global YT */
/**
 * VIDEO CLIPS MODULE - Knowledge AIO
 * ====================================
 *
 * Gestisce la riproduzione di video clip con sottotitoli sincronizzati.
 * Uses YouTube IFrame API for embedded playback.
 *
 * Features:
 *   - Grid di video clip con filtro per difficoltà
 *   - Player YouTube integrato con sottotitoli sincronizzati
 *   - Pannello vocabolario laterale
 *   - Tracciamento progresso clip completati
 *   - TTS per pronuncia su click dei sottotitoli
 */

import { videoDatabase, getVideoById } from './data/videos.js';
import { ttsService } from './services/TTSService.js';

export class VideoManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.player = null;
    this.currentVideo = null;
    this.subtitleInterval = null;
    this.currentFilter = 'all';
    this.apiReady = false;
    this.pendingVideoId = null;
  }

  init() {
    this._loadYouTubeAPI();
  }

  // ═══════════════════════════════════════════
  // YOUTUBE API
  // ═══════════════════════════════════════════

  /**
   * Load the YouTube IFrame API script if not already present
   */
  _loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      this.apiReady = true;
      return;
    }

    // Set up the global callback before loading the script
    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      this.apiReady = true;
      if (prevCallback) prevCallback();
      // If a video was waiting to load, start it now
      if (this.pendingVideoId) {
        const id = this.pendingVideoId;
        this.pendingVideoId = null;
        this.startVideo(id);
      }
    };

    if (!document.getElementById('yt-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'yt-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  // ═══════════════════════════════════════════
  // VIDEO GRID
  // ═══════════════════════════════════════════

  /**
   * Render the grid of video clips with difficulty filters
   */
  renderVideoGrid() {
    const container = document.getElementById('video-content');
    if (!container) return;

    const difficultyLabels = {
      easy: { label: 'Facile / Easy', color: 'var(--success, #10b981)' },
      medium: { label: 'Media / Medium', color: 'var(--warning, #f59e0b)' },
      hard: { label: 'Difficile / Hard', color: 'var(--danger, #ef4444)' },
    };

    const categoryLabels = {
      ted: 'TED Talk',
      movie: 'Film / Movie',
      music: 'Musica / Music',
      news: 'Notizie / News',
      educational: 'Educativo / Educational',
    };

    const categoryIcons = {
      ted: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>',
      movie:
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg>',
      music:
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
      news: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/></svg>',
      educational:
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>',
    };

    const filtered =
      this.currentFilter === 'all'
        ? videoDatabase
        : videoDatabase.filter((v) => v.difficulty === this.currentFilter);

    const completedClips = this.progressManager?.data?.videoProgress?.completedClips || {};

    container.innerHTML = `
      <div class="video-filter-bar">
        <button class="btn btn-mode ${this.currentFilter === 'all' ? 'active' : ''}" data-video-filter="all">
          Tutti / All
        </button>
        <button class="btn btn-mode ${this.currentFilter === 'easy' ? 'active' : ''}" data-video-filter="easy">
          Facile / Easy
        </button>
        <button class="btn btn-mode ${this.currentFilter === 'medium' ? 'active' : ''}" data-video-filter="medium">
          Media / Medium
        </button>
        <button class="btn btn-mode ${this.currentFilter === 'hard' ? 'active' : ''}" data-video-filter="hard">
          Difficile / Hard
        </button>
      </div>

      <div class="video-grid">
        ${filtered
          .map((video) => {
            const diff = difficultyLabels[video.difficulty] || difficultyLabels.easy;
            const catLabel = categoryLabels[video.category] || video.category;
            const catIcon = categoryIcons[video.category] || '';
            const isCompleted = completedClips[video.id];
            const duration = video.endTime - video.startTime;

            return `
              <div class="video-card ${isCompleted ? 'completed' : ''}" data-video-id="${video.id}">
                ${isCompleted ? '<div class="video-completed-badge"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>' : ''}
                <div class="video-thumbnail">
                  <img src="https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg" alt="${video.title}" loading="lazy" />
                  <div class="video-play-overlay">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  </div>
                  <span class="video-duration">${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}</span>
                </div>
                <div class="video-card-body">
                  <h4 class="video-card-title">${video.title}</h4>
                  <p class="video-card-title-it">${video.titleIt}</p>
                  <div class="video-card-meta">
                    <span class="video-difficulty" style="background: ${diff.color};">${diff.label}</span>
                    <span class="video-category">${catIcon} ${catLabel}</span>
                  </div>
                </div>
              </div>
            `;
          })
          .join('')}
      </div>
    `;

    // Bind filter buttons
    container.querySelectorAll('[data-video-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.currentFilter = btn.dataset.videoFilter;
        this.renderVideoGrid();
      });
    });

    // Bind video cards
    container.querySelectorAll('.video-card').forEach((card) => {
      card.addEventListener('click', () => {
        const videoId = card.dataset.videoId;
        if (videoId) this.startVideo(videoId);
      });
    });
  }

  // ═══════════════════════════════════════════
  // VIDEO PLAYER
  // ═══════════════════════════════════════════

  /**
   * Start playing a video clip
   */
  startVideo(videoId) {
    const video = getVideoById(videoId);
    if (!video) return;

    if (!this.apiReady) {
      this.pendingVideoId = videoId;
      this._loadYouTubeAPI();
      return;
    }

    this.currentVideo = video;
    this.renderVideoPlayer(video);
  }

  /**
   * Render the video player layout with YouTube embed, subtitles, and vocabulary
   */
  renderVideoPlayer(video) {
    const container = document.getElementById('video-content');
    if (!container) return;

    const difficultyLabels = {
      easy: { label: 'Facile / Easy', color: 'var(--success, #10b981)' },
      medium: { label: 'Media / Medium', color: 'var(--warning, #f59e0b)' },
      hard: { label: 'Difficile / Hard', color: 'var(--danger, #ef4444)' },
    };

    const diff = difficultyLabels[video.difficulty] || difficultyLabels.easy;

    container.innerHTML = `
      <div class="video-player-container">
        <div class="video-player-header">
          <button class="btn btn-secondary video-back-btn" id="video-back-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Indietro / Back
          </button>
          <div class="video-player-info">
            <h3>${video.title}</h3>
            <p>${video.titleIt}</p>
          </div>
          <span class="video-difficulty" style="background: ${diff.color};">${diff.label}</span>
        </div>

        <div class="video-player-body">
          <div class="video-main-col">
            <div class="video-iframe-wrap">
              <div id="video-yt-player"></div>
            </div>

            <div class="video-controls">
              <button class="btn btn-secondary" id="video-replay-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
                Rigioca / Replay
              </button>
              <button class="btn btn-secondary" id="video-playpause-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Play
              </button>
              <button class="btn btn-secondary" id="video-speed-btn" data-speed="1">
                1x
              </button>
            </div>

            <div class="video-subtitles" id="video-subtitles">
              <h4>Sottotitoli / Subtitles</h4>
              <div class="video-subtitles-list" id="video-subtitles-list">
                ${video.subtitles
                  .map(
                    (sub, i) => `
                  <div class="subtitle-line" data-index="${i}" data-time="${sub.time}">
                    <div class="subtitle-english">${sub.english}</div>
                    <div class="subtitle-italian">${sub.italian}</div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          </div>

          <div class="video-side-col">
            <div class="video-vocab-panel">
              <h4>Vocabolario / Vocabulary</h4>
              <div class="video-vocab-list">
                ${video.vocabulary
                  .map(
                    (v) => `
                  <div class="video-vocab-item">
                    <div class="video-vocab-word">
                      ${v.english}
                      ${ttsService.isSupported ? ttsService.speakerButtonHTML(v.english) : ''}
                    </div>
                    <div class="video-vocab-pronunciation">${v.pronunciation}</div>
                    <div class="video-vocab-translation">${v.italian}</div>
                    <div class="video-vocab-example">"${v.example}"</div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>

            <div class="video-description-panel">
              <h4>Info</h4>
              <p>${video.description}</p>
              <p class="video-description-it">${video.descriptionIt}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach TTS listeners for vocabulary speaker buttons
    ttsService.attachTTSListeners(container);

    // Bind controls
    document.getElementById('video-back-btn')?.addEventListener('click', () => {
      this._stopPlayback();
      this.renderVideoGrid();
    });

    document.getElementById('video-replay-btn')?.addEventListener('click', () => {
      this._replayClip();
    });

    document.getElementById('video-playpause-btn')?.addEventListener('click', () => {
      this._togglePlayPause();
    });

    document.getElementById('video-speed-btn')?.addEventListener('click', (e) => {
      this._cycleSpeed(e.currentTarget);
    });

    // Bind subtitle lines for click-to-seek and TTS
    container.querySelectorAll('.subtitle-line').forEach((line) => {
      line.addEventListener('click', () => {
        const time = parseFloat(line.dataset.time);
        const index = parseInt(line.dataset.index, 10);
        if (this.player && !Number.isNaN(time)) {
          this.player.seekTo(this.currentVideo.startTime + time, true);
        }
        // Speak the English text
        const englishText = this.currentVideo?.subtitles?.[index]?.english;
        if (englishText && ttsService.isSupported) {
          ttsService.speak(englishText);
        }
      });
    });

    // Create YouTube player
    this._createPlayer(video);
  }

  /**
   * Create the YouTube player instance
   */
  _createPlayer(video) {
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }

    this.player = new YT.Player('video-yt-player', {
      videoId: video.youtubeId,
      playerVars: {
        autoplay: 1,
        start: video.startTime,
        end: video.endTime,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        enablejsapi: 1,
        cc_load_policy: 0,
        iv_load_policy: 3,
      },
      events: {
        onReady: () => this._onPlayerReady(),
        onStateChange: (event) => this.onPlayerStateChange(event),
      },
    });
  }

  /**
   * Handle player ready event
   */
  _onPlayerReady() {
    this._startSubtitleSync();
    this._updatePlayPauseBtn(true);
  }

  /**
   * Handle YouTube player state changes
   */
  onPlayerStateChange(event) {
    const state = event.data;

    if (state === YT.PlayerState.PLAYING) {
      this._startSubtitleSync();
      this._updatePlayPauseBtn(true);
    } else if (state === YT.PlayerState.PAUSED) {
      this._stopSubtitleSync();
      this._updatePlayPauseBtn(false);
    } else if (state === YT.PlayerState.ENDED) {
      this._stopSubtitleSync();
      this._updatePlayPauseBtn(false);
      this._onClipEnded();
    }
  }

  // ═══════════════════════════════════════════
  // SUBTITLE SYNC
  // ═══════════════════════════════════════════

  /**
   * Start polling for subtitle synchronization
   */
  _startSubtitleSync() {
    this._stopSubtitleSync();
    this.subtitleInterval = setInterval(() => {
      if (!this.player || !this.currentVideo) return;
      try {
        const currentTime = this.player.getCurrentTime();
        this.syncSubtitles(currentTime);
      } catch {
        // Player may not be ready yet
      }
    }, 500);
  }

  /**
   * Stop subtitle sync polling
   */
  _stopSubtitleSync() {
    if (this.subtitleInterval) {
      clearInterval(this.subtitleInterval);
      this.subtitleInterval = null;
    }
  }

  /**
   * Highlight current subtitle based on video playback time
   */
  syncSubtitles(currentTime) {
    if (!this.currentVideo) return;

    const relativeTime = currentTime - this.currentVideo.startTime;
    const subtitles = this.currentVideo.subtitles;
    let activeIndex = -1;

    for (let i = subtitles.length - 1; i >= 0; i--) {
      if (relativeTime >= subtitles[i].time) {
        activeIndex = i;
        break;
      }
    }

    const lines = document.querySelectorAll('#video-subtitles-list .subtitle-line');
    lines.forEach((line, i) => {
      line.classList.remove('active', 'past');
      if (i === activeIndex) {
        line.classList.add('active');
        // Scroll active line into view
        line.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else if (i < activeIndex) {
        line.classList.add('past');
      }
    });
  }

  // ═══════════════════════════════════════════
  // CONTROLS
  // ═══════════════════════════════════════════

  /**
   * Toggle play/pause
   */
  _togglePlayPause() {
    if (!this.player) return;
    try {
      const state = this.player.getPlayerState();
      if (state === YT.PlayerState.PLAYING) {
        this.player.pauseVideo();
      } else {
        this.player.playVideo();
      }
    } catch {
      // Player may not be ready
    }
  }

  /**
   * Update play/pause button text and icon
   */
  _updatePlayPauseBtn(isPlaying) {
    const btn = document.getElementById('video-playpause-btn');
    if (!btn) return;
    if (isPlaying) {
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        Pausa / Pause
      `;
    } else {
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Play
      `;
    }
  }

  /**
   * Replay the current clip from the start
   */
  _replayClip() {
    if (!this.player || !this.currentVideo) return;
    try {
      this.player.seekTo(this.currentVideo.startTime, true);
      this.player.playVideo();
    } catch {
      // Player may not be ready
    }
  }

  /**
   * Cycle through playback speeds: 1x -> 0.75x -> 0.5x -> 1x
   */
  _cycleSpeed(btn) {
    if (!this.player) return;
    const speeds = [1, 0.75, 0.5];
    const currentSpeed = parseFloat(btn.dataset.speed) || 1;
    const nextIndex = (speeds.indexOf(currentSpeed) + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];

    try {
      this.player.setPlaybackRate(newSpeed);
      btn.dataset.speed = newSpeed;
      btn.textContent = `${newSpeed}x`;
    } catch {
      // Player may not support rate change
    }
  }

  // ═══════════════════════════════════════════
  // CLIP COMPLETION
  // ═══════════════════════════════════════════

  /**
   * Handle when a clip ends playback
   */
  _onClipEnded() {
    if (!this.currentVideo) return;

    // Mark as completed in progress
    this.progressManager?.completeVideoClip(this.currentVideo.id);

    // Show completion overlay
    this._showCompletionOverlay();
  }

  /**
   * Show the vocabulary review and completion overlay
   */
  _showCompletionOverlay() {
    const video = this.currentVideo;
    if (!video) return;

    const subtitlesContainer = document.getElementById('video-subtitles');
    if (!subtitlesContainer) return;

    subtitlesContainer.innerHTML = `
      <div class="video-completion">
        <div class="video-completion-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h3>Clip Completato! / Clip Completed!</h3>
        <p>${video.title}</p>

        <div class="video-completion-vocab">
          <h4>Ripasso Vocabolario / Vocabulary Review</h4>
          ${video.vocabulary
            .map(
              (v) => `
            <div class="video-review-word">
              <strong>${v.english}</strong> - ${v.italian}
              <span class="video-review-pron">${v.pronunciation}</span>
            </div>
          `
            )
            .join('')}
        </div>

        <div class="video-completion-actions">
          <button class="btn btn-secondary" id="video-replay-again-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
            Riguarda / Replay
          </button>
          <button class="btn btn-primary" id="video-next-btn">
            Prossimo Clip / Next Clip
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </div>
    `;

    document.getElementById('video-replay-again-btn')?.addEventListener('click', () => {
      this.renderVideoPlayer(video);
    });

    document.getElementById('video-next-btn')?.addEventListener('click', () => {
      this._stopPlayback();
      this.renderVideoGrid();
    });
  }

  // ═══════════════════════════════════════════
  // CLEANUP
  // ═══════════════════════════════════════════

  /**
   * Stop playback and clean up resources
   */
  _stopPlayback() {
    this._stopSubtitleSync();
    if (this.player) {
      try {
        this.player.stopVideo();
        this.player.destroy();
      } catch {
        // Player may already be destroyed
      }
      this.player = null;
    }
    this.currentVideo = null;
  }
}
