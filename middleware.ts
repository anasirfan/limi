// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  try {
    // Get host from headers - Vercel typically uses 'host'
    const host = request.headers.get('host') || ''
    const url = request.nextUrl.clone()
    const pathname = url.pathname
    
    // Simple logging for Vercel (console.log works in Vercel Edge Functions)
    console.log(`[MIDDLEWARE] Host: ${host}, Path: ${pathname}`)

    // Handle limiai.co domain routing
    if (host === 'limiai.co' || host === 'www.limiai.co') {
      console.log(`[MIDDLEWARE] limiai.co detected, processing path: ${pathname}`)
      
      // Route /invest to /limifuture
      if (pathname === '/invest') {
        console.log(`[MIDDLEWARE] Routing /invest to /limifuture`)
        url.pathname = '/limifuture'
        return NextResponse.rewrite(url)
      }
      
      // Route root path to /limiai
      if (pathname === '/') {
        console.log(`[MIDDLEWARE] Routing root to /limiai`)
        url.pathname = '/limiai'
        return NextResponse.rewrite(url)
      }
      
      // If already on target paths, continue normally
      if (pathname.startsWith('/limiai') || pathname.startsWith('/limifuture')) {
        console.log(`[MIDDLEWARE] Already on target path: ${pathname}`)
        return NextResponse.next()
      }
      
      // For any other path on limiai.co, redirect to /limiai (main page)
      console.log(`[MIDDLEWARE] Unknown path ${pathname}, redirecting to /limiai`)
      url.pathname = '/limiai'
      return NextResponse.rewrite(url)
    }

    // For all other domains (limilighting.com), continue normally
    console.log(`[MIDDLEWARE] Primary domain, continuing normally`)
    return NextResponse.next()
    
  } catch (error) {
    console.error('[MIDDLEWARE] Error:', error)
    // Fallback: continue normally if middleware fails
    return NextResponse.next()
  }
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
