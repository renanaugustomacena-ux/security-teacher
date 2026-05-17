import { storageService } from './StorageService.js';

const STAGES = [
  { en: 'Unseen', it: 'Non visto', color: '#6b7280' },
  { en: 'Introduced', it: 'Introdotto', color: '#8b5cf6' },
  { en: 'Practicing', it: 'In pratica', color: '#f59e0b' },
  { en: 'Familiar', it: 'Familiare', color: '#3b82f6' },
  { en: 'Proficient', it: 'Competente', color: '#10b981' },
  { en: 'Mastered', it: 'Padroneggiato', color: '#059669' },
  { en: 'Burned', it: 'Consolidato', color: '#6d28d9' },
];

const SAVE_DEBOUNCE_MS = 5000;

class MasteryService {
  constructor() {
    this._items = {};
    this._saveTimer = null;
  }

  async init() {
    const record = await storageService.load('progress', 'mastery');
    this._items = record?.items || {};
  }

  getStage(itemKey) {
    return this._items[itemKey]?.stage ?? 0;
  }

  getStageInfo(stage) {
    return STAGES[stage] || STAGES[0];
  }

  markIntroduced(itemKey) {
    if (this.getStage(itemKey) !== 0) return;
    this._items[itemKey] = this._newEntry(1);
    this._scheduleSave();
  }

  updateMastery(itemKey, analytics) {
    const { masteryP, totalAttempts, consecutiveFails, modeAccuracy, lastCorrect } = analytics;

    const entry = this._items[itemKey] || this._newEntry(0);
    const today = new Date().toISOString().slice(0, 10);

    // Update modes with at least one correct answer
    if (modeAccuracy) {
      const correctModes = Object.entries(modeAccuracy)
        .filter(([, v]) => v.correct > 0)
        .map(([mode]) => mode);
      entry.modesCorrect = [...new Set([...entry.modesCorrect, ...correctModes])];
    }

    // Track unique days with correct answers
    if (lastCorrect) {
      const day =
        typeof lastCorrect === 'string'
          ? lastCorrect.slice(0, 10)
          : new Date(lastCorrect).toISOString().slice(0, 10);
      if (!entry.daysCorrect.includes(day)) {
        entry.daysCorrect.push(day);
      }
    }

    // Decay: drop one stage on 3+ consecutive fails (min PRACTICING)
    if (consecutiveFails >= 3 && entry.stage >= 3) {
      entry.stage = Math.max(2, entry.stage - 1);
      entry.firstMastered = null;
      entry.lastUpdated = today;
      this._items[itemKey] = entry;
      this._scheduleSave();
      return;
    }

    const correctModeCount = entry.modesCorrect.length;
    const uniqueDays = entry.daysCorrect.length;

    // Forward transitions (ascending: promote through each eligible stage)
    if (entry.stage <= 1 && totalAttempts >= 1) {
      entry.stage = 2;
    }

    if (entry.stage === 2 && masteryP >= 0.5 && correctModeCount >= 2) {
      entry.stage = 3;
    }

    if (entry.stage === 3 && masteryP >= 0.8 && correctModeCount >= 3) {
      entry.stage = 4;
    }

    if (entry.stage === 4 && masteryP >= 0.95 && uniqueDays >= 3) {
      entry.stage = 5;
      if (!entry.firstMastered) entry.firstMastered = today;
    }

    if (entry.stage === 5 && entry.firstMastered) {
      const daysSinceMastered = this._daysBetween(entry.firstMastered, today);
      if (daysSinceMastered >= 30 && consecutiveFails === 0) {
        entry.stage = 6;
      }
    }

    entry.lastUpdated = today;
    this._items[itemKey] = entry;
    this._scheduleSave();
  }

  getLevelMastery(topicId, level) {
    const prefix = `${topicId}:${level}:`;
    return this._aggregate(prefix);
  }

  getTopicMastery(topicId) {
    const prefix = `${topicId}:`;
    return this._aggregate(prefix);
  }

  _aggregate(prefix) {
    const counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    let total = 0;

    for (const [key, entry] of Object.entries(this._items)) {
      if (key.startsWith(prefix)) {
        counts[entry.stage]++;
        total++;
      }
    }

    const mastered = counts[5] + counts[6];
    const percentMastered = total > 0 ? Math.round((mastered / total) * 100) : 0;

    return { counts, total, percentMastered };
  }

  _newEntry(stage) {
    return {
      stage,
      modesCorrect: [],
      daysCorrect: [],
      lastUpdated: new Date().toISOString().slice(0, 10),
      firstMastered: null,
    };
  }

  _daysBetween(dateA, dateB) {
    const a = new Date(dateA);
    const b = new Date(dateB);
    return Math.floor((b - a) / (1000 * 60 * 60 * 24));
  }

  _scheduleSave() {
    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this._persist(), SAVE_DEBOUNCE_MS);
  }

  async _persist() {
    // progress store keyPath is 'userId'; we use 'mastery' as the record id
    await storageService.save('progress', {
      userId: 'mastery',
      items: this._items,
    });
  }
}

export { MasteryService };
export const masteryService = new MasteryService();
