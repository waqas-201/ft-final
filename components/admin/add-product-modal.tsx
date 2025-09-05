"use client"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Upload, X, ArrowLeft, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Category {
  id: string
  name: string
  slug: string
}

interface Variant {
  name: string
  sku: string
  price: number
  stock: number
  colors: Color[]
}

interface Color {
  name: string
  hexCode: string
}

interface Image {
  url: string
  alt: string
}

interface AddProductModalProps {
  onProductAdded: () => void
}

export function AddProductModal({ onProductAdded }: AddProductModalProps) {
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState("basic")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [colorPicker, setColorPicker] = useState({
    isOpen: false,
    variantIndex: 0,
    tempColor: "#FFFFFF",
    tempName: "",
  })

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    categoryId: "",
    tags: "",
    discount: 0,
    featured: false,
  })

  const [variants, setVariants] = useState<Variant[]>([
    {
      name: "1 Liter",
      sku: "",
      price: 0,
      stock: 0,
      colors: [
        {
          name: "White",
          hexCode: "#FFFFFF",
        },
      ],
    },
  ])

  const [productImages, setProductImages] = useState<Image[]>([])

  useEffect(() => {
    if (formData.name) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim()
      setFormData((prev) => ({ ...prev, slug }))
    }
  }, [formData.name])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    if (open) {
      fetchCategories()
    }
  }, [open])

  const handleProductImageUpload = async (file: File) => {
    try {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`
      const imagePath = `/images/products/${fileName}`

      setProductImages((prev) => [...prev, { url: imagePath, alt: formData.name || "Product image" }])

      console.log("Product image would be uploaded to:", imagePath)
    } catch (error) {
      console.error("Error uploading product image:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      categoryId: "",
      tags: "",
      discount: 0,
      featured: false,
    })
    setProductImages([])
    setVariants([
      {
        name: "1 Liter",
        sku: "",
        price: 0,
        stock: 0,
        colors: [
          {
            name: "White",
            hexCode: "#FFFFFF",
          },
        ],
      },
    ])
    setErrors({})
    setCurrentStep("basic")
  }

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {}

    if (currentStep === "basic") {
      if (!formData.name) newErrors.name = "Product name is required"
      if (!formData.description) newErrors.description = "Description is required"
      if (!formData.categoryId) newErrors.categoryId = "Category is required"
    }

    if (currentStep === "variants") {
      variants.forEach((variant, vIndex) => {
        if (!variant.name) newErrors[`variant_${vIndex}_name`] = "Size is required"
        if (!variant.sku) newErrors[`variant_${vIndex}_sku`] = "SKU is required"
        if (variant.price <= 0) newErrors[`variant_${vIndex}_price`] = "Price must be greater than 0"
        if (variant.stock < 0) newErrors[`variant_${vIndex}_stock`] = "Stock cannot be negative"
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep === "basic") setCurrentStep("variants")
      else if (currentStep === "variants") setCurrentStep("colors")
    }
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return

    setLoading(true)
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          variants,
          productImages,
        }),
      })

      if (response.ok) {
        setOpen(false)
        resetForm()
        onProductAdded()
      } else {
        const error = await response.json()
        alert(error.error || "Failed to create product")
      }
    } catch (error) {
      console.error("Error creating product:", error)
      alert("Error creating product")
    } finally {
      setLoading(false)
    }
  }

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        name: "",
        sku: "",
        price: 0,
        stock: 0,
        colors: [
          {
            name: "White",
            hexCode: "#FFFFFF",
          },
        ],
      },
    ])
  }

  const updateVariant = (index: number, field: string, value: any) => {
    const updated = [...variants]
    updated[index] = { ...updated[index], [field]: value }
    setVariants(updated)
  }

  const addColor = (variantIndex: number) => {
    setColorPicker({
      isOpen: true,
      variantIndex,
      tempColor: "#FFFFFF",
      tempName: "",
    })
  }

  const finalizeColor = () => {
    if (!colorPicker.tempName.trim()) return

    const currentVariant = variants[colorPicker.variantIndex]
    const isDuplicateColor = currentVariant.colors.some(
      (color) => color.hexCode.toLowerCase() === colorPicker.tempColor.toLowerCase(),
    )

    if (isDuplicateColor) {
      alert("This color has already been added to this variant.")
      return
    }

    const updated = [...variants]
    updated[colorPicker.variantIndex].colors.unshift({
      name: colorPicker.tempName.trim(),
      hexCode: colorPicker.tempColor,
    })
    setVariants(updated)

    // Reset picker
    setColorPicker({
      isOpen: false,
      variantIndex: 0,
      tempColor: "#FFFFFF",
      tempName: "",
    })
  }

  const updateColor = (variantIndex: number, colorIndex: number, field: string, value: any) => {
    const updated = [...variants]
    updated[variantIndex].colors[colorIndex] = {
      ...updated[variantIndex].colors[colorIndex],
      [field]: value,
    }
    setVariants(updated)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Product
          </DialogTitle>
        </DialogHeader>

        <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm flex items-center justify-center">
                1
              </span>
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="variants" className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm flex items-center justify-center">
                2
              </span>
              Sizes & Pricing
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm flex items-center justify-center">
                3
              </span>
              Colors & Images
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Premium Interior Wall Paint"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="High-quality paint perfect for interior walls..."
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                    >
                      <SelectTrigger className={errors.categoryId ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount">Discount (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (optional)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="interior, premium, washable"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variants" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Product Sizes & Pricing</CardTitle>
                  <Button type="button" onClick={addVariant} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Size
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {variants.map((variant, vIndex) => (
                  <div key={vIndex} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Size Option {vIndex + 1}</h4>
                      {variants.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => setVariants(variants.filter((_, i) => i !== vIndex))}
                          variant="outline"
                          size="sm"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Size/Volume *</Label>
                        <Input
                          value={variant.name}
                          onChange={(e) => updateVariant(vIndex, "name", e.target.value)}
                          placeholder="1 Liter"
                          className={errors[`variant_${vIndex}_name`] ? "border-red-500" : ""}
                        />
                        {errors[`variant_${vIndex}_name`] && (
                          <p className="text-sm text-red-500">{errors[`variant_${vIndex}_name`]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Product Code (SKU) *</Label>
                        <Input
                          value={variant.sku}
                          onChange={(e) => updateVariant(vIndex, "sku", e.target.value)}
                          placeholder="PAINT-1L-001"
                          className={errors[`variant_${vIndex}_sku`] ? "border-red-500" : ""}
                        />
                        {errors[`variant_${vIndex}_sku`] && (
                          <p className="text-sm text-red-500">{errors[`variant_${vIndex}_sku`]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Price (Rs.) *</Label>
                        <Input
                          type="number"
                          min="0"
                          value={variant.price}
                          onChange={(e) => updateVariant(vIndex, "price", Number(e.target.value))}
                          placeholder="1500"
                          className={errors[`variant_${vIndex}_price`] ? "border-red-500" : ""}
                        />
                        {errors[`variant_${vIndex}_price`] && (
                          <p className="text-sm text-red-500">{errors[`variant_${vIndex}_price`]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Stock Quantity *</Label>
                        <Input
                          type="number"
                          min="0"
                          value={variant.stock}
                          onChange={(e) => updateVariant(vIndex, "stock", Number(e.target.value))}
                          placeholder="50"
                          className={errors[`variant_${vIndex}_stock`] ? "border-red-500" : ""}
                        />
                        {errors[`variant_${vIndex}_stock`] && (
                          <p className="text-sm text-red-500">{errors[`variant_${vIndex}_stock`]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="colors" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {variants.map((variant, vIndex) => (
                  <div key={vIndex} className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-gray-900">{variant.name}</h4>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {variant.colors.length} color{variant.colors.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <Button
                        type="button"
                        onClick={() => addColor(vIndex)}
                        variant="outline"
                        size="sm"
                        className="hover:bg-blue-50 hover:border-blue-300"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Color
                      </Button>
                    </div>

                    <div className="relative">
                      {variant.colors.length > 0 ? (
                        <div className="flex items-center justify-center py-6">
                          <div className="flex -space-x-3 hover:space-x-2 transition-all duration-300 group">
                            {variant.colors.map((color, cIndex) => (
                              <div key={cIndex} className="relative">
                                <div
                                  className="w-12 h-12 rounded-full border-4 border-white shadow-lg hover:scale-110 hover:z-10 transition-all duration-200 cursor-pointer relative group/color"
                                  style={{ backgroundColor: color.hexCode }}
                                  title={color.name}
                                />
                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover/color:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 shadow-lg">
                                  {color.name}
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                                {variant.colors.length > 1 && (
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      const updated = [...variants]
                                      updated[vIndex].colors = updated[vIndex].colors.filter((_, i) => i !== cIndex)
                                      setVariants(updated)
                                    }}
                                    variant="destructive"
                                    size="sm"
                                    className="absolute -top-1 -right-1 h-6 w-6 p-0 rounded-full opacity-0 hover:opacity-100 transition-opacity shadow-md"
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <div className="w-16 h-16 mx-auto mb-3 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <Plus className="w-6 h-6" />
                          </div>
                          <p className="text-sm">No colors added yet</p>
                        </div>
                      )}
                    </div>

                    {colorPicker.isOpen && colorPicker.variantIndex === vIndex && (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 space-y-4 shadow-sm">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold text-blue-900 flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            Add New Color
                          </h5>
                          <Button
                            type="button"
                            onClick={() => setColorPicker((prev) => ({ ...prev, isOpen: false }))}
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div
                              className="w-16 h-16 rounded-xl border-4 border-white shadow-lg"
                              style={{ backgroundColor: colorPicker.tempColor }}
                            />
                          </div>

                          <div className="flex-1 space-y-3">
                            <div>
                              <Label className="text-sm font-medium text-gray-700">Color Name</Label>
                              <Input
                                placeholder="e.g., Ocean Blue, Forest Green"
                                value={colorPicker.tempName}
                                onChange={(e) => setColorPicker((prev) => ({ ...prev, tempName: e.target.value }))}
                                className="mt-1 bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                              />
                            </div>

                            <div>
                              <Label className="text-sm font-medium text-gray-700">Color Code</Label>
                              <div className="flex gap-2 mt-1">
                                <Input
                                  type="color"
                                  value={colorPicker.tempColor}
                                  onChange={(e) => setColorPicker((prev) => ({ ...prev, tempColor: e.target.value }))}
                                  className="w-16 h-10 p-1 bg-white border-gray-200"
                                />
                                <Input
                                  type="text"
                                  value={colorPicker.tempColor}
                                  onChange={(e) => setColorPicker((prev) => ({ ...prev, tempColor: e.target.value }))}
                                  className="flex-1 bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                                  placeholder="#FFFFFF"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button
                              type="button"
                              onClick={finalizeColor}
                              disabled={!colorPicker.tempName.trim()}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
                            >
                              Add Color
                            </Button>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-blue-200">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm font-medium text-gray-600">Quick Colors:</span>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {[
                              { name: "Pure White", color: "#FFFFFF" },
                              { name: "Charcoal Black", color: "#2D3748" },
                              { name: "Crimson Red", color: "#E53E3E" },
                              { name: "Ocean Blue", color: "#3182CE" },
                              { name: "Forest Green", color: "#38A169" },
                              { name: "Sunset Orange", color: "#DD6B20" },
                              { name: "Royal Purple", color: "#805AD5" },
                              { name: "Golden Yellow", color: "#D69E2E" },
                            ].map((preset) => (
                              <button
                                key={preset.color}
                                type="button"
                                className="w-8 h-8 rounded-lg border-2 border-white shadow-md hover:scale-110 hover:shadow-lg transition-all duration-200"
                                style={{ backgroundColor: preset.color }}
                                onClick={() =>
                                  setColorPicker((prev) => ({
                                    ...prev,
                                    tempColor: preset.color,
                                    tempName: preset.name,
                                  }))
                                }
                                title={preset.name}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Product Images</CardTitle>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || [])
                        files.forEach((file) => handleProductImageUpload(file))
                      }}
                      className="hidden"
                      id="product-images"
                    />
                    <Button asChild variant="outline" size="sm">
                      <label htmlFor="product-images" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Images
                      </label>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {productImages.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {productImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.alt}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          onClick={() => setProductImages((prev) => prev.filter((_, i) => i !== index))}
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Upload product images to showcase your product</p>
                    <p className="text-xs text-gray-400 mt-1">You can upload multiple images</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (currentStep === "variants") setCurrentStep("basic")
              else if (currentStep === "colors") setCurrentStep("variants")
            }}
            disabled={currentStep === "basic"}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            {currentStep === "colors" ? (
              <Button onClick={handleSubmit} disabled={loading} className="bg-green-600 hover:bg-green-700">
                {loading ? "Creating..." : "Create Product"}
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
