import React from 'react';
import { Task } from '../../../api/tasks/TasksApi';
import { useMessages } from '../../../i18n/useMessages';
import styles from './ScheduledListComponent.module.scss';
import moment from 'moment';
import classNames from '@lib/class-names/ClassNames';

interface ScheduledListComponentProps {
  tasks: Task[],
  onRunTask: (taskName: string) => void,
  onDeleteTask: (taskName: string) => void,
  isLoading?: boolean,
}

const ScheduledListComponent: React.FC<ScheduledListComponentProps> = ({
  tasks,
  onRunTask,
  onDeleteTask,
  isLoading,
}) => {
  const { messages } = useMessages();

  const formatDisplayDate = (timestamp?: number | null): string => {
    if (!timestamp) {
      return messages.tasks.neverExecuted;
    }
    return moment(timestamp).format(messages.tasks.dateFormat);
  };

  const getStatusStyle = (status: string): string => {
    switch (status.toLowerCase()) {
    case 'done':
      return classNames(styles.status, styles['status--done']);
    case 'scheduled':
      return classNames(styles.status, styles['status--scheduled']);
    case 'ready':
      return classNames(styles.status, styles['status--ready']);
    case 'running':
      return classNames(styles.status, styles['status--running']);
    default:
      return styles.status;
    }
  };

  if (isLoading) {
    return <div>{messages.tasks.loading}</div>;
  }

  if (!tasks || tasks.length === 0) {
    return <div>{messages.tasks.noTasksFound}</div>;
  }

  return (
    <div className={styles.taskListContainer}>
      <h2>{messages.tasks.listPanelTitle}</h2>
      <table className={styles.taskListTable}>
        <thead>
          <tr>
            <th>{messages.tasks.columnName}</th>
            <th>{messages.tasks.columnFrequency}</th>
            <th className={styles.centeredCellContent}>{messages.tasks.columnExecutions}</th>
            <th>{messages.tasks.columnNextExecution}</th>
            <th className={styles.centeredCellContent}>{messages.tasks.columnLastStart}</th>
            <th className={styles.centeredCellContent}>{messages.tasks.columnLastEnd}</th>
            <th className={styles.centeredCellContent}>{messages.tasks.columnStatus}</th>
            <th>{messages.tasks.columnActions}</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.name}>
              {' '}
              {/* Assuming task.name is unique */}
              <td>{task.name}</td>
              <td>{task.frequency}</td>
              <td className={styles.centeredCellContent}>{task.executionsCount}</td>
              <td>{formatDisplayDate(task.nextExecutionTimeInMillis)}</td>
              <td className={styles.centeredCellContent} title={
                task.lastExecutionStartedTimeInMillis && task.lastExecutionEndedTimeInMillis
                  ? messages.tasks.executionDurationTooltip(
                    task.lastExecutionEndedTimeInMillis - task.lastExecutionStartedTimeInMillis,
                  )
                  : undefined
              }>
                {formatDisplayDate(task.lastExecutionStartedTimeInMillis)}
              </td>
              <td className={styles.centeredCellContent} title={
                task.lastExecutionStartedTimeInMillis && task.lastExecutionEndedTimeInMillis
                  ? messages.tasks.executionDurationTooltip(
                    task.lastExecutionEndedTimeInMillis - task.lastExecutionStartedTimeInMillis,
                  )
                  : undefined
              }>
                {formatDisplayDate(task.lastExecutionEndedTimeInMillis)}
              </td>
              <td className={styles.centeredCellContent}>
                <span className={getStatusStyle(task.status)}>{task.status}</span>
              </td>
              <td className={styles.actionsCell}>
                <button
                  className={styles.runButton}
                  onClick={() => onRunTask(task.name)}
                  disabled={!task.canBeRun}
                >
                  {messages.tasks.runTaskButton}
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => onDeleteTask(task.name)}
                >
                  {messages.tasks.deleteTaskButton}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduledListComponent;
