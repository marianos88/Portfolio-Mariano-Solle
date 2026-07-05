'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, useMotionValue, useReducedMotion } from 'framer-motion'
import { useLocale } from 'next-intl'
import type { Project } from '@/lib/projects'
import { getProjectLocale } from '@/lib/projects'
import ProjectCursor from '@/components/projects/ProjectCursor'

export default function ProjectListItem({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const locale = useLocale()
  const loc = getProjectLocale(project, locale)
  const [hovered, setHovered] = useState(false)
  const mouseX = useMotionValue(-999)
  const mouseY = useMotionValue(-999)
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
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
        className="group flex items-center justify-between py-6 md:py-8 border-t transition-all duration-200
          dark:border-mid-gray/50 border-[#e0e0e0]
          hover:dark:border-mint/30 hover:border-[#aaeec4]/50"
        style={{ cursor: hovered ? 'none' : undefined }}
      >
        <div className="flex items-center gap-6 md:gap-10 flex-1 min-w-0">
          <span aria-hidden="true" className="text-[11px] tracking-[2px] dark:text-off-white/50 text-mid-gray shrink-0 w-6">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3
            className="text-[24px] md:text-[32px] lg:text-[36px] font-medium tracking-[-0.02em] truncate transition-colors duration-200
              dark:text-off-white text-dark
              group-hover:dark:text-mint group-hover:text-[#2a7a4a]"
          >
            {loc.title}
          </h3>
        </div>

        <div className="hidden md:flex items-center gap-6 shrink-0 ml-8">
          {project.coverImage && (
            <div className="relative w-16 h-11 rounded-md overflow-hidden shrink-0">
              <Image
                src={project.coverImage}
                alt=""
                fill
                sizes="64px"
                className={`object-cover transition-all duration-500 ${
                  hovered ? 'grayscale-0 scale-105' : 'grayscale'
                }`}
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            {loc.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[1px] uppercase px-2 py-1 rounded
                  dark:bg-[#2e2e2e] dark:text-off-white/60
                  bg-[#f0f0f0] text-mid-gray"
              >
                {tag}
              </span>
            ))}
          </div>
          <span aria-hidden="true" className="text-[16px] transition-transform duration-200 dark:text-mint text-[#2a7a4a] group-hover:translate-x-1">
            →
          </span>
        </div>
      </Link>

      <ProjectCursor mouseX={mouseX} mouseY={mouseY} visible={hovered} />
    </motion.div>
  )
}
