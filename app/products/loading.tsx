import { ProductCardSkeleton } from "@/components/ui/product-card-skeleton"
import { FiltersSkeleton } from "@/components/ui/filters-skeleton"
import { PageHeaderSkeleton } from "@/components/ui/page-header-skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar Skeleton */}
          <div className="lg:w-64 hidden lg:block">
            <FiltersSkeleton />
          </div>

          {/* Products Grid Skeleton */}
          <div className="flex-1">
            {/* Header Skeleton */}
            <PageHeaderSkeleton />

            {/* Products Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <ProductCardSkeleton key={i} viewMode="grid" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
