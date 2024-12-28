import { NextResponse, type NextRequest } from 'next/server'

export const redirectWithLocale = (req: NextRequest, locale: string, path: string): NextResponse => {
    req.nextUrl.pathname = `/${locale}${path}`
    return NextResponse.redirect(req.nextUrl)
}