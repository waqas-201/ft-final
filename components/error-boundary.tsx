"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  resetOnPropsChange?: boolean
  resetKeys?: Array<string | number>
}

interface ErrorFallbackProps {
  error?: Error
  resetError: () => void
  errorInfo?: React.ErrorInfo
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[v0] Error caught by boundary:", error)
    console.error("[v0] Error info:", errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    // Call the onError callback if provided
    this.props.onError?.(error, errorInfo)
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys } = this.props
    const { hasError } = this.state

    // Reset error boundary when resetKeys change
    if (hasError && prevProps.resetKeys !== resetKeys) {
      if (resetKeys?.some((key, idx) => prevProps.resetKeys?.[idx] !== key)) {
        this.resetErrorBoundary()
      }
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      window.clearTimeout(this.resetTimeoutId)
    }

    this.resetTimeoutId = window.setTimeout(() => {
      this.setState({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
      })
    }, 0)
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      window.clearTimeout(this.resetTimeoutId)
    }
  }

  render() {
    const { hasError, error, errorInfo } = this.state
    const { children, fallback: Fallback } = this.props

    if (hasError) {
      if (Fallback) {
        return <Fallback error={error} resetError={this.resetErrorBoundary} errorInfo={errorInfo} />
      }

      return <DefaultErrorFallback error={error} resetError={this.resetErrorBoundary} errorInfo={errorInfo} />
    }

    return children
  }
}

// Default error fallback component
function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <Card className="max-w-lg mx-auto my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          Something went wrong
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          We encountered an unexpected error. This has been logged and we'll look into it.
        </p>

        {process.env.NODE_ENV === "development" && error && (
          <details className="bg-muted p-3 rounded text-sm">
            <summary className="cursor-pointer font-medium mb-2">Error Details (Development)</summary>
            <pre className="whitespace-pre-wrap text-xs overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        <div className="flex gap-2">
          <Button onClick={resetError} variant="outline" className="flex items-center gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="default" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

// Specific error fallbacks for different sections
export function ProductErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <Card className="p-6 text-center">
      <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Unable to load products</h3>
      <p className="text-muted-foreground mb-4">
        There was an error loading the product information. Please try again.
      </p>
      <div className="flex justify-center gap-2">
        <Button onClick={resetError} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
        <Link href="/">
          <Button variant="default">
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </Link>
      </div>
    </Card>
  )
}

export function CartErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <Card className="p-6 text-center">
      <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Cart Error</h3>
      <p className="text-muted-foreground mb-4">
        There was an error with your shopping cart. Your items should still be saved.
      </p>
      <div className="flex justify-center gap-2">
        <Button onClick={resetError} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Reload Cart
        </Button>
        <Link href="/products">
          <Button variant="default">Continue Shopping</Button>
        </Link>
      </div>
    </Card>
  )
}

export function AdminErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <Card className="p-6 text-center">
      <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">Admin Panel Error</h3>
      <p className="text-muted-foreground mb-4">
        There was an error loading the admin panel. Please try refreshing the page.
      </p>
      <div className="flex justify-center gap-2">
        <Button onClick={resetError} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
        <Button onClick={() => window.location.reload()} variant="default">
          Refresh Page
        </Button>
      </div>
    </Card>
  )
}

// Hook for using error boundaries programmatically
export function useErrorHandler() {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    console.error("[v0] Manual error report:", error)
    if (errorInfo) {
      console.error("[v0] Error info:", errorInfo)
    }

    // In a real app, you might want to send this to an error reporting service
    // like Sentry, LogRocket, etc.
  }
}
