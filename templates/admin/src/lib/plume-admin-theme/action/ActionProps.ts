import { DataTestProps } from '@lib/plume-admin-theme/tests/TestsProps';
import { ReactNode, MouseEvent } from 'react';
import { IconType } from '@components/theme/IconType';
import { routes } from '../../../router/Router'; // TODO Conflict dependency with base module
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

export interface ActionLinkProps<T extends keyof typeof routes> extends ActionProps, DataTestProps {
  linkTo: () => ReturnType<typeof routes[T]>,
  rel?: string,
  target?: string,
}

export interface ActionButtonProps extends ActionProps, DataTestProps {
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void,
  isLoading?: boolean,
  disabled?: boolean,
}
