import React from 'react';
import { ColumnWidth } from './ColumnWidth';
import Status from './Status';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type PanelContentElementProps = {
  children: React.ReactNode,
  cssClasses?: string,
};

export type PanelContentElementColumnProps = {
  widthPercentage: ColumnWidth,
  children: React.ReactNode,
  cssClasses?: string,
};

export type PanelProps = {
  children: React.ReactNode,
};

export type PanelTitleProps = {
  children: React.ReactNode,
  level?: HeadingLevel,
};

export type StatusDotProps = {
  status: Status,
};
