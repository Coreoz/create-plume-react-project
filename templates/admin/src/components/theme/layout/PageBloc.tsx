import React from 'react';
import { LayoutPageBlocColumnProps, LayoutPageBlocProps } from '../../../lib/plume-admin-theme/layout/LayoutProps';

export function PageBloc({ children, cssClasses }: LayoutPageBlocProps) {
  return (
    <div className={`columns-container${cssClasses ? ' ' + cssClasses : ''}`}>
      {children}
    </div>
  )
}

export function PageBlocColumn({ column, children, cssClasses }: LayoutPageBlocColumnProps) {
  return (
    <div className={`column column--${column}${cssClasses ? ' ' + cssClasses : ''}`}>
      {children}
    </div>
  )
}
