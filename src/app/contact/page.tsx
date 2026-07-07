import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ContactForm from '@/components/contact/ContactForm'
import JsonLd from '@/components/seo/JsonLd'
import { webPageSchema } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Mariano Solle. Available for freelance projects, Product Design positions and collaborations.',
  alternates: { canonical: 'https://marianosolle.com/contact' },
  openGraph: {
    title: 'Contact — Mariano Solle',
    description:
      'Get in touch with Mariano Solle. Available for freelance projects, Product Design positions and collaborations.',
    url: 'https://marianosolle.com/contact',
    type: 'website',
  },
  twitter: {
    title: 'Contact — Mariano Solle',
    description:
      'Get in touch with Mariano Solle. Available for freelance projects, Product Design positions and collaborations.',
  },
}

export default async function ContactPage() {
  const t = await getTranslations('contact')

  const jsonLd = webPageSchema(
    'Contact — Mariano Solle',
    'Get in touch with Mariano Solle, Product Designer.',
    '/contact',
  )

  return (
    <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto">
      <JsonLd data={jsonLd} />
      <p className="text-[11px] tracking-[2px] uppercase mb-4 font-light dark:text-mint text-[#2a7a4a]">
        {t('tag')}
      </p>
      <h1 className="text-[36px] md:text-[46px] font-medium tracking-[-0.02em] mb-4 dark:text-off-white text-dark">
        {t('title')}
      </h1>
      <p className="text-[16px] font-light leading-[1.7] mb-12 dark:text-off-white/60 text-mid-gray">
        {t('description')}
      </p>
      <ContactForm />
    </div>
  )
}
