"use client"

import { CartErrorFallback } from "@/components/error-boundary"

export default function CartError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <CartErrorFallback error={error} resetError={reset} />
}
