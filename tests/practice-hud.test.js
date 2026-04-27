import { describe, it, expect, beforeEach } from 'vitest';
import { PracticeHUD } from '../js/PracticeHUD.js';

describe('PracticeHUD.detectMilestone', () => {
  let hud;
  beforeEach(() => {
    hud = new PracticeHUD();
  });

  it('fires the threshold once on the answer that crosses it', () => {
    expect(hud.detectMilestone(2, 3)).toBe(3);
    expect(hud.detectMilestone(4, 5)).toBe(5);
    expect(hud.detectMilestone(9, 10)).toBe(10);
  });

  it('fires nothing on the next answer past a threshold', () => {
    expect(hud.detectMilestone(3, 4)).toBe(0);
    expect(hud.detectMilestone(5, 6)).toBe(0);
  });

  it('returns 0 when streak does not advance', () => {
    expect(hud.detectMilestone(5, 5)).toBe(0);
    expect(hud.detectMilestone(5, 0)).toBe(0);
  });

  it('continues firing every +5 after streak 25', () => {
    expect(hud.detectMilestone(25, 30)).toBe(30);
    expect(hud.detectMilestone(30, 35)).toBe(35);
    expect(hud.detectMilestone(30, 31)).toBe(0);
    expect(hud.detectMilestone(30, 32)).toBe(0);
  });

  it('only fires the lowest crossed threshold when multiple are passed at once', () => {
    // Going from 2 to 6 in a single jump (e.g., a partial-credit recovery
    // path) should announce the lower tier rather than skipping straight to 5.
    expect(hud.detectMilestone(2, 6)).toBe(3);
  });
});
