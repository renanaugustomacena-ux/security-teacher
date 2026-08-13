import React from 'react';

export interface ModeCardProps {
  /** Mode glyph, rendered at 2.5rem. */
  icon?: React.ReactNode;
  /** Mode name in the display face. */
  name: React.ReactNode;
  /** Bilingual one-line explanation of the mode. */
  description?: React.ReactNode;
  /** Greys the card out and blocks the hover lift. */
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

/**
 * A practice-mode tile in the mode selector grid. Cards fade up on mount and
 * lift toward the amber border on hover.
 */
export function ModeCard({
  icon,
  name,
  description,
  disabled = false,
  onClick,
  className,
}: ModeCardProps) {
  const classes = ['mode-card', disabled ? 'mode-disabled' : null, className]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={classes} onClick={disabled ? undefined : onClick}>
      {icon ? <div className="mode-card-icon">{icon}</div> : null}
      <div className="mode-card-name">{name}</div>
      {description ? <div className="mode-card-desc">{description}</div> : null}
    </div>
  );
}

export default ModeCard;
