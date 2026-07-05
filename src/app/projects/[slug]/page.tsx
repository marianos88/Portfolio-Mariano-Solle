import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getAnyProject, getPublicProjects } from '@/lib/projects'
import { verifySessionToken } from '@/lib/auth'
import ProjectDetail from '@/components/projects/ProjectDetail'
import JsonLd from '@/components/seo/JsonLd'
import { creativeWorkSchema } from '@/lib/structured-data'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return getPublicProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getAnyProject(slug)

  if (!project) return {}

  // For NDA projects, return minimal non-indexed metadata
  if (project.visibility === 'portfolio-plus') {
    return {
      title: project.es.title,
      robots: { index: false, follow: false },
    }
  }

  const title = project.es.title
  const description = project.es.description
  const url = `https://marianosolle.com/projects/${slug}`
  const ogImage = project.coverImage
    ? [{ url: project.coverImage, width: 1200, height: 630, alt: title }]
    : undefined

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — Mariano Solle`,
      description,
      url,
      type: 'article',
      ...(ogImage ? { images: ogImage } : {}),
    },
    twitter: {
      title: `${title} — Mariano Solle`,
      description,
      ...(ogImage ? { images: [project.coverImage!] } : {}),
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getAnyProject(slug)
  if (!project) notFound()

  const p = project!

  if (p.visibility === 'portfolio-plus') {
    const cookieStore = await cookies()
    const token = cookieStore.get('portfolio_plus_session')?.value ?? ''
    const hasAccess = await verifySessionToken(token)
    if (!hasAccess) {
      redirect(`/portfolio-plus?from=${encodeURIComponent('/projects/' + slug)}`)
    }
  }

  const jsonLd =
    p.visibility === 'public'
      ? creativeWorkSchema(
          p.es.title,
          p.es.description,
          slug,
          p.coverImage,
          p.year,
          p.es.tags,
        )
      : null

  return (
    <>
      {jsonLd && <JsonLd data={jsonLd} />}
      <ProjectDetail project={p} />
    </>
  )
}
