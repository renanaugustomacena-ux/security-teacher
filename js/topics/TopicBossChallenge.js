/**
 * TOPIC BOSS CHALLENGE - FlowLearn
 * =================================
 *
 * Boss challenge mode for topic levels.
 * 15 mixed-format questions from all lessons in a level,
 * 5-minute countdown timer, harder distractors from adjacent levels.
 *
 * Reuses rendering and answer-checking patterns from TopicPracticeManager.
 */

import { ttsService } from '../services/TTSService.js';

const BOSS_TOTAL_QUESTIONS = 15;
const BOSS_TIME_LIMIT = 300; // 5 minutes in seconds

const ENCOURAGING_CORRECT = [
  'Perfetto! / Perfect!',
  'Ottimo! / Great!',
  'Bravo/Brava!',
  'Esatto! / Exactly!',
  'Fantastico! / Fantastic!',
  'Ci sei! / You got it!',
];

const ENCOURAGING_INCORRECT = [
  'Quasi! / Almost!',
  'Ci sei vicino! / So close!',
  'Riprova! / Try again!',
  'Non mollare! / Keep going!',
  'Stai imparando! / You are learning!',
];

// Question types available for the boss challenge
const QUESTION_TYPES = ['listening', 'writing', 'matching', 'fillblank', 'context'];

// Common Linux command aliases (for command checking)
const COMMAND_ALIASES = {
  'ls -la': ['ls -al', 'ls -l -a', 'ls -a -l'],
  'ls -al': ['ls -la', 'ls -l -a', 'ls -a -l'],
  'ls -l': ['ll'],
  'cd ~': ['cd'],
  'rm -rf': ['rm -fr'],
  'rm -fr': ['rm -rf'],
  'ps aux': ['ps -aux'],
  'ps -aux': ['ps aux'],
  'grep -r': ['grep -R', 'grep --recursive'],
  'grep -R': ['grep -r', 'grep --recursive'],
  'chmod -R': ['chmod --recursive'],
  'chown -R': ['chown --recursive'],
  'mkdir -p': ['mkdir --parents'],
  'cp -r': ['cp -R', 'cp --recursive'],
  'cp -R': ['cp -r', 'cp --recursive'],
};

// Function words to skip in fill-in-the-blank
const ENGLISH_FUNCTION_WORDS = new Set([
  'the',
  'a',
  'an',
  'is',
  'am',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'to',
  'of',
  'in',
  'on',
  'at',
  'for',
  'with',
  'by',
  'from',
  'and',
  'or',
  'but',
  'not',
  'it',
  'its',
  'he',
  'she',
  'we',
  'they',
  'i',
  'you',
  'my',
  'your',
  'his',
  'her',
  'our',
  'their',
  'this',
  'that',
  'these',
  'those',
  'do',
  'does',
  'did',
  'has',
  'have',
  'had',
  'will',
  'would',
  'can',
  'could',
  'should',
]);

const ITALIAN_FUNCTION_WORDS = new Set([
  'il',
  'lo',
  'la',
  'i',
  'gli',
  'le',
  'un',
  'uno',
  'una',
  'di',
  'a',
  'da',
  'in',
  'con',
  'su',
  'per',
  'tra',
  'fra',
  'e',
  'o',
  'ma',
  'che',
  'se',
  'non',
]);

export class TopicBossChallenge {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.topicId = null;
    this.levelNum = null;
    this.levelData = null;
    this.topicData = null;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.correctCount = 0;
    this.totalQuestions = BOSS_TOTAL_QUESTIONS;
    this.startTime = null;
    this.timeRemaining = BOSS_TIME_LIMIT;
    this.timerInterval = null;
    this.currentStreak = 0;
    this.pool = [];
    this.adjacentPool = [];
    this.contextIndex = new Map();
  }

  init() {
    // Reserved for future initialization
  }

  // ─── DATA LOADING ──────────────────────────────

  async loadTopicData(topicId) {
    if (window.topicManager && window.topicManager.dataCache[topicId]) {
      return window.topicManager.dataCache[topicId];
    }
    try {
      const module = await import(`./data/${topicId}.js`);
      return module.default;
    } catch (err) {
      console.error('Failed to load topic data for boss challenge:', err);
      return null;
    }
  }

  // ─── START ─────────────────────────────────────

  async start(topicId, levelNum) {
    this.topicId = topicId;
    this.levelNum = levelNum;
    this.currentQuestionIndex = 0;
    this.correctCount = 0;
    this.currentStreak = 0;
    this.timeRemaining = BOSS_TIME_LIMIT;
    this.startTime = null;

    const data = await this.loadTopicData(topicId);
    if (!data || !data.levels[levelNum]) {
      console.error('Boss challenge: invalid topic/level');
      return;
    }

    this.topicData = data;
    this.levelData = data.levels[levelNum];

    // Collect all items from the specified level (all lessons)
    this.pool = [];
    this.levelData.lessons.forEach((lesson) => {
      this.pool = this.pool.concat(lesson.items);
    });

    // Collect adjacent level items for harder distractors
    this.adjacentPool = [];
    const adjacentLevels = [levelNum - 1, levelNum + 1];
    for (const adjLvl of adjacentLevels) {
      if (data.levels[adjLvl]) {
        data.levels[adjLvl].lessons.forEach((lesson) => {
          this.adjacentPool = this.adjacentPool.concat(lesson.items);
        });
      }
    }

    // Build context index
    this.contextIndex = new Map();
    for (const item of [...this.pool, ...this.adjacentPool]) {
      const ctx = item.context || 'general';
      if (!this.contextIndex.has(ctx)) this.contextIndex.set(ctx, []);
      this.contextIndex.get(ctx).push(item);
    }

    // Show pre-challenge screen
    this.showPreScreen();
  }

  // ─── PRE-CHALLENGE SCREEN ─────────────────────

  showPreScreen() {
    const container = this.getContainer();
    if (!container) return;

    // Show the practice view
    if (window.topicManager) {
      window.topicManager.showView('practice');
    }

    const levelName = this.levelData.name || `Level ${this.levelNum}`;

    container.innerHTML = `
      <div class="boss-prescreen">
        <div class="boss-prescreen-title">Boss Challenge - Level ${this.levelNum}: ${this.escapeHtml(levelName)}</div>
        <div class="boss-prescreen-meta">
          <div class="boss-prescreen-meta-item">15 questions</div>
          <div class="boss-prescreen-meta-item">5 minutes</div>
          <div class="boss-prescreen-meta-item">Mixed formats</div>
        </div>
        <div class="boss-prescreen-threshold">Score &#8805;70% to defeat the boss!</div>
        <button class="boss-start-btn" id="boss-start-btn">Start / Inizia</button>
      </div>
    `;

    container.querySelector('#boss-start-btn')?.addEventListener('click', () => {
      this.beginChallenge();
    });
  }

  // ─── BEGIN CHALLENGE ──────────────────────────

  beginChallenge() {
    this.generateQuestions();
    this.startTime = Date.now();
    this.timeRemaining = BOSS_TIME_LIMIT;
    this.startTimer();
    this.renderQuestion();
  }

  // ─── QUESTION GENERATION ─────────────────────

  generateQuestions() {
    const items = this.shuffleArray([...this.pool]);
    this.questions = [];

    const hasCommand = items.some((item) => item.command);

    for (let i = 0; i < BOSS_TOTAL_QUESTIONS && i < items.length; i++) {
      const item = items[i % items.length];
      const type = this.pickQuestionType(item, hasCommand);
      this.questions.push({ ...item, _bossType: type, _index: i });
    }

    // If we don't have enough items, cycle through them
    if (items.length < BOSS_TOTAL_QUESTIONS) {
      const remaining = BOSS_TOTAL_QUESTIONS - items.length;
      for (let i = 0; i < remaining; i++) {
        const item = items[i % items.length];
        const type = this.pickQuestionType(item, hasCommand);
        this.questions.push({ ...item, _bossType: type, _index: items.length + i });
      }
    }

    this.questions = this.questions.slice(0, BOSS_TOTAL_QUESTIONS);
  }

  pickQuestionType(item, hasCommand) {
    const available = [...QUESTION_TYPES];

    // Add 'command' type if item has command field
    if (item.command && hasCommand) {
      available.push('command');
    }

    // Filter based on item data availability
    const valid = available.filter((type) => {
      switch (type) {
        case 'listening':
        case 'writing':
        case 'matching':
        case 'context':
          return item.english && item.italian;
        case 'fillblank':
          return item.example;
        case 'command':
          return item.command;
        default:
          return true;
      }
    });

    if (valid.length === 0) return 'listening';
    return valid[Math.floor(Math.random() * valid.length)];
  }

  // ─── TIMER ────────────────────────────────────

  startTimer() {
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.updateTimerDisplay();

      if (this.timeRemaining <= 0) {
        this.clearTimer();
        this.endChallenge();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay() {
    const timerEl = document.getElementById('boss-timer-display');
    if (!timerEl) return;

    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Update timer styling
    const timerContainer = document.getElementById('boss-timer');
    if (timerContainer) {
      timerContainer.classList.remove('warning', 'critical');
      if (this.timeRemaining < 30) {
        timerContainer.classList.add('critical');
      } else if (this.timeRemaining < 60) {
        timerContainer.classList.add('warning');
      }
    }
  }

  // ─── RENDERING ────────────────────────────────

  getContainer() {
    return (
      document.getElementById('topic-practice-content') ||
      document.getElementById('topic-lesson-content')
    );
  }

  renderQuestion() {
    const container = this.getContainer();
    if (!container) return;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.endChallenge();
      return;
    }

    const q = this.questions[this.currentQuestionIndex];
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    const timerStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    let timerClass = '';
    if (this.timeRemaining < 30) timerClass = 'critical';
    else if (this.timeRemaining < 60) timerClass = 'warning';

    const questionHtml = this.renderQuestionByType(q);

    container.innerHTML = `
      <div class="boss-challenge">
        <div class="boss-header">
          <div class="boss-timer ${timerClass}" id="boss-timer">
            <span class="boss-timer-icon">&#9201;</span>
            <span class="boss-timer-display" id="boss-timer-display">${timerStr}</span>
          </div>
          <div class="boss-progress">
            <span class="boss-progress-text">${this.currentQuestionIndex + 1}/${this.totalQuestions}</span>
            <div class="boss-progress-bar">
              <div class="boss-progress-fill" style="width: ${((this.currentQuestionIndex + 1) / this.totalQuestions) * 100}%"></div>
            </div>
          </div>
          <div class="boss-streak">
            ${this.currentStreak > 0 ? `Streak: ${this.currentStreak}` : ''}
          </div>
        </div>
        <div class="boss-question">
          ${questionHtml}
        </div>
      </div>
    `;

    ttsService.attachTTSListeners(container);

    // Auto-play TTS for listening mode
    if (q._bossType === 'listening' && ttsService.isSupported && q.english) {
      ttsService.speak(q.english);
    }

    // Focus input and bind Enter key
    const input = container.querySelector('#boss-writing-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const submitBtn = container.querySelector('.boss-submit-btn');
          if (submitBtn) submitBtn.click();
        }
      });
    }
  }

  renderQuestionByType(q) {
    switch (q._bossType) {
      case 'listening':
      case 'matching': {
        const options = this.generateOptions(q.italian, q);
        const ttsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(q.english) : '';
        return `
          <div class="exercise-card">
            <div class="exercise-instruction">
              ${q._bossType === 'listening' ? 'Ascolta e scegli:' : 'Qual \u00E8 la traduzione di:'}
            </div>
            <div class="exercise-target">${this.escapeHtml(q.english)} ${ttsBtn}</div>
            ${q.pronunciation ? `<div class="exercise-pronunciation">${this.escapeHtml(q.pronunciation)}</div>` : ''}
            <div class="options-grid">
              ${options
                .map(
                  (opt) => `
                <button class="btn btn-secondary option-btn"
                  onclick="topicBossChallenge.checkOptionAnswer('${this.escapeAttr(opt)}', '${this.escapeAttr(q.italian)}')">
                  ${this.escapeHtml(opt)}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `;
      }

      case 'writing': {
        const writingTtsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(q.english) : '';
        return `
          <div class="exercise-card">
            <div class="exercise-instruction">Scrivi la traduzione in italiano:</div>
            <div class="exercise-target">${this.escapeHtml(q.english)} ${writingTtsBtn}</div>
            ${q.pronunciation ? `<div class="exercise-pronunciation">${this.escapeHtml(q.pronunciation)}</div>` : ''}
            <input type="text" id="boss-writing-input" class="practice-input" placeholder="Scrivi qui..." autofocus>
            <button class="btn btn-primary boss-submit-btn" style="margin-top: 1rem;"
              onclick="topicBossChallenge.checkWritingAnswer('${this.escapeAttr(q.italian)}')">
              Invia / Submit
            </button>
          </div>
        `;
      }

      case 'fillblank': {
        const sentence = q.example || '';
        const parts = sentence.split(' = ');
        const targetPhrase = parts[0];
        const words = targetPhrase.split(' ');
        const missingIdx = this.pickBestBlankIndex(words, q.english);
        const missingWord = words[missingIdx]?.trim() || '';
        const displaySentence = words.map((w, i) => (i === missingIdx ? '_____' : w)).join(' ');

        return `
          <div class="exercise-card">
            <div class="exercise-instruction">Completa la frase:</div>
            <div class="exercise-target">${this.escapeHtml(displaySentence)}</div>
            <p class="translation-hint">Traduzione: ${this.escapeHtml(parts[1] || '')}</p>
            <input type="text" id="boss-writing-input" class="practice-input" placeholder="Parola mancante..." autofocus>
            <button class="btn btn-primary boss-submit-btn" style="margin-top: 1rem;"
              onclick="topicBossChallenge.checkWritingAnswer('${this.escapeAttr(missingWord)}')">
              Invia / Submit
            </button>
          </div>
        `;
      }

      case 'context': {
        const correctContext = q.context || 'general';
        const contextOptions = this.generateContextOptions(correctContext);
        const contextTtsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(q.english) : '';

        return `
          <div class="exercise-card">
            <div class="exercise-instruction">In quale contesto si usa questo termine?</div>
            <div class="exercise-target">${this.escapeHtml(q.english)} ${contextTtsBtn}</div>
            ${q.pronunciation ? `<div class="exercise-pronunciation">${this.escapeHtml(q.pronunciation)}</div>` : ''}
            <div class="options-grid">
              ${contextOptions
                .map(
                  (ctx) => `
                <button class="btn btn-secondary option-btn"
                  onclick="topicBossChallenge.checkOptionAnswer('${this.escapeAttr(ctx)}', '${this.escapeAttr(correctContext)}')">
                  ${this.escapeHtml(this.formatContextLabel(ctx))}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `;
      }

      case 'command': {
        return `
          <div class="exercise-card">
            <div class="exercise-instruction">Scrivi il comando per:</div>
            <div class="exercise-target">${this.escapeHtml(q.italian)}</div>
            <p class="translation-hint">${this.escapeHtml(q.english)}</p>
            <input type="text" id="boss-writing-input" class="practice-input practice-input-mono" placeholder="$ " autofocus>
            <button class="btn btn-primary boss-submit-btn" style="margin-top: 1rem;"
              onclick="topicBossChallenge.checkCommandAnswer('${this.escapeAttr(q.command)}')">
              Invia / Submit
            </button>
          </div>
        `;
      }

      default:
        return '<p>Domanda non disponibile</p>';
    }
  }

  // ─── OPTION GENERATION (with adjacent level distractors) ─────

  generateOptions(correct, currentQ) {
    const field = 'italian';
    const correctLen = correct.length;
    const minLen = Math.max(1, Math.floor(correctLen * 0.4));
    const maxLen = Math.ceil(correctLen * 2.5);

    const isPlausible = (val) => {
      if (!val || val === correct) return false;
      return val.length >= minLen && val.length <= maxLen;
    };

    const distractors = new Set();

    // Phase 1: Adjacent level items (harder distractors)
    const adjacentFiltered = this.adjacentPool.filter((it) => isPlausible(it[field]));
    const shuffledAdj = this.shuffleArray(adjacentFiltered);
    for (const item of shuffledAdj) {
      if (distractors.size >= 2) break;
      distractors.add(item[field]);
    }

    // Phase 2: Same context items from current level
    const currentCtx = currentQ.context || 'general';
    const sameCtxItems = (this.contextIndex.get(currentCtx) || []).filter((it) =>
      isPlausible(it[field])
    );
    const shuffledCtx = this.shuffleArray(sameCtxItems);
    for (const item of shuffledCtx) {
      if (distractors.size >= 3) break;
      distractors.add(item[field]);
    }

    // Phase 3: Full pool fallback
    if (distractors.size < 3) {
      const remaining = [...this.pool, ...this.adjacentPool].filter((it) => isPlausible(it[field]));
      const shuffledAll = this.shuffleArray(remaining);
      for (const item of shuffledAll) {
        if (distractors.size >= 3) break;
        if (!distractors.has(item[field])) distractors.add(item[field]);
      }
    }

    return this.shuffleArray([correct, ...Array.from(distractors).slice(0, 3)]);
  }

  generateContextOptions(correctContext) {
    const allContexts = Array.from(this.contextIndex.keys());
    const options = [correctContext];

    const others = this.shuffleArray(allContexts.filter((c) => c !== correctContext));
    for (let i = 0; i < 3 && i < others.length; i++) {
      options.push(others[i]);
    }

    while (options.length < 4) {
      options.push(`other-${options.length}`);
    }

    return this.shuffleArray(options);
  }

  // ─── ANSWER CHECKING ─────────────────────────

  checkOptionAnswer(selected, correct) {
    this.handleResult(selected === correct, correct);
  }

  checkWritingAnswer(correct) {
    const input = document.getElementById('boss-writing-input');
    if (!input) return;

    const userValue = input.value;
    const exactMatch = this.normalize(userValue) === this.normalize(correct);

    if (exactMatch) {
      this.handleResult(true, correct);
      return;
    }

    const accentMatch = this.normalizeWithAccents(userValue) === this.normalizeWithAccents(correct);
    if (accentMatch) {
      this.handleResult(true, correct);
      return;
    }

    this.handleResult(false, correct);
  }

  checkCommandAnswer(correct) {
    const input = document.getElementById('boss-writing-input');
    if (!input) return;

    const normalizeCmd = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const sortFlags = (cmd) => {
      return cmd.replace(/-([a-zA-Z]+)/g, (match, flags) => {
        return '-' + flags.split('').sort().join('');
      });
    };

    const userInput = normalizeCmd(input.value);
    const expected = normalizeCmd(correct);

    if (userInput === expected || sortFlags(userInput) === sortFlags(expected)) {
      this.handleResult(true, correct);
      return;
    }

    // Check aliases
    const aliases = COMMAND_ALIASES[expected] || [];
    for (const alias of aliases) {
      const normAlias = normalizeCmd(alias);
      if (userInput === normAlias || sortFlags(userInput) === sortFlags(normAlias)) {
        this.handleResult(true, correct);
        return;
      }
    }

    this.handleResult(false, correct);
  }

  // ─── RESULT HANDLING ──────────────────────────

  handleResult(isCorrect, correct) {
    if (isCorrect) {
      this.correctCount++;
      this.currentStreak++;
    } else {
      this.currentStreak = 0;
    }

    this.showFeedback(isCorrect, correct);
  }

  showFeedback(isCorrect, correctAnswer) {
    const container = this.getContainer();
    if (!container) return;

    const message = isCorrect
      ? ENCOURAGING_CORRECT[Math.floor(Math.random() * ENCOURAGING_CORRECT.length)]
      : ENCOURAGING_INCORRECT[Math.floor(Math.random() * ENCOURAGING_INCORRECT.length)];

    container.innerHTML = `
      <div class="boss-challenge">
        <div class="boss-header">
          <div class="boss-timer ${this.timeRemaining < 30 ? 'critical' : this.timeRemaining < 60 ? 'warning' : ''}" id="boss-timer">
            <span class="boss-timer-icon">&#9201;</span>
            <span class="boss-timer-display" id="boss-timer-display">${this.formatTime(this.timeRemaining)}</span>
          </div>
          <div class="boss-progress">
            <span class="boss-progress-text">${this.currentQuestionIndex + 1}/${this.totalQuestions}</span>
          </div>
          <div class="boss-streak">
            ${this.currentStreak > 0 ? `Streak: ${this.currentStreak}` : ''}
          </div>
        </div>
        <div class="boss-question">
          <div class="feedback-card ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}">
            <div class="feedback-icon">${isCorrect ? '\u2705' : '\u{1F4A1}'}</div>
            <div class="feedback-message">${message}</div>
            ${!isCorrect ? `<div class="feedback-answer">La risposta era: <strong>${this.escapeHtml(correctAnswer)}</strong></div>` : ''}
            <div class="feedback-progress-bar">
              <div class="feedback-progress-fill"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex >= this.totalQuestions || this.timeRemaining <= 0) {
        this.endChallenge();
      } else {
        this.renderQuestion();
      }
    }, 1500);
  }

  // ─── END CHALLENGE / RESULTS ──────────────────

  endChallenge() {
    this.clearTimer();

    const score = Math.round((this.correctCount / this.totalQuestions) * 100);
    const defeated = score >= 70;
    const stars = score >= 90 ? 3 : score >= 70 ? 2 : score >= 50 ? 1 : 0;
    const timeUsed = BOSS_TIME_LIMIT - this.timeRemaining;
    const timeRemainingDisplay = this.formatTime(Math.max(0, this.timeRemaining));

    // XP calculation: 50 base + (score * 0.5) bonus
    const xpEarned = Math.round(50 + score * 0.5);

    // Record progress
    this.progressManager.completeTopicBoss(this.topicId, this.levelNum, score, stars);
    this.progressManager.addXP(xpEarned);
    this.progressManager.recordPracticeSession(this.correctCount, this.totalQuestions);

    // Star display
    let starsHtml = '';
    for (let i = 0; i < 3; i++) {
      starsHtml += `<span class="boss-star ${i < stars ? 'boss-star-filled' : 'boss-star-empty'}">${i < stars ? '\u2605' : '\u2606'}</span>`;
    }

    const resultClass = defeated ? 'victory' : 'defeat';

    const container = this.getContainer();
    if (!container) return;

    container.innerHTML = `
      <div class="boss-results ${resultClass}">
        <div class="boss-results-title">${defeated ? 'Boss Defeated!' : 'Boss Won...'}</div>
        <div class="boss-results-score">${score}%</div>
        <div class="boss-results-stars">${starsHtml}</div>
        <div class="boss-results-stats">
          <div class="boss-stat">
            <span class="boss-stat-value">${this.correctCount}</span>
            <span class="boss-stat-label">Correct / ${this.totalQuestions}</span>
          </div>
          <div class="boss-stat">
            <span class="boss-stat-value">${timeRemainingDisplay}</span>
            <span class="boss-stat-label">Time Left</span>
          </div>
          <div class="boss-stat">
            <span class="boss-stat-value">${this.currentStreak}</span>
            <span class="boss-stat-label">Best Streak</span>
          </div>
        </div>
        <div class="boss-results-xp">+${xpEarned} XP</div>
        <div class="boss-results-actions">
          <button class="btn btn-secondary" id="boss-retry-btn">Riprova / Retry</button>
          <button class="btn btn-primary" id="boss-back-btn">Torna al Topic / Back to Topic</button>
        </div>
      </div>
    `;

    const topicId = this.topicId;
    const levelNum = this.levelNum;

    container.querySelector('#boss-retry-btn')?.addEventListener('click', () => {
      this.start(topicId, levelNum);
    });

    container.querySelector('#boss-back-btn')?.addEventListener('click', () => {
      if (window.topicManager) {
        window.topicManager.openLevel(topicId, levelNum);
      }
    });
  }

  // ─── UTILITY ──────────────────────────────────

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  escapeAttr(str) {
    if (!str) return '';
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  normalize(str) {
    return str
      .toLowerCase()
      .replace(/[.,?!;:'"()]/g, '')
      .trim();
  }

  normalizeWithAccents(str) {
    return str
      .toLowerCase()
      .replace(/[.,?!;:'"()]/g, '')
      .replace(/[\u00E0\u00E1\u00E2\u00E3]/g, 'a')
      .replace(/[\u00E8\u00E9\u00EA\u00EB]/g, 'e')
      .replace(/[\u00EC\u00ED\u00EE\u00EF]/g, 'i')
      .replace(/[\u00F2\u00F3\u00F4\u00F5]/g, 'o')
      .replace(/[\u00F9\u00FA\u00FB\u00FC]/g, 'u')
      .trim();
  }

  isContentWord(word) {
    const cleaned = word.toLowerCase().replace(/[.,?!;:'"()]/g, '');
    if (cleaned.length <= 1) return false;
    return !ENGLISH_FUNCTION_WORDS.has(cleaned) && !ITALIAN_FUNCTION_WORDS.has(cleaned);
  }

  pickBestBlankIndex(words, targetWord) {
    if (targetWord) {
      const targetLower = targetWord.toLowerCase();
      const targetIdx = words.findIndex(
        (w) => w.toLowerCase().replace(/[.,?!;:'"()]/g, '') === targetLower
      );
      if (targetIdx !== -1) return targetIdx;
    }

    const candidates = words
      .map((w, i) => ({ word: w, index: i }))
      .filter((c) => this.isContentWord(c.word))
      .sort((a, b) => b.word.length - a.word.length);

    if (candidates.length > 0) {
      const topN = candidates.slice(0, Math.min(3, candidates.length));
      return topN[Math.floor(Math.random() * topN.length)].index;
    }

    const nonTrivial = words
      .map((w, i) => ({ word: w, index: i }))
      .filter((c) => c.word.length > 2);

    if (nonTrivial.length > 0) {
      return nonTrivial[Math.floor(Math.random() * nonTrivial.length)].index;
    }

    return Math.floor(Math.random() * words.length);
  }

  formatContextLabel(contextKey) {
    return contextKey.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
}
