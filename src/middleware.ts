import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname // Get the path from the request URL

    // Ckeck for public paths
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/resetpassword'

    // get token from cookies
    const token = request.cookies.get('token')?.value || ''

    // handle redirects
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

// Matching paths: /, /profile, /login, /signup, /verifyemail, /resetpassword
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail',
        '/resetpassword',
    ],
}