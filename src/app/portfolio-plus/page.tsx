import { cookies } from 'next/headers'
import { getTranslations, getLocale } from 'next-intl/server'
import Link from 'next/link'
import PasswordGate from '@/components/portfolio-plus/PasswordGate'
import LockButton from '@/components/portfolio-plus/LockButton'
import { getPortfolioPlusProjects, getProjectLocale } from '@/lib/projects'
import { verifySessionToken } from '@/lib/auth'

function sanitizeFrom(from: string | undefined): string | undefined {
  if (!from) return undefined
  try {
    new URL(from) // succeeds only for absolute URLs — reject those
    return undefined
  } catch {
    return from.startsWith('/') ? from : undefined
  }
}

export const dynamic = 'force-dynamic'

export default async function PortfolioPlusPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>
}) {
  const t = await getTranslations('portfolioPlus')
  const locale = await getLocale()
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('portfolio_plus_session')?.value ?? ''
  const hasSession = await verifySessionToken(sessionToken)
  const hadVisited = !!cookieStore.get('portfolio_plus_visited')?.value
  const isExpired = !hasSession && hadVisited
  const projects = getPortfolioPlusProjects()
  const { from: rawFrom } = await searchParams
  const from = sanitizeFrom(rawFrom)

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

      {hasSession ? (
        <div>
          {/* Confidentiality notice */}
          <div className="mb-10 p-6 rounded-xl border dark:border-mid-gray/50 border-[#e0e0e0] dark:bg-[#1e1e1e]/60 bg-[#f9f9f9]">
            <p className="text-[11px] tracking-[2px] uppercase mb-3 dark:text-off-white/40 text-mid-gray">
              {t('confidentialityTitle')}
            </p>
            <p className="text-[14px] font-light leading-[1.7] dark:text-off-white/60 text-mid-gray">
              {t('confidentialityText')}
            </p>
          </div>

          {/* Projects */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {projects.map((project) => {
              const loc = getProjectLocale(project, locale)
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group block rounded-xl border p-6 transition-all duration-200
                    dark:bg-[#2e2e2e] dark:border-mid-gray hover:dark:border-mint/30
                    bg-white border-[#e0e0e0] hover:shadow-md"
                >
                  <p className="text-[11px] tracking-[2px] uppercase mb-2 dark:text-mint text-[#2a7a4a]">
                    {loc.category}
                  </p>
                  <h3 className="text-[18px] font-medium mb-1 dark:text-off-white text-dark">
                    {loc.title}
                  </h3>
                  <p className="text-[13px] font-light dark:text-off-white/50 text-mid-gray">
                    {loc.description}
                  </p>
                </Link>
              )
            })}
          </div>

          <LockButton />
        </div>
      ) : (
        <div>
          {isExpired && (
            <p className="mb-6 text-[14px] font-light dark:text-off-white/50 text-mid-gray">
              {t('expired')}
            </p>
          )}
          <PasswordGate from={from} />
        </div>
      )}
    </div>
  )
}
