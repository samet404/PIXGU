import { draw } from './func'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useCanvasesMainData,
  useAmIPainting,
  useWhoIsPainterClient,
} from '@/zustand/store'

export const useMouseDown = (myUserID: string) => {
  const handler = (e: MouseEvent) => {
    console.log('startPosition')
    // const whoIsPainter = useWhoIsPainterClient.getState().value

    // if (whoIsPainter.status === 'thereIsNoPainter') return
    // if (!whoIsPainter.amIPainter) return null
    if (e.button !== 0) return null

    useAmIPainting.getState().imPainting()

    draw(e, myUserID)
  }

  useEffectOnce(() => {
    console.log('mousedown')
    const canvasesMainData = useCanvasesMainData.getState().get()

    if (!canvasesMainData.grid) {
      return
    }

    canvasesMainData.grid.addEventListener('mousedown', handler)

    return () => {
      canvasesMainData.grid!.removeEventListener('mousedown', handler)
    }
  })
}
