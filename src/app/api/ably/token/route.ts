import { NextResponse } from 'next/server'
import * as Ably from 'ably/promises'
import { env } from '@/env/server.mjs'

import { type Session } from 'lucia'

export async function POST(req: Request) {
  try {
    const clientId =
      (await req.formData()).get('clientId')?.toString() ??
      env.ABLY_DEFAULT_CLIENT_ID ??
      'NO_CLIENT_ID'

    const client = new Ably.Rest(env.ABLY_API_KEY)

    const tokenRequestData = await client.auth.createTokenRequest({
      clientId: clientId,
    })

    return NextResponse.json(tokenRequestData)
  } catch (e) {
    if (e instanceof Error)
      return NextResponse.json({
        error: e,
      })
  }
}
