import { notFound } from 'next/navigation'
import { getPublicProject, getPublicProjects } from '@/lib/projects'
import ProjectDetail from '@/components/projects/ProjectDetail'

export function generateStaticParams() {
  return getPublicProjects().map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getPublicProject(slug)
  if (!project) notFound()

  return <ProjectDetail project={project} />
}
