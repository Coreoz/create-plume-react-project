import { ApplicationLogger, LoggerLevel } from 'simple-logging-system';

/**
 * Remplace le logger par défaut de nodejs avec console.log pour y ajouter l'heure et les informations de logs
 */
export default class ServerLogger {
  static setupServerLogs(verbose: boolean) {
    ApplicationLogger.setLoggerFunction(
      (level: LoggerLevel, loggerName: string, message: string, ...args: unknown[]) => {
        ServerLogger.logMessage(verbose, level, loggerName, message, ...args);
      },
    );
  }

  private static logMessage(
    verbose: boolean, level: LoggerLevel, loggerName: string, message: string, ...args: unknown[]
  ) {
    if (level !== LoggerLevel.DEBUG || verbose) {
      ServerLogger.internalLog(level, ServerLogger.formatMessage(verbose, loggerName, message), ...args);
    }
  }

  private static formatMessage(verbose: boolean, loggerName: string, message: string) {
    if (verbose) {
      return `${loggerName}: ${message}`;
    }
    return message;
  }

  private static internalLog(level: LoggerLevel, message: string, ...args: unknown[]) {
    // eslint-disable-next-line no-console
    console.log(
      `${ServerLogger.levelToColor(level)}%s\x1b[0m`,
      message,
      ...args,
    );
  }

  private static levelToColor(level: LoggerLevel) {
    if (level === LoggerLevel.ERROR) {
      // red
      return '\x1b[31m';
    }
    if (level === LoggerLevel.WARN) {
      // yellow
      return '\x1b[33m';
    }
    if (level === LoggerLevel.INFO) {
      // green
      return '\x1b[32m';
    }
    if (level === LoggerLevel.DEBUG) {
      // gray
      return '\x1b[37m';
    }
    // black
    return '\x1b[30m';
  }
}
