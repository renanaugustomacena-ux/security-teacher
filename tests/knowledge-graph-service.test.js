import { describe, it, expect, beforeEach } from 'vitest';
import { KnowledgeGraphService } from '../js/services/KnowledgeGraphService.js';

describe('KnowledgeGraphService', () => {
  let svc;
  const TOPIC = 'security';
  const GRAPH = {
    crypto: ['encoding', 'hashing'],
    network_security: ['networking_basics'],
    pentesting: ['network_security', 'crypto'],
    encoding: [],
    hashing: [],
    networking_basics: [],
  };

  beforeEach(() => {
    svc = new KnowledgeGraphService();
    svc.registerPrerequisites(TOPIC, GRAPH);
  });

  it('getInnerFringe with no mastery returns root nodes', () => {
    const fringe = svc.getInnerFringe(TOPIC, new Set());
    expect(fringe.has('encoding')).toBe(true);
    expect(fringe.has('hashing')).toBe(true);
    expect(fringe.has('networking_basics')).toBe(true);
    expect(fringe.size).toBe(3);
  });

  it('getInnerFringe after mastering encoding+hashing returns crypto', () => {
    const mastered = new Set(['encoding', 'hashing']);
    const fringe = svc.getInnerFringe(TOPIC, mastered);
    expect(fringe.has('crypto')).toBe(true);
    // networking_basics is still unmastered and its (empty) prereqs are met
    expect(fringe.has('networking_basics')).toBe(true);
    expect(fringe.has('encoding')).toBe(false);
    expect(fringe.has('hashing')).toBe(false);
  });

  it('isReady returns false when prerequisites missing', () => {
    expect(svc.isReady(TOPIC, 'crypto', new Set())).toBe(false);
    expect(svc.isReady(TOPIC, 'pentesting', new Set(['crypto']))).toBe(false);
  });

  it('isReady returns true when prerequisites met', () => {
    expect(svc.isReady(TOPIC, 'crypto', new Set(['encoding', 'hashing']))).toBe(true);
    expect(svc.isReady(TOPIC, 'encoding', new Set())).toBe(true);
  });

  it('getDependentsOf returns correct dependents', () => {
    const deps = svc.getDependentsOf(TOPIC, 'encoding');
    expect(deps).toContain('crypto');
    expect(deps).not.toContain('pentesting');

    const depsCrypto = svc.getDependentsOf(TOPIC, 'crypto');
    expect(depsCrypto).toContain('pentesting');

    const depsLeaf = svc.getDependentsOf(TOPIC, 'pentesting');
    expect(depsLeaf).toHaveLength(0);
  });

  it('getTopologicalOrder returns valid ordering (roots before dependents)', () => {
    const order = svc.getTopologicalOrder(TOPIC);
    expect(order).toHaveLength(6);

    const idx = (ctx) => order.indexOf(ctx);
    // Roots must come before their dependents.
    expect(idx('encoding')).toBeLessThan(idx('crypto'));
    expect(idx('hashing')).toBeLessThan(idx('crypto'));
    expect(idx('networking_basics')).toBeLessThan(idx('network_security'));
    expect(idx('crypto')).toBeLessThan(idx('pentesting'));
    expect(idx('network_security')).toBeLessThan(idx('pentesting'));
  });

  it('getRecommendedNext ranks by unlock potential', () => {
    // With empty mastery the inner fringe is {encoding, hashing, networking_basics}.
    // Mastering networking_basics unlocks network_security (1 new ready context).
    // Mastering encoding alone does NOT unlock crypto (hashing still missing) → 0.
    // Mastering hashing alone does NOT unlock crypto (encoding still missing) → 0.
    const rec = svc.getRecommendedNext(TOPIC, new Set(), 3);
    expect(rec[0]).toBe('networking_basics');
    expect(rec).toHaveLength(3);
  });

  it('getOuterFringe returns one-hop-beyond items', () => {
    // With empty mastery: inner fringe = {encoding, hashing, networking_basics}.
    // Outer fringe = contexts whose prereqs ⊆ (mastered ∪ inner fringe).
    // crypto needs encoding + hashing (both in inner fringe) → outer.
    // network_security needs networking_basics (in inner fringe) → outer.
    // pentesting needs network_security + crypto (not in mastered ∪ inner) → NOT outer.
    const outer = svc.getOuterFringe(TOPIC, new Set());
    expect(outer.has('crypto')).toBe(true);
    expect(outer.has('network_security')).toBe(true);
    expect(outer.has('pentesting')).toBe(false);
    expect(outer.size).toBe(2);
  });
});
