import React from 'react';
import {
  PanelTitleProps,
  PanelProps,
  HeadingLevel,
  PanelContentElementProps,
  PanelContentElementColumnProps,
} from '../../../lib/plume-admin-theme/layout/LayoutProps';

export function Panel({ children }: PanelProps) {
  return (
    <div className="panel">
      {children}
    </div>
  );
}

export function PanelSeparator() {
  return <hr />;
}

export function PanelTitle({ children, level = 'h1' }: PanelTitleProps) {
  const Level: HeadingLevel = level;
  return (
    <Level className="panel-title">
      {children}
    </Level>
  );
}

export function PanelContent({ children }: PanelProps) {
  return (
    <div className="panel-content">
      {children}
    </div>
  );
}

/**
 * Layout component that wraps a child, handling page disposition
 * @param children the wrapped component
 * @param cssClasses optional additional css classes
 */
export function PanelContentElement({ children, cssClasses }: PanelContentElementProps) {
  return (
    <div className={`columns-container ${cssClasses ?? ''}`}>
      {children}
    </div>
  );
}

/**
 * Layout component that must be inside a {@link PanelContentElement} or itself, handling page disposition
 * @param columnWidth the width of the column (0 to 100)
 * @param children the wrapped component
 * @param cssClasses optional additional css classes
 */
export function PanelContentElementColumn({ widthPercentage, children, cssClasses }: PanelContentElementColumnProps) {
  return (
    <div className={`column column--${widthPercentage} ${cssClasses ?? ''}`}>
      {children}
    </div>
  );
}
