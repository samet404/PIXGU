import { redirectWithLocale } from './redirectWithLocale'
import { NextResponse, type NextRequest } from 'next/server'
import { locales } from './locales'
import { redisDb } from '@/db/redis'
import type { Locale } from '@/types/locale'

export const redirectJoinedUser = async (
  req: NextRequest,
  userID: string,
  pathname: string,
) => {
  const redisLocale = (await redisDb.get(`user:${userID}:locale`)) as Locale
  console.log('Redis locale:', redisLocale)

  if (redisLocale) {
    const hasRedisLocale =
      pathname.startsWith(`/${redisLocale}`) || pathname === `/${redisLocale}`
    console.log('Has Redis locale in path:', hasRedisLocale)

    if (hasRedisLocale) {
      if (pathname.endsWith('/settings')) {
        console.log('Redirecting to settings/account')
        return redirectWithLocale(req, redisLocale, '/settings/account')
      }

      return NextResponse.next()
    }

    // Handle path with different locale
    const currentLocale = locales.find(
      (locale) =>
        locale !== redisLocale &&
        (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`),
    )
    console.log('Different locale detected:', currentLocale)

    if (currentLocale) {
      if (pathname.replace(currentLocale, '').startsWith('/login')) {
        console.log('Redirecting to redis locale root')
        return redirectWithLocale(req, redisLocale, '')
      }

      const newPath = pathname.endsWith('/settings')
        ? '/settings/account'
        : pathname.replace(`/${currentLocale}`, '')
      console.log('Redirecting with new path:', newPath)

      return redirectWithLocale(req, redisLocale, newPath)
    }

    console.log('Redirecting with redis locale')
    return redirectWithLocale(req, redisLocale, pathname)
  }
  return null
}
