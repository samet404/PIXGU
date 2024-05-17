import 'server-only'

import type { Locale } from '@/types'
import {
  type NextMiddleware,
  type NextRequest,
  NextResponse,
} from 'next/server'
import { lucia } from '@/auth/lucia'
import { cookies } from 'next/headers'

const locales: Locale[] = ['en', 'tr']

export const internationalization: NextMiddleware = async (
  req: NextRequest,
) => {
  const { pathname } = req.nextUrl

  // if user is logged in
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

  if (sessionId) {
    const authInfo = await lucia.validateSession(sessionId)

    if (authInfo.user) {
      const redisDb = (await import('@/redis')).redisDb
      const redisLocale = (await redisDb.get(
        `locale:${authInfo.user?.id}`,
      )) as Locale

      // if user has a locale in redis
      if (redisLocale) {
        // if pathname has redis locale
        const pathnameHasRedisLocale =
          pathname.startsWith(`/${redisLocale}/`) ||
          pathname === `/${redisLocale}`

        // if pathname has redis locale do nothing
        if (pathnameHasRedisLocale) return

        // if pathname has another locale
        const pathnameAnotherLocale = locales.find((locale) => {
          if (locale === redisLocale) return undefined
          if (pathname.includes(`/${locale}/`) || pathname === `/${locale}`)
            return locale
          return undefined
        })

        // if pathname has another locale redirect to redis locale
        if (pathnameAnotherLocale) {
          req.nextUrl.pathname = `/${redisLocale}${pathname.replace(`/${pathnameAnotherLocale}`, '')}`
          return NextResponse.redirect(req.nextUrl)
        }

        // if pathname has no locale add redis locale to pathname then redirect
        req.nextUrl.pathname = `/${redisLocale}${pathname}`
        return NextResponse.redirect(req.nextUrl)
      }
    }
  }

  // if user is not logged in or user has no locale in redis

  // if pathname has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  // if pathname has locale do nothing
  if (pathnameHasLocale) return

  // if pathname has no locale add locale to pathname with user's device locale then redirect
  const locale = (await import('./funcs/getLocale')).getLocale(req, locales)
  req.nextUrl.pathname = `/${locale}${pathname}`

  return NextResponse.redirect(req.nextUrl)
}
