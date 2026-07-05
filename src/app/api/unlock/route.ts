import { NextRequest, NextResponse } from 'next/server'
import { verifyAccessCode, generateSessionToken } from '@/lib/auth'

const SESSION_MAX_AGE = 60 * 60 * 24 * 30 // 30 days
const VISITED_MAX_AGE = 60 * 60 * 24 * 60 // 60 days — survives session expiry for expiry message

export async function POST(req: NextRequest) {
  const { code } = await req.json()

  if (!code || typeof code !== 'string') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!verifyAccessCode(code)) {
    return NextResponse.json({ error: 'Invalid access code' }, { status: 401 })
  }

  const token = await generateSessionToken()
  const isProd = process.env.NODE_ENV === 'production'
  const response = NextResponse.json({ ok: true })

  response.cookies.set('portfolio_plus_session', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })

  // Persists beyond session lifetime so we can detect expiry vs. first visit
  response.cookies.set('portfolio_plus_visited', '1', {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: VISITED_MAX_AGE,
    path: '/',
  })

  return response
}
