import { ColumnWidth } from './ColumnWidth';
import { IconType } from '../../../components/theme/IconType';
import Status from './Status';

export type LayoutPageTitleProps = {
  icon?: IconType;
  children?: React.ReactNode;
};

export type LayoutPageBlocProps = {
  children: React.ReactNode;
  cssClasses?: React.ReactNode;
};

export type LayoutPageBlocColumnProps = {
  columnWidth: ColumnWidth;
  children: React.ReactNode;
  cssClasses?: React.ReactNode;
};

export type PanelProps = {
  icon?: IconType;
  children?: React.ReactNode;
};

export type StatusDotProps = {
  status: Status,
};
