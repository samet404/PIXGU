import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'

export const amIPainter = () => {
  const whoIsPainter = useWhoIsPainterClient.getState().value

  if (!whoIsPainter.amIPainter) return false
  return true
}

