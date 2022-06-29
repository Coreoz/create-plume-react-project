import React from 'react';
import {
  LayoutPageBlocColumnProps,
  LayoutPageBlocProps,
} from '../../../lib/plume-admin-theme/layout/LayoutProps';

/**
 * Layout component that wraps a child, handling page disposition
 * @param children the wrapped component
 * @param cssClasses optional additional css classes
 */
export function PageBloc({ children, cssClasses }: LayoutPageBlocProps) {
  return (
    <div className={`columns-container ${cssClasses ?? ''}`}>
      {children}
    </div>
  );
}

/**
 * Layout component that must be inside a {@link PageBloc} or itself, handling page disposition
 * @param columnWidth the width of the column (0 to 100)
 * @param children the wrapped component
 * @param cssClasses optional additional css classes
 */
export function PageBlocColumn({ columnWidth, children, cssClasses }: LayoutPageBlocColumnProps) {
  return (
    <div className={`column column--${columnWidth} ${cssClasses ?? ''}`}>
      {children}
    </div>
  );
}
