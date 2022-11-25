import React from 'react';
import useMessages from '../../../i18n/hooks/messagesHook';
import {ListElementsProps, ListSingleElementProps,} from '../../../lib/plume-admin-theme/list/ListProps';

type EmptyStateProps = {
  label: string;
};

function EmptyState({ label }: EmptyStateProps) {
  return (
    <div className="list-elements list-elements--empty">
      <span>{label}</span>
    </div>
  );
}

export function ListElements(
  {
    listLength, isLoading = false, children, label,
  }: ListElementsProps,
) {
  const { messages } = useMessages();
  const defaultLabel = messages.label.empty;
  if (isLoading) {
    const loadingLabel = messages.label.loading;
    return (
      <EmptyState label={loadingLabel} />
    );
  }
  if (!listLength) {
    return (
      <EmptyState label={label || defaultLabel} />
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
