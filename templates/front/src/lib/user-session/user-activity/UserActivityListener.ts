export default abstract class UserActivityListener {
  /**
   * Function that when called starts the detection of user activity.
   * It should generally add window listeners of mouse and keyboard events.
   * It is then in charge of calling the registerUserActivity function
   * when any user activity is detected.
   */
  abstract startUserActivityDetector(registerUserActivity: () => void): void;

  /**
   * Function that when called stops the detection of user activity.
   * It should generally remove any window listeners that has been
   * set up by the startUserActivityDetector function.
   */
  abstract stopUserActivityDetector(registerUserActivity: () => void): void;
}
