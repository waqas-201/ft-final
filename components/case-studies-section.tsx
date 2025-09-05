"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, TrendingUp, Users } from "lucide-react"

export function CaseStudiesSection() {
  const caseStudies = [
    {
      id: 1,
      title: "Transforming Pakistan's Largest Shopping Mall",
      client: "Metro Mall Karachi",
      challenge: "Complete renovation of 200,000 sq ft shopping complex with minimal disruption to operations",
      solution: "Phased painting approach using quick-dry, low-odor paints during off-hours",
      results: [
        "Zero operational downtime",
        "30% increase in foot traffic",
        "Enhanced brand image",
        "15-year warranty coverage",
      ],
      image: "/modern-commercial-building-with-professional-paint.jpg",
      category: "Commercial Success",
      timeline: "6 months",
      investment: "PKR 5M+",
    },
    {
      id: 2,
      title: "Industrial Coating Innovation for Steel Mills",
      client: "Pakistan Steel Mills",
      challenge: "Extreme heat and corrosion resistance for steel manufacturing equipment",
      solution: "Custom-formulated high-temperature resistant coating system with nanotechnology",
      results: [
        "50% longer equipment life",
        "Reduced maintenance costs by 40%",
        "Improved safety standards",
        "Environmental compliance achieved",
      ],
      image: "/industrial-factory-with-protective-coating-systems.jpg",
      category: "Industrial Innovation",
      timeline: "12 months",
      investment: "PKR 15M+",
    },
    {
      id: 3,
      title: "Luxury Housing Society Transformation",
      client: "DHA Lahore Phase 8",
      challenge: "Standardizing paint quality across 500+ luxury homes while maintaining individual aesthetics",
      solution: "Premium paint system with extensive color palette and quality assurance program",
      results: [
        "100% customer satisfaction",
        "25% property value increase",
        "Award-winning community design",
        "Long-term maintenance partnership",
      ],
      image: "/beautiful-residential-home-with-modern-paint-color.jpg",
      category: "Residential Excellence",
      timeline: "18 months",
      investment: "PKR 25M+",
    },
  ]

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance"
          >
            Success Stories & Case Studies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty"
          >
            Real challenges, innovative solutions, and measurable results from our most impactful projects
          </motion.p>
        </div>

        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-card rounded-2xl overflow-hidden shadow-sm border"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-square overflow-hidden">
                  <img
                    src={study.image || "/placeholder.svg"}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <Badge variant="secondary" className="text-sm">
                      {study.category}
                    </Badge>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {study.client}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {study.investment}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4 text-balance">{study.title}</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Challenge</h4>
                      <p className="text-muted-foreground text-pretty">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Solution</h4>
                      <p className="text-muted-foreground text-pretty">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Results Achieved</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {study.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t">
                    <div className="text-sm text-muted-foreground">
                      Timeline: <span className="font-medium text-foreground">{study.timeline}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Read Full Case Study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-primary/5 rounded-2xl p-8 lg:p-12"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Create Your Success Story?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
              Let's discuss how our expertise can transform your next project into a showcase of excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Download Case Studies
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
