/**
 * ReferenceService — auto-generated cheatsheet / quick-reference for each
 * topic level.  Pure logic, no external dependencies.
 */

export class ReferenceService {
  /**
   * Build a cheatsheet from topic data for a given level.
   * @param {object} topicData - Full topic data object
   * @param {number} level - Zero-based level index
   * @returns {{ title: string, items: object[] }[]} Array of sections
   */
  generateCheatsheet(topicData, level) {
    const lessons = this._getLessons(topicData, level);
    return lessons.map((lesson) => ({
      title: lesson.title,
      items: (lesson.items || []).map((item) => this._mapItem(item)),
    }));
  }

  /**
   * Return a condensed plain-text summary for a level.
   * @param {object} topicData - Full topic data object
   * @param {number} level - Zero-based level index
   * @returns {string} Multi-line summary text
   */
  generateSummary(topicData, level) {
    const lessons = this._getLessons(topicData, level);
    const lines = [];

    for (const lesson of lessons) {
      lines.push(`## ${lesson.title}`);
      for (const item of lesson.items || []) {
        let line = `- ${item.english} = ${item.italian}`;
        if (item.command) line += `  (${item.command})`;
        lines.push(line);
      }
      lines.push('');
    }

    return lines.join('\n').trim();
  }

  /**
   * Detect which optional fields are present across an items array.
   * @param {object[]} items - Array of item objects
   * @returns {string[]} Array of field names that appear at least once
   */
  getAvailableFields(items) {
    const optional = ['command', 'code', 'note', 'example'];
    return optional.filter((field) => items.some((item) => item[field] != null));
  }

  /**
   * Render sections as an HTML string for the side-panel cheatsheet.
   * @param {{ title: string, items: object[] }[]} sections
   * @returns {string} Semantic HTML
   */
  formatForDisplay(sections) {
    return sections
      .map((section) => {
        const heading = `<h3 class="reference-section-title">${this._esc(section.title)}</h3>`;
        const rows = (section.items || [])
          .map((item) => {
            const parts = [
              `<span class="reference-item-term">${this._esc(item.term)}</span>`,
              `<span class="reference-item-translation">${this._esc(item.translation)}</span>`,
            ];
            if (item.command) {
              parts.push(`<code class="reference-item-command">${this._esc(item.command)}</code>`);
            }
            return `<div class="reference-item">${parts.join('')}</div>`;
          })
          .join('');
        return `<div class="reference-section">${heading}${rows}</div>`;
      })
      .join('');
  }

  // --- Private helpers ---

  _getLessons(topicData, level) {
    return topicData?.levels?.[level]?.lessons || [];
  }

  _mapItem(item) {
    const mapped = {
      term: item.english,
      translation: item.italian,
    };
    if (item.command != null) mapped.command = item.command;
    if (item.code != null) mapped.code = item.code;
    if (item.note != null) mapped.note = item.note;
    return mapped;
  }

  _esc(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

export const referenceService = new ReferenceService();
