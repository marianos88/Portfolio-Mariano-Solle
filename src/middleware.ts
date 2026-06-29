import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isNDARoute = request.nextUrl.pathname.startsWith('/portfolio-plus/')
  const authCookie = request.cookies.get('portfolio-plus-auth')

  if (isNDARoute && !authCookie?.value) {
    return NextResponse.redirect(new URL('/portfolio-plus', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/portfolio-plus/:path+'],
}
