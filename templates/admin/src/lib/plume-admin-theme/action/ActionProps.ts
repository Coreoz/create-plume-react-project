import { WithChildren } from '../../ts-react-children-type/WithChildren';
import ActionStyle from './ActionStyle';
import { IconType } from '../../../components/theme/IconType';

export type ActionContainerProps = WithChildren<{
}>;

export type ActionProps = WithChildren<{
  style?: ActionStyle,
  icon?: IconType,
  cssClasses?: string,
}>;

export interface ActionLinkProps extends ActionProps {
  linkTo: string,
}

export interface ActionButtonProps extends ActionProps {
  onClick?: () => void,
  loadingState?: boolean,
}
