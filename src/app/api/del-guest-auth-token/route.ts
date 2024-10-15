import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  cookies().delete('guest-auth-token')
  return new NextResponse(null, { status: 200 })
}
