import React, { Component, ErrorInfo } from 'react';
import { Logger } from 'simple-logging-system';

const logger = new Logger('GlobalErrorBoundary');

type GlobalErrorBoundaryProps = {
  children: React.ReactNode,
};

type GlobalErrorBoundaryState = {
  error?: Error,
  errorInfo?: ErrorInfo,
};

export default class GlobalErrorBoundary
  extends Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    logger.error(
      `${error.name}: ${error.message}`,
      { stack: error.stack, componentStack: errorInfo.componentStack },
    );
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;

    if (errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <div>You can try to reload the page, hopefully the bug will not occur again!</div>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return children;
  }
}
