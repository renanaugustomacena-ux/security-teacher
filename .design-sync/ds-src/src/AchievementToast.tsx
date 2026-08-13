import React from 'react';

export interface AchievementToastProps {
  /** Achievement glyph, rendered at 2.5rem with the unlock pop animation. */
  icon?: React.ReactNode;
  /** Small uppercase eyebrow, e.g. `Traguardo sbloccato`. */
  label?: React.ReactNode;
  /** The achievement name. */
  title: React.ReactNode;
  /** Slides the toast in from the right edge. Off-canvas when false. */
  visible?: boolean;
  className?: string;
}

/**
 * The gold-bordered glass toast that announces a badge unlock. Fires only on
 * real milestones — never on a routine correct answer (Doctrine §14.2).
 */
export function AchievementToast({
  icon,
  label,
  title,
  visible = true,
  className,
}: AchievementToastProps) {
  const classes = ['achievement-toast', visible ? 'visible' : null, className]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={classes}>
      {icon ? <span className="achievement-toast-icon">{icon}</span> : null}
      <div className="achievement-toast-body">
        {label ? <div className="achievement-toast-label">{label}</div> : null}
        <div className="achievement-toast-title">{title}</div>
      </div>
    </div>
  );
}

export default AchievementToast;
