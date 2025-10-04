import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  const { data: { user } } = await supabase.auth.getUser()

  // If the user is signed in and visits login or signup, redirect to contributor page
  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/contributor', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/login',
    '/signup',
  ],
}
