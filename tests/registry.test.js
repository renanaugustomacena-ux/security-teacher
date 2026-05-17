import { describe, it, expect } from 'vitest';
import { topicsRegistry, getTopicMeta } from '../js/topics/registry.js';

const ORIGINAL_IDS = ['cybersecurity', 'python', 'linux', 'software-dev'];
const EXPANSION_IDS = [
  'ai-engineering',
  'ethical-hacking',
  'docker-k8s',
  'system-monitoring',
  'devsecops',
  'c-programming',
  'cpp',
  'nodejs',
  'rust',
  'cloud-computing',
  'networking',
  'databases',
  'git-vcs',
];

const REQUIRED_FIELDS = [
  'id',
  'title',
  'titleIt',
  'icon',
  'description',
  'descriptionIt',
  'levelCount',
  'color',
];

describe('topicsRegistry', () => {
  it('is an array with exactly 17 entries', () => {
    expect(Array.isArray(topicsRegistry)).toBe(true);
    expect(topicsRegistry).toHaveLength(17);
  });

  it('every entry has all required fields', () => {
    for (const topic of topicsRegistry) {
      for (const field of REQUIRED_FIELDS) {
        expect(topic, `topic "${topic.id}" missing field "${field}"`).toHaveProperty(field);
      }
    }
  });

  it('all topic IDs are unique', () => {
    const ids = topicsRegistry.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('original topics have levelCount 12', () => {
    for (const id of ORIGINAL_IDS) {
      const topic = topicsRegistry.find((t) => t.id === id);
      expect(topic, `original topic "${id}" not found`).toBeDefined();
      expect(topic.levelCount, `${id} should have 12 levels`).toBe(12);
    }
  });

  it('expansion topics have levelCount 24', () => {
    for (const id of EXPANSION_IDS) {
      const topic = topicsRegistry.find((t) => t.id === id);
      expect(topic, `expansion topic "${id}" not found`).toBeDefined();
      expect(topic.levelCount, `${id} should have 24 levels`).toBe(24);
    }
  });

  it('every ID is a non-empty string', () => {
    for (const topic of topicsRegistry) {
      expect(typeof topic.id).toBe('string');
      expect(topic.id.length).toBeGreaterThan(0);
    }
  });

  it('every color is a valid hex color', () => {
    for (const topic of topicsRegistry) {
      expect(topic.color, `${topic.id} color`).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});

describe('getTopicMeta', () => {
  it('returns correct metadata for a known topic ID', () => {
    const meta = getTopicMeta('cybersecurity');
    expect(meta).not.toBeNull();
    expect(meta.id).toBe('cybersecurity');
    expect(meta.title).toBe('Cybersecurity');
    expect(meta.levelCount).toBe(12);
  });

  it('returns null for an unknown topic ID', () => {
    expect(getTopicMeta('nonexistent-topic')).toBeNull();
  });

  it('returns null for undefined input', () => {
    expect(getTopicMeta(undefined)).toBeNull();
  });

  it('returns the same object reference as the registry entry', () => {
    const fromRegistry = topicsRegistry.find((t) => t.id === 'python');
    const fromGetter = getTopicMeta('python');
    expect(fromGetter).toBe(fromRegistry);
  });
});
