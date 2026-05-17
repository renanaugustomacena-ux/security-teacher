/* eslint-disable import/first */
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../js/services/StorageService.js', () => ({
  storageService: {
    load: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  },
}));

import { QuestService } from '../js/services/QuestService.js';

describe('QuestService', () => {
  let svc;

  beforeEach(async () => {
    svc = new QuestService();
    await svc.init();
  });

  it('generates 3 weekly quests on init', () => {
    expect(svc.weeklyQuests.length).toBe(3);
    expect(svc.weeklyQuests[0].state).toBe('active');
  });

  it('generates a daily bonus quest on init', () => {
    expect(svc.dailyBonusQuest).not.toBeNull();
    expect(svc.dailyBonusQuest.state).toBe('active');
  });

  it('recordMetric increments matching quest progress', () => {
    const metric = svc.weeklyQuests[0].metric;
    svc.recordMetric(metric, 1);
    expect(svc.weeklyQuests[0].progress).toBe(1);
  });

  it('quest transitions to completed when target reached', () => {
    const quest = svc.weeklyQuests[0];
    svc.recordMetric(quest.metric, quest.target);
    expect(quest.state).toBe('completed');
    expect(quest.completedAt).toBeTruthy();
  });

  it('claimReward returns reward for completed quest', () => {
    const quest = svc.weeklyQuests[0];
    svc.recordMetric(quest.metric, quest.target);
    const reward = svc.claimReward(quest.id);
    expect(reward).toBe(quest.reward);
    expect(quest.state).toBe('claimed');
  });

  it('claimReward returns 0 for active quest', () => {
    const quest = svc.weeklyQuests[0];
    expect(svc.claimReward(quest.id)).toBe(0);
  });

  it('getActiveQuests returns weekly and daily', () => {
    const active = svc.getActiveQuests();
    expect(active.weekly.length).toBe(3);
    expect(active.dailyBonus).toBeDefined();
  });

  it('weekly quests are deterministic for same week', () => {
    const svc2 = new QuestService();
    svc2._checkResets();
    expect(svc.weeklyQuests.map((q) => q.id)).toEqual(svc2.weeklyQuests.map((q) => q.id));
  });
});
