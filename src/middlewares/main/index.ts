import 'server-only'

import type { Locale } from '@/types'
import {
  type NextMiddleware,
  type NextRequest,
  NextResponse,
  userAgent,
} from 'next/server'
import { lucia } from '@/auth/lucia'
import { cookies } from 'next/headers'
import { env } from '@/env/server'
import { getLocale } from './funcs/getLocale'

const locales: Locale[] = ['en', 'tr']

// Helper functions
const isPublicPath = (pathname: string): boolean => {
  const publicPaths = [
    '/ads.txt',
    '/image/',
    '/sound',
    '/favicon',
    '/robots.txt',
    '/_next',
    '/api',
  ]
  return publicPaths.some((path) => pathname.startsWith(path))
}

const isPublicRoute = (path: string): boolean => {
  return (
    path === '/' ||
    path.startsWith('/login') ||
    path.startsWith('/privacy') ||
    path.startsWith('/r')
  )
}

const redirectWithLocale = (req: NextRequest, locale: string, path = ''): NextResponse => {
  req.nextUrl.pathname = `/${locale}${path}`
  return NextResponse.redirect(req.nextUrl)
}

const notSupportedWebRTC = (browser: string) => `Sorry, but we are can not support ${browser} due to the lack of support for WebRTC technology. Please use Chromium-based browsers (Brave, Chrome, Opera, etc.) instead.`

export const main: NextMiddleware = async (req: NextRequest) => {
  const { browser } = userAgent(req)
  const browserName = browser.name
  console.log('browserName ', browserName)

  const { pathname } = req.nextUrl
  console.log('pathname', pathname)


  switch (browserName) {
    case 'Firefox':
      return NextResponse.json(notSupportedWebRTC(browserName))
    case 'Safari':
      return NextResponse.json(notSupportedWebRTC(browserName))
    case 'Safari Mobile':
      return NextResponse.json(notSupportedWebRTC(browserName))
    case 'IE':
      return NextResponse.json('Sorry, we can not support Internet Explorer due to limitations of the browser. Please use chromium-based modern browsers (Brave, Chrome, Opera, etc.) instead.')
  }

  // Skip middleware for public assets
  if (isPublicPath(pathname)) return NextResponse.next()

  // Check authentication status
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null
  const isLoggedIn = Boolean(sessionId)

  // Handle logged-in users
  if (isLoggedIn && sessionId) {
    const authInfo = await lucia.validateSession(sessionId)
    if (authInfo.user) {
      const redisLocaleRes = await fetch(
        `${env.BASE_URL}/api/locale/${authInfo.user.id}`
      )
      const redisLocale = await redisLocaleRes.json()

      if (redisLocale) {
        const hasRedisLocale = pathname.startsWith(`/${redisLocale}`) || pathname === `/${redisLocale}`

        if (hasRedisLocale) {
          if (pathname.endsWith('/settings'))
            return redirectWithLocale(req, redisLocale, '/settings/account')

          return NextResponse.redirect(req.nextUrl)
        }

        // Handle path with different locale
        const currentLocale = locales.find(
          (locale) => locale !== redisLocale && (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
        )

        if (currentLocale) {
          if (pathname.replace(currentLocale, '').startsWith('/login')) {
            return redirectWithLocale(req, redisLocale)
          }

          const newPath = pathname.endsWith('/settings')
            ? '/settings/account'
            : pathname.replace(`/${currentLocale}`, '')

          return redirectWithLocale(req, redisLocale, newPath)
        }

        return redirectWithLocale(req, redisLocale, pathname)
      }
    }
  }

  // Handle non-logged-in users or users without Redis locale
  const isGuestValid = await fetch(
    `${env.BASE_URL}/api/validate-guest-auth-session`,
    {
      headers: { cookie: (await cookies()).toString() },
    }
  ).then((res) => res.json())

  const isJoined = isGuestValid || isLoggedIn
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameLocale) {
    const pathnameWithoutLocale = pathname.replace(`/${pathnameLocale}`, '') || '/'

    if (!isJoined && !isPublicRoute(pathnameWithoutLocale))
      return redirectWithLocale(req, pathnameLocale)

    if (isJoined && pathname === '/')
      return redirectWithLocale(req, pathnameLocale)

    return
  }

  // Handle paths without locale
  const locale = getLocale(req, locales)

  if (!isJoined && pathname === '/' && !pathname.startsWith('/login') && !pathname.startsWith('/privacy')) {
    return redirectWithLocale(req, locale)
  }

  if (isJoined) {
    if (pathname === '/' || (isLoggedIn && pathname.startsWith('/login')))
      return redirectWithLocale(req, locale)

    if (pathname.endsWith('/settings'))
      return redirectWithLocale(req, locale, '/settings/account')
  }

  return redirectWithLocale(req, locale, pathname)
}
