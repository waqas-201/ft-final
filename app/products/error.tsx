"use client"

import { ProductErrorFallback } from "@/components/error-boundary"

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <ProductErrorFallback error={error} resetError={reset} />
}
