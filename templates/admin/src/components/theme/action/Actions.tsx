import { Button, CircularProgress, Icon } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from '@lib/class-names/ClassNames';
import {
  ActionButtonProps,
  ActionContainerProps,
  ActionLinkProps,
} from '@lib/plume-admin-theme/action/ActionProps';
import ActionStyle from '@lib/plume-admin-theme/action/ActionStyle';

import scss from './actions.module.scss';

function actionStyleToColor(
  actionStyle?: ActionStyle,
): 'inherit' | 'primary' | 'secondary' | 'error' {
  if (!actionStyle) {
    return 'inherit';
  }
  if (actionStyle === ActionStyle.DANGER) {
    return 'error';
  }
  return actionStyle;
}

export function ActionsContainer({
  children,
  className,
  position = 'center',
  orientation = 'row',
}: ActionContainerProps) {
  return (
    <div
      className={classNames(
        scss.actions,
        className,
        scss[`actions--${position}`],
        scss[`actions--${orientation}`],
      )}
    >
      {children}
    </div>
  );
}

export function ActionLink({
  style,
  variant = 'contained',
  icon,
  className,
  disabled,
  linkTo,
  children,
  rel,
  target,
}: ActionLinkProps) {
  return (
    <Button
      className={classNames(scss.link, className, style)}
      variant={variant}
      color={actionStyleToColor(style)}
      disabled={disabled}
      component={Link}
      to={linkTo}
      rel={rel}
      target={target}
      startIcon={icon && <Icon>{icon}</Icon>}
    >
      {children}
    </Button>
  );
}

export function ActionButton(
  {
    style,
    variant = 'contained',
    icon,
    className,
    onClick,
    disabled,
    isLoading = false,
    children,
  }: ActionButtonProps,
) {
  return (
    <Button
      onClick={onClick}
      className={classNames(scss.action, className, isLoading ? scss.actionLoading : undefined, style)}
      type={onClick ? 'button' : 'submit'}
      variant={variant}
      disabled={isLoading || disabled}
      color={actionStyleToColor(style)}
      startIcon={icon && <Icon>{icon}</Icon>}
    >
      {children}
      {
        isLoading
        && (
          <div className={scss.loadingProgress}>
            <CircularProgress className={scss.circleProgress} />
          </div>
        )
      }
    </Button>
  );
}
