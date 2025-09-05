"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Calculator, Paintbrush } from "lucide-react"

interface PaintCalculatorModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PaintCalculatorModal({ isOpen, onClose }: PaintCalculatorModalProps) {
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("10")
  const [coats, setCoats] = useState("1")
  const [results, setResults] = useState<{
    area: number
    totalArea: number
    quarts: number
    gallons: number
    drums: number
  } | null>(null)

  const calculatePaint = () => {
    const l = Number.parseFloat(length)
    const w = Number.parseFloat(width)
    const h = Number.parseFloat(height)
    const numCoats = Number.parseInt(coats)

    if (!l || !w || !h) return

    // Calculate wall area (4 walls minus doors/windows approximation)
    const wallArea = 2 * (l * h) + 2 * (w * h)
    const area = wallArea * 0.9 // Subtract ~10% for doors/windows
    const totalArea = area * numCoats

    // Paint coverage: 1 gallon covers ~350 sq ft
    const gallonsNeeded = totalArea / 350
    const quartsNeeded = gallonsNeeded * 4
    const drumsNeeded = gallonsNeeded / 55 // 55 gallon drum

    setResults({
      area: Math.round(area),
      totalArea: Math.round(totalArea),
      quarts: Math.round(quartsNeeded * 10) / 10,
      gallons: Math.round(gallonsNeeded * 100) / 100,
      drums: Math.round(drumsNeeded * 1000) / 1000,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2">
            <Paintbrush className="w-6 h-6 text-primary" />
            Room Paint Calculator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="length">Room Length (ft):</Label>
              <Input
                id="length"
                type="number"
                placeholder="111"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="width">Room Width (ft):</Label>
              <Input
                id="width"
                type="number"
                placeholder="11"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="height">Room Height (ft):</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="coats">Number of Coats:</Label>
              <Select value={coats} onValueChange={setCoats}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Single Coat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Single Coat</SelectItem>
                  <SelectItem value="2">Double Coat</SelectItem>
                  <SelectItem value="3">Triple Coat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculatePaint} className="w-full bg-primary hover:bg-primary/90 text-white">
              <Calculator className="w-4 h-4 mr-2" />
              CALCULATE PAINT REQUIRED
            </Button>
          </div>

          {results && (
            <Card className="bg-muted/50">
              <CardContent className="p-4 space-y-3">
                <div className="text-center">
                  <p className="font-semibold">Room Area: {results.area}.00 sq.ft</p>
                  <p className="text-sm text-muted-foreground">
                    Total Area (with {coats} coat): {results.totalArea}.00 sq.ft
                  </p>
                </div>

                <div className="border-t pt-3">
                  <p className="font-semibold text-center mb-2">Paint Required:</p>
                  <div className="space-y-1 text-sm">
                    <p>- {results.quarts} Quart(s)</p>
                    <p>- {results.gallons} Gallon(s)</p>
                    <p>- {results.drums} Drum(s)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
