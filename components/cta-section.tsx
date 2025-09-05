"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function CTASection() {
  return (
    <section className="py-16 bg-muted/30 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Interested? Shop This Paints Collection!
          </h2>
          <p className="text-lg text-muted-foreground mb-8">See the best interior and exterior paints</p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold"
          >
            GO TO SHOP
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto"
        >
          <Image
            src="/cta-hero-image.png"
            alt="Paint collection display with various paint cans on blue sofa"
            width={1200}
            height={600}
            className="w-full h-auto rounded-lg shadow-2xl"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}
