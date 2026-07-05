import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getAnyProject } from '@/lib/projects'
import { verifySessionToken } from '@/lib/auth'
import ProjectDetail from '@/components/projects/ProjectDetail'

export const dynamic = 'force-dynamic'

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getAnyProject(slug)
  if (!project) notFound()

  if (project.visibility === 'portfolio-plus') {
    const cookieStore = await cookies()
    const token = cookieStore.get('portfolio_plus_session')?.value ?? ''
    const hasAccess = await verifySessionToken(token)
    if (!hasAccess) {
      redirect(`/portfolio-plus?from=${encodeURIComponent('/projects/' + slug)}`)
    }
  }

  return <ProjectDetail project={project} />
}
