import Hero from '@/components/home/Hero'
import AboutSection from '@/components/home/AboutSection'
import ProjectList from '@/components/home/ProjectList'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero sticks at top while About scrolls over it */}
      <div className="sticky top-0 z-10">
        <Hero />
      </div>
      {/* About sticks above Hero; min-h-[100dvh] ensures scroll distance */}
      <div className="sticky top-0 z-20 min-h-[100dvh]">
        <AboutSection />
      </div>
      {/* Project list rises over both stacked sections */}
      <div className="relative z-30 -mt-16">
        <ProjectList />
      </div>
    </div>
  )
}
