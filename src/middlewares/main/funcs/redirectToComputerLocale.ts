import type { NextRequest } from 'next/server'
import { getLocale } from './getLocale'
import { locales } from './locales'
import { redirectWithLocale } from './redirectWithLocale'
import { isPublicPage } from './isPublicPage'

export const redirectToComputerLocale = (
  req: NextRequest,
  clientID: string | null,
  pathname: string,
) => {
  const locale = getLocale(req, locales)
  const publicPage = isPublicPage(pathname)
  console.log('Determined locale:', locale)

  if (!clientID && !publicPage) {
    console.log('Redirecting: not joined at root')
    return redirectWithLocale(req, locale, '')
  }

  if (clientID) {
    const isGuest = clientID.length === 22
    if (!isGuest && pathname.startsWith('/login')) {
      console.log('Redirecting: joined at root or logged-in at login')
      return redirectWithLocale(req, locale, '')
    }

    if (pathname.endsWith('/settings')) {
      console.log('Redirecting to settings/account')
      return redirectWithLocale(req, locale, '/settings/account')
    }
  }

  console.log('Final redirect with locale and pathname')
  return redirectWithLocale(req, locale, pathname)
}
