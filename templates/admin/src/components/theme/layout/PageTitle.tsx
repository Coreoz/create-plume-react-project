import React from 'react';
import { LayoutPageTitleProps } from '../../../lib/plume-admin-theme/layout/LayoutProps';

export default function PageTitle({ children }: LayoutPageTitleProps) {
  return (
    <div className="page-title-container">
      <h1 className="page-title">
        {children}
      </h1>
    </div>
  );
}
