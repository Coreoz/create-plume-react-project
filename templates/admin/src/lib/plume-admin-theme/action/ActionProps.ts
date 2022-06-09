import ActionStyle from './ActionStyle';
import { IconType } from '../../../components/theme/IconType';

export type ActionContainerProps = {
  cssClasses?: string,
  children?: React.ReactNode,
};

export type ActionProps = {
  style?: ActionStyle,
  icon?: IconType,
  cssClasses?: string,
  children?: React.ReactNode,
};

export interface ActionLinkProps extends ActionProps {
  linkTo: string,
}

export interface ActionButtonProps extends ActionProps {
  onClick?: () => void,
  isLoading?: boolean,
}
