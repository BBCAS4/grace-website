import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const referer = request.headers.get('referer') || '';
  
  // Detect Android devices
  const isAndroid = /Android/i.test(userAgent);
  
  // Log for debugging
  console.log('User Agent:', userAgent);
  console.log('Referer:', referer);
  console.log('Is Android:', isAndroid);
  console.log('Pathname:', request.nextUrl.pathname);
  
  // Block ALL Next.js app routes for Android devices
  if (isAndroid) {
    console.log('Android device detected - blocking Next.js app');
    
    // Allow static files and API routes
    if (request.nextUrl.pathname.startsWith('/api/') || 
        request.nextUrl.pathname.startsWith('/_next/') ||
        request.nextUrl.pathname.includes('.')) {
      return NextResponse.next();
    }
    
    // Redirect all other routes to fallback HTML
    console.log('Redirecting Android device to fallback HTML');
    return NextResponse.redirect(new URL('/fallback.html', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match the root path and all app routes
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico|fallback.html|simple.html).*)',
  ],
};
