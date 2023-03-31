import { IconType } from '../../../components/theme/IconType';
import ActionStyle from './ActionStyle';

export type ActionContainerProps = {
  cssClasses?: string;
  children?: React.ReactNode;
};

export type ActionProps = {
  style?: ActionStyle;
  variant?: 'contained' | 'outlined' | 'text';
  icon?: IconType;
  cssClasses?: string;
  children?: React.ReactNode;
};

export interface ActionLinkProps extends ActionProps {
  linkTo: string;
}

export interface ActionButtonProps extends ActionProps {
  onClick?: () => void;
  isLoading?: boolean;
}
