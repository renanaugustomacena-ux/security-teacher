import { getTopicMeta } from './registry.js';
import { placementTestService } from '../services/PlacementTestService.js';
import { certificateService } from '../services/CertificateService.js';
import { analyticsService } from '../services/AnalyticsService.js';
import { authService } from '../services/AuthService.js';

export const topicPlacementMixin = {

  async downloadCertificate(topicId) {
    const data = await this.loadTopicData(topicId);
    const meta = getTopicMeta(topicId);
    if (!data || !meta) return;

    const stats = this.progressManager.getTopicStats(topicId);
    const accuracy = analyticsService.getTopicAccuracy(topicId);
    const itemsCount = stats ? stats.wordsLearned || 0 : 0;
    const levelsCount = stats ? stats.completedLevels?.length || 0 : 0;

    const user = authService.getCurrentUser?.();
    const userName = user?.name || user?.email || 'Anonymous Learner';

    certificateService.downloadCertificate(topicId, userName, {
      itemsCount,
      levelsCount,
      smartScore: 0,
      accuracy,
    });
  },

  _showPlacementOffer(topicId, meta, data) {
    const detail = document.getElementById('topic-detail');
    if (!detail) {
      this.renderLevels(meta, data);
      return;
    }

    detail.innerHTML = `
      <button class="btn btn-secondary topic-back-btn" data-action="topic.backToHub">
        &#x2190; Indietro / Back
      </button>
      <div class="placement-offer" style="--topic-color: ${meta.color}">
        <div class="placement-offer-icon">${meta.icon}</div>
        <h2>${meta.title}</h2>
        <p>Prima volta qui? Fai il test di ingresso per saltare i livelli già noti.<br>
           First time here? Take the placement test to skip levels you already know.</p>
        <div class="placement-offer-buttons">
          <button class="btn btn-primary" data-action="topic.placementStart" data-topic-id="${topicId}">
            &#x1F4CB; Test di Ingresso / Placement Test
          </button>
          <button class="btn btn-secondary" data-action="topic.placementSkip" data-topic-id="${topicId}">
            Salta / Skip — Inizia dal Livello 1
          </button>
        </div>
      </div>
    `;
    this._placementData = data;
    this._placementMeta = meta;
  },

  async startPlacementTest(topicId) {
    const data = this._placementData || (await this.loadTopicData(topicId));
    if (!data) return;
    const numLevels = Object.keys(data.levels).length;
    placementTestService.startTest(numLevels);
    this._placementData = data;
    this._renderPlacementQuestion(topicId);
  },

  _renderPlacementQuestion(topicId) {
    const state = placementTestService.getCurrentState();
    if (!state || state.isComplete) return;

    const data = this._placementData;
    const levelNum = state.currentLevel;
    const level = data?.levels?.[levelNum];
    if (!level) return;

    const allItems = level.lessons.flatMap((l) => l.items || []);
    if (allItems.length === 0) return;
    const item = allItems[Math.floor(Math.random() * allItems.length)];

    const otherItems = Object.values(data.levels)
      .filter((_, i) => i !== levelNum)
      .flatMap((lvl) => lvl.lessons.flatMap((l) => l.items || []))
      .filter((i) => i.italian !== item.italian);

    const shuffled = [...otherItems].sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [...shuffled, item].sort(() => Math.random() - 0.5);

    const container = document.getElementById('placement-test-container');
    if (!container) return;

    const answeredInRound = state.responses.length % 3;
    container.innerHTML = `
      <div class="placement-test-inner">
        <div class="placement-test-header">
          <span>Test di Ingresso / Placement Test</span>
          <span>Round ${state.currentRound + 1}/4 &middot; Q${answeredInRound + 1}/3</span>
        </div>
        <div class="placement-test-prompt">
          <p class="placement-term">${item.english}</p>
          <p class="placement-context">${item.context || ''}</p>
        </div>
        <div class="placement-options">
          ${options
            .map(
              (opt) => `
            <button class="placement-option" data-action="topic.placementAnswer"
              data-topic-id="${topicId}"
              data-correct="${opt.italian === item.italian}">
              ${opt.italian}
            </button>`
            )
            .join('')}
        </div>
      </div>
    `;
    container.classList.remove('hidden');
    document.getElementById('topic-detail')?.classList.add('hidden');
    this._pendingPlacementItem = item;
  },

  recordPlacementAnswer(topicId, correct) {
    placementTestService.recordAnswer(correct);
    const state = placementTestService.getCurrentState();
    const answersInRound = state.responses.length % 3;

    if (answersInRound === 0) {
      const result = placementTestService.advanceRound();
      if (result) {
        this._finishPlacementTest(topicId, result);
        return;
      }
    }
    this._renderPlacementQuestion(topicId);
  },

  _finishPlacementTest(topicId, result) {
    this.progressManager.unlockTopicLevels(topicId, result.levelsToUnlock);

    const container = document.getElementById('placement-test-container');
    if (!container) return;

    const pct = Math.round(result.accuracy * 100);
    container.innerHTML = `
      <div class="placement-result">
        <div class="placement-result-icon">${result.estimatedLevel > 0 ? '&#x1F3C6;' : '&#x1F4AA;'}</div>
        <h2>Livello Stimato: ${result.estimatedLevel + 1} / Estimated Level: ${result.estimatedLevel + 1}</h2>
        <p>${result.levelsToUnlock.length} livell${result.levelsToUnlock.length === 1 ? 'o sbloccato' : 'i sbloccati'} / ${result.levelsToUnlock.length} level${result.levelsToUnlock.length === 1 ? '' : 's'} unlocked</p>
        <p>Precisione / Accuracy: ${pct}% (${result.totalCorrect}/${result.totalQuestions})</p>
        <button class="btn btn-primary" data-action="topic.placementSkip" data-topic-id="${topicId}">
          Inizia / Start Learning
        </button>
      </div>
    `;
  },

  async skipPlacementTest(topicId) {
    placementTestService.reset();
    const container = document.getElementById('placement-test-container');
    if (container) container.classList.add('hidden');
    const detail = document.getElementById('topic-detail');
    if (detail) detail.classList.remove('hidden');
    const data = this._placementData || (await this.loadTopicData(topicId));
    const meta = this._placementMeta || getTopicMeta(topicId);
    if (data && meta) this.renderLevels(meta, data);
  },

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
    const hasMultiLineCode = pool.some(
      (item) =>
        item.code &&
        item.code.includes('\n') &&
        item.code.split('\n').filter((l) => l.trim()).length >= 2
    );
    const hasEnglishItalian = pool.some((item) => item.english && item.italian);

    const modes = [
      { id: 'listening', name: 'Ascolto / Listening', desc: 'Scegli la traduzione corretta', icon: '\u{1F442}', enabled: hasEnglishItalian },
      { id: 'writing', name: 'Scrittura / Writing', desc: 'Scrivi la traduzione', icon: '✏️', enabled: hasEnglishItalian },
      { id: 'matching', name: 'Abbinamento / Matching', desc: 'Abbina termini e traduzioni', icon: '\u{1F517}', enabled: hasEnglishItalian },
      { id: 'fillblank', name: 'Completa / Fill Blank', desc: 'Completa la frase', icon: '\u{1F4DD}', enabled: hasExample },
      { id: 'sentence', name: 'Ricostruisci / Sentence', desc: 'Ordina le parole', icon: '\u{1F9E9}', enabled: hasExample },
      { id: 'comprehension', name: 'Comprensione / Comprehension', desc: 'Leggi e rispondi', icon: '\u{1F4D6}', enabled: hasExample },
      { id: 'scenario', name: 'Scenario / Dialogue', desc: 'Completa il dialogo situazionale', icon: '\u{1F4AC}', enabled: hasExample && hasEnglishItalian },
      { id: 'context', name: 'Contesto / Context', desc: 'In quale ambito si usa?', icon: '\u{1F3AF}', enabled: hasEnglishItalian },
      { id: 'command', name: 'Comando / Command', desc: 'Scrivi il comando corretto', icon: '\u{1F4BB}', enabled: hasCommand },
      { id: 'codeoutput', name: 'Code Output', desc: 'Che concetto dimostra il codice?', icon: '\u{1F40D}', enabled: hasCode },
      { id: 'codechallenge', name: 'Code Challenge', desc: 'Scrivi il codice/comando', icon: '\u{1F680}', enabled: hasCommand || hasCode },
      { id: 'terminal', name: 'Terminale / Terminal', desc: 'Simula comandi in sequenza / Simulate commands in sequence', icon: '\u{1F4BB}', enabled: hasCommand },
      { id: 'codelab', name: 'Code Lab', desc: 'Completa il codice mancante / Complete the missing code', icon: '\u{1F9EA}', enabled: hasMultiLineCode },
      { id: 'techtalk', name: 'Tech Talk', desc: 'Conversazione tecnica / Technical conversation', icon: '\u{1F4AC}', enabled: true },
      { id: 'chain', name: 'Sfida a Catena / Chain Challenge', desc: '5 domande collegate / 5 connected questions', icon: '⛓️', enabled: hasEnglishItalian },
      { id: 'velocita', name: "Velocita' / Speed Run", desc: '60-90s a tutta velocita / 60-90s rapid-fire', icon: '⚡', enabled: hasEnglishItalian },
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
                 ${mode.enabled ? `data-action="topic.startMode" data-mode="${mode.id}" data-topic-id="${topicId}" data-level="${levelNum}"` : ''}>
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
  },

  startModeFromSelector(mode, topicId, levelNum) {
    if (window.topicPracticeManager) {
      window.topicPracticeManager.startPractice(mode, topicId, levelNum);
      this.showView('practice');
    }
  },
};
