import { getTranslations } from 'next-intl/server'

export default async function Footer() {
  const t = await getTranslations('footer')

  return (
    <footer className="mt-32 border-t transition-theme dark:border-mid-gray border-[#e0e0e0]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px] tracking-[2px] uppercase transition-theme dark:text-off-white/40 text-mid-gray">
          {t('copy')}
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://linkedin.com/in/marianosolle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[2px] uppercase transition-theme dark:text-off-white/40 text-mid-gray hover:opacity-100"
          >
            {t('linkedin')}
          </a>
          <a
            href="https://dribbble.com/marianosolle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[2px] uppercase transition-theme dark:text-off-white/40 text-mid-gray hover:opacity-100"
          >
            {t('dribbble')}
          </a>
        </div>
      </div>
    </footer>
  )
}
