import React from 'react';

export interface LevelProgressProps {
  /** Current level readout, e.g. `7`. */
  level: React.ReactNode;
  /** Bilingual level name shown under the badge. */
  levelName?: React.ReactNode;
  /** Fill percentage, 0–100. */
  percent: number;
  className?: string;
}

/**
 * The XP bar on the progress screen: level plaque on the left, amber-gradient
 * track in the middle, percentage on the right.
 */
export function LevelProgress({ level, levelName, percent, className }: LevelProgressProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className={['level-progress-display', className].filter(Boolean).join(' ')}>
      <div className="current-level-info">
        <span className="level-badge large">{level}</span>
        {levelName ? <span className="level-name">{levelName}</span> : null}
      </div>
      <div className="level-progress-bar">
        <div className="level-progress-fill" style={{ width: `${clamped}%` }} />
      </div>
      <span className="level-percent">{clamped}%</span>
    </div>
  );
}

export default LevelProgress;
