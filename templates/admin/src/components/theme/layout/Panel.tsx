import React from 'react';
import { PanelProps } from '../../../lib/plume-admin-theme/layout/LayoutProps';

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
