'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Project, ProjectSection } from '@/lib/projects'
import VideoPlayer from './VideoPlayer'

const ease = [0.22, 1, 0.36, 1] as const

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>
      {/* ── Hero cover ── */}
      <div className="relative w-full h-[60vh] min-h-[420px] overflow-hidden dark:bg-[#1a1a1a] bg-[#e8e8e8]">
        {project.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 dark:bg-dark/40 bg-dark/10" />
      </div>

      {/* ── Header ── */}
      <div className="max-w-6xl mx-auto px-6 pt-16">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[11px] tracking-[2px] uppercase mb-4 font-light dark:text-mint text-[#2a7a4a]"
        >
          {project.category}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          className="text-[48px] md:text-[64px] lg:text-[80px] font-medium tracking-[-0.025em] leading-[1.0] mb-10 dark:text-off-white text-dark"
        >
          {project.title}
        </motion.h1>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-x-10 gap-y-4 pb-10 border-b dark:border-mid-gray/30 border-[#e0e0e0]"
        >
          {project.role && (
            <div>
              <p className="text-[10px] tracking-[2px] uppercase mb-1 dark:text-off-white/30 text-mid-gray/50">Role</p>
              <p className="text-[13px] font-light dark:text-off-white/70 text-mid-gray">{project.role}</p>
            </div>
          )}
          {project.scope && project.scope.length > 0 && (
            <div>
              <p className="text-[10px] tracking-[2px] uppercase mb-1 dark:text-off-white/30 text-mid-gray/50">Scope</p>
              <p className="text-[13px] font-light dark:text-off-white/70 text-mid-gray">{project.scope.join(' · ')}</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* ── Challenge (always shown) ── */}
      {project.challenge && (
        <FadeSection delay={0.2}>
          <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[200px_1fr] gap-10">
            <SectionLabel>Challenge</SectionLabel>
            <p className="text-[20px] md:text-[24px] font-light leading-[1.6] dark:text-off-white/90 text-dark">
              {project.challenge}
            </p>
          </div>
        </FadeSection>
      )}

      {/* ── Flexible sections (MercadoPago, future projects) ── */}
      {project.sections && project.sections.length > 0 && (
        <>
          <Divider />
          {project.sections.map((section, i) => (
            <SectionRenderer key={i} section={section} coverImage={project.coverImage} />
          ))}
        </>
      )}

      {/* ── Legacy layout (SportClub) ── */}
      {!project.sections && (
        <LegacyLayout project={project} />
      )}

      {/* ── Footer nav ── */}
      <div className="max-w-6xl mx-auto px-6 py-20 mt-8 flex justify-between items-center border-t dark:border-mid-gray/30 border-[#e0e0e0]">
        <Link
          href="/projects"
          className="text-[13px] font-light dark:text-off-white/40 text-mid-gray hover:dark:text-off-white hover:text-dark transition-colors"
        >
          ← All projects
        </Link>
        <span className="text-[11px] tracking-[2px] uppercase dark:text-off-white/20 text-mid-gray/40">
          {project.category}
        </span>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────────
   Section renderer — handles all section types
───────────────────────────────────────────── */
function SectionRenderer({ section, coverImage }: { section: ProjectSection; coverImage?: string }) {
  if (section.type === 'divider') {
    return <Divider />
  }

  if (section.type === 'image') {
    return (
      <FadeSection>
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={section.src} alt={section.alt ?? ''} className="w-full rounded-xl object-cover" />
        </div>
      </FadeSection>
    )
  }

  if (section.type === 'video') {
    return (
      <>
        <Divider />
        <FadeSection>
          <div className="max-w-6xl mx-auto px-6 py-16">
            {section.label && (
              <p className="text-[11px] tracking-[2px] uppercase mb-6 dark:text-off-white/30 text-mid-gray/50">
                {section.label}
              </p>
            )}
            <VideoPlayer src={section.src} poster={section.poster ?? coverImage} />
          </div>
        </FadeSection>
      </>
    )
  }

  if (section.type === 'text') {
    return (
      <>
        <Divider />
        <FadeSection>
          <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[200px_1fr] gap-10">
            <SectionLabel>{section.label}</SectionLabel>
            <p className="text-[15px] font-light leading-[1.8] dark:text-off-white/60 text-mid-gray max-w-2xl">
              {section.content}
            </p>
          </div>
        </FadeSection>
      </>
    )
  }

  if (section.type === 'twoCol') {
    return (
      <FadeSection>
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
          <div>
            <SectionLabel>{section.col1Label}</SectionLabel>
            <p className="mt-4 text-[15px] font-light leading-[1.8] dark:text-off-white/60 text-mid-gray">
              {section.col1Content}
            </p>
          </div>
          <div>
            <SectionLabel>{section.col2Label}</SectionLabel>
            <p className="mt-4 text-[15px] font-light leading-[1.8] dark:text-off-white/60 text-mid-gray">
              {section.col2Content}
            </p>
          </div>
        </div>
      </FadeSection>
    )
  }

  if (section.type === 'grid') {
    return (
      <FadeSection>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <SectionLabel>{section.label}</SectionLabel>
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {section.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="p-5 rounded-xl dark:bg-[#1e1e1e] bg-[#f5f5f5] border dark:border-mid-gray/20 border-[#e8e8e8]"
              >
                <p className="text-[13px] font-medium mb-2 dark:text-off-white text-dark">{item.title}</p>
                {item.description && (
                  <p className="text-[12px] font-light leading-[1.6] dark:text-off-white/50 text-mid-gray/70">
                    {item.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </FadeSection>
    )
  }

  if (section.type === 'list') {
    return (
      <FadeSection>
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[200px_1fr] gap-10">
          <SectionLabel>{section.label}</SectionLabel>
          <div>
            {section.intro && (
              <p className="text-[15px] font-light leading-[1.8] dark:text-off-white/60 text-mid-gray mb-6 max-w-2xl">
                {section.intro}
              </p>
            )}
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-start gap-3 text-[14px] font-light leading-[1.7] dark:text-off-white/70 text-mid-gray"
                >
                  <span className="dark:text-mint text-[#2a7a4a] mt-[3px] shrink-0">→</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </FadeSection>
    )
  }

  if (section.type === 'stats') {
    return (
      <FadeSection>
        <div className="max-w-6xl mx-auto px-6 py-16">
          {section.label && <SectionLabel>{section.label}</SectionLabel>}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {section.items.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <p className="text-[52px] md:text-[64px] font-medium tracking-[-0.03em] leading-none mb-2 dark:text-mint text-[#2a7a4a]">
                  {s.value}
                </p>
                <p className="text-[12px] font-light dark:text-off-white/40 text-mid-gray/60">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </FadeSection>
    )
  }

  return null
}

/* ─────────────────────────────────────────────
   Legacy layout kept for SportClub backward compat
───────────────────────────────────────────── */
function LegacyLayout({ project }: { project: Project }) {
  return (
    <>
      {project.context && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[200px_1fr] gap-10">
              <SectionLabel>Contexto</SectionLabel>
              <p className="text-[15px] font-light leading-[1.8] dark:text-off-white/60 text-mid-gray max-w-2xl">
                {project.context}
              </p>
            </div>
          </FadeSection>

          {project.research && (
            <FadeSection>
              <div className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-[200px_1fr] gap-10">
                <div />
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <p className="text-[11px] tracking-[2px] uppercase mb-4 dark:text-off-white/30 text-mid-gray/50">¿Cómo investigamos?</p>
                    <p className="text-[14px] font-light leading-[1.8] dark:text-off-white/60 text-mid-gray">{project.research.how}</p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[2px] uppercase mb-4 dark:text-off-white/30 text-mid-gray/50">Objetivo</p>
                    <p className="text-[14px] font-light leading-[1.8] dark:text-off-white/60 text-mid-gray">{project.research.objective}</p>
                  </div>
                </div>
              </div>
            </FadeSection>
          )}

          {project.researchImage && (
            <FadeSection>
              <div className="max-w-6xl mx-auto px-6 pb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.researchImage} alt="" className="w-full rounded-xl object-cover" />
              </div>
            </FadeSection>
          )}
        </>
      )}

      {project.researchStats && project.researchStats.length > 0 && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16">
              <p className="text-[11px] tracking-[2px] uppercase mb-10 dark:text-off-white/30 text-mid-gray/50">Perfil de usuarios investigados</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {project.researchStats.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}>
                    <p className="text-[52px] md:text-[64px] font-medium tracking-[-0.03em] leading-none mb-2 dark:text-mint text-[#2a7a4a]">{s.value}</p>
                    <p className="text-[12px] font-light dark:text-off-white/40 text-mid-gray/60">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeSection>
        </>
      )}

      {project.obstacles && project.obstacles.length > 0 && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[200px_1fr] gap-10">
              <SectionLabel>Obstáculos detectados</SectionLabel>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.obstacles.map((obs, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="p-5 rounded-xl dark:bg-[#1e1e1e] bg-[#f5f5f5] border dark:border-mid-gray/20 border-[#e8e8e8]">
                    <p className="text-[14px] font-light leading-[1.6] dark:text-off-white/70 text-mid-gray italic">{obs}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeSection>
          {project.obstaclesImage && (
            <FadeSection>
              <div className="max-w-6xl mx-auto px-6 pb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.obstaclesImage} alt="" className="w-full rounded-xl object-cover" />
              </div>
            </FadeSection>
          )}
        </>
      )}

      {project.process && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[200px_1fr] gap-10">
              <SectionLabel>Proceso</SectionLabel>
              <p className="text-[15px] font-light leading-[1.8] dark:text-off-white/60 text-mid-gray max-w-2xl">{project.process}</p>
            </div>
          </FadeSection>
          {project.processImage && (
            <FadeSection>
              <div className="max-w-6xl mx-auto px-6 pb-16">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.processImage} alt="" className="w-full rounded-xl object-cover" />
              </div>
            </FadeSection>
          )}
        </>
      )}

      {project.stats && project.stats.length > 0 && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16">
              <p className="text-[11px] tracking-[2px] uppercase mb-10 dark:text-off-white/30 text-mid-gray/50">Datos clave</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {project.stats.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}>
                    <p className="text-[52px] md:text-[64px] font-medium tracking-[-0.03em] leading-none mb-2 dark:text-mint text-[#2a7a4a]">{s.value}</p>
                    <p className="text-[12px] font-light dark:text-off-white/40 text-mid-gray/60">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeSection>
        </>
      )}

      {project.result && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[200px_1fr] gap-10">
              <SectionLabel>Resultado</SectionLabel>
              <p className="text-[20px] md:text-[24px] font-light leading-[1.6] dark:text-off-white/90 text-dark max-w-2xl">{project.result}</p>
            </div>
          </FadeSection>
        </>
      )}

      {project.quotes && project.quotes.length > 0 && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16">
              <p className="text-[11px] tracking-[2px] uppercase mb-10 dark:text-off-white/30 text-mid-gray/50">Voz de los usuarios</p>
              <div className="grid md:grid-cols-3 gap-6">
                {project.quotes.map((q, i) => (
                  <motion.blockquote key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="p-6 rounded-xl dark:bg-[#1e1e1e] bg-[#f5f5f5] border dark:border-mid-gray/20 border-[#e8e8e8]">
                    <p className="text-[14px] font-light leading-[1.7] dark:text-off-white/70 text-mid-gray italic mb-4">&ldquo;{q}&rdquo;</p>
                    <p className="text-[10px] tracking-[2px] uppercase dark:text-off-white/20 text-mid-gray/40">Usuario testeado</p>
                  </motion.blockquote>
                ))}
              </div>
            </div>
          </FadeSection>
        </>
      )}

      {project.conclusion && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[200px_1fr] gap-10">
              <SectionLabel>Conclusión</SectionLabel>
              <div>
                <p className="text-[11px] tracking-[2px] uppercase mb-4 dark:text-mint/70 text-[#2a7a4a]">Resultados</p>
                <p className="text-[15px] font-light leading-[1.8] dark:text-off-white/60 text-mid-gray max-w-2xl">{project.conclusion}</p>
              </div>
            </div>
          </FadeSection>
        </>
      )}

      {project.videoSrc && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16">
              <p className="text-[11px] tracking-[2px] uppercase mb-6 dark:text-off-white/30 text-mid-gray/50">Prototipo en acción</p>
              <VideoPlayer src={project.videoSrc} poster={project.coverImage} />
            </div>
          </FadeSection>
        </>
      )}

      {project.figmaEmbed && (
        <>
          <Divider />
          <div className="max-w-6xl mx-auto px-6 py-16">
            <p className="text-[11px] tracking-[2px] uppercase mb-6 dark:text-off-white/30 text-mid-gray/50">Prototipo interactivo</p>
            <div className="aspect-video w-full rounded-xl overflow-hidden">
              <iframe src={project.figmaEmbed} allowFullScreen className="w-full h-full border-0" />
            </div>
          </div>
        </>
      )}
    </>
  )
}

/* ── Helpers ── */
function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] tracking-[2px] uppercase dark:text-off-white/30 text-mid-gray/50 pt-1 shrink-0">
      {children}
    </p>
  )
}

function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="border-t dark:border-mid-gray/20 border-[#e8e8e8]" />
    </div>
  )
}
