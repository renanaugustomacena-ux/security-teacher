/**
 * ACHIEVEMENT MANAGER - Knowledge AIO
 * =====================================
 *
 * Manages badge unlocking, toast notifications, and the badge gallery.
 * Evaluates achievement conditions against current progress data.
 */

import { achievementDefinitions } from './data/achievements.js';

export class AchievementManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.definitions = achievementDefinitions;
    this.activeToasts = [];
  }

  /**
   * Initialize: ensure achievements structure exists in progress data
   */
  init() {
    if (!this.progressManager?.data) return;

    if (!this.progressManager.data.achievements) {
      this.progressManager.data.achievements = { unlocked: {} };
    }

    // Check time-based secret badges on init
    this._checkTimeBadges();

    // Run initial check
    this.checkAll();
  }

  /**
   * Check all achievement conditions and unlock new badges
   */
  checkAll() {
    if (!this.progressManager?.data) return;

    const data = this.progressManager.data;

    // Ensure achievements structure
    if (!data.achievements) {
      data.achievements = { unlocked: {} };
    }

    // Check time-based secret badges
    this._checkTimeBadges();

    for (const badge of this.definitions) {
      // Skip already unlocked
      if (data.achievements.unlocked[badge.id]) continue;

      try {
        if (badge.condition(data)) {
          this.unlock(badge);
        }
      } catch (err) {
        console.warn(`Achievement check failed for "${badge.id}":`, err.message);
      }
    }
  }

  /**
   * Check time-based secret badges (Night Owl / Early Bird)
   */
  _checkTimeBadges() {
    if (!this.progressManager?.data) return;
    const hour = new Date().getHours();

    if (hour >= 23 || hour < 4) {
      this.progressManager.data._nightOwlTriggered = true;
    }
    if (hour >= 4 && hour < 7) {
      this.progressManager.data._earlyBirdTriggered = true;
    }
  }

  /**
   * Unlock a badge: persist and show toast
   */
  unlock(badge) {
    if (!this.progressManager?.data) return;

    const data = this.progressManager.data;
    if (!data.achievements) {
      data.achievements = { unlocked: {} };
    }

    data.achievements.unlocked[badge.id] = {
      unlockedAt: new Date().toISOString(),
    };

    this.progressManager.saveProgress();
    this.showToast(badge);
  }

  /**
   * Check if a specific badge is unlocked
   */
  isUnlocked(badgeId) {
    return !!this.progressManager?.data?.achievements?.unlocked?.[badgeId];
  }

  /**
   * Get count of unlocked badges
   */
  getUnlockedCount() {
    const unlocked = this.progressManager?.data?.achievements?.unlocked;
    return unlocked ? Object.keys(unlocked).length : 0;
  }

  /**
   * Show animated toast notification for a newly unlocked badge
   */
  showToast(badge) {
    // Remove existing toast if too many
    if (this.activeToasts.length >= 3) {
      const oldest = this.activeToasts.shift();
      oldest?.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <div class="achievement-toast-icon">${badge.icon}</div>
      <div class="achievement-toast-body">
        <div class="achievement-toast-label">Badge Sbloccato! / Badge Unlocked!</div>
        <div class="achievement-toast-title">${badge.title} / ${badge.titleIt}</div>
      </div>
    `;

    document.body.appendChild(toast);
    this.activeToasts.push(toast);

    // Trigger slide-in animation
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      toast.classList.remove('visible');
      toast.classList.add('dismissing');
      toast.addEventListener(
        'transitionend',
        () => {
          toast.remove();
          const idx = this.activeToasts.indexOf(toast);
          if (idx !== -1) this.activeToasts.splice(idx, 1);
        },
        { once: true }
      );
      // Safety fallback
      setTimeout(() => {
        if (toast.parentNode) toast.remove();
      }, 600);
    }, 4000);
  }

  /**
   * Render the full badge gallery into #badges-content
   */
  renderBadgeGallery(filter = 'all') {
    const container = document.getElementById('badges-content');
    if (!container) return;

    const unlockedCount = this.getUnlockedCount();
    const totalCount = this.definitions.length;

    // Category tabs
    const categories = ['all', 'learning', 'practice', 'music', 'streak', 'special'];
    const categoryLabels = {
      all: 'Tutti / All',
      learning: 'Apprendimento / Learning',
      practice: 'Pratica / Practice',
      music: 'Musica / Music',
      streak: 'Serie / Streak',
      special: 'Speciali / Special',
    };

    const tabsHtml = categories
      .map(
        (cat) =>
          `<button class="badge-category-tab${filter === cat ? ' active' : ''}" data-category="${cat}">${categoryLabels[cat]}</button>`
      )
      .join('');

    // Filter badges
    const filteredBadges =
      filter === 'all' ? this.definitions : this.definitions.filter((b) => b.category === filter);

    // Render badge cards
    const cardsHtml = filteredBadges.map((badge) => this._renderBadgeCard(badge)).join('');

    container.innerHTML = `
      <div class="badge-counter">
        <span class="badge-counter-value">${unlockedCount}</span>
        <span class="badge-counter-sep">/</span>
        <span class="badge-counter-total">${totalCount}</span>
        <span class="badge-counter-label">Badge Sbloccati / Badges Unlocked</span>
      </div>
      <div class="badge-counter-bar">
        <div class="badge-counter-fill" style="width: ${totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0}%"></div>
      </div>
      <div class="badge-category-tabs">${tabsHtml}</div>
      <div class="badge-gallery">${cardsHtml}</div>
    `;

    // Bind category tab clicks
    container.querySelectorAll('.badge-category-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        this.renderBadgeGallery(tab.dataset.category);
      });
    });
  }

  /**
   * Render a single badge card
   */
  _renderBadgeCard(badge) {
    const unlocked = this.isUnlocked(badge.id);
    const unlockedData = this.progressManager?.data?.achievements?.unlocked?.[badge.id];

    if (unlocked) {
      const date = unlockedData?.unlockedAt
        ? new Date(unlockedData.unlockedAt).toLocaleDateString()
        : '';
      return `
        <div class="badge-card unlocked">
          <div class="badge-icon">${badge.icon}</div>
          <div class="badge-title">${badge.title}</div>
          <div class="badge-title-it">${badge.titleIt}</div>
          <div class="badge-description">${badge.description}</div>
          <div class="badge-description-it">${badge.descriptionIt}</div>
          ${date ? `<div class="badge-date">${date}</div>` : ''}
        </div>
      `;
    }

    // Locked badge
    if (badge.secret) {
      return `
        <div class="badge-card locked secret">
          <div class="badge-icon">\ud83d\udd12</div>
          <div class="badge-title">???</div>
          <div class="badge-title-it">???</div>
          <div class="badge-description">Badge segreto / Secret badge</div>
        </div>
      `;
    }

    return `
      <div class="badge-card locked">
        <div class="badge-icon">\ud83d\udd12</div>
        <div class="badge-title">${badge.title}</div>
        <div class="badge-title-it">${badge.titleIt}</div>
        <div class="badge-description">${badge.description}</div>
        <div class="badge-description-it">${badge.descriptionIt}</div>
      </div>
    `;
  }
}
