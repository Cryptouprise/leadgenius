import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // You can also log error to an error reporting service here
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
          <Card className="max-w-2xl w-full bg-slate-800 border-slate-700">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="h-16 w-16 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
                
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-white">
                    Oops! Something went wrong
                  </h1>
                  <p className="text-slate-400">
                    We're sorry for the inconvenience. An unexpected error has occurred.
                  </p>
                </div>

                {process.env.NODE_ENV === "development" && this.state.error && (
                  <details className="w-full text-left">
                    <summary className="cursor-pointer text-sm text-slate-400 hover:text-slate-300 mb-2">
                      Error details (Development mode)
                    </summary>
                    <div className="bg-slate-900 rounded-lg p-4 text-xs text-red-400 font-mono overflow-auto max-h-64">
                      <div className="mb-2">
                        <strong>Error:</strong> {this.state.error.toString()}
                      </div>
                      {this.state.errorInfo && (
                        <div>
                          <strong>Component Stack:</strong>
                          <pre className="mt-1 whitespace-pre-wrap">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={this.handleReset}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/")}
                    className="border-slate-600 text-white hover:bg-slate-700"
                  >
                    Go Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
