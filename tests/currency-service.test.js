/* eslint-disable import/first */
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../js/services/StorageService.js', () => ({
  storageService: {
    load: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  },
}));

import { CurrencyService } from '../js/services/CurrencyService.js';

describe('CurrencyService', () => {
  let svc;

  beforeEach(async () => {
    svc = new CurrencyService();
    await svc.init();
  });

  it('starts with 0 balance', () => {
    expect(svc.getBalance()).toBe(0);
  });

  it('earn increases balance', () => {
    svc.earn(100, 'test');
    expect(svc.getBalance()).toBe(100);
  });

  it('spend decreases balance', () => {
    svc.earn(200, 'test');
    const result = svc.spend(50, 'purchase');
    expect(result).toBe(true);
    expect(svc.getBalance()).toBe(150);
  });

  it('spend fails when insufficient balance', () => {
    svc.earn(10, 'test');
    const result = svc.spend(50, 'purchase');
    expect(result).toBe(false);
    expect(svc.getBalance()).toBe(10);
  });

  it('canAfford checks balance correctly', () => {
    svc.earn(100, 'test');
    expect(svc.canAfford(100)).toBe(true);
    expect(svc.canAfford(101)).toBe(false);
  });

  it('getStats returns correct totals', () => {
    svc.earn(200, 'a');
    svc.earn(100, 'b');
    svc.spend(50, 'c');
    const stats = svc.getStats();
    expect(stats.balance).toBe(250);
    expect(stats.totalEarned).toBe(300);
    expect(stats.totalSpent).toBe(50);
  });

  it('transactions are capped at 200', () => {
    for (let i = 0; i < 210; i++) {
      svc.earn(1, `tx_${i}`);
    }
    expect(svc.transactions.length).toBeLessThanOrEqual(200);
  });
});
