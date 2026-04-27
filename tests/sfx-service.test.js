import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SfxService } from '../js/services/SfxService.js';

function makeMockAudioContext() {
  const oscillators = [];
  const gains = [];
  const ctx = {
    state: 'running',
    currentTime: 0,
    destination: { __id: 'destination' },
    createOscillator: () => {
      const osc = {
        type: 'sine',
        frequency: {
          value: 0,
          setValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
        },
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      };
      oscillators.push(osc);
      return osc;
    },
    createGain: () => {
      const g = {
        gain: {
          value: 0,
          setValueAtTime: vi.fn(),
          linearRampToValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
        },
        connect: vi.fn(),
      };
      gains.push(g);
      return g;
    },
    resume: vi.fn().mockResolvedValue(undefined),
  };
  return { ctx, oscillators, gains };
}

describe('SfxService', () => {
  let mock;
  let audioContextCalls;

  beforeEach(() => {
    mock = makeMockAudioContext();
    audioContextCalls = 0;
    function MockAudioContext() {
      audioContextCalls += 1;
      return mock.ctx;
    }
    globalThis.window = {
      AudioContext: MockAudioContext,
      matchMedia: vi.fn(() => ({ matches: false })),
    };
  });

  it('does not create an AudioContext until first play', () => {
    const sfx = new SfxService();
    expect(audioContextCalls).toBe(0);
    sfx.correct();
    expect(audioContextCalls).toBe(1);
  });

  it('plays two oscillators on correct (ascending pluck)', () => {
    const sfx = new SfxService();
    sfx.correct();
    expect(mock.oscillators.length).toBe(2);
    expect(mock.oscillators[0].start).toHaveBeenCalled();
    expect(mock.oscillators[1].start).toHaveBeenCalled();
  });

  it('plays a single softer tone on nearMiss', () => {
    const sfx = new SfxService();
    sfx.nearMiss();
    expect(mock.oscillators.length).toBe(1);
  });

  it('uses an exponential frequency ramp for incorrect (the gentle thud)', () => {
    const sfx = new SfxService();
    sfx.incorrect();
    expect(mock.oscillators).toHaveLength(1);
    expect(mock.oscillators[0].frequency.exponentialRampToValueAtTime).toHaveBeenCalled();
  });

  it('layers more oscillators on higher streak tiers', () => {
    const sfx = new SfxService();
    sfx.streakTier(3);
    const baseCount = mock.oscillators.length;
    sfx.streakTier(10);
    expect(mock.oscillators.length).toBeGreaterThan(baseCount + 2);
  });

  it('plays a four-note sequence on levelUp', () => {
    const sfx = new SfxService();
    sfx.levelUp();
    expect(mock.oscillators.length).toBe(4);
  });

  it('falls silent when reduced-motion is preferred', () => {
    globalThis.window.matchMedia = vi.fn(() => ({ matches: true }));
    const sfx = new SfxService();
    sfx.correct();
    expect(mock.oscillators).toHaveLength(0);
  });

  it('falls silent when explicitly disabled', () => {
    const sfx = new SfxService();
    sfx.setEnabled(false);
    sfx.correct();
    sfx.streakTier(10);
    expect(mock.oscillators).toHaveLength(0);
  });

  it('survives an environment without AudioContext', () => {
    globalThis.window = { matchMedia: vi.fn(() => ({ matches: false })) };
    const sfx = new SfxService();
    expect(() => sfx.correct()).not.toThrow();
  });
});
