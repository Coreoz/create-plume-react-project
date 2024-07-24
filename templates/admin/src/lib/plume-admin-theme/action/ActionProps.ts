import { ReactNode, MouseEvent } from 'react';
import { IconType } from '@components/theme/IconType';
import ActionStyle from './ActionStyle';

type ActionsPosition = 'start' | 'center' | 'end';
type ActionsOrientation = 'column' | 'row';

export type ActionContainerProps = {
  className?: string,
  children?: ReactNode,
  position?: ActionsPosition,
  orientation?: ActionsOrientation,
};

type ActionProps = {
  style?: ActionStyle,
  variant?: 'outlined' | 'contained',
  icon?: IconType,
  className?: string,
  disabled?: boolean,
  children?: ReactNode,
};

export interface ActionLinkProps extends ActionProps {
  linkTo: string,
  rel?: string,
  target?: string,
}

export interface ActionButtonProps extends ActionProps {
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void,
  isLoading?: boolean,
}
