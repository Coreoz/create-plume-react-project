import { DataTestProps } from '@lib/plume-admin-theme/tests/TestsProps';
import { ReactNode, MouseEvent } from 'react';
import { IconType } from '@components/theme/IconType';
import ActionStyle from './ActionStyle';

type ActionsPosition = 'start' | 'center' | 'end';
type ActionsOrientation = 'column' | 'row';

export type ThemeStyle = 'outlined' | 'contained';

export type ActionContainerProps = {
  className?: string,
  children?: ReactNode,
  position?: ActionsPosition,
  orientation?: ActionsOrientation,
};

type ActionProps = {
  style?: ActionStyle,
  variant?: ThemeStyle,
  icon?: IconType,
  className?: string,
  disabled?: boolean,
  children?: ReactNode,
};

export interface ActionLinkProps extends ActionProps, DataTestProps {
  linkTo: string,
  rel?: string,
  target?: string,
}

export interface ActionButtonProps extends ActionProps, DataTestProps {
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void,
  isLoading?: boolean,
  disabled?: boolean,
}
