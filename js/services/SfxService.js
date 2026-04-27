/**
 * SfxService
 * Synthesized sound-effects layer for the exercise loop.
 *
 * Why synthesized: zero asset bytes, zero CSP `media-src` changes, no PWA cache
 * surface, no licensing, deterministic across browsers. Tones are generated with
 * `OscillatorNode` + `GainNode` envelopes — sine for warmth, triangle for bite.
 *
 * Aesthetic: cyber-instrument / trading-terminal. Restrained. Volumes are
 * capped at -18 dBFS so a single SFX never dominates a session.
 *
 * Lifecycle:
 *   - The `AudioContext` is constructed lazily on the first play() call so the
 *     browser's autoplay-after-gesture policy is honored — the user clicking
 *     an answer button IS the gesture.
 *   - Disabled when `prefers-reduced-motion: reduce` matches.
 *   - Disabled by user toggle (persisted via `setEnabled`).
 *
 * Events:
 *   correct      | answer accepted
 *   nearMiss     | partial credit (typo forgiven)
 *   incorrect    | answer rejected
 *   streakTier   | streak crossed a milestone (3, 5, 10, 15, 25)
 *   xpGain       | XP awarded (subtle; called per-answer)
 *   levelUp      | level / unlock event
 */

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

class SfxService {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.enabled = true;
    this.unlocked = false;
  }

  setEnabled(value) {
    this.enabled = Boolean(value);
  }

  isEnabled() {
    if (!this.enabled) return false;
    if (typeof window === 'undefined') return false;
    if (typeof window.matchMedia === 'function') {
      try {
        if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return false;
      } catch (e) {
        // matchMedia can throw in some test envs — fall through to enabled.
      }
    }
    return true;
  }

  _ensureContext() {
    if (this.ctx) return this.ctx;
    if (typeof window === 'undefined') return null;
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    try {
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      // -18 dBFS ceiling. Volume below combines with per-event gains.
      this.master.gain.value = 0.125;
      this.master.connect(this.ctx.destination);
    } catch (e) {
      this.ctx = null;
    }
    return this.ctx;
  }

  _unlock() {
    if (this.unlocked) return;
    const ctx = this._ensureContext();
    if (!ctx) return;
    if (ctx.state === 'suspended' && typeof ctx.resume === 'function') {
      ctx.resume().catch(() => {});
    }
    this.unlocked = true;
  }

  /**
   * Play a single tone with an attack-decay envelope.
   * @param {object} opts
   * @param {number} opts.freq      Hz
   * @param {number} opts.duration  seconds (envelope length)
   * @param {number} [opts.attack]  seconds
   * @param {number} [opts.gain]    peak gain (0..1) before master cap
   * @param {OscillatorType} [opts.type]
   * @param {number} [opts.startAt] seconds into the future to start
   * @param {number} [opts.glide]   if set, frequency exponentially ramps to this Hz over duration
   */
  _tone({ freq, duration, attack = 0.008, gain = 0.6, type = 'sine', startAt = 0, glide = null }) {
    const ctx = this._ensureContext();
    if (!ctx || !this.master) return;
    const t0 = ctx.currentTime + startAt;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (glide && glide !== freq) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, glide), t0 + duration);
    }
    env.gain.setValueAtTime(0, t0);
    env.gain.linearRampToValueAtTime(gain, t0 + attack);
    env.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(env);
    env.connect(this.master);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }

  // ─── Event sounds ─────────────────────────────────

  correct() {
    if (!this.isEnabled()) return;
    this._unlock();
    // Two-note ascending pluck (E5 → B5).
    this._tone({ freq: 659.25, duration: 0.12, gain: 0.55, type: 'sine' });
    this._tone({ freq: 987.77, duration: 0.16, gain: 0.45, type: 'sine', startAt: 0.06 });
  }

  nearMiss() {
    if (!this.isEnabled()) return;
    this._unlock();
    // Single soft sine — encouraging, slightly lower than correct.
    this._tone({ freq: 587.33, duration: 0.18, gain: 0.4, type: 'sine' });
  }

  incorrect() {
    if (!this.isEnabled()) return;
    this._unlock();
    // Sub-bass thud, no klaxon. Gentle reveal tone.
    this._tone({ freq: 196, duration: 0.22, gain: 0.5, type: 'triangle', glide: 147 });
  }

  /**
   * Streak milestone. Tier is the streak count (3, 5, 10, 15, 25 typical).
   * Higher tiers add a harmonic layer on top.
   */
  streakTier(tier = 3) {
    if (!this.isEnabled()) return;
    this._unlock();
    // Chord: C5, E5, G5 — adds the G5 only on tier ≥ 5, B5 on tier ≥ 10.
    this._tone({ freq: 523.25, duration: 0.28, gain: 0.4, type: 'triangle' });
    this._tone({ freq: 659.25, duration: 0.28, gain: 0.4, type: 'sine', startAt: 0.02 });
    if (tier >= 5) {
      this._tone({ freq: 783.99, duration: 0.32, gain: 0.35, type: 'sine', startAt: 0.04 });
    }
    if (tier >= 10) {
      this._tone({ freq: 987.77, duration: 0.36, gain: 0.3, type: 'sine', startAt: 0.06 });
    }
  }

  combo() {
    // Alias of streakTier with a small tier — kept for explicit call sites.
    this.streakTier(3);
  }

  xpGain() {
    if (!this.isEnabled()) return;
    this._unlock();
    // Very subtle high tick — sits underneath `correct` when both fire.
    this._tone({ freq: 1318.51, duration: 0.05, gain: 0.18, type: 'sine' });
  }

  levelUp() {
    if (!this.isEnabled()) return;
    this._unlock();
    // Four-note ascending fanfare (C, E, G, C') — each ~80ms.
    const seq = [523.25, 659.25, 783.99, 1046.5];
    seq.forEach((f, i) => {
      this._tone({ freq: f, duration: 0.18, gain: 0.5, type: 'triangle', startAt: i * 0.08 });
    });
  }

  /**
   * Velocità metronome tick. Frequency parameter lets the caller drop the
   * pitch a half-step on wrong answers without re-instantiating a service.
   */
  metronome(freq = 440) {
    if (!this.isEnabled()) return;
    this._unlock();
    this._tone({ freq, duration: 0.04, gain: 0.25, type: 'triangle' });
  }
}

export const sfxService = new SfxService();
export { SfxService };
