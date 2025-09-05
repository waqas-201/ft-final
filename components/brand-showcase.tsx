import { Card, CardContent } from "@/components/ui/card"

const brands = [
  {
    name: "Final Touch Classic",
    description: "Final Touch Classic Paint offers timeless elegance and enduring quality for your walls.",
    image: "https://alliancepaintsindustries.com/wp-content/uploads/2024/05/Final-touch.jpg",
  },
  {
    name: "New Deluxe Gold",
    description:
      "Experience luxurious richness and superior quality with New Deluxe Gold Paint collection for interiors.",
    image: "https://alliancepaintsindustries.com/wp-content/uploads/2024/05/New-deluxe.jpg",
  },
  {
    name: "ABC Paint",
    description: "Transforming homes with a vibrant palette of high-quality, durable colours for every surface.",
    image: "https://alliancepaintsindustries.com/wp-content/uploads/2024/05/ABC.jpg",
  },
]

export function BrandShowcase() {
  return (
    <section id="brands" className="py-20    ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid lg:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-xl    transition-all duration-300">
              <div className="aspect-[4/3]  overflow-hidden">
                <img
                  src={brand.image || "/placeholder.svg"}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="py-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{brand.name}</h3>
                <p className="text-muted-foreground text-pretty">{brand.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
