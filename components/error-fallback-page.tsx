"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ErrorPageProps {
  error?: {
    message?: string
    digest?: string
  }
  reset?: () => void
}

export function ErrorFallbackPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl">Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            We encountered an unexpected error while loading this page.
            {error?.message && " The error has been logged for investigation."}
          </p>

          {process.env.NODE_ENV === "development" && error?.message && (
            <details className="bg-muted p-3 rounded text-sm text-left">
              <summary className="cursor-pointer font-medium mb-2">Error Details (Development)</summary>
              <p className="text-xs font-mono break-all">{error.message}</p>
              {error.digest && <p className="text-xs font-mono break-all mt-2">Digest: {error.digest}</p>}
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            {reset && (
              <Button onClick={reset} variant="outline" className="flex items-center gap-2 bg-transparent">
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}
            <Button onClick={() => window.history.back()} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Link href="/">
              <Button className="w-full flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
