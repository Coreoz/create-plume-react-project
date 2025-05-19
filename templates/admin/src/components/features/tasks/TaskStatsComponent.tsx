import React, { useState, useCallback } from 'react';
import { ThreadStats } from '@api/tasks/TasksApi'; // Adjusted path
import styles from './TaskStatsComponent.module.scss';
import { useMessages } from '../../../i18n/useMessages'; // Assuming this path for useMessages
// Remove unused imports
// import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
// import useLoader, { LoaderState } from '@lib/plume-http-react-hook-loader/promiseLoaderHook';

interface TaskStatsComponentProps {
  statsData?: ThreadStats, // Make statsData optional to handle loading/undefined state
  isLoading?: boolean,
}

// Refactored to exported default function with destructured props
export default function TaskStatsComponent(
  { statsData, isLoading }: TaskStatsComponentProps,
) {
  // First section: Service retrieval (Not needed for this component)

  // Second section: State declaration (Not needed for this component)

  // Third section: Hooks
  const { messages } = useMessages();

  // Fourth section: Methods declaration (Not needed for rendering logic)

  // Fifth section: React lifecycle (Not needed for this component)

  // Sixth section: Component rendering, mandatory
  if (isLoading) {
    return <div>{messages.tasks.loading}</div>; // Or a dedicated spinner component
  }

  if (!statsData) {
    // Assuming an error message for fetching is sufficient if statsData is missing when not loading
    return <div>{messages.tasks.errorFetching}</div>;
  }

  // The migration plan mentions PlmPanel. Assuming a similar UI structure is desired.
  // Using a simple div structure for now, can be enhanced with a Panel component if available.
  return (
    <div className={styles.taskStatsContainer}>
      <h2>{messages.tasks.statsPanelTitle}</h2>
      <div className={styles.statItem}>
        {messages.tasks.statsActiveThreads}
        <span className={styles.activeValue}>
          {' '}
          {statsData.activeThreads}
        </span>
      </div>
      <div className={styles.statItem}>
        {messages.tasks.statsInactiveThreads}
        <span className={styles.inactiveValue}>
          {' '}
          {statsData.inactiveThreads}
        </span>
      </div>
      <div className={styles.statItem}>
        {messages.tasks.statsMinThreads}
        <span className={styles.statValue}>
          {' '}
          {statsData.minThreads}
        </span>
      </div>
      <div className={styles.statItem}>
        {messages.tasks.statsMaxThreads}
        <span className={styles.statValue}>
          {' '}
          {statsData.maxThreads}
        </span>
      </div>
      <div className={styles.statItem}>
        {messages.tasks.statsLargestPool}
        <span className={styles.statValue}>
          {' '}
          {statsData.largestPoolSize}
        </span>
      </div>
    </div>
  );
}
