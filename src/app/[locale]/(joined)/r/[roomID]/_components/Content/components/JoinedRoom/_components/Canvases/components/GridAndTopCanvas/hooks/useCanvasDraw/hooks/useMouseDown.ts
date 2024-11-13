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
    if (!amIPainter() || e.button !== 0) return

    const {
      main,
      zoom,
      cellPixelLength,
      mctx,
      dpctx,
      draft_pencil

    } = useCanvasesMainData.getState()
    if (!main || !cellPixelLength || !zoom) return

    const dcBoundingRect = main.getBoundingClientRect()
    const smoothX = Math.floor(
      ((e.clientX - dcBoundingRect.left) * zoom) / cellPixelLength,
    )
    const smoothY = Math.floor(
      ((e.clientY - dcBoundingRect.top) * zoom) / cellPixelLength,
    )
    useXY.getState().set(smoothX, smoothY)

    const toolName = usePainterTool.getState().current
    console.log('toolName', toolName)
    switch (toolName) {
      case 'pencil':
        useAmIPainting.getState().imPainting()

        mctx!.drawImage(draft_pencil!, 0, 0)
        dpctx!.clearRect(0, 0, dpctx!.canvas.width, dpctx!.canvas.height)

        pencil(smoothX, smoothY)
        break
      case 'eraser':
        useAmIPainting.getState().imPainting()
        eraser(smoothX, smoothY)
        break
      case 'bucket':
        bucket(e)
        break
      case 'eyedropper':
        eyedropper(e, smoothX, smoothY)
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
