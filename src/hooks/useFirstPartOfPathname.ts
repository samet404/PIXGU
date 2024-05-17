import { usePathname } from 'next/navigation'

/**
 * Get the first part of the pathname of the current URL.
 */
export const useFirstPartOfPathname = () => {
  const pathname = usePathname()
  const parts = pathname.split('/')
  const firstPart = parts[0] as string

  return firstPart
}
