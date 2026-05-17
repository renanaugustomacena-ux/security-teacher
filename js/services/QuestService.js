/**
 * Quest Service
 * Manages weekly and daily quest system with deterministic selection and persistence.
 */
import { storageService } from './StorageService.js';

const WEEKLY_QUEST_POOL = [
  {
    id: 'earn_500xp',
    label: 'Earn 500 XP this week',
    target: 500,
    metric: 'weekXP',
    reward: 20,
    icon: '⚡',
  },
  {
    id: 'practice_10',
    label: 'Complete 10 practice sessions',
    target: 10,
    metric: 'practiceCount',
    reward: 20,
    icon: '🏋️',
  },
  {
    id: 'learn_50_words',
    label: 'Learn 50 new words',
    target: 50,
    metric: 'weekWords',
    reward: 25,
    icon: '📖',
  },
  {
    id: 'perfect_3',
    label: 'Get 3 perfect scores',
    target: 3,
    metric: 'perfectScores',
    reward: 30,
    icon: '🎯',
  },
  {
    id: 'streak_5',
    label: 'Maintain a 5-day streak',
    target: 5,
    metric: 'currentStreak',
    reward: 20,
    icon: '🔥',
  },
  {
    id: 'boss_2',
    label: 'Beat 2 boss challenges',
    target: 2,
    metric: 'bossWins',
    reward: 30,
    icon: '👾',
  },
  {
    id: 'velocita_3',
    label: 'Complete 3 speed runs',
    target: 3,
    metric: 'velocitaRuns',
    reward: 20,
    icon: '🏎️',
  },
  {
    id: 'topics_3',
    label: 'Practice 3 different topics',
    target: 3,
    metric: 'uniqueTopics',
    reward: 25,
    icon: '🗂️',
  },
  {
    id: 'study_120min',
    label: 'Study for 2 hours total',
    target: 120,
    metric: 'weekMinutes',
    reward: 30,
    icon: '⏱️',
  },
  {
    id: 'terminal_5',
    label: 'Complete 5 terminal exercises',
    target: 5,
    metric: 'terminalCount',
    reward: 25,
    icon: '💻',
  },
  {
    id: 'lesson_7',
    label: 'Complete 7 lessons',
    target: 7,
    metric: 'lessonsCompleted',
    reward: 25,
    icon: '📚',
  },
  {
    id: 'mastery_5',
    label: 'Master 5 items',
    target: 5,
    metric: 'newlyMastered',
    reward: 40,
    icon: '🏆',
  },
];

const DAILY_QUEST_POOL = [
  {
    id: 'daily_50xp_single',
    label: 'Earn 50 XP in one session',
    target: 50,
    metric: 'sessionXP',
    reward: 30,
    icon: '⚡',
  },
  {
    id: 'daily_15_streak',
    label: 'Get a 15-answer streak',
    target: 15,
    metric: 'maxStreak',
    reward: 30,
    icon: '🔥',
  },
  {
    id: 'daily_3_modes',
    label: 'Use 3 different exercise modes',
    target: 3,
    metric: 'uniqueModes',
    reward: 25,
    icon: '🎲',
  },
  {
    id: 'daily_no_hints',
    label: 'Complete a session without hints',
    target: 1,
    metric: 'noHintSessions',
    reward: 25,
    icon: '🧠',
  },
  {
    id: 'daily_boss_win',
    label: 'Win a boss challenge',
    target: 1,
    metric: 'bossWins',
    reward: 35,
    icon: '👾',
  },
  {
    id: 'daily_review_10',
    label: 'Review 10 SRS cards',
    target: 10,
    metric: 'srsReviewed',
    reward: 20,
    icon: '🃏',
  },
];

export class QuestService {
  constructor() {
    this.weeklyQuests = [];
    this.dailyBonusQuest = null;
    this.questHistory = [];
    this._saveTimer = null;
  }

  async init() {
    const saved = await storageService.load('progress', 'quests');
    if (saved) {
      this.weeklyQuests = saved.weeklyQuests || [];
      this.dailyBonusQuest = saved.dailyBonusQuest || null;
      this.questHistory = saved.questHistory || [];
    }
    this._checkResets();
  }

  recordMetric(metric, value = 1) {
    let changed = false;

    for (const quest of this.weeklyQuests) {
      if (quest.state === 'active' && quest.metric === metric) {
        quest.progress = Math.min((quest.progress || 0) + value, quest.target);
        if (quest.progress >= quest.target) {
          quest.state = 'completed';
          quest.completedAt = new Date().toISOString();
        }
        changed = true;
      }
    }

    if (
      this.dailyBonusQuest &&
      this.dailyBonusQuest.state === 'active' &&
      this.dailyBonusQuest.metric === metric
    ) {
      this.dailyBonusQuest.progress = Math.min(
        (this.dailyBonusQuest.progress || 0) + value,
        this.dailyBonusQuest.target
      );
      if (this.dailyBonusQuest.progress >= this.dailyBonusQuest.target) {
        this.dailyBonusQuest.state = 'completed';
        this.dailyBonusQuest.completedAt = new Date().toISOString();
      }
      changed = true;
    }

    if (changed) this._debouncedSave();
  }

  claimReward(questId) {
    const quest =
      this.weeklyQuests.find((q) => q.id === questId) ||
      (this.dailyBonusQuest && this.dailyBonusQuest.id === questId ? this.dailyBonusQuest : null);

    if (!quest || quest.state !== 'completed') return 0;

    quest.state = 'claimed';
    quest.claimedAt = new Date().toISOString();
    this.questHistory.push({ ...quest });
    this._debouncedSave();
    return quest.reward;
  }

  getActiveQuests() {
    return {
      weekly: [...this.weeklyQuests],
      dailyBonus: this.dailyBonusQuest ? { ...this.dailyBonusQuest } : null,
    };
  }

  getCompletedCount() {
    return this.questHistory.length;
  }

  // --- Private Methods ---

  _checkResets() {
    const now = new Date();
    const monday = this._getMondayOfWeek(now);
    const mondayStr = monday.toISOString().slice(0, 10);
    const todayStr = now.toISOString().slice(0, 10);

    // Reset weekly quests if new week
    const currentWeekStart = this.weeklyQuests.length > 0 ? this.weeklyQuests[0].weekStart : null;
    if (currentWeekStart !== mondayStr) {
      this._generateWeeklyQuests(mondayStr);
    }

    // Reset daily bonus if new day
    const currentDate = this.dailyBonusQuest ? this.dailyBonusQuest.date : null;
    if (currentDate !== todayStr) {
      this._generateDailyQuest(todayStr);
    }
  }

  _generateWeeklyQuests(mondayStr) {
    const seed = this._hashString(mondayStr);
    const shuffled = this._seededShuffle([...WEEKLY_QUEST_POOL], seed);
    this.weeklyQuests = shuffled.slice(0, 3).map((def) => ({
      ...def,
      progress: 0,
      state: 'active',
      weekStart: mondayStr,
      completedAt: null,
      claimedAt: null,
    }));
    this._debouncedSave();
  }

  _generateDailyQuest(todayStr) {
    const seed = this._hashString(todayStr);
    const index = Math.abs(seed) % DAILY_QUEST_POOL.length;
    const def = DAILY_QUEST_POOL[index];
    this.dailyBonusQuest = {
      ...def,
      progress: 0,
      state: 'active',
      date: todayStr,
      completedAt: null,
      claimedAt: null,
    };
    this._debouncedSave();
  }

  _getMondayOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  _hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32-bit integer
    }
    return hash;
  }

  _seededShuffle(array, seed) {
    // LCG parameters (Numerical Recipes)
    let s = Math.abs(seed) || 1;
    const a = 1664525;
    const c = 1013904223;
    const m = 2 ** 32;

    for (let i = array.length - 1; i > 0; i--) {
      s = (a * s + c) % m;
      const j = s % (i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  _debouncedSave() {
    if (this._saveTimer) clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this._persist(), 3000);
  }

  async _persist() {
    await storageService.save('progress', {
      userId: 'quests',
      weeklyQuests: this.weeklyQuests,
      dailyBonusQuest: this.dailyBonusQuest,
      questHistory: this.questHistory,
    });
  }
}

export const questService = new QuestService();
