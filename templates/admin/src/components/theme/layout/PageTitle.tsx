import React from 'react';
import { LayoutPageTitleProps } from '../../../lib/plume-admin-theme/layout/LayoutProps';

export default function PageTitle({ children }: LayoutPageTitleProps) {
  return (
    <h1 className="page-title">
      {children}
    </h1>
  );
}
