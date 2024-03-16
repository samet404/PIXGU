import { useEffect, useState } from 'react'

/**
 * Rerenders when dom is loaded and returns true
 */
export const useRerenderWhenDomLoaded = () => {
  const [domReady, setdomReady] = useState<boolean>(false)

  useEffect(
    () => setdomReady(true),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return domReady
}
