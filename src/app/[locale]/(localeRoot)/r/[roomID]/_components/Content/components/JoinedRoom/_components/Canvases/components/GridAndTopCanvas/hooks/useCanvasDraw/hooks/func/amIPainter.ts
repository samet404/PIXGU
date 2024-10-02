import { useWhoIsPainterClient } from '@/zustand/store'

export const amIPainter = () => {
  const whoIsPainter = useWhoIsPainterClient.getState().value

  if (whoIsPainter.status === 'thereIsNoPainter') return false
  if (!whoIsPainter.amIPainter) return false
}
