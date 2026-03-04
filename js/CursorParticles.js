/**
 * CursorParticles - Antigravity-style cursor particle effect
 * Matches FlowLearn's matrix theme with orange/yellow accent colors.
 *
 * Enhancements over original:
 *   - Object pooling eliminates GC pressure (no per-frame allocations)
 *   - Hi-DPI canvas rendering (capped at 2× for performance)
 *   - Auto-disables on touch devices & prefers-reduced-motion
 *   - Pause / resume API for tab-visibility or overlay states
 *   - Frozen config prevents accidental mutation
 *   - Single-pass update+draw loop (no Array.filter allocation)
 *
 * Usage:
 *   import { CursorParticles } from './CursorParticles.js';
 *   const cursor = new CursorParticles({ spawnRate: 3 });
 *   cursor.init();   // returns `this` or `null` if disabled
 *   cursor.pause();  // suspend without destroying
 *   cursor.resume();
 *   cursor.destroy();
 */

/** @typedef {{ x: number, y: number, vx: number, vy: number, size: number, alpha: number, color: string, active: boolean }} Particle */

export class CursorParticles {
  /** @param {Record<string, unknown>} options */
  constructor(options = {}) {
    /** @readonly Immutable configuration */
    this.config = Object.freeze({
      spawnRate: options.spawnRate ?? 3,
      decay: options.decay ?? 0.94,
      speed: options.speed ?? 1.8,
      minSize: options.minSize ?? 1.5,
      maxSize: options.maxSize ?? 4.5,
      lerpFactor: options.lerpFactor ?? 0.12,
      zIndex: options.zIndex ?? 5,
      poolSize: options.poolSize ?? 300,
      alphaFloor: options.alphaFloor ?? 0.01,
      gravity: options.gravity ?? 0.04,
      drag: options.drag ?? 0.98,
      shrink: options.shrink ?? 0.985,
      upwardBias: options.upwardBias ?? -0.4,

      colors: Object.freeze(
        options.colors ?? [
          'rgba(230, 126, 34,', // --accent-primary orange
          'rgba(241, 196, 15,', // --accent-secondary yellow
          'rgba(243, 156, 18,', // warm amber
          'rgba(255, 165, 0,', // orange
          'rgba(248, 220, 100,', // light gold
        ]
      ),

      ringEnabled: options.ringEnabled ?? true,
      ringRadius: options.ringRadius ?? 18,
      ringColor: options.ringColor ?? 'rgba(230, 126, 34,',
    });

    /** @type {HTMLCanvasElement | null} */
    this.canvas = null;
    /** @type {CanvasRenderingContext2D | null} */
    this.ctx = null;

    // ── Object pool (pre-allocated, no runtime allocations) ──
    /** @type {Particle[]} */
    this._pool = [];
    this._activeCount = 0;

    // ── Cursor tracking ──
    this.mouse = { x: -9999, y: -9999 };
    this.ghost = { x: -9999, y: -9999 };

    /** @type {number | null} */
    this._rafId = null;
    this._destroyed = false;
    this._dpr = 1;

    // Bind once to avoid creating new references
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onResize = this._onResize.bind(this);
    this._loop = this._loop.bind(this);
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
  }

  // ── Public API ──────────────────────────────────────────────────────────────

  /**
   * Initialize the particle system.
   * @returns {this | null} `null` if disabled due to device constraints.
   */
  init() {
    if (this._shouldDisable()) {
      console.info('[CursorParticles] Disabled — touch device or reduced-motion preference.');
      return null;
    }

    this._initPool();
    this._createCanvas();
    this._bindEvents();
    this._loop();
    return this;
  }

  /** Fully tear down — removes canvas, listeners, and pool. */
  destroy() {
    this._destroyed = true;

    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('resize', this._onResize);
    document.removeEventListener('visibilitychange', this._onVisibilityChange);

    this.canvas?.remove();
    this.canvas = null;
    this.ctx = null;
    this._pool.length = 0;
    this._activeCount = 0;
  }

  /** Pause the animation loop without destroying resources. */
  pause() {
    if (this._rafId !== null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  /** Resume a paused animation loop. */
  resume() {
    if (this._rafId === null && !this._destroyed && this.canvas) {
      this._loop();
    }
  }

  // ── Private — Setup ─────────────────────────────────────────────────────────

  /** @returns {boolean} */
  _shouldDisable() {
    const isTouch = 'ontouchstart' in window && navigator.maxTouchPoints > 0;
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    return isTouch || prefersReduced;
  }

  _initPool() {
    const size = this.config.poolSize;
    this._pool = new Array(size);
    for (let i = 0; i < size; i++) {
      this._pool[i] = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 0,
        alpha: 0,
        color: '',
        active: false,
      };
    }
    this._activeCount = 0;
  }

  _createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'cursor-particles';
    this.canvas.setAttribute('aria-hidden', 'true');
    Object.assign(this.canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: String(this.config.zIndex),
    });
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this._resize();
  }

  _bindEvents() {
    window.addEventListener('mousemove', this._onMouseMove, { passive: true });
    window.addEventListener('resize', this._onResize, { passive: true });
    document.addEventListener('visibilitychange', this._onVisibilityChange);
  }

  // ── Private — Event handlers ────────────────────────────────────────────────

  /** @param {MouseEvent} e */
  _onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;

    const count = this.config.spawnRate;
    for (let i = 0; i < count; i++) {
      this._spawnParticle();
    }
  }

  _onResize() {
    this._resize();
  }

  _onVisibilityChange() {
    if (document.hidden) {
      this.pause();
    } else {
      this.resume();
    }
  }

  _resize() {
    if (!this.canvas || !this.ctx) return;
    this._dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.canvas.width = w * this._dpr;
    this.canvas.height = h * this._dpr;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.ctx.setTransform(this._dpr, 0, 0, this._dpr, 0, 0);
  }

  // ── Private — Particle lifecycle ────────────────────────────────────────────

  _spawnParticle() {
    // Find an inactive slot (no allocation needed)
    const pool = this._pool;
    const len = pool.length;
    let p = null;
    for (let i = 0; i < len; i++) {
      if (!pool[i].active) {
        p = pool[i];
        break;
      }
    }
    if (!p) return; // pool exhausted — graceful skip

    const { colors, speed, minSize, maxSize, upwardBias } = this.config;
    const angle = Math.random() * Math.PI * 2;
    const vel = (Math.random() * 0.7 + 0.3) * speed;

    p.x = this.ghost.x;
    p.y = this.ghost.y;
    p.vx = Math.cos(angle) * vel;
    p.vy = Math.sin(angle) * vel + upwardBias;
    p.size = Math.random() * (maxSize - minSize) + minSize;
    p.alpha = 0.85 + Math.random() * 0.15;
    p.color = colors[(Math.random() * colors.length) | 0];
    p.active = true;
    this._activeCount++;
  }

  // ── Private — Render loop ───────────────────────────────────────────────────

  _drawRing() {
    if (!this.config.ringEnabled || !this.ctx) return;
    const { ctx, ghost, config } = this;
    const { ringRadius, ringColor } = config;
    const outerR = ringRadius * 2.5;

    // Soft outer glow
    const grd = ctx.createRadialGradient(ghost.x, ghost.y, 0, ghost.x, ghost.y, outerR);
    grd.addColorStop(0, `${ringColor} 0.15)`);
    grd.addColorStop(1, `${ringColor} 0)`);
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, outerR, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    // Crisp ring stroke
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, ringRadius, 0, Math.PI * 2);
    ctx.strokeStyle = `${ringColor} 0.55)`;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  _loop() {
    if (this._destroyed) return;
    const { ctx, config } = this;
    if (!ctx || !this.canvas) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Lerp ghost toward real cursor
    const lf = config.lerpFactor;
    this.ghost.x += (this.mouse.x - this.ghost.x) * lf;
    this.ghost.y += (this.mouse.y - this.ghost.y) * lf;

    // Clear (reset transform for proper clearing)
    ctx.setTransform(this._dpr, 0, 0, this._dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    // Additive blending for glow
    ctx.globalCompositeOperation = 'lighter';

    this._drawRing();

    // Single-pass update + draw (no Array.filter = zero allocations)
    const pool = this._pool;
    const len = pool.length;
    const { decay, gravity, drag, shrink, alphaFloor } = config;
    const TWO_PI = Math.PI * 2;
    let activeCount = 0;

    for (let i = 0; i < len; i++) {
      const p = pool[i];
      if (!p.active) continue;

      // Physics step
      p.x += p.vx;
      p.y += p.vy;
      p.vy += gravity;
      p.vx *= drag;
      p.alpha *= decay;
      p.size *= shrink;

      if (p.alpha < alphaFloor) {
        p.active = false;
        continue;
      }

      activeCount++;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size > 0.1 ? p.size : 0.1, 0, TWO_PI);
      ctx.fillStyle = `${p.color} ${p.alpha})`;
      ctx.fill();
    }

    this._activeCount = activeCount;
    ctx.globalCompositeOperation = 'source-over';

    this._rafId = requestAnimationFrame(this._loop);
  }
}
