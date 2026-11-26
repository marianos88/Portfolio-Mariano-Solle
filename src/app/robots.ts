import { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /portfolio-plus stays crawlable so Google can read its noindex, nofollow meta.
      disallow: ['/api/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
