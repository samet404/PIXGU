import 'server-only'

import {
  type NextMiddleware,
  type NextRequest,
  NextResponse,
  userAgent,
} from 'next/server'
import { getIP } from '@/utils/getIP'
import { getClientID, isPublicPage, redirectJoinedUser, redirectAdmin, pathnameHasLocale, redirectToComputerLocale, isPublicPath } from './funcs'

const notSupportedWebRTC = (browser: string) => `Sorry, but we are can not support ${browser} due to the lack of support for WebRTC technology. Please use Chromium-based browsers (Brave, Chrome, Opera, etc.) instead.`

export const main: NextMiddleware = async (req: NextRequest) => {
  const { browser } = userAgent(req)
  const { pathname } = req.nextUrl
  const browserName = browser.name
  const IP = getIP(req.headers)

  console.log('=== Middleware Info ===')
  console.log('browserName:', browserName)
  console.log('IP:', IP)
  console.log('pathname:', pathname)

  if (isPublicPath(pathname)) return NextResponse.next()

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


  if (pathname === '/admin') return await redirectAdmin(IP)

  const clientID = await getClientID()
  if (clientID) {
    const redirectJoinedUserRes = await redirectJoinedUser(req, clientID, pathname)
    if (redirectJoinedUserRes) return redirectJoinedUserRes
  }

  const pathnameHasLocaleRes = pathnameHasLocale(req, pathname, !!clientID)
  if (pathnameHasLocaleRes) return pathnameHasLocaleRes

  const redirectToComputerLocaleRes = redirectToComputerLocale(req, clientID, pathname)
  return redirectToComputerLocaleRes
}