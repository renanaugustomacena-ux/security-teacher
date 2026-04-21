/**
 * ProfileManager
 * Renders the Profile tab: Google sign-in state, personal stats snapshot,
 * and a compact 30-day study-time bar pulled from StreakCalendarManager.
 */
import { authService } from './services/AuthService.js';
import { escapeHtml, escapeAttr, sanitizeUrl } from './utils/SanitizeHtml.js';

const PROFILE_CONTAINER_ID = 'profile-content';

function statCard(label, value) {
  return `<div class="profile-stat"><span class="profile-stat-value">${escapeHtml(String(value ?? '0'))}</span><span class="profile-stat-label">${escapeHtml(label)}</span></div>`;
}

export class ProfileManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this._unsubscribe = null;
    this._classObserver = null;
    this._onDocClick = null;
  }

  init() {
    if (this._unsubscribe) return;
    this._unsubscribe = authService.onChange(() => this.render());

    const section = document.getElementById('profile');
    if (section) {
      const observer = new MutationObserver(() => {
        if (section.classList.contains('active')) this.render();
      });
      observer.observe(section, { attributes: true, attributeFilter: ['class'] });
      this._classObserver = observer;
    }

    this._onDocClick = (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.id === 'profile-signout-btn') {
        this.handleSignOut();
      }
    };
    document.addEventListener('click', this._onDocClick);
  }

  destroy() {
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }
    if (this._classObserver) {
      this._classObserver.disconnect();
      this._classObserver = null;
    }
    if (this._onDocClick) {
      document.removeEventListener('click', this._onDocClick);
      this._onDocClick = null;
    }
  }

  async handleSignOut() {
    await authService.signOut();
  }

  render() {
    const container = document.getElementById(PROFILE_CONTAINER_ID);
    if (!container) return;

    const user = authService.getCurrentUser();
    if (!user) {
      container.innerHTML = this._renderSignedOut();
      const btnHost = document.getElementById('google-signin-button');
      if (btnHost) authService.renderButton(btnHost);
      return;
    }

    container.innerHTML = this._renderSignedIn(user);
    this._renderStudyBar();
  }

  _renderSignedOut() {
    return `
      <div class="profile-card profile-signin">
        <h3>Accedi per salvare i tuoi progressi</h3>
        <p class="profile-hint">
          Usa il tuo account Google per mantenere statistiche personali separate.
          Nessun dato lascia il tuo dispositivo — l'autenticazione serve solo a
          isolare il tuo profilo locale.
        </p>
        <div id="google-signin-button" class="google-signin-slot"></div>
      </div>
    `;
  }

  _renderSignedIn(user) {
    const stats = this.progressManager?.getStats?.() || {};
    const safePicture = user.picture
      ? sanitizeUrl(user.picture, { requireHost: 'googleusercontent.com' })
      : '';
    const avatar = safePicture
      ? `<img class="profile-avatar" src="${escapeAttr(safePicture)}" alt="" referrerpolicy="no-referrer" />`
      : `<div class="profile-avatar profile-avatar-fallback">${escapeHtml((user.name || user.email || '?').slice(0, 1).toUpperCase())}</div>`;

    const hours = Math.floor((stats.totalTimeMinutes || 0) / 60);
    const minutes = (stats.totalTimeMinutes || 0) % 60;

    return `
      <div class="profile-card profile-identity">
        ${avatar}
        <div class="profile-id-text">
          <h3>${escapeHtml(user.name || 'Utente')}</h3>
          <p class="profile-email">${escapeHtml(user.email || '')}</p>
          <button id="profile-signout-btn" class="btn btn-secondary">Esci / Sign out</button>
        </div>
      </div>

      <div class="profile-stats-grid">
        ${statCard('Livello', stats.level)}
        ${statCard('XP totale', stats.xpTotal)}
        ${statCard('Streak attuale', stats.streakCurrent)}
        ${statCard('Streak record', stats.streakBest)}
        ${statCard('Parole imparate', stats.wordsLearned)}
        ${statCard('Lezioni completate', stats.lessonsCompleted)}
        ${statCard('Canzoni completate', stats.songsCompleted)}
        ${statCard('Sessioni pratica', stats.practiceSessions)}
        ${statCard('Badge sbloccati', stats.achievementsUnlocked)}
        ${statCard('Tempo totale', `${hours}h ${minutes}m`)}
      </div>

      <div class="profile-card">
        <h3>Ultimi 30 giorni</h3>
        <div id="profile-study-bar" class="profile-study-bar"></div>
      </div>
    `;
  }

  _renderStudyBar() {
    const host = document.getElementById('profile-study-bar');
    if (!host) return;
    const studyDays =
      this.progressManager?.data?.streakCalendar?.studyDays ||
      window.streakCalendarManager?.getStudyDays?.() ||
      {};

    const today = new Date();
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const entry = studyDays[iso];
      const minutes = typeof entry === 'object' ? entry?.minutes || 0 : entry ? 1 : 0;
      days.push({ iso, minutes });
    }
    const peak = Math.max(1, ...days.map((d) => d.minutes));
    host.innerHTML = days
      .map((d) => {
        const h = Math.max(4, Math.round((d.minutes / peak) * 100));
        return `<div class="profile-study-bar-cell" title="${escapeAttr(d.iso)}: ${d.minutes} min" style="height:${h}%"></div>`;
      })
      .join('');
  }
}
