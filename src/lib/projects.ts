export type Stat = { value: string; label: string }

export type ProjectSection =
  | { type: 'text'; label: string; content: string }
  | { type: 'twoCol'; col1Label: string; col1Content: string; col2Label: string; col2Content: string }
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; poster?: string; label?: string }
  | { type: 'list'; label: string; intro?: string; items: string[] }
  | { type: 'grid'; label: string; items: { title: string; description?: string }[] }
  | { type: 'stats'; label?: string; items: Stat[] }
  | { type: 'divider' }

export type Project = {
  slug: string
  title: string
  year: string
  category: string
  description: string
  figmaEmbed?: string
  coverImage?: string
  images?: string[]
  featured?: boolean
  tags?: string[]
  isNDA?: boolean
  role?: string
  scope?: string[]
  challenge?: string
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
  // Flexible sections (MercadoPago and future projects)
  sections?: ProjectSection[]
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
