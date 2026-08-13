import React from 'react';

export interface BadgeCardProps {
  /** Achievement glyph, rendered at 3rem. */
  icon?: React.ReactNode;
  /** English title. */
  title: React.ReactNode;
  /** Italian title, shown under the English one (Doctrine §14.7). */
  titleIt?: React.ReactNode;
  /** English description. */
  description?: React.ReactNode;
  /** Italian description, rendered in italics. */
  descriptionIt?: React.ReactNode;
  /** Unlock date, shown in the mono face in gold. */
  date?: React.ReactNode;
  /** `unlocked` adds the gold border and shimmer; `locked` desaturates;
   *  `secret` hides the achievement further. */
  state?: 'unlocked' | 'locked' | 'secret';
  className?: string;
}

/**
 * One tile in the badge gallery. Unlocked badges gain a gold border and a slow
 * shimmer; locked ones desaturate rather than disappear.
 */
export function BadgeCard({
  icon,
  title,
  titleIt,
  description,
  descriptionIt,
  date,
  state = 'locked',
  className,
}: BadgeCardProps) {
  const stateClass =
    state === 'unlocked' ? 'unlocked' : state === 'secret' ? 'locked secret' : 'locked';
  return (
    <div className={['badge-card', stateClass, className].filter(Boolean).join(' ')}>
      {icon ? <span className="badge-icon">{icon}</span> : null}
      <div className="badge-title">{title}</div>
      {titleIt ? <div className="badge-title-it">{titleIt}</div> : null}
      {description ? <div className="badge-description">{description}</div> : null}
      {descriptionIt ? <div className="badge-description-it">{descriptionIt}</div> : null}
      {date ? <div className="badge-date">{date}</div> : null}
    </div>
  );
}

export default BadgeCard;
