import React from 'react';
import { ListSingleElementProps } from '../../../lib/plume-admin-theme/layout/LayoutProps';

export default function ListSingleElement({ children, onSelectElement, cssClasses }: ListSingleElementProps) {

  return (
    <div
      aria-hidden="true"
      className={`list-single-element${cssClasses ? ' ' + cssClasses : ''}`}
      onClick={() => {
        if (onSelectElement) {
          onSelectElement();
        }
      }}
      role={onSelectElement ? 'button' : 'presentation'}
      aria-label="list-single-element"
    >
      {children}
    </div>
  );
}
