/**
 * Knowledge AIO - Main Application Entry Point
 * Architecture: Service-Oriented (Audio, Storage, Lyrics) with Pub/Sub State.
 *
 * Enhancements:
 *   - Error boundaries around every init step
 *   - Page Visibility API integration (pauses background effects)
 *   - Proper cleanup on unload (prevents memory leaks)
 *   - Event delegation for nav + action cards (fewer listeners)
 *   - Defensive null-checks throughout rendering
 *   - Deterministic Word-of-the-Day with deduplication
 */
import { store } from './store/index.js';
import { storageService } from './services/StorageService.js';
import { lyricsService } from './services/LyricsService.js';
import { MusicManager } from './music.js';
import { ProgressManager } from './progress.js';
import { LearnManager } from './LearnManager.js';
import { PracticeManager } from './PracticeManager.js';
import { TopicManager } from './topics/TopicManager.js';
import { TopicPracticeManager } from './topics/TopicPracticeManager.js';
import { MorphBackground } from './MorphBackground.js';
import { CursorParticles } from './CursorParticles.js';

class App {
  constructor() {
    this.unsubscribe = null;

    /** @type {MusicManager | null} */
    this.musicManager = null;
    /** @type {ProgressManager | null} */
    this.progressManager = null;
    /** @type {LearnManager | null} */
    this.learnManager = null;
    /** @type {PracticeManager | null} */
    this.practiceManager = null;
    /** @type {TopicManager | null} */
    this.topicManager = null;
    /** @type {TopicPracticeManager | null} */
    this.topicPracticeManager = null;
    /** @type {MorphBackground | null} */
    this.morphBackground = null;
    /** @type {CursorParticles | null} */
    this.cursorParticles = null;

    // Bind once for listener cleanup
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
    this._onBeforeUnload = this._onBeforeUnload.bind(this);

    this.init();
  }

  async init() {
    // Hide matrix canvas during splash
    const matrixCanvas = document.getElementById('matrix-morph');
    if (matrixCanvas) {
      matrixCanvas.style.opacity = '0';
      matrixCanvas.style.transition = 'opacity 1s ease';
    }

    // 1. Services
    try {
      await storageService.init();
    } catch (err) {
      console.error('StorageService failed:', err);
    }

    // 2. Progress (must come before managers that depend on it)
    try {
      this.progressManager = new ProgressManager();
      await this.progressManager.init();
    } catch (err) {
      console.error('ProgressManager failed:', err);
    }

    // 3. Feature Managers
    try {
      this.musicManager = new MusicManager(this.progressManager);
      this.learnManager = new LearnManager(this.progressManager);
      this.practiceManager = new PracticeManager(this.progressManager);
      this.topicManager = new TopicManager(this.progressManager);
      this.topicPracticeManager = new TopicPracticeManager(this.progressManager);
      this.topicManager.init();
      this.topicPracticeManager.init();
    } catch (err) {
      console.error('Manager initialization failed:', err);
    }

    // 4. State Subscriptions
    this.unsubscribe = store.subscribe(this._handleStateChange.bind(this));

    // 5. DOM
    this._setupEventListeners();
    this._bindLegacyGlobals();

    // 6. Initial Render
    this._render();
    this._renderHome();

    // 7. Visual Effects (non-critical - fail silently)
    this._initVisualEffects();

    // 8. Lifecycle Hooks
    document.addEventListener('visibilitychange', this._onVisibilityChange);
    window.addEventListener('beforeunload', this._onBeforeUnload);

    // 9. Dismiss splash and reveal matrix
    this._scheduleSplashDismiss();
  }

  // -- Visual Effects (isolated so failures don't break the app) --

  _initVisualEffects() {
    try {
      this.morphBackground = new MorphBackground();
      this.morphBackground.init();
    } catch (err) {
      console.warn('MorphBackground unavailable:', err.message);
    }

    try {
      const cp = new CursorParticles({
        spawnRate: 3,
        decay: 0.94,
        lerpFactor: 0.12,
        ringRadius: 18,
      });
      this.cursorParticles = cp.init() ?? null;
    } catch (err) {
      console.warn('CursorParticles unavailable:', err.message);
      this.cursorParticles = null;
    }
  }

  // -- Splash Screen --

  _scheduleSplashDismiss() {
    const splash = document.getElementById('splash-screen');
    if (!splash) return;

    const matrixCanvas = document.getElementById('matrix-morph');

    const dismiss = () => {
      if (!splash.parentNode) return;
      splash.classList.add('fade-out');

      // Reveal matrix canvas as splash fades out
      if (matrixCanvas) matrixCanvas.style.opacity = '1';

      splash.addEventListener('transitionend', () => splash.remove(), { once: true });
      setTimeout(() => {
        if (splash.parentNode) splash.remove();
      }, 1000);
    };

    setTimeout(dismiss, 3200);
    // Safety: force remove after 5s regardless
    setTimeout(() => {
      if (splash.parentNode) splash.remove();
      if (matrixCanvas) matrixCanvas.style.opacity = '1';
    }, 5000);
  }

  // -- Lifecycle --

  _onVisibilityChange() {
    if (document.hidden) {
      this.morphBackground?.pause?.();
      this.cursorParticles?.pause?.();
    } else {
      this.morphBackground?.resume?.();
      this.cursorParticles?.resume?.();
    }
  }

  _onBeforeUnload() {
    this._destroy();
  }

  _destroy() {
    this.unsubscribe?.();
    this.morphBackground?.destroy?.();
    this.cursorParticles?.destroy?.();

    document.removeEventListener('visibilitychange', this._onVisibilityChange);
    window.removeEventListener('beforeunload', this._onBeforeUnload);
  }

  // -- Legacy Globals (for inline onclick handlers in index.html) --

  _bindLegacyGlobals() {
    window.startLesson = (level) => this.learnManager?.startLesson(level);
    window.closeLessonView = () => this.learnManager?.closeLessonView();
    window.startPractice = (mode) => this.practiceManager?.startPractice(mode);
    window.closePractice = () => this.practiceManager?.closePractice();

    window.musicManager = this.musicManager;
    window.learnManager = this.learnManager;
    window.practiceManager = this.practiceManager;
    window.topicManager = this.topicManager;
    window.topicPracticeManager = this.topicPracticeManager;
  }

  // -- Event Listeners (uses delegation where possible) --

  _setupEventListeners() {
    // Navigation - delegate from the nav container
    const navMenu = document.querySelector('.nav-menu');
    navMenu?.addEventListener('click', (e) => {
      const navItem = e.target.closest('.nav-item');
      if (!navItem) return;

      navMenu.querySelectorAll('.nav-item').forEach((b) => b.classList.remove('active'));
      navItem.classList.add('active');

      const section = navItem.dataset.section;
      if (!section) return;

      store.setState({ ui: { currentView: section } });

      document.querySelectorAll('.section').forEach((el) => el.classList.remove('active'));
      document.getElementById(section)?.classList.add('active');

      if (section === 'home') this._renderHome();
      if (section === 'topics') this.topicManager?.renderTopicsHub();
    });

    // Home action cards - delegate from home section
    const homeSection = document.getElementById('home');
    homeSection?.addEventListener('click', (e) => {
      const card = e.target.closest('.action-card[data-go-to]');
      if (!card) return;

      const view = card.dataset.goTo;
      if (view) {
        store.setState({ ui: { currentView: view } });
        document.querySelector(`.nav-item[data-section="${view}"]`)?.click();
      }
    });
  }

  // -- State --

  _handleStateChange() {
    // Matrix theme is permanent - no theme switching logic needed.
  }

  _render() {
    this._handleStateChange();
  }

  // -- Home Page Rendering --

  _renderHome() {
    const data = this.progressManager?.data;
    if (!data) return;

    this._setText('home-words-learned', data.wordsLearned);
    this._setText('home-songs-practiced', data.songsCompleted);
    this._setText('home-streak', data.streak?.current ?? 0);

    this._initTranslationBox();
  }

  _initTranslationBox() {
    const input = document.getElementById('translate-input');
    const btn = document.getElementById('translate-btn');
    const result = document.getElementById('translate-result');
    const dirBtns = document.querySelectorAll('.translate-direction .btn-mode');
    if (!input || !btn || !result) return;

    let langPair = 'en|it';

    dirBtns.forEach((b) => {
      b.addEventListener('click', () => {
        dirBtns.forEach((x) => x.classList.remove('active'));
        b.classList.add('active');
        langPair = b.dataset.lang;
        result.textContent = '';
      });
    });

    const doTranslate = async () => {
      const text = input.value.trim();
      if (!text) return;
      result.textContent = '...';
      try {
        const translation = await lyricsService.translate(text, langPair);
        result.textContent = translation || 'Traduzione non disponibile';
      } catch {
        result.textContent = 'Errore di traduzione';
      }
    };

    btn.addEventListener('click', doTranslate);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doTranslate();
    });
  }

  // -- DOM Helpers --

  _setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(text);
  }

  _setTextBySelector(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }
}

// Bootstrap
window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
