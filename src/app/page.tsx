import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import AboutSection from '@/components/home/AboutSection'
import ProjectList from '@/components/home/ProjectList'
import JsonLd from '@/components/seo/JsonLd'
import { webPageSchema } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Mariano Solle — Product Designer',
  description:
    'Portfolio of Mariano Solle, Product Designer with 8+ years of experience in banking, fintech, government and SaaS. Specialized in mobile apps, digital banking and e-commerce.',
  alternates: { canonical: 'https://marianosolle.com' },
  openGraph: {
    title: 'Mariano Solle — Product Designer',
    description:
      'Product Designer with 8+ years of experience in banking, fintech, government and SaaS.',
    url: 'https://marianosolle.com',
    type: 'website',
  },
  twitter: {
    title: 'Mariano Solle — Product Designer',
    description:
      'Product Designer with 8+ years of experience in banking, fintech, government and SaaS.',
  },
}

export default function HomePage() {
  const jsonLd = webPageSchema(
    'Mariano Solle — Product Designer',
    'Portfolio of Mariano Solle, Product Designer specialized in mobile apps, digital banking, SaaS and e-commerce.',
    '/',
  )

  return (
    <div className="relative">
      <JsonLd data={jsonLd} />
      {/* Hero in normal document flow */}
      <Hero />
      {/* About sticks below the navbar; Projects scrolls over it */}
      <div className="sticky top-16 z-20 min-h-screen">
        <AboutSection />
      </div>
      {/* Projects in normal flow, higher z-index to cover sticky About */}
      <div className="relative z-30">
        <ProjectList />
      </div>
    </div>
  )
}
