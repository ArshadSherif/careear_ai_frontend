import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const sessionId = request.cookies.get('session_id')?.value;
    const { pathname } = request.nextUrl;

    // Public routes that don't require authentication
    const publicRoutes = ['/', '/login', '/how-it-works', '/about', '/contact'];

    // Check if the current path is a public route
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

    // Allow static files and API routes
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
        return NextResponse.next();
    }

    // If user is not authenticated and tries to access a protected route
    if (!sessionId && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If user is authenticated and tries to access login page
    if (sessionId && pathname === '/login') {
        return NextResponse.redirect(new URL('/resume', request.url));
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
