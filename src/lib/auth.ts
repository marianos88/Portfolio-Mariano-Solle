export function verifyAccessCode(code: string): boolean {
  const expected = process.env.PORTFOLIO_PLUS_ACCESS_CODE
  if (!expected) return false
  // No rate limiting — intentional trade-off for a personal portfolio
  return code === expected
}

const SESSION_PAYLOAD = 'portfolio-plus-session'

async function getHmacKey(): Promise<CryptoKey> {
  const secret = process.env.PORTFOLIO_PLUS_ACCESS_CODE
  if (!secret) throw new Error('PORTFOLIO_PLUS_ACCESS_CODE not set')
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

export async function generateSessionToken(): Promise<string> {
  const key = await getHmacKey()
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(SESSION_PAYLOAD),
  )
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function verifySessionToken(token: string): Promise<boolean> {
  if (!token) return false
  try {
    const expected = await generateSessionToken()
    return token === expected
  } catch {
    return false
  }
}
