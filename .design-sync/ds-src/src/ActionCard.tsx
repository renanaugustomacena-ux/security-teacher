import React from 'react';

export interface ActionCardProps {
  /** Large glyph shown above the title. */
  icon?: React.ReactNode;
  title: React.ReactNode;
  /** Bilingual supporting copy — Italian first (Doctrine §14.7). */
  description?: React.ReactNode;
  /** Promotes the card: amber border plus the accent glow shadow. */
  featured?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
  /** Trailing content, typically a `Button`. */
  children?: React.ReactNode;
}

/**
 * A clickable entry point on the home grid. Lifts and glows on hover.
 */
export function ActionCard({
  icon,
  title,
  description,
  featured = false,
  onClick,
  className,
  children,
}: ActionCardProps) {
  const classes = ['home-card', 'action-card', featured ? 'featured' : null, className]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={classes} onClick={onClick}>
      {icon ? <div className="card-icon">{icon}</div> : null}
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {children}
    </div>
  );
}

export default ActionCard;
