import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCanvasesMainData, usePainterTool, useXY } from '@/zustand/store'
import { amIPainter, bucket, eraser, pencil } from './func'

export const useMouseMove = (myUserID: string) => {
  const handler = (e: PointerEvent) => {
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

    const toolName = usePainterTool.getState().current

    if (!amIPainter()) return

    switch (toolName) {
      case 'pencil':
        pencil(e, myUserID, newX, newY)
        break

      case 'eraser':
        eraser(e)
        break
    }
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
