import { type EffectCallback, useEffect } from 'react'

/**
 * Just like `useEffect`, but with no dependencies.
 */
// eslint-disable-next-line react-hooks/exhaustive-deps
export const useEffectOnce = (effect: EffectCallback) => useEffect(effect, [])
