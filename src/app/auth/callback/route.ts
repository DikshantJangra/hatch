import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error('Error exchanging code for session:', sessionError);
      return NextResponse.redirect(requestUrl.origin);
    }

    const { user, session } = sessionData;

    if (session) {
      // Check if user exists in our database
      const { data: existingUser, error: existingUserError } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (existingUser) {
        // User exists, redirect based on role
        if (existingUser.role === 'mentor') {
          return NextResponse.redirect(`${requestUrl.origin}/mentor`);
        } else {
          return NextResponse.redirect(`${requestUrl.origin}/contributor`);
        }
      } else {
        // New user, fetch GitHub contributions
        const githubToken = session.provider_token;

        if (githubToken) {
          const githubResponse = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
              'Authorization': `bearer ${githubToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              query: `
                query {
                  viewer {
                    contributionsCollection {
                      contributionCalendar {
                        totalContributions
                      }
                    }
                  }
                }
              `
            })
          });

          const githubData = await githubResponse.json();
          const totalContributions = githubData.data.viewer.contributionsCollection.contributionCalendar.totalContributions;

          const role = totalContributions > 8 ? 'mentor' : 'contributor';

          await supabase.auth.updateUser({
            data: { role }
          });

          // Insert user into our custom 'users' table
          await supabase.from('users').insert([{ id: user.id, role: role }]);

          if (role === 'mentor') {
            return NextResponse.redirect(`${requestUrl.origin}/mentor`);
          } else {
            return NextResponse.redirect(`${requestUrl.origin}/contributor`);
          }
        }
      }
    }
  }

  // URL to redirect to after sign in process completes (or if there's an error)
  return NextResponse.redirect(requestUrl.origin);
}
