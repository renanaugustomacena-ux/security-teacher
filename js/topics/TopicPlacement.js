import { getTopicMeta } from './registry.js';
import { escapeHtml } from '../utils/SanitizeHtml.js';
import { placementTestService } from '../services/PlacementTestService.js';
import { certificateService } from '../services/CertificateService.js';
import { analyticsService } from '../services/AnalyticsService.js';
import { authService } from '../services/AuthService.js';
import { canRunVeroFalso, canRunDefinizione } from './TopicPracticeExtraModes.js';
import { isTypeableAnswer, MIN_TYPEABLE_ITEMS } from './TopicPracticeConstants.js';
import { loadLabsFor, labsForLevel } from './TopicPracticeLabMode.js';

/**
 * How the practice modes are presented. Grouped by the learner's INTENT rather
 * than by implementation, because a flat list of 23 cards is a wall. Any mode
 * missing from every group would never render, so the set is asserted in
 * tests/topic-placement-groups.test.js.
 */
export const MODE_GROUPS = [
  {
    id: 'vocab',
    name: 'Vocabolario / Vocabulary',
    ids: ['listening', 'matching', 'writing', 'context', 'pairs', 'definizione'],
  },
  {
    id: 'comprehension',
    name: 'Comprensione / Comprehension',
    ids: ['fillblank', 'sentence', 'comprehension', 'scenario', 'verofalso'],
  },
  {
    id: 'handson',
    name: 'Pratica Tecnica / Hands-on',
    ids: [
      'lab',
      'terminal',
      'command',
      'cmdcloze',
      'codelab',
      'codechallenge',
      'codeoutput',
      'readout',
      'dictation',
    ],
  },
  {
    id: 'challenge',
    name: 'Sfide / Challenges',
    ids: ['chain', 'velocita', 'techtalk'],
  },
];

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
    // `writing` asks the learner to reproduce the Italian exactly. A level whose
    // glosses are all sentence-length (reference-derived content, mostly) would
    // offer a card that is really a typing test, so require a few short answers.
    // Labs are authored per lesson, so the card is offered only when THIS level
    // actually has one. showModeSelector is already async, so the lazy import
    // costs nothing until the learner opens the picker.
    const levelLabs = labsForLevel(await loadLabsFor(topicId), level);
    const hasLab = levelLabs.length > 0;

    const hasTypeableAnswers =
      pool.filter((item) => item.english && isTypeableAnswer(item)).length >= MIN_TYPEABLE_ITEMS;
    // Both gates count DISTINCT Italian glosses / notes, not items: the
    // generators need the variety, and counting items alone enables a card
    // that then produces zero questions.
    const hasVeroFalsoPool = canRunVeroFalso(pool);
    const hasDefinitionPool = canRunDefinizione(pool);

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
        icon: '✏️',
        enabled: hasEnglishItalian && hasTypeableAnswers,
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
        id: 'verofalso',
        name: 'Vero o Falso / True or False',
        desc: 'Giudica la frase e spiega perché / Judge the statement and say why',
        icon: '⚖️',
        enabled: hasVeroFalsoPool,
      },
      {
        id: 'definizione',
        name: 'Definizione / Definition',
        desc: 'Scegli la descrizione giusta / Pick the right description',
        icon: '\u{1F4D4}',
        enabled: hasDefinitionPool,
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
        enabled: hasMultiLineCode,
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
        icon: '⛓️',
        enabled: hasEnglishItalian,
      },
      {
        id: 'pairs',
        name: 'Coppie / Tap the Pairs',
        desc: 'Abbina termini e traduzioni / Tap matching pairs',
        icon: '\u{1F9E9}',
        enabled: hasEnglishItalian,
      },
      {
        id: 'readout',
        name: 'Output / Read the Output',
        desc: "Leggi l'output e scegli / Read output, pick meaning",
        icon: '\u{1F4DF}',
        enabled: hasCommand,
      },
      {
        id: 'dictation',
        name: 'Dettato / Dictation',
        desc: 'Ascolta e scrivi il comando / Hear it, type the command',
        icon: '\u{1F3A7}',
        enabled: hasCommand,
      },
      {
        id: 'cmdcloze',
        name: 'Comando Cloze / Command Cloze',
        desc: 'Completa il comando / Fill the missing token',
        icon: '\u2328\ufe0f',
        enabled: hasCommand,
      },
      {
        id: 'lab',
        name: 'Lab / Hands-on Lab',
        desc: 'Risolvi il caso al terminale / Work the case at the terminal',
        icon: '\u{1F9EA}',
        enabled: hasLab,
      },
      {
        id: 'velocita',
        name: "Velocita' / Speed Run",
        desc: '60-90s a tutta velocita / 60-90s rapid-fire',
        icon: '⚡',
        enabled: hasEnglishItalian,
      },
    ];

    const container = document.getElementById('topic-lesson-content');
    if (!container) return;

    const titleEl = document.getElementById('topic-lesson-title');
    const progressEl = document.getElementById('topic-lesson-progress');
    if (titleEl) titleEl.textContent = `Livello ${levelNum}: ${level.name}`;
    if (progressEl) progressEl.textContent = "Scegli modalita'";

    // 23 modes in one flat grid is choice paralysis, and interleaving the
    // unavailable ones makes it worse. Group by what the learner is trying to
    // DO, put the available modes first inside each group, and drop a group
    // entirely when this level cannot offer any of it.
    const grouped = MODE_GROUPS.map((group) => ({
      ...group,
      modes: modes
        .filter((m) => group.ids.includes(m.id))
        .sort((a, b) => Number(b.enabled) - Number(a.enabled)),
    })).filter((group) => group.modes.some((m) => m.enabled));

    let cardIndex = 0;
    const cardHtml = (mode) => {
      const delay = cardIndex * 40;
      cardIndex += 1;
      return `
            <div class="mode-card ${mode.enabled ? '' : 'mode-disabled'}"
                 ${mode.enabled ? 'role="button" tabindex="0"' : 'aria-disabled="true"'}
                 style="animation-delay: ${delay}ms"
                 ${mode.enabled ? `data-action="topic.startMode" data-mode="${mode.id}" data-topic-id="${topicId}" data-level="${levelNum}"` : ''}>
              <div class="mode-card-icon" aria-hidden="true">${mode.icon}</div>
              <div class="mode-card-name">${mode.name}</div>
              <div class="mode-card-desc">${mode.desc}</div>
            </div>`;
    };

    container.innerHTML = `
      <div class="mode-selector">
        <h3 class="mode-selector-title">Scegli come esercitarti / Choose practice mode</h3>
        ${grouped
          .map(
            (group) => `
          <section class="mode-group">
            <h4 class="mode-group-title">${escapeHtml(group.name)}</h4>
            <div class="mode-selector-grid">${group.modes.map(cardHtml).join('')}</div>
          </section>`
          )
          .join('')}
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
