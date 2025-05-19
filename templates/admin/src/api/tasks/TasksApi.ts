import { HttpMethod } from 'simple-http-request-builder';
import { HttpPromise } from 'simple-http-rest-client';
import ApiHttpClient from '../ApiHttpClient'; // Corrected path relative to src/api/tasks/

/**
 * Defines the structure of a scheduled task.
 */
export interface Task {
  name: string,
  frequency: string,
  executionsCount: number,
  nextExecutionTimeInMillis?: number | null,
  lastExecutionStartedTimeInMillis?: number | null,
  lastExecutionEndedTimeInMillis?: number | null,
  status: string,
  canBeRun: boolean,
  // Assuming 'name' can be used as a unique ID for operations like execute/delete
  // If there's a separate 'id' field, this interface should be updated.
}

/**
 * Defines the structure for thread statistics related to scheduled tasks.
 */
export interface ThreadStats {
  activeThreads: number,
  inactiveThreads: number,
  minThreads: number,
  maxThreads: number,
  largestPoolSize: number,
}

/**
 * Defines the structure for the combined data of tasks and thread statistics.
 */
export interface ScheduledTasksData {
  jobs: Task[],
  threadStats: ThreadStats,
}

const API_BASE_PATH: string = '/admin/system/scheduler';

/**
 * API for managing scheduled tasks.
 * This class centralizes all API communication for the tasks feature.
 */
export default class TasksApi {
  constructor(private readonly httpClient: ApiHttpClient) {}

  /**
   * Fetches the list of scheduled tasks and thread statistics.
   */
  getTasksAndStats(): HttpPromise<ScheduledTasksData> {
    return this.httpClient
      .restRequest<ScheduledTasksData>(HttpMethod.GET, API_BASE_PATH)
      .execute();
  }

  /**
   * Executes (runs) a scheduled task by its name.
   * @param taskName The name of the task to execute.
   */
  executeTaskByName(taskName: string): HttpPromise<void> {
    return this.httpClient
      .restRequest<void>(HttpMethod.POST, `${API_BASE_PATH}/${taskName}`)
      .execute();
  }

  /**
   * Deletes a scheduled task by its name (or ID).
   * The backend endpoint might need to be created or confirmed.
   * Assuming 'name' acts as the ID.
   * @param taskName The name (ID) of the task to delete.
   */
  deleteTaskByName(taskName: string): HttpPromise<void> {
    return this.httpClient
      .restRequest<void>(HttpMethod.DELETE, `${API_BASE_PATH}/${taskName}`)
      .execute();
  }
}
