"use client"

import { motion } from "framer-motion"
import { Paintbrush, Truck, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Paintbrush,
    title: "Paints Collection",
    description: "Any paints for your desire",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on order",
  },
  {
    icon: RefreshCw,
    title: "100% Money Back",
    description: "If the item damaged suit you",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 ">
      <div className="container mx-auto  px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-18 gap-8   mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-4 text-center md:text-left"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
