/**
 * LEARN MODULE - Knowledge AIO
 * =============================
 *
 * Gestisce le lezioni e i livelli di apprendimento.
 * Uses inline feedback instead of alert() for all user messages.
 */

import { getLessonsByLevel, getLesson } from './lessons.js';
import { ttsService } from './services/TTSService.js';

export class LearnManager {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.currentLevel = 0;
    this.currentLesson = null;
    this.currentItemIndex = 0;

    this.init();
  }

  init() {
    // Initial setup if needed
  }

  /**
   * Start a lesson for a specific level
   */
  startLesson(level) {
    const levelData = getLessonsByLevel(level);
    if (!levelData) return;

    // For now, start the first lesson of the level
    const firstLesson = levelData.lessons[0];
    if (!firstLesson) return;

    this.openLesson(level, firstLesson.id);
  }

  /**
   * Show inline message when a level is locked
   */
  showLevelLocked(level) {
    const container = document.getElementById('lesson-content');
    if (!container) return;

    document.querySelector('.levels-grid').classList.add('hidden');
    document.getElementById('lesson-container').classList.remove('hidden');
    document.getElementById('lesson-title').textContent = 'Livello Bloccato / Level Locked';
    document.getElementById('lesson-progress').textContent = '';

    container.innerHTML = `
            <div class="lesson-item-card" style="text-align: center;">
                <div style="font-size: 3rem; margin-bottom: 1rem;"></div>
                <h3>Completa il Livello ${level - 1} prima!</h3>
                <p>Complete Level ${level - 1} first!</p>
                <button class="btn btn-secondary" style="margin-top: 1.5rem;" onclick="learnManager.closeLessonView()">
                    ← Indietro / Back
                </button>
            </div>
        `;
  }

  /**
   * Open a specific lesson
   */
  openLesson(level, lessonId) {
    const lesson = getLesson(level, lessonId);
    if (!lesson) return;

    this.currentLevel = level;
    this.currentLesson = lesson;
    this.currentItemIndex = 0;

    // Show lesson container, hide levels grid
    document.querySelector('.levels-grid').classList.add('hidden');
    document.getElementById('lesson-container').classList.remove('hidden');

    // Update UI
    document.getElementById('lesson-title').textContent = lesson.title;
    this.renderLessonItem();
  }

  renderLessonItem() {
    const container = document.getElementById('lesson-content');
    if (!container || !this.currentLesson) return;

    const item = this.currentLesson.items[this.currentItemIndex];
    const totalItems = this.currentLesson.items.length;

    // Update progress text
    document.getElementById('lesson-progress').textContent =
      `${this.currentItemIndex + 1}/${totalItems}`;

    let html = '';
    const ttsBtn = ttsService.isSupported ? ttsService.speakerButtonHTML(item.english || '') : '';
    if (item.english) {
      html = `
                <div class="lesson-item-card">
                    <div class="item-pair">
                        <div class="item-english">${item.english} ${ttsBtn}</div>
                        <div class="item-separator"></div>
                        <div class="item-italian">${item.italian}</div>
                    </div>
                    <div class="item-pronunciation">Pronuncia: <strong>${item.pronunciation}</strong>${item.phonetic ? ` (${item.phonetic})` : ''}</div>
                    ${item.usage ? `<div class="item-usage">${item.usage}</div>` : ''}
                    ${item.example ? `<div class="item-example">"${item.example}"</div>` : ''}
                </div>
            `;
    }

    container.innerHTML = `
            ${html}
            <div class="lesson-nav-buttons">
                <button class="btn btn-secondary" onclick="learnManager.prevItem()" ${this.currentItemIndex === 0 ? 'disabled' : ''}>← Prec. / Prev</button>
                <button class="btn btn-primary" onclick="learnManager.nextItem()">${this.currentItemIndex === totalItems - 1 ? 'Completa / Complete' : 'Prossimo / Next →'}</button>
            </div>
        `;

    ttsService.attachTTSListeners(container);
  }

  prevItem() {
    if (this.currentItemIndex > 0) {
      this.currentItemIndex--;
      this.renderLessonItem();
    }
  }

  nextItem() {
    if (this.currentItemIndex < this.currentLesson.items.length - 1) {
      this.currentItemIndex++;
      this.renderLessonItem();
    } else {
      this.completeLesson();
    }
  }

  completeLesson() {
    // Mark as completed in progress manager
    this.progressManager.completeLesson(this.currentLevel, this.currentLesson.id);

    // Track daily goals
    this.progressManager.incrementDailyLessons();

    // Ingest vocabulary into SRS
    if (window.srsManager && this.currentLesson?.items) {
      const words = this.currentLesson.items
        .filter((item) => item.english && item.italian)
        .map((item) => ({
          english: item.english,
          italian: item.italian,
          pronunciation: item.pronunciation || '',
          example: item.example || '',
        }));
      const source = `lesson-${this.currentLevel}-${this.currentLesson.id}`;
      window.srsManager.addWords(words, source);
    }

    // Launch celebration particles
    this.spawnParticles();

    // Show inline celebration instead of alert
    const container = document.getElementById('lesson-content');
    if (!container) return;

    const lessonTitle = this.currentLesson.title;
    const wordCount = this.currentLesson.items.length;

    container.innerHTML = `
            <div class="lesson-completion">
                <div class="completion-icon">🎉</div>
                <h3>Lezione Completata! / Lesson Completed!</h3>
                <p class="completion-detail">${lessonTitle}</p>
                <p class="completion-words">+${wordCount} parole imparate / words learned</p>
                <div class="completion-actions">
                    <button class="btn btn-secondary" data-action="back">
                        ← Torna ai Livelli / Back to Levels
                    </button>
                    <button class="btn btn-primary" data-action="practice">
                        ✍️ Pratica Ora / Practice Now
                    </button>
                </div>
            </div>
        `;

    container
      .querySelector('[data-action="back"]')
      ?.addEventListener('click', () => this.closeLessonView());
    container
      .querySelector('[data-action="practice"]')
      ?.addEventListener('click', () => this.practiceLesson());
  }

  /**
   * Spawn celebration particles on lesson completion
   */
  spawnParticles() {
    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#e67e22', '#f1c40f', '#00ff41', '#00d9ff', '#ff6b6b', '#a55eea'];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 3 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.008 + Math.random() * 0.012,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      for (const p of particles) {
        if (p.life <= 0) continue;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08; // gravity
        p.life -= p.decay;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }

      if (alive) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };

    requestAnimationFrame(animate);
  }

  /**
   * Navigate to Practice with the current lesson's vocabulary
   */
  practiceLesson() {
    this.closeLessonView();
    // Navigate to practice section
    document.querySelector('.nav-item[data-section="practice"]')?.click();
    // Start a listening exercise (most engaging for beginners)
    setTimeout(() => {
      if (window.practiceManager) {
        window.practiceManager.startPractice('listening');
      }
    }, 100);
  }

  closeLessonView() {
    document.getElementById('lesson-container').classList.add('hidden');
    document.querySelector('.levels-grid').classList.remove('hidden');
    this.currentLesson = null;
  }
}
