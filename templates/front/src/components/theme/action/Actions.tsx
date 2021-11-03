import React from 'react';

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
