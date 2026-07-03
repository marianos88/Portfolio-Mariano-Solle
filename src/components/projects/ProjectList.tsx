'use client'

import { useRef, useState } from 'react'
import { useScroll, useMotionValue } from 'framer-motion'
import type { Project } from '@/lib/projects'
import StickyProjectCard from './StickyProjectCard'
import ProjectCursor from './ProjectCursor'

export default function ProjectList({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Tracks container progress through the viewport: 0 = top aligned, 1 = bottom aligned
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const [cursorVisible, setCursorVisible] = useState(false)
  // MotionValues so mouse tracking doesn't trigger re-renders
  const mouseX = useMotionValue(-999)
  const mouseY = useMotionValue(-999)

  // Container height: (n + 1) × 100vh.
  // This gives each card one full viewport of scroll budget, with one extra
  // viewport at the end to keep the last card visible before the footer enters.
  const containerHeight = `calc(${projects.length + 1} * 100vh)`

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight }}
    >
      {/* Sticky viewport — clips incoming cards and hosts the cursor */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        onMouseMove={(e) => {
          mouseX.set(e.clientX)
          mouseY.set(e.clientY)
        }}
        onMouseLeave={() => setCursorVisible(false)}
      >
        <ProjectCursor mouseX={mouseX} mouseY={mouseY} visible={cursorVisible} />

        {projects.map((project, i) => (
          <StickyProjectCard
            key={project.slug}
            project={project}
            index={i}
            total={projects.length}
            scrollYProgress={scrollYProgress}
            onHoverChange={setCursorVisible}
          />
        ))}
      </div>
    </div>
  )
}
