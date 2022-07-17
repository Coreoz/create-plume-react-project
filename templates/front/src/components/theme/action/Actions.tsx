import React from 'react';
import scss from './actions.module.scss';

export type ActionButtonProps = {
  onClick?: () => void;
  loadingState?: boolean;
  cssClasses?: string;
  children?: React.ReactNode;
};

export function ActionButton({
  cssClasses, onClick, loadingState, children,
}: ActionButtonProps) {
  return (
    <div className={`${scss.actionContainer} ${scss.loadingButton} ${cssClasses}`}>
      <button
        onClick={onClick}
        type={onClick ? 'button' : 'submit'}
        disabled={loadingState}
      >
        {children}
      </button>
      {loadingState && (
        <div className={scss.loadingProgress}>
          Loading...
        </div>
      )}
    </div>
  );
}
