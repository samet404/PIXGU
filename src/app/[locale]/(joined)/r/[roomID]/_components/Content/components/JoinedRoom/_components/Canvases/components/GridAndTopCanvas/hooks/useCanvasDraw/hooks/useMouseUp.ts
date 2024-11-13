import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useAmIPainting,
  useCanvasesMainData,
  usePainterTool,
} from '@/zustand/store'
import { amIPainter } from './func'
import { storePixelsOnDraw } from '@/store'
import { sendToHostPeer } from '@/utils/sendToHostPeer'

export const useMouseUp = () => {
  console.log('mouse up')
  const handler = () => {
    if (!amIPainter()) return

    const { dpctx } = useCanvasesMainData.getState().get()

    const tool = usePainterTool.getState().current

    switch (tool) {
      case 'pencil':
        sendToHostPeer({
          from: 'client',
          event: 'painterEraserOrPencilOut'
        })
        dpctx!.beginPath()
        storePixelsOnDraw.reset()

        storePixelsOnDraw.setLastPixel(null)
        useAmIPainting.getState().imNotPainting()
        storePixelsOnDraw.reset()
        break
      case 'eraser':
        sendToHostPeer({
          from: 'client',
          event: 'painterEraserOrPencilOut'
        })
        dpctx!.beginPath()
        storePixelsOnDraw.reset()

        storePixelsOnDraw.setLastPixel(null)
        useAmIPainting.getState().imNotPainting()
        storePixelsOnDraw.reset()
        break
    }
  }

  useEffectOnce(() => {
    const { grid } = useCanvasesMainData.getState().get()

    if (!grid) {
      return
    }

    grid.addEventListener('pointerup', handler)
    return () => {
      grid.removeEventListener('pointerup', handler)
    }
  })
}
