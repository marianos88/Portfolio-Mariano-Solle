import Hero from '@/components/home/Hero'
import AboutSection from '@/components/home/AboutSection'
import ProjectList from '@/components/home/ProjectList'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero is sticky so content slides over it */}
      <div className="sticky top-0 z-0">
        <Hero />
      </div>
      {/* About slides over the hero */}
      <div className="relative z-[5]">
        <AboutSection />
      </div>
      {/* Project list rises over the about section with rounded top corners */}
      <div className="relative z-10 -mt-16">
        <ProjectList />
      </div>
    </div>
  )
}
