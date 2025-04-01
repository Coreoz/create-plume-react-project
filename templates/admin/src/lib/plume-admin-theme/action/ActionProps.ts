import { IconType } from '@components/theme/IconType';
import { DataTestProps } from '@lib/plume-admin-theme/tests/TestsProps';
import { MouseEvent, ReactNode } from 'react';
import { Link } from 'type-route';
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
  linkTo: Link,
  rel?: string,
  target?: string,
}

export interface ActionButtonProps extends ActionProps, DataTestProps {
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void,
  isLoading?: boolean,
  disabled?: boolean,
}
