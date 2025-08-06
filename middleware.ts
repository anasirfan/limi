// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // TEMP: Log domain and path to test
  console.log('[Middleware]', { host, path: url.pathname })

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/((?!_next|.*\\..*|api).*)'],
}
