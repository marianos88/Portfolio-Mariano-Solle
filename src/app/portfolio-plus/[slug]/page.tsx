import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { getTranslations, getLocale } from 'next-intl/server'
import { getNdaProject, getNdaProjects, getProjectLocale } from '@/lib/projects'
import FigmaEmbed from '@/components/projects/FigmaEmbed'

export function generateStaticParams() {
  return getNdaProjects().map((p) => ({ slug: p.slug }))
}

export default async function NdaCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cookieStore = await cookies()
  const hasAccess = !!cookieStore.get('portfolio-plus-auth')?.value

  if (!hasAccess) redirect('/portfolio-plus')

  const project = getNdaProject(slug)
  if (!project) notFound()

  const locale = await getLocale()
  const loc = getProjectLocale(project, locale)
  const t = await getTranslations('projects')

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <p className="text-[11px] tracking-[2px] uppercase mb-4 font-light dark:text-mint text-[#2a7a4a]">
        {loc.category}
      </p>
      <h1 className="text-[36px] md:text-[46px] font-medium tracking-[-0.02em] mb-4 dark:text-off-white text-dark">
        {loc.title}
      </h1>
      <p className="text-[16px] font-light leading-[1.7] mb-12 dark:text-off-white/60 text-mid-gray">
        {loc.description}
      </p>

      {project.figmaEmbed && (
        <div className="mb-12">
          <FigmaEmbed url={project.figmaEmbed} title={loc.title} />
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { label: t('context'), content: loc.context },
          { label: t('process'), content: loc.process },
          { label: t('result'), content: loc.result },
        ].map(({ label, content }) =>
          content ? (
            <div key={label}>
              <p className="text-[11px] tracking-[2px] uppercase mb-3 dark:text-off-white/40 text-mid-gray">
                {label}
              </p>
              <p className="text-[14px] font-light leading-[1.7] dark:text-off-white/70 text-mid-gray">
                {content}
              </p>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}
