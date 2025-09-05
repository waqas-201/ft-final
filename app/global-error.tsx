"use client"

import { ErrorFallbackPage } from "@/components/error-fallback-page"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <ErrorFallbackPage error={error} reset={reset} />
      </body>
    </html>
  )
}
