"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, ShoppingCart, Users, TrendingUp, Eye, Edit, Trash2, RefreshCw } from "lucide-react"
import { AddProductModal } from "@/components/admin/add-product-modal"
import { ErrorRetry } from "@/components/ui/error-retry"
import { Skeleton } from "@/components/ui/skeleton"
import { apiClient } from "@/lib/api-client"
import Link from "next/link"

interface Product {
  id: string
  name: string
  slug: string
  category: { name: string }
  variants: Array<{
    price: number
    stock: number
  }>
  featured: boolean
  createdAt: string
}

interface Order {
  id: string
  customerName: string
  total: number
  status: string
  createdAt: string
  phone: string
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
  })

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log("[v0] Fetching dashboard data with retry mechanism")

      // Fetch products
      const productsRes = await apiClient.get("/api/products?limit=10", {
        maxRetries: 2,
        timeout: 15000,
      })
      const productsData = await productsRes.json()
      setProducts(productsData.products || [])

      // Fetch orders
      const ordersRes = await apiClient.get("/api/orders?limit=10", {
        maxRetries: 2,
        timeout: 15000,
      })
      const ordersData = await ordersRes.json()
      setOrders(ordersData.orders || [])

      // Calculate stats
      const totalProducts = productsData.pagination?.total || 0
      const totalOrders = ordersData.pagination?.total || 0
      const pendingOrders =
        ordersData.orders?.filter((order: Order) => ["pending", "confirmed"].includes(order.status)).length || 0
      const totalRevenue = ordersData.orders?.reduce((sum: number, order: Order) => sum + order.total, 0) || 0

      setStats({
        totalProducts,
        totalOrders,
        pendingOrders,
        totalRevenue,
      })

      console.log("[v0] Dashboard data loaded successfully")
    } catch (error) {
      console.error("[v0] Error fetching dashboard data:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to load dashboard data"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await apiClient.delete(`/api/products/${productId}`, {
        maxRetries: 1,
        timeout: 10000,
      })

      setProducts(products.filter((p) => p.id !== productId))
    } catch (error) {
      console.error("[v0] Error deleting product:", error)
      alert("Error deleting product")
    }
  }

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await apiClient.put(
        `/api/orders/${orderId}`,
        { status: newStatus },
        {
          maxRetries: 1,
          timeout: 10000,
        },
      )

      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    } catch (error) {
      console.error("[v0] Error updating order:", error)
      alert("Error updating order")
    }
  }

  const formatPrice = (price: number) => `Rs. ${price.toLocaleString()}`

  const refreshDashboardData = async () => {
    await fetchDashboardData()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs Skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <Skeleton className="h-5 w-48 mb-2" />
                        <Skeleton className="h-4 w-64 mb-1" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
            <ErrorRetry error={error} onRetry={fetchDashboardData} loading={loading} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">🏪 Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your paint store inventory and orders</p>
          </div>
          <AddProductModal onProductAdded={refreshDashboardData} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">📦 Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">Items in inventory</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">🛒 Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">Customer orders</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">⏳ Pending Orders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">💰 Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">All-time earnings</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products" className="flex items-center gap-2">
              📦 Products ({stats.totalProducts})
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              🛒 Orders ({stats.totalOrders})
            </TabsTrigger>
          </TabsList>

          {/* Products Management */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">📦 Products Management</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manage your paint inventory, prices, and stock levels
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <AddProductModal onProductAdded={refreshDashboardData} />
                    <Button variant="outline" size="sm" onClick={refreshDashboardData}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No products yet</h3>
                    <p className="text-muted-foreground mb-4">Start by adding your first paint product</p>
                    <AddProductModal onProductAdded={refreshDashboardData} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{product.name}</h3>
                            {product.featured && <Badge variant="secondary">⭐ Featured</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            📂 {product.category.name} • 💰 {formatPrice(product.variants[0]?.price || 0)} • 📦 Stock:{" "}
                            {product.variants.reduce((sum, v) => sum + v.stock, 0)} units
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Added {new Date(product.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/products/${product.slug}`}>
                            <Button variant="outline" size="sm" title="View product page">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/products/${product.slug}/edit`}>
                            <Button variant="outline" size="sm" title="Edit product">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Management */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">🛒 Orders Management</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Track and manage customer orders and deliveries
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={refreshDashboardData}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground">Orders will appear here when customers make purchases</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">Order #{order.id}</h3>
                            <Badge
                              variant={
                                order.status === "delivered"
                                  ? "default"
                                  : order.status === "cancelled"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {order.status === "pending" && "⏳"}
                              {order.status === "confirmed" && "✅"}
                              {order.status === "processing" && "🔄"}
                              {order.status === "shipped" && "🚚"}
                              {order.status === "delivered" && "📦"}
                              {order.status === "cancelled" && "❌"}
                              {" " + order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            👤 {order.customerName} • 📞 {order.phone} • 💰 {formatPrice(order.total)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            📅 {new Date(order.createdAt).toLocaleDateString()} at{" "}
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            className="text-sm border rounded px-3 py-2 bg-background"
                            title="Update order status"
                          >
                            <option value="pending">⏳ Pending</option>
                            <option value="confirmed">✅ Confirmed</option>
                            <option value="processing">🔄 Processing</option>
                            <option value="shipped">🚚 Shipped</option>
                            <option value="delivered">📦 Delivered</option>
                            <option value="cancelled">❌ Cancelled</option>
                          </select>
                          <Link href={`/orders/${order.id}`}>
                            <Button variant="outline" size="sm" title="View order details">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
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
  )
}
