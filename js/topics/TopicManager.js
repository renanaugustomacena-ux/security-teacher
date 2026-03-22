/**
 * TOPIC MANAGER - FlowLearn
 * =========================
 *
 * Manages the Technical Topics section:
 * - Topics Hub (grid of 4 topic cards with star counts)
 * - Vertical learning path per topic (12 levels)
 * - Inline level expansion with lesson cards + boss button
 * - Item-by-item learning with technical enrichments
 *
 * Lazy-loads topic data via dynamic import().
 */

import { topicsRegistry, getTopicMeta } from './registry.js';
import { ttsService } from '../services/TTSService.js';
import { TopicLessonEngine } from './TopicLessonEngine.js';

export class TopicManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.dataCache = {};
    this.currentTopicId = null;
    this.currentLevel = null;
    this.currentLesson = null;
    this.currentItemIndex = 0;
    this.expandedLevel = null; // Track which level is currently expanded
  }

  init() {
    this.renderTopicsHub();
  }

  // ─── DATA LOADING ──────────────────────────────

  async loadTopicData(topicId) {
    if (this.dataCache[topicId]) {
      return this.dataCache[topicId];
    }

    try {
      const module = await import(`./data/${topicId}.js`);
      this.dataCache[topicId] = module.default;
      return module.default;
    } catch (err) {
      console.error(`Failed to load topic data for "${topicId}":`, err);
      return null;
    }
  }

  // ─── STAR HELPERS ─────────────────────────────

  /**
   * Render star icons (filled/empty) as HTML
   * @param {number} count - Number of filled stars
   * @param {number} max - Total stars to display
   * @returns {string} HTML string
   */
  renderStars(count, max = 3) {
    let html = '';
    for (let i = 0; i < max; i++) {
      html += `<span class="star ${i < count ? 'star-filled' : 'star-empty'}">${i < count ? '\u2605' : '\u2606'}</span>`;
    }
    return html;
  }

  /**
   * Calculate stars for a lesson based on completion.
   * Simple heuristic: completed = 3 stars (future: score-based).
   */
  getLessonStars(topicId, levelNum, lessonId) {
    const isCompleted = this.progressManager.isTopicLessonCompleted(topicId, levelNum, lessonId);
    return isCompleted ? 3 : 0;
  }

  /**
   * Calculate stars for an entire level (sum of lesson stars).
   */
  getLevelStars(topicId, levelNum, lessons) {
    let total = 0;
    for (const lesson of lessons) {
      total += this.getLessonStars(topicId, levelNum, lesson.id);
    }
    return total;
  }

  /**
   * Get total stars across all levels for a topic.
   */
  getTopicTotalStars(topicId, data) {
    if (!data || !data.levels) return { earned: 0, possible: 0 };
    let earned = 0;
    let possible = 0;
    for (const levelKey of Object.keys(data.levels)) {
      const level = data.levels[levelKey];
      possible += level.lessons.length * 3;
      earned += this.getLevelStars(topicId, Number(levelKey), level.lessons);
    }
    return { earned, possible };
  }

  /**
   * Get total word count across all levels for a topic.
   */
  getTopicTotalWords(data) {
    if (!data || !data.levels) return 0;
    let total = 0;
    for (const levelKey of Object.keys(data.levels)) {
      const level = data.levels[levelKey];
      for (const lesson of level.lessons) {
        total += lesson.items.length;
      }
    }
    return total;
  }

  // ─── TOPICS HUB ────────────────────────────────

  renderTopicsHub() {
    const hub = document.getElementById('topics-hub');
    if (!hub) return;

    hub.innerHTML = `
      <div class="topics-grid">
        ${topicsRegistry
          .map((topic) => {
            const stats = this.progressManager.getTopicStats(topic.id);
            const completedLevels = stats ? stats.completedLevels.length : 0;
            // Calculate total stars from cached data if available
            const cachedData = this.dataCache[topic.id];
            let starInfo = { earned: 0, possible: 0 };
            if (cachedData) {
              starInfo = this.getTopicTotalStars(topic.id, cachedData);
            }
            const starDisplay =
              starInfo.earned > 0
                ? `<span class="topic-card-stars">\u2605 ${starInfo.earned}</span>`
                : '';
            return `
            <div class="topic-card" style="--topic-color: ${topic.color}" onclick="topicManager.openTopic('${topic.id}')">
              <div class="topic-card-icon">${topic.icon}</div>
              <h3 class="topic-card-title">${topic.title}</h3>
              <p class="topic-card-title-it">${topic.titleIt}</p>
              <p class="topic-card-desc">${topic.descriptionIt}</p>
              <div class="topic-card-progress">
                <div class="topic-progress-bar">
                  <div class="topic-progress-fill" style="width: ${Math.round((completedLevels / topic.levelCount) * 100)}%"></div>
                </div>
                <div class="topic-progress-row">
                  <span class="topic-progress-text">${completedLevels}/${topic.levelCount} livelli</span>
                  ${starDisplay}
                </div>
              </div>
              <button class="btn btn-primary topic-card-btn">${completedLevels > 0 ? 'Continua / Continue' : 'Inizia / Start'} \u2192</button>
            </div>
          `;
          })
          .join('')}
      </div>
    `;

    // Ensure correct view state
    this.showView('hub');
  }

  // ─── TOPIC DETAIL (VERTICAL LEARNING PATH) ───

  async openTopic(topicId) {
    const meta = getTopicMeta(topicId);
    if (!meta) return;

    this.currentTopicId = topicId;
    this.expandedLevel = null;

    // Show loading state
    const detail = document.getElementById('topic-detail');
    if (detail) {
      detail.innerHTML =
        '<div class="text-center" style="padding: 2rem;">Caricamento... / Loading...</div>';
    }
    this.showView('detail');

    // Load data
    const data = await this.loadTopicData(topicId);
    if (!data) {
      if (detail) {
        detail.innerHTML =
          '<div class="text-center" style="padding: 2rem;">Errore nel caricamento / Loading error</div>';
      }
      return;
    }

    this.renderLevels(meta, data);
  }

  renderLevels(meta, data) {
    const detail = document.getElementById('topic-detail');
    if (!detail) return;

    const stats = this.progressManager.getTopicStats(meta.id);
    const levelKeys = Object.keys(data.levels).sort((a, b) => Number(a) - Number(b));
    const completedLevelsCount = stats ? stats.completedLevels.length : 0;
    const percent = Math.round((completedLevelsCount / meta.levelCount) * 100);

    // Calculate aggregate stats
    const starInfo = this.getTopicTotalStars(meta.id, data);
    const totalWords = this.getTopicTotalWords(data);
    const xp = this.progressManager.getXP();
    const learnedWords = stats ? stats.wordsLearned || 0 : 0;

    detail.innerHTML = `
      <button class="btn btn-secondary topic-back-btn" onclick="topicManager.backToHub()">
        \u2190 Indietro / Back
      </button>

      <div class="topic-dashboard-header" style="--topic-color: ${meta.color}">
        <div class="topic-dash-icon">${meta.icon}</div>
        <div class="topic-dash-info">
          <h2>${meta.title}</h2>
          <div class="topic-dash-stats">
            <span>${learnedWords}/${totalWords} words</span> \u00B7
            <span>\u2605 ${starInfo.earned} stars</span> \u00B7
            <span>${xp.total} XP</span>
          </div>
        </div>
        <div class="topic-progress-ring">
          <svg viewBox="0 0 36 36" class="progress-ring">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--glass-border)" stroke-width="3"/>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--accent-primary)" stroke-width="3"
              stroke-dasharray="${percent}, 100" stroke-linecap="round" transform="rotate(-90 18 18)"/>
            <text x="18" y="20" text-anchor="middle" class="progress-ring-text">${percent}%</text>
          </svg>
        </div>
        <button class="btn btn-primary" onclick="topicManager.continueLearning('${meta.id}')">
          Continua / Continue \u2192
        </button>
      </div>

      <div class="level-path" style="--topic-color: ${meta.color}">
        ${levelKeys
          .map((levelKey) => {
            const level = data.levels[levelKey];
            const lvlNum = Number(levelKey);
            const isUnlocked = this.progressManager.isTopicLevelUnlocked(meta.id, lvlNum);
            const isCompleted = stats && stats.completedLevels.includes(lvlNum);
            const totalItems = level.lessons.reduce((sum, l) => sum + l.items.length, 0);
            const completedLessons = level.lessons.filter((l) =>
              this.progressManager.isTopicLessonCompleted(meta.id, lvlNum, l.id)
            ).length;
            const levelStars = this.getLevelStars(meta.id, lvlNum, level.lessons);
            const maxStars = level.lessons.length * 3;
            const isMastered = isCompleted && levelStars === maxStars;
            const allLessonsComplete = completedLessons === level.lessons.length;

            let stateClass = 'level-locked';
            if (isMastered) stateClass = 'level-mastered';
            else if (isCompleted) stateClass = 'level-completed';
            else if (isUnlocked) stateClass = 'level-active';

            const isFirst = lvlNum === Number(levelKeys[0]);

            return `
            <div class="level-node ${stateClass}" data-level="${lvlNum}"
                 onclick="${isUnlocked ? `topicManager.toggleLevelExpansion('${meta.id}', ${lvlNum})` : `topicManager.showLocked(${lvlNum})`}">
              ${!isFirst ? '<div class="level-node-connector"></div>' : ''}
              <div class="level-node-circle">${lvlNum}</div>
              <div class="level-node-info">
                <div class="level-node-name">${level.name}</div>
                <div class="level-node-stars">${this.renderStars(Math.round(levelStars / level.lessons.length), 3)}</div>
                <div class="level-node-meta">${level.lessons.length} lessons \u00B7 ${totalItems} items</div>
              </div>
              ${allLessonsComplete ? '<div class="level-node-boss">\u{1F451}</div>' : ''}
            </div>
            <div class="level-expansion" id="level-expand-${lvlNum}" style="display:none">
              <!-- Populated dynamically on toggle -->
            </div>
          `;
          })
          .join('')}
      </div>
    `;
  }

  // ─── INLINE LEVEL EXPANSION ─────────────────────

  async toggleLevelExpansion(topicId, levelNum) {
    const data = await this.loadTopicData(topicId);
    if (!data || !data.levels[levelNum]) return;

    const meta = getTopicMeta(topicId);
    const level = data.levels[levelNum];
    const expansionEl = document.getElementById(`level-expand-${levelNum}`);
    if (!expansionEl) return;

    // If this level is already expanded, collapse it
    if (this.expandedLevel === levelNum) {
      expansionEl.style.display = 'none';
      expansionEl.innerHTML = '';
      this.expandedLevel = null;
      return;
    }

    // Collapse previously expanded level
    if (this.expandedLevel !== null) {
      const prevEl = document.getElementById(`level-expand-${this.expandedLevel}`);
      if (prevEl) {
        prevEl.style.display = 'none';
        prevEl.innerHTML = '';
      }
    }

    this.expandedLevel = levelNum;

    // Check if all lessons in this level are complete (for boss button)
    const allLessonsComplete = level.lessons.every((l) =>
      this.progressManager.isTopicLessonCompleted(topicId, levelNum, l.id)
    );

    expansionEl.innerHTML = `
      <div class="level-expansion-inner" style="--topic-color: ${meta.color}">
        ${level.lessons
          .map((lesson, idx) => {
            const isCompleted = this.progressManager.isTopicLessonCompleted(
              topicId,
              levelNum,
              lesson.id
            );
            const stars = this.getLessonStars(topicId, levelNum, lesson.id);
            return `
            <div class="lesson-card-mini ${isCompleted ? 'completed' : ''}"
                 onclick="event.stopPropagation(); topicManager.openLesson('${topicId}', ${levelNum}, '${lesson.id}')">
              <div class="lesson-card-mini-num">${idx + 1}</div>
              <div class="lesson-card-mini-info">
                <div class="lesson-card-mini-title">${lesson.title}</div>
                <div class="lesson-card-mini-stars">${this.renderStars(stars, 3)}</div>
              </div>
              <div class="lesson-card-mini-status">${isCompleted ? '\u2705' : ''}</div>
            </div>
          `;
          })
          .join('')}
        ${
          allLessonsComplete
            ? `
          <button class="boss-btn" onclick="event.stopPropagation(); topicManager.startBossChallenge('${topicId}', ${levelNum})">
            \u{1F451} Sfida Boss / Boss Challenge
          </button>
        `
            : ''
        }
        <button class="btn btn-primary level-practice-btn" onclick="event.stopPropagation(); topicManager.practiceLevel('${topicId}', ${levelNum})">
          \u270D\uFE0F Pratica Livello / Practice Level
        </button>
      </div>
    `;
    expansionEl.style.display = 'block';
  }

  /**
   * Start boss challenge for a level (wired to external module).
   */
  startBossChallenge(topicId, levelNum) {
    if (window.topicBossChallenge && window.topicBossChallenge.start) {
      window.topicBossChallenge.start(topicId, levelNum);
    } else {
      // Fallback: practice the level
      this.practiceLevel(topicId, levelNum);
    }
  }

  // ─── CONTINUE LEARNING ──────────────────────────

  async continueLearning(topicId) {
    const data = await this.loadTopicData(topicId);
    if (!data) return;

    const levelKeys = Object.keys(data.levels).sort((a, b) => Number(a) - Number(b));

    for (const levelKey of levelKeys) {
      const lvlNum = Number(levelKey);
      const isUnlocked = this.progressManager.isTopicLevelUnlocked(topicId, lvlNum);
      if (!isUnlocked) continue;

      const level = data.levels[levelKey];
      for (const lesson of level.lessons) {
        if (!this.progressManager.isTopicLessonCompleted(topicId, lvlNum, lesson.id)) {
          this.openLesson(topicId, lvlNum, lesson.id);
          return;
        }
      }
    }

    // All complete - show message
    const detail = document.getElementById('topic-detail');
    if (detail) {
      const existing = detail.querySelector('.locked-notice');
      if (existing) existing.remove();

      const notice = document.createElement('div');
      notice.className = 'locked-notice';
      notice.style.borderColor = 'var(--success)';
      notice.style.color = 'var(--success)';
      notice.innerHTML = '\u{1F389} Tutto completato! / All complete!';
      detail.prepend(notice);
      setTimeout(() => notice.remove(), 3000);
    }
  }

  // ─── LEVEL DETAIL (LESSONS) — kept for backward compat ─

  async openLevel(topicId, levelNum) {
    // For backward compatibility (called from TopicPracticeManager, completion screen, etc.)
    // Open the topic dashboard and expand the requested level
    const meta = getTopicMeta(topicId);
    if (!meta) return;

    this.currentTopicId = topicId;
    this.currentLevel = levelNum;

    const data = await this.loadTopicData(topicId);
    if (!data) return;

    // If we're not already on the detail view, render it
    this.showView('detail');
    this.renderLevels(meta, data);

    // Expand the requested level after a tick (DOM needs to be ready)
    setTimeout(() => {
      this.toggleLevelExpansion(topicId, levelNum);
    }, 50);
  }

  // ─── LESSON VIEW (ITEM BY ITEM) ───────────────

  async openLesson(topicId, levelNum, lessonId) {
    const data = await this.loadTopicData(topicId);
    if (!data || !data.levels[levelNum]) return;

    const level = data.levels[levelNum];
    const lesson = level.lessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    this.currentTopicId = topicId;
    this.currentLevel = levelNum;
    this.currentLesson = lesson;
    this.currentItemIndex = 0;

    this.showView('lesson');

    // Use the stage-based lesson engine instead of flat item-by-item view
    const engine = new TopicLessonEngine(this.progressManager);
    engine.start(lesson, topicId, levelNum);
  }

  renderLessonItem() {
    const container = document.getElementById('topic-lesson-content');
    if (!container || !this.currentLesson) return;

    const item = this.currentLesson.items[this.currentItemIndex];
    const total = this.currentLesson.items.length;

    // Update header
    const titleEl = document.getElementById('topic-lesson-title');
    const progressEl = document.getElementById('topic-lesson-progress');
    if (titleEl) titleEl.textContent = this.currentLesson.title;
    if (progressEl) progressEl.textContent = `${this.currentItemIndex + 1}/${total}`;

    // Build item HTML with technical enrichments
    let enrichmentHtml = '';

    if (item.command) {
      enrichmentHtml += `
        <div class="tech-enrichment tech-command">
          <span class="tech-label">\u{1F4BB} Comando / Command:</span>
          <code>${this.escapeHtml(item.command)}</code>
        </div>
      `;
    }

    if (item.code) {
      enrichmentHtml += `
        <div class="tech-enrichment tech-code">
          <span class="tech-label">\u{1F40D} Codice / Code:</span>
          <pre><code>${this.escapeHtml(item.code)}</code></pre>
        </div>
      `;
    }

    if (item.tool) {
      enrichmentHtml += `
        <div class="tech-enrichment tech-tool">
          <span class="tech-label">\u{1F527} Tool:</span>
          <span class="tech-tool-badge">${this.escapeHtml(item.tool)}</span>
        </div>
      `;
    }

    if (item.note) {
      enrichmentHtml += `
        <div class="tech-enrichment tech-note">
          <span class="tech-label">\u{1F4A1} Nota:</span>
          <span>${this.escapeHtml(item.note)}</span>
        </div>
      `;
    }

    const ttsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(item.english) : '';

    container.innerHTML = `
      <div class="lesson-item-card topic-item-card">
        <div class="item-pair">
          <div class="item-english">${this.escapeHtml(item.english)} ${ttsBtn}</div>
          <div class="item-separator"></div>
          <div class="item-italian">${this.escapeHtml(item.italian)}</div>
        </div>
        <div class="item-pronunciation">
          Pronuncia: <strong>${this.escapeHtml(item.pronunciation)}</strong>${item.phonetic ? ` (${this.escapeHtml(item.phonetic)})` : ''}
        </div>
        ${item.example ? `<div class="item-example">\u{1F4DD} "${this.escapeHtml(item.example)}"</div>` : ''}
        ${enrichmentHtml}
      </div>
      <div class="lesson-nav-buttons">
        <button class="btn btn-secondary" onclick="topicManager.prevItem()" ${this.currentItemIndex === 0 ? 'disabled' : ''}>\u2190 Prec. / Prev</button>
        <button class="btn btn-primary" onclick="topicManager.nextItem()">${this.currentItemIndex === total - 1 ? 'Completa / Complete' : 'Prossimo / Next \u2192'}</button>
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
    this.progressManager.completeTopicLesson(
      this.currentTopicId,
      this.currentLevel,
      this.currentLesson.id
    );

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
      const source = `topic-${this.currentTopicId}-${this.currentLevel}-${this.currentLesson.id}`;
      window.srsManager.addWords(words, source);
    }

    const container = document.getElementById('topic-lesson-content');
    if (!container) return;

    const wordCount = this.currentLesson.items.length;
    const topicId = this.currentTopicId;
    const levelNum = this.currentLevel;

    container.innerHTML = `
      <div class="lesson-completion">
        <div class="completion-icon">\u{1F389}</div>
        <h3>Lezione Completata! / Lesson Completed!</h3>
        <p class="completion-detail">${this.escapeHtml(this.currentLesson.title)}</p>
        <p class="completion-words">+${wordCount} termini tecnici imparati / technical terms learned</p>
        <div class="completion-actions">
          <button class="btn btn-secondary" onclick="topicManager.openLevel('${topicId}', ${levelNum})">
            \u2190 Torna al Livello / Back to Level
          </button>
          <button class="btn btn-primary" onclick="topicManager.showModeSelector('${topicId}', ${levelNum})">
            \u270D\uFE0F Pratica Ora / Practice Now
          </button>
        </div>
      </div>
    `;

    // Reset lesson view state for back navigation
    document.getElementById('topic-lesson-title').textContent = 'Completata!';
    document.getElementById('topic-lesson-progress').textContent = '';
  }

  // ─── PRACTICE ──────────────────────────────────

  async practiceLevel(topicId, levelNum) {
    this.currentTopicId = topicId;
    this.currentLevel = levelNum;
    this.showView('lesson');
    await this.showModeSelector(topicId, levelNum);
  }

  async showModeSelector(topicId, levelNum) {
    const data = await this.loadTopicData(topicId);
    if (!data || !data.levels[levelNum]) return;

    const level = data.levels[levelNum];
    let pool = [];
    level.lessons.forEach((lesson) => {
      pool = pool.concat(lesson.items);
    });

    const hasExample = pool.some((item) => item.example);
    const hasCommand = pool.some((item) => item.command);
    const hasCode = pool.some((item) => item.code);
    const hasEnglishItalian = pool.some((item) => item.english && item.italian);

    const modes = [
      {
        id: 'listening',
        name: 'Ascolto / Listening',
        desc: 'Scegli la traduzione corretta',
        icon: '\u{1F442}',
        enabled: hasEnglishItalian,
      },
      {
        id: 'writing',
        name: 'Scrittura / Writing',
        desc: 'Scrivi la traduzione',
        icon: '\u270F\uFE0F',
        enabled: hasEnglishItalian,
      },
      {
        id: 'matching',
        name: 'Abbinamento / Matching',
        desc: 'Abbina termini e traduzioni',
        icon: '\u{1F517}',
        enabled: hasEnglishItalian,
      },
      {
        id: 'fillblank',
        name: 'Completa / Fill Blank',
        desc: 'Completa la frase',
        icon: '\u{1F4DD}',
        enabled: hasExample,
      },
      {
        id: 'sentence',
        name: 'Ricostruisci / Sentence',
        desc: 'Ordina le parole',
        icon: '\u{1F9E9}',
        enabled: hasExample,
      },
      {
        id: 'comprehension',
        name: 'Comprensione / Comprehension',
        desc: 'Leggi e rispondi',
        icon: '\u{1F4D6}',
        enabled: hasExample,
      },
      {
        id: 'scenario',
        name: 'Scenario / Dialogue',
        desc: 'Completa il dialogo situazionale',
        icon: '\u{1F4AC}',
        enabled: hasExample && hasEnglishItalian,
      },
      {
        id: 'context',
        name: 'Contesto / Context',
        desc: 'In quale ambito si usa?',
        icon: '\u{1F3AF}',
        enabled: hasEnglishItalian,
      },
      {
        id: 'command',
        name: 'Comando / Command',
        desc: 'Scrivi il comando corretto',
        icon: '\u{1F4BB}',
        enabled: hasCommand,
      },
      {
        id: 'codeoutput',
        name: 'Code Output',
        desc: 'Che concetto dimostra il codice?',
        icon: '\u{1F40D}',
        enabled: hasCode,
      },
      {
        id: 'codechallenge',
        name: 'Code Challenge',
        desc: 'Scrivi il codice/comando',
        icon: '\u{1F680}',
        enabled: hasCommand || hasCode,
      },
      {
        id: 'terminal',
        name: 'Terminale / Terminal',
        desc: 'Simula comandi in sequenza / Simulate commands in sequence',
        icon: '\u{1F4BB}',
        enabled: hasCommand,
      },
      {
        id: 'codelab',
        name: 'Code Lab',
        desc: 'Completa il codice mancante / Complete the missing code',
        icon: '\u{1F9EA}',
        enabled: hasCode,
      },
      {
        id: 'techtalk',
        name: 'Tech Talk',
        desc: 'Conversazione tecnica / Technical conversation',
        icon: '\u{1F4AC}',
        enabled: true,
      },
      {
        id: 'chain',
        name: 'Sfida a Catena / Chain Challenge',
        desc: '5 domande collegate / 5 connected questions',
        icon: '\u26D3\uFE0F',
        enabled: hasEnglishItalian,
      },
    ];

    const container = document.getElementById('topic-lesson-content');
    if (!container) return;

    const titleEl = document.getElementById('topic-lesson-title');
    const progressEl = document.getElementById('topic-lesson-progress');
    if (titleEl) titleEl.textContent = `Livello ${levelNum}: ${level.name}`;
    if (progressEl) progressEl.textContent = "Scegli modalita'";

    container.innerHTML = `
      <div class="mode-selector">
        <h3 class="mode-selector-title">Scegli come esercitarti / Choose practice mode</h3>
        <div class="mode-selector-grid">
          ${modes
            .map(
              (mode, idx) => `
            <div class="mode-card ${mode.enabled ? '' : 'mode-disabled'}"
                 style="animation-delay: ${idx * 60}ms"
                 ${mode.enabled ? `onclick="topicManager.startModeFromSelector('${mode.id}', '${topicId}', ${levelNum})"` : ''}>
              <div class="mode-card-icon">${mode.icon}</div>
              <div class="mode-card-name">${mode.name}</div>
              <div class="mode-card-desc">${mode.desc}</div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  startModeFromSelector(mode, topicId, levelNum) {
    if (window.topicPracticeManager) {
      window.topicPracticeManager.startPractice(mode, topicId, levelNum);
      this.showView('practice');
    }
  }

  // ─── NAVIGATION HELPERS ────────────────────────

  showView(view) {
    const hub = document.getElementById('topics-hub');
    const detail = document.getElementById('topic-detail');
    const lesson = document.getElementById('topic-lesson-container');
    const practice = document.getElementById('topic-practice-container');

    if (hub) hub.classList.toggle('hidden', view !== 'hub');
    if (detail) detail.classList.toggle('hidden', view !== 'detail');
    if (lesson) lesson.classList.toggle('hidden', view !== 'lesson');
    if (practice) practice.classList.toggle('hidden', view !== 'practice');
  }

  backToHub() {
    this.currentTopicId = null;
    this.currentLevel = null;
    this.expandedLevel = null;
    this.renderTopicsHub();
  }

  backToDetail() {
    if (this.currentTopicId) {
      this.openTopic(this.currentTopicId);
    } else {
      this.backToHub();
    }
  }

  showLocked(levelNum) {
    const detail = document.getElementById('topic-detail');
    if (!detail) return;

    // Show a brief notification inline - replace with a toast if desired
    const existing = detail.querySelector('.locked-notice');
    if (existing) existing.remove();

    const notice = document.createElement('div');
    notice.className = 'locked-notice';
    notice.innerHTML = `\u{1F512} Completa il Livello ${levelNum - 1} prima! / Complete Level ${levelNum - 1} first!`;
    detail.prepend(notice);

    setTimeout(() => notice.remove(), 3000);
  }

  // ─── UTILITY ───────────────────────────────────

  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}
