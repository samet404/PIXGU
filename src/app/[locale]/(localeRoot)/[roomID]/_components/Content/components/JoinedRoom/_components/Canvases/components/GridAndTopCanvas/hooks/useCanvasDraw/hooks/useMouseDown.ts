import { amIPainter, bucket, eraser, eyedropper, pencil } from './func'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useCanvasesMainData,
  useXY,
  usePainterTool,
  useAmIPainting,
} from '@/zustand/store'

export const useMouseDown = (myUserID: string) => {
  const handler = (e: PointerEvent) => {
    console.log('startPosition')

    if (!amIPainter()) return
    if (e.button !== 0) return null
    const {
      draft: dc,
      zoom,
      cellPixelLength,
    } = useCanvasesMainData.getState().get()
    if (!dc || !cellPixelLength || !zoom) return
    const dcBoundingRect = dc.getBoundingClientRect()

    const x = Math.floor(
      ((e.clientX - dcBoundingRect.left) * zoom) / cellPixelLength,
    )
    const y = Math.floor(
      ((e.clientY - dcBoundingRect.top) * zoom) / cellPixelLength,
    )
    useXY.getState().set(x, y)

    const toolName = usePainterTool.getState().current
    console.log('toolName', toolName)
    switch (toolName) {
      case 'pencil':
        useAmIPainting.getState().imPainting()
        pencil(e, myUserID, x, y)
        break
      case 'bucket':
        bucket(e)
        break
      case 'eyedropper':
        eyedropper(e)
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
    canvasesMainData.grid.addEventListener('pointerdown', handler)

    return () =>
      canvasesMainData.grid!.removeEventListener('pointerdown', handler)
  })
}
