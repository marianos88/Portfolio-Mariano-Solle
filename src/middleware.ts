import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect individual NDA case pages
  if (pathname.startsWith('/portfolio-plus/') && pathname !== '/portfolio-plus/') {
    const access = req.cookies.get('portfolio_plus_access')?.value
    if (access !== 'granted') {
      return NextResponse.redirect(new URL('/portfolio-plus', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/portfolio-plus/:path+'],
}
