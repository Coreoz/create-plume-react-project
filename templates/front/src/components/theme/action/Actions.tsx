import React from 'react';
import { WithChildren } from '../../../lib/ts-react-children-type/WithChildren';

export type ActionButtonProps = WithChildren<{
  onClick?: () => void;
  loadingState?: boolean;
  cssClasses?: string;
}>;

export function ActionButton({
  cssClasses, onClick, loadingState, children,
}: ActionButtonProps) {
  return (
    <div className={`action-container loading-button ${cssClasses}`}>
      <button
        onClick={onClick}
        type={onClick ? 'button' : 'submit'}
        disabled={loadingState}
      >
        {children}
      </button>
      {loadingState && (
        <div className="loading-progress">
          Loading...
        </div>
      )}
    </div>
  );
}
