"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { apiClient } from "./api-client"

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  color: string
  size: string
  image: string
}

export interface Order {
  id: string
  items: OrderItem[]
  shipping: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    notes?: string
  }
  payment: {
    method: "cod" | "card" | "bank"
    cardNumber?: string
    expiryDate?: string
    cvv?: string
    cardName?: string
    bankAccount?: string
  }
  subtotal: number
  promoDiscount: number
  deliveryFee: number
  total: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "returned"
  trackingNumber?: string
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
  notes?: string
}

interface OrderContextType {
  orders: Order[]
  loading: boolean
  error: string | null
  getOrder: (id: string) => Order | undefined
  updateOrderStatus: (id: string, status: Order["status"]) => void
  cancelOrder: (id: string) => void
  addTrackingNumber: (id: string, trackingNumber: string) => void
  refreshOrders: () => void
}

const OrderContext = createContext<OrderContextType | null>(null)

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("[v0] Loading orders with retry mechanism")

      const response = await apiClient.get("/api/orders", {
        maxRetries: 2,
        timeout: 15000,
      })

      const data = await response.json()
      setOrders(data.orders || [])
      console.log("[v0] Orders loaded successfully:", data.orders?.length || 0)
    } catch (error) {
      console.error("[v0] Failed to load orders:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to load orders"
      setError(errorMessage)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (id: string, status: Order["status"]) => {
    try {
      setError(null)
      console.log("[v0] Updating order status with retry mechanism")

      const response = await apiClient.put(
        `/api/orders/${id}`,
        { status },
        {
          maxRetries: 2,
          timeout: 10000,
        },
      )

      const updatedOrder = await response.json()
      setOrders(orders.map((order) => (order.id === id ? updatedOrder : order)))
      console.log("[v0] Order status updated successfully")
    } catch (error) {
      console.error("[v0] Error updating order status:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to update order status"
      setError(errorMessage)
      throw error
    }
  }

  const cancelOrder = (id: string) => {
    updateOrderStatus(id, "cancelled")
  }

  const addTrackingNumber = async (id: string, trackingNumber: string) => {
    try {
      setError(null)
      console.log("[v0] Adding tracking number with retry mechanism")

      const response = await apiClient.put(
        `/api/orders/${id}/tracking`,
        { trackingNumber },
        {
          maxRetries: 2,
          timeout: 10000,
        },
      )

      const updatedOrder = await response.json()
      setOrders(orders.map((order) => (order.id === id ? updatedOrder : order)))
      console.log("[v0] Tracking number added successfully")
    } catch (error) {
      console.error("[v0] Error adding tracking number:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to add tracking number"
      setError(errorMessage)
      throw error
    }
  }

  const refreshOrders = () => {
    loadOrders()
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const getOrder = (id: string) => {
    return orders.find((order) => order.id === id)
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        getOrder,
        updateOrderStatus,
        cancelOrder,
        addTrackingNumber,
        refreshOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
