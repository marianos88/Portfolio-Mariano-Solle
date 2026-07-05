import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getLocale, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { LenisProvider } from '@/components/layout/LenisProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd'
import { personSchema, webSiteSchema } from '@/lib/structured-data'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
})

const SITE_URL = 'https://marianosolle.com'
const DEFAULT_DESCRIPTION =
  'Product Designer with 8+ years of experience in banking, fintech, government and SaaS. Specialized in mobile apps, digital banking, and e-commerce.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mariano Solle — Product Designer',
    template: '%s — Mariano Solle',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'Product Designer',
    'UX Designer',
    'UI Designer',
    'UX/UI',
    'Argentina',
    'Buenos Aires',
    'Fintech',
    'Banking',
    'SaaS',
    'Mobile App Design',
    'Figma',
    'Digital Product',
  ],
  authors: [{ name: 'Mariano Solle', url: SITE_URL }],
  creator: 'Mariano Solle',
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'Mariano Solle',
    title: 'Mariano Solle — Product Designer',
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mariano Solle — Product Designer',
    description: DEFAULT_DESCRIPTION,
    creator: '@marianosolle',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'theme-color': '#111111',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <JsonLd data={[personSchema(), webSiteSchema()]} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <LenisProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </LenisProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
