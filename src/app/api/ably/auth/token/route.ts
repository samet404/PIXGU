import { NextResponse } from 'next/server'
import * as Ably from 'ably'
import { env } from '@/env/server.mjs'

export async function POST(req: Request) {
  try {
    const clientId =
      (await req.formData()).get('clientId')?.toString() ??
      env.ABLY_DEFAULT_CLIENT_ID ??
      'NO_CLIENT_ID'

    const client = new Ably.Rest(env.ABLY_API_KEY)

    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: clientId,
      capability: { '*': ['publish', 'subscribe', 'presence'] },
    })

    return NextResponse.json(tokenRequestData)
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message)
  }
}
