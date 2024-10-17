import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  cookies().delete('guest_auth_session')
  return new NextResponse(null, { status: 200 })
}
