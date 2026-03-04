/**
 * TOPIC MANAGER - FlowLearn
 * =========================
 *
 * Manages the Technical Topics section:
 * - Topics Hub (grid of 4 topic cards)
 * - Level selection per topic (12 levels)
 * - Lesson navigation within levels
 * - Item-by-item learning with technical enrichments
 *
 * Lazy-loads topic data via dynamic import().
 */

import { topicsRegistry, getTopicMeta } from './registry.js';

export class TopicManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.dataCache = {};
    this.currentTopicId = null;
    this.currentLevel = null;
    this.currentLesson = null;
    this.currentItemIndex = 0;
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
                <span class="topic-progress-text">${completedLevels}/${topic.levelCount} livelli</span>
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

  // ─── TOPIC DETAIL (LEVELS) ─────────────────────

  async openTopic(topicId) {
    const meta = getTopicMeta(topicId);
    if (!meta) return;

    this.currentTopicId = topicId;

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

    detail.innerHTML = `
      <div class="topic-detail-header">
        <button class="btn btn-secondary" onclick="topicManager.backToHub()">
          \u2190 Indietro / Back
        </button>
        <div class="topic-detail-title">
          <span class="topic-detail-icon">${meta.icon}</span>
          <h3>${meta.title}</h3>
        </div>
        <span class="topic-progress-badge" style="--topic-color: ${meta.color}">
          ${stats ? stats.completedLevels.length : 0}/${meta.levelCount}
        </span>
      </div>

      <div class="topic-levels-grid">
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

            return `
            <div class="topic-level-card ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}"
                 style="--topic-color: ${meta.color}"
                 onclick="${isUnlocked ? `topicManager.openLevel('${meta.id}', ${lvlNum})` : `topicManager.showLocked(${lvlNum})`}">
              <div class="topic-level-header">
                <span class="topic-level-number">${lvlNum}</span>
                <span class="topic-level-status">
                  ${isCompleted ? '\u2705' : !isUnlocked ? '\u{1F512}' : '\u{1F4CD}'}
                </span>
              </div>
              <h4 class="topic-level-name">${level.name}</h4>
              <p class="topic-level-desc">${level.description}</p>
              <div class="topic-level-meta">
                <span>${totalItems} termini</span>
                <span>${completedLessons}/${level.lessons.length} lezioni</span>
              </div>
            </div>
          `;
          })
          .join('')}
      </div>
    `;
  }

  // ─── LEVEL DETAIL (LESSONS) ────────────────────

  async openLevel(topicId, levelNum) {
    const data = await this.loadTopicData(topicId);
    if (!data || !data.levels[levelNum]) return;

    const meta = getTopicMeta(topicId);
    const level = data.levels[levelNum];
    this.currentTopicId = topicId;
    this.currentLevel = levelNum;

    const detail = document.getElementById('topic-detail');
    if (!detail) return;

    detail.innerHTML = `
      <div class="topic-detail-header">
        <button class="btn btn-secondary" onclick="topicManager.openTopic('${topicId}')">
          \u2190 Indietro / Back
        </button>
        <div class="topic-detail-title">
          <span class="topic-detail-icon">${meta.icon}</span>
          <h3>Livello ${levelNum}: ${level.name}</h3>
        </div>
        <span class="topic-progress-badge" style="--topic-color: ${meta.color}">Lv.${levelNum}</span>
      </div>

      <div class="topic-lessons-grid">
        ${level.lessons
          .map((lesson, idx) => {
            const isCompleted = this.progressManager.isTopicLessonCompleted(
              topicId,
              levelNum,
              lesson.id
            );
            return `
            <div class="topic-lesson-card ${isCompleted ? 'completed' : ''}"
                 style="--topic-color: ${meta.color}"
                 onclick="topicManager.openLesson('${topicId}', ${levelNum}, '${lesson.id}')">
              <div class="topic-lesson-number">${idx + 1}</div>
              <h4>${lesson.title}</h4>
              <p>${lesson.description}</p>
              <div class="topic-lesson-meta">
                <span>${lesson.items.length} termini</span>
                ${isCompleted ? '<span class="lesson-done">\u2705 Completata</span>' : ''}
              </div>
            </div>
          `;
          })
          .join('')}
      </div>

      <div class="topic-level-actions">
        <button class="btn btn-primary" onclick="topicManager.practiceLevel('${topicId}', ${levelNum})">
          \u270D\uFE0F Pratica Livello / Practice Level
        </button>
      </div>
    `;
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
    this.renderLessonItem();
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

    container.innerHTML = `
      <div class="lesson-item-card topic-item-card">
        <div class="item-pair">
          <div class="item-english">${this.escapeHtml(item.english)}</div>
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
