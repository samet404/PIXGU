import { auth } from '@/auth/lucia'
import { db } from '@/db'
import { user } from '@/schema/auth'
import { eq } from 'drizzle-orm'

import * as context from 'next/headers'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const authRequest = auth.handleRequest('GET', context)
  const session = await authRequest.validate()

  if (!session) return null

  const usernameId = await db
    .select({
      id: user.usernameId,
    })
    .from(user)
    .where(eq(user.username, session.user.username))

  return NextResponse.json({
    session: session.user,
    usernameId: usernameId,
  })
}
