import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectsDir = join(__dirname, '../src/content/projects')

// Terms allowed to be identical between es and en (brands, acronyms, tech terms)
const ALLOWED_IDENTICAL = new Set([
  // UX/design discipline terms
  'UX', 'UI', 'UX/UI', 'UX Research', 'UX/UI Design', 'UX Strategy',
  'Information Architecture', 'Design System', 'User Stories', 'QA',
  'Usability Testing', 'Journey Mapping', 'User Personas', 'Personas',
  'Journey Maps', 'Benchmark', 'Engagement', 'Completion Rate',
  // tech/industry terms
  'NFT', 'blockchain', 'SaaS', 'Web3', 'Fintech', 'Enterprise',
  'COMEX', 'BCRA', 'FMCG', 'CPG', 'FMCG/CPG', 'CTA', 'Dashboard',
  // roles
  'Product Designer', 'UX Designer', 'Product Owner', 'Tech Lead', 'PM',
  // brand names / proper nouns
  'SportClub', 'Reckitt', 'Finish (Reckitt)', 'MercadoPago', 'Ambition – NFT Collection Builder',
  // categories / field values that are standard in both languages
  'UX Research · Fintech', 'Web3 · Blockchain · SaaS',
  'UK', 'Perú', 'Peru',
  // UI labels / video labels
  'Landing page', 'Landing Page', 'Landing page – Desktop', 'Landing page – Mobile',
  'Login & Dashboard', 'Datatables', 'App',
  // metrics and numbers (always language-neutral)
  '100%', '+2.000', '+1.000', '+20', '4 years', '3 years',
  '↓ 35%', '↓ 40%', '↑ 30%', '↑ 35%', '↑ 20%',
  '↓ 30%', '↓ 25%', '+1.000', '↓ 35%',
  // section heading labels that are same in both (number + EN term)
  '3 · Insights',
])

const LOCALIZABLE_FIELDS = ['title', 'description', 'category', 'challenge']

function isAllowedIdentical(value) {
  if (typeof value !== 'string') return false
  return ALLOWED_IDENTICAL.has(value.trim())
}

function checkSection(esSection, enSection, projectSlug, index) {
  const warnings = []
  const checkableKeys = ['label', 'content', 'intro', 'col1Label', 'col1Content', 'col2Label', 'col2Content', 'text']
  for (const key of checkableKeys) {
    const esVal = esSection[key]
    const enVal = enSection[key]
    if (esVal && enVal && esVal === enVal && !isAllowedIdentical(esVal)) {
      warnings.push(`  section[${index}].${key}: identical in es/en — "${esVal.slice(0, 60)}${esVal.length > 60 ? '...' : ''}"`)
    }
  }
  if (esSection.items && enSection.items) {
    esSection.items.forEach((esItem, i) => {
      const enItem = enSection.items[i]
      if (!enItem) return
      if (typeof esItem === 'string' && esItem === enItem && !isAllowedIdentical(esItem)) {
        warnings.push(`  section[${index}].items[${i}]: identical — "${esItem.slice(0, 60)}"`)
      } else if (typeof esItem === 'object') {
        for (const k of ['title', 'description']) {
          if (esItem[k] && enItem[k] && esItem[k] === enItem[k] && !isAllowedIdentical(esItem[k])) {
            warnings.push(`  section[${index}].items[${i}].${k}: identical — "${esItem[k].slice(0, 60)}"`)
          }
        }
      }
    })
  }
  return warnings
}

let totalWarnings = 0

const files = readdirSync(projectsDir).filter(f => f.endsWith('.json'))

for (const file of files) {
  const data = JSON.parse(readFileSync(join(projectsDir, file), 'utf8'))
  const { es, en, slug } = data
  if (!es || !en) continue

  const fileWarnings = []

  for (const field of LOCALIZABLE_FIELDS) {
    if (es[field] && en[field] && es[field] === en[field] && !isAllowedIdentical(es[field])) {
      fileWarnings.push(`  ${field}: identical in es/en — "${es[field].slice(0, 80)}"`)
    }
  }

  if (es.scope && en.scope) {
    es.scope.forEach((item, i) => {
      if (item === en.scope[i] && !isAllowedIdentical(item)) {
        fileWarnings.push(`  scope[${i}]: identical — "${item}"`)
      }
    })
  }

  const maxSections = Math.min(es.sections?.length ?? 0, en.sections?.length ?? 0)
  for (let i = 0; i < maxSections; i++) {
    const sectionWarnings = checkSection(es.sections[i], en.sections[i], slug, i)
    fileWarnings.push(...sectionWarnings)
  }

  if (fileWarnings.length > 0) {
    console.warn(`\n[i18n] ${file} (${slug}):`)
    fileWarnings.forEach(w => console.warn(w))
    totalWarnings += fileWarnings.length
  }
}

if (totalWarnings > 0) {
  console.warn(`\n[i18n] ${totalWarnings} identical es/en field(s) detected across project content.`)
} else {
  console.log('[i18n] All project content blocks are properly differentiated between es and en.')
}
