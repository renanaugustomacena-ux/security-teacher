/* eslint-disable import/first */
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../js/services/StorageService.js', () => ({
  storageService: {
    init: vi.fn().mockResolvedValue(undefined),
    loadAll: vi.fn().mockResolvedValue([]),
    save: vi.fn().mockResolvedValue(undefined),
  },
}));

import { AnalyticsService } from '../js/services/AnalyticsService.js';

describe('AnalyticsService', () => {
  let svc;

  beforeEach(() => {
    svc = new AnalyticsService();
  });

  it('records a response and computes accuracy', () => {
    svc.recordResponse({
      itemKey: 'python:0:basics:variable',
      timestamp: new Date().toISOString(),
      exerciseMode: 'writing',
      correct: true,
      responseTimeMs: 3000,
      userAnswer: 'variabile',
      expectedAnswer: 'variabile',
    });
    const a = svc.getItemAnalytics('python:0:basics:variable');
    expect(a).toBeDefined();
    expect(a.totalAttempts).toBe(1);
    expect(a.correctCount).toBe(1);
    expect(a.accuracy).toBe(1);
  });

  it('BKT mastery increases with consecutive correct answers', () => {
    for (let i = 0; i < 10; i++) {
      svc.recordResponse({
        itemKey: 'python:0:basics:func',
        timestamp: new Date().toISOString(),
        exerciseMode: 'writing',
        correct: true,
        responseTimeMs: 2000,
        userAnswer: 'funzione',
        expectedAnswer: 'funzione',
      });
    }
    const a = svc.getItemAnalytics('python:0:basics:func');
    expect(a.masteryP).toBeGreaterThan(0.9);
  });

  it('detects leeches after consecutive failures', () => {
    for (let i = 0; i < 6; i++) {
      svc.recordResponse({
        itemKey: 'linux:0:cmd:chmod',
        timestamp: new Date().toISOString(),
        exerciseMode: 'command',
        correct: false,
        responseTimeMs: 5000,
        userAnswer: 'wrong',
        expectedAnswer: 'chmod 755',
      });
    }
    const leeches = svc.getLeeches(5);
    expect(leeches.length).toBe(1);
  });

  it('getWeakItems returns items below accuracy threshold', () => {
    for (let i = 0; i < 5; i++) {
      svc.recordResponse({
        itemKey: 'python:0:basics:weak',
        timestamp: new Date().toISOString(),
        exerciseMode: 'writing',
        correct: i < 1,
        responseTimeMs: 3000,
        userAnswer: 'x',
        expectedAnswer: 'y',
      });
    }
    const weak = svc.getWeakItems('python', 0.5);
    expect(weak.length).toBe(1);
  });

  it('getMasteredItems returns high-mastery items', () => {
    for (let i = 0; i < 15; i++) {
      svc.recordResponse({
        itemKey: 'python:0:basics:strong',
        timestamp: new Date().toISOString(),
        exerciseMode: 'writing',
        correct: true,
        responseTimeMs: 1500,
        userAnswer: 'ok',
        expectedAnswer: 'ok',
      });
    }
    const mastered = svc.getMasteredItems('python', 0.95);
    expect(mastered.length).toBe(1);
  });

  it('computes topic accuracy', () => {
    svc.recordResponse({
      itemKey: 'cyber:0:a:x',
      timestamp: new Date().toISOString(),
      exerciseMode: 'listening',
      correct: true,
      responseTimeMs: 2000,
      userAnswer: 'a',
      expectedAnswer: 'a',
    });
    svc.recordResponse({
      itemKey: 'cyber:0:a:y',
      timestamp: new Date().toISOString(),
      exerciseMode: 'listening',
      correct: false,
      responseTimeMs: 2000,
      userAnswer: 'b',
      expectedAnswer: 'c',
    });
    const acc = svc.getTopicAccuracy('cyber');
    expect(acc).toBeCloseTo(0.5, 1);
  });
});
