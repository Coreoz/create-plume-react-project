import { ActionsContainer } from '@components/theme/action/Actions';
import List from '@components/theme/list/List';
import ListHead from '@components/theme/list/ListHead';
import { PanelContent } from '@components/theme/panel/Panel';
import { ListHeadProps, ListProps } from '@lib/plume-admin-theme/list/ListProps';
import React, { PropsWithChildren } from 'react';
import scss from './search-layout.module.scss';

export function SearchLayout({ children }: PropsWithChildren<{}>) {
  return <PanelContent className={scss.searchLayout}>{children}</PanelContent>;
}

export function SearchHead({ children }: PropsWithChildren<{}>) {
  return <div className={scss.searchHead}>{children}</div>;
}

export function SearchInput({ children }: PropsWithChildren<{}>) {
  return <div className={scss.searchInput}>{children}</div>;
}

export function SearchActions({ children }: PropsWithChildren<{}>) {
  return <ActionsContainer className={scss.searchActions} position="end">{children}</ActionsContainer>;
}

export function SearchDisplay({ children }: PropsWithChildren<{}>) {
  return <div className={scss.searchDisplay}>{children}</div>;
}

export function SearchDisplayFilters({ children }: PropsWithChildren<{}>) {
  return <div className={scss.searchFilters}>{children}</div>;
}

export function SearchResults({ children }: PropsWithChildren<{}>) {
  return <div className={scss.searchResults}>{children}</div>;
}

export function SearchResultsHead({
  title,
  children,
  isLoading,
}: Omit<ListHeadProps, 'className'>) {
  return (
    <ListHead title={title} isLoading={isLoading} className={scss.searchResultsHead}>
      {children}
    </ListHead>
  );
}

export function SearchResultsList({
  children,
  isEmpty,
  isLoading,
  showLoader,
  emptyStateLabel,
}: Omit<ListProps, 'className'>) {
  return (
    <List
      isEmpty={isEmpty}
      isLoading={isLoading}
      className={scss.searchResultsResults}
      showLoader={showLoader}
      emptyStateLabel={emptyStateLabel}
    >
      {children}
    </List>
  );
}

export function SearchResultsActions({ children }: PropsWithChildren<{}>) {
  return (
    <ActionsContainer className={scss.searchResultsActions}>
      {children}
    </ActionsContainer>
  );
}
