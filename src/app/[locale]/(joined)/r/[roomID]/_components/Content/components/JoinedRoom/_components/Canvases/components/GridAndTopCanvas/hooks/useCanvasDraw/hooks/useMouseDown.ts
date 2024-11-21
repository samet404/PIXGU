import { amIPainter, bucket, eraser, eyedropper, gradient, pencil } from './func'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { storeMouseDownStartAt } from '@/store'
import {
  useCanvasesMainData,
  useXY,
  usePainterTool,
  useAmIPainting,
} from '@/zustand/store'

export const useMouseDown = (myUserID: string) => {
  const handler = (e: PointerEvent) => {
    if (!amIPainter() || useAmIPainting.getState().amIPainting) return


    e.preventDefault()
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
    const exactX = Math.floor(
      ((e.clientX - dcBoundingRect.left) * zoom))
    const exactY = Math.floor(
      ((e.clientY - dcBoundingRect.top) * zoom))
    const smoothX = Math.floor(exactX / cellPixelLength)

    const smoothY = Math.floor(exactY / cellPixelLength)

    useXY.getState().set(smoothX, smoothY)
    storeMouseDownStartAt.set({
      exact: [exactX, exactY],
      smooth: [smoothX, smoothY]
    })
    console.log('start x, y: ', smoothX, smoothY)

    const toolName = usePainterTool.getState().current

    switch (toolName) {
      case 'pencil':
        useAmIPainting.getState().imPainting(e.button)

        mctx!.drawImage(draft_pencil!, 0, 0)
        dpctx!.clearRect(0, 0, dpctx!.canvas.width, dpctx!.canvas.height)

        pencil(smoothX, smoothY)
        break
      case 'eraser':
        useAmIPainting.getState().imPainting(e.button)
        eraser(smoothX, smoothY)
        break
      case 'bucket':
        bucket(smoothX, smoothY)
        break
      case 'eyedropper':
        eyedropper(smoothX, smoothY)
        break
      case 'gradient':
        useAmIPainting.getState().imPainting(e.button)
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
