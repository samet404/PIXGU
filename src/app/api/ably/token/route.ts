import { NextResponse } from 'next/server'
import * as Ably from 'ably/promises'
import { env } from '@/env/server.mjs'
import * as context from 'next/headers'
import { auth } from '@/auth/lucia'
import { type Session } from 'lucia'

export async function POST(req: Request) {
  try {
    const authRequest = auth.handleRequest('GET', context)
    const session: Session = await authRequest.validate()

    if (!session) throw new Error({ message: 'UNAUTHORIZED', code: 401 })

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
    if (e instanceof Error) return NextResponse.error(e)
  }
}
