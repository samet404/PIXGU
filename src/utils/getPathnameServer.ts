import { headers } from 'next/headers'

/**
 * Get the pathname from the server component
 */
export const getPathnameServer = () => {
  const headerList = headers()
  const pathname = headerList.get('x-current-path')!

  return pathname
}
