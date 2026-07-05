'use client'

import { useTranslations } from 'next-intl'
import { getPublicProjects } from '@/lib/projects'
import ProjectListItem from './ProjectListItem'
import PortfolioPlusCard from './PortfolioPlusCard'

export default function ProjectList() {
  const t = useTranslations('bentoGrid')
  const projects = getPublicProjects()

  return (
    <section
      className="w-full rounded-t-[40px] dark:bg-dark bg-off-white pb-32 pt-12
        shadow-[0_-4px_40px_rgba(0,0,0,0.12)]"
    >
      <div className="max-w-6xl mx-auto px-8">
        <p className="text-[11px] tracking-[2px] uppercase mb-2 font-light dark:text-off-white/60 text-mid-gray">
          {t('sectionTag')}
        </p>

        <div>
          {projects.map((project, i) => (
            <ProjectListItem key={project.slug} project={project} index={i} />
          ))}
          {/* Portfolio Plus always last — never reveals NDA content */}
          <PortfolioPlusCard index={projects.length} />
          {/* Bottom border */}
          <div className="border-t dark:border-mid-gray/50 border-[#e0e0e0]" />
        </div>
      </div>
    </section>
  )
}
