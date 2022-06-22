import { Button, CircularProgress, Icon } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
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
    <div className={`actions ${cssClasses ?? ''}`}>
      {children}
    </div>
  );
}

export function ActionLink({
  style, icon, linkTo, children,
}: ActionLinkProps) {
  return (
    <Button
      className={`action-container ${actionStyleToCssClass(style)}`}
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

export function ActionButton({
  style,
  icon,
  cssClasses,
  onClick,
  isLoading,
  children,
}: ActionButtonProps) {
  return (
    <div
      className={
        `action-container loading-button ${cssClasses ?? ''}${isLoading ? ' loading-button--loading' : ''}`
      }
    >
      <Button
        onClick={onClick}
        type={onClick ? 'button' : 'submit'}
        variant="contained"
        disabled={isLoading}
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
