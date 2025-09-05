"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Sparkles, Sun, Thermometer } from "lucide-react"

const colorCategories = [
  {
    name: "Premium Whites",
    colors: ["#FFFFFF", "#FEFEFE", "#F8F8FF", "#FFFAFA", "#F5F5F5"],
    description: "Pure, crisp whites for modern spaces",
  },
  {
    name: "Ocean Blues",
    colors: ["#0891b2", "#0284c7", "#0369a1", "#075985", "#0c4a6e"],
    description: "Calming blues inspired by nature",
  },
  {
    name: "Warm Neutrals",
    colors: ["#f3f4f6", "#e5e7eb", "#d1d5db", "#9ca3af", "#6b7280"],
    description: "Versatile grays for any environment",
  },
  {
    name: "Vibrant Accents",
    colors: ["#ec4899", "#f43f5e", "#ef4444", "#f97316", "#eab308"],
    description: "Bold colors for statement walls",
  },
]

const innovations = [
  {
    icon: Droplets,
    title: "Weather Shield Technology",
    description: "Advanced formula that resists rain, UV rays, and extreme temperatures for 15+ years.",
    badge: "New",
  },
  {
    icon: Sparkles,
    title: "Anti-Bacterial Coating",
    description: "Innovative paint with built-in antimicrobial properties for healthier indoor environments.",
    badge: "Popular",
  },
  {
    icon: Sun,
    title: "Solar Reflective Paint",
    description: "Energy-efficient paint that reflects heat, reducing cooling costs by up to 30%.",
    badge: "Eco-Friendly",
  },
  {
    icon: Thermometer,
    title: "Temperature Adaptive",
    description: "Smart paint that changes properties based on temperature for optimal performance.",
    badge: "Innovation",
  },
]

export function ColorInnovationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedCategory, setSelectedCategory] = useState(0)

  return (
    <section ref={ref} className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance mb-4">
            Color <span className="text-primary">Innovation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Discover our latest color collections and breakthrough paint technologies that set new standards in
            durability, sustainability, and aesthetic appeal.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Color Palette Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-8">Interactive Color Palette</h3>

            <div className="space-y-6">
              {colorCategories.map((category, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedCategory === index ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedCategory(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-foreground">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <div className="flex gap-2">
                      {category.colors.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-12 h-12 rounded-lg border-2 border-border shadow-sm transition-transform hover:scale-110"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button className="mt-8 w-full" size="lg">
              View Complete Color Guide
            </Button>
          </motion.div>

          {/* Paint Innovations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-8">Paint Innovations</h3>

            <div className="space-y-6">
              {innovations.map((innovation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <innovation.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-lg font-medium text-foreground">{innovation.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {innovation.badge}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-pretty">{innovation.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
