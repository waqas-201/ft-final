import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const categories = [
  {
    name: "Interior Paints",
    slug: "interior-paints",
    children: [
      { name: "Wall Paints", slug: "wall-paints" },
      { name: "Ceiling Paints", slug: "ceiling-paints" },
      { name: "Texture Paints", slug: "texture-paints" },
      { name: "Specialty Finishes", slug: "specialty-finishes" },
    ],
  },
  {
    name: "Exterior Paints",
    slug: "exterior-paints",
    children: [
      { name: "Weather Shield", slug: "weather-shield" },
      { name: "Roof Paints", slug: "roof-paints" },
      { name: "Masonry Paints", slug: "masonry-paints" },
    ],
  },
  {
    name: "Primers & Undercoats",
    slug: "primers-undercoats",
  },
  {
    name: "Painting Tools",
    slug: "painting-tools",
    children: [
      { name: "Brushes", slug: "brushes" },
      { name: "Rollers", slug: "rollers" },
      { name: "Spray Equipment", slug: "spray-equipment" },
    ],
  },
]

const products = [
  {
    name: "Premium Silk Emulsion",
    slug: "premium-silk-emulsion",
    description:
      "High-quality silk finish emulsion paint perfect for interior walls. Provides excellent coverage and durability with a smooth, washable finish.",
    categorySlug: "wall-paints",
    tags: "interior,silk,washable,premium",
    featured: true,
    variants: [
      {
        name: "1 Liter",
        sku: "PSE-1L",
        price: 1200,
        stock: 50,
        colors: [
          {
            name: "Pure White",
            hexCode: "#FFFFFF",
            images: [{ url: "/paint-can.png", alt: "Pure White Premium Silk Emulsion 1L" }],
          },
          {
            name: "Cream Delight",
            hexCode: "#F5F5DC",
            images: [{ url: "/paint-can.png", alt: "Cream Delight Premium Silk Emulsion 1L" }],
          },
          {
            name: "Sky Blue",
            hexCode: "#87CEEB",
            images: [{ url: "/paint-can.png", alt: "Sky Blue Premium Silk Emulsion 1L" }],
          },
          {
            name: "Soft Pink",
            hexCode: "#FFB6C1",
            images: [{ url: "/paint-can.png", alt: "Soft Pink Premium Silk Emulsion 1L" }],
          },
          {
            name: "Mint Green",
            hexCode: "#98FB98",
            images: [{ url: "/paint-can.png", alt: "Mint Green Premium Silk Emulsion 1L" }],
          },
        ],
      },
      {
        name: "4 Liters",
        sku: "PSE-4L",
        price: 4500,
        stock: 30,
        colors: [
          {
            name: "Pure White",
            hexCode: "#FFFFFF",
            images: [{ url: "/paint-can.png", alt: "Pure White Premium Silk Emulsion 4L" }],
          },
          {
            name: "Cream Delight",
            hexCode: "#F5F5DC",
            images: [{ url: "/paint-can.png", alt: "Cream Delight Premium Silk Emulsion 4L" }],
          },
          {
            name: "Sky Blue",
            hexCode: "#87CEEB",
            images: [{ url: "/paint-can.png", alt: "Sky Blue Premium Silk Emulsion 4L" }],
          },
        ],
      },
    ],
  },
  {
    name: "Matt Finish Interior",
    slug: "matt-finish-interior",
    description: "Classic matt finish paint that hides surface imperfections. Perfect for living rooms and bedrooms.",
    categorySlug: "wall-paints",
    tags: "interior,matt,classic",
    variants: [
      {
        name: "1 Liter",
        sku: "MFI-1L",
        price: 950,
        stock: 45,
        colors: [
          {
            name: "Warm White",
            hexCode: "#FAF0E6",
            images: [{ url: "/white-paint-can.jpg", alt: "Warm White Matt Finish 1L" }],
          },
          {
            name: "Dove Grey",
            hexCode: "#696969",
            images: [{ url: "/paint-can.png", alt: "Dove Grey Matt Finish 1L" }],
          },
          {
            name: "Sage Green",
            hexCode: "#9CAF88",
            images: [{ url: "/paint-can.png", alt: "Sage Green Matt Finish 1L" }],
          },
          {
            name: "Dusty Rose",
            hexCode: "#DCAE96",
            images: [{ url: "/paint-can.png", alt: "Dusty Rose Matt Finish 1L" }],
          },
        ],
      },
      {
        name: "4 Liters",
        sku: "MFI-4L",
        price: 3600,
        stock: 25,
        colors: [
          {
            name: "Warm White",
            hexCode: "#FAF0E6",
            images: [{ url: "/white-paint-can.jpg", alt: "Warm White Matt Finish 4L" }],
          },
          {
            name: "Dove Grey",
            hexCode: "#696969",
            images: [{ url: "/paint-can.png", alt: "Dove Grey Matt Finish 4L" }],
          },
        ],
      },
    ],
  },
  {
    name: "Luxury Satin Finish",
    slug: "luxury-satin-finish",
    description: "Premium satin finish with subtle sheen. Durable and easy to clean, perfect for high-traffic areas.",
    categorySlug: "wall-paints",
    tags: "interior,satin,luxury,durable",
    featured: true,
    discount: 15,
    variants: [
      {
        name: "1 Liter",
        sku: "LSF-1L",
        price: 1400,
        stock: 35,
        colors: [
          {
            name: "Pearl White",
            hexCode: "#F8F6F0",
            images: [{ url: "/paint-can.png", alt: "Pearl White Luxury Satin 1L" }],
          },
          {
            name: "Champagne",
            hexCode: "#F7E7CE",
            images: [{ url: "/paint-can.png", alt: "Champagne Luxury Satin 1L" }],
          },
          {
            name: "Ocean Blue",
            hexCode: "#006994",
            images: [{ url: "/paint-can.png", alt: "Ocean Blue Luxury Satin 1L" }],
          },
          {
            name: "Forest Green",
            hexCode: "#355E3B",
            images: [{ url: "/paint-can.png", alt: "Forest Green Luxury Satin 1L" }],
          },
          {
            name: "Burgundy",
            hexCode: "#800020",
            images: [{ url: "/paint-can.png", alt: "Burgundy Luxury Satin 1L" }],
          },
        ],
      },
    ],
  },
  {
    name: "Weather Guard Exterior",
    slug: "weather-guard-exterior",
    description:
      "Advanced exterior paint formulated to withstand harsh Pakistani weather conditions. UV resistant and long-lasting protection for your home.",
    categorySlug: "weather-shield",
    tags: "exterior,weather-resistant,uv-protection",
    featured: true,
    discount: 10,
    variants: [
      {
        name: "1 Liter",
        sku: "WGE-1L",
        price: 1500,
        stock: 40,
        colors: [
          {
            name: "Sandstone Beige",
            hexCode: "#D2B48C",
            images: [{ url: "/paint-can.png", alt: "Sandstone Beige Weather Guard 1L" }],
          },
          {
            name: "Terracotta Red",
            hexCode: "#E2725B",
            images: [{ url: "/paint-can.png", alt: "Terracotta Red Weather Guard 1L" }],
          },
          {
            name: "Desert Sand",
            hexCode: "#EDC9AF",
            images: [{ url: "/paint-can.png", alt: "Desert Sand Weather Guard 1L" }],
          },
          {
            name: "Stone Grey",
            hexCode: "#928E85",
            images: [{ url: "/paint-can.png", alt: "Stone Grey Weather Guard 1L" }],
          },
        ],
      },
      {
        name: "4 Liters",
        sku: "WGE-4L",
        price: 5500,
        stock: 25,
        colors: [
          {
            name: "Sandstone Beige",
            hexCode: "#D2B48C",
            images: [{ url: "/paint-can.png", alt: "Sandstone Beige Weather Guard 4L" }],
          },
          {
            name: "Terracotta Red",
            hexCode: "#E2725B",
            images: [{ url: "/paint-can.png", alt: "Terracotta Red Weather Guard 4L" }],
          },
        ],
      },
    ],
  },
  {
    name: "Texture Master Pro",
    slug: "texture-master-pro",
    description:
      "Create stunning textured walls with this professional-grade texture paint. Easy to apply and available in multiple finishes.",
    categorySlug: "texture-paints",
    tags: "texture,professional,decorative",
    variants: [
      {
        name: "5 Kg Bucket",
        sku: "TMP-5KG",
        price: 3200,
        stock: 20,
        colors: [
          {
            name: "Pearl White",
            hexCode: "#F8F6F0",
            images: [{ url: "/paint-can.png", alt: "Pearl White Texture Master Pro 5Kg" }],
          },
          {
            name: "Golden Sand",
            hexCode: "#F4A460",
            images: [{ url: "/paint-can.png", alt: "Golden Sand Texture Master Pro 5Kg" }],
          },
          {
            name: "Silver Mist",
            hexCode: "#C0C0C0",
            images: [{ url: "/paint-can.png", alt: "Silver Mist Texture Master Pro 5Kg" }],
          },
        ],
      },
    ],
  },
  {
    name: "Universal Primer",
    slug: "universal-primer",
    description:
      "High-quality primer suitable for all surfaces. Ensures better paint adhesion and coverage for both interior and exterior applications.",
    categorySlug: "primers-undercoats",
    tags: "primer,universal,base-coat",
    variants: [
      {
        name: "1 Liter",
        sku: "UP-1L",
        price: 800,
        stock: 60,
        colors: [
          {
            name: "White Base",
            hexCode: "#FFFFFF",
            images: [{ url: "/white-paint-can.jpg", alt: "Universal Primer White Base 1L" }],
          },
        ],
      },
      {
        name: "4 Liters",
        sku: "UP-4L",
        price: 2800,
        stock: 35,
        colors: [
          {
            name: "White Base",
            hexCode: "#FFFFFF",
            images: [{ url: "/white-paint-can.jpg", alt: "Universal Primer White Base 4L" }],
          },
        ],
      },
    ],
  },
  {
    name: "Professional Paint Brush Set",
    slug: "professional-paint-brush-set",
    description:
      "Complete set of high-quality brushes for professional painting. Includes flat, angled, and detail brushes for all your painting needs.",
    categorySlug: "brushes",
    tags: "brushes,professional,set,tools",
    variants: [
      {
        name: "5-Piece Set",
        sku: "PPBS-5PC",
        price: 1500,
        stock: 25,
        colors: [
          {
            name: "Natural Bristle",
            hexCode: "#D2691E",
            images: [{ url: "/paint-can.png", alt: "Professional Paint Brush Set - Natural Bristle" }],
          },
        ],
      },
    ],
  },
  {
    name: "Ceiling White Special",
    slug: "ceiling-white-special",
    description:
      "Specially formulated white paint for ceilings. Non-drip formula with excellent coverage and minimal splatter.",
    categorySlug: "ceiling-paints",
    tags: "ceiling,white,non-drip,special",
    variants: [
      {
        name: "2.5 Liters",
        sku: "CWS-2.5L",
        price: 2200,
        stock: 40,
        colors: [
          {
            name: "Brilliant White",
            hexCode: "#FFFFFF",
            images: [{ url: "/white-paint-can.jpg", alt: "Ceiling White Special - Brilliant White 2.5L" }],
          },
        ],
      },
    ],
  },
  {
    name: "Eco-Friendly Matt",
    slug: "eco-friendly-matt",
    description:
      "Environmentally safe matt paint with low VOC content. Perfect for children's rooms and eco-conscious homes.",
    categorySlug: "wall-paints",
    tags: "interior,eco-friendly,low-voc,safe",
    variants: [
      {
        name: "1 Liter",
        sku: "EFM-1L",
        price: 1100,
        stock: 30,
        colors: [
          {
            name: "Natural White",
            hexCode: "#FFFEF7",
            images: [{ url: "/paint-can.png", alt: "Natural White Eco-Friendly Matt 1L" }],
          },
          {
            name: "Soft Yellow",
            hexCode: "#FFFFE0",
            images: [{ url: "/paint-can.png", alt: "Soft Yellow Eco-Friendly Matt 1L" }],
          },
          {
            name: "Baby Blue",
            hexCode: "#E0F6FF",
            images: [{ url: "/paint-can.png", alt: "Baby Blue Eco-Friendly Matt 1L" }],
          },
          {
            name: "Gentle Pink",
            hexCode: "#FFE4E1",
            images: [{ url: "/paint-can.png", alt: "Gentle Pink Eco-Friendly Matt 1L" }],
          },
        ],
      },
    ],
  },
  {
    name: "Washable Kitchen Paint",
    slug: "washable-kitchen-paint",
    description: "Specially designed for kitchens and bathrooms. Moisture resistant and easy to clean.",
    categorySlug: "wall-paints",
    tags: "interior,washable,kitchen,moisture-resistant",
    variants: [
      {
        name: "1 Liter",
        sku: "WKP-1L",
        price: 1350,
        stock: 25,
        colors: [
          {
            name: "Fresh White",
            hexCode: "#FFFFFF",
            images: [{ url: "/paint-can.png", alt: "Fresh White Washable Kitchen Paint 1L" }],
          },
          {
            name: "Lemon Zest",
            hexCode: "#FFFACD",
            images: [{ url: "/paint-can.png", alt: "Lemon Zest Washable Kitchen Paint 1L" }],
          },
          {
            name: "Mint Fresh",
            hexCode: "#F0FFF0",
            images: [{ url: "/paint-can.png", alt: "Mint Fresh Washable Kitchen Paint 1L" }],
          },
        ],
      },
    ],
  },
  {
    name: "Luxury Velvet Finish",
    slug: "luxury-velvet-finish",
    description:
      "Rich velvet finish that adds depth and sophistication to any room. Premium quality with excellent coverage.",
    categorySlug: "wall-paints",
    tags: "interior,velvet,luxury,premium",
    featured: true,
    variants: [
      {
        name: "1 Liter",
        sku: "LVF-1L",
        price: 1600,
        stock: 20,
        colors: [
          {
            name: "Royal Blue",
            hexCode: "#4169E1",
            images: [{ url: "/paint-can.png", alt: "Royal Blue Luxury Velvet 1L" }],
          },
          {
            name: "Deep Purple",
            hexCode: "#483D8B",
            images: [{ url: "/paint-can.png", alt: "Deep Purple Luxury Velvet 1L" }],
          },
          {
            name: "Emerald Green",
            hexCode: "#50C878",
            images: [{ url: "/paint-can.png", alt: "Emerald Green Luxury Velvet 1L" }],
          },
          {
            name: "Crimson Red",
            hexCode: "#DC143C",
            images: [{ url: "/paint-can.png", alt: "Crimson Red Luxury Velvet 1L" }],
          },
        ],
      },
    ],
  },
  {
    name: "Anti-Bacterial Wall Paint",
    slug: "anti-bacterial-wall-paint",
    description:
      "Advanced formula with anti-bacterial properties. Ideal for hospitals, clinics, and health-conscious homes.",
    categorySlug: "wall-paints",
    tags: "interior,anti-bacterial,health,medical",
    variants: [
      {
        name: "1 Liter",
        sku: "ABW-1L",
        price: 1450,
        stock: 15,
        colors: [
          {
            name: "Medical White",
            hexCode: "#FFFFFF",
            images: [{ url: "/paint-can.png", alt: "Medical White Anti-Bacterial Paint 1L" }],
          },
          {
            name: "Hygiene Blue",
            hexCode: "#E6F3FF",
            images: [{ url: "/paint-can.png", alt: "Hygiene Blue Anti-Bacterial Paint 1L" }],
          },
        ],
      },
    ],
  },
  {
    name: "Magnetic Chalkboard Paint",
    slug: "magnetic-chalkboard-paint",
    description:
      "Innovative paint that creates a magnetic chalkboard surface. Perfect for kids' rooms and creative spaces.",
    categorySlug: "specialty-finishes",
    tags: "specialty,magnetic,chalkboard,creative",
    variants: [
      {
        name: "500ml",
        sku: "MCP-500ML",
        price: 2500,
        stock: 12,
        colors: [
          {
            name: "Chalkboard Black",
            hexCode: "#2F4F2F",
            images: [{ url: "/paint-can.png", alt: "Magnetic Chalkboard Paint Black 500ml" }],
          },
          {
            name: "Chalkboard Green",
            hexCode: "#355E3B",
            images: [{ url: "/paint-can.png", alt: "Magnetic Chalkboard Paint Green 500ml" }],
          },
        ],
      },
    ],
  },
  {
    name: "Weather Guard Exterior",
    slug: "weather-guard-exterior",
    description:
      "Advanced exterior paint formulated to withstand harsh Pakistani weather conditions. UV resistant and long-lasting protection for your home.",
    categorySlug: "weather-shield",
    tags: "exterior,weather-resistant,uv-protection",
    featured: true,
    discount: 10,
    variants: [
      {
        name: "1 Liter",
        sku: "WGE-1L",
        price: 1500,
        stock: 40,
        colors: [
          {
            name: "Sandstone Beige",
            hexCode: "#D2B48C",
            images: [{ url: "/paint-can.png", alt: "Sandstone Beige Weather Guard 1L" }],
          },
          {
            name: "Terracotta Red",
            hexCode: "#E2725B",
            images: [{ url: "/paint-can.png", alt: "Terracotta Red Weather Guard 1L" }],
          },
          {
            name: "Desert Sand",
            hexCode: "#EDC9AF",
            images: [{ url: "/paint-can.png", alt: "Desert Sand Weather Guard 1L" }],
          },
          {
            name: "Stone Grey",
            hexCode: "#928E85",
            images: [{ url: "/paint-can.png", alt: "Stone Grey Weather Guard 1L" }],
          },
        ],
      },
      {
        name: "4 Liters",
        sku: "WGE-4L",
        price: 5500,
        stock: 25,
        colors: [
          {
            name: "Sandstone Beige",
            hexCode: "#D2B48C",
            images: [{ url: "/paint-can.png", alt: "Sandstone Beige Weather Guard 4L" }],
          },
          {
            name: "Terracotta Red",
            hexCode: "#E2725B",
            images: [{ url: "/paint-can.png", alt: "Terracotta Red Weather Guard 4L" }],
          },
        ],
      },
    ],
  },
]

const caseStudies = [
  {
    title: "Modern Corporate Office Transformation",
    slug: "modern-corporate-office-transformation",
    category: "Commercial",
    client: "TechCorp Solutions",
    location: "Karachi, Pakistan",
    description: "Complete interior transformation of a 15,000 sq ft corporate office space with modern color scheme and premium finishes.",
    challenge: "The existing office had outdated colors and poor lighting reflection. The walls showed wear and tear, creating an unprofessional environment that affected employee morale and client perception.",
    solution: "Applied Premium Silk Emulsion in Pearl White for main areas, Luxury Satin Finish in Ocean Blue for accent walls, and Anti-Bacterial Paint in meeting rooms. Used professional spray equipment for uniform coverage.",
    results: "The new paint scheme improved natural light reflection by 40%, created a modern professional atmosphere, and received positive feedback from both employees and clients. The anti-bacterial coating in meeting rooms provided added health benefits.",
    imageUrl: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg",
    beforeImage: "https://images.pexels.com/photos/236973/pexels-photo-236973.jpeg",
    afterImage: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg",
    duration: "5 days",
    area: "15,000 sq ft",
    products: JSON.stringify([
      { name: "Premium Silk Emulsion - Pearl White", quantity: "45 liters" },
      { name: "Luxury Satin Finish - Ocean Blue", quantity: "12 liters" },
      { name: "Anti-Bacterial Wall Paint - Medical White", quantity: "8 liters" },
      { name: "Universal Primer", quantity: "20 liters" }
    ]),
    testimonial: "The team delivered exceptional results. Our office looks fantastic and the professional finish has impressed all our clients. Highly recommended!",
    featured: true
  },
  {
    title: "Heritage Hotel Restoration",
    slug: "heritage-hotel-restoration",
    category: "Commercial",
    client: "Grand Palace Hotel",
    location: "Lahore, Pakistan",
    description: "Restoration of a heritage hotel's exterior facade while preserving its historical character and improving weather resistance.",
    challenge: "The 100-year-old building's exterior was deteriorating due to weather exposure. Paint was peeling, and the masonry needed protection while maintaining the original aesthetic appeal.",
    solution: "Used Weather Guard Exterior in heritage-appropriate colors, applied Masonry Sealer Paint for protection, and finished with specialized texture techniques to recreate original details.",
    results: "Successfully restored the building's grandeur while providing 15-year weather protection. The hotel now attracts more guests due to its stunning appearance and preserved heritage value.",
    imageUrl: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    beforeImage: "https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg",
    afterImage: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg",
    duration: "3 weeks",
    area: "8,500 sq ft",
    products: JSON.stringify([
      { name: "Weather Guard Exterior - Sandstone Beige", quantity: "80 liters" },
      { name: "Masonry Sealer Paint", quantity: "25 liters" },
      { name: "Texture Master Pro - Golden Sand", quantity: "15 kg" },
      { name: "Universal Primer", quantity: "35 liters" }
    ]),
    testimonial: "Outstanding work! They respected our heritage requirements while delivering modern protection. Our bookings increased significantly after the restoration.",
    featured: true
  },
  {
    title: "Manufacturing Plant Safety Upgrade",
    slug: "manufacturing-plant-safety-upgrade",
    category: "Industrial",
    client: "Atlas Industries",
    location: "Faisalabad, Pakistan",
    description: "Comprehensive safety-focused painting project for a textile manufacturing facility with specialized coatings and safety markings.",
    challenge: "The industrial facility required chemical-resistant coatings, safety line markings, and improved visibility while maintaining operations during the painting process.",
    solution: "Applied Epoxy Floor Paint for high-traffic areas, Heat Reflective Exterior for sun-exposed sections, and used Safety Yellow for hazard markings. Work was completed in phases to minimize operational disruption.",
    results: "Improved workplace safety compliance, reduced surface temperatures by 18°C in critical areas, and created a cleaner, more professional environment that boosted worker morale and productivity.",
    imageUrl: "https://images.pexels.com/photos/236722/pexels-photo-236722.jpeg",
    beforeImage: "https://images.pexels.com/photos/159298/construction-site-build-construction-work-159298.jpeg",
    afterImage: "https://images.pexels.com/photos/236722/pexels-photo-236722.jpeg",
    duration: "4 weeks",
    area: "25,000 sq ft",
    products: JSON.stringify([
      { name: "Epoxy Floor Paint - Industrial Grey", quantity: "120 liters" },
      { name: "Heat Reflective Exterior - Cool White", quantity: "60 liters" },
      { name: "Epoxy Floor Paint - Safety Yellow", quantity: "30 liters" },
      { name: "Metal Primer Rust Guard", quantity: "40 liters" }
    ]),
    testimonial: "Excellent project management and quality execution. The team worked around our production schedule and delivered results that exceeded our expectations."
  },
  {
    title: "Luxury Residential Villa",
    slug: "luxury-residential-villa",
    category: "Residential",
    client: "Mr. Ahmed Hassan",
    location: "DHA Phase 6, Karachi",
    description: "Complete interior and exterior painting of a 6,000 sq ft luxury villa with custom color schemes and premium finishes.",
    challenge: "The homeowner wanted a sophisticated color palette that would complement expensive furnishings while ensuring longevity and easy maintenance in Pakistan's climate.",
    solution: "Used Luxury Velvet Finish for living areas, Premium Silk Emulsion for bedrooms, Venetian Plaster Effect for the entrance hall, and Weather Guard Exterior for all outdoor surfaces.",
    results: "Created a stunning luxury living space that perfectly complements the home's architecture. The paint has maintained its appearance excellently after 2 years with minimal maintenance required.",
    imageUrl: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
    beforeImage: "https://images.pexels.com/photos/32870/pexels-photo-32870.jpg",
    afterImage: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg",
    duration: "2 weeks",
    area: "6,000 sq ft",
    products: JSON.stringify([
      { name: "Luxury Velvet Finish - Royal Blue", quantity: "8 liters" },
      { name: "Premium Silk Emulsion - Pure White", quantity: "25 liters" },
      { name: "Venetian Plaster Effect - Marble White", quantity: "5 kg" },
      { name: "Weather Guard Exterior - Sandstone Beige", quantity: "30 liters" }
    ]),
    testimonial: "The attention to detail was remarkable. Every room looks exactly as I envisioned. The quality is exceptional and my guests always compliment the beautiful finishes.",
    featured: true
  },
  {
    title: "Hospital ICU Wing Renovation",
    slug: "hospital-icu-wing-renovation",
    category: "Commercial",
    client: "City General Hospital",
    location: "Islamabad, Pakistan",
    description: "Critical care unit renovation requiring specialized anti-bacterial and easy-to-clean paint solutions for medical environment compliance.",
    challenge: "Strict hygiene requirements, minimal downtime constraints, and the need for coatings that could withstand frequent cleaning with medical-grade disinfectants.",
    solution: "Applied Anti-Bacterial Wall Paint throughout all patient areas, used specialized primers for better adhesion, and implemented a phased approach to keep critical services operational.",
    results: "Achieved 99.9% bacterial resistance certification, reduced infection rates, and created a cleaner environment that meets international medical standards. Zero operational disruption during implementation.",
    imageUrl: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg",
    beforeImage: "https://images.pexels.com/photos/139398/pexels-photo-139398.jpeg",
    afterImage: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg",
    duration: "10 days",
    area: "12,000 sq ft",
    products: JSON.stringify([
      { name: "Anti-Bacterial Wall Paint - Medical White", quantity: "45 liters" },
      { name: "Anti-Bacterial Wall Paint - Hygiene Blue", quantity: "15 liters" },
      { name: "Universal Primer", quantity: "25 liters" },
      { name: "Anti-Condensation Ceiling", quantity: "20 liters" }
    ]),
    testimonial: "Professional execution with zero disruption to our critical operations. The anti-bacterial properties have significantly improved our hygiene protocols."
  },
  {
    title: "School Playground Safety Project",
    slug: "school-playground-safety-project",
    category: "Commercial",
    client: "Bright Future Academy",
    location: "Multan, Pakistan",
    description: "Complete playground renovation with safety-focused paint solutions, creative designs, and child-friendly finishes.",
    challenge: "Creating a safe, attractive, and durable playground environment that could withstand heavy use by 500+ children daily while maintaining bright, cheerful colors.",
    solution: "Used Eco-Friendly Matt paint for all surfaces to ensure child safety, applied Epoxy Floor Paint for playground markings, and created colorful designs using various specialty finishes including Glow-in-Dark Paint.",
    results: "Transformed the playground into a vibrant, safe learning environment. The eco-friendly paints ensure child safety, while the creative designs have increased outdoor activity participation by 60%.",
    imageUrl: "https://images.pexels.com/photos/8613185/pexels-photo-8613185.jpeg",
    beforeImage: "https://images.pexels.com/photos/159844/playground-play-slide-swing-159844.jpeg",
    afterImage: "https://images.pexels.com/photos/8613185/pexels-photo-8613185.jpeg",
    duration: "1 week",
    area: "3,500 sq ft",
    products: JSON.stringify([
      { name: "Eco-Friendly Matt - Soft Yellow", quantity: "15 liters" },
      { name: "Eco-Friendly Matt - Baby Blue", quantity: "12 liters" },
      { name: "Glow-in-Dark Paint - Glow Green", quantity: "2 liters" },
      { name: "Epoxy Floor Paint - Safety Yellow", quantity: "8 liters" }
    ]),
    testimonial: "The children love the new playground! The colors are vibrant and we appreciate the eco-friendly approach. Excellent workmanship and attention to safety."
  },
  {
    title: "Warehouse Cold Storage Facility",
    slug: "warehouse-cold-storage-facility",
    category: "Industrial",
    client: "Fresh Foods Distribution",
    location: "Sialkot, Pakistan",
    description: "Specialized coating solution for a cold storage warehouse requiring temperature-resistant and moisture-proof finishes.",
    challenge: "Extreme temperature variations (-18°C to +45°C), high humidity levels, and the need for easy cleaning while maintaining food safety standards.",
    solution: "Applied specialized Epoxy Floor Paint with cold-resistant additives, used Anti-Condensation Ceiling paint, and implemented Masonry Sealer Paint for walls to prevent moisture penetration.",
    results: "Eliminated condensation issues, reduced maintenance costs by 50%, and achieved food safety compliance certification. The facility now operates more efficiently with better temperature control.",
    imageUrl: "https://images.pexels.com/photos/4483609/pexels-photo-4483609.jpeg",
    beforeImage: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
    afterImage: "https://images.pexels.com/photos/4483609/pexels-photo-4483609.jpeg",
    duration: "2 weeks",
    area: "18,000 sq ft",
    products: JSON.stringify([
      { name: "Epoxy Floor Paint - Industrial Grey", quantity: "85 liters" },
      { name: "Anti-Condensation Ceiling", quantity: "35 liters" },
      { name: "Masonry Sealer Paint", quantity: "40 liters" },
      { name: "Universal Primer", quantity: "50 liters" }
    ]),
    testimonial: "Perfect solution for our specialized needs. The team understood the technical requirements and delivered a coating system that performs excellently in extreme conditions."
  },
  {
    title: "Family Home Interior Makeover",
    slug: "family-home-interior-makeover",
    category: "Residential",
    client: "Mrs. Fatima Ali",
    location: "Model Town, Lahore",
    description: "Complete interior renovation of a family home with focus on creating warm, welcoming spaces for children and adults.",
    challenge: "The client wanted different finishes for different rooms - washable surfaces for children's areas, elegant finishes for living spaces, and practical solutions for high-traffic zones.",
    solution: "Used Washable Kitchen Paint for children's rooms and kitchen, Luxury Velvet Finish for the living room, Matt Finish Interior for bedrooms, and Magnetic Chalkboard Paint for the kids' play area.",
    results: "Created distinct, functional zones throughout the home. The washable surfaces have proven invaluable for maintenance, while the luxury finishes add sophistication to entertaining areas.",
    imageUrl: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    beforeImage: "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg",
    afterImage: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    duration: "1 week",
    area: "2,800 sq ft",
    products: JSON.stringify([
      { name: "Washable Kitchen Paint - Fresh White", quantity: "8 liters" },
      { name: "Luxury Velvet Finish - Deep Purple", quantity: "4 liters" },
      { name: "Matt Finish Interior - Warm White", quantity: "12 liters" },
      { name: "Magnetic Chalkboard Paint - Chalkboard Black", quantity: "1 liter" }
    ]),
    testimonial: "They understood exactly what we needed for each room. The kids love their chalkboard wall, and the living room looks absolutely stunning. Very professional service."
  },
  {
    title: "Shopping Mall Food Court",
    slug: "shopping-mall-food-court",
    category: "Commercial",
    client: "Metro Shopping Complex",
    location: "Rawalpindi, Pakistan",
    description: "High-traffic food court renovation requiring easy-clean surfaces, attractive aesthetics, and durability against heavy daily use.",
    challenge: "Heavy foot traffic, food spills, frequent cleaning, and the need to maintain an attractive appearance despite constant use by thousands of visitors daily.",
    solution: "Applied Luxury Satin Finish for easy cleaning, used Washable Kitchen Paint in food preparation areas, and implemented Heat Reflective Exterior for temperature control in the central atrium.",
    results: "Created a bright, welcoming space that maintains its appearance despite heavy use. Cleaning time reduced by 30%, and the improved aesthetics have increased dwell time and customer satisfaction.",
    imageUrl: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
    beforeImage: "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg",
    afterImage: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
    duration: "2 weeks",
    area: "8,000 sq ft",
    products: JSON.stringify([
      { name: "Luxury Satin Finish - Pearl White", quantity: "35 liters" },
      { name: "Washable Kitchen Paint - Fresh White", quantity: "20 liters" },
      { name: "Heat Reflective Exterior - Cool White", quantity: "15 liters" },
      { name: "Universal Primer", quantity: "30 liters" }
    ]),
    testimonial: "The food court looks amazing and the easy-clean surfaces have made maintenance so much easier. Customer feedback has been overwhelmingly positive."
  },
  {
    title: "Apartment Building Exterior Refresh",
    slug: "apartment-building-exterior-refresh",
    category: "Residential",
    client: "Green Valley Apartments",
    location: "Gulshan-e-Iqbal, Karachi",
    description: "Exterior painting of a 12-story residential building focusing on weather protection and aesthetic improvement for better property value.",
    challenge: "Working at height on a occupied building, dealing with monsoon weather constraints, and coordinating with 48 apartment owners while ensuring minimal disruption.",
    solution: "Used scaffolding system for safety, applied Weather Guard Exterior with heat-reflective properties, and scheduled work in sections to minimize resident inconvenience.",
    results: "Increased property values by 15%, improved weather resistance for the next 12 years, and enhanced the overall appearance of the neighborhood. Residents reported lower cooling costs due to heat-reflective coating.",
    imageUrl: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    beforeImage: "https://images.pexels.com/photos/273209/pexels-photo-273209.jpeg",
    afterImage: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    duration: "6 weeks",
    area: "45,000 sq ft",
    products: JSON.stringify([
      { name: "Weather Guard Exterior - Stone Grey", quantity: "180 liters" },
      { name: "Heat Reflective Exterior - Cool White", quantity: "60 liters" },
      { name: "Masonry Sealer Paint", quantity: "80 liters" },
      { name: "Universal Primer", quantity: "120 liters" }
    ]),
    testimonial: "Professional team that respected our residents' needs. The building looks brand new and our electricity bills have actually decreased!"
  },
  {
    title: "Automotive Workshop Floor Upgrade",
    slug: "automotive-workshop-floor-upgrade",
    category: "Industrial",
    client: "Speed Motors Workshop",
    location: "Gujranwala, Pakistan",
    description: "Heavy-duty floor coating solution for an automotive repair workshop requiring oil resistance and easy maintenance.",
    challenge: "Constant exposure to automotive fluids, heavy machinery, and the need for easy cleaning while maintaining slip resistance for worker safety.",
    solution: "Applied multiple coats of Epoxy Floor Paint with specialized additives for oil resistance, created safety zones with Safety Yellow markings, and used Anti-Graffiti Coating on walls.",
    results: "Eliminated oil stains, improved workshop cleanliness standards, enhanced safety with clear markings, and reduced floor maintenance time by 70%. The professional appearance has impressed customers.",
    imageUrl: "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg",
    beforeImage: "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg",
    afterImage: "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg",
    duration: "4 days",
    area: "3,200 sq ft",
    products: JSON.stringify([
      { name: "Epoxy Floor Paint - Industrial Grey", quantity: "45 liters" },
      { name: "Epoxy Floor Paint - Safety Yellow", quantity: "8 liters" },
      { name: "Anti-Graffiti Coating", quantity: "12 liters" },
      { name: "Metal Primer Rust Guard", quantity: "15 liters" }
    ]),
    testimonial: "Incredible difference! The floor is now stain-proof and looks professional. Our customers notice the improvement and it's so much easier to keep clean."
  },
  {
    title: "Boutique Hotel Interior Design",
    slug: "boutique-hotel-interior-design",
    category: "Commercial",
    client: "Serena Boutique Hotel",
    location: "Murree, Pakistan",
    description: "Intimate boutique hotel interior featuring custom textures and sophisticated color schemes to create a unique guest experience.",
    challenge: "Creating a distinctive atmosphere that reflects local culture while meeting hospitality industry standards for durability and cleanliness.",
    solution: "Applied Venetian Plaster Effect in common areas, used Texture Master Pro for accent walls, and implemented Luxury Satin Finish in guest rooms for easy maintenance.",
    results: "Achieved a 95% guest satisfaction rating for room aesthetics, increased average room rates by 25%, and created Instagram-worthy spaces that drive social media marketing organically.",
    imageUrl: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
    beforeImage: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    afterImage: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg",
    duration: "3 weeks",
    area: "5,500 sq ft",
    products: JSON.stringify([
      { name: "Venetian Plaster Effect - Antique Gold", quantity: "8 kg" },
      { name: "Texture Master Pro - Pearl White", quantity: "12 kg" },
      { name: "Luxury Satin Finish - Champagne", quantity: "25 liters" },
      { name: "Premium Silk Emulsion - Cream Delight", quantity: "18 liters" }
    ]),
    testimonial: "The artistic finishes have become our signature feature. Guests specifically request rooms with the textured walls. It's been a game-changer for our business."
  },
  {
    title: "Residential Rooftop Waterproofing",
    slug: "residential-rooftop-waterproofing",
    category: "Residential",
    client: "Syed Family Residence",
    location: "North Nazimabad, Karachi",
    description: "Emergency rooftop waterproofing and coating project to address severe leakage issues during monsoon season.",
    challenge: "Active leakage problems, urgent timeline before monsoon season, and the need for a long-term solution that could handle Karachi's intense weather conditions.",
    solution: "Applied Elastomeric Roof Coating with flexible properties, used proper surface preparation techniques, and implemented a multi-layer system for maximum protection.",
    results: "Completely eliminated leakage issues, provided 15-year warranty protection, and reduced indoor temperatures by 12°C due to reflective properties. Successfully weathered two monsoon seasons with zero issues.",
    imageUrl: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    beforeImage: "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg",
    afterImage: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    duration: "3 days",
    area: "1,200 sq ft",
    products: JSON.stringify([
      { name: "Elastomeric Roof Coating - Cool White", quantity: "25 liters" },
      { name: "Universal Primer", quantity: "8 liters" },
      { name: "Masonry Sealer Paint", quantity: "6 liters" }
    ]),
    testimonial: "They saved our home! No more leaks and the house stays much cooler now. Professional work completed exactly on schedule before the rains."
  },
  {
    title: "Creative Agency Office Branding",
    slug: "creative-agency-office-branding",
    category: "Commercial",
    client: "Pixel Perfect Agency",
    location: "Clifton, Karachi",
    description: "Innovative office space design incorporating brand colors, magnetic surfaces, and interactive elements for a creative advertising agency.",
    challenge: "Creating an inspiring workspace that reflects creativity while providing functional surfaces for brainstorming sessions and client presentations.",
    solution: "Used Magnetic Chalkboard Paint for brainstorming walls, applied Whiteboard Paint in meeting rooms, and created brand-color accent walls using Metallic Finish Paint and custom colors.",
    results: "Boosted team creativity and collaboration, improved client presentation capabilities, and created an office environment that reflects the agency's innovative brand. Employee satisfaction increased significantly.",
    imageUrl: "https://images.pexels.com/photos/1181403/pexels-photo-1181403.jpeg",
    beforeImage: "https://images.pexels.com/photos/159805/meeting-modern-room-conference-159805.jpeg",
    afterImage: "https://images.pexels.com/photos/1181403/pexels-photo-1181403.jpeg",
    duration: "1 week",
    area: "2,000 sq ft",
    products: JSON.stringify([
      { name: "Magnetic Chalkboard Paint - Chalkboard Black", quantity: "3 liters" },
      { name: "Whiteboard Paint Kit", quantity: "2 kits" },
      { name: "Metallic Finish Paint - Gold Metallic", quantity: "2 liters" },
      { name: "Premium Silk Emulsion - Pure White", quantity: "12 liters" }
    ]),
    testimonial: "Our office is now a true reflection of our creativity. The interactive walls have revolutionized our brainstorming sessions and clients are always impressed.",
    featured: true
  },
  {
    title: "Swimming Pool Complex Renovation",
    slug: "swimming-pool-complex-renovation",
    category: "Commercial",
    client: "Aqua Fitness Center",
    location: "Johar Town, Lahore",
    description: "Complete renovation of a public swimming facility including pool painting, deck areas, and changing rooms with specialized aquatic coatings.",
    challenge: "Constant chlorine exposure, high humidity, frequent cleaning requirements, and the need to maintain operations during renovation phases.",
    solution: "Applied Pool Paint Chlorinated Rubber for underwater surfaces, used Anti-Condensation Ceiling paint in humid areas, and implemented Epoxy Floor Paint for deck areas.",
    results: "Extended pool surface life by 10 years, improved water quality through better chemical resistance, enhanced safety with non-slip surfaces, and created an attractive facility that increased memberships by 40%.",
    imageUrl: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg",
    beforeImage: "https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg",
    afterImage: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg",
    duration: "2 weeks",
    area: "12,000 sq ft",
    products: JSON.stringify([
      { name: "Pool Paint Chlorinated Rubber - Pool Blue", quantity: "40 liters" },
      { name: "Epoxy Floor Paint - Industrial Grey", quantity: "35 liters" },
      { name: "Anti-Condensation Ceiling", quantity: "25 liters" },
      { name: "Masonry Sealer Paint", quantity: "20 liters" }
    ]),
    testimonial: "The pool looks brand new! The professional coating has held up perfectly against chemicals and heavy use. Our members love the refreshed facility."
  },
  {
    title: "Industrial Kitchen Restaurant Chain",
    slug: "industrial-kitchen-restaurant-chain",
    category: "Commercial",
    client: "Spice Route Restaurants",
    location: "Multiple locations, Punjab",
    description: "Standardized kitchen coating system across 8 restaurant locations requiring food-safe, easy-clean, and heat-resistant solutions.",
    challenge: "Coordinating multiple locations, meeting food safety regulations, working around restaurant operations, and ensuring consistent quality across all sites.",
    solution: "Developed standardized application procedures using Washable Kitchen Paint for walls, Epoxy Floor Paint for flooring, and Heat Resistant Paint for areas near cooking equipment.",
    results: "Achieved food safety compliance across all locations, reduced cleaning time by 40%, improved kitchen aesthetics for staff morale, and created a replicable system for future expansion.",
    imageUrl: "https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg",
    beforeImage: "https://images.pexels.com/photos/2090644/pexels-photo-2090644.jpeg",
    afterImage: "https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg",
    duration: "4 weeks",
    area: "16,000 sq ft",
    products: JSON.stringify([
      { name: "Washable Kitchen Paint - Fresh White", quantity: "120 liters" },
      { name: "Epoxy Floor Paint - Industrial Grey", quantity: "80 liters" },
      { name: "Radiator Paint High Heat - Radiator White", quantity: "15 liters" },
      { name: "Anti-Bacterial Wall Paint - Medical White", quantity: "25 liters" }
    ]),
    testimonial: "Exceptional coordination across multiple sites. All kitchens now meet international standards and the staff appreciates the improved working environment."
  },
  {
    title: "Contemporary Home Theater Room",
    slug: "contemporary-home-theater-room",
    category: "Residential",
    client: "Mr. Tariq Sheikh",
    location: "Defence Housing Authority, Islamabad",
    description: "Custom home theater room featuring acoustic considerations, mood lighting compatibility, and luxury finishes for an immersive entertainment experience.",
    challenge: "Balancing acoustic requirements with aesthetic appeal, ensuring paint compatibility with specialized lighting systems, and creating an intimate yet luxurious atmosphere.",
    solution: "Applied Acoustic Ceiling Paint to maintain sound properties, used Luxury Velvet Finish in deep colors for light absorption, and implemented Metallic Finish Paint for accent details.",
    results: "Created a professional-grade home theater with optimal acoustics and stunning visual appeal. The room has become the centerpiece of family entertainment and impresses guests regularly.",
    imageUrl: "https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg",
    beforeImage: "https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg",
    afterImage: "https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg",
    duration: "5 days",
    area: "400 sq ft",
    products: JSON.stringify([
      { name: "Acoustic Ceiling Paint - Office White", quantity: "3 liters" },
      { name: "Luxury Velvet Finish - Deep Purple", quantity: "6 liters" },
      { name: "Metallic Finish Paint - Gold Metallic", quantity: "1 liter" },
      { name: "Universal Primer", quantity: "4 liters" }
    ]),
    testimonial: "The theater room exceeded all expectations. The acoustics are perfect and the luxury finish makes every movie night feel like a premium cinema experience.",
    featured: true
  },
  {
    title: "Pharmaceutical Manufacturing Facility",
    slug: "pharmaceutical-manufacturing-facility",
    category: "Industrial",
    client: "PharmaLife Industries",
    location: "Korangi Industrial Area, Karachi",
    description: "Clean room and manufacturing facility painting requiring pharmaceutical-grade compliance, anti-bacterial properties, and easy decontamination.",
    challenge: "Meeting FDA and pharmaceutical industry standards, ensuring zero contamination risk, working within sterile environment protocols, and providing easy-clean surfaces.",
    solution: "Applied Anti-Bacterial Wall Paint throughout all areas, used Epoxy Floor Paint with antimicrobial additives, and implemented specialized primer systems for maximum adhesion and hygiene.",
    results: "Achieved pharmaceutical industry compliance certification, passed all FDA inspections, reduced contamination risks to zero, and created a sterile environment that supports drug manufacturing quality standards.",
    imageUrl: "https://images.pexels.com/photos/3952241/pexels-photo-3952241.jpeg",
    beforeImage: "https://images.pexels.com/photos/3985353/pexels-photo-3985353.jpeg",
    afterImage: "https://images.pexels.com/photos/3952241/pexels-photo-3952241.jpeg",
    duration: "3 weeks",
    area: "22,000 sq ft",
    products: JSON.stringify([
      { name: "Anti-Bacterial Wall Paint - Medical White", quantity: "85 liters" },
      { name: "Epoxy Floor Paint - Industrial Grey", quantity: "95 liters" },
      { name: "Anti-Condensation Ceiling", quantity: "40 liters" },
      { name: "Universal Primer", quantity: "60 liters" }
    ]),
    testimonial: "Impeccable attention to compliance requirements. The facility now exceeds international pharmaceutical manufacturing standards. Excellent project execution."
  },
  {
    title: "Children's Playschool Creative Spaces",
    slug: "childrens-playschool-creative-spaces",
    category: "Commercial",
    client: "Little Explorers Playschool",
    location: "Bahria Town, Rawalpindi",
    description: "Fun and educational paint project creating interactive learning environments with safe, washable, and engaging finishes for young children.",
    challenge: "Ensuring child safety with non-toxic materials, creating engaging educational elements, and providing surfaces that could withstand daily cleaning and active play.",
    solution: "Used Eco-Friendly Matt paint throughout, applied Magnetic Chalkboard Paint for interactive learning walls, and created colorful educational murals using child-safe Glow-in-Dark Paint accents.",
    results: "Created an engaging learning environment that stimulates creativity and learning. Parent satisfaction increased dramatically, and the school has become a model for other educational facilities in the area.",
    imageUrl: "https://images.pexels.com/photos/8613092/pexels-photo-8613092.jpeg",
    beforeImage: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg",
    afterImage: "https://images.pexels.com/photos/8613092/pexels-photo-8613092.jpeg",
    duration: "1 week",
    area: "1,800 sq ft",
    products: JSON.stringify([
      { name: "Eco-Friendly Matt - Natural White", quantity: "10 liters" },
      { name: "Eco-Friendly Matt - Soft Yellow", quantity: "6 liters" },
      { name: "Magnetic Chalkboard Paint - Chalkboard Green", quantity: "2 liters" },
      { name: "Glow-in-Dark Paint - Glow Green", quantity: "1 liter" }
    ]),
    testimonial: "The children are so excited about their new learning spaces! The interactive walls have made teaching so much more engaging. Wonderful, safe, and creative solution.",
    featured: true
  }
]

async function main() {
  console.log("🌱 Starting comprehensive seed with products and case studies...")

  // Clear existing data
  await prisma.image.deleteMany()
  await prisma.color.deleteMany()
  await prisma.variant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.caseStudy.deleteMany()

  console.log("🗑️  Cleared existing data")
  // Create case studies
  for (const caseStudyData of caseStudies) {
    const caseStudy = await prisma.caseStudy.create({
      data: {
        title: caseStudyData.title,
        slug: caseStudyData.slug,
        category: caseStudyData.category,
        client: caseStudyData.client,
        location: caseStudyData.location,
        description: caseStudyData.description,
        challenge: caseStudyData.challenge,
        solution: caseStudyData.solution,
        results: caseStudyData.results,
        imageUrl: caseStudyData.imageUrl,
        beforeImage: caseStudyData.beforeImage,
        afterImage: caseStudyData.afterImage,
        duration: caseStudyData.duration,
        area: caseStudyData.area,
        products: caseStudyData.products,
        testimonial: caseStudyData.testimonial,
        featured: caseStudyData.featured || false,
      },
    })

    console.log(`📝 Created case study: ${caseStudy.title}`)
  }
  // Create categories
  for (const categoryData of categories) {
    const category = await prisma.category.create({
      data: {
        name: categoryData.name,
        slug: categoryData.slug,
      },
    })

    console.log(`📁 Created category: ${category.name}`)

    // Create child categories if they exist
    if (categoryData.children) {
      for (const childData of categoryData.children) {
        const childCategory = await prisma.category.create({
          data: {
            name: childData.name,
            slug: childData.slug,
            parentId: category.id,
          },
        })
        console.log(`  📂 Created subcategory: ${childCategory.name}`)
      }
    }
  }

  // Create products
  for (const productData of products) {
    const category = await prisma.category.findUnique({
      where: { slug: productData.categorySlug },
    })

    if (!category) {
      console.error(`❌ Category not found: ${productData.categorySlug}`)
      continue
    }

    const product = await prisma.product.create({
      data: {
        name: productData.name,
        slug: productData.slug,
        description: productData.description,
        categoryId: category.id,
        tags: productData.tags,
        discount: productData.discount,
        featured: productData.featured || false,
      },
    })

    console.log(`🎨 Created product: ${product.name}`)

    // Create variants
    for (const variantData of productData.variants) {
      const variant = await prisma.variant.create({
        data: {
          name: variantData.name,
          sku: variantData.sku,
          price: variantData.price,
          stock: variantData.stock,
          productId: product.id,
        },
      })

      console.log(`  📦 Created variant: ${variant.name}`)

      // Create colors
      for (const colorData of variantData.colors) {
        const color = await prisma.color.create({
          data: {
            name: colorData.name,
            hexCode: colorData.hexCode,
            variantId: variant.id,
          },
        })

        console.log(`    🎨 Created color: ${color.name}`)

        // Create images
        for (const imageData of colorData.images) {
          await prisma.image.create({
            data: {
              url: imageData.url,
              alt: imageData.alt,
              colorId: color.id,
            },
          })
        }
      }
    }
  }

 

  const productCount = await prisma.product.count()
  const caseStudyCount = await prisma.caseStudy.count()

  console.log(`✅ Seed completed successfully!`)
  console.log(`📊 Created ${productCount} products and ${caseStudyCount} case studies`)
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
