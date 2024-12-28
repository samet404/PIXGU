import { NextResponse, type NextRequest } from 'next/server'
import { isPublicPage } from './isPublicPage'
import { redirectWithLocale } from './redirectWithLocale'
import { locales } from './locales'

export const pathnameHasLocale = (req: NextRequest, pathname: string, isJoined: boolean) => {
    const pathnameLocale = locales.find(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
    console.log('Pathname locale:', pathnameLocale)

    if (pathnameLocale) {
        const pathnameWithoutLocale = pathname.replace(`/${pathnameLocale}`, '') || '/'
        const publicPage = isPublicPage(pathnameWithoutLocale)

        console.log('Pathname without locale:', pathnameWithoutLocale)
        console.log('Is public route:',)

        if (!isJoined && !publicPage) {
            console.log('Redirecting: not joined and not public route')
            return redirectWithLocale(req, pathnameLocale, '')
        }

        return NextResponse.next()
    }

    return null
}