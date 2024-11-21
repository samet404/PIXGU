import { generateState } from 'arctic'
import { google } from '@/auth/lucia/providers'
import { cookies } from 'next/headers'
import { env } from '@/env/server'

export async function GET(): Promise<Response> {
  const state = generateState()
  const url = await google.createAuthorizationURL(state, '670592745', {
    scopes: ['profile'],
  })

  url.searchParams.set('access_type', 'offline')
    ; (await cookies()).set('google_oauth_state', state, {
      path: '/',
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: 'lax',
    })

  return Response.redirect(url)
}
