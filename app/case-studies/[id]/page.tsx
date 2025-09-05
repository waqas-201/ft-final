import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Calendar, Clock, User, Quote } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"


interface CaseStudy {
  id: string
  title: string
  slug: string
  category: string
  client: string
  location: string
  description: string
  challenge: string
  solution: string
  results: string
  imageUrl: string
  beforeImage?: string
  afterImage?: string
  duration: string
  area: string
  products: string
  testimonial?: string
  featured: boolean
  createdAt: string
}

async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/case-studies/${slug}`,
      {
        cache: "no-store",
      },
    )

    if (!response.ok) {
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching case study:", error)
    return null
  }
}

export default async function CaseStudyPage({ params }: { params: { id: string } }) {
  const caseStudy = await getCaseStudy(params.id)

  if (!caseStudy) {
    notFound()
  }

  const products = JSON.parse(caseStudy.products || "[]")
  const formattedDate = new Date(caseStudy.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/projects">
            <Button variant="outline" className="mb-8 hover:bg-red-600 hover:text-white bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative">
          <div className="aspect-[21/9] overflow-hidden">
            <img
              src={caseStudy.imageUrl || "/placeholder.svg"}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="max-w-4xl">
                <Badge className="mb-4 bg-red-600 text-white">{caseStudy.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">{caseStudy.title}</h1>
                <p className="text-xl text-white/90 text-pretty">{caseStudy.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Project Overview */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Project Overview</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed text-pretty">{caseStudy.description}</p>
                </div>

                {/* Challenges */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Challenges</h2>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{caseStudy.challenge}</p>
                </div>

                {/* Solution */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Our Solution</h2>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{caseStudy.solution}</p>
                </div>

                {/* Results */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Results & Impact</h2>
                  <p className="text-muted-foreground leading-relaxed text-pretty">{caseStudy.results}</p>
                </div>

                {/* Testimonial */}
                {caseStudy.testimonial && (
                  <div className="bg-red-50 dark:bg-red-950/20 p-8 rounded-lg border border-red-200 dark:border-red-800">
                    <Quote className="h-8 w-8 text-red-600 mb-4" />
                    <blockquote className="text-lg text-foreground mb-4 text-pretty">
                      "{caseStudy.testimonial}"
                    </blockquote>
                    <cite className="text-red-600 font-semibold">— {caseStudy.client}</cite>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project Info */}
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Project Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-red-600" />
                      <div>
                        <div className="text-sm text-muted-foreground">Client</div>
                        <div className="font-medium">{caseStudy.client}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div className="font-medium">{caseStudy.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-red-600" />
                      <div>
                        <div className="text-sm text-muted-foreground">Completion Date</div>
                        <div className="font-medium">{formattedDate}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-red-600" />
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-medium">{caseStudy.duration}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Technical Details</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Project Area</div>
                      <div className="font-medium">{caseStudy.area}</div>
                    </div>
                  </div>
                </div>

                {/* Products Used */}
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Products Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {products.map(
                      (product: { name: string; quantity?: string }, idx: number) => (
                        <Badge key={idx} variant="outline" className="border-red-200 text-red-700">
                          {product.name}
                          {product.quantity ? ` (${product.quantity})` : ""}
                        </Badge>
                      ),
                    )}

                  </div>
                </div>

                {/* CTA */}
                <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Interested in Similar Work?</h3>
                  <p className="text-sm text-muted-foreground mb-4">Contact us to discuss your project requirements.</p>
                  <Link href="/contact">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Get Quote</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
