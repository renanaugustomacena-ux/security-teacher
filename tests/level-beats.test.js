/* eslint-disable import/first */
import { describe, it, expect, vi } from 'vitest';

vi.mock('../js/services/StorageService.js', () => ({
  storageService: { save: vi.fn(), load: vi.fn(async () => null) },
}));
vi.mock('../js/services/AnalyticsService.js', () => ({
  analyticsService: { recordResponse: vi.fn(), getItemAnalytics: vi.fn(() => null) },
}));
vi.mock('../js/services/MasteryService.js', () => ({
  masteryService: { markIntroduced: vi.fn(), updateMastery: vi.fn() },
}));
vi.mock('../js/services/SmartScoreService.js', () => ({
  smartScoreService: { updateScore: vi.fn() },
}));
vi.mock('../js/services/CurrencyService.js', () => ({ currencyService: { earn: vi.fn() } }));
vi.mock('../js/services/QuestService.js', () => ({ questService: { recordMetric: vi.fn() } }));
vi.mock('../js/services/SfxService.js', () => ({
  sfxService: { correct: vi.fn(), incorrect: vi.fn(), nearMiss: vi.fn() },
}));
vi.mock('../js/PracticeHUD.js', () => ({
  practiceHUD: { onAnswerResult: vi.fn(), reset: vi.fn() },
}));

import { createLevelSession } from '../js/games/LevelSession.js';
import {
  beatIndex,
  beatItem,
  beatItems,
  beatLesson,
  fillers,
  distractors,
  labelOf,
  meaningOf,
  pickLang,
  spine,
} from '../js/games/LevelBeats.js';

async function nodejsLevel(level = 0) {
  return createLevelSession({ surface: 'nodejs', level, mode: 'test' });
}

describe('LevelBeats — the 40-slot vocabulary spine (§46.5)', () => {
  it('maps chapter/beat to the flat slot in lesson order', () => {
    expect(beatIndex(0, 0)).toBe(0);
    expect(beatIndex(0, 4)).toBe(4);
    expect(beatIndex(1, 0)).toBe(5);
    expect(beatIndex(7, 4)).toBe(39);
    expect(beatIndex(undefined, null)).toBe(0);
  });

  it('visits every item of a 40-item level exactly once over 8 × 5 beats', async () => {
    const s = await nodejsLevel(0);
    const visited = spine(s);
    expect(visited).toHaveLength(40);
    expect(new Set(visited.map((i) => i.key)).size).toBe(40);
    expect(new Set(visited.map((i) => i.key))).toEqual(new Set(s.items.map((i) => i.key)));
    // chapters 2k and 2k+1 belong to lesson k
    expect(beatLesson(s, 0, 0).id).toBe(s.lessons[0].id);
    expect(beatLesson(s, 1, 4).id).toBe(s.lessons[0].id);
    expect(beatLesson(s, 2, 0).id).toBe(s.lessons[1].id);
    expect(beatLesson(s, 7, 4).id).toBe(s.lessons[3].id);
  });

  it('wraps rather than running dry on a level with fewer items than beats', async () => {
    const s = await createLevelSession({ surface: 'learn', level: 0, mode: 'test' });
    expect(s.items).toHaveLength(30);
    expect(beatItem(s, 6, 0)).toBe(s.items[0]);
    expect(beatItem(s, 7, 4)).toBe(s.items[9]);
    expect(new Set(spine(s).map((i) => i.key)).size).toBe(30);
  });

  it('spreads a 42-item level over 40 beats so no term is left behind', async () => {
    const s = await createLevelSession({ surface: 'cybersecurity', level: 0, mode: 'test' });
    expect(s.items).toHaveLength(42);
    const visited = spine(s);
    expect(visited).toHaveLength(42);
    expect(new Set(visited.map((i) => i.key)).size).toBe(42);
    const sizes = [];
    for (let c = 0; c < 8; c += 1)
      for (let b = 0; b < 5; b += 1) sizes.push(beatItems(s, c, b).length);
    expect(Math.max(...sizes)).toBe(2);
    expect(Math.min(...sizes)).toBe(1);
    expect(sizes.filter((n) => n === 2)).toHaveLength(2);
    // the first of a beat's items is its "term of the beat"
    expect(beatItem(s, 0, 0)).toBe(beatItems(s, 0, 0)[0]);
  });

  it('fillers are graded neighbours from the same lesson, like distractors', async () => {
    const s = await nodejsLevel(1);
    const item = beatItem(s, 4, 2);
    const extra = fillers(s, item, 4);
    expect(extra).toHaveLength(4);
    expect(extra.every((d) => d.lesson === item.lesson && d !== item)).toBe(true);
  });

  it('draws distractors from the same lesson first, never the item, never a duplicate', async () => {
    const s = await nodejsLevel(0);
    const item = beatItem(s, 2, 1);
    for (let round = 0; round < 20; round += 1) {
      const ds = distractors(s, item, 3);
      expect(ds).toHaveLength(3);
      expect(ds).not.toContain(item);
      expect(ds.every((d) => d.lesson === item.lesson)).toBe(true);
      expect(new Set(ds.map((d) => d.english.toLowerCase())).size).toBe(3);
    }
  });

  it('falls back to the rest of the level when a lesson cannot supply enough', async () => {
    const s = await nodejsLevel(0);
    const item = beatItem(s, 0, 0);
    const ds = distractors(s, item, 15);
    expect(ds).toHaveLength(15);
    expect(ds.filter((d) => d.lesson === item.lesson)).toHaveLength(9);
    expect(ds).not.toContain(item);
  });

  it('never hands the answer to the sign: bracketed English is stripped from the meaning', () => {
    const item = { english: 'Password', italian: "Parola d'ordine (Password)", lesson: 'x' };
    expect(meaningOf(item, 'it')).toBe("Parola d'ordine");
    expect(meaningOf(item, 'en')).toBe('Password');
    expect(labelOf({ english: '  Event Loop ' })).toBe('Event Loop');
    expect(meaningOf(null, 'it')).toBe('');
  });

  it('splits bilingual "it / en" strings and leaves plain strings alone', () => {
    expect(pickLang('Fondamenti / Foundations', 'it')).toBe('Fondamenti');
    expect(pickLang('Fondamenti / Foundations', 'en')).toBe('Foundations');
    expect(pickLang('Solo italiano', 'en')).toBe('Solo italiano');
    expect(pickLang('', 'it')).toBe('');
  });
});
