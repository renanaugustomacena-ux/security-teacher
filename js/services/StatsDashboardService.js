const STAGES = [
  { label: 'Unseen', color: '#6b7280' },
  { label: 'Introduced', color: '#8b5cf6' },
  { label: 'Practicing', color: '#f59e0b' },
  { label: 'Familiar', color: '#3b82f6' },
  { label: 'Proficient', color: '#10b981' },
  { label: 'Mastered', color: '#059669' },
  { label: 'Burned', color: '#6d28d9' },
];

const COLORS = {
  bg: '#1a1a2e',
  grid: 'rgba(0, 255, 65, 0.1)',
  primary: '#00ff41',
  text: '#b0b0b0',
};

const PAD = { top: 30, right: 20, bottom: 40, left: 50 };

const FONT = 'monospace';

class StatsDashboardService {
  // ---------------------------------------------------------------------------
  //  Public data methods
  // ---------------------------------------------------------------------------

  getAccuracyOverTime(responses, days) {
    const dates = [];
    const accuracies = [];
    const now = new Date();

    // Build buckets for the last N days (today inclusive).
    const buckets = new Map();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      dates.push(key);
      buckets.set(key, { correct: 0, total: 0 });
    }

    for (const r of responses) {
      const day =
        typeof r.timestamp === 'string'
          ? r.timestamp.slice(0, 10)
          : new Date(r.timestamp).toISOString().slice(0, 10);
      const bucket = buckets.get(day);
      if (!bucket) continue;
      bucket.total++;
      if (r.correct) bucket.correct++;
    }

    for (const key of dates) {
      const b = buckets.get(key);
      accuracies.push(b.total === 0 ? 0 : b.correct / b.total);
    }

    return { dates, accuracies };
  }

  getMasteryDistribution(masteryMap) {
    const counts = new Array(STAGES.length).fill(0);
    for (const [, entry] of masteryMap) {
      const stage = entry.stage ?? 0;
      if (stage >= 0 && stage < STAGES.length) counts[stage]++;
    }
    return {
      labels: STAGES.map((s) => s.label),
      counts,
      colors: STAGES.map((s) => s.color),
    };
  }

  getModePerformance(analyticsMap) {
    const agg = {};
    for (const [, item] of analyticsMap) {
      const ma = item.modeAccuracy || {};
      for (const [mode, stats] of Object.entries(ma)) {
        if (!agg[mode]) agg[mode] = { correct: 0, total: 0 };
        agg[mode].correct += stats.correct;
        agg[mode].total += stats.total;
      }
    }
    const modes = Object.keys(agg);
    const accuracies = modes.map((m) => (agg[m].total === 0 ? 0 : agg[m].correct / agg[m].total));
    return { modes, accuracies };
  }

  getTopicComparison(analyticsMap, topicIds) {
    const topics = [];
    const percentages = [];
    for (const tid of topicIds) {
      const prefix = `${tid}:`;
      let sum = 0;
      let count = 0;
      for (const [key, item] of analyticsMap) {
        if (key.startsWith(prefix)) {
          sum += item.masteryP ?? 0;
          count++;
        }
      }
      topics.push(tid);
      percentages.push(count === 0 ? 0 : (sum / count) * 100);
    }
    return { topics, percentages };
  }

  // ---------------------------------------------------------------------------
  //  Rendering
  // ---------------------------------------------------------------------------

  renderChart(canvasEl, type, data) {
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const w = canvasEl.width;
    const h = canvasEl.height;

    // Clear background
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, w, h);

    switch (type) {
      case 'line':
        this._drawLineChart(ctx, data, { w, h });
        break;
      case 'bar':
        this._drawBarChart(ctx, data.values, data.labels, { w, h });
        break;
      case 'pie':
        this._drawPieChart(ctx, data.values, data.labels, data.colors);
        break;
      case 'radar':
        this._drawRadarChart(ctx, data.values, data.labels, data.maxValue ?? 1);
        break;
      default:
        break;
    }
  }

  // ---------------------------------------------------------------------------
  //  Private chart primitives
  // ---------------------------------------------------------------------------

  _drawLineChart(ctx, data, options) {
    const { w, h } = options;
    const plotW = w - PAD.left - PAD.right;
    const plotH = h - PAD.top - PAD.bottom;
    const values = data.values || [];
    if (values.length === 0) return;

    const max = Math.max(...values, 1);
    const step = plotW / Math.max(values.length - 1, 1);

    // Grid lines
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = PAD.top + (plotH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(PAD.left + plotW, y);
      ctx.stroke();
    }

    // Line path
    ctx.beginPath();
    const points = values.map((v, i) => ({
      x: PAD.left + step * i,
      y: PAD.top + plotH - (v / max) * plotH,
    }));
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = COLORS.primary;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Gradient fill below
    const grad = ctx.createLinearGradient(0, PAD.top, 0, PAD.top + plotH);
    grad.addColorStop(0, 'rgba(0, 255, 65, 0.3)');
    grad.addColorStop(1, 'rgba(0, 255, 65, 0)');
    ctx.lineTo(points[points.length - 1].x, PAD.top + plotH);
    ctx.lineTo(points[0].x, PAD.top + plotH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Labels
    ctx.fillStyle = COLORS.text;
    ctx.font = `10px ${FONT}`;
    ctx.textAlign = 'center';
    const labels = data.labels || [];
    for (let i = 0; i < labels.length; i++) {
      const x = PAD.left + step * i;
      ctx.fillText(labels[i], x, h - 10);
    }
  }

  _drawBarChart(ctx, values, labels, options) {
    const { w, h } = options;
    const plotW = w - PAD.left - PAD.right;
    const plotH = h - PAD.top - PAD.bottom;
    if (!values || values.length === 0) return;

    const max = Math.max(...values, 1);
    const barW = plotW / values.length;
    const gap = barW * 0.2;

    // Grid
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = PAD.top + (plotH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(PAD.left + plotW, y);
      ctx.stroke();
    }

    // Bars
    ctx.fillStyle = COLORS.primary;
    for (let i = 0; i < values.length; i++) {
      const barH = (values[i] / max) * plotH;
      const x = PAD.left + barW * i + gap / 2;
      const y = PAD.top + plotH - barH;
      ctx.fillRect(x, y, barW - gap, barH);
    }

    // Labels
    ctx.fillStyle = COLORS.text;
    ctx.font = `10px ${FONT}`;
    ctx.textAlign = 'center';
    if (labels) {
      for (let i = 0; i < labels.length; i++) {
        ctx.fillText(labels[i], PAD.left + barW * i + barW / 2, h - 10);
      }
    }
  }

  _drawPieChart(ctx, values, labels, colors) {
    if (!values || values.length === 0) return;
    const total = values.reduce((s, v) => s + v, 0);
    if (total === 0) return;

    const cx = ctx.canvas.width / 2;
    const cy = ctx.canvas.height / 2;
    const r = Math.min(cx, cy) - 40;

    let angle = -Math.PI / 2;
    for (let i = 0; i < values.length; i++) {
      const slice = (values[i] / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, angle, angle + slice);
      ctx.closePath();
      ctx.fillStyle = colors?.[i] || COLORS.primary;
      ctx.fill();

      // Label
      if (labels?.[i]) {
        const mid = angle + slice / 2;
        const lx = cx + (r + 18) * Math.cos(mid);
        const ly = cy + (r + 18) * Math.sin(mid);
        ctx.fillStyle = COLORS.text;
        ctx.font = `10px ${FONT}`;
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], lx, ly);
      }
      angle += slice;
    }
  }

  _drawRadarChart(ctx, values, labels, maxValue) {
    if (!values || values.length < 3) return;
    const n = values.length;
    const cx = ctx.canvas.width / 2;
    const cy = ctx.canvas.height / 2;
    const r = Math.min(cx, cy) - 40;

    const angleStep = (2 * Math.PI) / n;
    const startAngle = -Math.PI / 2;

    // Grid rings
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    for (let ring = 1; ring <= 4; ring++) {
      const rr = (r / 4) * ring;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const a = startAngle + angleStep * i;
        const px = cx + rr * Math.cos(a);
        const py = cy + rr * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Spokes
    for (let i = 0; i < n; i++) {
      const a = startAngle + angleStep * i;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      ctx.stroke();
    }

    // Data polygon
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const v = Math.min(values[i], maxValue) / maxValue;
      const a = startAngle + angleStep * i;
      const px = cx + r * v * Math.cos(a);
      const py = cy + r * v * Math.sin(a);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = COLORS.primary;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = 'rgba(0, 255, 65, 0.15)';
    ctx.fill();

    // Labels
    ctx.fillStyle = COLORS.text;
    ctx.font = `11px ${FONT}`;
    ctx.textAlign = 'center';
    if (labels) {
      for (let i = 0; i < n; i++) {
        const a = startAngle + angleStep * i;
        const lx = cx + (r + 20) * Math.cos(a);
        const ly = cy + (r + 20) * Math.sin(a);
        ctx.fillText(labels[i], lx, ly + 4);
      }
    }
  }
}

export { StatsDashboardService };
export const statsDashboardService = new StatsDashboardService();
