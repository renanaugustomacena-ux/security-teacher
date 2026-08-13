import React from 'react';

export interface GlassCardProps {
  /** Optional heading rendered as the card's `h3`. */
  title?: React.ReactNode;
  /** Promotes the card: amber border plus the accent glow shadow. */
  featured?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * The base content surface: translucent navy fill, 12px backdrop blur, amber
 * hairline border. Every panel in the app is built on this.
 */
export function GlassCard({ title, featured = false, className, children }: GlassCardProps) {
  const classes = ['home-card', featured ? 'featured' : null, className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      {title ? <h3>{title}</h3> : null}
      {children}
    </div>
  );
}

export default GlassCard;
