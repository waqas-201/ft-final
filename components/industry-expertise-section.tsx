"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Building2, Factory, Home, Palette, Shield, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const expertiseAreas = [
  {
    icon: Building2,
    title: "Commercial Projects",
    description: "Large-scale commercial buildings, offices, and retail spaces with durable, professional finishes.",
    image: "/modern-commercial-building-with-professional-paint.jpg",
  },
  {
    icon: Factory,
    title: "Industrial Coatings",
    description: "Heavy-duty industrial paints for factories, warehouses, and manufacturing facilities.",
    image: "/industrial-factory-with-protective-coating-systems.jpg",
  },
  {
    icon: Home,
    title: "Residential Solutions",
    description: "Beautiful, long-lasting paints for homes, apartments, and residential complexes.",
    image: "/beautiful-residential-home-with-modern-paint-color.jpg",
  },
  {
    icon: Shield,
    title: "Protective Coatings",
    description: "Specialized protective coatings for harsh environments and extreme weather conditions.",
    image: "/protective-coating-application-on-metal-structure.jpg",
  },
  {
    icon: Palette,
    title: "Color Consultation",
    description: "Expert color matching and consultation services for perfect aesthetic results.",
    image: "/color-consultation-with-paint-swatches-and-samples.jpg",
  },
  {
    icon: Zap,
    title: "Quick Application",
    description: "Fast-drying, easy-application paints for time-sensitive projects and renovations.",
    image: "/professional-painter-applying-quick-dry-paint-effi.jpg",
  },
]

export function IndustryExpertiseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance mb-4">
            Industry <span className="text-primary">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            With over 25 years of experience, we deliver specialized paint solutions across diverse industries, ensuring
            quality, durability, and aesthetic excellence in every project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={area.image || "/placeholder.svg"}
                    alt={area.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <area.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{area.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-pretty">{area.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
