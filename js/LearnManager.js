/**
 * LEARN MODULE - Knowledge AIO
 * =============================
 *
 * Gestisce le lezioni e i livelli di apprendimento.
 * Uses inline feedback instead of alert() for all user messages.
 */

import { getLessonsByLevel, getLesson } from './lessons.js';
import { ttsService } from './services/TTSService.js';
import { registerAction } from './utils/EventDispatch.js';
import { escapeHtml } from './utils/SanitizeHtml.js';
import { hasGame, loadGame, LEARN_SURFACE } from './games/registry.js';

export class LearnManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.currentLevel = 0;
    this.currentLesson = null;
    this.currentItemIndex = 0;
    this.gameHost = null;

    this.init();
  }

  init() {
    // Doctrine §11.7: register data-action handlers (replaces inline
    // onclicks rejected by the v1.4.0 CSP).
    registerAction('learn.prev', () => this.prevItem());
    registerAction('learn.next', () => this.nextItem());
    registerAction('learn.close', () => this.closeLessonView());
  }

  /**
   * Start a level. A level with a registered game opens the game; every other
   * level falls through to the item-by-item lesson view, unmodified. That
   * lookup is the whole coexistence mechanism — migration is level by level
   * and there is no flag day (level-game SDK design §3).
   */
  async startLesson(level) {
    const levelData = getLessonsByLevel(level);
    if (!levelData) return;

    if (hasGame(LEARN_SURFACE, level) && (await this.startGame(level))) return;

    const firstLesson = levelData.lessons[0];
    if (!firstLesson) return;

    this.openLesson(level, firstLesson.id);
  }

  /**
   * @returns {Promise<boolean>} false when the game could not be mounted, so
   *   the caller falls back to the legacy lesson view (§11.2).
   */
  async startGame(level) {
    const container = document.getElementById('lesson-content');
    const wrapper = document.getElementById('lesson-container');
    if (!container || !wrapper) return false;

    this.openGameShell(level, wrapper, container);

    // The SDK, the engine and the game are all lazy: a learner who never opens
    // a level with a game pays nothing for it in the initial bundle (§13.1).
    // registry.js is the only eager part, and it is a lookup table.
    const [game, sdk, host] = await Promise.all([
      loadGame(LEARN_SURFACE, level),
      import('./games/LevelSession.js'),
      import('./games/GameHost.js'),
    ]);
    const session = game
      ? await sdk.createLevelSession({
          surface: LEARN_SURFACE,
          level,
          mode: 'game',
          progressManager: this.progressManager,
        })
      : null;

    if (!game || !session) {
      this.closeGameShell(wrapper);
      this.showGameUnavailable(container);
      return false;
    }

    this.gameHost = await host.mountGame({
      container,
      game,
      session,
      props: {},
      onExit: () => {
        this.gameHost = null;
        this.closeGameShell(wrapper);
        this.closeLessonView();
      },
      onFallback: () => {
        this.gameHost = null;
        this.closeGameShell(wrapper);
        const first = getLessonsByLevel(level)?.lessons?.[0];
        if (first) this.openLesson(level, first.id);
        else this.closeLessonView();
      },
      onLevelComplete: () => this.completeGameLevel(level),
    });

    if (!this.gameHost) {
      this.closeGameShell(wrapper);
      this.showGameUnavailable(container);
      return false;
    }
    return true;
  }

  openGameShell(level, wrapper, container) {
    this.currentLevel = level;
    this.currentLesson = null;
    document.querySelector('.levels-grid')?.classList.add('hidden');
    wrapper.classList.remove('hidden');
    // GameHost draws its own top bar with a back control; the lesson header
    // would duplicate it.
    wrapper.classList.add('game-mode');
    container.innerHTML = '';
  }

  closeGameShell(wrapper) {
    wrapper.classList.remove('game-mode');
  }

  showGameUnavailable(container) {
    container.innerHTML = `
      <div class="lesson-item-card game-unavailable">
        <p>${escapeHtml('Il gioco di questo livello non si è caricato. / This level’s game did not load.')}</p>
        <p class="text-muted">${escapeHtml('Continuiamo con le lezioni. / Carrying on with the lessons.')}</p>
      </div>
    `;
  }

  /**
   * GameHost reports the level complete once every item is cleared and the
   * ledger passed `session.finish()` (§43.5). A game replaces the teaching and
   * the testing of its level, so its lessons are marked the way the
   * item-by-item view marks them — once: a replay must not count twice, and
   * the lesson count feeds the daily goals and the achievements.
   */
  completeGameLevel(level) {
    const levelData = getLessonsByLevel(level);
    if (!levelData) return;

    const fresh = levelData.lessons.filter(
      (lesson) => !this.progressManager.isLessonCompleted(level, lesson.id)
    );
    if (fresh.length === 0) return;

    for (const lesson of fresh) {
      this.progressManager.completeLesson(level, lesson.id);
      this.progressManager.incrementDailyLessons?.();
    }

    // Same SRS ingestion as completeLesson(), for the whole level at once.
    if (window.srsManager) {
      const words = fresh
        .flatMap((lesson) => lesson.items || [])
        .filter((item) => item.english && item.italian)
        .map((item) => ({
          english: item.english,
          italian: item.italian,
          pronunciation: item.pronunciation || '',
          example: item.example || '',
        }));
      if (words.length) window.srsManager.addWords(words, `game-${level}`);
    }

    // A completed level is a real milestone (§14.6), unlike a routine beat.
    this.spawnParticles();
  }

  /**
   * Show inline message when a level is locked
   */
  showLevelLocked(level) {
    const container = document.getElementById('lesson-content');
    if (!container) return;

    document.querySelector('.levels-grid').classList.add('hidden');
    document.getElementById('lesson-container').classList.remove('hidden');
    document.getElementById('lesson-title').textContent = 'Livello Bloccato / Level Locked';
    document.getElementById('lesson-progress').textContent = '';

    container.innerHTML = `
            <div class="lesson-item-card" style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;"></div>
                <h3>Completa il Livello ${level - 1} prima!</h3>
                <p>Complete Level ${level - 1} first!</p>
                <button class="btn btn-secondary" style="margin-top: 1.5rem;" data-action="learn.close">
                    ← Indietro / Back
                </button>
            </div>
        `;
  }

  /**
   * Open a specific lesson
   */
  openLesson(level, lessonId) {
    const lesson = getLesson(level, lessonId);
    if (!lesson) return;

    this.currentLevel = level;
    this.currentLesson = lesson;
    this.currentItemIndex = 0;

    // Show lesson container, hide levels grid
    document.querySelector('.levels-grid').classList.add('hidden');
    document.getElementById('lesson-container').classList.remove('hidden');

    // Update UI
    document.getElementById('lesson-title').textContent = lesson.title;
    this.renderLessonItem();
  }

  renderLessonItem() {
    const container = document.getElementById('lesson-content');
    if (!container || !this.currentLesson) return;

    const item = this.currentLesson.items[this.currentItemIndex];
    const totalItems = this.currentLesson.items.length;

    // Update progress text
    document.getElementById('lesson-progress').textContent =
      `${this.currentItemIndex + 1}/${totalItems}`;

    let html = '';
    const ttsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(item.english || '') : '';
    if (item.english) {
      html = `
                <div class="lesson-item-card">
                    <div class="item-pair">
                        <div class="item-english">${item.english} ${ttsBtn}</div>
                        <div class="item-separator"></div>
                        <div class="item-italian">${item.italian}</div>
                    </div>
                    <div class="item-pronunciation">Pronuncia: <strong>${item.pronunciation}</strong>${item.phonetic ? ` (${item.phonetic})` : ''}</div>
                    ${item.usage ? `<div class="item-usage">${item.usage}</div>` : ''}
                    ${item.example ? `<div class="item-example">"${item.example}"</div>` : ''}
                </div>
            `;
    }

    container.innerHTML = `
            ${html}
            <div class="lesson-nav-buttons">
                <button class="btn btn-secondary" data-action="learn.prev" ${this.currentItemIndex === 0 ? 'disabled' : ''}>← Prec. / Prev</button>
                <button class="btn btn-primary" data-action="learn.next">${this.currentItemIndex === totalItems - 1 ? 'Completa / Complete' : 'Prossimo / Next →'}</button>
            </div>
        `;

    ttsService.attachTTSListeners(container);
  }

  prevItem() {
    if (this.currentItemIndex > 0) {
      this.currentItemIndex--;
      this.renderLessonItem();
    }
  }

  nextItem() {
    if (this.currentItemIndex < this.currentLesson.items.length - 1) {
      this.currentItemIndex++;
      this.renderLessonItem();
    } else {
      this.completeLesson();
    }
  }

  completeLesson() {
    // Mark as completed in progress manager
    this.progressManager.completeLesson(this.currentLevel, this.currentLesson.id);

    // Track daily goals
    this.progressManager.incrementDailyLessons();

    // Ingest vocabulary into SRS
    if (window.srsManager && this.currentLesson?.items) {
      const words = this.currentLesson.items
        .filter((item) => item.english && item.italian)
        .map((item) => ({
          english: item.english,
          italian: item.italian,
          pronunciation: item.pronunciation || '',
          example: item.example || '',
        }));
      const source = `lesson-${this.currentLevel}-${this.currentLesson.id}`;
      window.srsManager.addWords(words, source);
    }

    // Launch celebration particles
    this.spawnParticles();

    // Show inline celebration instead of alert
    const container = document.getElementById('lesson-content');
    if (!container) return;

    const lessonTitle = this.currentLesson.title;
    const wordCount = this.currentLesson.items.length;

    container.innerHTML = `
            <div class="lesson-completion">
                <div class="completion-icon">🎉</div>
                <h3>Lezione Completata! / Lesson Completed!</h3>
                <p class="completion-detail">${lessonTitle}</p>
                <p class="completion-words">+${wordCount} parole imparate / words learned</p>
                <div class="completion-actions">
                    <button class="btn btn-secondary" data-action="back">
                        ← Torna ai Livelli / Back to Levels
                    </button>
                    <button class="btn btn-primary" data-action="practice">
                        ✍️ Pratica Ora / Practice Now
                    </button>
                </div>
            </div>
        `;

    container
      .querySelector('[data-action="back"]')
      ?.addEventListener('click', () => this.closeLessonView());
    container
      .querySelector('[data-action="practice"]')
      ?.addEventListener('click', () => this.practiceLesson());
  }

  /**
   * Spawn celebration particles on lesson completion
   */
  spawnParticles() {
    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#e67e22', '#f1c40f', '#00ff41', '#00d9ff', '#ff6b6b', '#a55eea'];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.008 + Math.random() * 0.012,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      for (const p of particles) {
        if (p.life <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.life -= p.decay;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      if (alive) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };

    requestAnimationFrame(animate);
  }

  /**
   * Navigate to Practice with the current lesson's vocabulary
   */
  practiceLesson() {
    this.closeLessonView();
    // Navigate to practice section
    document.querySelector('.nav-item[data-section="practice"]')?.click();
    // Start a listening exercise (most engaging for beginners)
    setTimeout(() => {
      if (window.practiceManager) {
        window.practiceManager.startPractice('listening');
      }
    }, 100);
  }

  closeLessonView() {
    if (this.gameHost) {
      const host = this.gameHost;
      this.gameHost = null;
      host.destroy();
    }
    const wrapper = document.getElementById('lesson-container');
    if (wrapper) {
      wrapper.classList.add('hidden');
      wrapper.classList.remove('game-mode');
    }
    document.querySelector('.levels-grid')?.classList.remove('hidden');
    this.currentLesson = null;
  }
}
