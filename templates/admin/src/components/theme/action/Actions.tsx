import { Button, CircularProgress, Icon } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from '../../../lib/class-names/ClassNames';
import {
  ActionButtonProps,
  ActionContainerProps,
  ActionLinkProps,
} from '../../../lib/plume-admin-theme/action/ActionProps';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';

function actionStyleToCssClass(
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
                                   cssClasses,
                                 }: ActionContainerProps) {
  return (
    <div className={classNames('actions', cssClasses)}>
      {children}
    </div>
  );
}

export function ActionLink({
                             style, icon, linkTo, children,
                           }: ActionLinkProps) {
  return (
    <Button
      className={classNames('action-container', actionStyleToCssClass(style))}
      variant="contained"
      color={actionStyleToCssClass(style)}
      component={Link}
      to={linkTo}
      startIcon={icon && <Icon>{icon}</Icon>}
    >
      {children}
    </Button>
  );
}

export function ActionButton(
  {
    style,
    icon,
    cssClasses,
    onClick,
    isLoading = false,
    children,
    disabled = false,
  }: ActionButtonProps,
) {
  return (
    <div
      className={
        classNames(
          'action-container',
          'loading-button',
          cssClasses,
          { 'loading-button--loading': isLoading },
        )
      }
    >
      <Button
        onClick={onClick}
        type={onClick ? 'button' : 'submit'}
        variant="contained"
        disabled={isLoading || disabled}
        color={actionStyleToCssClass(style)}
        startIcon={icon && <Icon>{icon}</Icon>}
      >
        {children}
      </Button>
      {
        isLoading
        && (
          <div className="loading-progress">
            <CircularProgress size="100%" color="inherit" />
          </div>
        )
      }
    </div>
  );
}
