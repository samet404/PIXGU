import { ADMIN_AUTH_SESSION, ADMIN_IPS } from '@/constants/server'
import { env } from '@/env/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const redirectAdmin = async (IP: string) => {
    console.log('Admin path detected')

    if (!ADMIN_IPS.includes(IP) && env.NODE_ENV === 'production') return NextResponse.error()
    if ((await cookies()).get('admin_auth_session')?.value !== ADMIN_AUTH_SESSION) return NextResponse.error()

    return NextResponse.next()
}