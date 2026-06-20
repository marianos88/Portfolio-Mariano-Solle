'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { Project } from '@/lib/projects'

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const t = useTranslations('projects')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="rounded-xl overflow-hidden border transition-all duration-200
          group-hover:translate-y-[-2px] group-hover:shadow-lg
          dark:bg-[#2e2e2e] dark:border-mid-gray
          bg-white border-[#e0e0e0]">
          <div className="h-[240px] w-full overflow-hidden">
            {project.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="w-full h-full dark:bg-[#3a3a3a] bg-[#f0f0f0] flex items-center justify-center">
                <span className="text-[11px] tracking-[2px] uppercase dark:text-off-white/20 text-mid-gray/30">
                  {project.category}
                </span>
              </div>
            )}
          </div>

          <div className="p-5 border-t dark:border-mid-gray border-[#e0e0e0]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] tracking-[2px] uppercase mb-1 dark:text-mint text-[#2a7a4a]">
                  {project.category}
                </p>
                <h3 className="text-[16px] font-medium dark:text-off-white text-dark">
                  {project.title}
                </h3>
                <p className="text-[13px] font-light mt-1 dark:text-off-white/50 text-mid-gray">
                  {project.description}
                </p>
              </div>
              <span className="text-[18px] mt-1 dark:text-mint text-[#2a7a4a] group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>

            {project.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[1px] uppercase px-2 py-1 rounded
                      dark:bg-[#3a3a3a] dark:text-off-white/40
                      bg-[#f0f0f0] text-mid-gray"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p className="text-[12px] mt-4 dark:text-mint text-[#2a7a4a] font-medium">
              {t('viewCase')} →
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
