'use client'

import { useTranslations } from 'next-intl'
import { getPublicProjects } from '@/lib/projects'
import ProjectListItem from './ProjectListItem'
import PortfolioPlusCard from './PortfolioPlusCard'
import { STACK_OFFSET } from '@/lib/layout'

// Home page section sits below the hero — no navbar offset needed here.
// Cards stack relative to the section scroll, not the viewport top.
const SECTION_STACK_TOP = 24

export default function ProjectList() {
  const t = useTranslations('bentoGrid')
  const projects = getPublicProjects()
  const total = projects.length + 1 // +1 for PortfolioPlusCard

  return (
    <section
      className="w-full rounded-t-[40px] dark:bg-dark bg-off-white pb-32 pt-12
        shadow-[0_-4px_40px_rgba(0,0,0,0.12)]"
    >
      <div className="max-w-6xl mx-auto px-8">
        <p className="text-[11px] tracking-[2px] uppercase mb-2 font-light dark:text-off-white/30 text-mid-gray/50">
          {t('sectionTag')}
        </p>

        <div>
          {projects.map((project, i) => (
            <div
              key={project.slug}
              style={{ position: 'sticky', top: SECTION_STACK_TOP + i * STACK_OFFSET, zIndex: i + 1 }}
            >
              <ProjectListItem project={project} index={i} />
            </div>
          ))}
          <div style={{ position: 'sticky', top: SECTION_STACK_TOP + projects.length * STACK_OFFSET, zIndex: projects.length + 1 }}>
            <PortfolioPlusCard index={projects.length} />
          </div>
          <div className="border-t dark:border-mid-gray/50 border-[#e0e0e0]" />
        </div>
      </div>
    </section>
  )
}
