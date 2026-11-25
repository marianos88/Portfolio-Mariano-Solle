'use client'

import { useEffect, useId } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import type { Project, ProjectSection, ProjectLocale, SectionImage, Stat } from '@/lib/projects'
import { getProjectLocale } from '@/lib/projects'
import VideoPlayer from './VideoPlayer'
import LockButton from '@/components/portfolio-plus/LockButton'
import { track } from '@/lib/analytics'

const ease = [0.22, 1, 0.36, 1] as const

export default function ProjectDetail({ project }: { project: Project }) {
  const locale = useLocale()
  const loc = getProjectLocale(project, locale)

  useEffect(() => {
    if (project.visibility === 'portfolio-plus') {
      track({ name: 'portfolio_plus_case_view', case_slug: project.slug })
    } else {
      track({ name: 'project_view', project_slug: project.slug })
    }
  }, [project.slug, project.visibility])

  const isEditorial = project.layout === 'editorial'

  return (
    <article>
      {isEditorial ? (
        <EditorialHero loc={loc} />
      ) : (
      <>
      {/* ── Hero cover ── */}
      <div className="relative w-full h-[60vh] min-h-[420px] overflow-hidden dark:bg-[#1a1a1a] bg-[#e8e8e8]">
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt={loc.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
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
          {loc.category}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          className="text-[48px] md:text-[64px] lg:text-[80px] font-medium tracking-[-0.025em] leading-[1.0] mb-10 dark:text-off-white text-dark"
        >
          {loc.title}
        </motion.h1>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-x-10 gap-y-4 pb-10 border-b dark:border-mid-gray/30 border-[#e0e0e0]"
        >
          {loc.role && (
            <div>
              <p className="text-[10px] tracking-[2px] uppercase mb-1 dark:text-off-white/60 text-mid-gray">Role</p>
              <p className="text-[13px] font-light dark:text-off-white/70 text-mid-gray">{loc.role}</p>
            </div>
          )}
          {loc.scope && loc.scope.length > 0 && (
            <div>
              <p className="text-[10px] tracking-[2px] uppercase mb-1 dark:text-off-white/60 text-mid-gray">Scope</p>
              <p className="text-[13px] font-light dark:text-off-white/70 text-mid-gray">{loc.scope.join(' · ')}</p>
            </div>
          )}
        </motion.div>
      </div>
      </>
      )}

      {/* ── Challenge (always shown) ── */}
      {loc.challenge && (
        <FadeSection delay={0.2}>
          <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[200px_1fr] gap-10">
            <SectionLabel>Challenge</SectionLabel>
            <p className="text-[20px] md:text-[24px] font-light leading-[1.6] dark:text-off-white/90 text-dark">
              {loc.challenge}
            </p>
          </div>
        </FadeSection>
      )}

      {/* ── Flexible sections ── */}
      {loc.sections && loc.sections.length > 0 && (
        <>
          {!isEditorial && <Divider />}
          {loc.sections.map((section, i) => (
            <SectionRenderer key={i} section={section} coverImage={project.coverImage} />
          ))}
        </>
      )}

      {/* ── Legacy layout (SportClub / NDA) ── */}
      {!loc.sections && (
        <LegacyLayout loc={loc} coverImage={project.coverImage} figmaEmbed={project.figmaEmbed} />
      )}

      {/* ── Footer nav ── */}
      <div className="max-w-6xl mx-auto px-6 py-20 mt-8 flex justify-between items-center border-t dark:border-mid-gray/30 border-[#e0e0e0]">
        {project.visibility === 'portfolio-plus' ? (
          <Link
            href="/portfolio-plus"
            className="text-[13px] font-light dark:text-off-white/40 text-mid-gray hover:dark:text-off-white hover:text-dark transition-colors"
          >
            ← Portfolio Plus
          </Link>
        ) : (
          <Link
            href="/projects"
            className="text-[13px] font-light dark:text-off-white/40 text-mid-gray hover:dark:text-off-white hover:text-dark transition-colors"
          >
            ← All projects
          </Link>
        )}
        {project.visibility === 'portfolio-plus' ? (
          <LockButton />
        ) : (
          <span className="text-[11px] tracking-[2px] uppercase dark:text-off-white/20 text-mid-gray/40">
            {loc.category}
          </span>
        )}
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────────
   Section renderer — handles all section types
───────────────────────────────────────────── */
function SectionRenderer({ section, coverImage }: { section: ProjectSection; coverImage?: string }) {
  if (
    section.type === 'intro' ||
    section.type === 'split' ||
    section.type === 'feature' ||
    section.type === 'steps' ||
    section.type === 'insights'
  ) {
    return <EditorialSection section={section} />
  }

  if (section.type === 'divider') {
    return <Divider />
  }

  if (section.type === 'heading') {
    const sizeClass =
      section.size === 'lg'
        ? 'text-[32px] md:text-[40px]'
        : section.size === 'sm'
        ? 'text-[16px]'
        : 'text-[22px] md:text-[28px]'
    return (
      <FadeSection>
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h2
            className={`${sizeClass} font-medium tracking-[-0.02em] dark:text-off-white text-dark`}
          >
            {section.text}
          </h2>
        </div>
      </FadeSection>
    )
  }

  if (section.type === 'image') {
    const wrapClass =
      section.size === 'medium'
        ? 'max-w-2xl mx-auto w-full'
        : section.size === 'small'
          ? 'max-w-[336px] mx-auto w-full'
          : 'w-full'
    return (
      <FadeSection>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Image
            src={section.src}
            alt={section.alt ?? ''}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, 1152px"
            className={`${wrapClass} h-auto rounded-xl`}
            style={{ width: '100%', height: 'auto' }}
          />
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
            <VideoPlayer
              src={section.src}
              poster={section.poster ?? coverImage}
              orientation={section.orientation}
            />
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
   Legacy layout kept for SportClub / NDA backward compat
───────────────────────────────────────────── */
function LegacyLayout({
  loc,
  coverImage,
  figmaEmbed,
}: {
  loc: ProjectLocale
  coverImage?: string
  figmaEmbed?: string
}) {
  return (
    <>
      {loc.context && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[200px_1fr] gap-10">
              <SectionLabel>Contexto</SectionLabel>
              <p className="text-[15px] font-light leading-[1.8] dark:text-off-white/60 text-mid-gray max-w-2xl">
                {loc.context}
              </p>
            </div>
          </FadeSection>

          {loc.research && (
            <FadeSection>
              <div className="max-w-6xl mx-auto px-6 pb-16 grid md:grid-cols-[200px_1fr] gap-10">
                <div />
                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <p className="text-[11px] tracking-[2px] uppercase mb-4 dark:text-off-white/30 text-mid-gray/50">¿Cómo investigamos?</p>
                    <p className="text-[14px] font-light leading-[1.8] dark:text-off-white/60 text-mid-gray">{loc.research.how}</p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-[2px] uppercase mb-4 dark:text-off-white/30 text-mid-gray/50">Objetivo</p>
                    <p className="text-[14px] font-light leading-[1.8] dark:text-off-white/60 text-mid-gray">{loc.research.objective}</p>
                  </div>
                </div>
              </div>
            </FadeSection>
          )}

          {loc.researchImage && (
            <FadeSection>
              <div className="max-w-6xl mx-auto px-6 pb-16">
                <Image
                  src={loc.researchImage}
                  alt=""
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 1152px"
                  style={{ width: '100%', height: 'auto' }}
                  className="rounded-xl"
                />
              </div>
            </FadeSection>
          )}
        </>
      )}

      {loc.researchStats && loc.researchStats.length > 0 && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16">
              <p className="text-[11px] tracking-[2px] uppercase mb-10 dark:text-off-white/30 text-mid-gray/50">Perfil de usuarios investigados</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {loc.researchStats.map((s, i) => (
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

      {loc.obstacles && loc.obstacles.length > 0 && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[200px_1fr] gap-10">
              <SectionLabel>Obstáculos detectados</SectionLabel>
              <div className="grid sm:grid-cols-2 gap-4">
                {loc.obstacles.map((obs, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }} className="p-5 rounded-xl dark:bg-[#1e1e1e] bg-[#f5f5f5] border dark:border-mid-gray/20 border-[#e8e8e8]">
                    <p className="text-[14px] font-light leading-[1.6] dark:text-off-white/70 text-mid-gray italic">{obs}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeSection>
          {loc.obstaclesImage && (
            <FadeSection>
              <div className="max-w-6xl mx-auto px-6 pb-16">
                <Image
                  src={loc.obstaclesImage}
                  alt=""
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 1152px"
                  style={{ width: '100%', height: 'auto' }}
                  className="rounded-xl"
                />
              </div>
            </FadeSection>
          )}
        </>
      )}

      {loc.process && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[200px_1fr] gap-10">
              <SectionLabel>Proceso</SectionLabel>
              <p className="text-[15px] font-light leading-[1.8] dark:text-off-white/60 text-mid-gray max-w-2xl">{loc.process}</p>
            </div>
          </FadeSection>
          {loc.processImage && (
            <FadeSection>
              <div className="max-w-6xl mx-auto px-6 pb-16">
                <Image
                  src={loc.processImage}
                  alt=""
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, 1152px"
                  style={{ width: '100%', height: 'auto' }}
                  className="rounded-xl"
                />
              </div>
            </FadeSection>
          )}
        </>
      )}

      {loc.stats && loc.stats.length > 0 && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16">
              <p className="text-[11px] tracking-[2px] uppercase mb-10 dark:text-off-white/30 text-mid-gray/50">Datos clave</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {loc.stats.map((s, i) => (
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

      {loc.result && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[200px_1fr] gap-10">
              <SectionLabel>Resultado</SectionLabel>
              <p className="text-[20px] md:text-[24px] font-light leading-[1.6] dark:text-off-white/90 text-dark max-w-2xl">{loc.result}</p>
            </div>
          </FadeSection>
        </>
      )}

      {loc.quotes && loc.quotes.length > 0 && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16">
              <p className="text-[11px] tracking-[2px] uppercase mb-10 dark:text-off-white/30 text-mid-gray/50">Voz de los usuarios</p>
              <div className="grid md:grid-cols-3 gap-6">
                {loc.quotes.map((q, i) => (
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

      {loc.conclusion && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[200px_1fr] gap-10">
              <SectionLabel>Conclusión</SectionLabel>
              <div>
                <p className="text-[11px] tracking-[2px] uppercase mb-4 dark:text-mint/70 text-[#2a7a4a]">Resultados</p>
                <p className="text-[15px] font-light leading-[1.8] dark:text-off-white/60 text-mid-gray max-w-2xl">{loc.conclusion}</p>
              </div>
            </div>
          </FadeSection>
        </>
      )}

      {loc.videoSrc && (
        <>
          <Divider />
          <FadeSection>
            <div className="max-w-6xl mx-auto px-6 py-16">
              <p className="text-[11px] tracking-[2px] uppercase mb-6 dark:text-off-white/30 text-mid-gray/50">Prototipo en acción</p>
              <VideoPlayer src={loc.videoSrc} poster={coverImage} />
            </div>
          </FadeSection>
        </>
      )}

      {figmaEmbed && (
        <>
          <Divider />
          <div className="max-w-6xl mx-auto px-6 py-16">
            <p className="text-[11px] tracking-[2px] uppercase mb-6 dark:text-off-white/60 text-mid-gray">Prototipo interactivo</p>
            <div className="aspect-video w-full rounded-xl overflow-hidden">
              <iframe src={figmaEmbed} allowFullScreen title="Prototipo interactivo en Figma" className="w-full h-full border-0" />
            </div>
          </div>
        </>
      )}
    </>
  )
}

/* ─────────────────────────────────────────────
   Editorial layout — long-scroll case study (project.layout === 'editorial')
   Reuses the site tokens: Inter scale, mint accent, #1e1e1e / white surfaces.
───────────────────────────────────────────── */
type EditorialSectionData = Extract<
  ProjectSection,
  { type: 'intro' | 'split' | 'feature' | 'steps' | 'insights' }
>

function EditorialHero({ loc }: { loc: ProjectLocale }) {
  const t = useTranslations('projects')
  const responsibilitiesId = useId()
  const image = loc.heroImage
  type Meta = { label: string; value: string }
  const isMeta = (m: Meta | null): m is Meta => m !== null
  // Two meta columns (role + period, client + tools) plus responsibilities = three centered columns.
  const metaColumns = [
    [
      loc.role ? { label: t('metaRole'), value: loc.role } : null,
      loc.timeline ? { label: t('metaTimeline'), value: loc.timeline } : null,
    ].filter(isMeta),
    [
      loc.client ? { label: t('metaClient'), value: loc.client } : null,
      loc.tools && loc.tools.length > 0 ? { label: t('metaTools'), value: loc.tools.join(' · ') } : null,
    ].filter(isMeta),
  ].filter((col) => col.length > 0)

  return (
    <header className="max-w-6xl mx-auto px-6 pt-32 md:pt-40 pb-20 md:pb-28">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-[11px] tracking-[2px] uppercase mb-4 font-light dark:text-mint text-[#2a7a4a]"
      >
        {loc.category}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease }}
        className="text-[40px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-medium tracking-[-0.025em] leading-[1.0] mb-12 md:mb-16 max-w-5xl dark:text-off-white text-dark"
      >
        {loc.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-3xl text-[17px] md:text-[18px] font-light leading-[1.7] dark:text-off-white/80 text-dark"
      >
        {loc.description}
      </motion.p>

      {image && (
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-10 md:mt-14"
        >
          <EditorialImage image={image} priority sizes="(max-width: 1200px) 100vw, 1100px" />
        </motion.figure>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-8 md:mt-10 pt-10 border-t dark:border-mid-gray/30 border-[#e0e0e0] grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-[minmax(0,13rem)_minmax(0,15rem)_minmax(0,30rem)] lg:justify-center lg:gap-x-16 items-start"
      >
        {metaColumns.map((col, ci) => (
          <dl key={ci} className="grid gap-y-7">
            {col.map((m) => (
              <div key={m.label}>
                <dt className="text-[10px] tracking-[2px] uppercase mb-2 dark:text-off-white/60 text-mid-gray">
                  {m.label}
                </dt>
                <dd className="text-[15px] font-light leading-[1.6] dark:text-off-white/80 text-dark">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        ))}

        {loc.responsibilities && loc.responsibilities.length > 0 && (
          <div className="sm:col-span-2 lg:col-span-1">
            <p id={responsibilitiesId} className="text-[10px] tracking-[2px] uppercase mb-4 dark:text-off-white/60 text-mid-gray">
              {t('metaResponsibilities')}
            </p>
            <ol aria-labelledby={responsibilitiesId}>
              {loc.responsibilities.map((r, i) => (
                <li
                  key={r}
                  className="flex items-baseline gap-4 py-3 border-b dark:border-mid-gray/30 border-[#e8e8e8] text-[15px] font-light leading-[1.6] dark:text-off-white/80 text-dark"
                >
                  <span aria-hidden="true" className="text-[11px] tracking-[1px] tabular-nums shrink-0 dark:text-mint text-[#2a7a4a]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {r}
                </li>
              ))}
            </ol>
          </div>
        )}
      </motion.div>
    </header>
  )
}

function EditorialSection({ section }: { section: EditorialSectionData }) {
  const headingId = useId()
  const muted = section.tone === 'muted'
  const card = muted
    ? 'dark:bg-dark bg-off-white'
    : 'dark:bg-[#1e1e1e] bg-white'
  const cardClass = `rounded-xl border dark:border-mid-gray/30 border-[#e8e8e8] transition-colors duration-200 hover:dark:border-mint/30 hover:border-[#aaeec4] ${card}`
  // An intro only opens a group of subsections, so it carries no bottom padding.
  const padding = section.type === 'intro' ? 'pt-20 md:pt-28' : 'py-20 md:py-28'

  return (
    <section
      aria-labelledby={headingId}
      className={`transition-theme ${muted ? 'dark:bg-[#1e1e1e] bg-white' : ''}`}
    >
      <FadeSection>
        <div className={`max-w-6xl mx-auto px-6 ${padding}`}>
          {section.type === 'intro' && (
            <>
              <EditorialHeading id={headingId} index={section.index} label={section.label} title={section.title} />
              {section.paragraphs && <Paragraphs items={section.paragraphs} className="max-w-3xl" />}
            </>
          )}

          {section.type === 'split' && !section.image && (
            <>
              <EditorialHeading id={headingId} index={section.index} label={section.label} title={section.title} level={section.level} />
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                <Paragraphs items={section.paragraphs} className="lg:col-span-7" />
                {section.findings && section.findings.length > 0 && (
                  <div className="lg:col-span-5 [&>div]:mt-0 lg:[&>div]:border-t-0 lg:[&>div]:pt-0">
                    <Findings label={section.findingsLabel} items={section.findings} />
                  </div>
                )}
              </div>
            </>
          )}

          {section.type === 'split' && section.image && (
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className={`lg:col-span-4 ${section.reverse ? 'lg:order-2' : ''}`}>
                <EditorialHeading
                  id={headingId}
                  index={section.index}
                  label={section.label}
                  title={section.title}
                  level={section.level}
                  compact
                />
                <Paragraphs items={section.paragraphs} />
                {section.findings && section.findings.length > 0 && (
                  <Findings label={section.findingsLabel} items={section.findings} />
                )}
              </div>
              <figure className={`lg:col-span-8 ${section.reverse ? 'lg:order-1' : ''}`}>
                <EditorialImage image={section.image} sizes="(max-width: 1024px) 100vw, 780px" />
                {section.caption && <Caption>{section.caption}</Caption>}
              </figure>
            </div>
          )}

          {section.type === 'feature' && (
            <>
              <EditorialHeading id={headingId} index={section.index} label={section.label} title={section.title} />
              <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                <Paragraphs items={section.paragraphs} className="lg:col-span-6" />
                {section.stats && section.stats.length > 0 && (
                  <StatCards stats={section.stats} cardClass={cardClass} className="lg:col-span-6" />
                )}
              </div>
              <figure className="mt-14 md:mt-20">
                <EditorialImage
                  image={section.image}
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="mx-auto max-w-[960px]"
                />
                {section.caption && <Caption className="text-center">{section.caption}</Caption>}
              </figure>
            </>
          )}

          {section.type === 'steps' && (
            <>
              <EditorialHeading id={headingId} index={section.index} label={section.label} title={section.title} />
              {section.intro && <Paragraphs items={[section.intro]} className="max-w-3xl mb-12 md:mb-14" />}
              <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {section.items.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className={`p-6 md:p-7 flex flex-col ${cardClass}`}
                  >
                    <span aria-hidden="true" className="text-[32px] font-medium tracking-[-0.03em] leading-none mb-8 dark:text-mint text-[#2a7a4a]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-[16px] font-medium mb-3 dark:text-off-white text-dark">{item.title}</h3>
                    <p className="text-[14px] font-light leading-[1.7] dark:text-off-white/70 text-mid-gray">
                      {item.description}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </>
          )}

          {section.type === 'insights' && (
            <>
              <EditorialHeading id={headingId} index={section.index} label={section.label} title={section.title} />
              {section.intro && <Paragraphs items={[section.intro]} className="max-w-3xl mb-12 md:mb-14" />}
              {section.stats && section.stats.length > 0 && (
                <StatCards stats={section.stats} cardClass={cardClass} className="mb-6" wide />
              )}
              <ul className="grid md:grid-cols-2 gap-4 md:gap-6">
                {section.items.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className={`p-6 md:p-8 ${cardClass}`}
                  >
                    {item.tag && (
                      <p className="text-[10px] tracking-[2px] uppercase mb-3 dark:text-mint text-[#2a7a4a]">{item.tag}</p>
                    )}
                    <h3 className="text-[18px] md:text-[20px] font-medium tracking-[-0.01em] mb-3 dark:text-off-white text-dark">
                      {item.title}
                    </h3>
                    <p className="text-[15px] font-light leading-[1.7] dark:text-off-white/70 text-mid-gray">
                      {item.description}
                    </p>
                  </motion.li>
                ))}
              </ul>
              {(section.conclusion || section.image) && (
                <div className="mt-20 md:mt-28 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                  {section.conclusion && (
                    <div className="lg:col-span-4">
                      {section.conclusionLabel && (
                        <h3 className="text-[11px] tracking-[2px] uppercase mb-6 dark:text-mint text-[#2a7a4a]">
                          {section.conclusionLabel}
                        </h3>
                      )}
                      <div className="space-y-5">
                        {section.conclusion.map((p, i) => (
                          <p
                            key={i}
                            className={
                              i === 0
                                ? 'text-[20px] md:text-[24px] font-light leading-[1.5] dark:text-off-white/90 text-dark'
                                : 'text-[15px] font-light leading-[1.8] dark:text-off-white/70 text-mid-gray'
                            }
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                  {section.image && (
                    <figure className="lg:col-span-8">
                      <EditorialImage image={section.image} sizes="(max-width: 1024px) 100vw, 780px" />
                      {section.caption && <Caption>{section.caption}</Caption>}
                    </figure>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </FadeSection>
    </section>
  )
}

function EditorialHeading({
  id,
  index,
  label,
  title,
  level = 2,
  compact = false,
}: {
  id: string
  index?: string
  label: string
  title: string
  level?: 2 | 3
  compact?: boolean
}) {
  const Tag = level === 3 ? 'h3' : 'h2'
  const size =
    level === 3
      ? 'text-[26px] md:text-[32px]'
      : compact
        ? 'text-[30px] md:text-[36px]'
        : 'text-[32px] md:text-[44px]'
  return (
    <div className={compact ? 'mb-6' : 'mb-10 md:mb-14'}>
      <p className="flex items-center gap-3 text-[11px] tracking-[2px] uppercase mb-4 dark:text-mint text-[#2a7a4a]">
        {index && (
          <>
            <span>{index}</span>
            <span aria-hidden="true" className="w-6 h-px bg-current opacity-60" />
          </>
        )}
        <span>{label}</span>
      </p>
      <Tag
        id={id}
        className={`${size} font-medium tracking-[-0.02em] leading-[1.1] max-w-3xl dark:text-off-white text-dark`}
      >
        {title}
      </Tag>
    </div>
  )
}

function Paragraphs({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <div className={`space-y-5 ${className}`}>
      {items.map((p, i) => (
        <p key={i} className="text-[15px] md:text-[16px] font-light leading-[1.8] dark:text-off-white/70 text-mid-gray">
          {p}
        </p>
      ))}
    </div>
  )
}

function Findings({ label, items }: { label?: string; items: string[] }) {
  return (
    <div className="mt-8 pt-6 border-t dark:border-mid-gray/30 border-[#e0e0e0]">
      {label && (
        <p className="text-[10px] tracking-[2px] uppercase mb-4 dark:text-off-white/60 text-mid-gray">{label}</p>
      )}
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-[14px] font-light leading-[1.7] dark:text-off-white/80 text-dark">
            <span aria-hidden="true" className="dark:text-mint text-[#2a7a4a] mt-[1px] shrink-0">→</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function StatCards({
  stats,
  cardClass,
  className = '',
  wide = false,
}: {
  stats: Stat[]
  cardClass: string
  className?: string
  wide?: boolean
}) {
  return (
    <dl className={`grid grid-cols-2 ${wide ? 'lg:grid-cols-4' : ''} gap-4 ${className}`}>
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className={`p-5 md:p-6 flex flex-col-reverse justify-end gap-3 ${cardClass}`}
        >
          <dt className="text-[12px] font-light leading-[1.5] dark:text-off-white/60 text-mid-gray">{s.label}</dt>
          <dd className="text-[24px] md:text-[30px] font-medium tracking-[-0.02em] leading-none dark:text-mint text-[#2a7a4a]">
            {s.value}
          </dd>
        </motion.div>
      ))}
    </dl>
  )
}

function EditorialImage({
  image,
  sizes,
  priority = false,
  className = '',
  style,
}: {
  image: SectionImage
  sizes: string
  priority?: boolean
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      className={`block w-full h-auto ${className}`}
      style={style}
    />
  )
}

function Caption({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <figcaption className={`mt-4 text-[12px] font-light leading-[1.6] dark:text-off-white/60 text-mid-gray ${className}`}>
      {children}
    </figcaption>
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
    <p className="text-[11px] tracking-[2px] uppercase dark:text-off-white/60 text-mid-gray pt-1 shrink-0">
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
