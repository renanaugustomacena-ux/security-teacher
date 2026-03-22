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

import { ttsService } from '../services/TTSService.js';

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

// XP Calculation Constants
const XP_BASE = 10;
const TIME_THRESHOLDS = [
  { maxSeconds: 5, multiplier: 2.0 },
  { maxSeconds: 10, multiplier: 1.5 },
  { maxSeconds: 20, multiplier: 1.0 },
];
const TIME_DEFAULT_MULTIPLIER = 0.7;
const STREAK_BONUSES = [
  { minStreak: 10, multiplier: 2.0 },
  { minStreak: 5, multiplier: 1.5 },
  { minStreak: 3, multiplier: 1.2 },
];

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
  'anche',
  'del',
  'dello',
  'della',
  'dei',
  'degli',
  'delle',
  'al',
  'allo',
  'alla',
  'ai',
  'agli',
  'alle',
  'dal',
  'dallo',
  'dalla',
  'dai',
  'dagli',
  'dalle',
  'nel',
  'nello',
  'nella',
  'nei',
  'negli',
  'nelle',
  'sul',
  'sullo',
  'sulla',
  'sui',
  'sugli',
  'sulle',
]);

// Expanded tech scenario templates
const TECH_SCENARIO_TEMPLATES = [
  'Sei in un colloquio tecnico...',
  'Stai presentando un progetto al team...',
  'Sei in una code review con un collega senior...',
  'Stai spiegando un concetto tecnico al team...',
  'Sei a una conferenza tech e fai una domanda...',
  'Stai facendo pair programming con un collega...',
  'Sei in uno standup meeting...',
  'Stai scrivendo documentazione tecnica...',
  'Sei in una retrospettiva del team...',
  'Stai debuggando un problema in produzione...',
  'Sei in una sessione di brainstorming...',
  'Stai onboardando un nuovo collega...',
  'Sei in una demo del prodotto con il cliente...',
  'Stai discutendo i requisiti con il product owner...',
  'Sei in un workshop di architettura...',
];

// Common Linux command aliases
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

// Grammar rules for Tech Talk mode (subset from AIService)
const TECHTALK_GRAMMAR_RULES = [
  {
    pattern: /\bi have (\d+) years?\b/i,
    correction: 'I am $1 years old',
    hint: '"I have X years" is Italian. In English, say "I am X years old".',
  },
  {
    pattern: /\bi am agree\b/i,
    correction: 'I agree',
    hint: 'Don\'t use "am" with "agree". Just say "I agree".',
  },
  {
    pattern: /\bhe go\b/i,
    correction: 'he goes',
    hint: 'Third person singular needs -s/-es: "he goes".',
  },
  {
    pattern: /\bshe go\b/i,
    correction: 'she goes',
    hint: 'Third person singular needs -s/-es: "she goes".',
  },
  {
    pattern: /\bhe have\b/i,
    correction: 'he has',
    hint: 'Third person singular: "he has", not "he have".',
  },
  {
    pattern: /\bshe have\b/i,
    correction: 'she has',
    hint: 'Third person singular: "she has", not "she have".',
  },
  {
    pattern: /\bmore better\b/i,
    correction: 'better',
    hint: '"Better" is already comparative. Don\'t add "more".',
  },
  {
    pattern: /\bthe people is\b/i,
    correction: 'people are',
    hint: '"People" is plural: "people are", not "people is".',
  },
  {
    pattern: /\bdepend from\b/i,
    correction: 'depend on',
    hint: 'In English: "depend on", not "depend from".',
  },
  {
    pattern: /\binterested to\b/i,
    correction: 'interested in',
    hint: 'In English: "interested in", not "interested to".',
  },
  {
    pattern: /\bexplain me\b/i,
    correction: 'explain to me',
    hint: 'In English: "explain to me", not "explain me".',
  },
];

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
        pool = pool.concat(lesson.items);
      });
    } else {
      const stats = this.progressManager.getTopicStats(topicId);
      const unlockedLevels = stats ? stats.unlockedLevels : [0];

      unlockedLevels.forEach((lvl) => {
        if (data.levels[lvl]) {
          data.levels[lvl].lessons.forEach((lesson) => {
            pool = pool.concat(lesson.items);
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

    if (mode === 'fillblank' || mode === 'sentence') {
      pool = pool.filter((item) => item.example);
    } else if (mode === 'command') {
      pool = pool.filter((item) => item.command);
    } else if (mode === 'codeoutput') {
      pool = pool.filter((item) => item.code);
    } else if (mode === 'codechallenge') {
      pool = pool.filter((item) => item.command || item.code);
    } else if (mode === 'comprehension') {
      pool = pool.filter((item) => item.example);
    } else if (mode === 'scenario') {
      pool = pool.filter((item) => item.example && item.english && item.italian);
    } else {
      pool = pool.filter((item) => item.english && item.italian);
    }

    this.questions = this.shuffleArray(pool).slice(0, 10);
  }

  // ─── TERMINAL SIMULATOR QUESTION GENERATION ───

  generateTerminalQuestions(pool) {
    const commandItems = pool.filter((item) => item.command);
    if (commandItems.length === 0) return [];

    // Group by context
    const groups = new Map();
    for (const item of commandItems) {
      const ctx = item.context || 'general';
      if (!groups.has(ctx)) groups.set(ctx, []);
      groups.get(ctx).push(item);
    }

    const questions = [];
    const contexts = Array.from(groups.keys());
    const shuffledContexts = this.shuffleArray(contexts);

    for (const ctx of shuffledContexts) {
      if (questions.length >= 5) break;
      const items = this.shuffleArray(groups.get(ctx));
      const chainSize = Math.min(items.length, Math.floor(Math.random() * 2) + 2); // 2-3 items
      const steps = items.slice(0, chainSize).map((item) => ({
        description: item.italian || item.english,
        descriptionEn: item.english || '',
        expectedCommand: item.command,
        item,
      }));
      questions.push({
        type: 'terminal',
        context: ctx,
        steps,
        currentStep: 0,
        completedOutputs: [],
      });
    }

    // If not enough contexts, create more chains from leftover items
    if (questions.length < 3) {
      const remaining = this.shuffleArray(commandItems);
      for (let i = 0; i < remaining.length && questions.length < 5; i += 2) {
        const steps = remaining.slice(i, i + 2).map((item) => ({
          description: item.italian || item.english,
          descriptionEn: item.english || '',
          expectedCommand: item.command,
          item,
        }));
        if (steps.length > 0) {
          questions.push({
            type: 'terminal',
            context: remaining[i].context || 'general',
            steps,
            currentStep: 0,
            completedOutputs: [],
          });
        }
      }
    }

    return questions.slice(0, 5);
  }

  // ─── CODE LAB QUESTION GENERATION ─────────────

  generateCodelabQuestions(pool) {
    const codeItems = pool.filter(
      (item) => item.code && (item.code.includes('\n') || item.code.length > 30)
    );
    if (codeItems.length === 0) return [];

    const questions = [];
    const shuffled = this.shuffleArray(codeItems);

    for (const item of shuffled) {
      if (questions.length >= 8) break;
      const lines = item.code.split('\n').filter((l) => l.trim().length > 0);
      if (lines.length < 2) continue;

      // Pick a meaningful line to blank out (not a comment, not empty)
      const candidates = lines
        .map((line, idx) => ({ line, idx }))
        .filter(
          (c) =>
            !c.line.trim().startsWith('#') &&
            !c.line.trim().startsWith('//') &&
            c.line.trim().length > 3
        );

      if (candidates.length === 0) continue;
      const chosen = candidates[Math.floor(Math.random() * candidates.length)];

      questions.push({
        type: 'codelab',
        fullCode: item.code,
        lines,
        blankedLine: chosen.line,
        blankIndex: chosen.idx,
        item,
        hint: item.note || '',
      });
    }

    return questions;
  }

  // ─── TECH TALK QUESTION GENERATION ────────────

  generateTechTalkQuestions(pool) {
    // Check for handcrafted scenarios
    const scenarios = window.techTalkScenarios || [];
    const topicScenarios = scenarios.filter((s) => !s.topicId || s.topicId === this.currentTopicId);

    if (topicScenarios.length > 0) {
      const shuffled = this.shuffleArray(topicScenarios);
      return shuffled.slice(0, 3).map((scenario) => ({
        type: 'techtalk',
        scenario,
        currentTurn: 0,
        messages: [],
        corrections: [],
        keywordsUsed: [],
        totalTurns: scenario.turns ? scenario.turns.length : 3,
      }));
    }

    // Fallback: generate simple keyword Q&A from pool items
    const validItems = pool.filter((item) => item.english && item.italian);
    if (validItems.length === 0) return [];

    // Group by context and pick 5 items from same context
    const groups = new Map();
    for (const item of validItems) {
      const ctx = item.context || 'general';
      if (!groups.has(ctx)) groups.set(ctx, []);
      groups.get(ctx).push(item);
    }

    const questions = [];
    const contexts = this.shuffleArray(Array.from(groups.keys()));

    for (const ctx of contexts) {
      if (questions.length >= 3) break;
      const items = this.shuffleArray(groups.get(ctx)).slice(0, 5);
      if (items.length < 3) continue;

      // Build a fallback conversation from items
      const turns = items.map((item) => ({
        aiMessage: `What is the English term for "${item.italian}"? / Qual e' il termine inglese per "${item.italian}"?`,
        expectedKeywords: [item.english.toLowerCase()],
        hintText: item.note || item.example || '',
        item,
      }));

      questions.push({
        type: 'techtalk',
        scenario: {
          name: `${this.formatContextLabel(ctx)} Vocabulary`,
          turns,
          isFallback: true,
        },
        currentTurn: 0,
        messages: [],
        corrections: [],
        keywordsUsed: [],
        totalTurns: turns.length,
      });
    }

    return questions.length > 0 ? questions : [];
  }

  // ─── CHAIN CHALLENGE QUESTION GENERATION ──────

  generateChainQuestions(pool) {
    // Group by context
    const groups = new Map();
    for (const item of pool) {
      if (!item.english || !item.italian) continue;
      const ctx = item.context || 'general';
      if (!groups.has(ctx)) groups.set(ctx, []);
      groups.get(ctx).push(item);
    }

    // Pick a context with >= 5 items
    const validContexts = Array.from(groups.entries()).filter(([, items]) => items.length >= 5);
    if (validContexts.length === 0) {
      // Fallback: use entire pool
      const shuffled = this.shuffleArray(pool.filter((i) => i.english && i.italian)).slice(0, 5);
      if (shuffled.length < 5) return [];
      return [this.buildChainQuestion(shuffled)];
    }

    const questions = [];
    const shuffledContexts = this.shuffleArray(validContexts);

    for (const [ctx, items] of shuffledContexts) {
      if (questions.length >= 3) break;
      const selected = this.shuffleArray(items).slice(0, 5);
      if (selected.length < 5) continue;
      questions.push(this.buildChainQuestion(selected));
    }

    return questions;
  }

  buildChainQuestion(items) {
    const questionTypes = [
      'multiple-choice',
      'typing',
      'multiple-choice',
      'typing',
      'multiple-choice',
    ];
    const links = items.map((item, idx) => {
      // If item has command field, potentially use command type
      let qType = questionTypes[idx];
      if (item.command && idx === 3) {
        qType = 'command';
      }
      return {
        item,
        questionType: qType,
        completed: false,
        correct: false,
      };
    });

    return {
      type: 'chain',
      links,
      currentLink: 0,
      chainStreak: 0,
      chainXP: 0,
    };
  }

  // ─── UTILITY ───────────────────────────────────

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

  /**
   * Format a context key into a human-readable label.
   */
  formatContextLabel(contextKey) {
    return contextKey.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  // ─── RENDERING ─────────────────────────────────

  showPracticeUI() {
    const container = document.getElementById('topic-practice-container');
    if (!container) return;

    if (window.topicManager) {
      window.topicManager.showView('practice');
    }
  }

  renderQuestion() {
    const container = document.getElementById('topic-practice-content');
    if (!container || this.questions.length === 0) return;

    const q = this.questions[this.currentQuestionIndex];
    document.getElementById('topic-practice-progress').textContent =
      `${this.currentQuestionIndex + 1}/${this.questions.length}`;

    let html = '';

    switch (this.currentMode) {
      case 'listening':
      case 'matching': {
        const options = this.generateOptions(q.italian);
        const ttsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(q.english) : '';
        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">
              ${this.currentMode === 'listening' ? 'Ascolta e scegli:' : 'Qual \u00E8 la traduzione di:'}
            </div>
            <div class="exercise-target">${this.escapeHtml(q.english)} ${ttsBtn}</div>
            ${q.pronunciation ? `<div class="exercise-pronunciation">${this.escapeHtml(q.pronunciation)}</div>` : ''}
            <div class="options-grid">
              ${options
                .map(
                  (opt) => `
                <button class="btn btn-secondary option-btn"
                  onclick="topicPracticeManager.checkAnswer(this, '${this.escapeAttr(opt)}', '${this.escapeAttr(q.italian)}')">
                  ${this.escapeHtml(opt)}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `;
        break;
      }

      case 'writing': {
        const writingTtsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(q.english) : '';
        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Scrivi la traduzione in italiano:</div>
            <div class="exercise-target">${this.escapeHtml(q.english)} ${writingTtsBtn}</div>
            ${q.pronunciation ? `<div class="exercise-pronunciation">${this.escapeHtml(q.pronunciation)}</div>` : ''}
            <input type="text" id="topic-writing-input" class="practice-input" placeholder="Scrivi qui..." autofocus>
            <button class="btn btn-primary" style="margin-top: 1rem;"
              onclick="topicPracticeManager.checkWritingAnswer('${this.escapeAttr(q.italian)}')">
              Invia / Submit
            </button>
          </div>
        `;
        break;
      }

      case 'fillblank': {
        const sentence = q.example;
        const parts = sentence.split(' = ');
        const targetPhrase = parts[0];
        const words = targetPhrase.split(' ');
        const missingIdx = this.pickBestBlankIndex(words, q.english);
        const missingWord = words[missingIdx].trim();
        const displaySentence = words.map((w, i) => (i === missingIdx ? '_____' : w)).join(' ');

        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Completa la frase:</div>
            <div class="exercise-target">${this.escapeHtml(displaySentence)}</div>
            <p class="translation-hint">Traduzione: ${this.escapeHtml(parts[1] || '')}</p>
            <input type="text" id="topic-writing-input" class="practice-input" placeholder="Parola mancante..." autofocus>
            <button class="btn btn-primary" style="margin-top: 1rem;"
              onclick="topicPracticeManager.checkWritingAnswer('${this.escapeAttr(missingWord)}')">
              Invia / Submit
            </button>
          </div>
        `;
        break;
      }

      case 'sentence': {
        const sentence = q.example.split(' = ')[0];
        const words = this.shuffleArray(sentence.split(' '));

        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Ricostruisci la frase (Inglese):</div>
            <div class="exercise-target italic">${this.escapeHtml(q.example.split(' = ')[1] || '')}</div>
            <div class="scrambled-words">
              ${words.map((w) => `<span class="word-chip">${this.escapeHtml(w)}</span>`).join(' ')}
            </div>
            <input type="text" id="topic-writing-input" class="practice-input" placeholder="Scrivi la frase completa..." autofocus>
            <button class="btn btn-primary" style="margin-top: 1rem;"
              onclick="topicPracticeManager.checkSentenceAnswer('${this.escapeAttr(sentence)}')">
              Invia / Submit
            </button>
          </div>
        `;
        break;
      }

      case 'command': {
        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Scrivi il comando Linux per:</div>
            <div class="exercise-target">${this.escapeHtml(q.italian)}</div>
            <p class="translation-hint">${this.escapeHtml(q.english)}</p>
            <input type="text" id="topic-writing-input" class="practice-input practice-input-mono" placeholder="$ " autofocus>
            <button class="btn btn-primary" style="margin-top: 1rem;"
              onclick="topicPracticeManager.checkCommandAnswer('${this.escapeAttr(q.command)}')">
              Invia / Submit
            </button>
          </div>
        `;
        break;
      }

      case 'codeoutput': {
        const options = this.generateOptions(q.english);
        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Che concetto dimostra questo codice?</div>
            <div class="tech-code-exercise">
              <pre><code>${this.escapeHtml(q.code)}</code></pre>
            </div>
            <div class="options-grid">
              ${options
                .map(
                  (opt) => `
                <button class="btn btn-secondary option-btn"
                  onclick="topicPracticeManager.checkAnswer(this, '${this.escapeAttr(opt)}', '${this.escapeAttr(q.english)}')">
                  ${this.escapeHtml(opt)}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `;
        break;
      }

      case 'context': {
        const correctContext = q.context || 'general';
        const contextOptions = this.generateContextOptions(correctContext);
        const contextTtsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(q.english) : '';

        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">In quale contesto si usa questo termine?</div>
            <div class="exercise-target">${this.escapeHtml(q.english)} ${contextTtsBtn}</div>
            ${q.pronunciation ? `<div class="exercise-pronunciation">${this.escapeHtml(q.pronunciation)}</div>` : ''}
            <div class="options-grid">
              ${contextOptions
                .map(
                  (ctx) => `
                <button class="btn btn-secondary option-btn"
                  onclick="topicPracticeManager.checkAnswer(this, '${this.escapeAttr(ctx)}', '${this.escapeAttr(correctContext)}')">
                  ${this.escapeHtml(this.formatContextLabel(ctx))}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `;
        break;
      }

      case 'comprehension': {
        const allWithExamples = this.fullPool.filter((item) => item.example);
        const paragraphSentences = this.buildComprehensionParagraph(
          allWithExamples,
          this.currentQuestionIndex
        );
        const paragraph = paragraphSentences.join('. ') + '.';
        const correctStatement = (q.example || '').split(' = ')[0];

        const wrongOptions = this.generateComprehensionDistractors(
          correctStatement,
          paragraphSentences,
          allWithExamples
        );
        const allOptions = this.shuffleArray([correctStatement, ...wrongOptions]);

        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Leggi il paragrafo e scegli l'affermazione corretta:</div>
            <div class="exercise-paragraph">${this.escapeHtml(paragraph)}</div>
            <div class="exercise-comprehension-question">Quale frase appare nel testo?</div>
            <div class="options-grid">
              ${allOptions
                .map(
                  (opt) => `
                <button class="btn btn-secondary option-btn"
                  onclick="topicPracticeManager.checkAnswer(this, '${this.escapeAttr(opt)}', '${this.escapeAttr(correctStatement)}')">
                  ${this.escapeHtml(opt)}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `;
        break;
      }

      case 'scenario': {
        const exampleParts = (q.example || '').split(' = ');
        const englishPhrase = exampleParts[0] || '';
        const italianHint = exampleParts[1] || q.italian;

        const targetWord = q.english;
        const blankedPhrase = englishPhrase.replace(
          new RegExp(targetWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
          '_____'
        );

        const scenario =
          TECH_SCENARIO_TEMPLATES[this.currentQuestionIndex % TECH_SCENARIO_TEMPLATES.length];
        const options = this.generateScenarioOptions(targetWord);
        const scenarioTtsBtn = ttsService.isSupported
          ? ttsService.speakerButtonHTML(englishPhrase)
          : '';

        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Scenario:</div>
            <div class="exercise-scenario">${this.escapeHtml(scenario)}</div>
            <div class="exercise-target">${this.escapeHtml(blankedPhrase)} ${scenarioTtsBtn}</div>
            <p class="translation-hint">${this.escapeHtml(italianHint)}</p>
            <div class="options-grid">
              ${options
                .map(
                  (opt) => `
                <button class="btn btn-secondary option-btn"
                  onclick="topicPracticeManager.checkAnswer(this, '${this.escapeAttr(opt)}', '${this.escapeAttr(targetWord)}')">
                  ${this.escapeHtml(opt)}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        `;
        break;
      }

      case 'codechallenge': {
        const instruction = q.italian || q.english;
        const correctCode = q.command || q.code;
        const note = q.note || '';

        html = `
          <div class="exercise-card">
            <div class="exercise-instruction">Code Challenge:</div>
            <div class="exercise-target">${this.escapeHtml(instruction)}</div>
            ${note ? `<p class="translation-hint">${this.escapeHtml(note)}</p>` : ''}
            <input type="text" id="topic-writing-input" class="practice-input practice-input-mono" placeholder="Scrivi il codice/comando..." autofocus>
            <button class="btn btn-primary" style="margin-top: 1rem;"
              onclick="topicPracticeManager.checkCodeChallenge('${this.escapeAttr(correctCode)}')">
              Invia / Submit
            </button>
          </div>
        `;
        break;
      }

      case 'terminal': {
        this.renderTerminalQuestion(container, q);
        return; // Terminal handles its own rendering
      }

      case 'codelab': {
        this.renderCodelabQuestion(container, q);
        return; // Code Lab handles its own rendering
      }

      case 'techtalk': {
        this.renderTechTalkQuestion(container, q);
        return; // Tech Talk handles its own rendering
      }

      case 'chain': {
        this.renderChainQuestion(container, q);
        return; // Chain handles its own rendering
      }

      default:
        html = '<p>Modalit\u00E0 non disponibile / Mode not available</p>';
    }

    container.innerHTML = html;
    ttsService.attachTTSListeners(container);

    // Auto-play TTS for listening mode
    if (this.currentMode === 'listening' && ttsService.isSupported) {
      const currentQ = this.questions[this.currentQuestionIndex];
      if (currentQ && currentQ.english) {
        ttsService.speak(currentQ.english);
      }
    }

    // Focus input and bind Enter key
    const input = document.getElementById('topic-writing-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const submitBtn = container.querySelector('.btn-primary');
          if (submitBtn) submitBtn.click();
        }
      });
    }
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
    const shuffledCtx = this.shuffleArray(sameCtxItems);
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
      const shuffledDiff = this.shuffleArray(sameDiff);
      for (const item of shuffledDiff) {
        if (distractors.size >= 3) break;
        if (!distractors.has(item[field])) distractors.add(item[field]);
      }
    }

    // Phase 3: Full pool fallback
    if (distractors.size < 3) {
      const remaining = this.fullPool.filter((it) => isPlausible(it[field]));
      const shuffledAll = this.shuffleArray(remaining);
      for (const item of shuffledAll) {
        if (distractors.size >= 3) break;
        if (!distractors.has(item[field])) distractors.add(item[field]);
      }
    }

    return this.shuffleArray([correct, ...Array.from(distractors).slice(0, 3)]);
  }

  /**
   * Generate context sub-category options from the context index
   */
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
    for (const item of this.shuffleArray(sameCtx)) {
      if (distractors.size >= 3) break;
      distractors.add(item.english);
    }

    // Fallback to full pool
    if (distractors.size < 3) {
      const remaining = this.fullPool.filter((it) => isPlausible(it.english));
      for (const item of this.shuffleArray(remaining)) {
        if (distractors.size >= 3) break;
        if (!distractors.has(item.english)) distractors.add(item.english);
      }
    }

    return this.shuffleArray([correct, ...Array.from(distractors).slice(0, 3)]);
  }

  /**
   * Build a comprehension paragraph with 5-7 sentences
   */
  buildComprehensionParagraph(allWithExamples, currentIdx) {
    const sentences = [];
    const used = new Set();
    const targetCount = 6;

    const currentQ = this.questions[currentIdx];
    if (currentQ && currentQ.example) {
      const sent = currentQ.example.split(' = ')[0];
      if (sent) {
        sentences.push(sent);
        used.add((currentQ.english || '').toLowerCase());
      }
    }

    for (let r = 1; sentences.length < targetCount && r < this.questions.length; r++) {
      for (const offset of [-r, r]) {
        const idx = currentIdx + offset;
        if (
          idx >= 0 &&
          idx < this.questions.length &&
          !used.has((this.questions[idx]?.english || '').toLowerCase())
        ) {
          const item = this.questions[idx];
          if (item && item.example) {
            const sent = item.example.split(' = ')[0];
            if (sent && sent.length > 10) {
              sentences.push(sent);
              used.add((item.english || '').toLowerCase());
            }
          }
        }
        if (sentences.length >= targetCount) break;
      }
    }

    if (sentences.length < targetCount) {
      const extras = this.shuffleArray(allWithExamples).filter(
        (item) => !used.has((item.english || '').toLowerCase()) && item.example
      );
      for (const item of extras) {
        if (sentences.length >= targetCount) break;
        const sent = item.example.split(' = ')[0];
        if (sent && sent.length > 10) {
          sentences.push(sent);
          used.add((item.english || '').toLowerCase());
        }
      }
    }

    return sentences;
  }

  /**
   * Generate comprehension distractors from sentences NOT in the paragraph
   */
  generateComprehensionDistractors(correctSentence, paragraphSentences, allWithExamples) {
    const paragraphSet = new Set(paragraphSentences);
    const distractors = [];

    const candidates = allWithExamples
      .map((item) => item.example.split(' = ')[0])
      .filter((s) => s && !paragraphSet.has(s) && s !== correctSentence && s.length > 10);

    const shuffled = this.shuffleArray(candidates);
    for (const s of shuffled) {
      if (distractors.length >= 3) break;
      if (!distractors.includes(s)) distractors.push(s);
    }

    while (distractors.length < 3) {
      distractors.push(`Not in the text ${distractors.length + 1}`);
    }
    return distractors;
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

  calculateXP(responseSeconds) {
    let timeMult = TIME_DEFAULT_MULTIPLIER;
    for (const t of TIME_THRESHOLDS) {
      if (responseSeconds <= t.maxSeconds) {
        timeMult = t.multiplier;
        break;
      }
    }

    let streakMult = 1.0;
    for (const s of STREAK_BONUSES) {
      if (this.consecutiveCorrect >= s.minStreak) {
        streakMult = s.multiplier;
        break;
      }
    }

    return Math.round(XP_BASE * timeMult * streakMult);
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
   * Check writing answer with accent tolerance
   */
  checkWritingAnswer(correct) {
    const input = document.getElementById('topic-writing-input');
    if (!input) return;

    const userValue = input.value;
    const exactMatch = this.normalize(userValue) === this.normalize(correct);

    if (exactMatch) {
      this.handleResult(true, correct);
      return;
    }

    const accentMatch = this.normalizeWithAccents(userValue) === this.normalizeWithAccents(correct);
    if (accentMatch) {
      this.handleResult(true, correct, true);
      return;
    }

    this.handleResult(false, correct);
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
        return '-' + flags.split('').sort().join('');
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
        return '-' + flags.split('').sort().join('');
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

    if (this.normalize(input.value) === this.normalize(correct)) {
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

  // ─── RESULT HANDLING ──────────────────────────

  handleResult(isCorrect, correct, accentHint = false) {
    this.clearTimer();
    const responseTime = this.getResponseTimeSeconds();
    this.totalResponseTime += responseTime;

    let xpEarned = 0;
    if (isCorrect) {
      this.score++;
      this.consecutiveCorrect++;
      if (this.consecutiveCorrect > this.maxStreak) {
        this.maxStreak = this.consecutiveCorrect;
      }
      xpEarned = this.calculateXP(responseTime);
      this.sessionXP += xpEarned;
      this.progressManager.addXP(xpEarned);
      this.progressManager.incrementTopicWord(this.currentTopicId);
    } else {
      this.consecutiveCorrect = 0;
    }

    this.updateMetaDisplay();
    this.showFeedback(isCorrect, correct, xpEarned, accentHint);
  }

  /**
   * Handle partial credit for command/code exercises (50% XP)
   */
  handlePartialResult(correct) {
    this.clearTimer();
    const responseTime = this.getResponseTimeSeconds();
    this.totalResponseTime += responseTime;

    const xpEarned = Math.round(this.calculateXP(responseTime) * 0.5);
    this.sessionXP += xpEarned;
    this.progressManager.addXP(xpEarned);
    this.consecutiveCorrect = 0;

    this.updateMetaDisplay();

    const container = document.getElementById('topic-practice-content');
    if (!container) return;

    container.innerHTML = `
      <div class="feedback-card feedback-partial">
        <div class="feedback-message">Quasi! Comando base corretto</div>
        ${xpEarned > 0 ? `<div class="feedback-xp">+${xpEarned} XP (parziale)</div>` : ''}
        <div class="feedback-answer">La risposta era: <strong>${this.escapeHtml(correct)}</strong></div>
        <div class="feedback-progress-bar"><div class="feedback-progress-fill"></div></div>
      </div>
    `;

    if (xpEarned > 0) this.showFloatingXP(xpEarned);
    setTimeout(() => this.nextQuestion(), 2000);
  }

  /**
   * Handle partial credit for sentence reconstruction
   */
  handlePartialSentenceResult(positions, correctCount, totalWords, correctAnswer) {
    this.clearTimer();
    const responseTime = this.getResponseTimeSeconds();
    this.totalResponseTime += responseTime;

    const xpEarned = Math.round(this.calculateXP(responseTime) * 0.5);
    this.sessionXP += xpEarned;
    this.progressManager.addXP(xpEarned);
    this.consecutiveCorrect = 0;

    this.updateMetaDisplay();

    const container = document.getElementById('topic-practice-content');
    if (!container) return;

    const wordsHtml = positions
      .map(
        (p) =>
          `<span class="word-chip ${p.correct ? 'word-correct' : 'word-incorrect'}">${this.escapeHtml(p.word || '___')}</span>`
      )
      .join(' ');

    container.innerHTML = `
      <div class="feedback-card feedback-partial">
        <div class="feedback-message">Quasi perfetto! ${correctCount}/${totalWords} parole corrette</div>
        ${xpEarned > 0 ? `<div class="feedback-xp">+${xpEarned} XP (parziale)</div>` : ''}
        <div class="sentence-feedback">${wordsHtml}</div>
        <div class="feedback-answer">La frase corretta: <strong>${this.escapeHtml(correctAnswer)}</strong></div>
        <div class="feedback-progress-bar"><div class="feedback-progress-fill"></div></div>
      </div>
    `;

    if (xpEarned > 0) this.showFloatingXP(xpEarned);
    setTimeout(() => this.nextQuestion(), 2500);
  }

  showFeedback(isCorrect, correctAnswer, xpEarned = 0, accentHint = false) {
    const container = document.getElementById('topic-practice-content');
    if (!container) return;

    const message = isCorrect
      ? ENCOURAGING_CORRECT[Math.floor(Math.random() * ENCOURAGING_CORRECT.length)]
      : ENCOURAGING_INCORRECT[Math.floor(Math.random() * ENCOURAGING_INCORRECT.length)];

    const accentHintHtml = accentHint
      ? `<div class="feedback-accent-hint">Attenzione agli accenti: <strong>${this.escapeHtml(correctAnswer)}</strong></div>`
      : '';

    container.innerHTML = `
      <div class="feedback-card ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}">
        <div class="feedback-icon">${isCorrect ? '\u2705' : '\u{1F4A1}'}</div>
        <div class="feedback-message">${message}</div>
        ${isCorrect && xpEarned > 0 ? `<div class="feedback-xp">+${xpEarned} XP</div>` : ''}
        ${accentHintHtml}
        ${!isCorrect ? `<div class="feedback-answer">La risposta era: <strong>${this.escapeHtml(correctAnswer)}</strong></div>` : ''}
        <div class="feedback-progress-bar">
          <div class="feedback-progress-fill"></div>
        </div>
      </div>
    `;

    if (isCorrect && xpEarned > 0) {
      this.showFloatingXP(xpEarned);
    }

    setTimeout(() => this.nextQuestion(), 1500);
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.updateMetaDisplay();
      this.startQuestionTimer();
      this.renderQuestion();
    } else {
      this.clearTimer();
      this.completePractice();
    }
  }

  completePractice() {
    // Track practice session completion for achievements
    this.progressManager?.recordPracticeSession?.(this.score, this.questions.length);

    const container = document.getElementById('topic-practice-content');
    if (!container) return;

    const percent = Math.round((this.score / this.questions.length) * 100);
    const avgTime =
      this.questions.length > 0
        ? (this.totalResponseTime / this.questions.length).toFixed(1)
        : '0.0';
    const emoji = percent >= 80 ? '\u{1F3C6}' : percent >= 50 ? '\u{1F44F}' : '\u{1F4AA}';
    const message =
      percent >= 80
        ? 'Incredibile! / Amazing!'
        : percent >= 50
          ? 'Buon lavoro! / Good job!'
          : 'Continua cos\u00EC! / Keep it up!';

    const accuracyClass =
      percent >= 80 ? 'accuracy-high' : percent >= 50 ? 'accuracy-mid' : 'accuracy-low';

    this.progressManager.updateTopicPracticeStats(
      this.currentTopicId,
      this.questions.length,
      this.score
    );

    container.innerHTML = `
      <div class="completion-overlay">
        <div class="completion-content">
          <span class="completion-icon">${emoji}</span>
          <h3>${message}</h3>
          <div class="completion-score">
            <span class="score-number">${this.score}</span>
            <span class="score-divider">/</span>
            <span class="score-total">${this.questions.length}</span>
          </div>
          <div class="completion-accuracy-bar ${accuracyClass}">
            <div class="completion-accuracy-fill" style="width: ${percent}%"></div>
          </div>
          <p class="completion-percent">${percent}% corretto / correct</p>
          <div class="completion-breakdown">
            <div class="breakdown-item">
              <span class="breakdown-value">${this.sessionXP}</span>
              <span class="breakdown-label">XP Totali</span>
            </div>
            <div class="breakdown-item">
              <span class="breakdown-value">${avgTime}s</span>
              <span class="breakdown-label">Tempo Medio</span>
            </div>
            <div class="breakdown-item">
              <span class="breakdown-value">${this.maxStreak}</span>
              <span class="breakdown-label">Max Streak</span>
            </div>
          </div>
          <div class="completion-actions">
            <button class="btn btn-secondary" data-action="back-to-level">
              \u2190 Torna al Livello / Back to Level
            </button>
            <button class="btn btn-primary" data-action="retry">
              \u{1F504} Riprova / Try Again
            </button>
          </div>
        </div>
      </div>
    `;

    const topicId = this.currentTopicId;
    const levelNum = this.currentLevel;
    const mode = this.currentMode;
    container.querySelector('[data-action="back-to-level"]')?.addEventListener('click', () => {
      if (window.topicManager) window.topicManager.openLevel(topicId, levelNum);
    });
    container.querySelector('[data-action="retry"]')?.addEventListener('click', () => {
      this.startPractice(mode, topicId, levelNum);
    });
  }

  showNotification(message, type = 'info') {
    const container = document.getElementById('topic-practice-content');
    if (!container) return;

    container.innerHTML = `
      <div class="feedback-card feedback-${type}">
        <div class="feedback-icon">${type === 'warning' ? '\u26A0\uFE0F' : '\u2139\uFE0F'}</div>
        <div class="feedback-message">${this.escapeHtml(message)}</div>
        <button class="btn btn-secondary" data-action="back" style="margin-top: 1rem;">
          \u2190 Indietro / Back
        </button>
      </div>
    `;

    container.querySelector('[data-action="back"]')?.addEventListener('click', () => {
      if (window.topicManager) window.topicManager.backToDetail();
    });
  }

  // ─── TERMINAL SIMULATOR ──────────────────────

  renderTerminalQuestion(container, q) {
    const step = q.steps[q.currentStep];
    const historyHtml = q.completedOutputs
      .map(
        (entry) => `
        <div class="terminal-history-entry">
          <span class="terminal-ps1">$</span> <span class="terminal-history-cmd">${this.escapeHtml(entry.command)}</span>
          <div class="terminal-output">${this.escapeHtml(entry.output)}</div>
        </div>
      `
      )
      .join('');

    container.innerHTML = `
      <div class="terminal-sim">
        <div class="terminal-header">
          <span class="terminal-dot terminal-dot-red"></span>
          <span class="terminal-dot terminal-dot-yellow"></span>
          <span class="terminal-dot terminal-dot-green"></span>
          <span class="terminal-header-title">Terminal</span>
        </div>
        <div class="terminal-body">
          <div class="terminal-scenario">
            ${this.escapeHtml(step.description)}
            ${step.descriptionEn ? ` / ${this.escapeHtml(step.descriptionEn)}` : ''}
          </div>
          <div class="terminal-step-info">Step ${q.currentStep + 1}/${q.steps.length}</div>
          <div class="terminal-history">${historyHtml}</div>
          <div class="terminal-prompt">
            <span class="terminal-ps1">$</span>
            <input class="terminal-input" type="text" id="terminal-cmd-input" autofocus
              placeholder="Type the command...">
          </div>
        </div>
      </div>
    `;

    const input = container.querySelector('#terminal-cmd-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.checkTerminalCommand(q);
        }
      });
    }
  }

  checkTerminalCommand(q) {
    const input = document.getElementById('terminal-cmd-input');
    if (!input) return;

    const step = q.steps[q.currentStep];
    const userInput = input.value.trim();

    const normalizeCmd = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const sortFlags = (cmd) =>
      cmd.replace(/-([a-zA-Z]+)/g, (match, flags) => '-' + flags.split('').sort().join(''));

    const userNorm = normalizeCmd(userInput);
    const expectedNorm = normalizeCmd(step.expectedCommand);

    let isCorrect = userNorm === expectedNorm || sortFlags(userNorm) === sortFlags(expectedNorm);

    // Check aliases
    if (!isCorrect) {
      const aliases = COMMAND_ALIASES[expectedNorm] || [];
      for (const alias of aliases) {
        const normAlias = normalizeCmd(alias);
        if (userNorm === normAlias || sortFlags(userNorm) === sortFlags(normAlias)) {
          isCorrect = true;
          break;
        }
      }
    }

    const container = document.getElementById('topic-practice-content');
    if (!container) return;

    if (isCorrect) {
      // Add to completed outputs
      q.completedOutputs.push({
        command: userInput,
        output: step.item.note || step.item.example || 'OK',
      });
      q.currentStep++;

      if (q.currentStep >= q.steps.length) {
        // Chain complete - award XP for the full chain
        const xpEarned = q.steps.length * XP_BASE;
        this.score++;
        this.consecutiveCorrect++;
        if (this.consecutiveCorrect > this.maxStreak) this.maxStreak = this.consecutiveCorrect;
        this.sessionXP += xpEarned;
        this.progressManager.addXP(xpEarned);
        this.progressManager.incrementTopicWord(this.currentTopicId);
        this.progressManager.incrementTerminalExercises();
        this.updateMetaDisplay();
        this.showFloatingXP(xpEarned);
        this.showFeedback(true, 'Chain complete!', xpEarned);
      } else {
        // Show success briefly then render next step
        this.renderTerminalQuestion(container, q);
      }
    } else {
      // Show error in terminal
      const errorDiv = document.createElement('div');
      errorDiv.className = 'terminal-error';
      errorDiv.textContent = `Command not recognized. Expected: ${step.expectedCommand}`;
      const body = container.querySelector('.terminal-body');
      if (body) body.appendChild(errorDiv);

      this.consecutiveCorrect = 0;
      this.updateMetaDisplay();

      setTimeout(() => {
        // Move to next question after showing error
        q.currentStep = q.steps.length; // Mark as done
        this.handleResult(false, step.expectedCommand);
      }, 2000);
    }
  }

  // ─── CODE LAB ─────────────────────────────────

  renderCodelabQuestion(container, q) {
    const linesHtml = q.lines
      .map((line, idx) => {
        if (idx === q.blankIndex) {
          return `
            <div class="code-line code-blank">
              <span class="code-line-num">${idx + 1}</span>
              <input class="codelab-input" type="text" id="codelab-line-input"
                placeholder="Type the missing code..." autofocus>
            </div>
          `;
        }
        return `
          <div class="code-line">
            <span class="code-line-num">${idx + 1}</span>
            <span class="code-line-text">${this.escapeHtml(line)}</span>
          </div>
        `;
      })
      .join('');

    const descriptionText = q.item.example || q.item.english || 'Complete the missing line';

    container.innerHTML = `
      <div class="codelab">
        <div class="codelab-header">Code Lab</div>
        <div class="codelab-description">${this.escapeHtml(descriptionText)}</div>
        <pre class="codelab-code">${linesHtml}</pre>
        <div class="codelab-actions">
          <button class="btn btn-hint" onclick="topicPracticeManager.showCodelabHint()">
            Suggerimento / Hint
          </button>
          <button class="btn btn-primary" onclick="topicPracticeManager.checkCodelabAnswer()">
            Invia / Submit
          </button>
        </div>
        <div class="codelab-hint" id="codelab-hint-text" style="display:none">
          ${this.escapeHtml(q.hint)}
        </div>
      </div>
    `;

    const input = container.querySelector('#codelab-line-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.checkCodelabAnswer();
        }
      });
    }
  }

  showCodelabHint() {
    const hintEl = document.getElementById('codelab-hint-text');
    if (hintEl) hintEl.style.display = 'block';
  }

  checkCodelabAnswer() {
    const input = document.getElementById('codelab-line-input');
    if (!input) return;

    const q = this.questions[this.currentQuestionIndex];
    const userInput = input.value;
    const expected = q.blankedLine;

    // Compare with tolerance: trim whitespace, compare lowercased
    const normalizeCode = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase();
    const isCorrect = normalizeCode(userInput) === normalizeCode(expected);

    if (isCorrect) {
      this.handleResult(true, expected);
    } else {
      // Check if partially correct (same keywords present)
      const userTokens = new Set(normalizeCode(userInput).split(/\s+/));
      const expectedTokens = normalizeCode(expected).split(/\s+/);
      const matchCount = expectedTokens.filter((t) => userTokens.has(t)).length;
      const ratio = expectedTokens.length > 0 ? matchCount / expectedTokens.length : 0;

      if (ratio >= 0.6) {
        this.handlePartialResult(expected);
      } else {
        this.handleResult(false, expected);
      }
    }
  }

  // ─── TECH TALK ────────────────────────────────

  renderTechTalkQuestion(container, q) {
    const scenario = q.scenario;
    const currentTurn = scenario.turns ? scenario.turns[q.currentTurn] : null;

    // Build messages HTML
    const messagesHtml = q.messages
      .map(
        (msg) => `
        <div class="chat-bubble ${msg.role}">
          <div class="chat-bubble-content">
            <div class="chat-bubble-text">${this.escapeHtml(msg.text)}</div>
            ${
              msg.corrections && msg.corrections.length > 0
                ? `<div class="chat-corrections">
                ${msg.corrections
                  .map(
                    (c) => `
                  <div class="chat-correction">
                    <span class="chat-correction-wrong">${this.escapeHtml(c.wrong)}</span>
                    <span class="chat-correction-arrow">&rarr;</span>
                    <span class="chat-correction-right">${this.escapeHtml(c.right)}</span>
                    <div class="chat-correction-hint">${this.escapeHtml(c.hint)}</div>
                  </div>
                `
                  )
                  .join('')}
              </div>`
                : ''
            }
          </div>
        </div>
      `
      )
      .join('');

    // Add current AI message if at current turn
    let aiMessageText = '';
    if (currentTurn) {
      aiMessageText = currentTurn.aiMessage;
    }

    const isComplete = !currentTurn || q.currentTurn >= q.totalTurns;

    if (isComplete) {
      // Show summary
      const keywordCount = q.keywordsUsed.length;
      const xpEarned = 10 + keywordCount * 5;

      container.innerHTML = `
        <div class="chat-container" style="height: auto; max-height: none;">
          <div class="chat-header">
            <div class="chat-header-info">
              <span class="chat-header-icon">💬</span>
              <h3 class="chat-header-title">${this.escapeHtml(scenario.name || 'Tech Talk')}</h3>
            </div>
          </div>
          <div class="chat-messages" style="max-height: 300px; overflow-y: auto;">
            ${messagesHtml}
          </div>
          <div class="techtalk-summary">
            <h4>Conversation Complete!</h4>
            <div class="techtalk-summary-stats">
              <span>Keywords used: ${keywordCount}</span>
              <span>Corrections: ${q.corrections.length}</span>
              <span>+${xpEarned} XP</span>
            </div>
          </div>
        </div>
      `;

      // Award XP
      this.score++;
      this.consecutiveCorrect++;
      if (this.consecutiveCorrect > this.maxStreak) this.maxStreak = this.consecutiveCorrect;
      this.sessionXP += xpEarned;
      this.progressManager.addXP(xpEarned);
      this.progressManager.incrementTopicWord(this.currentTopicId);
      this.updateMetaDisplay();
      this.showFloatingXP(xpEarned);

      setTimeout(() => this.nextQuestion(), 3000);
      return;
    }

    container.innerHTML = `
      <div class="chat-container" style="height: auto; max-height: none;">
        <div class="chat-header">
          <div class="chat-header-info">
            <span class="chat-header-icon">💬</span>
            <h3 class="chat-header-title">${this.escapeHtml(scenario.name || 'Tech Talk')}</h3>
          </div>
          <span class="techtalk-turn-info">Turn ${q.currentTurn + 1}/${q.totalTurns}</span>
        </div>
        <div class="chat-messages" id="techtalk-messages" style="max-height: 350px; overflow-y: auto;">
          ${messagesHtml}
          ${
            aiMessageText
              ? `
            <div class="chat-bubble assistant">
              <div class="chat-bubble-content">
                <div class="chat-bubble-text">${this.escapeHtml(aiMessageText)}</div>
              </div>
            </div>
          `
              : ''
          }
        </div>
        ${
          currentTurn && currentTurn.hintText
            ? `
          <div class="techtalk-hint-bar">
            <button class="btn btn-hint" onclick="topicPracticeManager.showTechTalkHint()">
              Suggerimento / Hint
            </button>
            <span class="techtalk-hint-text" id="techtalk-hint" style="display:none">
              ${this.escapeHtml(currentTurn.hintText)}
            </span>
          </div>
        `
            : ''
        }
        <div class="chat-input-area">
          <input type="text" class="chat-input" id="techtalk-input" placeholder="Type your response in English..." autofocus>
          <button class="btn btn-primary" onclick="topicPracticeManager.handleTechTalkMessage()">
            Send
          </button>
        </div>
      </div>
    `;

    // Scroll to bottom
    const messagesEl = container.querySelector('#techtalk-messages');
    if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;

    const input = container.querySelector('#techtalk-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleTechTalkMessage();
        }
      });
    }
  }

  showTechTalkHint() {
    const hintEl = document.getElementById('techtalk-hint');
    if (hintEl) hintEl.style.display = 'inline';
  }

  handleTechTalkMessage() {
    const input = document.getElementById('techtalk-input');
    if (!input || !input.value.trim()) return;

    const q = this.questions[this.currentQuestionIndex];
    const scenario = q.scenario;
    const turn = scenario.turns[q.currentTurn];
    if (!turn) return;

    const userMessage = input.value.trim();

    // 1. Check for expected keywords
    const expectedKeywords = turn.expectedKeywords || [];
    const foundKeywords = expectedKeywords.filter((kw) =>
      userMessage.toLowerCase().includes(kw.toLowerCase())
    );
    q.keywordsUsed.push(...foundKeywords);

    // 2. Apply grammar checks
    const corrections = [];
    for (const rule of TECHTALK_GRAMMAR_RULES) {
      if (rule.test) {
        if (rule.test(userMessage)) {
          corrections.push({
            wrong: userMessage.match(rule.pattern)?.[0] || '',
            right: rule.correction || '',
            hint: rule.hint,
          });
        }
      } else if (rule.pattern.test(userMessage)) {
        corrections.push({
          wrong: userMessage.match(rule.pattern)?.[0] || '',
          right: rule.correction || '',
          hint: rule.hint,
        });
      }
    }
    q.corrections.push(...corrections);

    // 3. Add user message to conversation
    q.messages.push({
      role: 'user',
      text: userMessage,
      corrections,
    });

    // 4. Determine AI response
    let aiResponse = '';
    if (turn.nextResponses) {
      // Check keyword patterns for specific responses
      for (const [pattern, response] of Object.entries(turn.nextResponses)) {
        if (userMessage.toLowerCase().includes(pattern.toLowerCase())) {
          aiResponse = response;
          break;
        }
      }
    }

    if (!aiResponse) {
      // Default response based on whether keywords were found
      if (foundKeywords.length > 0) {
        aiResponse = scenario.isFallback
          ? `Correct! "${foundKeywords[0]}" is right.`
          : "Good, let's continue.";
      } else if (turn.missingResponse) {
        aiResponse = turn.missingResponse;
      } else {
        aiResponse = scenario.isFallback
          ? `Not quite. The answer was "${expectedKeywords[0]}". Let's move on.`
          : "I see. Let's move to the next point.";
      }
    }

    q.messages.push({
      role: 'assistant',
      text: aiResponse,
      corrections: [],
    });

    // Advance turn
    q.currentTurn++;

    // Re-render
    const container = document.getElementById('topic-practice-content');
    if (container) this.renderTechTalkQuestion(container, q);
  }

  // ─── CHAIN CHALLENGE ──────────────────────────

  renderChainQuestion(container, q) {
    const link = q.links[q.currentLink];

    // Build chain progress nodes
    const nodesHtml = q.links
      .map((l, idx) => {
        let nodeClass = 'chain-node';
        let nodeContent = `${idx + 1}`;
        if (l.completed && l.correct) {
          nodeClass += ' completed';
          nodeContent = '\u2713';
        } else if (l.completed && !l.correct) {
          nodeClass += ' failed';
          nodeContent = '\u2717';
        } else if (idx === q.currentLink) {
          nodeClass += ' current';
        }

        let linkHtml = '';
        if (idx < q.links.length - 1) {
          let linkClass = 'chain-link';
          if (q.links[idx].completed) {
            linkClass += q.links[idx].correct ? ' completed' : ' failed';
          }
          linkHtml = `<div class="${linkClass}"></div>`;
        }

        return `<div class="${nodeClass}">${nodeContent}</div>${linkHtml}`;
      })
      .join('');

    // Calculate streak multiplier
    let multiplier = 1.0;
    if (q.chainStreak >= 4) multiplier = 2.0;
    else if (q.chainStreak >= 3) multiplier = 1.5;
    else if (q.chainStreak >= 2) multiplier = 1.2;

    const multiplierClass =
      multiplier >= 2.0
        ? 'chain-mult-max'
        : multiplier >= 1.5
          ? 'chain-mult-high'
          : multiplier >= 1.2
            ? 'chain-mult-mid'
            : 'chain-mult-base';

    // Build question HTML based on link type
    let questionHtml = '';
    const item = link.item;

    switch (link.questionType) {
      case 'multiple-choice': {
        const options = this.generateOptions(item.italian);
        questionHtml = `
          <div class="exercise-instruction">Qual e' la traduzione di:</div>
          <div class="exercise-target">${this.escapeHtml(item.english)}</div>
          <div class="options-grid">
            ${options
              .map(
                (opt) => `
              <button class="btn btn-secondary option-btn"
                onclick="topicPracticeManager.checkChainAnswer('${this.escapeAttr(opt)}', '${this.escapeAttr(item.italian)}')">
                ${this.escapeHtml(opt)}
              </button>
            `
              )
              .join('')}
          </div>
        `;
        break;
      }
      case 'typing': {
        questionHtml = `
          <div class="exercise-instruction">Scrivi in inglese / Write in English:</div>
          <div class="exercise-target">${this.escapeHtml(item.italian)}</div>
          <input type="text" id="chain-typing-input" class="practice-input" placeholder="Type the English term..." autofocus>
          <button class="btn btn-primary" style="margin-top: 1rem;"
            onclick="topicPracticeManager.checkChainTypingAnswer('${this.escapeAttr(item.english)}')">
            Invia / Submit
          </button>
        `;
        break;
      }
      case 'command': {
        questionHtml = `
          <div class="exercise-instruction">Scrivi il comando / Write the command:</div>
          <div class="exercise-target">${this.escapeHtml(item.italian || item.english)}</div>
          <input type="text" id="chain-typing-input" class="practice-input practice-input-mono" placeholder="$ " autofocus>
          <button class="btn btn-primary" style="margin-top: 1rem;"
            onclick="topicPracticeManager.checkChainCommandAnswer('${this.escapeAttr(item.command)}')">
            Invia / Submit
          </button>
        `;
        break;
      }
      // no default
    }

    container.innerHTML = `
      <div class="chain-container">
        <div class="chain-progress">${nodesHtml}</div>
        <div class="chain-multiplier ${multiplierClass}">Chain x${multiplier.toFixed(1)}</div>
        <div class="chain-xp-display">${q.chainXP} XP</div>
        <div class="exercise-card">
          ${questionHtml}
        </div>
      </div>
    `;

    // Focus input for typing/command modes
    const input = container.querySelector('#chain-typing-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const submitBtn = container.querySelector('.btn-primary');
          if (submitBtn) submitBtn.click();
        }
      });
    }
  }

  checkChainAnswer(selected, correct) {
    const isCorrect = selected === correct;
    this.processChainResult(isCorrect, correct);
  }

  checkChainTypingAnswer(correct) {
    const input = document.getElementById('chain-typing-input');
    if (!input) return;
    const isCorrect = this.normalize(input.value) === this.normalize(correct);
    this.processChainResult(isCorrect, correct);
  }

  checkChainCommandAnswer(correct) {
    const input = document.getElementById('chain-typing-input');
    if (!input) return;

    const normalizeCmd = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const sortFlags = (cmd) =>
      cmd.replace(/-([a-zA-Z]+)/g, (match, flags) => '-' + flags.split('').sort().join(''));

    const userInput = normalizeCmd(input.value);
    const expected = normalizeCmd(correct);

    let isCorrect = userInput === expected || sortFlags(userInput) === sortFlags(expected);

    if (!isCorrect) {
      const aliases = COMMAND_ALIASES[expected] || [];
      for (const alias of aliases) {
        const normAlias = normalizeCmd(alias);
        if (userInput === normAlias || sortFlags(userInput) === sortFlags(normAlias)) {
          isCorrect = true;
          break;
        }
      }
    }

    this.processChainResult(isCorrect, correct);
  }

  processChainResult(isCorrect, correct) {
    const q = this.questions[this.currentQuestionIndex];
    const link = q.links[q.currentLink];

    link.completed = true;
    link.correct = isCorrect;

    // Calculate streak multiplier
    let multiplier = 1.0;
    if (q.chainStreak >= 4) multiplier = 2.0;
    else if (q.chainStreak >= 3) multiplier = 1.5;
    else if (q.chainStreak >= 2) multiplier = 1.2;

    if (isCorrect) {
      q.chainStreak++;
      const xpForLink = Math.round(XP_BASE * multiplier);
      q.chainXP += xpForLink;
      this.score++;
      this.consecutiveCorrect++;
      if (this.consecutiveCorrect > this.maxStreak) this.maxStreak = this.consecutiveCorrect;
      this.sessionXP += xpForLink;
      this.progressManager.addXP(xpForLink);
      this.progressManager.incrementTopicWord(this.currentTopicId);
      this.showFloatingXP(xpForLink);
    } else {
      q.chainStreak = 0;
      this.consecutiveCorrect = 0;
    }

    this.updateMetaDisplay();
    q.currentLink++;

    const container = document.getElementById('topic-practice-content');
    if (!container) return;

    if (q.currentLink >= q.links.length) {
      // Chain complete - show summary
      this.clearTimer();
      const correctCount = q.links.filter((l) => l.correct).length;
      this.progressManager.updateBestChainStreak(q.chainStreak);

      container.innerHTML = `
        <div class="chain-container">
          <div class="chain-progress">
            ${q.links
              .map((l, idx) => {
                const nodeClass = l.correct ? 'chain-node completed' : 'chain-node failed';
                const nodeContent = l.correct ? '\u2713' : '\u2717';
                let linkHtml = '';
                if (idx < q.links.length - 1) {
                  linkHtml = `<div class="chain-link ${l.correct ? 'completed' : 'failed'}"></div>`;
                }
                return `<div class="${nodeClass}">${nodeContent}</div>${linkHtml}`;
              })
              .join('')}
          </div>
          <div class="chain-summary">
            <h3>Chain Complete!</h3>
            <div class="chain-summary-stats">
              <div class="breakdown-item">
                <span class="breakdown-value">${correctCount}/5</span>
                <span class="breakdown-label">Corrette / Correct</span>
              </div>
              <div class="breakdown-item">
                <span class="breakdown-value">${q.chainXP}</span>
                <span class="breakdown-label">XP Guadagnati / Earned</span>
              </div>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => this.nextQuestion(), 2500);
    } else if (!isCorrect) {
      // Brief incorrect feedback
      const feedbackDiv = document.createElement('div');
      feedbackDiv.className = 'chain-feedback chain-feedback-wrong';
      feedbackDiv.innerHTML = `La risposta era: <strong>${this.escapeHtml(correct)}</strong>`;
      container.appendChild(feedbackDiv);

      setTimeout(() => {
        this.renderChainQuestion(container, q);
      }, 1500);
    } else {
      // Quick transition to next link
      setTimeout(() => {
        this.renderChainQuestion(container, q);
      }, 500);
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
