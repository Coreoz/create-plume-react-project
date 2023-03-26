import React from 'react';
import scss from './actions.module.scss';

export type ActionButtonProps = {
  onClick?: () => void;
  isLoading?: boolean;
  cssClasses?: string;
  children?: React.ReactNode;
};

export function ActionButton({
  cssClasses, onClick, isLoading, children,
}: ActionButtonProps) {
  return (
    <div className={`${scss.actionContainer} ${scss.loadingButton} ${cssClasses}`}>
      <button
        onClick={onClick}
        type={onClick ? 'button' : 'submit'}
        disabled={isLoading}
      >
        {children}
      </button>
      {isLoading && (
        <div className={scss.loadingProgress}>
          Loading...
        </div>
      )}
    </div>
  );
}
