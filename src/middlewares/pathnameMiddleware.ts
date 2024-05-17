import 'server-only'

import {
  NextRequest,
  type NextFetchEvent,
  type NextMiddleware,
} from 'next/server'

export const withPathnameMiddleware = (middleware: NextMiddleware) => {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const headers = new Headers(req.headers)
    headers.set('x-current-path', req.nextUrl.pathname)
    console.log(req.headers.get('x-current-path') + ' pathbane.ts')
    console.log('middleware pathnameMiddleware.ts')
    console.log(req)

    const newReq = new NextRequest(req.url, {
      ...req,
      headers,
    })
    return middleware(newReq, event)
  }
}
