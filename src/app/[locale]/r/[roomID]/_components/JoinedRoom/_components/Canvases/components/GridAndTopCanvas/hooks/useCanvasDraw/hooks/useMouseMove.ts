import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useAmIPainting, useCanvasesMainData, usePainterTool, useXY } from '@/zustand/store'
import { amIPainter, eraser, pencil } from './func'

export const useMouseMove = (myUserID: string) => {
  const handler = (e: PointerEvent) => {
    const {
      main,
      zoom,
      cellPixelLength,
    } = useCanvasesMainData.getState().get()
    if (!main || !cellPixelLength || !zoom) return
    const mBoundingRect = main.getBoundingClientRect()

    const x = (e.clientX - mBoundingRect.left) * zoom
    const y = (e.clientY - mBoundingRect.top) * zoom
    const smoothX = Math.floor(x / cellPixelLength)
    const smoothY = Math.floor(y / cellPixelLength)
    useXY.getState().set(smoothX, smoothY)

    const toolName = usePainterTool.getState().current

    if (!amIPainter()) return

    e.preventDefault()

    switch (toolName) {
      case 'pencil':
        pencil(smoothX, smoothY)
        break
      case 'eraser':
        eraser(smoothX, smoothY)
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
