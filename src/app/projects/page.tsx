import { getTranslations } from 'next-intl/server'
import { getPublicProjects } from '@/lib/projects'
import ProjectCard from '@/components/projects/ProjectCard'

export default async function ProjectsPage() {
  const t = await getTranslations('projects')
  const projects = getPublicProjects()

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <p className="text-[11px] tracking-[2px] uppercase mb-4 font-light dark:text-mint text-[#2a7a4a]">
        {t('tag')}
      </p>
      <h1 className="text-[36px] md:text-[46px] font-medium tracking-[-0.02em] mb-12 dark:text-off-white text-dark">
        {t('title')}
      </h1>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}
