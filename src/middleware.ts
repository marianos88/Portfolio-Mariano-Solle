import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySessionToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/portfolio-plus/')) {
    const token = request.cookies.get('portfolio_plus_session')?.value ?? ''
    const valid = await verifySessionToken(token)
    if (!valid) {
      return NextResponse.redirect(new URL('/portfolio-plus', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/portfolio-plus/:path+'],
}
