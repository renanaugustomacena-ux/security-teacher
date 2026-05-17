import { storageService } from './StorageService.js';

const SAVE_DEBOUNCE_MS = 3000;

const TIERS = [
  { min: 0, max: 29, name: 'beginner' },
  { min: 30, max: 59, name: 'developing' },
  { min: 60, max: 79, name: 'proficient' },
  { min: 80, max: 89, name: 'advanced' },
  { min: 90, max: 99, name: 'expert' },
  { min: 100, max: 100, name: 'mastered' },
];

class SmartScoreService {
  constructor() {
    this._scores = {};
    this._saveTimer = null;
  }

  async init() {
    const record = await storageService.load('progress', 'smartScore');
    this._scores = record?.scores || {};
  }

  getScore(topicId, level) {
    return this._scores[topicId]?.[level] ?? 0;
  }

  updateScore(topicId, level, correct, questionDifficulty = 0.5) {
    const current = this.getScore(topicId, level);
    let delta;

    if (correct) {
      let gain = Math.max(1, Math.round(8 * (1 - current / 100)));
      if (questionDifficulty > 0.7) gain += 2;
      delta = gain;
    } else {
      const penalty = Math.max(3, Math.round(20 * (current / 100)));
      delta = -penalty;
    }

    const newScore = Math.max(0, Math.min(100, current + delta));

    if (!this._scores[topicId]) this._scores[topicId] = {};
    this._scores[topicId][level] = newScore;

    this._scheduleSave();

    return { previous: current, current: newScore, delta: newScore - current };
  }

  getTier(score) {
    for (const t of TIERS) {
      if (score >= t.min && score <= t.max) return t.name;
    }
    return 'beginner';
  }

  getTopicScores(topicId) {
    return { ...(this._scores[topicId] || {}) };
  }

  getAllScores() {
    const copy = {};
    for (const [topic, levels] of Object.entries(this._scores)) {
      copy[topic] = { ...levels };
    }
    return copy;
  }

  _scheduleSave() {
    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this._persist(), SAVE_DEBOUNCE_MS);
  }

  async _persist() {
    this._saveTimer = null;
    try {
      await storageService.save('progress', {
        userId: 'smartScore',
        scores: this._scores,
      });
    } catch (err) {
      console.error('[SmartScore] persist failed:', err);
    }
  }
}

export { SmartScoreService };
export const smartScoreService = new SmartScoreService();
