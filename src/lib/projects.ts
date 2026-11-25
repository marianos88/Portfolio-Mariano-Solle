export type Stat = { value: string; label: string }

/** Image with intrinsic dimensions — used by editorial sections to avoid layout shift. */
export type SectionImage = { src: string; alt: string; width: number; height: number }

/** Shared fields for editorial (long-scroll) sections. `tone: 'muted'` renders a full-bleed alternate background. */
type EditorialBase = { index?: string; label: string; title: string; tone?: 'default' | 'muted' }

export type ProjectSection =
  | { type: 'text'; label: string; content: string }
  | { type: 'twoCol'; col1Label: string; col1Content: string; col2Label: string; col2Content: string }
  | { type: 'image'; src: string; alt?: string; size?: 'full' | 'medium' | 'small' }
  | { type: 'video'; src: string; poster?: string; label?: string; orientation?: 'landscape' | 'portrait' }
  | { type: 'list'; label: string; intro?: string; items: string[] }
  | { type: 'grid'; label: string; items: { title: string; description?: string }[] }
  | { type: 'stats'; label?: string; items: Stat[] }
  | { type: 'divider' }
  | { type: 'heading'; text: string; size?: 'sm' | 'md' | 'lg' }
  // Editorial sections (layout: 'editorial')
  | (EditorialBase & { type: 'intro'; paragraphs?: string[] })
  | (EditorialBase & {
      type: 'split'
      level?: 2 | 3
      paragraphs: string[]
      image: SectionImage
      caption?: string
      findingsLabel?: string
      findings?: string[]
      reverse?: boolean
    })
  | (EditorialBase & {
      type: 'feature'
      paragraphs: string[]
      image: SectionImage
      caption?: string
      stats?: Stat[]
    })
  | (EditorialBase & { type: 'steps'; intro?: string; items: { title: string; description: string }[] })
  | (EditorialBase & {
      type: 'insights'
      intro?: string
      stats?: Stat[]
      /** `tag` qualifies the evidence level of each insight (e.g. observed data, interpretation, hypothesis). */
      items: { tag?: string; title: string; description: string }[]
      conclusionLabel?: string
      conclusion?: string[]
      image?: SectionImage
      caption?: string
    })

export type ProjectLocale = {
  title: string
  cardTitle?: string
  category: string
  description: string
  role?: string
  scope?: string[]
  // Editorial hero meta
  timeline?: string
  tools?: string[]
  client?: string
  responsibilities?: string[]
  heroImage?: SectionImage
  challenge?: string
  tags?: string[]
  sections?: ProjectSection[]
  // Legacy fields (SportClub)
  context?: string
  research?: { how: string; objective: string }
  researchImage?: string
  process?: string
  processImage?: string
  result?: string
  stats?: Stat[]
  researchStats?: Stat[]
  obstacles?: string[]
  obstaclesImage?: string
  quotes?: string[]
  conclusion?: string
  videoSrc?: string
}

export type Project = {
  slug: string
  year: string
  visibility: 'public' | 'portfolio-plus'
  figmaEmbed?: string
  coverImage?: string
  images?: string[]
  featured?: boolean
  isNDA?: boolean
  /** 'editorial' renders the long-scroll case-study hero and editorial sections. Default: classic cover layout. */
  layout?: 'classic' | 'editorial'
  es: ProjectLocale
  en: ProjectLocale
}

export function getProjectLocale(project: Project, locale: string): ProjectLocale {
  return locale === 'en' && project.en ? project.en : project.es
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const allProjects: Project[] = [
  require('../content/projects/proyecto-08.json'),
  require('../content/projects/proyecto-05.json'),
  require('../content/projects/proyecto-06.json'),
  require('../content/projects/proyecto-04.json'),
  require('../content/projects/proyecto-02.json'),
  require('../content/projects/proyecto-01.json'),
  require('../content/projects/proyecto-03.json'),
  require('../content/projects/proyecto-07.json'),
]

export function getPublicProjects(): Project[] {
  return allProjects.filter((p) => p.visibility === 'public')
}

export function getPublicProject(slug: string): Project | undefined {
  return getPublicProjects().find((p) => p.slug === slug)
}

export function getPortfolioPlusProjects(): Project[] {
  return allProjects.filter((p) => p.visibility === 'portfolio-plus')
}

export function getPortfolioPlusProject(slug: string): Project | undefined {
  return getPortfolioPlusProjects().find((p) => p.slug === slug)
}

export function getAnyProject(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug)
}
