import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getLocale, getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Mariano Solle — Product Designer',
  description: 'Portfolio de Mariano Solle, Product Designer especializado en apps móviles, banca digital, SaaS y e-commerce.',
  openGraph: {
    title: 'Mariano Solle — Product Designer',
    description: 'Portfolio de Mariano Solle, Product Designer especializado en apps móviles, banca digital, SaaS y e-commerce.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Mariano Solle',
    locale: 'es_AR',
    type: 'website',
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
