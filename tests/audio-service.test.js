import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AudioService } from '../js/services/AudioService.js';

function makeMockAudioContext() {
  const created = { oscillators: 0, gains: 0, sources: [] };
  const ctx = {
    state: 'running',
    currentTime: 0,
    destination: { __id: 'destination' },
    createAnalyser: vi.fn(() => ({
      fftSize: 0,
      frequencyBinCount: 1024,
      getByteFrequencyData: vi.fn(),
      connect: vi.fn(),
    })),
    createGain: vi.fn(() => {
      created.gains += 1;
      return { connect: vi.fn(), gain: { value: 1 } };
    }),
    createBufferSource: vi.fn(() => {
      const src = {
        buffer: null,
        playbackRate: { value: 1 },
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        disconnect: vi.fn(),
        onended: null,
      };
      created.sources.push(src);
      return src;
    }),
    decodeAudioData: vi.fn(async () => ({ duration: 100 })),
    resume: vi.fn(async () => {}),
  };
  return { ctx, created };
}

describe('AudioService', () => {
  let svc;
  let mock;

  beforeEach(() => {
    mock = makeMockAudioContext();
    function MockAudioContext() {
      return mock.ctx;
    }
    globalThis.window = { AudioContext: MockAudioContext };
    svc = new AudioService();
  });

  it('starts with no audioContext and not playing', () => {
    expect(svc.audioContext).toBeNull();
    expect(svc.isPlaying).toBe(false);
    expect(svc.buffer).toBeNull();
  });

  it('init() creates an AudioContext + analyser + gain on first call', () => {
    svc.init();
    expect(svc.audioContext).toBe(mock.ctx);
    expect(mock.ctx.createAnalyser).toHaveBeenCalled();
    expect(mock.ctx.createGain).toHaveBeenCalled();
  });

  it('init() is idempotent — second call does not recreate the context', () => {
    svc.init();
    svc.init();
    expect(mock.ctx.createAnalyser).toHaveBeenCalledTimes(1);
  });

  it('play() with no buffer is a no-op', () => {
    svc.init();
    expect(() => svc.play()).not.toThrow();
    expect(mock.created.sources.length).toBe(0);
  });

  it('play() after loading a buffer creates a buffer source and starts it', () => {
    svc.init();
    svc.buffer = { duration: 100 };
    svc.play();
    expect(mock.created.sources).toHaveLength(1);
    expect(mock.created.sources[0].start).toHaveBeenCalled();
    expect(svc.isPlaying).toBe(true);
  });

  it('play() clamps a startOffset out of range', () => {
    svc.init();
    svc.buffer = { duration: 100 };
    svc.play(9999);
    const src = mock.created.sources[0];
    expect(src.start).toHaveBeenCalledWith(0, 100);
  });

  it('stop() calls source.stop() and clears state', () => {
    svc.init();
    svc.buffer = { duration: 100 };
    svc.play();
    svc.stop();
    expect(svc.isPlaying).toBe(false);
    expect(svc.source).toBeNull();
    expect(svc.pauseOffset).toBe(0);
  });

  it('stop() with no source does not throw', () => {
    expect(() => svc.stop()).not.toThrow();
  });

  it('stop() swallows InvalidStateError from stop on never-started source', () => {
    svc.init();
    svc.buffer = { duration: 100 };
    svc.play();
    const src = mock.created.sources[0];
    src.stop = vi.fn(() => {
      const e = new Error('not started');
      e.name = 'InvalidStateError';
      throw e;
    });
    expect(() => svc.stop()).not.toThrow();
  });

  it('getCurrentTime returns pauseOffset when not playing', () => {
    svc.init();
    svc.pauseOffset = 7;
    expect(svc.getCurrentTime()).toBe(7);
  });

  it('setPlaybackRate before play() stores the rate without crashing', () => {
    expect(() => svc.setPlaybackRate(1.5)).not.toThrow();
    expect(svc.currentPlaybackRate).toBe(1.5);
  });

  it('setPlaybackRate after play() updates the source playbackRate', () => {
    svc.init();
    svc.buffer = { duration: 100 };
    svc.play();
    svc.setPlaybackRate(1.5);
    expect(mock.created.sources[0].playbackRate.value).toBe(1.5);
  });

  it('getAnalysisData returns a Uint8Array snapshot', () => {
    svc.init();
    const data = svc.getAnalysisData();
    expect(data).toBeInstanceOf(Uint8Array);
  });

  it('getAnalysisData returns null when no analyzer', () => {
    expect(svc.getAnalysisData()).toBeNull();
  });
});
