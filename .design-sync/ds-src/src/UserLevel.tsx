import React from 'react';

export interface UserLevelProps {
  /** The level readout, e.g. `Livello 7`. */
  badge: React.ReactNode;
  /** Sub-caption under the badge, e.g. `Studente Avanzato`. */
  label?: React.ReactNode;
  /** Enlarges the badge line — used on the profile screen. */
  large?: boolean;
  className?: string;
}

/**
 * The amber-gradient level plaque that sits under the logo in the sidebar.
 */
export function UserLevel({ badge, label, large = false, className }: UserLevelProps) {
  return (
    <div className={['user-level', className].filter(Boolean).join(' ')}>
      <span className={large ? 'level-badge large' : 'level-badge'}>{badge}</span>
      {label ? <span className="level-label">{label}</span> : null}
    </div>
  );
}

export default UserLevel;
