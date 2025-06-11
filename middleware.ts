// filepath: middleware.js (or middleware.ts)
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    // Handle CORS
    const response = NextResponse.next()

    response.headers.set('Access-Control-Allow-Origin', 'https://parseable-website-git-fixsearch-parseable-project.vercel.app')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: response.headers })
    }

    return response
}

export const config = {
    matcher: '/api/:path*', // Apply to all API routes
}