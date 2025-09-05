"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

interface CaseStudy {
  id: string
  title: string
  slug: string
  category: string
  client: string
  location: string
  description: string
  imageUrl: string
  duration: string
  area: string
  products: string
  featured: boolean
  createdAt: string
}

interface ApiResponse {
  caseStudies: CaseStudy[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
}

export function ProjectsGrid() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0,
    hasMore: false,
  })
  const [loading, setLoading] = useState(true)

  const categories = ["All", "Commercial", "Industrial", "Residential"]

  const fetchCaseStudies = async (category = "All", page = 1, append = false) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "6",
      })

      if (category !== "All") {
        params.append("category", category)
      }

      const response = await fetch(`/api/case-studies?${params}`)
      if (!response.ok) throw new Error("Failed to fetch case studies")

      const data: ApiResponse = await response.json()

      if (append) {
        setCaseStudies((prev) => [...prev, ...data.caseStudies])
      } else {
        setCaseStudies(data.caseStudies)
      }

      setPagination(data.pagination)
    } catch (error) {
      console.error("Error fetching case studies:", error)
      setCaseStudies([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCaseStudies(activeCategory, 1, false)
    setCurrentPage(1)
  }, [activeCategory])

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category)
  }

  const handleLoadMore = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchCaseStudies(activeCategory, nextPage, true)
  }

  if (loading && caseStudies.length === 0) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading projects...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance"
          >
            Featured Projects Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty"
          >
            Explore our diverse range of successful paint projects across Pakistan
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => {
            const products = JSON.parse(caseStudy.products || "[]")

            return (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={caseStudy.imageUrl || "/placeholder.svg"}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {caseStudy.category}
                    </Badge>
                    <div className="text-xs text-muted-foreground">{caseStudy.area}</div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-red-600 transition-colors">
                    {caseStudy.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 text-pretty">{caseStudy.description}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {caseStudy.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {caseStudy.duration}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {products.slice(0, 3).map((product: any, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {product.name} {product.quantity && `(${product.quantity})`}
                      </Badge>
                    ))}

                  </div>

                  <Link href={`/case-studies/${caseStudy.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-red-600 group-hover:text-white transition-colors bg-transparent hover:bg-red-600 hover:text-white"
                    >
                      View Case Study
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Load More Button */}
        {pagination.hasMore && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={handleLoadMore}
              disabled={loading}
              className="hover:bg-red-600 hover:text-white border-red-600 text-red-600 bg-transparent"
            >
              {loading ? "Loading..." : `Load More Projects (${pagination.total - caseStudies.length} remaining)`}
            </Button>
          </div>
        )}

        {/* No projects message */}
        {caseStudies.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
