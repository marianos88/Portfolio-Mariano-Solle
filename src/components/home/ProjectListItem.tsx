'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/lib/projects'

export default function ProjectListItem({
  project,
  index,
}: {
  project: Project
  index: number
}) {
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
          {/* Index */}
          <span className="text-[11px] tracking-[2px] dark:text-off-white/20 text-mid-gray/40 shrink-0 w-6">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title */}
          <h3
            className="text-[24px] md:text-[32px] lg:text-[36px] font-medium tracking-[-0.02em] truncate transition-colors duration-200
              dark:text-off-white text-dark
              group-hover:dark:text-mint group-hover:text-[#2a7a4a]"
          >
            {project.title}
          </h3>
        </div>

        <div className="hidden md:flex items-center gap-8 shrink-0 ml-8">
          {/* Year */}
          <span className="text-[12px] font-light dark:text-off-white/30 text-mid-gray/50">
            {project.year}
          </span>

          {/* Tags */}
          <div className="flex items-center gap-2">
            {project.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[1px] uppercase px-2 py-1 rounded
                  dark:bg-[#2e2e2e] dark:text-off-white/40
                  bg-[#f0f0f0] text-mid-gray"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <span className="text-[16px] transition-transform duration-200 dark:text-mint text-[#2a7a4a] group-hover:translate-x-1">
            →
          </span>
        </div>
      </Link>

      {/* Floating image preview */}
      <AnimatePresence>
        {hovered && project.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="pointer-events-none fixed z-50 w-64 h-40 rounded-xl overflow-hidden shadow-2xl"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y - 80,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
        {hovered && !project.coverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed z-50 w-64 h-40 rounded-xl overflow-hidden shadow-2xl
              dark:bg-[#2e2e2e] bg-[#f0f0f0]
              flex items-center justify-center"
            style={{ left: mousePos.x + 20, top: mousePos.y - 80 }}
          >
            <span className="text-[11px] tracking-[2px] uppercase dark:text-off-white/20 text-mid-gray/30">
              {project.category}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
