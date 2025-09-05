"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Building, Users } from "lucide-react"

export function ProjectsHero() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Award className="mr-2 h-4 w-4" />
                Award-Winning Projects
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Transforming Spaces with <span className="text-primary">Professional Excellence</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl text-pretty">
                Explore our portfolio of successful paint projects across Pakistan. From commercial complexes to
                industrial facilities, see how we deliver exceptional results that exceed expectations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Request Quote
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Completed Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Major Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">25+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
              <img
                src="/professional-paint-project-showcase-with-modern-bu.jpg"
                alt="Professional Paint Projects Showcase"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Floating stats */}
            <div className="absolute -bottom-4 -left-4 bg-card border rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium">Latest Project</div>
                  <div className="text-xs text-muted-foreground">Completed Dec 2024</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground rounded-full p-4 shadow-lg">
              <Users className="h-6 w-6" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
