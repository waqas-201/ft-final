"use client"

import { useState } from "react"

interface RetryOptions {
  maxRetries?: number
  baseDelay?: number
  maxDelay?: number
  backoffMultiplier?: number
  retryCondition?: (error: any, response?: Response) => boolean
}

interface ApiClientOptions extends RetryOptions {
  timeout?: number
}

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

const defaultRetryCondition = (error: any, response?: Response): boolean => {
  // Retry on network errors
  if (!response) return true

  // Retry on server errors (5xx) and rate limiting (429)
  if (response.status >= 500 || response.status === 429) return true

  // Don't retry on client errors (4xx) except 429
  return false
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

export async function apiClientWithRetry(url: string, options: RequestInit & ApiClientOptions = {}): Promise<Response> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    backoffMultiplier = 2,
    timeout = 30000,
    retryCondition = defaultRetryCondition,
    ...fetchOptions
  } = options

  // Add timeout to fetch options
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  const fetchWithTimeout = async (): Promise<Response> => {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      throw error
    }
  }

  let lastError: any
  let lastResponse: Response | undefined

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[v0] API call attempt ${attempt + 1}/${maxRetries + 1} to ${url}`)

      const response = await fetchWithTimeout()

      // If response is ok, return it
      if (response.ok) {
        console.log(`[v0] API call successful on attempt ${attempt + 1}`)
        return response
      }

      // If response is not ok, check if we should retry
      lastResponse = response
      const shouldRetry = attempt < maxRetries && retryCondition(null, response)

      if (!shouldRetry) {
        throw new ApiError(`HTTP ${response.status}: ${response.statusText}`, response.status, response)
      }

      console.log(`[v0] API call failed with status ${response.status}, retrying...`)
    } catch (error) {
      lastError = error

      // If this is the last attempt or we shouldn't retry, throw the error
      if (attempt === maxRetries || !retryCondition(error, lastResponse)) {
        console.error(`[v0] API call failed after ${attempt + 1} attempts:`, error)
        throw error instanceof ApiError
          ? error
          : new ApiError(error instanceof Error ? error.message : "Network error", undefined, lastResponse)
      }

      console.log(
        `[v0] API call failed, retrying in ${Math.min(baseDelay * Math.pow(backoffMultiplier, attempt), maxDelay)}ms...`,
      )
    }

    // Wait before retrying (exponential backoff)
    if (attempt < maxRetries) {
      const delay = Math.min(baseDelay * Math.pow(backoffMultiplier, attempt), maxDelay)
      await sleep(delay)
    }
  }

  // This should never be reached, but just in case
  throw lastError || new ApiError("Unknown error occurred")
}

// Convenience methods for common HTTP methods
export const apiClient = {
  get: (url: string, options?: ApiClientOptions) => apiClientWithRetry(url, { ...options, method: "GET" }),

  post: (url: string, data?: any, options?: ApiClientOptions) =>
    apiClientWithRetry(url, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: (url: string, data?: any, options?: ApiClientOptions) =>
    apiClientWithRetry(url, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: (url: string, options?: ApiClientOptions) => apiClientWithRetry(url, { ...options, method: "DELETE" }),
}

// Hook for handling API calls with loading and error states
export function useApiCall<T = any>() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<T | null>(null)

  const execute = async (
    apiCall: () => Promise<Response>,
    options?: {
      onSuccess?: (data: T) => void
      onError?: (error: string) => void
      showRetryButton?: boolean
    },
  ) => {
    setLoading(true)
    setError(null)

    try {
      const response = await apiCall()
      const result = await response.json()
      setData(result)
      options?.onSuccess?.(result)
      return result
    } catch (err) {
      const errorMessage = err instanceof ApiError ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      options?.onError?.(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const retry = async (apiCall: () => Promise<Response>) => {
    if (loading) return
    await execute(apiCall)
  }

  return { loading, error, data, execute, retry, setError }
}
