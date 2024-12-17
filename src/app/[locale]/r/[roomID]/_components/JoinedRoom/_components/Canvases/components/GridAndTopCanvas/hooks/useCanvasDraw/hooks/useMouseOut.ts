import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useAmIPainting,
  useCanvasesMainData,
  usePainterTool,
} from '@/zustand/store'
import { amIPainter } from './func'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { sendToHostPeer } from '@/utils/sendToHostPeer'

const canvasWorker = getCanvasWorker()

export const useMouseOut = () => {
  const handler = () => {
    if (!amIPainter()) return

    const tool = usePainterTool.getState().current

    switch (tool) {
      case 'pencil': {
        sendToHostPeer({
          event: 'painterEraserOrPencilOut'
        })
        canvasWorker.current.postMessage({ e: 'mouseUp' } as CanvasWorkerOnMsgData)
        useAmIPainting.getState().imNotPainting()
      }
      case 'eraser': {
        sendToHostPeer({
          event: 'painterEraserOrPencilOut'
        })
        canvasWorker.current.postMessage({ e: 'mouseUp' } as CanvasWorkerOnMsgData)
        useAmIPainting.getState().imNotPainting()
        break
      }

    }
  }

  useEffectOnce(() => {
    const { grid } = useCanvasesMainData.getState().get()


    grid!.addEventListener('pointerout', handler)

    return () => {
      grid!.removeEventListener('pointerout', handler)
    }
  })
}
