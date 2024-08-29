import { draw } from './func'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCanvasesMainData, useWhoIsPainterClient } from '@/zustand/store'

export const useMouseMove = (myUserID: string) => {
  const handler = (e: MouseEvent) => {
    const whoIsPainter = useWhoIsPainterClient.getState().value

    if (whoIsPainter.status === 'thereIsNoPainter') return
    if (!whoIsPainter.amIPainter) return null
    if (e.button !== 0) return null

    draw(e, myUserID)
  }

  useEffectOnce(() => {
    const canvasesMainData = useCanvasesMainData.getState().get()

    if (!canvasesMainData.grid) {
      return
    }

    canvasesMainData.grid.addEventListener('mousemove', handler)

    return () => {
      canvasesMainData.grid!.removeEventListener('mousemove', handler)
    }
  })
}
