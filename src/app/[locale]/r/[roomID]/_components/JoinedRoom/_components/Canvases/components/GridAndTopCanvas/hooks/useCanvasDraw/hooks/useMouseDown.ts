import { amIPainter, bucket, eraser, eyedropper, pencil } from './func'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { storeMouseDownStartAt } from '@/store/storeMouseDownStartAt'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { useAmIPainting } from '@/zustand/store/useAmIPainting'
import { usePainterTool } from '@/zustand/store/usePainterTool'
import { useXY } from '@/zustand/store/useXY'
import { useCanvasesMainData } from '@/zustand/store/useCanvasesMainData'

const canvasWorker = getCanvasWorker()

export const useMouseDown = (myUserID: string) => {
  const handler = (e: PointerEvent) => {
    if (!amIPainter() || useAmIPainting.getState().amIPainting) return


    e.preventDefault()
    const {
      main,
      zoom,
      cellPixelLength,
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
    canvasWorker.current.postMessage({
      e: 'mousedown',
      data: [smoothX, smoothY]
    } as CanvasWorkerOnMsgData)

    sendToHostPeer({
      event: 'painterMouseDown',
      data: new Uint16Array([smoothX, smoothY])
    })

    const toolName = usePainterTool.getState().current

    switch (toolName) {
      case 'pencil':
        useAmIPainting.getState().imPainting(e.button)
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
