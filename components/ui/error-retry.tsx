"use client"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, AlertCircle } from "lucide-react"

interface ErrorRetryProps {
  error: string
  onRetry: () => void
  loading?: boolean
  showRetryButton?: boolean
}

export function ErrorRetry({ error, onRetry, loading = false, showRetryButton = true }: ErrorRetryProps) {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{error}</span>
        {showRetryButton && (
          <Button variant="outline" size="sm" onClick={onRetry} disabled={loading} className="ml-4 bg-transparent">
            {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            {loading ? "Retrying..." : "Retry"}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
