"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, Star, Palette, Search, X, Tag, Package, Percent, Grid3X3, DollarSign, Settings2 } from "lucide-react"
import { ProductCardSkeleton } from "@/components/ui/product-card-skeleton"
import { FiltersSkeleton } from "@/components/ui/filters-skeleton"
import { PageHeaderSkeleton } from "@/components/ui/page-header-skeleton"
import { ErrorRetry } from "@/components/ui/error-retry"
import { apiClient } from "@/lib/api-client"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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
  variants: Array<{
    id: string
    name: string
    price: number
    stock: number
    colors: Array<{
      id: string
      name: string
      hexCode: string
      images: Array<{
        url: string
        alt: string
      }>
    }>
  }>
  tags: string
  discount?: number
  featured: boolean
  createdAt: string
}

interface Category {
  id: string
  name: string
  slug: string
  _count: {
    products: number
  }
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [searchQuery, setSearchQuery] = useState("")
  const [stockFilter, setStockFilter] = useState<"all" | "in-stock" | "out-of-stock">("all")
  const [discountFilter, setDiscountFilter] = useState(false)
  const [featuredFilter, setFeaturedFilter] = useState(false)
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const [expandedSections, setExpandedSections] = useState({
    categories: false,
    price: true,
    colors: false,
    brands: false,
    availability: false,
    special: false,
  })

  const [availableBrands, setAvailableBrands] = useState<string[]>([])
  const [availableColors, setAvailableColors] = useState<Array<{ name: string; hexCode: string; count: number }>>([])
  const [priceStats, setPriceStats] = useState({ min: 0, max: 10000, avg: 0 })

  const [showFiltersModal, setShowFiltersModal] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [onSaleOnly, setOnSaleOnly] = useState(false)
  const [freeShippingOnly, setFreeShippingOnly] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("[v0] Starting to fetch products and categories with retry mechanism")

      let productsData = { products: [] }
      try {
        console.log("[v0] Fetching products from /api/products")
        const productsResponse = await apiClient.get("/api/products?limit=50", {
          maxRetries: 2,
          timeout: 15000,
        })

        const responseText = await productsResponse.text()
        console.log("[v0] Products response text preview:", responseText.substring(0, 100))

        try {
          productsData = JSON.parse(responseText)
        } catch (parseError) {
          console.error("[v0] Failed to parse products JSON:", parseError)
          console.error("[v0] Response text:", responseText)
          productsData = { products: [] }
        }
      } catch (error) {
        console.error("[v0] Error fetching products:", error)
        throw error
      }

      let categoriesData = []
      try {
        console.log("[v0] Fetching categories from /api/categories")
        const categoriesResponse = await apiClient.get("/api/categories", {
          maxRetries: 2,
          timeout: 10000,
        })

        const responseText = await categoriesResponse.text()
        console.log("[v0] Categories response text preview:", responseText.substring(0, 100))

        try {
          categoriesData = JSON.parse(responseText)
        } catch (parseError) {
          console.error("[v0] Failed to parse categories JSON:", parseError)
          console.error("[v0] Response text:", responseText)
          categoriesData = []
        }
      } catch (error) {
        console.error("[v0] Error fetching categories:", error)
        categoriesData = []
      }

      console.log("[v0] Setting products:", productsData.products?.length || 0)
      console.log("[v0] Setting categories:", categoriesData?.length || 0)

      const products = productsData.products || []
      setProducts(products)
      setCategories(categoriesData || [])

      if (products.length > 0) {
        // Extract all unique brands/tags
        const brands = new Set<string>()
        products.forEach((product: Product) => {
          if (product.tags) {
            product.tags.split(",").forEach((tag) => brands.add(tag.trim()))
          }
        })
        setAvailableBrands(Array.from(brands).sort())

        // Extract all unique colors with counts
        const colorMap = new Map<string, { name: string; hexCode: string; count: number }>()
        products.forEach((product: Product) => {
          product.variants.forEach((variant) => {
            variant.colors.forEach((color) => {
              const key = color.hexCode
              if (colorMap.has(key)) {
                colorMap.get(key)!.count++
              } else {
                colorMap.set(key, { name: color.name, hexCode: color.hexCode, count: 1 })
              }
            })
          })
        })
        setAvailableColors(Array.from(colorMap.values()).sort((a, b) => b.count - a.count))

        // Calculate price statistics - Fixed price calculation
        const allPrices = products.flatMap((p: Product) =>
          p.variants.map((v) => {
            // Apply discount if present
            if (p.discount && p.discount > 0) {
              return Math.round(v.price * (1 - p.discount / 100))
            }
            return v.price
          }),
        )

        if (allPrices.length > 0) {
          const minPrice = Math.min(...allPrices)
          const maxPrice = Math.max(...allPrices)
          const avgPrice = allPrices.reduce((sum, price) => sum + price, 0) / allPrices.length

          console.log("[v0] Price stats - min:", minPrice, "max:", maxPrice, "avg:", avgPrice)

          setPriceStats({ min: minPrice, max: maxPrice, avg: Math.round(avgPrice) })
          setPriceRange([minPrice, maxPrice])
        }
      }
    } catch (error) {
      console.error("[v0] Error in fetchData:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to load products"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Fixed filtering logic
  useEffect(() => {
    console.log("[v0] Filtering products with price range:", priceRange)
    let filtered = [...products]

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.name.toLowerCase().includes(query) ||
          (product.tags && product.tags.toLowerCase().includes(query)),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category.slug === selectedCategory)
    }

    // Filter by brands/tags
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => {
        if (!product.tags) return false
        const productTags = product.tags.split(",").map((tag) => tag.trim())
        return selectedBrands.some((brand) => productTags.includes(brand))
      })
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) => {
        const productColors = product.variants.flatMap((v) => v.colors.map((c) => c.hexCode))
        return selectedColors.some((color) => productColors.includes(color))
      })
    }

    // Fixed price filtering - apply discount before checking range
    filtered = filtered.filter((product) => {
      const productPrices = product.variants.map((variant) => {
        let price = variant.price
        // Apply discount if present
        if (product.discount && product.discount > 0) {
          price = Math.round(price * (1 - product.discount / 100))
        }
        return price
      })

      const minPrice = Math.min(...productPrices)
      const maxPrice = Math.max(...productPrices)

      // Check if product's price range overlaps with selected range
      const isInRange = minPrice <= priceRange[1] && maxPrice >= priceRange[0]

      console.log(
        `[v0] Product ${product.name}: prices ${minPrice}-${maxPrice}, range ${priceRange[0]}-${priceRange[1]}, included: ${isInRange}`,
      )

      return isInRange
    })

    // Filter by stock availability
    if (stockFilter !== "all") {
      filtered = filtered.filter((product) => {
        const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0)
        return stockFilter === "in-stock" ? totalStock > 0 : totalStock === 0
      })
    }

    // Filter by discount
    if (discountFilter) {
      filtered = filtered.filter((product) => product.discount && product.discount > 0)
    }

    // Filter by featured
    if (featuredFilter) {
      filtered = filtered.filter((product) => product.featured)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          const aMinPrice = getProductPrice(a)
          const bMinPrice = getProductPrice(b)
          return aMinPrice - bMinPrice
        case "price-high":
          const aMaxPrice = getProductPrice(a)
          const bMaxPrice = getProductPrice(b)
          return bMaxPrice - aMaxPrice
        case "featured":
          return Number(b.featured) - Number(a.featured)
        case "discount":
          return (b.discount || 0) - (a.discount || 0)
        case "stock":
          const aStock = a.variants.reduce((sum, v) => sum + v.stock, 0)
          const bStock = b.variants.reduce((sum, v) => sum + v.stock, 0)
          return bStock - aStock
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    console.log("[v0] Filtered products count:", filtered.length)
    setFilteredProducts(filtered)
  }, [
    products,
    selectedCategory,
    selectedBrands,
    selectedColors,
    priceRange,
    searchQuery,
    stockFilter,
    discountFilter,
    featuredFilter,
    sortBy,
  ])

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const clearAllFilters = () => {
    setSelectedCategory("all")
    setSelectedBrands([])
    setSelectedColors([])
    setPriceRange([priceStats.min, priceStats.max])
    setSearchQuery("")
    setStockFilter("all")
    setDiscountFilter(false)
    setFeaturedFilter(false)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (selectedCategory !== "all") count++
    if (selectedBrands.length > 0) count++
    if (selectedColors.length > 0) count++
    if (priceRange[0] !== priceStats.min || priceRange[1] !== priceStats.max) count++
    if (searchQuery.trim()) count++
    if (stockFilter !== "all") count++
    if (discountFilter) count++
    if (featuredFilter) count++
    return count
  }

  // Fixed price calculation function
  const getProductPrice = (product: Product) => {
    const prices = product.variants.map((variant) => {
      let price = variant.price
      // Apply discount if present
      if (product.discount && product.discount > 0) {
        price = Math.round(price * (1 - product.discount / 100))
      }
      return price
    })
    return Math.min(...prices)
  }

  const getProductOriginalPrice = (product: Product) => {
    if (!product.discount) return null
    const prices = product.variants.map((v) => v.price)
    return Math.min(...prices)
  }

  const getProductImage = (product: Product) => {
    const firstVariant = product.variants[0]
    const firstColor = firstVariant?.colors[0]
    const firstImage = firstColor?.images[0]
    return firstImage?.url || "/placeholder.svg"
  }

  const getProductStock = (product: Product) => {
    return product.variants.reduce((total, variant) => total + variant.stock, 0)
  }

  const getProductFeatures = (product: Product) => {
    return product.tags ? product.tags.split(",").map((tag) => tag.trim()) : []
  }

  const allCategories = [
    { id: "all", name: "All Products", count: products.length },
    ...categories.map((cat) => ({
      id: cat.slug,
      name: cat.name,
      count: cat._count.products,
    })),
  ]

  // Fixed slider value change handler
  const handlePriceRangeChange = (newValues: number[]) => {
    console.log("[v0] Price range changed to:", newValues)
    setPriceRange([newValues[0], newValues[1]])
  }

  // Fixed input change handlers
  const handleMinPriceChange = (value: number) => {
    const clampedValue = Math.max(priceStats.min, Math.min(value, priceRange[1]))
    setPriceRange([clampedValue, priceRange[1]])
  }

  const handleMaxPriceChange = (value: number) => {
    const clampedValue = Math.min(priceStats.max, Math.max(value, priceRange[0]))
    setPriceRange([priceRange[0], clampedValue])
  }

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

  if (loading) {
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

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <ErrorRetry error={error} onRetry={fetchData} loading={loading} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Clean Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Grid3X3 className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <DollarSign className="w-4 h-4" />
                  Price: Rs. {priceRange[0].toLocaleString()} - Rs. {priceRange[1].toLocaleString()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Price Range</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    max={priceStats.max}
                    min={priceStats.min}
                    step={Math.max(1, Math.floor((priceStats.max - priceStats.min) / 100))}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Rs. {priceRange[0].toLocaleString()}</span>
                    <span>Rs. {priceRange[1].toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Min</label>
                      <Input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                        className="h-8"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Max</label>
                      <Input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                        className="h-8"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Advanced Filters Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Settings2 className="w-4 h-4" />
                  More Filters
                  {selectedColors.length + selectedBrands.length + (discountFilter ? 1 : 0) + (featuredFilter ? 1 : 0) >
                    0 && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedColors.length +
                        selectedBrands.length +
                        (discountFilter ? 1 : 0) +
                        (featuredFilter ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Advanced Filters</DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Colors */}
                  {availableColors.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Colors ({selectedColors.length})
                      </h4>
                      <div className="grid grid-cols-6 gap-2">
                        {availableColors.map((color) => (
                          <div key={color.hexCode} className="flex flex-col items-center gap-1">
                            <button
                              onClick={() => {
                                setSelectedColors((prev) =>
                                  prev.includes(color.hexCode)
                                    ? prev.filter((c) => c !== color.hexCode)
                                    : [...prev, color.hexCode],
                                )
                              }}
                              className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                                selectedColors.includes(color.hexCode)
                                  ? "border-primary ring-2 ring-primary/20"
                                  : "border-muted-foreground/20"
                              }`}
                              style={{ backgroundColor: color.hexCode }}
                              title={color.name}
                            />
                            <span className="text-xs text-muted-foreground">{color.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Brands */}
                  {availableBrands.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Brands ({selectedBrands.length})
                      </h4>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {availableBrands.map((brand) => (
                          <div key={brand} className="flex items-center space-x-2">
                            <Checkbox
                              id={`brand-${brand}`}
                              checked={selectedBrands.includes(brand)}
                              onCheckedChange={(checked) => {
                                const isChecked = checked === true
                                setSelectedBrands((prev) =>
                                  isChecked ? [...prev, brand] : prev.filter((b) => b !== brand),
                                )
                              }}
                            />
                            <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stock Status */}
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Availability
                    </h4>
                    <div className="space-y-2">
                      {[
                        { value: "all", label: "All Products" },
                        { value: "in-stock", label: "In Stock" },
                        { value: "out-of-stock", label: "Out of Stock" },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`stock-${option.value}`}
                            name="stock"
                            value={option.value}
                            checked={stockFilter === option.value}
                            onChange={(e) => setStockFilter(e.target.value as any)}
                            className="text-primary"
                          />
                          <label htmlFor={`stock-${option.value}`} className="text-sm cursor-pointer">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Offers */}
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Percent className="w-4 h-4" />
                      Special Offers
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="discount-filter"
                          checked={discountFilter}
                          onCheckedChange={(checked) => setDiscountFilter(checked === true)}
                        />
                        <label htmlFor="discount-filter" className="text-sm cursor-pointer">
                          On Sale
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="featured-filter"
                          checked={featuredFilter}
                          onCheckedChange={(checked) => setFeaturedFilter(checked === true)}
                        />
                        <label htmlFor="featured-filter" className="text-sm cursor-pointer">
                          Featured Products
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Clear All Filters */}
            {getActiveFiltersCount() > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="gap-2">
                <X className="w-4 h-4" />
                Clear All ({getActiveFiltersCount()})
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {allCategories.find((c) => c.id === selectedCategory)?.name}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                </Badge>
              )}
              {selectedColors.map((color) => (
                <Badge key={color} variant="secondary" className="gap-1">
                  <div className="w-3 h-3 rounded-full border" style={{ backgroundColor: color }} />
                  Color
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setSelectedColors((prev) => prev.filter((c) => c !== color))}
                  />
                </Badge>
              ))}
              {selectedBrands.map((brand) => (
                <Badge key={brand} variant="secondary" className="gap-1">
                  {brand}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => setSelectedBrands((prev) => prev.filter((b) => b !== brand))}
                  />
                </Badge>
              ))}
              {discountFilter && (
                <Badge variant="secondary" className="gap-1">
                  On Sale
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setDiscountFilter(false)} />
                </Badge>
              )}
              {featuredFilter && (
                <Badge variant="secondary" className="gap-1">
                  Featured
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFeaturedFilter(false)} />
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results and Sorting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="featured">Featured First</SelectItem>
                <SelectItem value="discount">Highest Discount</SelectItem>
                <SelectItem value="stock">Most Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const price = getProductPrice(product)
            const originalPrice = getProductOriginalPrice(product)
            const image = getProductImage(product)
            const stock = getProductStock(product)
            const features = getProductFeatures(product)
            const inStock = stock > 0
            const allColors = product.variants.flatMap((variant) => variant.colors)

            return (
              <Card
                key={product.id}
                className={`group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-card to-card/50 backdrop-blur-sm ${!inStock ? "opacity-75" : ""} overflow-hidden`}
              >
                {viewMode === "grid" ? (
                  <>
                    <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted rounded-t-xl overflow-hidden relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Badges */}
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

                      {!inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="secondary" className="text-lg px-4 py-2">
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-3 pt-4">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </CardTitle>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs font-medium">
                          {product.category.name}
                        </Badge>
                        <ColorCircles colors={allColors} showAll={false} />
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs px-2 py-1 bg-primary/70">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Price and Action */}
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xl font-bold text-primary">Rs. {price.toLocaleString()}</div>
                          {originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              Rs. {originalPrice.toLocaleString()}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">{stock} in stock</div>
                        </div>
                        <Link href={`/products/${product.slug}`}>
                          <Button size="sm" disabled={!inStock} className="shadow-md hover:shadow-lg transition-shadow">
                            {inStock ? "View Details" : "Out of Stock"}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <div className="flex gap-6 p-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-muted/50 to-muted rounded-xl overflow-hidden flex-shrink-0 relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.discount && (
                        <Badge className="absolute top-2 left-2 text-xs bg-red-500 hover:bg-red-600 text-white">
                          {product.discount}%
                        </Badge>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0 mr-4">
                          <h3 className="font-bold text-xl mb-1 group-hover:text-primary transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {product.category.name}
                            </Badge>
                            {product.featured && (
                              <Badge className="text-xs bg-amber-500 hover:bg-amber-600 text-white">
                                <Star className="w-3 h-3 mr-1" />
                                  Featured
                                  
                              </Badge>
                            )}
                            <ColorCircles colors={allColors} showAll={true} />
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xl font-bold text-primary">Rs. {price.toLocaleString()}</div>
                          {originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              Rs. {originalPrice.toLocaleString()}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">{stock} in stock</div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-1">
                          {features.slice(0, 4).map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs px-2 py-1 bg-muted text-muted-foreground ">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/products/${product.slug}`}>
                            <Button
                              size="sm"
                              disabled={!inStock}
                              className="shadow-md hover:shadow-lg transition-shadow"
                            >
                              {inStock ? "View Details" : "Out of Stock"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              {getActiveFiltersCount() > 0
                ? "Try adjusting your filters to see more results."
                : "No products match your search criteria."}
            </p>
            <Button onClick={clearAllFilters} className="shadow-md hover:shadow-lg transition-shadow">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {showFiltersModal && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="fixed bottom-0 left-0 right-0 bg-background rounded-t-lg max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Quick Filters</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowFiltersModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4 space-y-4">
              {/* Quick Category Selection */}
              <div>
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {allCategories.slice(0, 6).map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(selectedCategory === category.id ? "" : category.id)
                        setShowFiltersModal(false)
                      }}
                      className="justify-start"
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quick Price Filters */}
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={priceRange[0] === 0 && priceRange[1] === 50 ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setPriceRange([0, 50])
                      setShowFiltersModal(false)
                    }}
                  >
                    Under $50
                  </Button>
                  <Button
                    variant={priceRange[0] === 50 && priceRange[1] === 200 ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setPriceRange([50, 200])
                      setShowFiltersModal(false)
                    }}
                  >
                    $50 - $200
                  </Button>
                </div>
              </div>

              {/* Quick Toggles */}
              <div className="space-y-2">
                <Button
                  variant={inStockOnly ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setInStockOnly(!inStockOnly)
                    setShowFiltersModal(false)
                  }}
                >
                  <Package className="w-4 h-4 mr-2" />
                  In Stock Only
                </Button>
                <Button
                  variant={onSaleOnly ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setOnSaleOnly(!onSaleOnly)
                    setShowFiltersModal(false)
                  }}
                >
                  <Tag className="w-4 h-4 mr-2" />
                  On Sale
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}






