import { MetadataRoute } from 'next'
import { getPublicProjects } from '@/lib/projects'

const BASE = 'https://marianosolle.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const publicProjects = getPublicProjects()

  const projectUrls = publicProjects.map((p) => ({
    url: `${BASE}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/projects`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    ...projectUrls,
  ]
}
