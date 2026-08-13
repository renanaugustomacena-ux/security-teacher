import React from 'react';

export interface StatCardProps {
  /** Glyph above the value. */
  icon?: React.ReactNode;
  /** The headline number, rendered at 2.5rem in amber. */
  value: React.ReactNode;
  /** Bilingual caption under the value. */
  label: React.ReactNode;
  className?: string;
}

/**
 * A single readout tile on the progress grid. Values carry the amber accent;
 * labels stay in the muted green register.
 */
export function StatCard({ icon, value, label, className }: StatCardProps) {
  return (
    <div className={['stat-card', className].filter(Boolean).join(' ')}>
      {icon ? <span className="stat-icon">{icon}</span> : null}
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default StatCard;
