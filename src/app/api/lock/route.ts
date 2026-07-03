import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ ok: true })
  // Clear both cookies — intentional lock should not show the expiry message
  response.cookies.set('portfolio_plus_session', '', { maxAge: 0, path: '/' })
  response.cookies.set('portfolio_plus_visited', '', { maxAge: 0, path: '/' })
  return response
}
