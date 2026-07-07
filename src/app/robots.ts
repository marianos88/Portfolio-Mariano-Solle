import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/portfolio-plus', '/api/'],
    },
    sitemap: 'https://marianosolle.com/sitemap.xml',
  }
}
