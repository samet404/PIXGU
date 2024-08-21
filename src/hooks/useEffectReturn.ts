import { useEffect } from 'react'

/**
 * useEffect but no dependencies and just return function
 */
export const useEffectReturnOnce = (returnFunc: () => void) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => returnFunc, [])
