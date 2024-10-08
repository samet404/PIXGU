import { lucia } from '@/auth/lucia'
import { google } from '@/auth/lucia/providers'
import type { GoogleUser } from '@/auth/lucia/providers/types'
import { db } from '@/sqlDb'
import { cookies } from 'next/headers'
import { OAuth2RequestError } from 'arctic'
import { createId } from '@paralleldrive/cuid2'

import type { DatabaseUser } from '@/auth/types'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'
import { api } from '@/trpc/server'

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = cookies().get('google_oauth_state')?.value ?? null
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    })
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, '670592745')
    const googleUserResponse = await fetch(
      'https://openidconnect.googleapis.com/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    )

    const googleUser: GoogleUser = await googleUserResponse.json()

    const existingUserQuery = await db
      .select({
        id: user.id,
        username: user.username,
        username_ID: user.usernameID,
        username_with_username_ID: user.usernameWithUsernameID,
        profile_picture: user.profilePicture,
      })
      .from(user)
      .where(eq(user.googleId, googleUser.sub.toString()))
      .limit(1)

    const existingUser = existingUserQuery[0] as DatabaseUser | undefined | null

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      )
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/',
        },
      })
    }

    const userId = createId()
    const username = googleUser.name
    const generatedNewUsernameID = (await api.user.generateNewUsernameID.query({
      username: username,
    })) as string

    console.log(generatedNewUsernameID + ' usernameID')

    await db.insert(user).values({
      id: userId,
      googleId: googleUser.sub.toString(),
      username: username,
      usernameID: generatedNewUsernameID,
      usernameWithUsernameID: `${username}@${generatedNewUsernameID}`,
      profilePicture: googleUser.picture,
    })

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    })
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === 'bad_verification_code'
    ) {
      // invalid code
      return new Response(null, {
        status: 400,
      })
    }
    console.error(e)
    return new Response(null, {
      status: 500,
    })
  }
}
