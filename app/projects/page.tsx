import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { ProjectsHero } from "@/components/projects-hero"
import { ProjectsGrid } from "@/components/projects-grid"
import { ProjectStats } from "@/components/project-stats"
import { CaseStudiesSection } from "@/components/case-studies-section"

export default function ProjectsPage() {
  return (
      <div className="min-h-screen bg-background">
        <main>
          <ProjectsHero />
          <div className="bg-muted/20">
            <ProjectStats />
          </div>
          <ProjectsGrid />
          <div className="bg-muted/30">
            <CaseStudiesSection />
          </div>
        </main>
      </div>
    
  )
}
