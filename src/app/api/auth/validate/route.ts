import { auth } from '@/auth/lucia'
import * as context from 'next/headers'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const authRequest = auth.handleRequest('GET', context)
  const session = await authRequest.validate()

  return NextResponse.json(session)
}
