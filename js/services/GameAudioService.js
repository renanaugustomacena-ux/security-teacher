/**
 * GameAudioService — synthesized audio bus for the level games.
 *
 * Doctrine §1.3 keeps Web Audio inside a service; §14.3 forbids bundled audio
 * files, so every voice is an oscillator/noise envelope; §14.4 caps the bus at
 * -18 dBFS. This is a separate bus from SfxService on purpose: SfxService
 * speaks the app chrome's register (correct / near-miss / streak tiers), while
 * a game speaks its own — ricerca/42 §42.3 counts the voice as the sixth
 * column of the visual card, next to palette, figure, ground and movement.
 * Sharing one bus would give all sixteen games the chrome's sound.
 *
 * Voices: click tone pop thud fall whoosh crash whir chime.
 */

const MASTER_GAIN = 0.125; // -18 dBFS, Doctrine §14.4

class GameAudioService {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this._drone = null;
    this._droneVol = 0;
  }

  isSupported() {
    return (
      typeof window !== 'undefined' && Boolean(window.AudioContext || window.webkitAudioContext)
    );
  }

  /**
   * Lazily build the context. Must be called from a user gesture (§14.5), and
   * is called again on every gesture because mobile browsers suspend the
   * context after backgrounding.
   * @returns {AudioContext | null}
   */
  unlock() {
    if (!this.ctx) {
      const Ctor =
        typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
      if (!Ctor) return null;
      try {
        this.ctx = new Ctor();
        this.master = this.ctx.createGain();
        this.master.gain.value = this.muted ? 0 : MASTER_GAIN;
        this.master.connect(this.ctx.destination);
      } catch (err) {
        this.ctx = null;
        this.master = null;
        return null;
      }
    }
    if (this.ctx.state === 'suspended') {
      const resumed = this.ctx.resume();
      if (resumed && typeof resumed.catch === 'function') resumed.catch(() => {});
    }
    return this.ctx;
  }

  setMuted(value) {
    this.muted = Boolean(value);
    if (this.master) this.master.gain.value = this.muted ? 0 : MASTER_GAIN;
    if (this._drone) this._drone.gain.gain.value = this.muted ? 0 : this._droneVol;
  }

  isMuted() {
    return this.muted;
  }

  /**
   * Continuous room tone. One per session; a second call is a no-op so a game
   * that re-mounts does not stack oscillators.
   */
  startDrone({ freq = 42, type = 'triangle', volume = 0.012, lowpass = 120 } = {}) {
    if (!this.ctx || this._drone) return;
    try {
      const gain = this.ctx.createGain();
      gain.gain.value = this.muted ? 0 : volume;
      gain.connect(this.master);

      const osc = this.ctx.createOscillator();
      osc.type = type;
      osc.frequency.value = freq;

      let node = osc;
      if (lowpass) {
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = lowpass;
        osc.connect(filter);
        node = filter;
      }
      node.connect(gain);
      osc.start();

      this._droneVol = volume;
      this._drone = { osc, gain };
    } catch (err) {
      this._drone = null;
    }
  }

  stopDrone() {
    if (!this._drone) return;
    try {
      this._drone.osc.stop();
      this._drone.osc.disconnect();
      this._drone.gain.disconnect();
    } catch (err) {
      // an already-stopped oscillator throws; nothing to recover
    }
    this._drone = null;
  }

  /**
   * Play one voice.
   * @param {string} voice - click|tone|pop|thud|fall|whoosh|crash|whir|chime
   * @param {object} [opts] - per-voice overrides (hz, from, to, v, notes)
   */
  play(voice, opts = {}) {
    if (!this.ctx || this.muted) return;
    const fn = this[`_${voice}`];
    if (typeof fn !== 'function') return;
    try {
      fn.call(this, this.ctx.currentTime, opts);
    } catch (err) {
      // a saturated audio graph must never break the frame loop (§11.1)
    }
  }

  close() {
    this.stopDrone();
    if (!this.ctx) return;
    const ctx = this.ctx;
    this.ctx = null;
    this.master = null;
    try {
      ctx.close();
    } catch (err) {
      // closing a context twice throws; harmless
    }
  }

  // ─── voice construction helpers ────────────────

  _gate(t, peak, decay) {
    const g = this.ctx.createGain();
    g.connect(this.master);
    g.gain.setValueAtTime(peak, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + decay);
    return g;
  }

  _noise(samples, shape) {
    const src = this.ctx.createBufferSource();
    const buf = this.ctx.createBuffer(1, samples, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * shape(i / data.length);
    }
    src.buffer = buf;
    return src;
  }

  _sweep(type, from, to, t, glide) {
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(from, t);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + glide);
    return o;
  }

  // ─── voices ────────────────────────────────────

  _click(t, o) {
    const src = this._noise(1100, (p) => (1 - p) ** 3);
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = o.hz || 1750;
    filter.Q.value = 1.1;
    const g = this._gate(t, o.v || 0.45, 0.13);
    src.connect(filter);
    filter.connect(g);
    src.start(t);
  }

  _tone(t, o) {
    const osc = this._sweep('sine', o.from || 560, o.to || 880, t, 0.09);
    osc.connect(this._gate(t, o.v || 0.15, 0.22));
    osc.start(t);
    osc.stop(t + 0.24);
  }

  _pop(t, o) {
    const hz = o.hz || 420;
    const osc = this._sweep('triangle', hz, hz * 1.9, t, 0.06);
    osc.connect(this._gate(t, o.v || 0.14, 0.14));
    osc.start(t);
    osc.stop(t + 0.16);
  }

  _thud(t, o) {
    const osc = this._sweep('sine', 120, 48, t, 0.2);
    osc.connect(this._gate(t, o.v || 0.3, 0.3));
    osc.start(t);
    osc.stop(t + 0.32);
  }

  _fall(t, o) {
    const osc = this._sweep('triangle', 300, 140, t, 0.22);
    osc.connect(this._gate(t, o.v || 0.05, 0.26));
    osc.start(t);
    osc.stop(t + 0.28);
  }

  _whoosh(t, o) {
    const src = this._noise(5200, (p) => Math.sin(Math.PI * p));
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, t);
    filter.frequency.exponentialRampToValueAtTime(1900, t + 0.14);
    const g = this._gate(t, o.v || 0.13, 0.2);
    src.connect(filter);
    filter.connect(g);
    src.start(t);
  }

  _crash(t, o) {
    const src = this._noise(14000, (p) => (1 - p) ** 1.7);
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, t);
    filter.frequency.exponentialRampToValueAtTime(160, t + 0.5);
    const g = this._gate(t, o.v || 0.4, 0.6);
    src.connect(filter);
    filter.connect(g);
    src.start(t);
  }

  _whir(t, o) {
    const osc = this._sweep('sawtooth', 280, 42, t, 0.62);
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    const g = this._gate(t, o.v || 0.2, 0.7);
    osc.connect(filter);
    filter.connect(g);
    osc.start(t);
    osc.stop(t + 0.72);
  }

  _chime(t, o) {
    const notes = o.notes || [523, 659, 784];
    notes.forEach((hz, i) => {
      const at = t + i * 0.1;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = hz;
      const g = this.ctx.createGain();
      g.connect(this.master);
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(o.v || 0.12, at + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, at + 0.42);
      osc.connect(g);
      osc.start(at);
      osc.stop(at + 0.44);
    });
  }
}

export { GameAudioService };
export const gameAudioService = new GameAudioService();
