import { notFound } from 'next/navigation'
import { getPublicProject } from '@/lib/projects'
import ProjectDetail from '@/components/projects/ProjectDetail'

export const dynamic = 'force-dynamic'

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getPublicProject(slug)
  if (!project) notFound()

  return <ProjectDetail project={project} />
}
