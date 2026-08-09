import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getPublicProjects, type Project } from '@/lib/projects'
import ProjectCard from '@/components/projects/ProjectCard'
import JsonLd from '@/components/seo/JsonLd'
import { webPageSchema } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Case studies by Mariano Solle — UX/UI design projects for banking, fintech, SaaS, and e-commerce.',
  alternates: { canonical: 'https://marianosolle.com/projects' },
  openGraph: {
    title: 'Projects — Mariano Solle',
    description:
      'Case studies by Mariano Solle — UX/UI design projects for banking, fintech, SaaS, and e-commerce.',
    url: 'https://marianosolle.com/projects',
    type: 'website',
  },
  twitter: {
    title: 'Projects — Mariano Solle',
    description:
      'Case studies by Mariano Solle — UX/UI design projects for banking, fintech, SaaS, and e-commerce.',
  },
}

export default async function ProjectsPage() {
  const t = await getTranslations('projects')
  const tPlus = await getTranslations('portfolioPlus')
  const projects = getPublicProjects()

  // Entry that surfaces Portfolio Plus in this list; the link goes to the
  // existing /portfolio-plus access flow.
  const portfolioPlusEntry: Project = {
    slug: 'portfolio-plus',
    year: '',
    visibility: 'portfolio-plus',
    es: {
      title: tPlus('title'),
      category: tPlus('tag'),
      description: tPlus('cardDescription'),
      tags: ['NDA'],
    },
    en: {
      title: tPlus('title'),
      category: tPlus('tag'),
      description: tPlus('cardDescription'),
      tags: ['NDA'],
    },
  }

  const jsonLd = webPageSchema(
    'Projects — Mariano Solle',
    'Case studies by Mariano Solle — UX/UI design projects for banking, fintech, SaaS, and e-commerce.',
    '/projects',
  )

  return (
    <div className="pt-32 pb-20 max-w-6xl mx-auto px-6">
      <JsonLd data={jsonLd} />
      <p className="text-[11px] tracking-[2px] uppercase mb-4 font-light dark:text-mint text-[#2a7a4a]">
        {t('tag')}
      </p>
      <h1 className="text-[36px] md:text-[52px] font-medium tracking-[-0.025em] mb-16 dark:text-off-white text-dark">
        {t('title')}
      </h1>

      <div className="space-y-0">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
        <ProjectCard
          key="portfolio-plus"
          project={portfolioPlusEntry}
          index={projects.length}
          href="/portfolio-plus"
        />
        <div className="border-t dark:border-mid-gray/50 border-[#e0e0e0]" />
      </div>
    </div>
  )
}
