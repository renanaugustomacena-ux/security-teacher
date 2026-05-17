import { storageService } from './StorageService.js';

const PRESETS = {
  casual: { lessons: 1, practice: 2, words: 5, minutes: 10 },
  regular: { lessons: 2, practice: 3, words: 10, minutes: 15 },
  intense: { lessons: 3, practice: 5, words: 20, minutes: 30 },
  hardcore: { lessons: 5, practice: 8, words: 40, minutes: 60 },
};

class StudyPlanService {
  constructor() {
    this._plan = null;
    this._saveTimer = null;
  }

  async init() {
    const stored = await storageService.load('progress', 'studyPlan');
    if (stored) {
      const { userId, ...rest } = stored;
      this._plan = rest;
    } else {
      this._plan = {
        preset: 'regular',
        custom: null,
        goalTopicId: null,
        goalDate: null,
      };
    }
  }

  getTargets() {
    if (this._plan.custom) return { ...this._plan.custom };
    return { ...PRESETS[this._plan.preset] };
  }

  setPreset(presetKey) {
    if (!PRESETS[presetKey]) {
      throw new Error(`Unknown preset: "${presetKey}". Valid: ${Object.keys(PRESETS).join(', ')}`);
    }
    this._plan.preset = presetKey;
    this._plan.custom = null;
    this._scheduleSave();
  }

  setCustomTargets({ lessons, practice, words, minutes }) {
    this._plan.preset = 'custom';
    this._plan.custom = {
      lessons: Math.max(1, Math.min(20, Math.round(lessons || 1))),
      practice: Math.max(1, Math.min(50, Math.round(practice || 1))),
      words: Math.max(1, Math.min(100, Math.round(words || 1))),
      minutes: Math.max(5, Math.min(240, Math.round(minutes || 5))),
    };
    this._scheduleSave();
  }

  setGoal(topicId, targetDate) {
    this._plan.goalTopicId = topicId;
    this._plan.goalDate = targetDate instanceof Date ? targetDate.toISOString() : targetDate;
    this._scheduleSave();
  }

  estimateCompletionDate(topicId, totalItems, masteredItems) {
    const targets = this.getTargets();
    const remaining = totalItems - masteredItems;
    if (remaining <= 0) return new Date();
    const days = Math.ceil((remaining * 5) / (targets.practice * 10));
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }

  getGoalProgress(totalItems, masteredItems) {
    const progress = totalItems > 0 ? masteredItems / totalItems : 0;

    let daysRemaining = null;
    let onTrack = true;

    if (this._plan.goalDate) {
      const now = new Date();
      const goal = new Date(this._plan.goalDate);
      daysRemaining = Math.max(0, Math.ceil((goal - now) / (1000 * 60 * 60 * 24)));

      const estimated = this.estimateCompletionDate(
        this._plan.goalTopicId,
        totalItems,
        masteredItems
      );
      onTrack = estimated <= goal;
    }

    return { progress, daysRemaining, onTrack };
  }

  _scheduleSave() {
    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this._persist(), 3000);
  }

  async _persist() {
    this._saveTimer = null;
    await storageService.save('progress', { userId: 'studyPlan', ...this._plan });
  }
}

export { StudyPlanService };
export const studyPlanService = new StudyPlanService();
