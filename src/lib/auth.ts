export function verifyAccessCode(code: string): boolean {
  const expected = process.env.PORTFOLIO_PLUS_ACCESS_CODE
  if (!expected) return false
  return code === expected
}
