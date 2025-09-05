"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function BestPaintsSection() {
  return (
    <section className="py-16 bg-background dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Best Paints</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover excellence with our best paints, designed to elevate every brushstroke.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Acrylic Filling Putty */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="relative w-full md:w-80 h-64 rounded-lg overflow-hidden">
              <Image
                src="https://alliancepaintsindustries.com/wp-content/uploads/2024/03/PAINT-PROJECT-23-800x800.jpg"
                alt="Acrylic Filling Putty"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-muted-foreground mb-4 italic">
                "Revitalize your surfaces with our Acrylic Filling Putty Paint, ensuring seamless repairs and impeccable
                finishes."
              </p>
              <h3 className="text-xl font-semibold text-foreground mb-1">Acrylic Filling Putty</h3>
              <p className="text-primary font-medium">Final Touch</p>
            </div>
          </motion.div>

          {/* Right side - Two products stacked */}
          <div className="space-y-8">
            {/* Matt Enamel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="relative w-full md:w-48 h-40 rounded-lg overflow-hidden">
                <Image
                  src="https://alliancepaintsindustries.com/wp-content/uploads/2024/02/PAINT-PROJECT-14-800x800.jpg"
                  alt="Matt Enamel"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground mb-4 italic">
                  "Transform surfaces with the timeless allure of Red Oxide paint, adding warmth and character to any
                  space."
                </p>
                <h3 className="text-xl font-semibold text-foreground mb-1">Matt Enamel</h3>
                <p className="text-primary font-medium">Protect</p>
              </div>
            </motion.div>

            {/* Water Base Matt */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="relative w-full md:w-48 h-40 rounded-lg overflow-hidden">
                <Image
                  src="https://alliancepaintsindustries.com/wp-content/uploads/2024/03/PAINT-PROJECT-24-800x800.jpg"
                  alt="Water Base Matt"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground mb-4 italic">
                  "Prepare your walls for perfection with our Wall Primer Sealer, the ultimate foundation for flawless
                  paint application."
                </p>
                <h3 className="text-xl font-semibold text-foreground mb-1">Water Base Matt</h3>
                <p className="text-primary font-medium">Sealer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
