// middleware.ts

import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // only run on /skattframtal and any sub-paths
  if (request.nextUrl.pathname.startsWith('/skattframtal')) {
    const token = request.cookies.get('token')?.value

    if (!token) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/innskraning'

      loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // all good → continue
  return NextResponse.next()
}

export const config = {
  matcher: ['/skattframtal/:path*'],
}
