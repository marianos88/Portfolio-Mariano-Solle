import { redirect } from 'next/navigation'

// Private project detail pages have moved to /projects/[slug]
export default function ObsoletePortfolioPlusSlug() {
  redirect('/portfolio-plus')
}
