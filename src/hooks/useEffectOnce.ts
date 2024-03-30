import { type EffectCallback, useEffect } from 'react'

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useEffectOnce = (effect: EffectCallback) => useEffect(effect, [])
