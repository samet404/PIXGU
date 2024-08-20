import { useEffect } from 'react'

export const useEffectReturn = (
  callback: () => void,
  dependencies?: readonly unknown[],
) => {
  useEffect(
    () => () => callback(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies ?? [],
  )
}
