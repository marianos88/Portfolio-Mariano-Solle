import { getTranslations } from 'next-intl/server'
import ExternalLink from '@/components/ui/ExternalLink'

export default async function Footer() {
  const t = await getTranslations('footer')

  return (
    <footer className="mt-32 border-t transition-theme dark:border-mid-gray border-[#e0e0e0]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px] tracking-[2px] uppercase transition-theme dark:text-off-white/60 text-mid-gray">
          {t('copy')}
        </p>
        <nav aria-label={t('socialNav')}>
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            <li>
              <ExternalLink
                href="https://linkedin.com/in/marianosolle"
                destination="linkedin"
                className="text-[11px] tracking-[2px] uppercase transition-theme dark:text-off-white/60 text-mid-gray hover:opacity-100"
              >
                {t('linkedin')}
                <span className="sr-only"> (opens in new tab)</span>
              </ExternalLink>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
