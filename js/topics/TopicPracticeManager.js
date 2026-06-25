/**
 * TOPIC PRACTICE MANAGER - FlowLearn
 * ===================================
 *
 * Handles practice exercises for technical topics.
 * Reuses the 5 existing exercise types + 4 technical types + 4 advanced modes.
 *
 * Exercise types:
 * 1. listening    - Choose correct translation from options
 * 2. writing      - Type the Italian translation
 * 3. matching     - Match English terms to Italian translations
 * 4. fillblank    - Complete a sentence with the missing word
 * 5. sentence     - Reorder scrambled words
 * 6. command      - Given a description, type the correct command (Linux)
 * 7. codeoutput   - Given code, identify what concept it demonstrates (Python)
 * 8. context      - Match a term to its correct technical sub-context
 * 9. codechallenge - Write code/command from a prompt
 * 10. comprehension - Read paragraph and identify correct statement
 * 11. scenario     - Fill blank in a situational dialogue
 * 12. terminal     - Terminal simulator: execute command chains in sequence
 * 13. codelab      - Code Lab: complete missing lines in code blocks
 * 14. techtalk     - Tech Talk: technical conversation with keyword/grammar checks
 * 15. chain        - Chain Challenge: 5 connected questions with streak multiplier
 */

import { sfxService } from '../services/SfxService.js';
import { analyticsService } from '../services/AnalyticsService.js';
import { practiceHUD } from '../PracticeHUD.js';
import { nearMiss } from '../utils/StringDistance.js';
import { TopicVelocita } from './TopicVelocita.js';
import { delegate } from '../utils/EventDispatch.js';
import { escapeHtml } from '../utils/SanitizeHtml.js';
import { adaptiveDifficultyService } from '../services/AdaptiveDifficultyService.js';
import { advancedModesMixin } from './TopicPracticeAdvancedModes.js';
import { renderingMixin } from './TopicPracticeRendering.js';
import { resultHandlerMixin } from './TopicPracticeResultHandler.js';
import { COMMAND_ALIASES } from './TopicPracticeConstants.js';
import {
  FEEDBACK_DWELL,
  shuffleArray,
  normalize,
  normalizeWithAccents,
  calculateXP,
} from '../utils/PracticeUtils.js';

export class TopicPracticeManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.currentMode = null;
    this.currentTopicId = null;
    this.currentLevel = null;
    this.questions = [];
    this.fullPool = [];
    this.contextIndex = new Map();
    this.currentQuestionIndex = 0;
    this.score = 0;

    // XP & Timer state
    this.questionStartTime = 0;
    this.sessionXP = 0;
    this.consecutiveCorrect = 0;
    this.maxStreak = 0;
    this.totalResponseTime = 0;
    this.timerInterval = null;
  }

  init() {
    window.topicPracticeManager = this;
    this._bindDelegation();
  }

  // Doctrine §11.7: data-action delegation — replaces inline onclicks
  // that the v1.4.0 CSP rejects.
  _bindDelegation() {
    const map = {
      'topicPractice.checkAnswer': (ds, _e, el) => this.checkAnswer(el, ds.opt, ds.correct),
      'topicPractice.checkWriting': (ds) => this.checkWritingAnswer(ds.correct),
      'topicPractice.checkSentence': (ds) => this.checkSentenceAnswer(ds.correct),
      'topicPractice.checkCommand': (ds) => this.checkCommandAnswer(ds.correct),
      'topicPractice.checkCodeChallenge': (ds) => this.checkCodeChallenge(ds.correct),
      'topicPractice.showCodelabHint': () => this.showCodelabHint(),
      'topicPractice.checkCodelab': () => this.checkCodelabAnswer(),
      'topicPractice.showTechTalkHint': () => this.showTechTalkHint(),
      'topicPractice.handleTechTalk': () => this.handleTechTalkMessage(),
      'topicPractice.checkChain': (ds) => this.checkChainAnswer(ds.opt, ds.correct),
      'topicPractice.checkChainTyping': (ds) => this.checkChainTypingAnswer(ds.correct),
      'topicPractice.checkChainCommand': (ds) => this.checkChainCommandAnswer(ds.correct),
    };
    const container = document.getElementById('topic-practice-content');
    if (container) delegate(container, map);
  }

  /**
   * Start a topic practice session
   * @param {string} mode - Exercise type
   * @param {string} topicId - Topic to practice
   * @param {number|null} levelNum - Specific level, or null for all unlocked
   */
  async startPractice(mode, topicId, levelNum = null) {
    this.currentMode = mode;
    this.currentTopicId = topicId;
    this.currentLevel = levelNum;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.sessionXP = 0;
    this.consecutiveCorrect = 0;
    this.maxStreak = 0;
    this.totalResponseTime = 0;
    practiceHUD.reset();

    // Load topic data
    const data = await this.loadTopicData(topicId);
    if (!data) {
      this.showNotification('Errore nel caricamento dei dati. / Error loading data.', 'warning');
      return;
    }

    // Build question pool and context index
    const pool = this.buildPool(data, topicId, levelNum);
    this.fullPool = [...pool];
    this.buildContextIndex(pool);

    // Velocita is its own session lifecycle — short, no per-question dwell.
    if (mode === 'velocita') {
      if (pool.length < 4) {
        this.showNotification(
          'Servono almeno 4 termini per Velocita. / Velocita needs at least 4 terms.',
          'warning'
        );
        return;
      }
      this.showPracticeUI();
      // Clear stale streak / XP labels from a previous practice session so
      // the picker screen doesn't show ghost values.
      const streakEl = document.getElementById('topic-practice-streak');
      if (streakEl) streakEl.textContent = '';
      const xpEl = document.getElementById('topic-practice-xp');
      if (xpEl) xpEl.textContent = '0 XP';
      const progEl = document.getElementById('topic-practice-progress');
      if (progEl) progEl.textContent = '';
      const fillEl = document.getElementById('topic-practice-progress-fill');
      if (fillEl) fillEl.style.width = '0%';
      if (!this.velocita) this.velocita = new TopicVelocita(this.progressManager);
      this.velocita.showDurationPicker(pool, topicId, levelNum);
      return;
    }

    this.generateQuestions(mode, pool);

    if (this.questions.length === 0) {
      this.showNotification(
        'Nessuna domanda disponibile. Completa qualche lezione prima! / No questions available.',
        'warning'
      );
      return;
    }

    // Show practice view
    this.showPracticeUI();
    this.startQuestionTimer();
    this.updateMetaDisplay();
    this.renderQuestion();
  }

  async loadTopicData(topicId) {
    if (window.topicManager && window.topicManager.dataCache[topicId]) {
      return window.topicManager.dataCache[topicId];
    }
    try {
      const module = await import(`./data/${topicId}.js`);
      return module.default;
    } catch (err) {
      console.error('Failed to load topic data:', err);
      return null;
    }
  }

  buildPool(data, topicId, levelNum) {
    let pool = [];

    if (levelNum !== null && data.levels[levelNum]) {
      data.levels[levelNum].lessons.forEach((lesson) => {
        pool = pool.concat(
          lesson.items.map((item) => ({ ...item, _topicId: topicId, _level: levelNum }))
        );
      });
    } else {
      const stats = this.progressManager.getTopicStats(topicId);
      const unlockedLevels = stats ? stats.unlockedLevels : [0];

      unlockedLevels.forEach((lvl) => {
        if (data.levels[lvl]) {
          data.levels[lvl].lessons.forEach((lesson) => {
            pool = pool.concat(
              lesson.items.map((item) => ({ ...item, _topicId: topicId, _level: lvl }))
            );
          });
        }
      });
    }

    return pool;
  }

  /**
   * Build an index of items grouped by their context field
   */
  buildContextIndex(pool) {
    this.contextIndex = new Map();
    for (const item of pool) {
      const ctx = item.context || 'general';
      if (!this.contextIndex.has(ctx)) this.contextIndex.set(ctx, []);
      this.contextIndex.get(ctx).push(item);
    }
  }

  generateQuestions(mode, pool) {
    if (mode === 'terminal') {
      this.questions = this.generateTerminalQuestions(pool);
      return;
    }

    if (mode === 'codelab') {
      this.questions = this.generateCodelabQuestions(pool);
      return;
    }

    if (mode === 'techtalk') {
      this.questions = this.generateTechTalkQuestions(pool);
      return;
    }

    if (mode === 'chain') {
      this.questions = this.generateChainQuestions(pool);
      return;
    }

    // Translation modes (listening/matching/writing) and scenario render the
    // English target alongside the Italian translation as the answer. When
    // english === italian the prompt and the correct option are the SAME
    // string — the answer is given for free. Filter those items out at
    // pool-build time so the user never sees a degenerate question.
    const isDistinctTranslation = (item) =>
      item.english && item.italian && item.english.toLowerCase() !== item.italian.toLowerCase();

    if (mode === 'fillblank' || mode === 'sentence') {
      pool = pool.filter((item) => item.example);
    } else if (mode === 'command') {
      pool = pool.filter((item) => item.command);
    } else if (mode === 'codeoutput') {
      pool = pool.filter((item) => item.code);
    } else if (mode === 'codechallenge') {
      // Single-line input — exclude multi-line code so the user is not asked
      // to type 5 lines of a decorator into a one-line text box. Multi-line
      // code is still exercised through codelab and codeoutput.
      pool = pool.filter((item) => item.command || (item.code && !item.code.includes('\n')));
    } else if (mode === 'comprehension') {
      pool = pool.filter((item) => item.example);
    } else if (mode === 'scenario') {
      pool = pool.filter((item) => item.example && isDistinctTranslation(item));
    } else {
      pool = pool.filter(isDistinctTranslation);
    }

    this.questions = adaptiveDifficultyService.selectItems(pool, 10, (key) =>
      analyticsService.getItemAnalytics(key)
    );
  }


  // ─── UTILITY ───────────────────────────────────

  maskTermInText(text, term) {
    if (!text || !term || term.length < 3 || /\s/.test(term)) return text;
    const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const placeholder = '_'.repeat(Math.max(3, term.length));
    try {
      return text.replace(new RegExp(`\\b${safe}\\b`, 'gi'), placeholder);
    } catch (_e) {
      return text;
    }
  }

  formatContextLabel(contextKey) {
    return contextKey.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  // ─── OPTION GENERATION ─────────────────────────

  /**
   * Generate semantically-related options using context/difficulty grouping
   */
  generateOptions(correct) {
    const field =
      this.currentMode === 'codeoutput' || this.currentMode === 'scenario' ? 'english' : 'italian';
    const currentQ = this.questions[this.currentQuestionIndex];
    const correctLen = correct.length;
    const minLen = Math.max(1, Math.floor(correctLen * 0.4));
    const maxLen = Math.ceil(correctLen * 2.5);

    const isPlausible = (val) => {
      if (!val || val === correct) return false;
      return val.length >= minLen && val.length <= maxLen;
    };

    const distractors = new Set();

    // Phase 1: Same context items
    const currentCtx = currentQ.context || 'general';
    const sameCtxItems = (this.contextIndex.get(currentCtx) || []).filter((it) =>
      isPlausible(it[field])
    );
    const shuffledCtx = shuffleArray(sameCtxItems);
    for (const item of shuffledCtx) {
      if (distractors.size >= 3) break;
      distractors.add(item[field]);
    }

    // Phase 2: Same difficulty items
    if (distractors.size < 3 && currentQ.difficulty) {
      const sameDiff = this.fullPool.filter(
        (it) =>
          it.difficulty === currentQ.difficulty &&
          it.context !== currentCtx &&
          isPlausible(it[field])
      );
      const shuffledDiff = shuffleArray(sameDiff);
      for (const item of shuffledDiff) {
        if (distractors.size >= 3) break;
        if (!distractors.has(item[field])) distractors.add(item[field]);
      }
    }

    // Phase 3: Full pool fallback
    if (distractors.size < 3) {
      const remaining = this.fullPool.filter((it) => isPlausible(it[field]));
      const shuffledAll = shuffleArray(remaining);
      for (const item of shuffledAll) {
        if (distractors.size >= 3) break;
        if (!distractors.has(item[field])) distractors.add(item[field]);
      }
    }

    return shuffleArray([correct, ...Array.from(distractors).slice(0, 3)]);
  }

  /**
   * Generate context sub-category options from the context index
   */
  generateContextOptions(correctContext) {
    const allContexts = Array.from(this.contextIndex.keys());
    const options = [correctContext];

    const others = shuffleArray(allContexts.filter((c) => c !== correctContext));
    for (let i = 0; i < 3 && i < others.length; i++) {
      options.push(others[i]);
    }

    while (options.length < 4) {
      options.push(`other-${options.length}`);
    }

    return shuffleArray(options);
  }

  generateScenarioOptions(correct) {
    const currentQ = this.questions[this.currentQuestionIndex];
    const correctLen = correct.length;
    const minLen = Math.max(1, Math.floor(correctLen * 0.4));
    const maxLen = Math.ceil(correctLen * 2.5);

    const isPlausible = (val) => {
      if (!val || val === correct) return false;
      return val.length >= minLen && val.length <= maxLen;
    };

    const distractors = new Set();

    // Prefer same context
    const currentCtx = currentQ.context || 'general';
    const sameCtx = (this.contextIndex.get(currentCtx) || []).filter((it) =>
      isPlausible(it.english)
    );
    for (const item of shuffleArray(sameCtx)) {
      if (distractors.size >= 3) break;
      distractors.add(item.english);
    }

    // Fallback to full pool
    if (distractors.size < 3) {
      const remaining = this.fullPool.filter((it) => isPlausible(it.english));
      for (const item of shuffleArray(remaining)) {
        if (distractors.size >= 3) break;
        if (!distractors.has(item.english)) distractors.add(item.english);
      }
    }

    return shuffleArray([correct, ...Array.from(distractors).slice(0, 3)]);
  }

  // ─── TIMER & XP ──────────────────────────────

  startQuestionTimer() {
    this.questionStartTime = Date.now();
    this.clearTimer();
    const timerEl = document.getElementById('topic-practice-timer');
    if (!timerEl) return;

    this.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.questionStartTime) / 1000);
      timerEl.textContent = `${elapsed}s`;
      timerEl.classList.remove('timer-green', 'timer-warn', 'timer-danger');
      if (elapsed < 5) timerEl.classList.add('timer-green');
      else if (elapsed <= 15) timerEl.classList.add('timer-warn');
      else timerEl.classList.add('timer-danger');
    }, 250);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getResponseTimeSeconds() {
    return (Date.now() - this.questionStartTime) / 1000;
  }

  updateMetaDisplay() {
    const timerEl = document.getElementById('topic-practice-timer');
    if (timerEl) timerEl.textContent = '0s';

    const streakEl = document.getElementById('topic-practice-streak');
    if (streakEl)
      streakEl.textContent =
        this.consecutiveCorrect > 0 ? `Streak: ${this.consecutiveCorrect}` : '';

    const xpEl = document.getElementById('topic-practice-xp');
    if (xpEl) xpEl.textContent = `${this.sessionXP} XP`;

    const fillEl = document.getElementById('topic-practice-progress-fill');
    if (fillEl) {
      const percent = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
      fillEl.style.width = `${percent}%`;
    }
  }

  showFloatingXP(amount) {
    const container = document.getElementById('topic-practice-content');
    if (!container) return;
    const floater = document.createElement('div');
    floater.className = 'xp-floater';
    floater.textContent = `+${amount} XP`;
    container.appendChild(floater);
    setTimeout(() => floater.remove(), 1200);
  }

  // ─── ANSWER CHECKING ──────────────────────────

  checkAnswer(btnEl, selected, correct) {
    this.handleResult(selected === correct, correct);
  }

  /**
   * Check writing answer with accent tolerance + near-miss forgiveness.
   */
  checkWritingAnswer(correct) {
    const input = document.getElementById('topic-writing-input');
    if (!input) return;

    const userValue = input.value;
    const exactMatch = normalize(userValue) === normalize(correct);

    if (exactMatch) {
      this.handleResult(true, correct);
      return;
    }

    const accentMatch = normalizeWithAccents(userValue) === normalizeWithAccents(correct);
    if (accentMatch) {
      this.handleResult(true, correct, true);
      return;
    }

    if (nearMiss(userValue, correct).partial) {
      this.handleNearMiss(userValue, correct);
      return;
    }

    this.handleResult(false, correct);
  }

  /**
   * Near-miss path: typo within Levenshtein threshold. 50% XP, breaks streak,
   * shows softer feedback with diff highlight.
   */
  handleNearMiss(userValue, correctAnswer) {
    this.clearTimer();
    const responseTime = this.getResponseTimeSeconds();
    this.totalResponseTime += responseTime;

    const xpEarned = Math.round(calculateXP(responseTime, this.consecutiveCorrect) * 0.5);
    this.sessionXP += xpEarned;
    this.progressManager.addXP(xpEarned);
    this.consecutiveCorrect = 0;

    this.updateMetaDisplay();
    sfxService.nearMiss();
    practiceHUD.onAnswerResult({ correct: false, streak: 0 });

    const container = document.getElementById('topic-practice-content');
    if (!container) return;

    const u = String(userValue || '');
    const e = String(correctAnswer || '');
    const max = Math.max(u.length, e.length);
    let diffHtml = '';
    for (let i = 0; i < max; i += 1) {
      const ch = u[i] ?? '';
      const expected = e[i] ?? '';
      const match = ch !== '' && ch.toLowerCase() === expected.toLowerCase();
      const display = ch || '·';
      const cls = match ? 'char-match' : 'char-miss';
      diffHtml += `<span class="${cls}">${escapeHtml(display)}</span>`;
    }

    container.innerHTML = `
      <div class="feedback-card feedback-near-miss">
        <div class="feedback-message">Quasi! Hai sbagliato di poco / Just a typo away</div>
        ${xpEarned > 0 ? `<div class="feedback-xp">+${xpEarned} XP (parziale)</div>` : ''}
        <div class="near-miss-diff">${diffHtml}</div>
        <div class="feedback-answer">La risposta era: <strong>${escapeHtml(correctAnswer)}</strong></div>
        <div class="feedback-progress-bar"><div class="feedback-progress-fill"></div></div>
      </div>
    `;

    setTimeout(() => this.nextQuestion(), FEEDBACK_DWELL.nearMiss);
  }

  /**
   * Check command answer with alias support
   */
  checkCommandAnswer(correct) {
    const input = document.getElementById('topic-writing-input');
    if (!input) return;

    const normalizeCmd = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const sortFlags = (cmd) => {
      return cmd.replace(/-([a-zA-Z]+)/g, (match, flags) => {
        return `-${flags.split('').sort().join('')}`;
      });
    };

    const userInput = normalizeCmd(input.value);
    const expected = normalizeCmd(correct);

    // Exact match or flag-sorted match
    if (userInput === expected || sortFlags(userInput) === sortFlags(expected)) {
      this.handleResult(true, correct);
      return;
    }

    // Check known aliases
    const aliases = COMMAND_ALIASES[expected] || [];
    for (const alias of aliases) {
      const normAlias = normalizeCmd(alias);
      if (userInput === normAlias || sortFlags(userInput) === sortFlags(normAlias)) {
        this.handleResult(true, correct);
        return;
      }
    }

    // Partial credit: correct base command, wrong flags/args
    const userParts = userInput.split(' ');
    const expectedParts = expected.split(' ');
    if (userParts[0] === expectedParts[0] && userParts.length > 1) {
      this.handlePartialResult(correct);
      return;
    }

    this.handleResult(false, correct);
  }

  /**
   * Check code challenge with enhanced normalization
   */
  checkCodeChallenge(correct) {
    const input = document.getElementById('topic-writing-input');
    if (!input) return;

    const normalizeCode = (s) =>
      s.toLowerCase().replace(/\s+/g, ' ').replace(/;+$/g, '').replace(/["']/g, "'").trim();

    const sortFlags = (cmd) => {
      return cmd.replace(/-([a-zA-Z]+)/g, (match, flags) => {
        return `-${flags.split('').sort().join('')}`;
      });
    };

    const userInput = normalizeCode(input.value);
    const expected = normalizeCode(correct);

    if (userInput === expected || sortFlags(userInput) === sortFlags(expected)) {
      this.handleResult(true, correct);
      return;
    }

    // Partial credit for correct base command/function
    const userParts = userInput.split(' ');
    const expectedParts = expected.split(' ');
    if (userParts[0] === expectedParts[0] && userParts.length > 1) {
      this.handlePartialResult(correct);
      return;
    }

    this.handleResult(false, correct);
  }

  /**
   * Check sentence reconstruction with partial credit
   */
  checkSentenceAnswer(correct) {
    const input = document.getElementById('topic-writing-input');
    if (!input) return;

    if (normalize(input.value) === normalize(correct)) {
      this.handleResult(true, correct);
      return;
    }

    const userWords = input.value.trim().split(/\s+/);
    const correctWords = correct.trim().split(/\s+/);
    let correctCount = 0;
    const maxLen = Math.max(userWords.length, correctWords.length);
    const positions = [];

    for (let i = 0; i < maxLen; i++) {
      const userWord = (userWords[i] || '').toLowerCase();
      const correctWord = (correctWords[i] || '').toLowerCase();
      const isCorrectPos = userWord === correctWord;
      if (isCorrectPos) correctCount++;
      positions.push({
        word: userWords[i] || '',
        correct: isCorrectPos,
        expected: correctWords[i] || '',
      });
    }

    const score = correctWords.length > 0 ? correctCount / correctWords.length : 0;

    if (score >= 0.7) {
      this.handlePartialSentenceResult(positions, correctCount, correctWords.length, correct);
    } else {
      this.handleResult(false, correct);
    }
  }

  closePractice() {
    this.clearTimer();
    if (window.topicManager) {
      window.topicManager.showView('detail');
    }
    this.questions = [];
    this.fullPool = [];
    this.contextIndex = new Map();
  }
}

Object.assign(TopicPracticeManager.prototype, advancedModesMixin, renderingMixin, resultHandlerMixin);
