import 'server-only'

import { headers } from 'next/headers'

/**
 * Get the last part of the pathname from the server component
 */
export const getLastPartOfPathnameServer = () => {
  const headerList = headers()
  const pathname = headerList.get('x-current-path')!
  const parts = pathname.split('/')
  const lastPart = parts[parts.length - 1]!

  return lastPart
}
