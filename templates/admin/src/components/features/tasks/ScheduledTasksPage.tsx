import React, { useState, useCallback } from 'react';
import TasksApi, { Task, ThreadStats, ScheduledTasksData } from '../../../api/tasks/TasksApi';
import { useOnComponentMounted } from '@lib/react-hooks-alias/ReactHooksAlias';
import useLoader, { LoaderState } from '@lib/plume-http-react-hook-loader/promiseLoaderHook';
import { useMessages } from '../../../i18n/useMessages';
import ScheduledListComponent from './ScheduledListComponent';
import TaskStatsComponent from './TaskStatsComponent';
import styles from './ScheduledTasksPage.module.scss';
import { getGlobalInstance } from 'plume-ts-di';
import useNotification, { PlumeNotification } from '@lib/plume-notification/NotificationHook';

export default function ScheduledTasksPage() {
  const tasksApi: TasksApi = getGlobalInstance(TasksApi);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<ThreadStats | undefined>(undefined);

  const { messages, httpError } = useMessages();
  const loader: LoaderState = useLoader();
  const {
    notifyHttpError,
    notifySuccess,
  }: PlumeNotification = useNotification();

  const fetchData = useCallback(() => {
    setTasks([]);
    setStats(undefined);

    loader.monitor(
      tasksApi.getTasksAndStats()
        .then((data: ScheduledTasksData) => {
          setTasks(data.jobs);
          setStats(data.threadStats);
        })
        .catch((err) => {
          notifyHttpError(err);
        }),
    );
  }, [tasksApi, loader, notifyHttpError]);

  const handleRunTask = useCallback((taskName: string) => {
    loader.monitor(
      tasksApi.executeTaskByName(taskName)
        .then(() => {
          notifySuccess(messages.tasks.taskExecutedSuccess);
          fetchData();
        })
        .catch((err) => {
          notifyHttpError(err);
        }),
    );
  }, [tasksApi, loader, fetchData, notifySuccess, notifyHttpError, messages.tasks.taskExecutedSuccess]);

  const handleDeleteTask = useCallback((taskName: string) => {
    loader.monitor(
      tasksApi.deleteTaskByName(taskName)
        .then(() => {
          notifySuccess(messages.tasks.taskDeletedSuccess);
          fetchData();
        })
        .catch((err) => {
          notifyHttpError(err);
        }),
    );
  }, [tasksApi, loader, fetchData, notifySuccess, notifyHttpError, messages.tasks.taskDeletedSuccess]);

  useOnComponentMounted(() => {
    fetchData();
  });

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>{messages.tasks.pageTitle}</h1>

      <div className={styles.contentLayout}>
        <div>
          <ScheduledListComponent
            tasks={tasks}
            onRunTask={handleRunTask}
            onDeleteTask={handleDeleteTask}
            isLoading={loader.isLoading}
          />
        </div>
        <div>
          <TaskStatsComponent statsData={stats} isLoading={loader.isLoading} />
        </div>
      </div>
    </div>
  );
}
