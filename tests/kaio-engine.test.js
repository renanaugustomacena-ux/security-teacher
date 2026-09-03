/* eslint-disable import/first */
import { describe, it, expect, vi } from 'vitest';

vi.mock('../js/services/GameAudioService.js', () => ({
  gameAudioService: {
    unlock: vi.fn(),
    setMuted: vi.fn(),
    startDrone: vi.fn(),
    stopDrone: vi.fn(),
    play: vi.fn(),
    isSupported: () => false,
  },
}));

import * as engine from '../js/games/KaioEngine.js';

/** Three chapters of two beats; a host whose reset() records what it saw. */
function makeHost() {
  const CH = [0, 1, 2].map((c) => ({
    t: [`Cap ${c}`, `Ch ${c}`],
    titles: [
      ['Uno', 'One'],
      ['Due', 'Two'],
    ],
    beats: [{ id: `${c}.0` }, { id: `${c}.1` }],
  }));
  const host = {
    CH,
    state: { beat: 0, chapter: 0, step: 4, done: true, coach: { kind: 'x' }, paused: true },
    seen: [],
    reset(beat) {
      this.seen.push({ chapter: this.state.chapter, beat, cfg: this.BEATS[beat].id });
    },
    setState(patch) {
      Object.assign(this.state, typeof patch === 'function' ? patch(this.state) : patch);
    },
  };
  engine.useChapter(host, 0);
  return host;
}

describe('KaioEngine — the chapter/beat spine', () => {
  it('a game reset() at a chapter boundary already sees the new chapter (§43.5)', () => {
    const host = makeHost();
    engine.goBeat(host, 0, 1);
    expect(host.seen.at(-1)).toEqual({ chapter: 1, beat: 0, cfg: '1.0' });
    expect(host.state).toMatchObject({ chapter: 1, beat: 0, step: 0, done: false, coach: null });
    expect(host.state.paused).toBe(false);
  });

  it('next() walks every beat of every chapter in order and wraps to the start', () => {
    const host = makeHost();
    const walk = [];
    for (let i = 0; i < 7; i += 1) {
      engine.next(host);
      walk.push(host.seen.at(-1).cfg);
    }
    expect(walk).toEqual(['0.1', '1.0', '1.1', '2.0', '2.1', '0.0', '0.1']);
    // What reset() saw is always the chapter the beat belongs to.
    for (const s of host.seen) expect(s.cfg.startsWith(`${s.chapter}.`)).toBe(true);
  });

  it('goChapter() opens the first beat of that chapter', () => {
    const host = makeHost();
    engine.goChapter(host, 2);
    expect(host.seen.at(-1)).toEqual({ chapter: 2, beat: 0, cfg: '2.0' });
    expect(host.BEATS).toBe(host.CH[2].beats);
    expect(host.TITLES).toBe(host.CH[2].titles);
  });
});
