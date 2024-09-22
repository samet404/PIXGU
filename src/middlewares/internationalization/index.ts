import 'server-only'

import type { Locale } from '@/types'
import {
  type NextMiddleware,
  type NextRequest,
  NextResponse,
} from 'next/server'
import { lucia } from '@/auth/lucia'
import { cookies } from 'next/headers'
import { env } from '@/env/server'

const locales: Locale[] = ['en', 'tr']

export const internationalization: NextMiddleware = async (
  req: NextRequest,
) => {
  const { pathname } = req.nextUrl
  console.log('pathname', pathname)
  if (
    pathname.startsWith('/image/') ||
    pathname.startsWith('/sound') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')
  )
    return NextResponse.next()

  // if user is logged in
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
  const isLoggedIn = sessionId !== null && sessionId !== undefined

  if (isLoggedIn) {
    const authInfo = await lucia.validateSession(sessionId)

    if (authInfo.user) {
      const redisLocaleRes = await fetch(
        `${env.BASE_URL}/api/locale/${authInfo.user.id}`,
      )
      const redisLocale = await redisLocaleRes.json()

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
          if (
            pathname.replace(pathnameAnotherLocale, '').startsWith('/login')
          ) {
            req.nextUrl.pathname = `/${redisLocale}`
            return NextResponse.redirect(req.nextUrl)
          }

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
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  // if pathname has locale don't do anything

  if (pathnameLocale) {
    const pathnameWithoutLocale = pathname.replace(`/${pathnameLocale}`, '')
    console.log('pathnameWithoutLocale', pathnameWithoutLocale)

    if (!isLoggedIn)
      if (
        !pathnameWithoutLocale.startsWith('/start') &&
        !pathnameWithoutLocale.startsWith('/login')
      ) {
        req.nextUrl.pathname = `/${pathnameLocale}/start`
        return NextResponse.redirect(req.nextUrl)
      }

    if (isLoggedIn)
      if (
        pathnameWithoutLocale.startsWith('/start') ||
        pathnameWithoutLocale.startsWith('/login')
      ) {
        req.nextUrl.pathname = `/${pathnameLocale}`
        return NextResponse.redirect(req.nextUrl)
      }

    return
  }

  // if pathname has no locale, add locale to pathname with user's device locale then redirect
  const locale = (await import('./funcs/getLocale')).getLocale(req, locales)

  if (!isLoggedIn)
    if (!pathname.startsWith('/start') && !pathname.startsWith('/login')) {
      req.nextUrl.pathname = `/${locale}/start`
      return NextResponse.redirect(req.nextUrl)
    }

  if (isLoggedIn)
    if (pathname.startsWith('/start') || pathname.startsWith('/login')) {
      req.nextUrl.pathname = `/${locale}`
      return NextResponse.redirect(req.nextUrl)
    }

  req.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(req.nextUrl)
}
