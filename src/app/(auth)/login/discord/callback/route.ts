import { auth, discordAuth } from '@/auth/lucia'
import { OAuthRequestError } from '@lucia-auth/oauth'
import { cookies, headers } from 'next/headers'
import type { NextRequest } from 'next/server'
import { api } from '@/src/trpc/server'
import { createId } from '@paralleldrive/cuid2'

export const GET = async (request: NextRequest) => {
  const storedState = cookies().get('discord_oauth_state')?.value
  const url = new URL(request.url)
  const state = url.searchParams.get('state')
  const code = url.searchParams.get('code')
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    })
  }
  try {
    const { getExistingUser, discordUser, createUser } =
      await discordAuth.validateCallback(code)

    const getCreatedUser = async () => {
      const existingUser = await getExistingUser()
      if (existingUser) return existingUser

      const generatedNewUsernameID =
        (await api.user.generateNewUsernameID.query({
          username: discordUser.username,
        })) as string

      const createdUser = await createUser({
        attributes: {
          username: discordUser.username,
          username_ID: generatedNewUsernameID,
          username_with_username_ID: `${discordUser.username}@${generatedNewUsernameID}`,
          profile_picture: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp`,
        },
      })

      return createdUser
    }

    const createdUser = await getCreatedUser()
    const session = await auth.createSession({
      userId: createdUser.userId,
      attributes: {},
    })
    const authRequest = auth.handleRequest(request.method, {
      cookies,
      headers,
    })
    authRequest.setSession(session)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/', // redirect to profile page
      },
    })
  } catch (e) {
    console.error(e)

    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      })
    }
    return new Response(null, {
      status: 500,
    })
  }
}
