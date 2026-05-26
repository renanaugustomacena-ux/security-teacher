export const progressTopicsMixin = {

  ensureTopicProgress(topicId) {
    if (!this.data.topicProgress) {
      this.data.topicProgress = {};
    }
    if (!this.data.topicProgress[topicId]) {
      this.data.topicProgress[topicId] = {
        completedLessons: {},
        completedLevels: [],
        unlockedLevels: [0],
        wordsLearned: 0,
        lastActiveLevel: 0,
        practiceStats: { totalQuestions: 0, correctAnswers: 0 },
        lessonStars: {},
        bossResults: {},
      };
    }
    const tp = this.data.topicProgress[topicId];
    if (!tp.lessonStars) tp.lessonStars = {};
    if (!tp.bossResults) tp.bossResults = {};
    return this.data.topicProgress[topicId];
  },

  completeTopicLesson(topicId, level, lessonId) {
    const tp = this.ensureTopicProgress(topicId);
    const key = `${level}-${lessonId}`;

    if (tp.completedLessons[key]) return;

    tp.completedLessons[key] = true;
    tp.lastActiveLevel = level;
    this.addActivity('topic', `✅ ${topicId}: completata lezione "${lessonId}" (Lv.${level})`);
    this.checkTopicLevelCompletion(topicId, level);
    this.saveProgress();
    this.renderProgress();
  },

  isTopicLessonCompleted(topicId, level, lessonId) {
    const tp = this.data.topicProgress?.[topicId];
    if (!tp) return false;
    return tp.completedLessons[`${level}-${lessonId}`] === true;
  },

  async checkTopicLevelCompletion(topicId, level) {
    const tp = this.ensureTopicProgress(topicId);

    let topicData = null;
    if (window.topicManager && window.topicManager.dataCache[topicId]) {
      topicData = window.topicManager.dataCache[topicId];
    } else {
      try {
        const module = await import(`./topics/data/${topicId}.js`);
        topicData = module.default;
      } catch (e) {
        return;
      }
    }

    if (!topicData || !topicData.levels[level]) return;

    const levelData = topicData.levels[level];
    const allComplete = levelData.lessons.every(
      (lesson) => tp.completedLessons[`${level}-${lesson.id}`] === true
    );

    if (allComplete) {
      if (!tp.completedLevels.includes(level)) {
        tp.completedLevels.push(level);
        tp.completedLevels.sort((a, b) => a - b);
        this.addActivity('topic', `\u{1F3C6} ${topicId}: Livello ${level} completato!`);
      }

      const nextLevel = level + 1;
      if (!tp.unlockedLevels.includes(nextLevel) && topicData.levels[nextLevel]) {
        tp.unlockedLevels.push(nextLevel);
        tp.unlockedLevels.sort((a, b) => a - b);
        this.addActivity('topic', `\u{1F513} ${topicId}: Livello ${nextLevel} sbloccato!`);
      }

      this.saveProgress();
    }
  },

  isTopicLevelUnlocked(topicId, level) {
    if (level === 0) return true;
    const tp = this.data.topicProgress?.[topicId];
    if (!tp) return level === 0;
    return tp.unlockedLevels.includes(level);
  },

  unlockTopicLevels(topicId, levels) {
    const tp = this.ensureTopicProgress(topicId);
    for (const lvl of levels) {
      if (!tp.unlockedLevels.includes(lvl)) {
        tp.unlockedLevels.push(lvl);
      }
    }
    this.saveProgress();
  },

  getTopicStats(topicId) {
    return this.data.topicProgress?.[topicId] || null;
  },

  incrementTopicWord(topicId) {
    const tp = this.ensureTopicProgress(topicId);
    tp.wordsLearned++;
    this.data.wordsLearned++;
    this.saveProgress();
    this.renderProgress();
  },

  updateTopicPracticeStats(topicId, totalQuestions, correctAnswers) {
    const tp = this.ensureTopicProgress(topicId);
    tp.practiceStats.totalQuestions += totalQuestions;
    tp.practiceStats.correctAnswers += correctAnswers;
    this.saveProgress();
  },

  updateTopicLessonStars(topicId, level, lessonId, stars) {
    const tp = this.ensureTopicProgress(topicId);
    const key = `${level}-${lessonId}`;
    const current = tp.lessonStars[key] || 0;
    if (stars > current) {
      tp.lessonStars[key] = Math.min(3, Math.max(0, stars));
      this.saveProgress();
    }
  },

  getTopicLessonStars(topicId, level, lessonId) {
    const tp = this.data.topicProgress?.[topicId];
    if (!tp || !tp.lessonStars) return 0;
    const key = `${level}-${lessonId}`;
    return tp.lessonStars[key] || 0;
  },

  getTopicLevelStars(topicId, level) {
    const tp = this.data.topicProgress?.[topicId];
    if (!tp || !tp.lessonStars) return 0;

    const prefix = `${level}-`;
    const entries = Object.entries(tp.lessonStars).filter(([key]) => key.startsWith(prefix));

    if (entries.length === 0) return 0;

    const total = entries.reduce((sum, [, stars]) => sum + stars, 0);
    return Math.round(total / entries.length);
  },

  completeTopicBoss(topicId, level, score, stars) {
    if (!this.data) return;
    const tp = this.ensureTopicProgress(topicId);
    if (!tp.bossResults) tp.bossResults = {};
    tp.bossResults[level] = {
      completed: score >= 70,
      score,
      stars,
      date: new Date().toISOString(),
    };
    this.saveProgress();
  },

  incrementTerminalExercises() {
    if (!this.data) return;
    if (typeof this.data.terminalExercisesCompleted !== 'number') {
      this.data.terminalExercisesCompleted = 0;
    }
    this.data.terminalExercisesCompleted++;
    this.saveProgress();
  },

  updateBestChainStreak(streak) {
    if (!this.data) return;
    if (typeof this.data.bestChainStreak !== 'number') {
      this.data.bestChainStreak = 0;
    }
    if (streak > this.data.bestChainStreak) {
      this.data.bestChainStreak = streak;
      this.saveProgress();
    }
  },

  ensureDailyGoals() {
    if (!this.data.dailyGoals) {
      this.data.dailyGoals = {
        date: '',
        goals: {
          lessonsTarget: 2,
          lessonsCompleted: 0,
          practiceTarget: 3,
          practiceCompleted: 0,
          wordsTarget: 10,
          wordsLearned: 0,
          timeTarget: 15,
          timeSpent: 0,
        },
        challengeOfTheDay: null,
        completed: false,
      };
    }
  },

  incrementDailyLessons() {
    if (!this.data) return;
    this.ensureDailyGoals();
    this.data.dailyGoals.goals.lessonsCompleted++;
    this.saveProgress();
    if (window.app && window.app.dailyGoalsManager) {
      window.app.dailyGoalsManager.incrementLessons();
    }
  },

  incrementDailyPractice() {
    if (!this.data) return;
    this.ensureDailyGoals();
    this.data.dailyGoals.goals.practiceCompleted++;
    this.saveProgress();
    if (window.app && window.app.dailyGoalsManager) {
      window.app.dailyGoalsManager.incrementPractice();
    }
  },

  incrementDailyWords(n = 1) {
    if (!this.data) return;
    this.ensureDailyGoals();
    this.data.dailyGoals.goals.wordsLearned += n;
    this.saveProgress();
    if (window.app && window.app.dailyGoalsManager) {
      window.app.dailyGoalsManager.incrementWords(n);
    }
  },

  addDailyTime(minutes) {
    if (!this.data) return;
    this.ensureDailyGoals();
    this.data.dailyGoals.goals.timeSpent += minutes;
    this.saveProgress();
    if (window.app && window.app.dailyGoalsManager) {
      window.app.dailyGoalsManager.updateTime(this.data.dailyGoals.goals.timeSpent);
    }
  },
};
