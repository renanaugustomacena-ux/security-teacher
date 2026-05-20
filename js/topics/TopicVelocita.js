/**
 * TopicVelocita — 60–90 second rapid-fire mode.
 *
 * Embraces the 30-second-attention problem instead of fighting it: a session
 * is shorter than the user's attention budget. No blocking feedback dwell —
 * answers flash and advance. A synth metronome ticks the cadence; correct
 * adds a harmonic, wrong drops the pitch a half-step. The combo bar fills
 * as the streak grows and resets on a miss.
 *
 * Record storage: localStorage key `velocita-records-v1` holds the most
 * recent 50 runs (FIFO). Percentile scoring compares the new run against
 * the persisted distribution. No backend, no leaderboard model changes.
 *
 * Mounts on the existing #topic-practice-content container so it inherits
 * the practice header (streak / XP / progress) and the PracticeHUD overlay.
 */

import { sfxService } from '../services/SfxService.js';
import { practiceHUD } from '../PracticeHUD.js';
import { questService } from '../services/QuestService.js';
import { currencyService } from '../services/CurrencyService.js';

const RECORDS_KEY = 'velocita-records-v1';
const MAX_RECORDS = 50;
const QUESTION_BUDGET_MS = 6000;
const TICK_PERIOD_MS = 600;

const DURATION_OPTIONS = [
  { seconds: 60, label: '60s — Sprint' },
  { seconds: 90, label: '90s — Burnout' },
];

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('`', '&#96;');
}

function shuffle(arr) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function loadRecords() {
  try {
    const raw = localStorage.getItem(RECORDS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r) => r && typeof r.score === 'number' && Number.isFinite(r.score) && r.score >= 0
    );
  } catch (e) {
    return [];
  }
}

function saveRecord(record) {
  try {
    const list = loadRecords();
    list.push(record);
    while (list.length > MAX_RECORDS) list.shift();
    localStorage.setItem(RECORDS_KEY, JSON.stringify(list));
  } catch (e) {
    // localStorage full or disabled — silently drop. Personal-record loss
    // is the best failure mode; we don't want to crash the run.
  }
}

function percentile(value, distribution) {
  if (distribution.length === 0) return null;
  const beat = distribution.filter((v) => value > v).length;
  return Math.round((beat / distribution.length) * 100);
}

export class TopicVelocita {
  constructor(progressManager) {
    this.progressManager = progressManager;
    this.pool = [];
    this.questions = [];
    this.questionIndex = 0;
    this.currentQuestion = null;
    this.questionStartedAt = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.correct = 0;
    this.attempts = 0;
    this.sessionXP = 0;
    this.durationMs = 60_000;
    this.startedAt = 0;
    this.metronomeFreq = 440;
    this.metronomeTimer = null;
    this.questionTimer = null;
    this.sessionTimer = null;
    this.topicId = null;
    this.levelNum = null;
    this.running = false;
  }

  /**
   * Show the duration picker as the first screen of Velocità mode.
   */
  showDurationPicker(pool, topicId, levelNum) {
    const container = document.getElementById('topic-practice-content');
    if (!container) return;
    this.pool = pool;
    this.topicId = topicId;
    this.levelNum = levelNum;
    practiceHUD.reset();

    const titleEl = document.getElementById('topic-practice-title');
    if (titleEl) titleEl.textContent = "Velocita' / Speed Run";

    const recents = loadRecords()
      .filter((r) => r.topicId === topicId)
      .slice(-3)
      .reverse();
    const recentHtml = recents.length
      ? `<div class="velocita-recent">
           <div class="velocita-recent-title">Le tue ultime corse / Your recent runs</div>
           ${recents
             .map(
               (r) => `
             <div class="velocita-recent-row">
               <span>${r.duration}s</span>
               <span>${r.score} pts</span>
               <span>×${r.maxCombo}</span>
               <span>${Math.round(r.accuracy * 100)}%</span>
             </div>`
             )
             .join('')}
         </div>`
      : '';

    container.innerHTML = `
      <div class="velocita-picker">
        <h2 class="velocita-picker-title">Velocita'</h2>
        <p class="velocita-picker-sub">
          Una corsa breve. Niente attese tra le risposte. Sbaglia e vai avanti.<br>
          A short run. No waiting between answers. Get one wrong and keep moving.
        </p>
        <div class="velocita-picker-grid">
          ${DURATION_OPTIONS.map(
            (opt) => `
            <button class="velocita-picker-card" data-seconds="${opt.seconds}">
              <div class="velocita-picker-num">${opt.seconds}<small>s</small></div>
              <div class="velocita-picker-label">${escapeHtml(opt.label)}</div>
            </button>`
          ).join('')}
        </div>
        ${recentHtml}
      </div>
    `;

    container.querySelectorAll('.velocita-picker-card').forEach((card) => {
      card.addEventListener('click', () => {
        const seconds = Number(card.dataset.seconds);
        this.start(seconds);
      });
    });
  }

  start(seconds) {
    this.durationMs = seconds * 1000;
    this.questionIndex = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.correct = 0;
    this.attempts = 0;
    this.sessionXP = 0;
    this.metronomeFreq = 440;
    this.startedAt = Date.now();
    this.running = true;
    this.questions = this.buildQuestions(this.pool);
    this.startMetronome();
    this.startSessionTimer();
    this.nextQuestion();
  }

  /**
   * Generate questions on the fly from the pool — listening/matching style
   * with 4 options. Reuses existing topic vocab; no new content needed.
   */
  buildQuestions(pool) {
    const usable = pool.filter((it) => it && it.english && it.italian);
    if (usable.length < 4) return [];
    return shuffle(usable).map((item) => {
      const distractorPool = usable.filter((it) => it.italian !== item.italian);
      const distractors = shuffle(distractorPool)
        .slice(0, 3)
        .map((it) => it.italian);
      const options = shuffle([item.italian, ...distractors]);
      return { english: item.english, italian: item.italian, options };
    });
  }

  startSessionTimer() {
    this.sessionTimer = setInterval(() => {
      if (!this.running) return;
      const elapsed = Date.now() - this.startedAt;
      const remaining = Math.max(0, this.durationMs - elapsed);
      this.updateTimerBar(remaining);
      if (remaining <= 0) this.finish();
    }, 60);
  }

  startMetronome() {
    this.tickMetronome();
    this.metronomeTimer = setInterval(() => this.tickMetronome(), TICK_PERIOD_MS);
  }

  tickMetronome() {
    if (!this.running) return;
    sfxService.metronome(this.metronomeFreq);
  }

  stopTimers() {
    if (this.sessionTimer) {
      clearInterval(this.sessionTimer);
      this.sessionTimer = null;
    }
    if (this.metronomeTimer) {
      clearInterval(this.metronomeTimer);
      this.metronomeTimer = null;
    }
    if (this.questionTimer) {
      clearTimeout(this.questionTimer);
      this.questionTimer = null;
    }
  }

  nextQuestion() {
    if (!this.running) return;
    if (this.questionIndex >= this.questions.length) {
      this.questions = this.buildQuestions(this.pool);
      this.questionIndex = 0;
    }
    this.currentQuestion = this.questions[this.questionIndex];
    this.questionIndex += 1;
    this.questionStartedAt = Date.now();
    this.renderQuestion();
    this.questionTimer = setTimeout(() => this.timeOut(), QUESTION_BUDGET_MS);
  }

  renderQuestion() {
    const container = document.getElementById('topic-practice-content');
    if (!container) return;
    const q = this.currentQuestion;
    const comboPercent = Math.min(100, this.combo * 8);
    container.innerHTML = `
      <div class="velocita-stage">
        <div class="velocita-bars">
          <div class="velocita-bar velocita-bar-time">
            <div class="velocita-bar-fill" id="velocita-time-fill" style="width: 100%;"></div>
          </div>
          <div class="velocita-bar velocita-bar-combo">
            <div class="velocita-bar-fill" id="velocita-combo-fill" style="width: ${comboPercent}%;"></div>
          </div>
        </div>
        <div class="velocita-meta">
          <span class="velocita-meta-score">${this.correct} pts</span>
          <span class="velocita-meta-combo" id="velocita-combo-readout">×${this.combo}</span>
        </div>
        <div class="velocita-prompt">${escapeHtml(q.english)}</div>
        <div class="velocita-options">
          ${q.options
            .map(
              (opt) => `
            <button class="velocita-option" data-answer="${escapeAttr(opt)}">
              ${escapeHtml(opt)}
            </button>`
            )
            .join('')}
        </div>
      </div>
    `;
    container.querySelectorAll('.velocita-option').forEach((btn) => {
      btn.addEventListener('click', () => this.answer(btn.dataset.answer, btn));
    });
  }

  updateTimerBar(remainingMs) {
    const fill = document.getElementById('velocita-time-fill');
    if (!fill) return;
    const percent = Math.max(0, (remainingMs / this.durationMs) * 100);
    fill.style.width = `${percent}%`;
  }

  updateComboBar() {
    const fill = document.getElementById('velocita-combo-fill');
    if (fill) fill.style.width = `${Math.min(100, this.combo * 8)}%`;
    const read = document.getElementById('velocita-combo-readout');
    if (read) read.textContent = `×${this.combo}`;
  }

  answer(picked, btnEl) {
    if (!this.running || !this.currentQuestion) return;
    if (this.questionTimer) {
      clearTimeout(this.questionTimer);
      this.questionTimer = null;
    }
    this.attempts += 1;
    const isCorrect = picked === this.currentQuestion.italian;
    if (isCorrect) {
      this.correct += 1;
      this.combo += 1;
      if (this.combo > this.maxCombo) this.maxCombo = this.combo;
      this.metronomeFreq = Math.min(880, 440 + this.combo * 8);
      sfxService.correct();
      currencyService.earn(1, 'velocita_correct');
      if (btnEl) btnEl.classList.add('velocita-option-correct');
    } else {
      this.combo = 0;
      this.metronomeFreq = Math.max(220, this.metronomeFreq * 0.94);
      sfxService.incorrect();
      if (btnEl) btnEl.classList.add('velocita-option-wrong');
    }
    practiceHUD.onAnswerResult({ correct: isCorrect, streak: this.combo });
    this.updateComboBar();
    // Brief visual flash, then advance with no blocking dwell.
    setTimeout(() => this.nextQuestion(), 120);
  }

  timeOut() {
    if (!this.running) return;
    this.attempts += 1;
    this.combo = 0;
    this.metronomeFreq = Math.max(220, this.metronomeFreq * 0.94);
    sfxService.incorrect();
    practiceHUD.onAnswerResult({ correct: false, streak: 0 });
    this.updateComboBar();
    this.nextQuestion();
  }

  finish() {
    if (!this.running) return;
    this.running = false;
    this.stopTimers();
    practiceHUD.reset();

    const accuracy = this.attempts === 0 ? 0 : this.correct / this.attempts;
    const score = this.correct * 10 + this.maxCombo * 5;
    const xpEarned = Math.round(score * 0.4);
    if (this.progressManager && typeof this.progressManager.addXP === 'function') {
      try {
        this.progressManager.addXP(xpEarned);
      } catch (e) {
        // ignore
      }
    }

    const allRecords = loadRecords();
    const record = {
      score,
      correct: this.correct,
      attempts: this.attempts,
      maxCombo: this.maxCombo,
      accuracy,
      duration: this.durationMs / 1000,
      topicId: this.topicId,
      levelNum: this.levelNum,
      ts: Date.now(),
    };
    saveRecord(record);

    const sameModeScores = allRecords
      .filter((r) => r.duration === record.duration)
      .map((r) => r.score);
    const pct = percentile(score, sameModeScores);
    const isPB = pct === 100 || sameModeScores.length === 0;

    // Quest + currency integration
    questService.recordMetric('velocitaRuns', 1);
    questService.recordMetric('velocitaScore', this.correct);
    questService.recordMetric('weekXP', xpEarned);
    questService.recordMetric('maxStreak', this.maxCombo);
    if (isPB && allRecords.length > 0) {
      questService.recordMetric('velocitaPB', 1);
      currencyService.earn(10, 'velocita_pb');
    }
    currencyService.earn(5, 'velocita_complete');

    this.renderSummary(record, pct);
  }

  renderSummary(record, pct) {
    const container = document.getElementById('topic-practice-content');
    if (!container) return;
    const pctLine =
      pct === null
        ? 'Prima corsa! / First run!'
        : pct === 100
          ? 'Record personale assoluto! / All-time personal best!'
          : `Meglio del ${pct}% delle tue corse / Better than ${pct}% of your runs`;

    sfxService.levelUp();

    container.innerHTML = `
      <div class="velocita-summary">
        <div class="velocita-summary-title">Velocita' completata</div>
        <div class="velocita-summary-score">${record.score}<small> pts</small></div>
        <div class="velocita-summary-grid">
          <div><span>Risposte / Answers</span><strong>${record.correct} / ${record.attempts}</strong></div>
          <div><span>Combo max</span><strong>×${record.maxCombo}</strong></div>
          <div><span>Precisione / Accuracy</span><strong>${Math.round(record.accuracy * 100)}%</strong></div>
          <div><span>Q/s</span><strong>${(record.attempts / record.duration).toFixed(2)}</strong></div>
        </div>
        <div class="velocita-summary-pct">${escapeHtml(pctLine)}</div>
        <div class="velocita-summary-rewards">
          <span class="velocita-reward-xp">+${Math.round(record.score * 0.4)} XP</span>
          <span class="velocita-reward-coins">+${record.correct + 5 + (pct === 100 ? 10 : 0)} KC</span>
        </div>
        <div class="velocita-summary-actions">
          <button class="btn btn-primary" id="velocita-again">Ancora / Again</button>
          <button class="btn btn-secondary" id="velocita-back">Indietro / Back</button>
        </div>
      </div>
    `;

    const again = document.getElementById('velocita-again');
    if (again)
      again.addEventListener('click', () =>
        this.showDurationPicker(this.pool, this.topicId, this.levelNum)
      );
    const back = document.getElementById('velocita-back');
    if (back) {
      back.addEventListener('click', () => {
        if (window.topicManager && typeof window.topicManager.openLevel === 'function') {
          window.topicManager.openLevel(this.topicId, this.levelNum);
        }
      });
    }
  }

  abort() {
    this.running = false;
    this.stopTimers();
  }
}
