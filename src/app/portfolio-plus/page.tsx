import { cookies } from 'next/headers'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import PasswordGate from '@/components/portfolio-plus/PasswordGate'
import { getNdaProjects } from '@/lib/projects'

export default async function PortfolioPlusPage() {
  const t = await getTranslations('portfolioPlus')
  const cookieStore = await cookies()
  const hasAccess = cookieStore.get('portfolio_plus_access')?.value === 'granted'
  const projects = getNdaProjects()

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <p className="text-[11px] tracking-[2px] uppercase mb-4 font-light dark:text-mint text-[#2a7a4a]">
        {t('tag')}
      </p>
      <h1 className="text-[36px] md:text-[46px] font-medium tracking-[-0.02em] mb-4 dark:text-off-white text-dark">
        {t('title')}
      </h1>
      <p className="text-[16px] font-light leading-[1.7] mb-12 max-w-xl dark:text-off-white/60 text-mid-gray">
        {t('description')}
      </p>

      {hasAccess ? (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio-plus/${project.slug}`}
              className="group block rounded-xl border p-6 transition-all duration-200
                group-hover:translate-y-[-2px] group-hover:shadow-lg
                dark:bg-[#2e2e2e] dark:border-mid-gray
                bg-white border-[#e0e0e0]"
            >
              <p className="text-[11px] tracking-[2px] uppercase mb-2 dark:text-mint text-[#2a7a4a]">
                {project.category}
              </p>
              <h3 className="text-[18px] font-medium mb-1 dark:text-off-white text-dark">
                {project.title}
              </h3>
              <p className="text-[13px] font-light dark:text-off-white/50 text-mid-gray">
                {project.description}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <PasswordGate />
          <p className="mt-6 text-[12px] dark:text-off-white/30 text-mid-gray">
            {t('requestAccess')}{' '}
            <Link href="/contact" className="underline hover:opacity-70">
              →
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
