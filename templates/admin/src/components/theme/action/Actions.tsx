import { Link } from 'react-router-dom';
import React from 'react';
import { Button, CircularProgress, Icon, } from '@mui/material';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';
import {
  ActionButtonProps,
  ActionContainerProps,
  ActionLinkProps,
} from '../../../lib/plume-admin-theme/action/ActionProps';

function imageOrIconNameToIcon(image?: string, iconName?: string): JSX.Element | HTMLImageElement | null {
  if (!image && !iconName) {
    return null;
  }
  if (iconName) {
    return (
      <Icon>{iconName}</Icon>
    )
  }
  return (
    <img src={image} className="button-icon" alt="icon" />
  );
}

function actionStyleToCssClass(actionStyle?: ActionStyle): 'inherit' | 'primary' | 'secondary' | 'error' {
  if (!actionStyle) {
    return 'inherit';
  }
  if (actionStyle === ActionStyle.DANGER) {
    return 'error';
  }
  return actionStyle;
}

export function ActionsContainer({ children, cssClasses }: ActionContainerProps) {
  return (
    <div className={`actions${cssClasses ? ' ' + cssClasses : ''}`}>
      {children}
    </div>
  );
}

export function ActionLink(
  {
    style, icon, linkTo, children,
  }: ActionLinkProps
) {
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

export function ActionButton(
  {
    style, icon, iconName, cssClasses, onClick, isLoading, children
  }: ActionButtonProps
) {
  return (
    <div className={`action-container loading-button${cssClasses ? ' ' + cssClasses : ''}`}>
      <Button
        onClick={onClick}
        type={onClick ? 'button' : 'submit'}
        variant="contained"
        disabled={isLoading}
        color={actionStyleToCssClass(style)}
        startIcon={imageOrIconNameToIcon(icon, iconName)}
      >
        {children}
      </Button>
      {
        isLoading
        && (
          <div className="loading-progress">
            <CircularProgress size="auto" />
          </div>
        )
      }
    </div>
  );
}
