import { lucia } from '@/auth/lucia'
import { env } from '@/env/server'
import { cookies } from 'next/headers'

export const getClientID = async () => {
    // Check authentication status
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null
    const isLoggedIn = Boolean(sessionId)
    console.log('Authentication status:', { isLoggedIn, hasSessionId: !!sessionId })

    if (isLoggedIn && sessionId) {
        const userID = (await lucia.validateSession(sessionId)).user?.id
        if (userID) return userID
    }

    const guestIDJSON = await fetch(
        `${env.BASE_URL}/api/validate-guest-auth-session`,
        {
            headers: { cookie: (await cookies()).toString() },
        }
    )
    const guestID = await guestIDJSON.json()
    if (guestID) return guestID

    return null
}