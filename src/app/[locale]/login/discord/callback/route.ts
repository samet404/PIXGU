import 'server-only'

import { lucia } from '@/auth/lucia'
import { discord } from '@/auth/lucia/providers'
import type { DiscordUser } from '@/auth/lucia/providers/types'
import { db } from '@/sqlDb'
import { cookies } from 'next/headers'
import { OAuth2RequestError } from 'arctic'
import { createId } from '@paralleldrive/cuid2'

import type { DatabaseUser } from '@/auth/types'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'
import { api } from '@/trpc/server'

type IdentifyScopeDiscordUser = Omit<DiscordUser, 'email'>

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const storedState = (await cookies()).get('discord_oauth_state')?.value ?? null
    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400,
        })
    }

    try {
        const tokens = await discord.validateAuthorizationCode(code)
        const discordUserResponse = await fetch(
            'https://discord.com/api/users/@me',
            {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken}`,
                },
            },
        )
        const discordUser: IdentifyScopeDiscordUser =
            await discordUserResponse.json()
        const existingUserQuery = await db
            .select({
                id: user.id,
                username: user.username,
                username_ID: user.usernameID,
                username_with_username_ID: user.usernameWithUsernameID,
                profile_picture: user.profilePicture,
            })
            .from(user)
            .where(eq(user.discordId, discordUser.id))
            .limit(1)

        const existingUser = existingUserQuery[0] as DatabaseUser | undefined | null

        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {})
            const sessionCookie = lucia.createSessionCookie(session.id)
                ; (await cookies()).set(
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
        const username = discordUser.username
        const generatedNewUsernameID = (await api.user.generateNewUsernameID.query({
            username: username,
        })) as string

        await db.insert(user).values({
            id: userId,
            discordId: discordUser.id,
            username: username,
            usernameID: generatedNewUsernameID,
            usernameWithUsernameID: `${username}@${generatedNewUsernameID}`,
            profilePicture: `https://cdn.discordapp.com/avatars/${discordUser.avatar}.webp`,
        })

        const session = await lucia.createSession(userId, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        const newSessionAttributes = {
            ...sessionCookie.attributes,
            domain: `.${sessionCookie.attributes.domain}`
        }
            ; (await cookies()).set(
                sessionCookie.name,
                sessionCookie.value,
                newSessionAttributes,
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
        console.log(e)
        return new Response(null, {
            status: 500,
        })
    }
}
