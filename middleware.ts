
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // If domain is limiai.co, rewrite root to /limiai
  if (hostname === 'limiai.co' && request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/limiai'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}