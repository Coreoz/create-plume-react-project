import { ReactNode } from 'react';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type PanelContentElementProps = {
  children: ReactNode,
  columns: number,
  className?: string,
};

export type PanelContentElementColumnProps = {
  width: number,
  children: ReactNode,
  className?: string,
};

export type PanelProps = {
  children: ReactNode,
};

export type PanelTitleProps = {
  children: ReactNode,
  level?: HeadingLevel,
  backLink?: string,
};
