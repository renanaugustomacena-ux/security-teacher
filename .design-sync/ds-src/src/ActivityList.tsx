import React from 'react';

export interface ActivityEntry {
  /** Leading glyph for the row. */
  icon?: React.ReactNode;
  /** Bilingual description of what happened. */
  text: React.ReactNode;
}

export interface ActivityListProps {
  /** Panel heading, e.g. `Attività recente / Recent activity`. */
  title?: React.ReactNode;
  items?: ActivityEntry[];
  className?: string;
}

/**
 * The recent-activity panel: a glass surface wrapping hairline-separated rows.
 */
export function ActivityList({ title, items = [], className }: ActivityListProps) {
  return (
    <div className={['recent-activity', className].filter(Boolean).join(' ')}>
      {title ? <h3>{title}</h3> : null}
      <ul className="activity-list">
        {items.map((item, i) => (
          <li className="activity-item" key={i}>
            {item.icon ? <span className="activity-icon">{item.icon}</span> : null}
            <span className="activity-text">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityList;
