/**
 * GameHost — mounts a level game and owns everything no game should rewrite.
 *
 * The `.dc.html` templates in knowledge-aio-giochi carry a React third layer:
 * the coach panel, the lesson-completed screen, the pause menu and the chapter
 * rail. The app is vanilla DOM, so that layer is replaced here — once, for all
 * sixteen games — while the first two layers (the game module and KaioEngine)
 * port across unchanged.
 *
 * ricerca/42 §42.2 draws the line this class sits on: **the frame belongs to
 * the app, the glass belongs to the game**. Everything GameHost renders is
 * chrome, and stays in the app's register (glass, gold-on-graphite, mono
 * numerals). Everything inside the canvas is the game's own visual register and
 * GameHost never touches it.
 *
 * It also owns the obligations of the SDK design §4.4 and §7: pause/resume from
 * `visibilitychange`, a ResizeObserver, listeners bound to an AbortSignal so
 * teardown cannot leak, and an error boundary that falls back to the legacy
 * exercises with a visible bilingual notice instead of a white screen (§11.2).
 */

import { escapeHtml } from '../utils/SanitizeHtml.js';
import { delegate } from '../utils/EventDispatch.js';
import { gameAudioService } from '../services/GameAudioService.js';
import * as engine from './KaioEngine.js';

const CHROME = {
  it: {
    pause: 'In pausa',
    resume: 'Riprendi',
    language: 'Lingua',
    audio: 'Audio',
    chapter: 'Capitolo',
    lesson: 'Lezione',
    exit: 'Esci dal gioco',
    tapToContinue: 'tocca per continuare',
    coachClose: 'Ho capito',
    crashed: 'Il gioco si è interrotto.',
    crashedHint: 'Le risposte già date sono state salvate.',
    retry: 'Riprova',
    fallback: 'Passa agli esercizi',
    loading: 'Caricamento del gioco…',
    levelDone: 'Livello completato',
    levelItems: 'voci completate',
    backToLevels: 'Torna ai livelli',
    keepPlaying: 'Continua a giocare',
  },
  en: {
    pause: 'Paused',
    resume: 'Resume',
    language: 'Language',
    audio: 'Audio',
    chapter: 'Chapter',
    lesson: 'Lesson',
    exit: 'Leave the game',
    tapToContinue: 'tap to continue',
    coachClose: 'Got it',
    crashed: 'The game stopped.',
    crashedHint: 'Answers already given were saved.',
    retry: 'Try again',
    fallback: 'Switch to exercises',
    loading: 'Loading the game…',
    levelDone: 'Level complete',
    levelItems: 'items completed',
    backToLevels: 'Back to the levels',
    keepPlaying: 'Keep playing',
  },
};

/** Level names are bilingual "it / en" strings; pick one half for the chrome. */
function pickLang(text, it) {
  const parts = String(text || '').split(' / ');
  if (parts.length < 2) return text || '';
  return it ? parts[0] : parts.slice(1).join(' / ');
}

export class GameHost {
  /**
   * @param {object} opts
   * @param {HTMLElement} opts.container - where the host mounts
   * @param {object} opts.game - the game module's default export
   * @param {import('./LevelSession.js').LevelSession} opts.session
   * @param {object} [opts.props] - game tuning props (hero, speed, …)
   * @param {() => void} [opts.onExit] - back to the calling view
   * @param {() => void} [opts.onFallback] - open the legacy exercises instead
   * @param {(result: object) => void} [opts.onLevelComplete] - fired once, the
   *   first time `session.finish()` passes (§43.5); the caller marks the
   *   level's lessons complete in ProgressManager
   */
  constructor({ container, game, session, props, onExit, onFallback, onLevelComplete }) {
    this.container = container;
    this.game = game;
    this.session = session;
    this.props = props || {};
    this.onExit = onExit || (() => {});
    this.onFallback = onFallback || this.onExit;
    this.onLevelComplete = onLevelComplete || (() => {});

    // The engine expects a React-shaped ref so ported games need no edits.
    this.cv = { current: null };
    this.state = {
      beat: 0,
      chapter: 0,
      lang: 'it',
      paused: false,
      coach: null,
      done: false,
      muted: false,
      step: 0,
    };

    this._unbind = null;
    this._destroyed = false;
    this._crashed = false;
    this._levelResult = null;
    this._levelShown = false;
  }

  // ─── lifecycle ─────────────────────────────────

  async start() {
    const restored = await this.session.restore();
    this.state.chapter = restored.chapter;
    this.state.beat = restored.beat;

    this._renderShell();
    this.cv.current = this.container.querySelector('.game-canvas');

    this.game.init(this);
    engine.init(this, {
      W: this.game.W,
      H: this.game.H,
      chapters: this.game.CH,
      onTap: (p) => this.game.tap && this.game.tap(this, p),
      onDown: (p, e) => this.game.down && this.game.down(this, p, e),
      onDrag: (a, b) => this.game.drag && this.game.drag(this, a, b),
      onUp: (p) => this.game.up && this.game.up(this, p),
      onSwipe: (dir) => this.game.swipe && this.game.swipe(this, dir),
      onKey: (e) => this.game.key && this.game.key(this, e),
    });
    engine.audio(this);
    if (this.game.drone) engine.drone(this, this.game.drone);
    this._renderChrome();
    this._remeasureWhenFontLoads();
  }

  /**
   * A game measures its own text to lay the canvas out, and the first frame
   * happens before the register's webfont has loaded. Without this the widths
   * are those of the fallback stack and stay wrong for the rest of the level.
   */
  _remeasureWhenFontLoads() {
    const face = this.game.meta && this.game.meta.font;
    if (!face || typeof this.game.remeasure !== 'function') return;
    if (typeof document === 'undefined' || !document.fonts || !document.fonts.load) return;
    document.fonts
      .load(face)
      .then(() => {
        if (!this._destroyed) this.game.remeasure(this);
      })
      .catch(() => {});
  }

  destroy() {
    if (this._destroyed) return;
    this._destroyed = true;
    engine.destroy(this);
    gameAudioService.stopDrone();
    if (this._unbind) this._unbind();
    this._unbind = null;
    if (this.game.destroy) this.game.destroy(this);
    this.container.innerHTML = '';
  }

  // ─── the engine's host contract ────────────────

  setState(patch) {
    const next = typeof patch === 'function' ? patch(this.state) : patch;
    Object.assign(this.state, next);
    this._checkLevelComplete();
    this._renderChrome();
  }

  /**
   * The level is complete when a beat ends and every item is cleared. That is
   * the only moment the ledger is closed: `session.complete()` runs the §4.3
   * invariant once, persists the flag, and the caller is told so it can mark
   * the lessons in ProgressManager. A replay of a finished level, or a level
   * restored as completed, never gets here again.
   */
  _checkLevelComplete() {
    if (this._levelResult || this.session.completed) return;
    if (!this.state.done || !this.session.isCovered()) return;
    const result = this.session.complete();
    if (!result || !result.passed) return;
    this._levelResult = result;
    this.session.save({ beat: this.state.beat, chapter: this.state.chapter });
    try {
      this.onLevelComplete(result);
    } catch (err) {
      // A bookkeeping failure in the caller must not read as a game crash.
      console.error('GameHost onLevelComplete failed:', err && err.message);
    }
  }

  reset(beat) {
    this.game.reset(this, beat);
  }

  update(dt) {
    this.game.update(this, dt);
  }

  draw(ctx) {
    this.game.draw(this, ctx);
  }

  onCoachClose() {
    if (this.game.onCoachClose) this.game.onCoachClose(this);
  }

  onBeatChange(beat, chapter) {
    this.session.save({ beat, chapter });
  }

  onEngineError(err) {
    this._crashed = true;
    this.session.save({ beat: this.state.beat, chapter: this.state.chapter });
    console.error('GameHost error boundary:', err && err.message);
    this._renderChrome();
  }

  // ─── rendering ─────────────────────────────────

  get strings() {
    return CHROME[this.state.lang] || CHROME.it;
  }

  _renderShell() {
    const meta = this.game.meta || {};
    const title = escapeHtml(meta.title || '');
    const titleEn = escapeHtml(meta.titleEn || '');
    const levelLabel = escapeHtml(meta.levelLabel || '');

    this.container.innerHTML = `
      <div class="game-host">
        <div class="game-topbar">
          <button type="button" class="btn btn-secondary game-exit" data-action="game.exit">
            ← Esci / Leave
          </button>
          <div class="game-topbar-id">
            <span class="game-topbar-level">${levelLabel}</span>
            <span class="game-topbar-title">${title}${titleEn ? ` <span class="game-topbar-title-en">/ ${titleEn}</span>` : ''}</span>
          </div>
          <div class="game-topbar-actions">
            <button type="button" class="game-chip" data-action="game.lang" aria-label="Lingua / Language">
              <span class="game-chip-value" data-role="lang">IT</span>
            </button>
            <button type="button" class="game-chip" data-action="game.mute" aria-label="Audio">
              <span class="game-chip-value" data-role="audio">ON</span>
            </button>
            <button type="button" class="game-chip" data-action="game.pause" aria-label="Pausa / Pause">
              ❙❙
            </button>
          </div>
        </div>
        <div class="game-stage">
          <canvas class="game-canvas" role="img" aria-label="Area di gioco / Game area"></canvas>
          <div class="game-overlay" data-role="overlay"></div>
        </div>
        <div class="game-rail" data-role="rail"></div>
        <p class="sr-only" role="status" aria-live="polite" data-role="live"></p>
      </div>
    `;

    this._unbind = delegate(this.container, {
      'game.exit': () => this._exit(),
      'game.lang': () => this._toggleLang(),
      'game.mute': () => this._toggleMute(),
      'game.pause': () => this.setState((s) => ({ paused: !s.paused })),
      'game.resume': () => this.setState({ paused: false }),
      'game.coachClose': () => {
        this.setState({ coach: null });
        this.onCoachClose();
      },
      'game.next': () => engine.next(this),
      'game.levelNext': () => {
        this._levelShown = true;
        engine.next(this);
      },
      'game.goChapter': (ds) => engine.goChapter(this, Number(ds.index)),
      'game.goBeat': (ds) => engine.goBeat(this, Number(ds.index)),
      'game.fallback': () => this._fallback(),
      'game.retry': () => this._retry(),
    });
  }

  _renderChrome() {
    if (this._destroyed) return;
    const overlay = this.container.querySelector('[data-role="overlay"]');
    const rail = this.container.querySelector('[data-role="rail"]');
    if (!overlay || !rail) return;

    const langChip = this.container.querySelector('[data-role="lang"]');
    if (langChip) langChip.textContent = this.state.lang === 'it' ? 'IT' : 'EN';
    const audioChip = this.container.querySelector('[data-role="audio"]');
    if (audioChip) audioChip.textContent = this.state.muted ? '—' : 'ON';

    overlay.innerHTML = this._overlayHtml();
    overlay.classList.toggle('is-active', overlay.innerHTML.trim().length > 0);
    rail.innerHTML = this._railHtml();
    this._announce();
  }

  _overlayHtml() {
    if (this._crashed) return this._crashHtml();
    if (this.state.coach) return this._coachHtml();
    if (this.state.done && this._levelResult && !this._levelShown) return this._levelDoneHtml();
    if (this.state.done) return this._doneHtml();
    if (this.state.paused) return this._pauseHtml();
    return '';
  }

  /**
   * Shown once, the beat the level is completed. ricerca/33 §33.5: no marks,
   * no stars, no percentages — the count of what was covered and the way out.
   */
  _levelDoneHtml() {
    const t = this.strings;
    const it = this.state.lang === 'it';
    const p = this.session.progress();
    return `
      <div class="game-panel game-panel-done game-panel-level" role="dialog" aria-live="polite">
        <p class="game-done-eyebrow">${escapeHtml(t.levelDone)}</p>
        <p class="game-done-title">${escapeHtml(pickLang(this.session.levelName, it))}</p>
        <p class="game-done-subtitle">${p.total} ${escapeHtml(t.levelItems)}</p>
        <div class="game-panel-actions">
          <button type="button" class="btn btn-primary" data-action="game.exit">
            ${escapeHtml(t.backToLevels)}
          </button>
          <button type="button" class="btn btn-secondary" data-action="game.levelNext">
            ${escapeHtml(t.keepPlaying)}
          </button>
        </div>
      </div>
    `;
  }

  _crashHtml() {
    const t = this.strings;
    return `
      <div class="game-panel game-panel-crash" role="alertdialog" aria-live="assertive">
        <p class="game-panel-title">${escapeHtml(t.crashed)}</p>
        <p class="game-panel-body">${escapeHtml(t.crashedHint)}</p>
        <div class="game-panel-actions">
          <button type="button" class="btn btn-primary" data-action="game.retry">
            ${escapeHtml(t.retry)}
          </button>
          <button type="button" class="btn btn-secondary" data-action="game.fallback">
            ${escapeHtml(t.fallback)}
          </button>
        </div>
      </div>
    `;
  }

  /**
   * The coach panel is the third and last rung of the error ladder
   * (ricerca/00 passo 6) — the only place in a game where explanatory text is
   * allowed. Three lines: what happened, what it cost, the rule.
   */
  _coachHtml() {
    const copy = this.game.coachText
      ? this.game.coachText(this, this.state.coach, this.state.lang)
      : null;
    if (!copy) return '';
    const extra = copy.extra ? `<p class="game-coach-extra">${escapeHtml(copy.extra)}</p>` : '';
    const hint = copy.hint ? `<p class="game-coach-hint">${escapeHtml(copy.hint)}</p>` : '';
    return `
      <div class="game-panel game-panel-coach" role="dialog" aria-live="polite">
        <p class="game-coach-what">${escapeHtml(copy.what || '')}</p>
        <p class="game-coach-effect">${escapeHtml(copy.effect || '')}</p>
        <p class="game-coach-rule">${escapeHtml(copy.rule || '')}</p>
        ${extra}
        ${hint}
        <button type="button" class="btn btn-primary game-coach-close" data-action="game.coachClose">
          ${escapeHtml(this.strings.coachClose)}
        </button>
      </div>
    `;
  }

  _doneHtml() {
    const copy = this.game.doneView ? this.game.doneView(this, this.state.lang) : {};
    const marks = (this.TITLES || [])
      .map(
        (_, i) =>
          `<span class="game-mark ${i <= this.state.beat ? 'is-on' : ''}" aria-hidden="true"></span>`
      )
      .join('');
    return `
      <div class="game-panel game-panel-done" role="dialog" aria-live="polite">
        <p class="game-done-eyebrow">${escapeHtml(copy.eyebrow || '')}</p>
        <p class="game-done-title">${escapeHtml(copy.title || '')}</p>
        <p class="game-done-subtitle">${escapeHtml(copy.subtitle || '')}</p>
        <div class="game-marks">${marks}</div>
        <button type="button" class="btn btn-primary" data-action="game.next">
          ${escapeHtml(this.strings.tapToContinue)}
        </button>
      </div>
    `;
  }

  _pauseHtml() {
    const t = this.strings;
    const it = this.state.lang === 'it';
    const chapters = (this.CH || [])
      .map(
        (c, i) => `
        <button type="button" class="game-grid-btn ${i === this.state.chapter ? 'is-on' : ''}"
          data-action="game.goChapter" data-index="${i}">
          ${i + 1}
          <span class="sr-only">${escapeHtml(c.t[it ? 0 : 1])}</span>
        </button>`
      )
      .join('');
    const beats = (this.TITLES || [])
      .map(
        (title, i) => `
        <button type="button" class="game-grid-btn ${i === this.state.beat ? 'is-on' : ''}"
          data-action="game.goBeat" data-index="${i}">
          ${i + 1}
          <span class="sr-only">${escapeHtml(title[it ? 0 : 1])}</span>
        </button>`
      )
      .join('');

    return `
      <div class="game-panel game-panel-pause" role="dialog" aria-label="${escapeHtml(t.pause)}">
        <p class="game-panel-eyebrow">${escapeHtml(t.pause)}</p>
        <button type="button" class="btn btn-primary game-resume" data-action="game.resume">
          ${escapeHtml(t.resume)}
        </button>
        <p class="game-panel-eyebrow">${escapeHtml(t.chapter)}</p>
        <div class="game-grid game-grid-chapters">${chapters}</div>
        <p class="game-panel-eyebrow">${escapeHtml(t.lesson)}</p>
        <div class="game-grid game-grid-beats">${beats}</div>
        <button type="button" class="btn btn-secondary" data-action="game.exit">
          ${escapeHtml(t.exit)}
        </button>
      </div>
    `;
  }

  _railHtml() {
    const it = this.state.lang === 'it';
    const chapter = (this.CH || [])[this.state.chapter];
    const title = chapter ? chapter.t[it ? 0 : 1] : '';
    const p = this.session.progress();
    const pct = p.total === 0 ? 0 : Math.round((p.cleared / p.total) * 100);
    return `
      <div class="game-rail-line">
        <span class="game-rail-chapter">${this.state.chapter + 1}/${(this.CH || []).length}</span>
        <span class="game-rail-title">${escapeHtml(title)}</span>
        <span class="game-rail-count">${p.cleared}/${p.total}</span>
      </div>
      <div class="game-rail-bar"><div class="game-rail-fill" style="width:${pct}%"></div></div>
    `;
  }

  /**
   * Canvas content is opaque to assistive technology, so the state a sighted
   * player reads off the glass is mirrored into a live region (SDK design §5).
   */
  _announce() {
    const live = this.container.querySelector('[data-role="live"]');
    if (!live) return;
    const it = this.state.lang === 'it';
    const chapter = (this.CH || [])[this.state.chapter];
    const beatTitle = (this.TITLES || [])[this.state.beat];
    const parts = [
      `${this.strings.chapter} ${this.state.chapter + 1}`,
      chapter ? chapter.t[it ? 0 : 1] : '',
      `${this.strings.lesson} ${this.state.beat + 1}`,
      beatTitle ? beatTitle[it ? 0 : 1] : '',
    ].filter(Boolean);
    live.textContent = parts.join(' · ');
  }

  // ─── chrome actions ────────────────────────────

  _toggleLang() {
    const lang = this.state.lang === 'it' ? 'en' : 'it';
    this.setState({ lang });
    this.session.save({ lang, beat: this.state.beat, chapter: this.state.chapter });
  }

  _toggleMute() {
    const muted = !this.state.muted;
    gameAudioService.setMuted(muted);
    this.setState({ muted });
  }

  _exit() {
    this.session.save({ beat: this.state.beat, chapter: this.state.chapter });
    this.destroy();
    this.onExit();
  }

  _fallback() {
    this.session.save({ beat: this.state.beat, chapter: this.state.chapter });
    this.destroy();
    this.onFallback();
  }

  async _retry() {
    this._crashed = false;
    engine.destroy(this);
    this.container.innerHTML = '';
    this._destroyed = false;
    await this.start();
  }
}

/**
 * Mount a game, or return null so the caller keeps the legacy path.
 *
 * @param {object} opts - as GameHost's constructor, plus nothing else
 * @returns {Promise<GameHost|null>}
 */
export async function mountGame(opts) {
  const host = new GameHost(opts);
  try {
    await host.start();
    return host;
  } catch (err) {
    console.error('GameHost failed to mount:', err && err.message);
    host.destroy();
    return null;
  }
}
