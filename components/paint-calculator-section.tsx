"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, Plus } from "lucide-react"
import { PaintCalculatorModal } from "./paint-calculator-modal"

export function PaintCalculatorSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="py-20  ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">Paint Calculator</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate the exact amount of paint you need for your project with our advanced calculator
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="group hover:shadow-xl transition-all duration-500 border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Calculator className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Room Paint Calculator</CardTitle>
              <p className="text-muted-foreground">Get precise paint quantity estimates for any room size</p>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-secondary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Enter Dimensions</h3>
                  <p className="text-sm text-muted-foreground">Input room length, width, and height</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-secondary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Select Coats</h3>
                  <p className="text-sm text-muted-foreground">Choose number of paint coats needed</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-secondary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Get Results</h3>
                  <p className="text-sm text-muted-foreground">Receive accurate paint quantity</p>
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Open Paint Calculator
              </Button>
            </CardContent>
          </Card>
        </div>

        <PaintCalculatorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  )
}
