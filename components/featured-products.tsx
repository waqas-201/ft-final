"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Star, ArrowUpRight, Sparkles, Palette } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ErrorRetry } from "@/components/ui/error-retry"
import { ErrorBoundary, ProductErrorFallback } from "@/components/error-boundary"
import { apiClient } from "@/lib/api-client"
import Link from "next/link"

interface Product {
  id: string
  name: string
  slug: string
  description: string
  category: {
    id: string
    name: string
    slug: string
  }
  variants: {
    id: string
    name: string
    price: number
    colors: {
      id: string
      name: string
      hexCode: string
      images: {
        id: string
        url: string
        alt: string
      }[]
    }[]
  }[]
  discount: number | null
  featured: boolean
  createdAt: string
}

function FeaturedProductsContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("[v0] Fetching featured products with retry mechanism")

      const response = await apiClient.get("/api/products?featured=true", {
        maxRetries: 2,
        timeout: 15000,
      })

      const data = await response.json()
      setProducts(data.products || [])
      console.log("[v0] Featured products loaded successfully:", data.products?.length || 0)
    } catch (error) {
      console.error("[v0] Failed to fetch featured products:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to load featured products"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const ColorCircles = ({
    colors,
    showAll = false,
  }: { colors: Array<{ hexCode: string; name: string }>; showAll?: boolean }) => {
    if (!colors || colors.length === 0) return null

    const displayColors = showAll ? colors : colors.slice(0, 4)
    const hasMore = !showAll && colors.length > 4

    return (
      <div className="flex items-center gap-2">
        <Palette className="w-4 h-4 text-muted-foreground" />
        <div className="flex gap-1.5 flex-wrap">
          {displayColors.map((color, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full border-2 border-white shadow-md ring-2 ring-black/20 hover:scale-110 transition-transform cursor-pointer"
              style={{ backgroundColor: color.hexCode }}
              title={color.name}
            />
          ))}
          {hasMore && (
            <div className="w-6 h-6 rounded-full bg-muted border-2 border-white shadow-md ring-2 ring-black/20 flex items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">+{colors.length - 4}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  const StarRating = ({ rating = 4.5 }: { rating?: number }) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    return (
      <div className="flex items-center gap-1">
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < fullStars
                  ? "fill-amber-400 text-amber-400"
                  : index === fullStars && hasHalfStar
                    ? "fill-amber-400/50 text-amber-400"
                    : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">({rating})</span>
      </div>
    )
  }

  return (
    <section
      id="products"
      className="py-24  relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/50 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Premium Quality Paints
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 sm:text-5xl mb-6">
            Featured Paint Collection
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Discover our handpicked selection of premium paints at unbeatable prices.
          </p>
        </div>

        {error && <ErrorRetry error={error} onRetry={fetchProducts} loading={loading} />}

        {loading ? (
          <div className="text-center text-slate-500 dark:text-slate-400">Loading products...</div>
        ) : products.length === 0 && !error ? (
          <div className="text-center text-slate-500 dark:text-slate-400">No featured products available.</div>
        ) : !error ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => {
              // Pick the first variant's first image
              const image = product.variants[0]?.colors[0]?.images[0]?.url || "/placeholder.svg"

              const allColors = product.variants.flatMap((variant) => variant.colors)

              return (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <Card
                    className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm border-0 shadow-lg overflow-hidden cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="aspect-square bg-gradient-to-br overflow-hidden relative">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.discount && (
                              <Badge className="bg-red-500 hover:bg-red-600 text-white shadow-lg">
                                {product.discount}% OFF
                              </Badge>
                            )}
                            {product.featured && (
                              <Badge className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-primary uppercase tracking-wide">
                            {product.category.name}
                          </div>
                          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                        </div>

                        <StarRating rating={4.5} />

                        <ColorCircles colors={allColors} showAll={false} />

                        <div className="pt-2 border-t border-slate-100 dark:border-gray-700">
                          <div className="font-bold text-xl text-slate-900 dark:text-slate-100">
                            PKR {product.variants[0]?.price || "N/A"}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        ) : null}

        {!error && (
          <div className="text-center mt-16">
            <Link href="/products">
              <Button
                size="lg"
                className="text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-full transform hover:scale-105"
              >
                Explore All Products
                <ArrowUpRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export function FeaturedProducts() {
  return (
    <ErrorBoundary fallback={ProductErrorFallback}>
      <FeaturedProductsContent />
    </ErrorBoundary>
  )
}
