import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getAnyProject } from '@/lib/projects'
import ProjectDetail from '@/components/projects/ProjectDetail'

export const dynamic = 'force-dynamic'

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getAnyProject(slug)
  if (!project) notFound()

  if (project.visibility === 'portfolio-plus') {
    const cookieStore = await cookies()
    const hasAccess = !!cookieStore.get('portfolio_plus_session')?.value
    if (!hasAccess) {
      redirect(`/portfolio-plus?from=${encodeURIComponent('/projects/' + slug)}`)
    }
  }

  return <ProjectDetail project={project} />
}
