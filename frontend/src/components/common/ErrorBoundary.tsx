import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("Application rendering failed", error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="error-boundary" role="alert" aria-labelledby="error-title">
        <div className="panel error-boundary__panel">
          <p className="eyebrow">Avona StadiumAI</p>
          <h1 id="error-title">The stadium console needs a refresh.</h1>
          <p>Something interrupted this view. Your saved role and stadium data are safe.</p>
          <button className="primary-action" type="button" onClick={this.handleRetry}>
            Try Again
          </button>
        </div>
      </main>
    );
  }
}

export default ErrorBoundary;
