import { usePathname } from 'next/navigation'

/**
 * Get the last part of the pathname of the current URL.
 */
export const useLastPartOfPathname = () => {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const lastPart = parts[parts.length - 1] as string

  return lastPart
}
