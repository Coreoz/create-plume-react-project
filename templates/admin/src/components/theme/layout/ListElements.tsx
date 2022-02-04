import React from 'react';
import { getGlobalInstance } from 'plume-ts-di';
import MessageService from '../../../i18n/messages/MessageService';
import { ListElementsProps } from '../../../lib/plume-admin-theme/layout/LayoutProps';

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

export default function ListElements({ listLength, isLoading = false, children, label }: ListElementsProps) {
  const messages = getGlobalInstance(MessageService).t();
  const defaultLabel = messages['label.empty'];
  if (isLoading) {
    const loadingLabel = messages['label.loading'];
    return <EmptyState label={loadingLabel} />
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
