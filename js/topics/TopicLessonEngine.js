/**
 * TOPIC LESSON ENGINE - FlowLearn
 * ================================
 *
 * Stage-based lesson engine that replaces the flat item-by-item lesson view.
 *
 * Stage 1 - Introduction: Overview of lesson with context groups
 * Stage 2 - Guided Learning: Shows all items in a context group at once
 * Stage 3 - Quick Check: 2-question inline quiz per group
 * Stage 4 - Summary: Stars, XP, review terms, and next actions
 */

import { ttsService } from '../services/TTSService.js';
import { getTopicMeta } from './registry.js';

// ─── CONTEXT INTRO MAPS ──────────────────────────

const CONTEXT_INTROS = {
  cybersecurity: {
    authentication:
      'Authentication is the gatekeeper of digital security. These terms cover how systems verify your identity.',
    malware:
      'Malware is malicious software designed to damage or exploit systems. Learn the vocabulary of digital threats.',
    'threat-actors':
      'From hackers to nation-states, threat actors are the people and groups behind cyberattacks.',
    'network-security':
      'Network security protects data in transit. Master these terms to talk about firewalls, protocols, and defenses.',
    defense:
      'Defense-in-depth is a core cybersecurity philosophy. These terms describe the tools and strategies that keep systems safe.',
    cryptography:
      'Cryptography is the science of secret communication. Learn about encryption, hashing, and digital signatures.',
    general:
      'These foundational cybersecurity concepts form the bedrock of every security discussion.',
    'social-engineering':
      'Social engineering exploits human psychology rather than technical flaws. Phishing, pretexting, and more.',
    vulnerability:
      'Vulnerabilities are weaknesses that attackers exploit. Understanding them is the first step to patching them.',
    compliance:
      'Compliance ensures organizations follow security regulations and standards like GDPR, ISO 27001, and PCI DSS.',
  },
  linux: {
    cli: 'The command-line interface is where Linux power users live. Master these essential terminal terms.',
    'file-system':
      'Everything in Linux is a file. These terms cover the directory hierarchy and file operations.',
    permissions:
      'Linux file permissions control who can read, write, and execute. A critical concept for security.',
    processes:
      'Processes are running programs. Learn how Linux manages, monitors, and controls them.',
    networking:
      'Linux networking commands let you configure interfaces, troubleshoot connections, and manage services.',
    'package-management':
      'Package managers install, update, and remove software. Different distros use different tools.',
    system: 'System-level terms cover boot processes, kernel operations, and hardware interaction.',
    scripting:
      'Shell scripting automates repetitive tasks. These terms cover Bash scripting fundamentals.',
    'text-processing':
      'Linux excels at text processing with tools like grep, sed, and awk. Master the vocabulary.',
    administration:
      'System administration involves managing users, services, logs, and system configuration.',
  },
  python: {
    foundations: 'These core Python terms are the building blocks of every program you will write.',
    'data-types':
      'Python has dynamic typing with rich built-in data types. Strings, numbers, booleans, and more.',
    operations:
      'Operators and expressions are how Python processes data. Arithmetic, comparison, and logical operations.',
    'control-flow':
      'Control flow determines which code runs and when. Conditions, loops, and branching logic.',
    'data-structures':
      "Lists, dictionaries, sets, and tuples are Python's powerful built-in data structures.",
    functions:
      'Functions organize code into reusable blocks. Parameters, return values, and scope.',
    classes:
      "Classes define blueprints for objects. Python's object system is elegant and flexible.",
    oop: 'Object-oriented programming in Python: inheritance, polymorphism, encapsulation, and abstraction.',
    modules: 'Modules and packages organize Python code. Import, create, and distribute your own.',
    environment:
      'Virtual environments, pip, and project configuration. Essential for professional Python development.',
  },
  'software-dev': {
    basics:
      'These fundamental software development terms form the vocabulary every developer needs.',
    foundations:
      'These fundamental software development terms form the vocabulary every developer needs.',
    'version-control':
      'Version control tracks changes to code over time. Git is the modern standard.',
    testing:
      'Software testing ensures code works correctly. Unit tests, integration tests, and beyond.',
    patterns:
      'Design patterns are proven solutions to common problems. They make code more maintainable.',
    architecture:
      'Software architecture defines the high-level structure of systems. Microservices, monoliths, and more.',
    collaboration:
      'Software development is a team sport. Code reviews, pair programming, and agile practices.',
    devops:
      'DevOps bridges development and operations. CI/CD, containers, and infrastructure as code.',
    security:
      'Application security protects software from attacks. OWASP, authentication, and secure coding.',
    databases: 'Databases store and manage data. SQL, NoSQL, indexing, and query optimization.',
    apis: 'APIs define how software components communicate. REST, GraphQL, and API design principles.',
  },
};

const TOPIC_FALLBACK_INTROS = {
  cybersecurity:
    'Explore these cybersecurity concepts to strengthen your professional English vocabulary.',
  linux: 'Learn these Linux terms to communicate confidently in technical environments.',
  python: 'Master these Python programming terms to read documentation and discuss code fluently.',
  'software-dev': 'Build your software development vocabulary with these essential industry terms.',
};

const ENCOURAGING_CORRECT = [
  'Perfetto! / Perfect!',
  'Ottimo! / Great!',
  'Bravo/Brava!',
  'Esatto! / Exactly!',
  'Fantastico! / Fantastic!',
  'Ci sei! / You got it!',
];

const ENCOURAGING_WRONG = [
  'Quasi! / Almost!',
  'Ci sei vicino! / So close!',
  'Non mollare! / Keep going!',
  'Stai imparando! / You are learning!',
];

// ─── ENGINE CLASS ──────────────────────────────────

export class TopicLessonEngine {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.lesson = null;
    this.topicId = null;
    this.levelNum = null;
    this.contextGroups = [];
    this.currentGroupIndex = 0;
    this.groupStars = [];
    this.totalCorrect = 0;
    this.container = null;
  }

  /**
   * Entry point: called by TopicManager.openLesson()
   */
  start(lesson, topicId, levelNum) {
    this.lesson = lesson;
    this.topicId = topicId;
    this.levelNum = levelNum;
    this.currentGroupIndex = 0;
    this.totalCorrect = 0;
    this.container = document.getElementById('topic-lesson-content');

    // Group items by context
    this.contextGroups = this._buildContextGroups(lesson.items);
    this.groupStars = new Array(this.contextGroups.length).fill(0);

    // Update header
    const titleEl = document.getElementById('topic-lesson-title');
    const progressEl = document.getElementById('topic-lesson-progress');
    if (titleEl) titleEl.textContent = lesson.title;
    if (progressEl) progressEl.textContent = '';

    this.renderIntro(lesson, topicId);
  }

  // ─── STAGE 1: INTRODUCTION ────────────────────────

  renderIntro(lesson, topicId) {
    if (!this.container) return;

    const meta = getTopicMeta(topicId);
    const totalItems = lesson.items.length;
    const estimatedMinutes = Math.max(2, this.contextGroups.length * 2);
    const topicIntros = CONTEXT_INTROS[topicId] || {};
    const fallbackIntro =
      TOPIC_FALLBACK_INTROS[topicId] ||
      'Learn these technical terms to improve your professional English.';

    // Pick intro text from the first context group or fallback
    const firstContext = this.contextGroups.length > 0 ? this.contextGroups[0].context : '';
    const introText = topicIntros[firstContext] || fallbackIntro;

    const tagColors = [
      'var(--accent-primary)',
      'var(--success)',
      '#3b82f6',
      '#a855f7',
      '#ec4899',
      '#f59e0b',
    ];

    this.container.innerHTML = `
      <div class="lesson-engine">
        <div class="lesson-intro">
          <h2 class="lesson-intro-title">
            ${this.escapeHtml(lesson.title)}
          </h2>
          <p class="lesson-intro-subtitle">${this.escapeHtml(lesson.description)}</p>

          <div class="lesson-intro-tags">
            ${this.contextGroups
              .map(
                (group, i) => `
              <span class="lesson-intro-tag" style="--tag-color: ${tagColors[i % tagColors.length]}">
                ${this.escapeHtml(this._formatContextName(group.context))}
                <span class="lesson-intro-tag-count">${group.items.length}</span>
              </span>
            `
              )
              .join('')}
          </div>

          <div class="lesson-intro-meta">
            <span>${totalItems} termini / terms</span>
            <span>~${estimatedMinutes} min</span>
            <span>${this.contextGroups.length} gruppi / groups</span>
          </div>

          <p class="lesson-intro-text">${this.escapeHtml(introText)}</p>

          <button class="btn lesson-start-btn" onclick="window._topicLessonEngine.advanceToGroup(0)">
            Inizia / Start Learning
          </button>
        </div>
      </div>
    `;

    // Expose engine on window for onclick handlers
    window._topicLessonEngine = this;
  }

  // ─── STAGE 2: GUIDED LEARNING ─────────────────────

  renderContextGroup(groupIndex) {
    if (!this.container) return;
    this.currentGroupIndex = groupIndex;

    const group = this.contextGroups[groupIndex];
    if (!group) return;

    const meta = getTopicMeta(this.topicId);
    const topicColor = meta ? meta.color : 'var(--accent-primary)';

    // Update header progress
    const progressEl = document.getElementById('topic-lesson-progress');
    if (progressEl) {
      progressEl.textContent = `Gruppo ${groupIndex + 1}/${this.contextGroups.length}`;
    }

    const itemCardsHtml = group.items
      .map((item) => {
        let enrichmentHtml = '';

        if (item.command) {
          enrichmentHtml += `
            <div class="tech-enrichment tech-command">
              <span class="tech-label">Comando / Command:</span>
              <code>${this.escapeHtml(item.command)}</code>
            </div>
          `;
        }

        if (item.code) {
          enrichmentHtml += `
            <div class="tech-enrichment tech-code">
              <span class="tech-label">Codice / Code:</span>
              <pre><code>${this.escapeHtml(item.code)}</code></pre>
            </div>
          `;
        }

        if (item.tool) {
          enrichmentHtml += `
            <div class="tech-enrichment tech-tool">
              <span class="tech-label">Tool:</span>
              <span class="tech-tool-badge">${this.escapeHtml(item.tool)}</span>
            </div>
          `;
        }

        if (item.note) {
          enrichmentHtml += `
            <div class="tech-enrichment tech-note">
              <span class="tech-label">Nota:</span>
              <span>${this.escapeHtml(item.note)}</span>
            </div>
          `;
        }

        const ttsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(item.english) : '';

        return `
          <div class="context-item-card">
            <div class="context-item-main">
              <div class="context-item-english">${this.escapeHtml(item.english)} ${ttsBtn}</div>
              <div class="context-item-italian">${this.escapeHtml(item.italian)}</div>
            </div>
            <div class="context-item-pronunciation">
              ${this.escapeHtml(item.pronunciation)}${item.phonetic ? ` (${this.escapeHtml(item.phonetic)})` : ''}
            </div>
            ${item.example ? `<div class="context-item-example">"${this.escapeHtml(item.example)}"</div>` : ''}
            ${enrichmentHtml}
          </div>
        `;
      })
      .join('');

    this.container.innerHTML = `
      <div class="lesson-engine">
        <div class="context-group" style="--topic-color: ${topicColor}">
          <div class="context-group-header">
            <span class="context-group-name">${this.escapeHtml(this._formatContextName(group.context))}</span>
            <span class="context-progress">Gruppo ${groupIndex + 1} di ${this.contextGroups.length}</span>
          </div>
          <div class="context-group-items">
            ${itemCardsHtml}
          </div>
          <div class="context-group-actions">
            <button class="btn lesson-start-btn" onclick="window._topicLessonEngine.advanceToQuickCheck(${groupIndex})">
              Continua / Continue
            </button>
          </div>
        </div>
      </div>
    `;

    ttsService.attachTTSListeners(this.container);
    window._topicLessonEngine = this;
  }

  // ─── STAGE 3: QUICK CHECK ─────────────────────────

  renderQuickCheck(groupIndex) {
    if (!this.container) return;
    this.currentGroupIndex = groupIndex;

    const group = this.contextGroups[groupIndex];
    if (!group) return;

    // Update header
    const progressEl = document.getElementById('topic-lesson-progress');
    if (progressEl) {
      progressEl.textContent = `Verifica - Gruppo ${groupIndex + 1}/${this.contextGroups.length}`;
    }

    // Build 2 questions
    const questions = this._buildQuickCheckQuestions(groupIndex);

    this._currentQuestions = questions;
    this._currentQuestionIndex = 0;
    this._groupCorrectCount = 0;

    this._renderQuestion(0);
  }

  _renderQuestion(qIndex) {
    if (!this.container) return;

    const question = this._currentQuestions[qIndex];
    if (!question) return;

    const qNum = qIndex + 1;
    const total = this._currentQuestions.length;

    let questionHtml = '';

    if (question.type === 'recognition') {
      questionHtml = `
        <div class="quick-check">
          <div class="quick-check-header">
            <span class="quick-check-label">Domanda ${qNum} di ${total}</span>
            <span class="quick-check-type">Riconoscimento Rapido / Rapid Recognition</span>
          </div>
          <div class="quick-check-question">
            Qual e' la traduzione italiana di:
            <strong>${this.escapeHtml(question.term)}</strong>
          </div>
          <div class="quick-check-options">
            ${question.options
              .map(
                (opt, i) => `
              <button class="quick-check-option" data-index="${i}" data-correct="${opt === question.correct ? 'true' : 'false'}"
                      onclick="window._topicLessonEngine.handleQuickCheckAnswer(${qIndex}, ${i})">
                ${this.escapeHtml(opt)}
              </button>
            `
              )
              .join('')}
          </div>
          <div class="quick-check-feedback" id="qc-feedback"></div>
        </div>
      `;
    } else if (question.type === 'listen') {
      questionHtml = `
        <div class="quick-check">
          <div class="quick-check-header">
            <span class="quick-check-label">Domanda ${qNum} di ${total}</span>
            <span class="quick-check-type">Ascolta e Abbina / Listen & Match</span>
          </div>
          <div class="quick-check-question">
            Ascolta e scegli la parola pronunciata:
            <button class="btn btn-secondary quick-check-listen-btn" onclick="window._topicLessonEngine.playQuickCheckAudio(${qIndex})">
              Ascolta / Listen
            </button>
          </div>
          <div class="quick-check-options">
            ${question.options
              .map(
                (opt, i) => `
              <button class="quick-check-option" data-index="${i}" data-correct="${opt === question.correct ? 'true' : 'false'}"
                      onclick="window._topicLessonEngine.handleQuickCheckAnswer(${qIndex}, ${i})">
                ${this.escapeHtml(opt)}
              </button>
            `
              )
              .join('')}
          </div>
          <div class="quick-check-feedback" id="qc-feedback"></div>
        </div>
      `;
    }

    this.container.innerHTML = `
      <div class="lesson-engine">
        ${questionHtml}
      </div>
    `;

    // Auto-play audio for listen questions
    if (question.type === 'listen') {
      setTimeout(() => this.playQuickCheckAudio(qIndex), 400);
    }

    window._topicLessonEngine = this;
  }

  playQuickCheckAudio(qIndex) {
    const question = this._currentQuestions[qIndex];
    if (question && question.audioTerm) {
      ttsService.speak(question.audioTerm);
    }
  }

  handleQuickCheckAnswer(qIndex, optionIndex) {
    const question = this._currentQuestions[qIndex];
    if (!question || question.answered) return;

    question.answered = true;

    const selectedOption = question.options[optionIndex];
    const isCorrect = selectedOption === question.correct;

    if (isCorrect) {
      this._groupCorrectCount++;
      this.totalCorrect++;
    }

    // Highlight buttons
    const buttons = this.container.querySelectorAll('.quick-check-option');
    buttons.forEach((btn) => {
      btn.disabled = true;
      const idx = parseInt(btn.dataset.index, 10);
      if (question.options[idx] === question.correct) {
        btn.classList.add('correct');
      }
      if (idx === optionIndex && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    // Show feedback
    const feedbackEl = this.container.querySelector('#qc-feedback');
    if (feedbackEl) {
      if (isCorrect) {
        const msg = ENCOURAGING_CORRECT[Math.floor(Math.random() * ENCOURAGING_CORRECT.length)];
        feedbackEl.innerHTML = `<span class="qc-feedback-correct">${msg}</span>`;
      } else {
        const msg = ENCOURAGING_WRONG[Math.floor(Math.random() * ENCOURAGING_WRONG.length)];
        feedbackEl.innerHTML = `<span class="qc-feedback-wrong">${msg} La risposta corretta: <strong>${this.escapeHtml(question.correct)}</strong></span>`;
      }
      feedbackEl.classList.add('visible');
    }

    // Auto-advance after delay
    setTimeout(() => {
      const nextQIndex = qIndex + 1;
      if (nextQIndex < this._currentQuestions.length) {
        this._currentQuestionIndex = nextQIndex;
        this._renderQuestion(nextQIndex);
      } else {
        // Save stars for this group (max 2 per group)
        this.groupStars[this.currentGroupIndex] = this._groupCorrectCount;

        // Advance to next group or summary
        const nextGroupIndex = this.currentGroupIndex + 1;
        if (nextGroupIndex < this.contextGroups.length) {
          this.renderContextGroup(nextGroupIndex);
        } else {
          this.renderSummary();
        }
      }
    }, 1500);
  }

  // ─── STAGE 4: SUMMARY ─────────────────────────────

  renderSummary() {
    if (!this.container) return;

    // Update header
    const titleEl = document.getElementById('topic-lesson-title');
    const progressEl = document.getElementById('topic-lesson-progress');
    if (titleEl) titleEl.textContent = 'Completata! / Completed!';
    if (progressEl) progressEl.textContent = '';

    // Calculate overall stars
    const totalPossibleStars = this.contextGroups.length * 2;
    const earnedStars = this.groupStars.reduce((sum, s) => sum + s, 0);
    const avgStars = totalPossibleStars > 0 ? earnedStars / this.contextGroups.length : 0;

    let overallStars = 1; // always at least 1 for completing
    if (avgStars >= 1.8) overallStars = 3;
    else if (avgStars >= 1.0) overallStars = 2;

    // XP calculation
    const xpFromCorrect = this.totalCorrect * 10;
    const completionBonus = 20;
    const perfectBonus = this.totalCorrect === totalPossibleStars ? 15 : 0;
    const totalXP = xpFromCorrect + completionBonus + perfectBonus;

    // Items from groups scored 0 stars
    const reviewItems = [];
    this.groupStars.forEach((stars, idx) => {
      if (stars === 0 && this.contextGroups[idx]) {
        reviewItems.push(...this.contextGroups[idx].items);
      }
    });

    const itemCount = this.lesson.items.length;
    const topicId = this.topicId;
    const levelNum = this.levelNum;
    const lessonId = this.lesson.id;

    // Save progress
    this.progressManager.updateTopicLessonStars(topicId, levelNum, lessonId, overallStars);
    this.progressManager.completeTopicLesson(topicId, levelNum, lessonId);
    this.progressManager.incrementDailyLessons();
    this.progressManager.incrementDailyWords(itemCount);
    this.progressManager.addXP(totalXP);

    // Ingest vocabulary into SRS
    if (window.srsManager && this.lesson?.items) {
      const words = this.lesson.items
        .filter((item) => item.english && item.italian)
        .map((item) => ({
          english: item.english,
          italian: item.italian,
          pronunciation: item.pronunciation || '',
          example: item.example || '',
        }));
      const source = `topic-${topicId}-${levelNum}-${lessonId}`;
      window.srsManager.addWords(words, source);
    }

    // Render summary
    const starsFull = '\u2B50';
    const starsEmpty = '\u2606';

    const groupResultsHtml = this.contextGroups
      .map((group, idx) => {
        const s = this.groupStars[idx];
        const starDisplay = starsFull.repeat(s) + starsEmpty.repeat(2 - s);
        return `
          <div class="summary-group-item">
            <span class="summary-group-name">${this.escapeHtml(this._formatContextName(group.context))}</span>
            <span class="summary-group-stars">${starDisplay}</span>
          </div>
        `;
      })
      .join('');

    const overallStarDisplay = starsFull.repeat(overallStars) + starsEmpty.repeat(3 - overallStars);

    let reviewHtml = '';
    if (reviewItems.length > 0) {
      reviewHtml = `
        <div class="summary-review">
          <h4>Termini da Ripassare / Terms to Review</h4>
          <ul>
            ${reviewItems
              .map(
                (item) =>
                  `<li><strong>${this.escapeHtml(item.english)}</strong> - ${this.escapeHtml(item.italian)}</li>`
              )
              .join('')}
          </ul>
        </div>
      `;
    }

    this.container.innerHTML = `
      <div class="lesson-engine">
        <div class="lesson-summary">
          <div class="summary-header">
            <div class="summary-icon">&#127881;</div>
            <h3>Lezione Completata! / Lesson Completed!</h3>
            <p class="summary-lesson-title">${this.escapeHtml(this.lesson.title)}</p>
          </div>

          <div class="summary-overall">
            <div class="summary-overall-stars">${overallStarDisplay}</div>
            <div class="summary-overall-label">${overallStars === 3 ? 'Eccellente! / Excellent!' : overallStars === 2 ? 'Bene! / Good!' : 'Completata / Completed'}</div>
          </div>

          <div class="summary-stats">
            <div class="summary-stat">
              <span class="summary-stat-value">${itemCount}</span>
              <span class="summary-stat-label">Termini / Terms</span>
            </div>
            <div class="summary-stat">
              <span class="summary-stat-value">+${totalXP}</span>
              <span class="summary-stat-label">XP</span>
            </div>
            <div class="summary-stat">
              <span class="summary-stat-value">${this.totalCorrect}/${this.contextGroups.length * 2}</span>
              <span class="summary-stat-label">Risposte / Answers</span>
            </div>
          </div>

          <div class="summary-groups">
            <h4>Risultati per Gruppo / Group Results</h4>
            ${groupResultsHtml}
          </div>

          ${reviewHtml}

          <div class="summary-actions">
            <button class="btn btn-secondary" onclick="topicManager.openLevel('${topicId}', ${levelNum})">
              Torna al Livello / Back to Level
            </button>
            <button class="btn lesson-start-btn" onclick="topicManager.showModeSelector('${topicId}', ${levelNum})">
              Pratica Ora / Practice Now
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ─── NAVIGATION HELPERS ────────────────────────────

  advanceToGroup(groupIndex) {
    this.renderContextGroup(groupIndex);
  }

  advanceToQuickCheck(groupIndex) {
    this.renderQuickCheck(groupIndex);
  }

  // ─── INTERNAL HELPERS ──────────────────────────────

  /**
   * Group lesson items by their context field
   */
  _buildContextGroups(items) {
    const groupMap = new Map();

    items.forEach((item) => {
      const ctx = item.context || 'general';
      if (!groupMap.has(ctx)) {
        groupMap.set(ctx, []);
      }
      groupMap.get(ctx).push(item);
    });

    return Array.from(groupMap.entries()).map(([context, contextItems]) => ({
      context,
      items: contextItems,
    }));
  }

  /**
   * Build 2 quick check questions for a context group
   */
  _buildQuickCheckQuestions(groupIndex) {
    const group = this.contextGroups[groupIndex];
    if (!group || group.items.length === 0) return [];

    const questions = [];
    const allItems = this.lesson.items;

    // Question 1: Rapid Recognition (English -> Italian)
    const q1Item = group.items[Math.floor(Math.random() * group.items.length)];
    const q1Distractors = this._getDistractors(q1Item, allItems, 'italian', 3);
    const q1Options = this._shuffle([q1Item.italian, ...q1Distractors]);

    questions.push({
      type: 'recognition',
      term: q1Item.english,
      correct: q1Item.italian,
      options: q1Options,
      answered: false,
    });

    // Question 2: Listen & Match (TTS plays English, pick which term)
    // Pick a different item if possible
    let q2Item = q1Item;
    if (group.items.length > 1) {
      const others = group.items.filter((it) => it !== q1Item);
      q2Item = others[Math.floor(Math.random() * others.length)];
    }
    const q2Distractors = this._getDistractors(q2Item, allItems, 'english', 3);
    const q2Options = this._shuffle([q2Item.english, ...q2Distractors]);

    questions.push({
      type: 'listen',
      audioTerm: q2Item.english,
      correct: q2Item.english,
      options: q2Options,
      answered: false,
    });

    return questions;
  }

  /**
   * Get distractor options from the full item pool
   */
  _getDistractors(targetItem, allItems, field, count) {
    const candidates = allItems
      .filter((it) => it !== targetItem && it[field] !== targetItem[field])
      .map((it) => it[field]);

    // Deduplicate
    const unique = [...new Set(candidates)];

    // Shuffle and take count
    const shuffled = this._shuffle(unique);
    return shuffled.slice(0, count);
  }

  /**
   * Shuffle an array (Fisher-Yates)
   */
  _shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /**
   * Format context name for display
   */
  _formatContextName(context) {
    return context.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  /**
   * Escape HTML entities
   */
  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
