import { getTranslations } from 'next-intl/server'

export default async function AboutPage() {
  const t = await getTranslations('about')

  const tools = ['Figma', 'FigJam', 'Maze', 'Hotjar', 'Notion', 'Jira', 'Zeplin', 'Storybook']
  const specializations = [
    'Banca digital y fintech',
    'Productos SaaS B2B y B2C',
    'E-commerce y marketplaces',
    'Apps móviles iOS/Android',
    'Landing pages y micrositios',
  ]

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <p className="text-[11px] tracking-[2px] uppercase mb-4 font-light dark:text-mint text-[#2a7a4a]">
        {t('tag')}
      </p>
      <h1 className="text-[36px] md:text-[46px] font-medium tracking-[-0.02em] mb-8 dark:text-off-white text-dark">
        {t('title')}
      </h1>
      <p className="text-[16px] font-light leading-[1.7] max-w-2xl mb-16 dark:text-off-white/70 text-mid-gray">
        {t('bio')}
      </p>

      <div className="grid md:grid-cols-2 gap-12">
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
  )
}
