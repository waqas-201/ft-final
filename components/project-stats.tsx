"use client"

import { motion } from "framer-motion"
import { Building2, Users, Award, Clock } from "lucide-react"

export function ProjectStats() {
  const stats = [
    {
      icon: Building2,
      value: "500+",
      label: "Projects Completed",
      description: "Across residential, commercial, and industrial sectors",
    },
    {
      icon: Users,
      value: "200+",
      label: "Satisfied Clients",
      description: "From small businesses to major corporations",
    },
    {
      icon: Award,
      value: "15+",
      label: "Industry Awards",
      description: "Recognition for excellence and innovation",
    },
    {
      icon: Clock,
      value: "25+",
      label: "Years Experience",
      description: "Delivering quality paint solutions since 1999",
    },
  ]

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
            Our Track Record of Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty"
          >
            Numbers that speak to our commitment to quality and customer satisfaction
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-foreground mb-2">{stat.label}</div>
              <div className="text-sm text-muted-foreground text-pretty">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
