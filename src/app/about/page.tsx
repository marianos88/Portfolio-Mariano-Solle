import type { Metadata } from 'next'
import AboutSection from '@/components/home/AboutSection'
import JsonLd from '@/components/seo/JsonLd'
import { webPageSchema } from '@/lib/structured-data'
import { absoluteUrl } from '@/lib/site'

const DESCRIPTION =
  'About Mariano Solle, Product Designer with 8+ years of experience in banking, government and international agencies. Tools, skills and areas of specialization.'

export const metadata: Metadata = {
  title: 'About',
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl('/about') },
  openGraph: {
    title: 'About — Mariano Solle',
    description: DESCRIPTION,
    url: absoluteUrl('/about'),
    type: 'profile',
  },
  twitter: {
    title: 'About — Mariano Solle',
    description: DESCRIPTION,
  },
}

export default function AboutPage() {
  const jsonLd = webPageSchema('About — Mariano Solle', DESCRIPTION, '/about')

  return (
    <div className="pt-20">
      <JsonLd data={jsonLd} />
      <AboutSection />
    </div>
  )
}
