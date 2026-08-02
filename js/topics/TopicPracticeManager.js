/**
 * TOPIC PRACTICE MANAGER - Knowledge AIO
 * ======================================
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
 * 16. verofalso    - Vero o Falso: judge a statement, then justify the verdict
 * 17. definizione  - Definizione: pick the Italian description of a term
 */

import { sfxService } from '../services/SfxService.js';
import { analyticsService } from '../services/AnalyticsService.js';
import { hintService } from '../services/HintService.js';
import { practiceHUD } from '../PracticeHUD.js';
import { nearMiss } from '../utils/StringDistance.js';
import { TopicVelocita } from './TopicVelocita.js';
import { delegate } from '../utils/EventDispatch.js';
import { escapeHtml } from '../utils/SanitizeHtml.js';
import { adaptiveDifficultyService } from '../services/AdaptiveDifficultyService.js';
import { smartScoreService } from '../services/SmartScoreService.js';
import { advancedModesMixin } from './TopicPracticeAdvancedModes.js';
import { extraModesMixin } from './TopicPracticeExtraModes.js';
import { renderingMixin } from './TopicPracticeRendering.js';
import { resultHandlerMixin } from './TopicPracticeResultHandler.js';
import { labModeMixin } from './TopicPracticeLabMode.js';
import { matchModeMixin } from './TopicPracticeMatchMode.js';
import { outputModesMixin } from './TopicPracticeOutputModes.js';
import { COMMAND_ALIASES, isTypeableAnswer } from './TopicPracticeConstants.js';
import {
  FEEDBACK_DWELL,
  shuffleArray,
  normalize,
  normalizeWithAccents,
  calculateXP,
  containsWholeWord,
  stripRedundantGloss,
  deriveSubContext,
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
    this.sessionSeed = 0;
    // Hints revealed for the CURRENT question (§29). Reset per question.
    this.hintLevel = 0;
    this._lastUserAnswer = '';

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
      // dataset values are always strings — coerce before use.
      'topicPractice.veroFalsoVerdict': (ds) => this.answerVeroFalsoVerdict(ds.verdict === 'true'),
      'topicPractice.veroFalsoRationale': (ds) => this.answerVeroFalsoRationale(Number(ds.idx)),
      'topicPractice.checkDefinizione': (ds, _e, el) =>
        this.checkDefinizioneAnswer(el, ds.opt, ds.correct),
      'topicPractice.tapPair': (ds) => this.tapPair(ds),
      'topicPractice.checkCmdCloze': (ds) => this.checkCmdCloze(ds),
      'topicPractice.replayDictation': (ds) => this.replayDictation(ds),
      'topicPractice.showHint': () => this.showHint(),
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
    // The mode the learner chose. `currentMode` is what the CURRENT question
    // is being asked in, which an adaptive session varies per question.
    this.sessionMode = mode;
    this.adaptivePlan = null;
    this.currentTopicId = topicId;
    this.currentLevel = levelNum;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.sessionXP = 0;
    this.consecutiveCorrect = 0;
    this.maxStreak = 0;
    this.totalResponseTime = 0;
    // Offsets every fixed template rotation. Without it `index % length` gives
    // the identical sequence in every session forever, and any template past
    // the question count is unreachable.
    this.sessionSeed = Math.floor(Math.random() * 1000);
    practiceHUD.reset();

    // Load topic data
    const data = await this.loadTopicData(topicId);
    if (!data) {
      this.showNotification('Errore nel caricamento dei dati. / Error loading data.', 'warning');
      return;
    }

    // Level count feeds the placement-derived ability prior.
    this._levelCount = Object.keys(data.levels || {}).length;

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

    // Labs are lazily imported per topic, so this path is async and cannot go
    // through the synchronous generateQuestions().
    if (mode === 'lab') {
      this.questions = await this.generateLabQuestions(data, topicId, levelNum);
      if (this.questions.length === 0) {
        this.showNotification(
          'Nessun lab disponibile per questo livello. / No lab available for this level.',
          'warning'
        );
        return;
      }
      this.showPracticeUI();
      this.startQuestionTimer();
      this.updateMetaDisplay();
      this.renderQuestion();
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
          lesson.items.map((item) => this._preparePoolItem(item, topicId, levelNum))
        );
      });
    } else {
      const stats = this.progressManager.getTopicStats(topicId);
      const unlockedLevels = stats ? stats.unlockedLevels : [0];

      unlockedLevels.forEach((lvl) => {
        if (data.levels[lvl]) {
          data.levels[lvl].lessons.forEach((lesson) => {
            pool = pool.concat(
              lesson.items.map((item) => this._preparePoolItem(item, topicId, lvl))
            );
          });
        }
      });
    }

    return pool;
  }

  /**
   * Stamp provenance and clean the Italian gloss.
   *
   * Cleaning here rather than at render time keeps the correct answer and every
   * distractor in the same shape, and keeps grading comparing against exactly
   * what the learner was shown.
   */
  _preparePoolItem(item, topicId, level) {
    return {
      ...item,
      italian: stripRedundantGloss(item.italian, item.english),
      _subContext: deriveSubContext(item),
      _topicId: topicId,
      _level: level,
    };
  }

  /**
   * Ability estimate driving distractor calibration and mode selection, 0-1.
   * Both read this one number so a session cannot contradict itself.
   */
  _studentAbility() {
    const topicId = this.currentTopicId;
    const smartScore =
      this.currentLevel !== null ? smartScoreService.getScore(topicId, this.currentLevel) : 0;
    const topicAccuracy = analyticsService.getTopicAccuracy(topicId);
    const placement = this.progressManager?.getTopicPlacement?.(topicId);

    return adaptiveDifficultyService.estimateAbility({
      smartScore,
      // Both getters return 0 for "never played" and for a genuine zero, so
      // presence is asserted separately rather than inferred from the value.
      hasSmartScore: smartScore > 0,
      topicAccuracy,
      hasAnalytics: topicAccuracy > 0,
      placementLevel: placement && !placement.skipped ? placement.level : undefined,
      levelCount: this._levelCount,
    });
  }

  /**
   * Build an index of items grouped by their context field
   */
  /**
   * Group the pool for distractor selection and for the `context` question.
   *
   * Prefers the derived sub-context (tool / command program) when the level
   * actually has several, and falls back to the authored `context` otherwise.
   * Almost every level carries a single authored context, which silently
   * reduced "pick semantically related distractors" to "pick anything here".
   */
  buildContextIndex(pool) {
    const derived = new Set(pool.map((item) => item._subContext).filter(Boolean));
    this.contextField = derived.size >= 4 ? '_subContext' : 'context';

    this.contextIndex = new Map();
    for (const item of pool) {
      const key = item[this.contextField] || item.context || 'general';
      if (!this.contextIndex.has(key)) this.contextIndex.set(key, []);
      this.contextIndex.get(key).push(item);
    }
  }

  /** The grouping key this session is using for the given item. */
  groupContextOf(item) {
    if (!item) return 'general';
    return item[this.contextField || 'context'] || item.context || 'general';
  }

  /**
   * Modes an adaptive session can interleave.
   *
   * Restricted to the formats whose question object IS the pool item and which
   * render through the shared switch, so a plan can move between them question
   * by question. The multi-stage formats (terminal, chain, lab, techtalk…) own
   * their own question shape and lifecycle and stay standalone.
   *
   * Ordered by the difficulty table in AdaptiveDifficultyService, which is
   * what turns a rising ability into a shift from recognition to recall.
   */
  static get ADAPTIVE_MODES() {
    return [
      'listening',
      'matching',
      'context',
      'fillblank',
      'comprehension',
      'scenario',
      'writing',
      'sentence',
      'codeoutput',
      'command',
      'codechallenge',
      'taskcommand',
    ];
  }

  /** Can this specific item be asked in this format at all? */
  _itemSupportsMode(item, mode) {
    const distinct =
      Boolean(item.english) &&
      Boolean(item.italian) &&
      !containsWholeWord(item.italian, item.english);
    const englishPhrase = (item.example || '').split(' = ')[0] || '';

    switch (mode) {
      case 'listening':
      case 'matching':
        return distinct;
      case 'writing':
        return distinct && isTypeableAnswer(item);
      case 'fillblank':
      case 'sentence':
      case 'comprehension':
        return Boolean(item.example);
      case 'scenario':
        return distinct && Boolean(item.example) && containsWholeWord(englishPhrase, item.english);
      case 'codeoutput':
        return Boolean(item.code);
      case 'command':
        return Boolean(item.command);
      case 'codechallenge':
        return Boolean(item.command) || (Boolean(item.code) && !item.code.includes('\n'));
      case 'taskcommand':
        return this.taskCommandCandidates([item]).length === 1;
      case 'context':
        return this.contextIndex.size >= 4;
      default:
        return false;
    }
  }

  /**
   * Plan a session that changes format as it goes.
   *
   * Every other mode runs one template ten times, which is the single biggest
   * reason a session feels like filling in a form. Here each question picks the
   * format nearest the learner's ability from those the item can actually
   * support, so a stronger learner drifts from "choose the translation" toward
   * "write the command" without ever being told they were assessed.
   */
  generateAdaptiveQuestions(pool) {
    const ability = this._studentAbility();
    const items = adaptiveDifficultyService.selectItems(pool, 10, (key) =>
      analyticsService.getItemAnalytics(key)
    );

    const plan = [];
    let previousMode = null;
    for (const item of items) {
      const supported = TopicPracticeManager.ADAPTIVE_MODES.filter((mode) =>
        this._itemSupportsMode(item, mode)
      );
      if (supported.length === 0) continue;

      // Back-to-back repeats are what the learner reads as monotony, so they
      // are avoided whenever the item leaves a choice. Bound to a const so the
      // filter does not close over the loop-mutated variable.
      const avoidMode = previousMode;
      const varied = supported.filter((mode) => mode !== avoidMode);
      const eligible = varied.length > 0 ? varied : supported;

      const mode = adaptiveDifficultyService.selectMode(eligible, ability) || eligible[0];

      // taskcommand needs a built question object rather than the bare item.
      // If the level cannot field enough distinct commands to make a real
      // choice, fall back to a format the item can definitely support.
      if (mode === 'taskcommand') {
        const built = this.buildTaskCommandQuestion(
          item,
          this.taskCommandCandidates(this.fullPool),
          ability
        );
        if (built) {
          previousMode = mode;
          plan.push({ item: built, mode });
          continue;
        }
        const fallback = eligible.find((candidate) => candidate !== 'taskcommand');
        if (!fallback) continue;
        previousMode = fallback;
        plan.push({ item, mode: fallback });
        continue;
      }

      previousMode = mode;
      plan.push({ item, mode });
    }

    this.adaptivePlan = plan;
    return plan.map((entry) => entry.item);
  }

  generateQuestions(mode, pool) {
    if (mode === 'adaptive') {
      this.questions = this.generateAdaptiveQuestions(pool);
      return;
    }

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

    if (mode === 'verofalso') {
      this.questions = this.generateVeroFalsoQuestions(pool);
      return;
    }

    if (mode === 'definizione') {
      this.questions = this.generateDefinizioneQuestions(pool);
      return;
    }

    if (mode === 'pairs') {
      this.questions = this.generatePairsQuestions(pool);
      return;
    }

    if (mode === 'readout') {
      this.questions = this.generateReadoutQuestions(pool);
      return;
    }

    if (mode === 'dictation') {
      this.questions = this.generateDictationQuestions(pool);
      return;
    }

    if (mode === 'cmdcloze') {
      this.questions = this.generateCmdClozeQuestions(pool);
      return;
    }

    if (mode === 'taskcommand') {
      this.questions = this.generateTaskCommandQuestions(pool);
      return;
    }

    // Translation modes (listening/matching/writing) and scenario render the
    // English target alongside the Italian translation as the answer. When the
    // Italian gloss CONTAINS the English prompt the answer is given for free —
    // an equality test missed every "Funzione di callback" for prompt
    // "Callback". Pool items already had their redundant "(Term)" parenthetical
    // stripped, so what survives this filter is a genuine leak (2.6% of the
    // corpus) rather than a formatting convention.
    const isDistinctTranslation = (item) =>
      Boolean(item.english) &&
      Boolean(item.italian) &&
      !containsWholeWord(item.italian, item.english);

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
      // The prompt is the example sentence with the term blanked out. If the
      // term is not in the sentence as a whole word, blanking silently does
      // nothing (15.0% of eligible items) or eats half a word, leaving the
      // suffix as a giveaway (4.1%). Require a blankable occurrence.
      pool = pool.filter(
        (item) =>
          item.example &&
          isDistinctTranslation(item) &&
          containsWholeWord((item.example || '').split(' = ')[0] || '', item.english)
      );
    } else if (mode === 'writing') {
      // Typing is the only mode where the Italian side must be reproduced
      // character by character, so long glosses are excluded here and here
      // only — they remain available in every recognition mode.
      pool = pool.filter((item) => isDistinctTranslation(item) && isTypeableAnswer(item));
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
   * Build the option set for a multiple-choice question.
   *
   * The previous implementation grouped candidates by context, then by
   * difficulty, then fell back to the whole pool — but both of those fields
   * hold a single constant value within a level for 313 of the corpus's 371
   * levels, so all three phases collapsed into "any other item in this level,
   * within a string-length band". Distractors were therefore never chosen for
   * meaning or spelling, which is what made the correct answer stand out.
   *
   * Now the length band is only a plausibility floor (it stops a 3-character
   * option sitting next to a 40-character one, which is its own giveaway) and
   * the ranking is delegated to the ability-calibrated engine.
   */
  generateOptions(correct) {
    const field =
      this.currentMode === 'codeoutput' || this.currentMode === 'scenario' ? 'english' : 'italian';
    const currentQ = this.questions[this.currentQuestionIndex] || {};
    const correctLen = correct.length;
    const minLen = Math.max(1, Math.floor(correctLen * 0.4));
    const maxLen = Math.ceil(correctLen * 2.5);

    // De-duplicate by displayed text: two identically-worded options, one of
    // them flagged wrong, is unanswerable.
    const seen = new Set([correct]);
    const candidates = [];
    const relaxed = [];
    for (const item of this.fullPool) {
      const value = item[field];
      if (!value || seen.has(value)) continue;
      seen.add(value);
      if (value.length >= minLen && value.length <= maxLen) candidates.push(item);
      else relaxed.push(item);
    }

    // Thin levels may not have 3 same-length candidates; widening beats
    // padding the grid with filler.
    const pool = candidates.length >= 3 ? candidates : [...candidates, ...relaxed];

    const distractors = adaptiveDifficultyService
      .selectDistractors(currentQ, pool, 3, this._studentAbility(), {
        field,
        contextField: this.contextField,
      })
      .map((item) => item[field])
      .filter(Boolean);

    return shuffleArray([correct, ...distractors.slice(0, 3)]);
  }

  /**
   * Generate context sub-category options from the context index.
   * Never pads: an option reading "Other 1" is not a distractor, it is a tell.
   * Levels too thin to offer real alternatives do not offer the mode at all.
   */
  generateContextOptions(correctContext) {
    const others = shuffleArray(
      Array.from(this.contextIndex.keys()).filter((c) => c !== correctContext)
    ).slice(0, 3);

    return shuffleArray([correctContext, ...others]);
  }

  /**
   * Scenario options are English terms; `generateOptions` already selects on
   * the English field for this mode, so it is the same construction.
   */
  generateScenarioOptions(correct) {
    return this.generateOptions(correct);
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
    this._lastUserAnswer = selected;
    this.handleResult(selected === correct, correct);
  }

  /**
   * Reveal the next hint for the current question (§29).
   *
   * HintService has implemented this ladder — three progressively more
   * revealing hints per mode, plus the XP cost curve — since v2.0.0 with no
   * caller. Meanwhile several modes printed an unconditional "Vocab: X" line
   * that was sometimes the answer itself. This is the intended mechanism: the
   * learner asks, and pays for it.
   */
  showHint() {
    const question = this.questions[this.currentQuestionIndex];
    if (!question) return;

    const hints = hintService.generateHints(question, this.currentMode) || [];
    const level = this.hintLevel || 0;
    if (level >= Math.min(3, hints.length)) return;

    const text = hints[level];
    this.hintLevel = level + 1;

    const list = document.getElementById('practice-hint-list');
    if (list && text) {
      const line = document.createElement('p');
      line.className = 'practice-hint';
      // textContent, not innerHTML: hint strings are built from item data.
      line.textContent = text;
      list.appendChild(line);
    }
    this._updateHintButton(hints.length);
  }

  _updateHintButton(hintCount) {
    const btn = document.querySelector('.practice-hint-btn');
    if (!btn) return;
    const max = Math.min(3, hintCount);
    const used = this.hintLevel || 0;
    if (used >= max) {
      btn.disabled = true;
      btn.textContent = 'Nessun altro aiuto / No more hints';
      return;
    }
    const remainingXp = Math.round(hintService.getXPMultiplier(used) * 100);
    btn.textContent = `\u{1F4A1} Aiuto / Hint ${used + 1}/${max} (XP ${remainingXp}%)`;
  }

  /**
   * Check writing answer with accent tolerance + near-miss forgiveness.
   */
  checkWritingAnswer(correct) {
    const input = document.getElementById('topic-writing-input');
    if (!input) return;

    const userValue = input.value;
    this._lastUserAnswer = userValue;
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

Object.assign(
  TopicPracticeManager.prototype,
  advancedModesMixin,
  extraModesMixin,
  renderingMixin,
  resultHandlerMixin,
  matchModeMixin,
  outputModesMixin,
  labModeMixin
);
