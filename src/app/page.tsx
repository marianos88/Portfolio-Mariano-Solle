import Hero from '@/components/home/Hero'
import AboutSection from '@/components/home/AboutSection'
import ProjectList from '@/components/home/ProjectList'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero in normal document flow */}
      <Hero />
      {/* About sticks below the navbar; Projects scrolls over it */}
      <div className="sticky top-16 z-20 min-h-[100dvh]">
        <AboutSection />
      </div>
      {/* Projects in normal flow, higher z-index to cover sticky About */}
      <div className="relative z-30">
        <ProjectList />
      </div>
    </div>
  )
}
