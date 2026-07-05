'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { getPublicProjects, getProjectLocale } from '@/lib/projects'

export default function BentoGrid() {
  const t = useTranslations('bentoGrid')
  const locale = useLocale()
  const projects = getPublicProjects()
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="px-6 pb-20 max-w-6xl mx-auto">
      <p className="text-[11px] tracking-[2px] uppercase mb-6 font-light dark:text-off-white/60 text-mid-gray">
        {t('sectionTag')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {projects.map((project, i) => {
          const loc = getProjectLocale(project, locale)
          return (
            <motion.div
              key={project.slug}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={project.featured ? 'md:col-span-2' : ''}
            >
              <Link href={`/projects/${project.slug}`} className="group block h-full">
                <div
                  className="h-full rounded-xl overflow-hidden border transition-all duration-200
                    group-hover:translate-y-[-2px] group-hover:shadow-lg
                    dark:bg-[#2e2e2e] dark:border-mid-gray
                    bg-white border-[#e0e0e0]"
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ height: project.featured ? '360px' : '220px' }}
                  >
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={loc.title}
                        fill
                        sizes={project.featured ? '(max-width: 768px) 100vw, 1152px' : '(max-width: 768px) 100vw, 576px'}
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        priority={i < 2}
                      />
                    ) : (
                      <div className="w-full h-full dark:bg-[#3a3a3a] bg-[#f0f0f0] flex items-center justify-center">
                        <span className="text-[11px] tracking-[2px] uppercase dark:text-off-white/20 text-mid-gray/30">
                          {loc.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 border-t dark:border-mid-gray border-[#e0e0e0]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] tracking-[2px] uppercase mb-1 dark:text-mint text-[#2a7a4a]">
                          {loc.category}
                        </p>
                        <h3 className="text-[16px] font-medium leading-snug dark:text-off-white text-dark">
                          {loc.title}
                        </h3>
                        <p className="text-[13px] font-light mt-1 dark:text-off-white/50 text-mid-gray">
                          {loc.description}
                        </p>
                      </div>
                      <span aria-hidden="true" className="text-[18px] mt-1 dark:text-mint text-[#2a7a4a] group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>

                    {loc.tags && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {loc.tags.map((tag) => (
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
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/projects"
          className="text-[13px] font-light tracking-wide transition-theme hover:opacity-70 dark:text-off-white/60 text-mid-gray"
        >
          {t('viewAll')} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
