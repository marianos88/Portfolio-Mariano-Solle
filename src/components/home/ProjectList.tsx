'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { getPublicProjects } from '@/lib/projects'
import ProjectListItem from './ProjectListItem'
import PortfolioPlusCard from './PortfolioPlusCard'

export default function ProjectList() {
  const t = useTranslations('bentoGrid')
  const projects = getPublicProjects()

  return (
    <section className="max-w-6xl mx-auto px-6 pb-32">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[11px] tracking-[2px] uppercase mb-2 font-light dark:text-off-white/30 text-mid-gray/50"
      >
        {t('sectionTag')}
      </motion.p>

      <div>
        {projects.map((project, i) => (
          <ProjectListItem key={project.slug} project={project} index={i} />
        ))}
        {/* Portfolio Plus always last — never reveals NDA content */}
        <PortfolioPlusCard index={projects.length} />
        {/* Bottom border */}
        <div className="border-t dark:border-mid-gray/50 border-[#e0e0e0]" />
      </div>
    </section>
  )
}
