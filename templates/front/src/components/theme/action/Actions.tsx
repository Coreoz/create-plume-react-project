import React from 'react';

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
    <div className={`action-container loading-button ${cssClasses}`}>
      <button
        onClick={onClick}
        type={onClick ? 'button' : 'submit'}
        disabled={isLoading}
      >
        {children}
      </button>
      {isLoading && (
        <div className="loading-progress">
          Loading...
        </div>
      )}
    </div>
  );
}
