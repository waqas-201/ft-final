import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function FiltersSkeleton() {
  return (
    <Card className="p-6 sticky top-24 border shadow-sm">
      {/* Filters title */}
      <Skeleton className="h-6 w-20 mb-4" />

      {/* Categories section */}
      <div className="mb-6">
        <Skeleton className="h-5 w-24 mb-3" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-5 w-8" />
            </div>
          ))}
        </div>
      </div>

      {/* Price range section */}
      <div className="mb-6">
        <Skeleton className="h-5 w-24 mb-3" />
        <div className="px-2">
          <Skeleton className="h-2 w-full mb-2" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </Card>
  )
}
