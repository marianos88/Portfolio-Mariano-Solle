import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = request.cookies.get('portfolio_plus_session')

  if (pathname.startsWith('/portfolio-plus/') && !session?.value) {
    return NextResponse.redirect(new URL('/portfolio-plus', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/portfolio-plus/:path+'],
}
