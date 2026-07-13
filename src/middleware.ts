import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = request.nextUrl.pathname === '/admin/login';

  if (isAdminRoute && !isLoginRoute) {
    // Check for admin session cookie
    const adminSession = request.cookies.get('admin_session');
    
    // In a real app, you would verify a JWT or session token here.
    // For this simple implementation, we just check if the cookie exists and has a specific value.
    if (!adminSession || adminSession.value !== 'authenticated') {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If trying to access login page while already authenticated
  if (isLoginRoute) {
    const adminSession = request.cookies.get('admin_session');
    if (adminSession && adminSession.value === 'authenticated') {
      const adminUrl = new URL('/admin', request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
