import { describe, it, expect } from 'vitest';
import { progressTopicsMixin, normalizeTopicRecord } from '../js/ProgressTopics.js';

/**
 * Regression: a topic record written by an earlier version of the app — say
 * `{ completedLessons: {…}, wordsLearned: 4 }` with no `completedLevels` —
 * threw `Cannot read properties of undefined (reading 'length')` on the first
 * render of the Topics hub, which took the whole Argomenti section down for
 * that learner on every click.
 */
function host(topicProgress) {
  return {
    data: { topicProgress },
    addActivity() {},
    saveProgress() {},
    renderProgress() {},
    ...progressTopicsMixin,
  };
}

describe('ProgressTopics — records from older app versions', () => {
  it('normalizeTopicRecord backfills every field the readers touch', () => {
    const tp = normalizeTopicRecord({ completedLessons: { '0-a': true }, wordsLearned: 4 });
    expect(tp.completedLevels).toEqual([]);
    expect(tp.unlockedLevels).toEqual([0]);
    expect(tp.wordsLearned).toBe(4);
    expect(tp.lastActiveLevel).toBe(0);
    expect(tp.practiceStats).toEqual({ totalQuestions: 0, correctAnswers: 0 });
    expect(tp.lessonStars).toEqual({});
    expect(tp.bossResults).toEqual({});
    expect(tp.completedLessons).toEqual({ '0-a': true });
  });

  it('keeps a modern record untouched and re-adds level 0 to a bad unlock list', () => {
    const modern = {
      completedLessons: {},
      completedLevels: [0, 1],
      unlockedLevels: [1, 2],
      wordsLearned: 9,
      lastActiveLevel: 2,
      practiceStats: { totalQuestions: 5, correctAnswers: 4 },
      lessonStars: { '0-a': 3 },
      bossResults: {},
      placement: { level: 2, accuracy: 0.8, skipped: false },
    };
    const tp = normalizeTopicRecord({ ...modern });
    expect(tp.completedLevels).toEqual([0, 1]);
    expect(tp.unlockedLevels).toEqual([0, 1, 2]);
    expect(tp.placement).toEqual(modern.placement);
  });

  it('getTopicStats and isTopicLevelUnlocked never throw on a partial record', () => {
    const pm = host({ cybersecurity: { completedLessons: { '0-x': true }, wordsLearned: 4 } });
    const stats = pm.getTopicStats('cybersecurity');
    expect(stats.completedLevels.length).toBe(0);
    expect(pm.isTopicLevelUnlocked('cybersecurity', 0)).toBe(true);
    expect(pm.isTopicLevelUnlocked('cybersecurity', 1)).toBe(false);
    expect(pm.getTopicStats('python')).toBeNull();
    expect(pm.isTopicLevelUnlocked('python', 0)).toBe(true);
  });

  it('ensureTopicProgress upgrades an old record in place', () => {
    const pm = host({ linux: { completedLessons: {} } });
    const tp = pm.ensureTopicProgress('linux');
    expect(tp).toBe(pm.data.topicProgress.linux);
    expect(tp.unlockedLevels).toEqual([0]);
    expect(tp.completedLevels).toEqual([]);
  });
});
