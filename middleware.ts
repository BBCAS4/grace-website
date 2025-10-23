import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';
  
  // More comprehensive detection for Google WebView
  const isGoogleWebView = 
    /Googlebot|Google WebView|GoogleApp|GoogleSearchApp|GoogleSearch/i.test(userAgent) ||
    referer.includes('google.com') ||
    request.url.includes('google.com') ||
    // Check for common Google app patterns
    userAgent.includes('Google') && userAgent.includes('Mobile') ||
    // Check for Android with Google app
    /Android.*Google/i.test(userAgent);
  
  // Detect if it's a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  // Log for debugging
  console.log('User Agent:', userAgent);
  console.log('Referer:', referer);
  console.log('Is Google WebView:', isGoogleWebView);
  console.log('Is Mobile:', isMobile);
  
  // If it's Google WebView on mobile, serve the fallback HTML
  if (isGoogleWebView && isMobile) {
    console.log('Serving fallback HTML for Google WebView');
    // Only redirect the main page, not API routes or other pages
    if (request.nextUrl.pathname === '/') {
      return NextResponse.rewrite(new URL('/fallback.html', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
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
};
