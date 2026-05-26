import { storageService } from './StorageService.js';

const RING_BUFFER_SIZE = 50;
const SAVE_DEBOUNCE_MS = 5000;
const COMMON_ERRORS_CAP = 5;

// BKT parameters
const P_L0 = 0.1;
const P_T = 0.2;
const P_G = 0.25;
const P_S = 0.1;

class AnalyticsService {
  constructor() {
    this._items = new Map();
    this._dirty = new Set();
    this._saveTimer = null;
    this._ready = null;
  }

  async init() {
    if (this._ready) return this._ready;
    this._ready = this._load();
    return this._ready;
  }

  async _load() {
    await storageService.init();
    const records = await storageService.loadAll('analytics');
    for (const rec of records) {
      this._items.set(rec.itemKey, rec);
    }
  }

  recordResponse(response) {
    const { itemKey, correct, responseTimeMs, userAnswer, exerciseMode } = response;

    let item = this._items.get(itemKey);
    if (!item) {
      item = this._createItem(itemKey);
      this._items.set(itemKey, item);
    }

    // Ring buffer
    if (!item.responses) item.responses = [];
    item.responses.push(response);
    if (item.responses.length > RING_BUFFER_SIZE) {
      item.responses = item.responses.slice(-RING_BUFFER_SIZE);
    }

    // Cumulative counters
    item.totalAttempts++;
    if (correct) {
      item.correctCount++;
      item.consecutiveFails = 0;
      item.lastCorrect = response.timestamp;
    } else {
      item.consecutiveFails++;
      this._trackError(item, userAnswer);
    }
    item.accuracy = item.correctCount / item.totalAttempts;
    item.lastAttempt = response.timestamp;

    // Running average response time
    item.avgResponseTimeMs += (responseTimeMs - item.avgResponseTimeMs) / item.totalAttempts;

    // Mode accuracy
    if (!item.modeAccuracy[exerciseMode]) {
      item.modeAccuracy[exerciseMode] = { correct: 0, total: 0 };
    }
    const mode = item.modeAccuracy[exerciseMode];
    mode.total++;
    if (correct) mode.correct++;

    // BKT update
    item.masteryP = this._updateBKT(item.masteryP, correct);

    this._markDirty(itemKey);
  }

  _createItem(itemKey) {
    return {
      itemKey,
      totalAttempts: 0,
      correctCount: 0,
      accuracy: 0,
      avgResponseTimeMs: 0,
      lastAttempt: null,
      lastCorrect: null,
      consecutiveFails: 0,
      masteryP: P_L0,
      commonErrors: [],
      modeAccuracy: {},
      responses: [],
      _errorCounts: {},
    };
  }

  _trackError(item, userAnswer) {
    if (!userAnswer) return;
    if (!item._errorCounts) item._errorCounts = {};
    item._errorCounts[userAnswer] = (item._errorCounts[userAnswer] || 0) + 1;
    item.commonErrors = Object.entries(item._errorCounts)
      .map(([answer, count]) => ({ answer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, COMMON_ERRORS_CAP);
  }

  _updateBKT(priorL, correct) {
    let posteriorL;
    if (correct) {
      posteriorL = (priorL * (1 - P_S)) / (priorL * (1 - P_S) + (1 - priorL) * P_G);
    } else {
      posteriorL = (priorL * P_S) / (priorL * P_S + (1 - priorL) * (1 - P_G));
    }
    return posteriorL + (1 - posteriorL) * P_T;
  }

  _markDirty(itemKey) {
    this._dirty.add(itemKey);
    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this._flush(), SAVE_DEBOUNCE_MS);
  }

  async _flush() {
    const keys = [...this._dirty];
    this._dirty.clear();
    for (const key of keys) {
      const item = this._items.get(key);
      if (item) await storageService.save('analytics', item);
    }
  }

  getItemAnalytics(itemKey) {
    const item = this._items.get(itemKey);
    if (!item) return null;
    const { responses, _errorCounts, ...aggregate } = item;
    return aggregate;
  }

  getWeakItems(topicId, threshold = 0.5) {
    const prefix = `${topicId}:`;
    const results = [];
    for (const [key, item] of this._items) {
      if (key.startsWith(prefix) && item.masteryP < threshold) {
        results.push(this.getItemAnalytics(key));
      }
    }
    return results;
  }

  getLeeches(threshold = 5) {
    const results = [];
    for (const [key, item] of this._items) {
      if (item.consecutiveFails >= threshold) {
        results.push(this.getItemAnalytics(key));
      }
    }
    return results;
  }

  getMasteredItems(topicId, threshold = 0.95) {
    const prefix = `${topicId}:`;
    const results = [];
    for (const [key, item] of this._items) {
      if (key.startsWith(prefix) && item.masteryP >= threshold) {
        results.push(this.getItemAnalytics(key));
      }
    }
    return results;
  }

  getAnalyticsMap() {
    return this._items;
  }

  getAllResponses() {
    const all = [];
    for (const [, item] of this._items) {
      if (Array.isArray(item.responses)) {
        for (const r of item.responses) {
          all.push(r);
        }
      }
    }
    return all;
  }

  getTopicAccuracy(topicId) {
    const prefix = `${topicId}:`;
    let totalCorrect = 0;
    let totalAttempts = 0;
    for (const [key, item] of this._items) {
      if (key.startsWith(prefix)) {
        totalCorrect += item.correctCount;
        totalAttempts += item.totalAttempts;
      }
    }
    return totalAttempts === 0 ? 0 : totalCorrect / totalAttempts;
  }
}

export { AnalyticsService };
export const analyticsService = new AnalyticsService();
