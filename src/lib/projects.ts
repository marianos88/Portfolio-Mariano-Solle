export type Stat = { value: string; label: string }

export type ProjectSection =
  | { type: 'text'; label: string; content: string }
  | { type: 'twoCol'; col1Label: string; col1Content: string; col2Label: string; col2Content: string }
  | { type: 'image'; src: string; alt?: string; size?: 'full' | 'medium' }
  | { type: 'video'; src: string; poster?: string; label?: string; orientation?: 'landscape' | 'portrait' }
  | { type: 'list'; label: string; intro?: string; items: string[] }
  | { type: 'grid'; label: string; items: { title: string; description?: string }[] }
  | { type: 'stats'; label?: string; items: Stat[] }
  | { type: 'divider' }
  | { type: 'heading'; text: string; size?: 'sm' | 'md' | 'lg' }

export type ProjectLocale = {
  title: string
  category: string
  description: string
  role?: string
  scope?: string[]
  challenge?: string
  tags?: string[]
  sections?: ProjectSection[]
  // Legacy fields (SportClub / NDA)
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
  figmaEmbed?: string
  coverImage?: string
  images?: string[]
  featured?: boolean
  isNDA?: boolean
  es: ProjectLocale
  en: ProjectLocale
}

export function getProjectLocale(project: Project, locale: string): ProjectLocale {
  return locale === 'en' && project.en ? project.en : project.es
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const publicProjects: Project[] = [
  require('../content/projects/proyecto-01.json'),
  require('../content/projects/proyecto-02.json'),
  require('../content/projects/proyecto-03.json'),
  require('../content/projects/proyecto-04.json'),
  require('../content/projects/proyecto-05.json'),
  require('../content/projects/proyecto-06.json'),
  require('../content/projects/proyecto-07.json'),
]

// eslint-disable-next-line @typescript-eslint/no-require-imports
const ndaProjects: Project[] = [
  require('../content/portfolio-plus/caso-nda-01.json'),
  require('../content/portfolio-plus/caso-nda-02.json'),
]

export function getPublicProjects(): Project[] {
  return publicProjects
}

export function getPublicProject(slug: string): Project | undefined {
  return publicProjects.find((p) => p.slug === slug)
}

export function getNdaProjects(): Project[] {
  return ndaProjects
}

export function getNdaProject(slug: string): Project | undefined {
  return ndaProjects.find((p) => p.slug === slug)
}
