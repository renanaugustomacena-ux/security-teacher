import { describe, it, expect } from 'vitest';
import { ReferenceService } from '../js/services/ReferenceService.js';

const mockTopicData = {
  levels: [
    {
      lessons: [
        {
          title: 'Network Basics',
          items: [
            {
              english: 'firewall',
              italian: 'firewall',
              command: 'ufw status',
              note: 'checks status',
            },
            { english: 'router', italian: 'router', example: 'home router' },
            { english: 'packet', italian: 'pacchetto' },
          ],
        },
        {
          title: 'Security Tools',
          items: [
            { english: 'scanner', italian: 'scanner', command: 'nmap -sV', code: 'nmap()' },
            { english: 'proxy', italian: 'proxy' },
            { english: 'tunnel', italian: 'tunnel', command: 'ssh -L 8080:localhost:80' },
          ],
        },
      ],
    },
  ],
};

describe('ReferenceService', () => {
  const svc = new ReferenceService();

  it('generateCheatsheet returns sections matching lesson count', () => {
    const sections = svc.generateCheatsheet(mockTopicData, 0);
    expect(sections.length).toBe(2);
  });

  it('each section has title and items array', () => {
    const sections = svc.generateCheatsheet(mockTopicData, 0);
    for (const section of sections) {
      expect(section).toHaveProperty('title');
      expect(Array.isArray(section.items)).toBe(true);
    }
  });

  it('items include term and translation fields', () => {
    const sections = svc.generateCheatsheet(mockTopicData, 0);
    const item = sections[0].items[0];
    expect(item.term).toBe('firewall');
    expect(item.translation).toBe('firewall');
  });

  it('command field included when present in source data', () => {
    const sections = svc.generateCheatsheet(mockTopicData, 0);
    const withCmd = sections[0].items[0];
    const withoutCmd = sections[0].items[2];
    expect(withCmd.command).toBe('ufw status');
    expect(withoutCmd.command).toBeUndefined();
  });

  it('generateSummary returns non-empty string', () => {
    const summary = svc.generateSummary(mockTopicData, 0);
    expect(typeof summary).toBe('string');
    expect(summary.length).toBeGreaterThan(0);
  });

  it('getAvailableFields correctly detects which fields exist', () => {
    const allItems = mockTopicData.levels[0].lessons.flatMap((l) => l.items);
    const fields = svc.getAvailableFields(allItems);
    expect(fields).toContain('command');
    expect(fields).toContain('code');
    expect(fields).toContain('note');
    expect(fields).toContain('example');
  });

  it('formatForDisplay returns HTML string containing reference-section class', () => {
    const sections = svc.generateCheatsheet(mockTopicData, 0);
    const html = svc.formatForDisplay(sections);
    expect(typeof html).toBe('string');
    expect(html).toContain('reference-section');
    expect(html).toContain('reference-item');
    expect(html).toContain('reference-section-title');
  });
});
