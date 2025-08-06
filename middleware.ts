// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get host from multiple possible headers (Vercel uses different headers)
  const host = request.headers.get('host') || 
               request.headers.get('x-forwarded-host') || 
               request.headers.get('x-vercel-forwarded-host') || ''

  const url = request.nextUrl.clone()
  const pathname = url.pathname

  // Enhanced logging for debugging on Vercel
  console.log(' Middleware executing:')
  console.log('  - Host:', host)
  console.log('  - Pathname:', pathname)
  console.log('  - Full URL:', url.href)
  console.log('  - Headers:', Object.fromEntries(request.headers.entries()))

  // Handle limiai.co domain - redirect all paths to /limiai
  if (host.includes('limiai.co')) {
    console.log(' limiai.co detected, processing...')
    
    // If already on /limiai path, let it through
    if (pathname.startsWith('/limiai')) {
      console.log(' Already on /limiai path, continuing...')
      return NextResponse.next()
    }
    
    // Redirect root and any other path to /limiai
    console.log(' Rewriting to /limiai')
    url.pathname = '/limiai'
    return NextResponse.rewrite(url)
  }

  // For limilighting.com, let everything through normally
  console.log(' Primary domain, continuing normally...')
  return NextResponse.next()
}

export const config = {
  // More comprehensive matcher to catch all routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
