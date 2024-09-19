import { draw } from './func'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useAmIPainting,
  useCanvasesMainData,
  useWhoIsPainterClient,
  useXY,
} from '@/zustand/store'

export const useMouseMove = (myUserID: string) => {
  const handler = (e: PointerEvent) => {
    console.log('move')
    // const whoIsPainter = useWhoIsPainterClient.getState().value

    // if (whoIsPainter.status === 'thereIsNoPainter') return
    // if (!whoIsPainter.amIPainter) return null

    const {
      draft: dc,
      zoom,
      cellPixelLength,
    } = useCanvasesMainData.getState().get()
    if (!dc || !cellPixelLength || !zoom) return

    const dcBoundingRect = dc.getBoundingClientRect()

    const x = (e.clientX - dcBoundingRect.left) * zoom
    const y = (e.clientY - dcBoundingRect.top) * zoom
    const newX = Math.floor(x / cellPixelLength)
    const newY = Math.floor(y / cellPixelLength)
    useXY.getState().set(newX, newY)

    if (!useAmIPainting.getState().amIPainting) return
    draw(e, myUserID, newX, newY)
  }

  useEffectOnce(() => {
    const canvasesMainData = useCanvasesMainData.getState().get()

    if (!canvasesMainData.grid) {
      return
    }

    canvasesMainData.grid.addEventListener('pointermove', handler)

    return () => {
      canvasesMainData.grid!.removeEventListener('pointermove', handler)
    }
  })
}
