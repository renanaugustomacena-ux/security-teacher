/**
 * PRACTICE MODULE - FlowLearn
 * ===========================
 *
 * Gestisce gli esercizi interattivi:
 * - Listening (Ascolto)
 * - Writing (Scrittura)
 * - Matching (Abbinamento)
 * - Fill in the blank (Completa)
 * - Sentence Reconstruction (Ricostruzione Frase)
 * - Comprehension (Comprensione)
 * - Scenario (Dialogo situazionale)
 *
 * Pulls vocabulary from BOTH lessons AND songs databases.
 */

import { lessonsDatabase } from './lessons.js';
import { songsDatabase } from './songs.js';

const ENCOURAGING_CORRECT = [
  'Perfetto! / Perfect!',
  'Ottimo! / Great!',
  'Bravo/Brava!',
  'Esatto! / Exactly!',
  'Fantastico! / Fantastic!',
  'Ci sei! / You got it!',
  'Bravissimo/a!',
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

// Expanded scenario templates
const SCENARIO_TEMPLATES = [
  'Sei in un colloquio di lavoro...',
  'Stai presentando un progetto al team...',
  'Sei in una riunione informale con colleghi...',
  'Stai parlando con il tuo capo di un problema...',
  'Sei a un evento di networking professionale...',
  'Stai chattando con un amico americano...',
  'Sei a una cena con amici internazionali...',
  'Stai conoscendo qualcuno a una festa...',
  'Sei al telefono con un servizio clienti americano...',
  'Stai dando consigli a un amico che studia inglese...',
  'Sei in un seminario universitario...',
  'Stai discutendo un articolo con un collega...',
  'Sei in una lezione e devi fare una domanda...',
  'Sei in aeroporto e devi chiedere indicazioni...',
  'Stai ordinando al ristorante in un paese anglofono...',
  'Sei in un hotel e hai un problema con la stanza...',
];

export class PracticeManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.currentMode = null;
    this.questions = [];
    this.fullPool = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.songFilter = null;

    // XP & Timer state
    this.questionStartTime = 0;
    this.sessionXP = 0;
    this.consecutiveCorrect = 0;
    this.maxStreak = 0;
    this.totalResponseTime = 0;
    this.timerInterval = null;

    this.init();
  }

  init() {
    window.practiceManager = this;
  }

  /**
   * Escape HTML entities to prevent XSS
   */
  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Start a practice session.
   * @param {string} mode - Exercise type
   * @param {string|null} songId - If provided, practice only this song's vocabulary
   */
  startPractice(mode, songId = null) {
    this.currentMode = mode;
    this.songFilter = songId;
    this.generateQuestions(mode);
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.sessionXP = 0;
    this.consecutiveCorrect = 0;
    this.maxStreak = 0;
    this.totalResponseTime = 0;

    if (this.questions.length === 0) {
      this.showNotification(
        'Nessuna domanda disponibile. Completa qualche lezione prima! / No questions available. Complete some lessons first!',
        'warning'
      );
      return;
    }

    document.querySelector('.practice-grid').classList.add('hidden');
    document.getElementById('practice-container').classList.remove('hidden');

    this.startQuestionTimer();
    this.updateProgressBar();
    this.updateStreakDisplay();
    this.updateXPDisplay();
    this.renderQuestion();
  }

  /**
   * Generate question pool from lessons AND songs
   */
  generateQuestions(mode) {
    let pool = [];

    if (this.songFilter) {
      const song = songsDatabase.find((s) => s.id === this.songFilter);
      if (song) {
        song.steps.forEach((step) => {
          step.vocabulary.forEach((v) => {
            pool.push({
              english: v.word,
              italian: v.translation,
              pronunciation: v.pronunciation,
              example: v.example,
            });
          });
        });
      }
    } else {
      // Merge from lessons, tagging each item with its source lesson
      const { unlockedLevels } = this.progressManager.data;
      unlockedLevels.forEach((lvl) => {
        const levelData = lessonsDatabase[lvl];
        if (levelData) {
          levelData.lessons.forEach((lesson) => {
            lesson.items.forEach((item) => {
              pool.push({ ...item, _lessonId: lesson.id, _level: lvl });
            });
          });
        }
      });

      // Also merge from songs (normalize shape)
      songsDatabase.forEach((song) => {
        song.steps.forEach((step) => {
          step.vocabulary.forEach((v) => {
            pool.push({
              english: v.word,
              italian: v.translation,
              pronunciation: v.pronunciation,
              example: v.example,
              _lessonId: `song_${song.id}`,
              _level: 'songs',
            });
          });
        });
      });

      // Deduplicate by english word (case-insensitive)
      const seen = new Set();
      pool = pool.filter((item) => {
        const key = (item.english || '').toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    if (mode === 'sentence' || mode === 'fillblank') {
      pool = pool.filter((item) => item.example || item.usage);
    } else if (mode === 'comprehension') {
      pool = pool.filter((item) => item.example);
    } else if (mode === 'scenario') {
      pool = pool.filter((item) => item.example && item.english && item.italian);
    } else {
      pool = pool.filter((item) => item.english && item.italian);
    }

    // Store full pool before slicing for distractor generation
    this.fullPool = [...pool];
    this.questions = this.shuffleArray(pool).slice(0, 10);
  }

  shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  /**
   * Check if a word is a content word (not a function word)
   */
  isContentWord(word) {
    const cleaned = word.toLowerCase().replace(/[.,?!;:'"()]/g, '');
    if (cleaned.length <= 1) return false;
    return !ENGLISH_FUNCTION_WORDS.has(cleaned) && !ITALIAN_FUNCTION_WORDS.has(cleaned);
  }

  /**
   * Pick the best word index to blank in a sentence.
   * Prioritizes the target vocabulary word, then content words by length.
   */
  pickBestBlankIndex(words, targetWord) {
    // Priority 1: Target vocabulary word
    if (targetWord) {
      const targetLower = targetWord.toLowerCase();
      const targetIdx = words.findIndex(
        (w) => w.toLowerCase().replace(/[.,?!;:'"()]/g, '') === targetLower
      );
      if (targetIdx !== -1) return targetIdx;
    }

    // Priority 2: Content words, prefer longer ones
    const candidates = words
      .map((w, i) => ({ word: w, index: i }))
      .filter((c) => this.isContentWord(c.word))
      .sort((a, b) => b.word.length - a.word.length);

    if (candidates.length > 0) {
      const topN = candidates.slice(0, Math.min(3, candidates.length));
      return topN[Math.floor(Math.random() * topN.length)].index;
    }

    // Fallback: any word longer than 2 chars
    const nonTrivial = words
      .map((w, i) => ({ word: w, index: i }))
      .filter((c) => c.word.length > 2);

    if (nonTrivial.length > 0) {
      return nonTrivial[Math.floor(Math.random() * nonTrivial.length)].index;
    }

    return Math.floor(Math.random() * words.length);
  }

  /**
   * Normalize text with accent tolerance for comparison
   */
  normalizeWithAccents(str) {
    return str
      .toLowerCase()
      .replace(/[.,?!;:'"()]/g, '')
      .replace(/[àáâã]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõ]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .trim();
  }

  /**
   * Basic normalization without accent stripping
   */
  normalize(str) {
    return str
      .toLowerCase()
      .replace(/[.,?!;:'"()]/g, '')
      .trim();
  }

  renderQuestion() {
    const container = document.getElementById('practice-content');
    if (!container || this.questions.length === 0) return;

    const question = this.questions[this.currentQuestionIndex];
    document.getElementById('practice-progress').textContent =
      `${this.currentQuestionIndex + 1}/${this.questions.length}`;

    let html = '';
    let correctAnswer = '';

    if (this.currentMode === 'listening' || this.currentMode === 'matching') {
      const options = this.generateOptions(question.italian);
      correctAnswer = question.italian;
      html = `
                <div class="exercise-card">
                    <div class="exercise-instruction">
                        ${this.currentMode === 'listening' ? 'Ascolta e scegli:' : 'Qual \u00E8 la traduzione di:'}
                    </div>
                    <div class="exercise-target">${this.escapeHtml(question.english)}</div>
                    ${question.pronunciation ? `<div class="exercise-pronunciation">${this.escapeHtml(question.pronunciation)}</div>` : ''}
                    <div class="options-grid">
                        ${options
                          .map(
                            (opt, idx) => `
                            <button class="btn btn-secondary option-btn" data-option-idx="${idx}">
                                ${this.escapeHtml(opt)}
                            </button>
                        `
                          )
                          .join('')}
                    </div>
                </div>
            `;

      container.innerHTML = html;

      options.forEach((opt, idx) => {
        const btn = container.querySelector(`[data-option-idx="${idx}"]`);
        if (btn) {
          btn.addEventListener('click', () => this.checkAnswer(opt, correctAnswer));
        }
      });
    } else if (this.currentMode === 'writing') {
      correctAnswer = question.italian;
      html = `
                <div class="exercise-card">
                    <div class="exercise-instruction">Scrivi la traduzione in italiano:</div>
                    <div class="exercise-target">${this.escapeHtml(question.english)}</div>
                    ${question.pronunciation ? `<div class="exercise-pronunciation">${this.escapeHtml(question.pronunciation)}</div>` : ''}
                    <input type="text" id="writing-input" class="practice-input" placeholder="Scrivi qui..." autofocus>
                    <button class="btn btn-primary submit-btn" style="margin-top: 1rem;">Invia / Submit</button>
                </div>
            `;
      container.innerHTML = html;

      container
        .querySelector('.submit-btn')
        ?.addEventListener('click', () => this.checkWritingAnswer(correctAnswer));
    } else if (this.currentMode === 'fillblank') {
      const sentence = question.example || question.usage;
      const parts = sentence.split(' = ');
      const targetPhrase = parts[0];
      const words = targetPhrase.split(' ');
      const missingIdx = this.pickBestBlankIndex(words, question.english);
      const missingWord = words[missingIdx].trim();
      const displaySentence = words.map((w, i) => (i === missingIdx ? '_____' : w)).join(' ');
      correctAnswer = missingWord;

      html = `
                <div class="exercise-card">
                    <div class="exercise-instruction">Completa la frase:</div>
                    <div class="exercise-target">${this.escapeHtml(displaySentence)}</div>
                    <p class="translation-hint">Traduzione: ${this.escapeHtml(parts[1] || '')}</p>
                    <input type="text" id="writing-input" class="practice-input" placeholder="Parola mancante..." autofocus>
                    <button class="btn btn-primary submit-btn" style="margin-top: 1rem;">Invia / Submit</button>
                </div>
            `;
      container.innerHTML = html;

      container
        .querySelector('.submit-btn')
        ?.addEventListener('click', () => this.checkWritingAnswer(correctAnswer));
    } else if (this.currentMode === 'sentence') {
      const sentence = (question.example || question.usage).split(' = ')[0];
      const words = this.shuffleArray(sentence.split(' '));
      correctAnswer = sentence;

      html = `
                <div class="exercise-card">
                    <div class="exercise-instruction">Ricostruisci la frase (Inglese):</div>
                    <div class="exercise-target italic">${this.escapeHtml((question.example || question.usage).split(' = ')[1] || '')}</div>
                    <div class="scrambled-words">
                        ${words.map((w) => `<span class="word-chip">${this.escapeHtml(w)}</span>`).join(' ')}
                    </div>
                    <input type="text" id="writing-input" class="practice-input" placeholder="Scrivi la frase completa..." autofocus>
                    <button class="btn btn-primary submit-btn" style="margin-top: 1rem;">Invia / Submit</button>
                </div>
            `;
      container.innerHTML = html;

      container
        .querySelector('.submit-btn')
        ?.addEventListener('click', () => this.checkSentenceAnswer(correctAnswer));
    } else if (this.currentMode === 'comprehension') {
      // Build a longer paragraph from the full pool
      const allWithExamples = this.fullPool.filter((q) => q.example);
      const paragraphSentences = this.buildComprehensionParagraph(
        allWithExamples,
        this.currentQuestionIndex
      );
      const paragraph = paragraphSentences.join('. ') + '.';
      const correctStatement = (question.example || '').split(' = ')[0];

      const wrongOptions = this.generateComprehensionDistractors(
        correctStatement,
        paragraphSentences,
        allWithExamples
      );
      const allOptions = this.shuffleArray([correctStatement, ...wrongOptions]);
      correctAnswer = correctStatement;

      html = `
                <div class="exercise-card">
                    <div class="exercise-instruction">Leggi il paragrafo e scegli l'affermazione corretta:</div>
                    <div class="exercise-paragraph">${this.escapeHtml(paragraph)}</div>
                    <div class="exercise-comprehension-question">Quale frase appare nel testo?</div>
                    <div class="options-grid">
                        ${allOptions
                          .map(
                            (opt, idx) => `
                            <button class="btn btn-secondary option-btn" data-option-idx="${idx}">
                                ${this.escapeHtml(opt)}
                            </button>
                        `
                          )
                          .join('')}
                    </div>
                </div>
            `;

      container.innerHTML = html;

      allOptions.forEach((opt, idx) => {
        const btn = container.querySelector(`[data-option-idx="${idx}"]`);
        if (btn) {
          btn.addEventListener('click', () => this.checkAnswer(opt, correctAnswer));
        }
      });
    } else if (this.currentMode === 'scenario') {
      const exampleParts = (question.example || '').split(' = ');
      const englishPhrase = exampleParts[0] || '';
      const italianHint = exampleParts[1] || question.italian;

      const targetWord = question.english;
      const blankedPhrase = englishPhrase.replace(
        new RegExp(targetWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
        '_____'
      );

      const scenario = SCENARIO_TEMPLATES[this.currentQuestionIndex % SCENARIO_TEMPLATES.length];

      const options = this.generateOptions(targetWord);
      correctAnswer = targetWord;

      html = `
                <div class="exercise-card">
                    <div class="exercise-instruction">Scenario:</div>
                    <div class="exercise-scenario">${this.escapeHtml(scenario)}</div>
                    <div class="exercise-target">${this.escapeHtml(blankedPhrase)}</div>
                    <p class="translation-hint">${this.escapeHtml(italianHint)}</p>
                    <div class="options-grid">
                        ${options
                          .map(
                            (opt, idx) => `
                            <button class="btn btn-secondary option-btn" data-option-idx="${idx}">
                                ${this.escapeHtml(opt)}
                            </button>
                        `
                          )
                          .join('')}
                    </div>
                </div>
            `;

      container.innerHTML = html;

      options.forEach((opt, idx) => {
        const btn = container.querySelector(`[data-option-idx="${idx}"]`);
        if (btn) {
          btn.addEventListener('click', () => this.checkAnswer(opt, correctAnswer));
        }
      });
    } else {
      container.innerHTML = html;
    }

    const input = document.getElementById('writing-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const submitBtn = container.querySelector('.submit-btn');
          if (submitBtn) submitBtn.click();
        }
      });
    }
  }

  /**
   * Generate semantically-related options for multiple choice.
   * Prefers items from the same lesson, then same level, then full pool.
   */
  generateOptions(correct) {
    const field = this.currentMode === 'scenario' ? 'english' : 'italian';
    const currentQ = this.questions[this.currentQuestionIndex];
    const correctLen = correct.length;
    const minLen = Math.max(1, Math.floor(correctLen * 0.4));
    const maxLen = Math.ceil(correctLen * 2.5);

    const isPlausible = (val) => {
      if (!val || val === correct) return false;
      return val.length >= minLen && val.length <= maxLen;
    };

    const distractors = new Set();

    // Phase 1: Same lesson items
    if (currentQ._lessonId) {
      const sameLesson = this.fullPool.filter(
        (it) => it._lessonId === currentQ._lessonId && isPlausible(it[field])
      );
      const shuffled = this.shuffleArray(sameLesson);
      for (const item of shuffled) {
        if (distractors.size >= 3) break;
        distractors.add(item[field]);
      }
    }

    // Phase 2: Same level items
    if (distractors.size < 3 && currentQ._level) {
      const sameLevel = this.fullPool.filter(
        (it) =>
          it._level === currentQ._level &&
          it._lessonId !== currentQ._lessonId &&
          isPlausible(it[field])
      );
      const shuffled = this.shuffleArray(sameLevel);
      for (const item of shuffled) {
        if (distractors.size >= 3) break;
        if (!distractors.has(item[field])) distractors.add(item[field]);
      }
    }

    // Phase 3: Full pool fallback
    if (distractors.size < 3) {
      const remaining = this.fullPool.filter((it) => isPlausible(it[field]));
      const shuffled = this.shuffleArray(remaining);
      for (const item of shuffled) {
        if (distractors.size >= 3) break;
        if (!distractors.has(item[field])) distractors.add(item[field]);
      }
    }

    return this.shuffleArray([correct, ...Array.from(distractors).slice(0, 3)]);
  }

  /**
   * Build a comprehension paragraph with 5-7 sentences from the pool
   */
  buildComprehensionParagraph(allWithExamples, currentIdx) {
    const sentences = [];
    const used = new Set();
    const targetCount = 6;

    // Start with current question's example
    const currentQ = this.questions[currentIdx];
    if (currentQ && currentQ.example) {
      const sent = currentQ.example.split(' = ')[0];
      if (sent) {
        sentences.push(sent);
        used.add((currentQ.english || '').toLowerCase());
      }
    }

    // Add from nearby questions first
    for (let r = 1; sentences.length < targetCount && r < this.questions.length; r++) {
      for (const offset of [-r, r]) {
        const idx = currentIdx + offset;
        if (
          idx >= 0 &&
          idx < this.questions.length &&
          !used.has((this.questions[idx]?.english || '').toLowerCase())
        ) {
          const q = this.questions[idx];
          if (q && q.example) {
            const sent = q.example.split(' = ')[0];
            if (sent && sent.length > 10) {
              sentences.push(sent);
              used.add((q.english || '').toLowerCase());
            }
          }
        }
        if (sentences.length >= targetCount) break;
      }
    }

    // If still need more, draw from full pool
    if (sentences.length < targetCount) {
      const extras = this.shuffleArray(allWithExamples).filter(
        (q) => !used.has((q.english || '').toLowerCase()) && q.example
      );
      for (const q of extras) {
        if (sentences.length >= targetCount) break;
        const sent = q.example.split(' = ')[0];
        if (sent && sent.length > 10) {
          sentences.push(sent);
          used.add((q.english || '').toLowerCase());
        }
      }
    }

    return sentences;
  }

  /**
   * Generate plausible comprehension distractors from sentences NOT in the paragraph
   */
  generateComprehensionDistractors(correctSentence, paragraphSentences, allWithExamples) {
    const paragraphSet = new Set(paragraphSentences);
    const distractors = [];

    const candidates = allWithExamples
      .map((q) => q.example.split(' = ')[0])
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
    const timerEl = document.getElementById('practice-timer');
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

  updateProgressBar() {
    const fill = document.getElementById('practice-progress-fill');
    if (!fill) return;
    const percent = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
    fill.style.width = `${percent}%`;
  }

  updateStreakDisplay() {
    const el = document.getElementById('practice-streak');
    if (!el) return;
    el.textContent = this.consecutiveCorrect > 0 ? `Streak: ${this.consecutiveCorrect}` : '';
  }

  updateXPDisplay() {
    const el = document.getElementById('practice-xp');
    if (el) el.textContent = `${this.sessionXP} XP`;
  }

  showFloatingXP(amount) {
    const container = document.getElementById('practice-content');
    if (!container) return;
    const floater = document.createElement('div');
    floater.className = 'xp-floater';
    floater.textContent = `+${amount} XP`;
    container.appendChild(floater);
    setTimeout(() => floater.remove(), 1200);
  }

  checkAnswer(selected, correct) {
    this.handleResult(selected === correct, correct);
  }

  /**
   * Check writing answer with accent tolerance
   */
  checkWritingAnswer(correct) {
    const input = document.getElementById('writing-input');
    if (!input) return;

    const userValue = input.value;
    const exactMatch = this.normalize(userValue) === this.normalize(correct);

    if (exactMatch) {
      this.handleResult(true, correct);
      return;
    }

    // Accent-tolerant match
    const accentMatch = this.normalizeWithAccents(userValue) === this.normalizeWithAccents(correct);
    if (accentMatch) {
      this.handleResult(true, correct, true);
      return;
    }

    this.handleResult(false, correct);
  }

  /**
   * Check sentence reconstruction with partial credit
   */
  checkSentenceAnswer(correct) {
    const input = document.getElementById('writing-input');
    if (!input) return;

    const userWords = input.value.trim().split(/\s+/);
    const correctWords = correct.trim().split(/\s+/);

    // Exact match
    if (this.normalize(input.value) === this.normalize(correct)) {
      this.handleResult(true, correct);
      return;
    }

    // Calculate partial credit
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

  handlePartialSentenceResult(positions, correctCount, totalWords, correctAnswer) {
    this.clearTimer();
    const responseTime = this.getResponseTimeSeconds();
    this.totalResponseTime += responseTime;

    const xpEarned = Math.round(this.calculateXP(responseTime) * 0.5);
    this.sessionXP += xpEarned;
    this.progressManager.addXP(xpEarned);
    this.consecutiveCorrect = 0;

    this.updateStreakDisplay();
    this.updateXPDisplay();

    const container = document.getElementById('practice-content');
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
      this.progressManager.incrementWordCount();
    } else {
      this.consecutiveCorrect = 0;
    }

    this.updateStreakDisplay();
    this.updateXPDisplay();
    this.showFeedback(isCorrect, correct, xpEarned, accentHint);
  }

  /**
   * Show inline feedback
   */
  showFeedback(isCorrect, correctAnswer, xpEarned = 0, accentHint = false) {
    const container = document.getElementById('practice-content');
    if (!container) return;

    const message = isCorrect
      ? ENCOURAGING_CORRECT[Math.floor(Math.random() * ENCOURAGING_CORRECT.length)]
      : ENCOURAGING_INCORRECT[Math.floor(Math.random() * ENCOURAGING_INCORRECT.length)];

    const accentHintHtml = accentHint
      ? `<div class="feedback-accent-hint">Attenzione agli accenti: <strong>${this.escapeHtml(correctAnswer)}</strong></div>`
      : '';

    const feedbackHtml = `
            <div class="feedback-card ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}">
                <div class="feedback-icon"></div>
                <div class="feedback-message">${message}</div>
                ${isCorrect && xpEarned > 0 ? `<div class="feedback-xp">+${xpEarned} XP</div>` : ''}
                ${accentHintHtml}
                ${!isCorrect ? `<div class="feedback-answer">La risposta era: <strong>${this.escapeHtml(correctAnswer)}</strong></div>` : ''}
                <div class="feedback-progress-bar">
                    <div class="feedback-progress-fill"></div>
                </div>
            </div>
        `;

    container.innerHTML = feedbackHtml;

    if (isCorrect && xpEarned > 0) {
      this.showFloatingXP(xpEarned);
    }

    setTimeout(() => {
      this.nextQuestion();
    }, 1500);
  }

  /**
   * Show a non-blocking notification (replaces alert for empty states)
   */
  showNotification(message, type = 'info') {
    const container = document.getElementById('practice-content');
    if (!container) return;

    container.innerHTML = `
            <div class="feedback-card feedback-${type}">
                <div class="feedback-icon"></div>
                <div class="feedback-message">${this.escapeHtml(message)}</div>
                <button class="btn btn-secondary" data-action="back" style="margin-top: 1rem;">\u2190 Indietro / Back</button>
            </div>
        `;

    container
      .querySelector('[data-action="back"]')
      ?.addEventListener('click', () => this.closePractice());
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.updateProgressBar();
      this.startQuestionTimer();
      this.renderQuestion();
    } else {
      this.clearTimer();
      this.completePractice();
    }
  }

  completePractice() {
    const container = document.getElementById('practice-content');
    if (!container) return;

    const percent = Math.round((this.score / this.questions.length) * 100);
    const avgTime =
      this.questions.length > 0
        ? (this.totalResponseTime / this.questions.length).toFixed(1)
        : '0.0';
    const emoji = '';
    const message =
      percent >= 80
        ? 'Incredibile! / Amazing!'
        : percent >= 50
          ? 'Buon lavoro! / Good job!'
          : 'Continua cos\u00EC! / Keep it up!';

    const accuracyClass =
      percent >= 80 ? 'accuracy-high' : percent >= 50 ? 'accuracy-mid' : 'accuracy-low';

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
                        <button class="btn btn-secondary" data-action="close">
                            \u2190 Torna agli Esercizi / Back to Exercises
                        </button>
                        <button class="btn btn-primary" data-action="retry">
                            Riprova / Try Again
                        </button>
                    </div>
                </div>
            </div>
        `;

    const mode = this.currentMode;
    container
      .querySelector('[data-action="close"]')
      ?.addEventListener('click', () => this.closePractice());
    container
      .querySelector('[data-action="retry"]')
      ?.addEventListener('click', () => this.startPractice(mode));
  }

  closePractice() {
    this.clearTimer();
    document.getElementById('practice-container').classList.add('hidden');
    document.querySelector('.practice-grid').classList.remove('hidden');
    this.questions = [];
    this.fullPool = [];
    this.songFilter = null;
  }
}
