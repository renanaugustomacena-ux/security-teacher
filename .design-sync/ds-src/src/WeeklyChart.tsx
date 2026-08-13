import React from 'react';

export interface WeeklyChartBar {
  /** Row label, right-aligned in a 70px gutter. */
  label: React.ReactNode;
  /** Bar magnitude, in the same unit across all rows. */
  value: number;
  /** Formatted readout on the right. Falls back to `value`. */
  display?: React.ReactNode;
}

export interface WeeklyChartProps {
  bars?: WeeklyChartBar[];
  /** Upper bound for the track. Defaults to the largest `value`. */
  max?: number;
  /** Shown in italics when `bars` is empty. */
  emptyMessage?: React.ReactNode;
  className?: string;
}

/**
 * Horizontal bar chart used for the weekly activity readout. Bars use the amber
 * gradient on a barely-there white track.
 */
export function WeeklyChart({ bars = [], max, emptyMessage, className }: WeeklyChartProps) {
  const ceiling = max ?? Math.max(1, ...bars.map((b) => b.value));
  return (
    <div className={['weekly-chart', className].filter(Boolean).join(' ')}>
      {bars.length === 0 ? (
        <div className="chart-empty">{emptyMessage ?? 'Nessun dato / No data yet'}</div>
      ) : (
        bars.map((bar, i) => (
          <div className="chart-bar-row" key={i}>
            <span className="chart-bar-label">{bar.label}</span>
            <div className="chart-bar-track">
              <div
                className="chart-bar"
                style={{ width: `${Math.max(0, Math.min(100, (bar.value / ceiling) * 100))}%` }}
              />
            </div>
            <span className="chart-bar-value">{bar.display ?? bar.value}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default WeeklyChart;
