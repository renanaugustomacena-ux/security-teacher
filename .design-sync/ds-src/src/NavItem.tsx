import React from 'react';

export interface NavItemProps {
  /** Bilingual label — Italian first, then English (Doctrine §14.7). */
  label: React.ReactNode;
  /** Line-based SVG or glyph, stroke-width 1.5–2 (Doctrine §14.8). */
  icon?: React.ReactNode;
  /** Marks the current section. Adds the gold rail and the amber gradient fill. */
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

/**
 * A single row in the fixed sidebar nav. The active state paints a gold rail on
 * the left edge via `::before` and fills the row with the amber gradient.
 */
export function NavItem({ label, icon, active = false, onClick, className }: NavItemProps) {
  const classes = ['nav-item', active ? 'active' : null, className].filter(Boolean).join(' ');
  return (
    <button className={classes} type="button" onClick={onClick}>
      {icon ? <span className="nav-icon">{icon}</span> : null}
      {label}
    </button>
  );
}

export default NavItem;
