'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import type { Project } from '@/lib/projects'
import { getProjectLocale } from '@/lib/projects'
import ProjectCursor from './ProjectCursor'

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const t = useTranslations('projects')
  const locale = useLocale()
  const loc = getProjectLocale(project, locale)
  const [hovered, setHovered] = useState(false)
  const mouseX = useMotionValue(-999)
  const mouseY = useMotionValue(-999)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/projects/${project.slug}`}
        onMouseEnter={(e) => {
          mouseX.set(e.clientX)
          mouseY.set(e.clientY)
          setHovered(true)
        }}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => {
          mouseX.set(e.clientX)
          mouseY.set(e.clientY)
        }}
        className="cursor-none group flex items-center justify-between py-6 md:py-8 border-t transition-all duration-200
          dark:bg-dark bg-off-white
          dark:border-mid-gray/50 border-[#e0e0e0]
          hover:dark:border-mint/30 hover:border-[#aaeec4]/50"
      >
        <div className="flex items-baseline gap-6 md:gap-10 flex-1 min-w-0">
          <span className="text-[11px] tracking-[2px] dark:text-off-white/20 text-mid-gray/40 shrink-0 w-6">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <h3
              className="text-[24px] md:text-[32px] lg:text-[36px] font-medium tracking-[-0.02em] truncate transition-colors duration-200
                dark:text-off-white text-dark
                group-hover:dark:text-mint group-hover:text-[#2a7a4a]"
            >
              {loc.title}
            </h3>
            <p className="text-[13px] font-light mt-1 dark:text-off-white/40 text-mid-gray hidden md:block">
              {loc.description}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 shrink-0 ml-8">
          {project.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.coverImage}
              alt=""
              aria-hidden="true"
              className="w-24 h-16 rounded-lg object-cover shrink-0 grayscale transition-[filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grayscale-0"
            />
          )}
          <span className="text-[12px] font-light dark:text-off-white/30 text-mid-gray/50">{project.year}</span>
          <div className="flex gap-2">
            {loc.tags?.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] tracking-[1px] uppercase px-2 py-1 rounded dark:bg-[#2e2e2e] dark:text-off-white/40 bg-[#f0f0f0] text-mid-gray">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-[16px] transition-transform duration-200 dark:text-mint text-[#2a7a4a] group-hover:translate-x-1">→</span>
        </div>
      </Link>

      {hovered && (
        <p className="sr-only">{t('viewCase')}</p>
      )}

      <ProjectCursor mouseX={mouseX} mouseY={mouseY} visible={hovered} />
    </motion.div>
  )
}
