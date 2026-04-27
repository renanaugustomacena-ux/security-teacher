/**
 * PracticeHUD
 * Surfaces in-session momentum that already exists in the data layer:
 *   - consecutive-correct streak
 *   - tier crossings at 3 / 5 / 10 / 15 / 25 fire a sweep + SFX + (≥10) matrix tint
 *   - softer milestones at every +5 above 25
 *
 * The aesthetic is cyber-instrument: a thin gold sweep across the practice
 * card, a pulse on the streak counter, an ambient hue-rotate on the Matrix
 * Rain background. Nothing cartoonish; everything defers to the visual
 * signature of the app.
 *
 * Wiring contract: callers invoke `practiceHUD.onAnswerResult({correct, streak})`
 * after they update their own streak-correct/wrong logic. The HUD owns the
 * presentation layer only — it does not mutate score, XP, or store data.
 */

import { sfxService } from './services/SfxService.js';

const TIER_THRESHOLDS = [3, 5, 10, 15, 25];
const STEP_AFTER_25 = 5;
const TINT_TIER_FLOOR = 10;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

class PracticeHUD {
  constructor() {
    this.lastStreak = 0;
    this.lastTintTier = 0;
  }

  reset() {
    this.lastStreak = 0;
    this.setMatrixTint(0);
  }

  reducedMotion() {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    try {
      return window.matchMedia(REDUCED_MOTION_QUERY).matches;
    } catch (e) {
      return false;
    }
  }

  /**
   * Returns the milestone tier reached when streak crosses from `prev` to
   * `next`. 0 means no milestone fired this answer.
   */
  detectMilestone(prev, next) {
    if (next <= prev) return 0;
    for (const t of TIER_THRESHOLDS) {
      if (prev < t && next >= t) return t;
    }
    if (next > 25 && next % STEP_AFTER_25 === 0 && next > prev) return next;
    return 0;
  }

  /**
   * Pick the topic-aware HUD container. Active practice screen is whichever
   * has visible content; we update both streak labels regardless.
   */
  _activeCard() {
    const candidates = [
      document.getElementById('topic-practice-content'),
      document.getElementById('practice-content'),
    ];
    return candidates.find((el) => el && el.offsetParent !== null) || candidates[0] || null;
  }

  setMatrixTint(tier) {
    if (typeof document === 'undefined' || !document.documentElement) return;
    const root = document.documentElement;
    if (tier <= 0) {
      root.style.removeProperty('--streak-tint-deg');
      root.style.removeProperty('--streak-tint-strength');
      this.lastTintTier = 0;
      return;
    }
    if (tier === this.lastTintTier) return;
    // Map tier 10 → 12°, 15 → 22°, 25 → 35°, then taper.
    const deg = Math.min(45, 6 + tier * 1.2);
    const strength = Math.min(0.35, 0.1 + tier * 0.012);
    root.style.setProperty('--streak-tint-deg', `${deg}deg`);
    root.style.setProperty('--streak-tint-strength', String(strength));
    this.lastTintTier = tier;
  }

  /**
   * Slide a thin gold ribbon across the active practice card.
   * Element auto-removes after the CSS animation finishes.
   */
  fireSweep(tier) {
    if (this.reducedMotion()) return;
    const card = this._activeCard();
    if (!card) return;
    const sweep = document.createElement('div');
    sweep.className = 'practice-hud-sweep';
    sweep.dataset.tier = String(tier);
    const label = tier >= 25 ? 'COMBO' : `STREAK ×${tier}`;
    sweep.textContent = label;
    card.appendChild(sweep);
    sweep.addEventListener('animationend', () => sweep.remove(), { once: true });
    // Safety: if animationend never fires (hidden tab, browser quirk), kill it.
    setTimeout(() => sweep.remove(), 2000);
  }

  pulseStreakCounter() {
    if (this.reducedMotion()) return;
    const ids = ['practice-streak', 'topic-practice-streak'];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('streak-pulse');
      // Force reflow so the animation can replay.
      // eslint-disable-next-line no-unused-expressions
      el.offsetWidth;
      el.classList.add('streak-pulse');
    });
  }

  /**
   * Main entry point. Called from PracticeManager.handleResult and
   * TopicPracticeManager.handleResult after their own state mutations.
   */
  onAnswerResult({ correct, streak }) {
    const prev = this.lastStreak;
    const next = correct ? streak : 0;
    this.lastStreak = next;

    if (correct) {
      this.pulseStreakCounter();
      const tier = this.detectMilestone(prev, next);
      if (tier > 0) {
        this.fireSweep(tier);
        sfxService.streakTier(tier);
        this._milestoneHaptic();
        if (tier >= TINT_TIER_FLOOR) this.setMatrixTint(tier);
      }
    } else if (prev >= TINT_TIER_FLOOR) {
      // Streak broke from a tinted tier — fade tint back.
      this.setMatrixTint(0);
    }
  }

  _milestoneHaptic() {
    if (this.reducedMotion()) return;
    if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
    try {
      navigator.vibrate([20, 40, 20]);
    } catch (e) {
      // ignore
    }
  }
}

export const practiceHUD = new PracticeHUD();
export { PracticeHUD };
