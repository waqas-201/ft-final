"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Phone, Search, ShoppingCart, X } from "lucide-react"
import { SearchModal } from "./search-modal"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const handlePhoneClick = () => {
    window.open("tel:+923142313681", "_self")
  }

  return (
    <>
      <header className="sticky border top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Link href="/">
                  <span className="text-white font-bold text-lg">A</span>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link
                href="/products"
                className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1"
              >
                Shop
              </Link>
              <Link
                href="/projects"
                className="text-foreground hover:text-primary transition-colors font-medium flex items-center gap-1"
              >
                Projects
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact
              </Link>
              <Link href="/admin" className="text-foreground hover:text-primary transition-colors font-medium">
                Admin
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center">
              {/* Search + Cart + Theme Toggle */}
              <div className="flex items-center space-x-1 mr-4 border-r border-border pr-4">
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="hover:bg-accent">
                  <Search className="h-5 w-5" />
                </Button>

                {/* Theme Toggle */}
                <ThemeToggle />

                <div className="relative">
                  <Link href="/cart">
                    <Button variant="ghost" size="icon" className="hover:bg-accent">
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </Link>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                </div>
              </div>

              {/* Dealer + Call Buttons */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm font-medium border-primary text-primary hover:bg-primary hover:text-white transition-colors bg-transparent px-4"
                >
                  Become A Dealer
                </Button>

                <Button
                  variant="default"
                  size="sm"
                  className="text-sm font-medium bg-primary hover:bg-primary/90 text-white transition-colors flex items-center gap-2 px-4"
                  onClick={handlePhoneClick}
                >
                  <Phone className="h-4 w-4" />
                  Call
                </Button>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="hover:bg-accent">
                <Search className="h-5 w-5" />
              </Button>

              {/* Theme Toggle for mobile */}
              <ThemeToggle />

              <div className="relative">
                <Button variant="ghost" size="icon" className="hover:bg-accent">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hover:bg-accent"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t bg-background">
              <div className="px-4 py-4 space-y-4">
                <div className="space-y-2">
                  <Link
                    href="/"
                    className="block py-2 text-foreground hover:text-primary font-medium transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="block py-2 text-foreground hover:text-primary font-medium transition-colors"
                  >
                    Shop
                  </Link>
                  <Link
                    href="/projects"
                    className="block py-2 text-foreground hover:text-primary font-medium transition-colors"
                  >
                    Projects
                  </Link>
                  <Link
                    href="#about"
                    className="block py-2 text-foreground hover:text-primary font-medium transition-colors"
                  >
                    About
                  </Link>
                </div>

                <div className="pt-4 border-t space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                  >
                    Become A Dealer
                  </Button>
                  <Button
                    variant="default"
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={handlePhoneClick}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call: 0314-2313681
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
