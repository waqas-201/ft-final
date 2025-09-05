"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Gift, Palette, Brush, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export function NewsletterSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 md:p-12 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Palette className="h-6 w-6 text-primary" />
                      </div>
                      <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                        <Brush className="h-5 w-5 text-secondary" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">Join 10,000+ Paint Enthusiasts</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="text-muted-foreground">Expert color matching tips</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="text-muted-foreground">Exclusive product launches</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="text-muted-foreground">Seasonal painting guides</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">Get Paint Tips & Offers</h2>
                    <p className="text-muted-foreground">
                      Subscribe for expert advice and exclusive discounts on premium paints.
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="h-12 text-base border-2 focus:border-primary"
                    />
                    <Button className="w-full h-12 text-base bg-primary hover:bg-primary/90 font-semibold">
                      Subscribe & Get 10% Off
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-secondary/10 p-3 rounded-lg">
                    <Gift className="h-4 w-4 text-secondary" />
                    <span>Instant 10% discount on your first order!</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
