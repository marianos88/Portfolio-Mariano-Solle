import { getTranslations, getLocale } from 'next-intl/server'

const tools = [
  'Figma', 'Jira', 'Confluence', 'ChatGPT', 'Claude', 'Gemini',
  'Copilot', 'Cursor', 'WordPress', 'HTML', 'CSS',
  'Adobe Photoshop', 'Adobe Illustrator',
]

const skills = [
  'Product Design', 'UX Research', 'Wireframing & Prototyping',
  'Design Systems', 'Usability Testing', 'AI-Assisted Design',
  'Agile Methodologies', 'Stakeholder Management', 'Quality Assurance (QA)',
]

const specializationsEs = [
  'Banca digital y fintech',
  'Productos SaaS B2B y B2C',
  'E-commerce',
  'Apps móviles',
  'Landing pages y micrositios',
  'Gobierno',
]

const specializationsEn = [
  'Digital banking and fintech',
  'B2B and B2C SaaS products',
  'E-commerce',
  'Mobile apps',
  'Landing pages and microsites',
  'Government',
]

export default async function AboutSection() {
  const t = await getTranslations('about')
  const locale = await getLocale()
  const specializations = locale === 'es' ? specializationsEs : specializationsEn

  return (
    <section className="py-20 dark:bg-dark bg-off-white">
      <div className="w-full max-w-6xl mx-auto px-6">
        <p className="text-[11px] tracking-[2px] uppercase mb-4 font-light dark:text-mint text-[#2a7a4a]">
          {t('tag')}
        </p>
        <p className="text-[16px] font-light leading-[1.7] max-w-2xl mb-16 dark:text-off-white/70 text-mid-gray">
          {t('bio')}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div>
            <p className="text-[11px] tracking-[2px] uppercase mb-4 dark:text-off-white/40 text-mid-gray">
              {t('tools')}
            </p>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="text-[12px] px-3 py-1.5 rounded border transition-theme
                    dark:border-mid-gray dark:text-off-white/60
                    border-[#e0e0e0] text-mid-gray"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] tracking-[2px] uppercase mb-4 dark:text-off-white/40 text-mid-gray">
              {t('skills')}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[12px] px-3 py-1.5 rounded border transition-theme
                    dark:border-mid-gray dark:text-off-white/60
                    border-[#e0e0e0] text-mid-gray"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] tracking-[2px] uppercase mb-4 dark:text-off-white/40 text-mid-gray">
              {t('specializations')}
            </p>
            <ul className="space-y-2">
              {specializations.map((spec) => (
                <li
                  key={spec}
                  className="text-[14px] font-light flex items-center gap-2 dark:text-off-white/70 text-mid-gray"
                >
                  <span className="dark:text-mint text-[#2a7a4a]">→</span>
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
