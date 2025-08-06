import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // Case 1: Rewriting / on limiai.co to /limiai
  if (host === 'www.limiai.co' && url.pathname === '/') {
    url.pathname = '/limiai'
    return NextResponse.rewrite(url)
  }

  // Optional: Prevent access to other routes on limiai.co
  if (host === 'limiai.co' && url.pathname !== '/') {
    url.pathname = '/limiai'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
    matcher: ['/', '/((?!_next|favicon.ico|api).*)'],
  }