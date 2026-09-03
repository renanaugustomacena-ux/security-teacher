import { describe, it, expect } from 'vitest';
import { buildPlan, FORMAT_TIER } from '../js/topics/lesson2/LessonV2Scheduler.js';

const mkItem = (english, context) => ({
  english,
  italian: `it-${english}`,
  example: `Use the ${english} carefully. = Usa ${english} con attenzione.`,
  context,
  _topicId: 'cybersecurity',
  _level: 0,
});

const chunkA = [mkItem('Firewall', 'defense'), mkItem('Password', 'auth')];
const chunkB = [mkItem('Malware', 'malware'), mkItem('Exploit', 'malware')];

describe('LessonV2Scheduler.buildPlan', () => {
  it('produces blocked drills of 3 exercises each, then an interleave beat', () => {
    const { exercises } = buildPlan({ chunkA, chunkB });
    const drillA = exercises.filter((e) => e.beat === 'drillA');
    const drillB = exercises.filter((e) => e.beat === 'drillB');
    const interleave = exercises.filter((e) => e.beat === 'interleave');

    expect(drillA).toHaveLength(3);
    expect(drillB).toHaveLength(3);
    expect(interleave.length).toBeGreaterThanOrEqual(4);
  });

  it('never places the same format twice in a row', () => {
    const { exercises } = buildPlan({ chunkA, chunkB });
    for (let i = 1; i < exercises.length; i += 1) {
      expect(exercises[i].format).not.toBe(exercises[i - 1].format);
    }
  });

  it('uses at most 3 recognition-tier exercises', () => {
    const older = [mkItem('Encryption', 'crypto'), mkItem('Hashing', 'crypto')];
    const { exercises } = buildPlan({ chunkA, chunkB, older });
    const recognition = exercises.filter((e) => FORMAT_TIER[e.format] === 'recognition');
    expect(recognition.length).toBeLessThanOrEqual(3);
  });

  it('drills climb the ladder recognition -> cued -> production', () => {
    const { exercises } = buildPlan({ chunkA, chunkB });
    const drillA = exercises.filter((e) => e.beat === 'drillA');
    expect(drillA[0].tier).toBe('recognition');
    expect(drillA[1].tier).toBe('cued');
    expect(drillA[2].tier).toBe('production');
  });

  it('re-tests every drilled item in the interleave beat with a fresh format', () => {
    const { exercises } = buildPlan({ chunkA, chunkB });
    const drilledFormats = new Map();
    for (const ex of exercises) {
      if (ex.beat === 'drillA' || ex.beat === 'drillB') {
        const set = drilledFormats.get(ex.itemKey) || new Set();
        set.add(ex.format);
        drilledFormats.set(ex.itemKey, set);
      }
    }

    const reused = exercises.filter((e) => e.beat === 'interleave' && e.reuseOf);
    const reusedKeys = new Set(reused.map((e) => e.reuseOf));
    // Every drilled item is revisited.
    for (const key of drilledFormats.keys()) {
      expect(reusedKeys.has(key)).toBe(true);
    }
    // And revisited with a format it was not drilled in.
    for (const ex of reused) {
      const used = drilledFormats.get(ex.reuseOf);
      if (used) expect(used.has(ex.format)).toBe(false);
    }
  });

  it('tolerates empty chunks', () => {
    expect(() => buildPlan({})).not.toThrow();
    const { exercises } = buildPlan({});
    expect(exercises).toEqual([]);
  });
});
