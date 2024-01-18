import React from 'react';
import useMessages from '../../../i18n/hooks/messagesHook';
import {
  ListElementsProps,
  ListSingleElementProps,
} from '../../../lib/plume-admin-theme/table/ListProps';

type EmptyStateProps = {
  emptyTableLabel: string,
};

function EmptyState({ emptyTableLabel }: EmptyStateProps) {
  return (
    <div className="list-elements list-elements--empty">
      <span>{emptyTableLabel}</span>
    </div>
  );
}

export function ListElements(
  {
    listLength, isLoading = false, children, label,
  }: ListElementsProps,
) {
  const { messages } = useMessages();
  const defaultLabel: string = messages.label.empty;
  if (isLoading) {
    const loadingLabel: string = messages.label.loading;
    return (
      <EmptyState emptyTableLabel={loadingLabel} />
    );
  }
  if (!listLength) {
    return (
      <EmptyState emptyTableLabel={label || defaultLabel} />
    );
  }
  return (
    <div className="list-elements">
      {children}
    </div>
  );
}

export function ListSingleElement(
  {
    children,
    onSelectElement,
    cssClasses,
  }: ListSingleElementProps,
) {
  return (
    <div
      aria-hidden="true"
      className={`list-single-element ${cssClasses ?? ''}`}
      onClick={() => {
        if (onSelectElement) {
          onSelectElement();
        }
      }}
      role={onSelectElement ? 'button' : 'presentation'}
      aria-label="list-single-element"
    >
      {children}
    </div>
  );
}
