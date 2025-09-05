"use client"

import { AdminErrorFallback } from "@/components/error-boundary"

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <AdminErrorFallback error={error} resetError={reset} />
}
