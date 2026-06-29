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
  context?: string
  process?: string
  result?: string
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const publicProjects: Project[] = [
  require('../content/projects/proyecto-01.json'),
  require('../content/projects/proyecto-02.json'),
  require('../content/projects/proyecto-03.json'),
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
