import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function ProductCardSkeleton({ viewMode = "grid" }: { viewMode?: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex gap-6 p-6">
          {/* Image skeleton */}
          <Skeleton className="w-32 h-32 rounded-xl flex-shrink-0" />

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0 mr-4">
                {/* Title skeleton */}
                <Skeleton className="h-6 w-3/4 mb-2" />
                {/* Badges skeleton */}
                <div className="flex items-center gap-3 mb-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-16" />
                  <div className="flex gap-1.5">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="w-6 h-6 rounded-full" />
                  </div>
                </div>
              </div>
              {/* Price skeleton */}
              <div className="text-right flex-shrink-0">
                <Skeleton className="h-6 w-24 mb-1" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            {/* Description skeleton */}
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />

            {/* Features and button skeleton */}
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-1">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-14" />
              </div>
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="aspect-square w-full" />

      <CardHeader className="pb-3 pt-4">
        <div className="flex items-start justify-between gap-2">
          {/* Title skeleton */}
          <Skeleton className="h-5 w-3/4" />
        </div>
        <div className="flex items-center justify-between">
          {/* Category badge skeleton */}
          <Skeleton className="h-5 w-20" />
          {/* Color circles skeleton */}
          <div className="flex gap-1.5">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Description skeleton */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />

        {/* Features skeleton */}
        <div className="flex flex-wrap gap-1 mb-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
        </div>

        {/* Price and button skeleton */}
        <div className="flex justify-between items-end">
          <div>
            <Skeleton className="h-6 w-24 mb-1" />
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}
