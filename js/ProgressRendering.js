export const progressRenderingMixin = {

  renderProgress() {
    if (!this.data) return;
    const wordsEl = document.getElementById('total-words');
    if (wordsEl) wordsEl.textContent = this.data.wordsLearned;

    const songsEl = document.getElementById('songs-completed');
    if (songsEl) songsEl.textContent = this.data.songsCompleted;

    const streakEl = document.getElementById('streak-days');
    if (streakEl) streakEl.textContent = this.data.streak.current;

    this.renderTimeSpent();

    const levelProgressEl = document.getElementById('level-progress');
    const levelPercentEl = document.getElementById('level-percent');

    if (levelProgressEl) {
      levelProgressEl.style.width = `${this.data.levelProgress}%`;
    }
    if (levelPercentEl) {
      levelPercentEl.textContent = `${this.data.levelProgress}%`;
    }

    const levelBadge = document.querySelector('.user-level .level-badge');
    if (levelBadge) {
      levelBadge.textContent = `Livello ${this.data.currentLevel}`;
    }

    this.renderXP();
    this.renderActivities();
  },

  renderTimeSpent() {
    if (!this.data) return;
    const timeEl = document.getElementById('total-time');
    if (timeEl) {
      const minutes = this.data.todayTimeMinutes;
      if (minutes < 60) {
        timeEl.textContent = `${minutes}m`;
      } else {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        timeEl.textContent = `${hours}h ${mins}m`;
      }
    }
  },

  renderActivities() {
    if (!this.data) return;
    const container = document.getElementById('activity-list');
    if (!container) return;

    if (this.data.activities.length === 0) {
      container.innerHTML = `
                <li class="activity-item">
                    <span class="activity-icon"></span>
                    <span class="activity-text">Inizia a imparare per vedere le attività! / Start learning to see activities!</span>
                </li>
            `;
      return;
    }

    container.innerHTML = '';

    const recent = this.data.activities.slice(0, 5);
    recent.forEach((activity) => {
      const icon = this.getActivityIcon(activity.type);
      const time = this.formatTimeAgo(activity.timestamp);

      const item = document.createElement('li');
      item.className = 'activity-item';
      item.innerHTML = `
                <span class="activity-icon">${icon}</span>
                <span class="activity-text">${activity.description}</span>
                <span style="margin-left: auto; color: var(--text-muted); font-size: 0.8rem;">${time}</span>
            `;
      container.appendChild(item);
    });
  },

  getActivityIcon(type) {
    const icons = {
      learn: '',
      music: '',
      practice: '',
      level: '',
      streak: '',
    };
    return icons[type] || '';
  },

  formatTimeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Ora / Now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m fa / ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h fa / ago`;
    return `${Math.floor(seconds / 86400)}d fa / ago`;
  },
};
