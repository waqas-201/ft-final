import { BestPaintsSection } from "@/components/best-paints-section";
import { BrandShowcase } from "@/components/brand-showcase";
import { ColorInnovationSection } from "@/components/color-innovation-section";
import { CTASection } from "@/components/cta-section";
import { FeaturedProducts } from "@/components/featured-products";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { IndustryExpertiseSection } from "@/components/industry-expertise-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { PaintCalculatorSection } from "@/components/paint-calculator-section";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { TestimonialsSection } from "@/components/testimonials-section";


export default function HomePage() {
  return (
      <div className="min-h-screen bg-background">
        <main className="flex flex-col items-center">
          <HeroSection />
          
            
        <div className="md:w-[80%] w-[95%]">

            <FeaturesSection />
            <BrandShowcase />
            <IndustryExpertiseSection />
            <FeaturedProducts />
            <ColorInnovationSection/>
           <TestimonialsSection  />
           <PaintCalculatorSection />
           {/* <BestPaintsSection /> */}
           {/* <CTASection /> */}
           <NewsletterSection />
          </div>

        </main>
      </div>
  )
}
