import { useWhoIsPainterClient } from '@/zustand/store'

export const amIPainter = () => {
  const whoIsPainter = useWhoIsPainterClient.getState().value

  if (!whoIsPainter.amIPainter) return false
  return true
}

