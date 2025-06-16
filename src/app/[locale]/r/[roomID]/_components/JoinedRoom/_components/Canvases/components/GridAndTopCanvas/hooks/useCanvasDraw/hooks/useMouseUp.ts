import { useAmIPainting, } from '@/zustand/store/useAmIPainting'
import { useCanvasesMainData } from '@/zustand/store/useCanvasesMainData'
import { usePainterTool } from '@/zustand/store/usePainterTool'
import { amIPainter } from './func'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'

const canvasWorker = getCanvasWorker()

export const useMouseUp = () => {
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
        break
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

    if (!grid) {
      return
    }

    grid.addEventListener('pointerup', handler)
    return () => {
      grid.removeEventListener('pointerup', handler)
    }
  })
}
