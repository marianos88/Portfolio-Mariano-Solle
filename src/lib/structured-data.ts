const BASE = 'https://marianosolle.com'

export type WithContext<T> = T & { '@context': string }

export interface PersonSchema {
  '@type': 'Person'
  name: string
  jobTitle: string
  url: string
  image: string
  description: string
  sameAs: string[]
}

export interface WebSiteSchema {
  '@type': 'WebSite'
  name: string
  url: string
  description: string
  author: { '@type': 'Person'; name: string; url: string }
}

export interface WebPageSchema {
  '@type': 'WebPage'
  name: string
  description: string
  url: string
  isPartOf: { '@type': 'WebSite'; url: string }
  author: { '@type': 'Person'; name: string; url: string }
}

export interface CreativeWorkSchema {
  '@type': 'CreativeWork'
  name: string
  description: string
  url: string
  image?: string
  author: { '@type': 'Person'; name: string; url: string }
  dateCreated?: string
  keywords?: string
}

const AUTHOR_REF = { '@type': 'Person' as const, name: 'Mariano Solle', url: BASE }
const SITE_REF = { '@type': 'WebSite' as const, url: BASE }

export function personSchema(): WithContext<PersonSchema> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mariano Solle',
    jobTitle: 'Product Designer',
    url: BASE,
    image: `${BASE}/images/shared/mariano-solle.jpg`,
    description:
      'Product Designer with 8+ years of experience in banking, fintech, government and SaaS. Specialized in mobile apps, digital banking, and e-commerce.',
    sameAs: [
      'https://linkedin.com/in/marianosolle',
      'https://dribbble.com/marianosolle',
    ],
  }
}

export function webSiteSchema(): WithContext<WebSiteSchema> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mariano Solle',
    url: BASE,
    description:
      'Portfolio of Mariano Solle, Product Designer specialized in mobile apps, digital banking, SaaS and e-commerce.',
    author: AUTHOR_REF,
  }
}

export function webPageSchema(
  name: string,
  description: string,
  path: string,
): WithContext<WebPageSchema> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${BASE}${path}`,
    isPartOf: SITE_REF,
    author: AUTHOR_REF,
  }
}

export function creativeWorkSchema(
  name: string,
  description: string,
  slug: string,
  coverImage?: string,
  year?: string,
  tags?: string[],
): WithContext<CreativeWorkSchema> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description,
    url: `${BASE}/projects/${slug}`,
    ...(coverImage ? { image: `${BASE}${coverImage}` } : {}),
    author: AUTHOR_REF,
    ...(year ? { dateCreated: year } : {}),
    ...(tags?.length ? { keywords: tags.join(', ') } : {}),
  }
}
