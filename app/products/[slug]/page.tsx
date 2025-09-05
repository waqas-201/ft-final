"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, Share2, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "@/lib/cart-context"

type Product = {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  category: string
  brand: string
  sku: string
  inStock: boolean
  stockCount: number
  colors: { name: string; code: string; available: boolean }[]
  sizes: { size: string; price: number; inStock: boolean }[]
  images: string[]
  features: string[]
  specifications: Record<string, string>
  reviews: { id: number; name: string; rating: number; date: string; comment: string }[]
}

export default function ProductDetailPage() {
  const params = useParams()
  console.log(params)

  const { addItem, openCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState<Product["colors"][0] | null>(null)
  const [selectedSize, setSelectedSize] = useState<Product["sizes"][0] | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    if (!params?.slug) return

    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/products/${params?.slug}`)
        if (!res.ok) throw new Error("Failed to fetch product")
        const raw = await res.json()

        // 🔥 Transform API response -> Frontend Product type
        const transformed: Product = {
          id: raw.id,
          name: raw.name,
          description: raw.description,
          longDescription: raw.description,
          price: Math.min(...raw.variants.map((v: any) => v.price)),
          originalPrice: raw.discount
            ? Math.round(Math.min(...raw.variants.map((v: any) => v.price)) / (1 - raw.discount / 100))
            : undefined,
          discount: raw.discount ?? undefined,
          rating: 4.5, // TODO: replace with real ratings
          reviewCount: 2, // TODO: replace with actual count
          category: raw.category?.name ?? "Uncategorized",
          brand: "Generic", // TODO: replace with real brand
          sku: raw.variants[0]?.sku ?? raw.id,
          inStock: raw.variants.some((v: any) => v.stock > 0),
          stockCount: raw.variants.reduce((sum: number, v: any) => sum + v.stock, 0),
          colors: raw.variants.flatMap((variant: any) =>
            variant.colors.map((c: any) => ({
              name: c.name,
              code: c.hexCode,
              available: variant.stock > 0,
            })),
          ),
          sizes: raw.variants.map((v: any) => ({
            size: v.name,
            price: v.price,
            inStock: v.stock > 0,
          })),
          images: raw.variants.flatMap((v: any) =>
            v.colors.flatMap((c: any) => (c.images ? c.images.map((img: any) => img.url) : [])),
          ),
          features: raw.tags ? raw.tags.split(",").map((t: string) => t.trim()) : [],
          specifications: {
            Category: raw.category?.name ?? "N/A",
            Parent: raw.category?.parent?.name ?? "N/A",
            Created: new Date(raw.createdAt).toDateString(),
          },
          reviews: [
            { id: 1, name: "Ali", rating: 5, date: "2025-09-01", comment: "Great quality paint!" },
            { id: 2, name: "Sara", rating: 4, date: "2025-09-02", comment: "Covers walls beautifully." },
          ],
        }

        setProduct(transformed)
        setSelectedColor(transformed.colors[0])
        setSelectedSize(transformed.sizes[0])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params?.slug])

  const handleQuantityChange = (change: number) => {
    if (!product) return
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) return

    const cartItem = {
      id: product.id,
      name: product.name,
      price: selectedSize.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.images[0],
      color: selectedColor.name,
      size: selectedSize.size,
      maxQuantity: product.stockCount,
      quantity,
    }

    addItem(cartItem)
    openCart()
  }

  if (loading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    )

  if (!product)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">No product found</p>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto py-12 px-4">
        {/* Hero Section - Centered Product Showcase */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left - Enhanced Image Gallery */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative group">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted shadow-2xl">
                  <img
                    src={product.images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.discount && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="destructive" className="text-sm font-bold px-3 py-1 shadow-lg">
                        -{product.discount}% OFF
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex justify-center">
                <div className="flex gap-3 p-2 bg-muted/30 rounded-xl backdrop-blur-sm">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === i
                          ? "border-primary shadow-lg scale-110"
                          : "border-transparent hover:border-muted-foreground/50 hover:scale-105"
                        }`}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`View ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Product Details */}
            <div className="lg:col-span-5 space-y-8">
              {/* Product Header */}
              <div className="text-center lg:text-left space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl lg:text-5xl font-bold text-balance leading-tight">{product.name}</h1>
                  <p className="text-lg text-muted-foreground text-pretty">{product.description}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="text-center lg:text-left">
                <div className="flex items-baseline justify-center lg:justify-start gap-3 mb-2">
                  <span className="text-4xl font-bold text-primary">Rs.{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">Rs.{product.originalPrice}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{product.stockCount} items in stock</p>
              </div>

              {/* Selection Options */}
              <div className="space-y-6">
                {/* Colors */}
                {product.colors.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Choose Color</h3>
                    <div className="flex justify-center lg:justify-start gap-3">
                      {product.colors.map((color, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(color)}
                          className={`relative w-12 h-12 rounded-full border-4 transition-all duration-300 ${selectedColor?.name === color.name
                              ? "border-primary shadow-lg scale-110"
                              : "border-muted hover:border-muted-foreground hover:scale-105"
                            }`}
                          style={{ backgroundColor: color.code }}
                          title={color.name}
                        >
                          {selectedColor?.name === color.name && (
                            <div className="absolute inset-0 rounded-full border-2 border-background"></div>
                          )}
                        </button>
                      ))}
                    </div>
                    {selectedColor && (
                      <p className="text-sm text-muted-foreground text-center lg:text-left">
                        Selected: {selectedColor.name}
                      </p>
                    )}
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Select Size</h3>
                    <div className="flex justify-center lg:justify-start">
                      <Select
                        onValueChange={(value) => setSelectedSize(product.sizes.find((s) => s.size === value) || null)}
                      >
                        <SelectTrigger className="w-48 h-12">
                          <SelectValue placeholder="Choose size" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.sizes.map((size, i) => (
                            <SelectItem key={i} value={size.size} className="text-base">
                              {size.size} - Rs.{size.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Quantity</h3>
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <div className="flex items-center bg-muted rounded-xl p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity === 1}
                        className="h-10 w-10 rounded-lg"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-16 text-center text-lg font-semibold">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity === product.stockCount}
                        className="h-10 w-10 rounded-lg"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  Add to Cart - Rs.{selectedSize?.price || product.price}
                </Button>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-xl bg-transparent"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                    Wishlist
                  </Button>
                  <Button variant="outline" className="flex-1 h-12 rounded-xl bg-transparent">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-1 gap-4 p-6 bg-muted/30 rounded-xl backdrop-blur-sm">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-sm font-medium">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>Free Shipping Worldwide</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-sm font-medium">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  <span>30-Day Easy Returns</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-sm font-medium">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>2-Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <Tabs defaultValue="description" className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-3 h-12 rounded-xl">
                <TabsTrigger value="description" className="text-base font-medium">
                  Description
                </TabsTrigger>
                <TabsTrigger value="specs" className="text-base font-medium">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="reviews" className="text-base font-medium">
                  Reviews
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="description" className="mt-8">
              <Card className="border-0 shadow-xl rounded-2xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Product Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg leading-relaxed text-center text-muted-foreground">{product.longDescription}</p>
                  {product.features.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-xl font-semibold text-center">Key Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {product.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs" className="mt-8">
              <Card className="border-0 shadow-xl rounded-2xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value], i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                        <dt className="font-semibold text-muted-foreground">{key}</dt>
                        <dd className="font-medium">{value}</dd>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <Card className="border-0 shadow-xl rounded-2xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl">Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  {product.reviews.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-lg text-muted-foreground">No reviews yet</p>
                      <p className="text-sm text-muted-foreground mt-2">Be the first to review this product!</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {product.reviews.map((review) => (
                        <div key={review.id} className="p-6 bg-muted/30 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="font-semibold text-primary">{review.name[0]}</span>
                              </div>
                              <div>
                                <div className="font-semibold">{review.name}</div>
                                <div className="text-sm text-muted-foreground">{review.date}</div>
                              </div>
                            </div>
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : ""}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
