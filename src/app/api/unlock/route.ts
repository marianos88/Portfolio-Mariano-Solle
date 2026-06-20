import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (!password || typeof password !== 'string') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const valid = await verifyPassword(password)

  if (!valid) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set('portfolio_plus_access', 'granted', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return response
}
