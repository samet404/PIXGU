import { NextResponse } from 'next/server'
import { env } from '@/env/server.mjs'
import { api } from '@/trpc/server'

export async function POST() {
  // we are setting ably client id to prevent users behave like they are someone else
  const clientId = await api.auth.getUserID.query()
  if (!clientId) throw new Error('UNAUTHORIZED')

  const Ably = await import('ably')

  const client = new Ably.Rest(env.ABLY_API_KEY)

  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: clientId,
    capability: { '*': ['publish', 'subscribe', 'presence'] },
  })

  return NextResponse.json(tokenRequestData)
}
