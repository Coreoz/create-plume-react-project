import { PropsWithChildren } from 'react';
import { Link } from 'type-route';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type PanelContentElementProps = PropsWithChildren<{
  columns: number,
  className?: string,
}>;

export type PanelContentElementColumnProps = PropsWithChildren<{
  width: number,
  className?: string,
}>;

export type PanelProps = PropsWithChildren<{
  className?: string,
}>;

export type PanelTitleProps<T extends { link: Link }> = PropsWithChildren<{
  level?: HeadingLevel,
  backRoute?: () => T,
}>;
