import { env } from '@/env/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const redirectAdmin = async (IP: string) => {
    console.log('Admin path detected')

    if ((await cookies()).get('admin_auth_session')?.value !== env.ADMIN_AUTH_SECRET) return NextResponse.error()

    return NextResponse.next()
}