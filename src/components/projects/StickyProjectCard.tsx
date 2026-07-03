'use client'

import Link from 'next/link'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { useLocale } from 'next-intl'
import type { Project } from '@/lib/projects'
import { getProjectLocale } from '@/lib/projects'

const CARD_TOP = 80 // px below viewport top — clears fixed navbar
const SCALE_STEP = 0.04

interface Props {
  project: Project
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  onHoverChange: (hovered: boolean) => void
}

export default function StickyProjectCard({
  project,
  index,
  total,
  scrollYProgress,
  onHoverChange,
}: Props) {
  const locale = useLocale()
  const loc = getProjectLocale(project, locale)

  // Slide-in: card arrives over 80% of its scroll slot, ending at progress i/total.
  // Card 0 starts fully in place.
  const slideEnd = index / total
  const slideStart = Math.max(0, slideEnd - 0.8 / total)
  const translateY = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1] : [slideStart, slideEnd],
    index === 0 ? ['0%', '0%'] : ['110%', '0%'],
  )

  // Scale + opacity: each subsequent card arriving buries this one by one depth level.
  // Card i is fully on top at progress i/total.
  // Cards j > i arrive at progress j/total, each adding one depth level.
  const scaleInputs: number[] = [index / total]
  const scaleOutputs: number[] = [1]
  const opacityOutputs: number[] = [1]

  for (let j = index + 1; j < total; j++) {
    const depth = j - index
    scaleInputs.push(j / total)
    scaleOutputs.push(Math.max(0.84, 1 - depth * SCALE_STEP))
    opacityOutputs.push(Math.max(0.8, 1 - depth * 0.03))
  }

  // useTransform requires at least 2 input/output pairs
  if (scaleInputs.length === 1) {
    scaleInputs.push(1)
    scaleOutputs.push(scaleOutputs[0])
    opacityOutputs.push(opacityOutputs[0])
  }

  const scale = useTransform(scrollYProgress, scaleInputs, scaleOutputs)
  const opacity = useTransform(scrollYProgress, scaleInputs, opacityOutputs)

  return (
    <motion.div
      className="absolute inset-x-0 px-3 md:px-4"
      style={{
        top: CARD_TOP,
        height: `calc(100vh - ${CARD_TOP + 20}px)`,
        translateY,
        scale,
        opacity,
        transformOrigin: 'top center',
        zIndex: index + 1,
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={loc.title}
        className="cursor-none block w-full h-full rounded-[24px] overflow-hidden relative group
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          dark:focus-visible:ring-mint focus-visible:ring-[#2a7a4a]"
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
      >
        {/* Cover image */}
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 dark:bg-[#2e2e2e] bg-[#e8e8e8]" />
        )}

        {/* Gradient overlay — stronger at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/25 via-transparent to-dark/70" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-8 md:p-12">
          {/* Top row: index + arrow */}
          <div className="flex justify-between items-start">
            <span className="text-[11px] tracking-[2px] uppercase text-white/40 font-light tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              aria-hidden="true"
              className="text-white/50 text-[18px] transition-transform duration-300
                group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </div>

          {/* Bottom: category + title + tags */}
          <div>
            <p className="text-[11px] tracking-[2px] uppercase text-white/50 font-light mb-3">
              {loc.category}
            </p>
            <h3
              className="text-[28px] md:text-[44px] lg:text-[56px] font-medium tracking-[-0.02em]
                text-white leading-[1.05] mb-5"
            >
              {loc.title}
            </h3>
            <div className="flex gap-2 flex-wrap">
              {loc.tags?.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-[1px] uppercase px-3 py-1.5 rounded-full
                    border border-white/20 text-white/55 font-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
