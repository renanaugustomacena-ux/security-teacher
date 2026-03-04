/**
 * FlowLearn - Main Application Entry Point
 * Architecture: Service-Oriented (Audio, Storage, Lyrics) with Pub/Sub State.
 *
 * Enhancements over original:
 *   - Robust error boundaries around every init step
 *   - Page Visibility API integration (pauses background effects)
 *   - Proper cleanup on unload (prevents memory leaks)
 *   - Event delegation for nav + action cards (fewer listeners)
 *   - Defensive null-checks throughout rendering
 *   - Deterministic Word-of-the-Day with deduplication
 */
import { store } from './store/index.js';
import { storageService } from './services/StorageService.js';
import { MusicManager } from './music.js';
import { ProgressManager } from './progress.js';
import { LearnManager } from './LearnManager.js';
import { PracticeManager } from './PracticeManager.js';
import { TopicManager } from './topics/TopicManager.js';
import { TopicPracticeManager } from './topics/TopicPracticeManager.js';
import { getAllVocabulary } from './lessons.js';
import { songsDatabase } from './songs.js';
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
    console.log('🚀 Initializing FlowLearn...');

    // ── 1. Services ──
    try {
      await storageService.init();
      console.log('✅ StorageService initialized');
    } catch (err) {
      console.error('❌ StorageService failed — app will run with defaults:', err);
    }

    // ── 2. Progress (must come before managers that depend on it) ──
    try {
      this.progressManager = new ProgressManager();
      await this.progressManager.init();
      console.log('✅ ProgressManager initialized');
    } catch (err) {
      console.error('❌ ProgressManager failed:', err);
    }

    // ── 3. Feature Managers ──
    try {
      this.musicManager = new MusicManager(this.progressManager);
      this.learnManager = new LearnManager(this.progressManager);
      this.practiceManager = new PracticeManager(this.progressManager);
      this.topicManager = new TopicManager(this.progressManager);
      this.topicPracticeManager = new TopicPracticeManager(this.progressManager);
      this.topicManager.init();
      this.topicPracticeManager.init();
      console.log('✅ Feature managers initialized');
    } catch (err) {
      console.error('❌ Manager initialization failed:', err);
    }

    // ── 4. State Subscriptions ──
    this.unsubscribe = store.subscribe(this._handleStateChange.bind(this));

    // ── 5. DOM ──
    this._setupEventListeners();
    this._bindLegacyGlobals();

    // ── 6. Initial Render ──
    this._render();
    this._renderHome();

    // ── 7. Visual Effects (non-critical — fail silently) ──
    this._initVisualEffects();

    // ── 8. Lifecycle Hooks ──
    document.addEventListener('visibilitychange', this._onVisibilityChange);
    window.addEventListener('beforeunload', this._onBeforeUnload);

    console.log('✅ FlowLearn ready');
  }

  // ── Visual Effects (isolated so failures don't break the app) ──────────────

  _initVisualEffects() {
    try {
      this.morphBackground = new MorphBackground();
      this.morphBackground.init();
    } catch (err) {
      console.warn('⚠️ MorphBackground unavailable:', err.message);
    }

    try {
      this.cursorParticles = new CursorParticles({
        spawnRate: 3,
        decay: 0.94,
        lerpFactor: 0.12,
        ringRadius: 18,
      });
      // init() returns null if device doesn't support it
      this.cursorParticles = this.cursorParticles.init() ?? null;
    } catch (err) {
      console.warn('⚠️ CursorParticles unavailable:', err.message);
      this.cursorParticles = null;
    }
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

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
    this.destroy();
  }

  /** Full teardown — call on unmount or SPA navigation away. */
  destroy() {
    this.unsubscribe?.();
    this.morphBackground?.destroy?.();
    this.cursorParticles?.destroy?.();

    document.removeEventListener('visibilitychange', this._onVisibilityChange);
    window.removeEventListener('beforeunload', this._onBeforeUnload);
  }

  // ── Legacy Globals (for inline onclick handlers in index.html) ────────────

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

  // ── Event Listeners (uses delegation where possible) ──────────────────────

  _setupEventListeners() {
    // Navigation — delegate from the nav container
    const navMenu = document.querySelector('.nav-menu');
    navMenu?.addEventListener('click', (e) => {
      const navItem = e.target.closest('.nav-item');
      if (!navItem) return;

      // Update active state
      navMenu.querySelectorAll('.nav-item').forEach((b) => b.classList.remove('active'));
      navItem.classList.add('active');

      const section = navItem.dataset.section;
      if (!section) return;

      store.setState({ ui: { currentView: section } });

      // Toggle section visibility
      document.querySelectorAll('.section').forEach((el) => el.classList.remove('active'));
      document.getElementById(section)?.classList.add('active');

      // Section-specific refresh
      if (section === 'home') this._renderHome();
      if (section === 'topics') this.topicManager?.renderTopicsHub();
    });

    // Home action cards — delegate from home section
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

  // ── State ─────────────────────────────────────────────────────────────────

  _handleStateChange(_state) {
    // Matrix theme is permanent — no theme switching logic needed.
    // Extend here for future state-driven UI updates.
  }

  _render() {
    this._handleStateChange(store.getState());
  }

  // ── Home Page Rendering ───────────────────────────────────────────────────

  _renderHome() {
    const data = this.progressManager?.data;
    if (!data) return;

    // Stats
    this._setText('home-words-learned', data.wordsLearned);
    this._setText('home-songs-practiced', data.songsCompleted);
    this._setText('home-streak', data.streak?.current ?? 0);

    // Word of the Day
    this._renderWordOfTheDay();
  }

  /**
   * Word of the Day — deterministic daily rotation from combined vocabulary.
   * Deduplicates by English word to avoid showing the same word from
   * different sources.
   */
  _renderWordOfTheDay() {
    const allVocab = this._buildVocabularyPool();
    if (allVocab.length === 0) return;

    // Deterministic daily index
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((today - startOfYear) / 86_400_000);
    const word = allVocab[dayOfYear % allVocab.length];

    this._setText('daily-word', word.english);
    this._setText('daily-translation', word.italian);
    this._setTextBySelector('.word-pronunciation', word.pronunciation || '');
    this._setText('daily-example', word.example ? `"${word.example}"` : '');
  }

  /**
   * Build a deduplicated vocabulary pool from lessons + songs.
   * @returns {Array<{ english: string, italian: string, pronunciation?: string, example?: string }>}
   */
  _buildVocabularyPool() {
    const seen = new Set();
    const pool = [];

    const addWord = (english, italian, pronunciation, example) => {
      const key = english.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      pool.push({ english, italian, pronunciation, example });
    };

    // Lesson vocabulary
    try {
      for (const v of getAllVocabulary()) {
        addWord(v.english, v.italian, v.pronunciation, v.example);
      }
    } catch {
      /* lessons may not be loaded */
    }

    // Song vocabulary
    try {
      for (const song of songsDatabase) {
        for (const step of song.steps) {
          for (const v of step.vocabulary) {
            addWord(v.word, v.translation, v.pronunciation, v.example);
          }
        }
      }
    } catch {
      /* songs may not be loaded */
    }

    return pool;
  }

  // ── DOM Helpers ───────────────────────────────────────────────────────────

  /**
   * Safely set text content by element ID.
   * @param {string} id
   * @param {string | number} text
   */
  _setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(text);
  }

  /**
   * Safely set text content by CSS selector.
   * @param {string} selector
   * @param {string} text
   */
  _setTextBySelector(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }
}

// ── Bootstrap ───────────────────────────────────────────────────────────────

window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
