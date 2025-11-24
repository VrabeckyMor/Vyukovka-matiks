import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

export async function middleware(request: NextRequest) {
  const session = await getSessionCookie(request)
  console.log('Middleware Session:', session)

  if (!session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/onas/:path*', '/priklady/:path*', '/teorie/:path*'],
}