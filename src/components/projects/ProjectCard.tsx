'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { Project } from '@/lib/projects'

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const t = useTranslations('projects')
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/projects/${project.slug}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
        className="group flex items-center justify-between py-6 md:py-8 border-t transition-all duration-200
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
              {project.title}
            </h3>
            <p className="text-[13px] font-light mt-1 dark:text-off-white/40 text-mid-gray hidden md:block">
              {project.description}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 shrink-0 ml-8">
          <span className="text-[12px] font-light dark:text-off-white/30 text-mid-gray/50">{project.year}</span>
          <div className="flex gap-2">
            {project.tags?.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[10px] tracking-[1px] uppercase px-2 py-1 rounded dark:bg-[#2e2e2e] dark:text-off-white/40 bg-[#f0f0f0] text-mid-gray">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-[16px] transition-transform duration-200 dark:text-mint text-[#2a7a4a] group-hover:translate-x-1">→</span>
        </div>
      </Link>

      <AnimatePresence>
        {hovered && project.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="pointer-events-none fixed z-50 w-64 h-40 rounded-xl overflow-hidden shadow-2xl"
            style={{ left: mousePos.x + 20, top: mousePos.y - 80 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.coverImage} alt="" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>

      {hovered && (
        <p className="sr-only">{t('viewCase')}</p>
      )}
    </motion.div>
  )
}
