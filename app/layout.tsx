import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import { CartProvider } from "@/lib/cart-context"
import { OrderProvider } from "@/lib/order-context"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

export const metadata: Metadata = {
  title: "PaintStore Pakistan - Premium Paints & Painting Solutions",
  description:
    "Shop premium quality paints, primers, and painting accessories in Pakistan. Interior, exterior, and specialty paints with fast delivery.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <OrderProvider>
              <CartProvider>
                <Header />
                <SmoothScrollProvider>
                  <Suspense fallback={null}>{children}</Suspense>
                </SmoothScrollProvider>
                <Footer />
              </CartProvider>
            </OrderProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
