import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    const { data: { user } } = await supabase.auth.getUser();

    // Check user role and redirect accordingly
    // This assumes you have a 'role' field in your user_metadata
    const role = user?.user_metadata?.role;

    if (role === 'mentor') {
      return NextResponse.redirect(`${requestUrl.origin}/mentor`);
    } else if (role === 'contributor' || role === 'newcomer') {
      return NextResponse.redirect(`${requestUrl.origin}/contributor/find-mentor`);
    }
  }

  // URL to redirect to after sign in process completes (or if there's an error)
  return NextResponse.redirect(requestUrl.origin);
}
