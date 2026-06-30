import Hero from '@/components/home/Hero'
import ProjectList from '@/components/home/ProjectList'

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero is sticky so project list slides over it */}
      <div className="sticky top-0 z-0">
        <Hero />
      </div>
      {/* Project list rises over the hero with rounded top corners */}
      <div className="relative z-10 -mt-16">
        <ProjectList />
      </div>
    </div>
  )
}
