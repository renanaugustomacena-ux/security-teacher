/* eslint-disable import/first, max-classes-per-file */
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { GameAudioService } from '../js/services/GameAudioService.js';

/**
 * A Web Audio double that records what the graph was asked to build. The point
 * of the assertions is not the timbre but the two rules the doctrine attaches
 * to this bus: every voice is synthesized (§14.3 — no audio file may ship) and
 * the master gain never exceeds -18 dBFS (§14.4).
 */
function makeAudioContextDouble() {
  const created = { oscillators: [], gains: [], buffers: [], filters: [] };

  const gainNode = () => {
    const node = {
      gain: {
        value: 0,
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
      disconnect: vi.fn(),
    };
    created.gains.push(node);
    return node;
  };

  const ctx = {
    state: 'running',
    currentTime: 0,
    sampleRate: 48000,
    destination: { id: 'destination' },
    createGain: vi.fn(gainNode),
    createOscillator: vi.fn(() => {
      const node = {
        type: 'sine',
        frequency: { value: 0, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
        connect: vi.fn(),
        disconnect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
      };
      created.oscillators.push(node);
      return node;
    }),
    createBiquadFilter: vi.fn(() => {
      const node = {
        type: 'lowpass',
        frequency: { value: 0, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
        Q: { value: 0 },
        connect: vi.fn(),
      };
      created.filters.push(node);
      return node;
    }),
    createBufferSource: vi.fn(() => {
      const node = { buffer: null, connect: vi.fn(), start: vi.fn() };
      created.buffers.push(node);
      return node;
    }),
    createBuffer: vi.fn((_channels, length) => ({
      getChannelData: () => new Float32Array(length),
    })),
    resume: vi.fn().mockResolvedValue(undefined),
    close: vi.fn(),
  };

  // An arrow function cannot be used with `new`, so the constructor double has
  // to be a function declaration for `new AudioContext()` to reach it.
  function AudioContextDouble() {
    return ctx;
  }

  return { ctx, created, Ctor: vi.fn(AudioContextDouble) };
}

function throwingCtor() {
  throw new Error('no audio device');
}

describe('GameAudioService', () => {
  let svc;
  let double;

  beforeEach(() => {
    double = makeAudioContextDouble();
    globalThis.window = { AudioContext: double.Ctor };
    svc = new GameAudioService();
  });

  it('reports support from the window constructor', () => {
    expect(svc.isSupported()).toBe(true);
    globalThis.window = {};
    expect(new GameAudioService().isSupported()).toBe(false);
  });

  it('builds no context before the first gesture (§14.5)', () => {
    expect(svc.ctx).toBeNull();
    expect(double.Ctor).not.toHaveBeenCalled();
  });

  it('unlock builds the context once and caps the master bus at -18 dBFS (§14.4)', () => {
    svc.unlock();
    svc.unlock();
    expect(double.Ctor).toHaveBeenCalledTimes(1);
    expect(svc.master.gain.value).toBeCloseTo(0.125);
  });

  it('unlock resumes a suspended context on every gesture', () => {
    svc.unlock();
    double.ctx.state = 'suspended';
    svc.unlock();
    expect(double.ctx.resume).toHaveBeenCalled();
  });

  it('returns null and stays usable when the constructor throws', () => {
    globalThis.window = { AudioContext: vi.fn(throwingCtor) };
    const failing = new GameAudioService();
    expect(failing.unlock()).toBeNull();
    expect(() => failing.play('click')).not.toThrow();
  });

  it('synthesizes every voice — no voice loads a file (§14.3)', () => {
    svc.unlock();
    const voices = ['click', 'tone', 'pop', 'thud', 'fall', 'whoosh', 'crash', 'whir', 'chime'];
    for (const voice of voices) svc.play(voice);
    // Oscillator voices plus noise-buffer voices, and nothing else: a sampled
    // voice would have needed decodeAudioData, which the double does not have.
    expect(double.created.oscillators.length).toBeGreaterThan(0);
    expect(double.created.buffers.length).toBeGreaterThan(0);
    expect(double.ctx.createBuffer).toHaveBeenCalled();
  });

  it('ignores an unknown voice', () => {
    svc.unlock();
    const before = double.created.oscillators.length;
    svc.play('trumpet');
    expect(double.created.oscillators.length).toBe(before);
  });

  it('plays nothing while muted, and mute silences the master bus', () => {
    svc.unlock();
    svc.setMuted(true);
    const before = double.created.oscillators.length;
    svc.play('tone');
    expect(double.created.oscillators.length).toBe(before);
    expect(svc.master.gain.value).toBe(0);
    svc.setMuted(false);
    expect(svc.master.gain.value).toBeCloseTo(0.125);
  });

  it('starts at most one drone and stops it cleanly', () => {
    svc.unlock();
    svc.startDrone({ freq: 42 });
    const after = double.created.oscillators.length;
    svc.startDrone({ freq: 90 });
    expect(double.created.oscillators.length).toBe(after);
    svc.stopDrone();
    expect(svc._drone).toBeNull();
    expect(() => svc.stopDrone()).not.toThrow();
  });

  it('mute follows the drone that is already running', () => {
    svc.unlock();
    svc.startDrone({ volume: 0.02 });
    svc.setMuted(true);
    expect(svc._drone.gain.gain.value).toBe(0);
    svc.setMuted(false);
    expect(svc._drone.gain.gain.value).toBeCloseTo(0.02);
  });

  it('close releases the context and tolerates a second call', () => {
    svc.unlock();
    svc.close();
    expect(double.ctx.close).toHaveBeenCalled();
    expect(svc.ctx).toBeNull();
    expect(() => svc.close()).not.toThrow();
  });
});
