import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request)
  console.log('Middleware Session:', session);

  const isProtected = !request.nextUrl.pathname.startsWith('/login')

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/onas/:path*', '/priklady/:path*', '/teorie/:path*'],
}