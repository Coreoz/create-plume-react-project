import { IconType } from '../../../components/theme/IconType';
import Status from './Status';
import { ColumnType } from '../../../components/theme/ColumnType';

export type LayoutPageTitleProps = {
  icon?: IconType;
  children?: React.ReactNode;
};

export type LayoutPageBlocProps = {
  children: React.ReactNode;
  cssClasses?: React.ReactNode;
};

export type LayoutPageBlocColumnProps = {
  column: ColumnType;
  children: React.ReactNode;
  cssClasses?: React.ReactNode;
};

export type PanelProps = {
  icon?: IconType;
  children?: React.ReactNode;
};

export type StatusDotProps = {
  status: Status,
}
