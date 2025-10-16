/*import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request)

  // ❌ Nechceme chránit /login
  const isProtected = !request.nextUrl.pathname.startsWith('/login')

  if (isProtected && !session) {
    console.log('Uživatel není přihlášen, přesměrování na /login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  console.log('Uživatel je přihlášen nebo přístup na veřejnou stránku')

  return NextResponse.next()
}

export const config = {
  matcher: ['/onas/:path*', '/priklady/:path*', '/teorie/:path*'], // NE `/login`
}*/