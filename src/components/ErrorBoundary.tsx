import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log the error to an error reporting service here.
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto p-6" dir="rtl">
          <h2 className="text-2xl font-bold text-red-600">حدث خطأ</h2>
          <p className="mt-4">
            نأسف، حدث خطأ أثناء تحميل الصفحة. يرجى المحاولة مرة أخرى لاحقاً.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {this.state.error?.message}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
