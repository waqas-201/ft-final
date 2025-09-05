"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Paintbrush } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

function useAnimatedCounter(end: number, duration = 2000, startAnimation = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startAnimation) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, startAnimation])

  return count
}

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, })
  const animatedValue = useAnimatedCounter(value, 2000, isInView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-2xl font-bold text-primary">
        {animatedValue}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )
}

const heroImages = [
  {
    url: "https://alliancepaintsindustries.com/wp-content/uploads/2024/04/WEBSITE-BANNER-HOME-01-1-scaled.jpg",
    alt: "Premium Paint Collection - Home Banner 1",
  },
  {
    url: "https://alliancepaintsindustries.com/wp-content/uploads/2024/04/WEBSITE-BANNER-HOME-02-scaled.jpg",
    alt: "Premium Paint Collection - Home Banner 2",
  },
  {
    url: "https://alliancepaintsindustries.com/wp-content/uploads/2024/03/WEBSITE-BANNER-HOME-03-scaled.jpg",
    alt: "Premium Paint Collection - Home Banner 3",
  },
]

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ])

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-card py-10 lg:py-22">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
              >
                <Paintbrush className="mr-2 h-4 w-4" />
                Premium Quality Paints
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
              >
                Transform Your Space with <span className="text-primary">Color</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-muted-foreground max-w-2xl text-pretty"
              >
                Discover our premium collection of interior and exterior paints. From vibrant colors to lasting
                finishes, we have everything you need to bring your vision to life.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/products" >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              </Link>
              <Button size="lg" variant="outline">
                View Color Guide
              </Button>
            </motion.div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <AnimatedStat value={500} suffix="+" label="Paint Colors" />
              <AnimatedStat value={25} suffix="+" label="Years Experience" />
              <AnimatedStat value={10} suffix="k+" label="Happy Customers" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative "
          >
            <div className="aspect-square     overflow-hidden">
              <div className="embla h-full" ref={emblaRef}>
                <div className="embla__container h-full flex">
                  {heroImages.map((image, index) => (
                    <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === selectedIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                    }`}
                    onClick={() => emblaApi?.scrollTo(index)}
                  />
                ))}
              </div>
            </div>

            
          </motion.div>
        </div>
      </div>
    </section>
  )
}
