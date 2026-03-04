/**
 * MorphBackground — 3D morphing matrix rain with glass-like deformation.
 *
 * Renders the classic matrix rain to an offscreen canvas, then maps it as a
 * dynamic texture onto a Three.js PlaneGeometry.  A custom ShaderMaterial
 * deforms the surface toward the viewer wherever the cursor sits, adding
 * refraction, Fresnel rim-glow and a specular highlight.
 *
 * Three.js is loaded dynamically so the rest of the app keeps working even
 * if the CDN is unreachable.  Falls back to plain 2D canvas when WebGL or
 * Three.js is unavailable.
 */

/* ------------------------------------------------------------------ */
/*  Default configuration                                              */
/* ------------------------------------------------------------------ */
const DEFAULTS = {
  bumpRadius: 0.35, // Increased for larger "flashlight" reveal
  bumpStrength: 0.12,
  lerpFactor: 0.08,
  planeSegments: 128,
  refractionStrength: 0.02,
};

/* ------------------------------------------------------------------ */
/*  GLSL shaders                                                       */
/* ------------------------------------------------------------------ */
const vertexShader = /* glsl */ `
  uniform vec2  uMouse;
  uniform float uRadius;
  uniform float uStrength;
  uniform float uTime;

  varying vec2  vUv;
  varying float vDeform;

  void main() {
    vUv = uv;

    float dist   = distance(uv, uMouse);
    float deform = 1.0 - smoothstep(0.0, uRadius, dist);

    // Subtle sine ripple at bump edge for organic feel
    deform += sin(dist * 30.0 - uTime * 2.0) * 0.012 * deform;

    vDeform = deform;

    vec3 pos = position;
    pos.z   += deform * uStrength;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2      uMouse;
  uniform float     uRadius;
  uniform float     uRefraction;
  uniform float     uTime;

  varying vec2  vUv;
  varying float vDeform;

  void main() {
    // --- refraction: offset UV away from mouse center ---
    vec2 dir       = vUv - uMouse;
    vec2 refracted = vUv - dir * vDeform * uRefraction;

    vec4 texColor = texture2D(uTexture, refracted);

    // --- Fresnel rim glow ---
    float d       = clamp(vDeform, 0.0, 1.0);
    float fresnel = pow(1.0 - d, 3.0) * d * 4.0;
    vec3  rimCol  = vec3(0.1, 0.9, 0.3) * fresnel * 0.35;

    // --- specular highlight at peak ---
    float spec    = pow(d, 8.0) * 0.15;
    vec3  specCol = vec3(0.7, 1.0, 0.8) * spec;

    // --- REVEAL MASK: Hidden by default, revealed by proximity ---
    // Use a smoothstep on the deformation factor to create a soft spotlight edge
    float revealMask = smoothstep(0.0, 0.2, d);
    
    // Apply mask to the base texture color
    vec3 revealedColor = texColor.rgb * revealMask;

    // Combine: revealed texture + lighting effects
    vec3 final = revealedColor + (rimCol + specCol) * revealMask;

    gl_FragColor = vec4(final, 1.0);
  }
`;

/* ================================================================== */
/*  MorphBackground class                                              */
/* ================================================================== */
export class MorphBackground {
  constructor(opts = {}) {
    this.cfg = { ...DEFAULTS, ...opts };

    // Three.js module reference (loaded dynamically)
    this.THREE = null;

    // State
    this.mouse = { x: 0.5, y: 0.5 };
    this.smoothMouse = { x: 0.5, y: 0.5 };
    this.mouseActive = false;

    // References (filled during init)
    this.offCanvas = null;
    this.offCtx = null;
    this.rainInterval = null;
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.mesh = null;
    this.texture = null;
    this.material = null;
    this.animId = null;

    // Matrix rain data
    this.drops = [];
    this.columns = 0;

    // Bound handlers (for cleanup)
    this._onMouseMove = this._handleMouseMove.bind(this);
    this._onTouchMove = this._handleTouchMove.bind(this);
    this._onMouseLeave = this._handleMouseLeave.bind(this);
    this._onResize = this._handleResize.bind(this);
  }

  /* ---------------------------------------------------------------- */
  /*  Public API                                                       */
  /* ---------------------------------------------------------------- */

  async init() {
    this.initOffscreenCanvas();
    this.initMatrixRain();

    // Try loading Three.js dynamically — fall back to 2D if it fails
    try {
      this.THREE = await import('three');
    } catch (err) {
      console.warn('Three.js unavailable, using 2D fallback:', err);
      this.fallbackTo2D();
      return;
    }

    if (this.isWebGLAvailable()) {
      this.initThreeJS();
      this.initPlane();
      this.bindEvents();
      this.animate();
    } else {
      this.fallbackTo2D();
    }
  }

  dispose() {
    // Stop matrix rain
    if (this.rainInterval) clearInterval(this.rainInterval);

    // Stop animation loop
    if (this.animId) cancelAnimationFrame(this.animId);

    // Remove listeners
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('touchmove', this._onTouchMove);
    document.removeEventListener('mouseleave', this._onMouseLeave);
    window.removeEventListener('resize', this._onResize);

    // Dispose Three.js resources
    if (this.texture) this.texture.dispose();
    if (this.material) this.material.dispose();
    if (this.mesh) this.mesh.geometry.dispose();
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
    }
  }

  /* ---------------------------------------------------------------- */
  /*  WebGL availability check + 2D fallback                           */
  /* ---------------------------------------------------------------- */

  isWebGLAvailable() {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch {
      return false;
    }
  }

  fallbackTo2D() {
    // Show the offscreen canvas directly in the DOM canvas
    const domCanvas = document.getElementById('matrix-morph');
    if (!domCanvas) return;

    const ctx = domCanvas.getContext('2d');

    // Smooth mouse tracking for 2D fallback
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;

    const draw = () => {
      // 1. Interpolate mouse position
      // Note: this.mouse.y is inverted (1.0 - y) for WebGL, so we invert back
      const targetX = this.mouseActive ? this.mouse.x * domCanvas.width : domCanvas.width / 2;
      const targetY = this.mouseActive
        ? (1.0 - this.mouse.y) * domCanvas.height
        : domCanvas.height / 2;

      currentX += (targetX - currentX) * this.cfg.lerpFactor;
      currentY += (targetY - currentY) * this.cfg.lerpFactor;

      // 2. Clear to black
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, domCanvas.width, domCanvas.height);

      // 3. Draw the matrix rain (full screen)
      // We'll draw it to a temporary layer or just draw it here and mask it?
      // Better approach: Draw matrix, then "mask" it with a gradient?
      // Actually:
      // A. Fill Black.
      // B. Draw Matrix.
      // C. Mask Matrix using destination-in + Gradient.
      // But we want the background to be black, not transparent.
      // So:
      // A. Draw Matrix fully.
      // B. Use 'destination-in' with a radial gradient (white -> transparent).
      //    This keeps the matrix only in the white circle.
      // C. Use 'destination-over' to put Black behind everything.

      ctx.drawImage(this.offCanvas, 0, 0, domCanvas.width, domCanvas.height);

      // Create "flashlight" mask
      ctx.globalCompositeOperation = 'destination-in';

      // Gradient radius proportional to screen or fixed
      const radius = Math.max(domCanvas.width, domCanvas.height) * this.cfg.bumpRadius;
      const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, domCanvas.width, domCanvas.height);

      // Restore black background behind the masked matrix
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, domCanvas.width, domCanvas.height);

      this.animId = requestAnimationFrame(draw);
    };

    const resize = () => {
      domCanvas.width = window.innerWidth;
      domCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    draw();
  }

  /* ---------------------------------------------------------------- */
  /*  Offscreen canvas + matrix rain                                   */
  /* ---------------------------------------------------------------- */

  initOffscreenCanvas() {
    this.offCanvas = document.createElement('canvas');
    this.offCanvas.width = window.innerWidth;
    this.offCanvas.height = window.innerHeight;
    this.offCtx = this.offCanvas.getContext('2d');
  }

  initMatrixRain() {
    const charSets = {
      katakana:
        'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン',
      latin: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      nums: '0123456789',
      cyrillic: 'БГДЁЖЗИЙЛПФЦЧШЩЪЫЭЮЯ',
      greek: 'ΔΘΛΞΠΣΦΨΩ',
      runes: 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛈᛇᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ',
      braille: '⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯',
      binary: '01',
    };

    const activeStyles = Object.keys(charSets);
    const baseFontSize = 24; // Slightly smaller for more density

    // Font variety for each column
    const fontFamilies = [
      'monospace',
      'serif',
      'sans-serif',
      'Georgia, serif',
      'Courier New, monospace',
      'Times New Roman, serif',
      'Verdana, sans-serif',
      'Impact, sans-serif',
    ];

    const canvas = this.offCanvas;
    const ctx = this.offCtx;

    const initDrops = () => {
      this.columns = Math.floor(canvas.width / baseFontSize);
      this.drops.length = 0;
      for (let x = 0; x < this.columns; x++) {
        this.drops[x] = {
          y: (Math.random() * canvas.height) / baseFontSize,
          speed: 0.25 + Math.random() * 0.75, // Faster, more varied speed
          styleIndex: Math.floor(Math.random() * activeStyles.length),
          fontIndex: Math.floor(Math.random() * fontFamilies.length),
          fontSize: baseFontSize + Math.floor(Math.random() * 6) - 3,
          delay: Math.random() * 100,
        };
      }
    };
    initDrops();

    // Store initDrops for resize handling
    this._initDrops = initDrops;

    const draw = () => {
      // 1. Fade out effect (Trails)
      // Low opacity black rect allows previous frames to show through as trailing ghosts
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < this.drops.length; i++) {
        const drop = this.drops[i];

        if (drop.delay > 0) {
          drop.delay--;
          continue;
        }

        // Occasionally switch character set
        if (Math.random() > 0.98) {
          drop.styleIndex = Math.floor(Math.random() * activeStyles.length);
        }
        // Occasionally switch font
        if (Math.random() > 0.99) {
          drop.fontIndex = Math.floor(Math.random() * fontFamilies.length);
        }

        const styleName = activeStyles[drop.styleIndex];
        const chars = charSets[styleName];
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const font = fontFamilies[drop.fontIndex];

        ctx.font = `${drop.fontSize}px ${font}`;

        // Bright green lead, fading to darker green
        // Random brightness flicker
        const isBright = Math.random() > 0.9;
        const brightness = isBright ? 255 : 50 + Math.floor(Math.random() * 150);
        ctx.fillStyle = `rgba(0, ${brightness}, 0, 1.0)`;

        // Draw character
        ctx.fillText(text, i * baseFontSize, Math.floor(drop.y) * baseFontSize);

        // Move drop
        drop.y += drop.speed;

        // Reset if off screen
        if (drop.y * baseFontSize > canvas.height && Math.random() > 0.95) {
          drop.y = 0;
          drop.speed = 0.25 + Math.random() * 0.75; // New random speed
          drop.delay = Math.random() * 20; // Slight delay before restarting
        }
      }
    };

    // Run at ~30 FPS for smooth rain
    this.rainInterval = setInterval(draw, 33);
  }

  /* ---------------------------------------------------------------- */
  /*  Three.js setup                                                   */
  /* ---------------------------------------------------------------- */

  initThreeJS() {
    const { THREE } = this;
    const domCanvas = document.getElementById('matrix-morph');
    if (!domCanvas) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);

    this.renderer = new THREE.WebGLRenderer({ canvas: domCanvas, alpha: false });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(dpr);

    // Orthographic camera — 1:1 screen mapping
    this.camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    this.camera.position.z = 1;

    this.scene = new THREE.Scene();
  }

  initPlane() {
    const { THREE } = this;
    const seg = this.cfg.planeSegments;

    this.texture = new THREE.CanvasTexture(this.offCanvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: this.texture },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uRadius: { value: this.cfg.bumpRadius },
        uStrength: { value: this.cfg.bumpStrength },
        uRefraction: { value: this.cfg.refractionStrength },
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    });

    const geometry = new THREE.PlaneGeometry(1, 1, seg, seg);
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);
  }

  /* ---------------------------------------------------------------- */
  /*  Events                                                           */
  /* ---------------------------------------------------------------- */

  bindEvents() {
    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('touchmove', this._onTouchMove, { passive: true });
    document.addEventListener('mouseleave', this._onMouseLeave);
    window.addEventListener('resize', this._onResize);
  }

  _handleMouseMove(e) {
    this.mouse.x = e.clientX / window.innerWidth;
    this.mouse.y = 1.0 - e.clientY / window.innerHeight; // flip Y for GL
    this.mouseActive = true;
  }

  _handleTouchMove(e) {
    const t = e.touches[0];
    if (!t) return;
    this.mouse.x = t.clientX / window.innerWidth;
    this.mouse.y = 1.0 - t.clientY / window.innerHeight;
    this.mouseActive = true;
  }

  _handleMouseLeave() {
    this.mouseActive = false;
  }

  _handleResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Resize offscreen canvas + reinit drops
    this.offCanvas.width = w;
    this.offCanvas.height = h;
    if (this._initDrops) this._initDrops();

    // Resize renderer
    if (this.renderer) {
      this.renderer.setSize(w, h);
    }
  }

  /* ---------------------------------------------------------------- */
  /*  Animation loop                                                   */
  /* ---------------------------------------------------------------- */

  animate() {
    const loop = () => {
      this.animId = requestAnimationFrame(loop);

      const lerp = this.cfg.lerpFactor;

      // Smooth mouse towards target (or center when inactive)
      const tx = this.mouseActive ? this.mouse.x : 0.5;
      const ty = this.mouseActive ? this.mouse.y : 0.5;
      this.smoothMouse.x += (tx - this.smoothMouse.x) * lerp;
      this.smoothMouse.y += (ty - this.smoothMouse.y) * lerp;

      // Lerp bump strength — fade to 0 when mouse leaves
      const targetStrength = this.mouseActive ? this.cfg.bumpStrength : 0;
      const u = this.material.uniforms;
      u.uStrength.value += (targetStrength - u.uStrength.value) * lerp;

      u.uMouse.value.set(this.smoothMouse.x, this.smoothMouse.y);
      u.uTime.value = performance.now() * 0.001;

      // Mark texture as needing upload (matrix rain draws at ~30fps via setInterval)
      this.texture.needsUpdate = true;

      this.renderer.render(this.scene, this.camera);
    };

    loop();
  }

  /* ---------------------------------------------------------------- */
  /*  Lifecycle: pause / resume / destroy                              */
  /* ---------------------------------------------------------------- */

  pause() {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.rainInterval) {
      clearInterval(this.rainInterval);
      this.rainInterval = null;
    }
  }

  resume() {
    if (!this.animId && this.renderer) {
      this.initMatrixRain();
      this.animate();
    }
  }

  destroy() {
    this.pause();
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('touchmove', this._onTouchMove);
    document.removeEventListener('mouseleave', this._onMouseLeave);
    window.removeEventListener('resize', this._onResize);

    if (this.renderer) {
      this.renderer.dispose();
      this.material?.dispose();
      this.mesh?.geometry?.dispose();
      this.texture?.dispose();
    }
  }
}
