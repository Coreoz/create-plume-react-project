import { Link } from 'react-router-dom';
import React from 'react';
import {
  Button, CircularProgress, Icon,
} from '@mui/material';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';
import {
  ActionButtonProps,
  ActionContainerProps,
  ActionLinkProps,
} from '../../../lib/plume-admin-theme/action/ActionProps';

function actionStyleToCssClass(actionStyle?: ActionStyle): 'inherit' | 'primary' | 'secondary' {
  return actionStyle === 'primary' ? 'primary' : 'secondary';
}

export function ActionsContainer({ children }: ActionContainerProps) {
  return (
    <div className="actions">
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
  style, icon, cssClasses, onClick, loadingState, children,
}: ActionButtonProps) {
  return (
    <div className={`action-container loading-button ${cssClasses}`}>
      <Button
        onClick={onClick}
        type={onClick ? 'button' : 'submit'}
        variant="contained"
        disabled={loadingState}
        color={actionStyleToCssClass(style)}
        startIcon={icon && <Icon>{icon}</Icon>}
      >
        {children}
      </Button>
      {loadingState && (
      <div className="loading-progress">
        <CircularProgress size="auto" />
      </div>
      )}
    </div>
  );
}
