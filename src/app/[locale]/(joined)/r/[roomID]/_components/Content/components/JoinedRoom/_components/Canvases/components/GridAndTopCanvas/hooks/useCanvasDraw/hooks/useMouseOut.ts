import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useAmIPainting,
  useCanvasesMainData,
  usePainterTool,
} from '@/zustand/store'
import { amIPainter } from './func'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { clearAndPasteToMainCanvas } from '@/helpers/room'

const canvasWorker = getCanvasWorker()

export const useMouseOut = () => {
  const handler = () => {
    if (!amIPainter()) return

    const tool = usePainterTool.getState().current

    switch (tool) {
      case 'pencil': {
        const { dpctx, mctx } = useCanvasesMainData.getState().get()
        sendToHostPeer({

          event: 'painterEraserOrPencilOut'
        })
        canvasWorker.current.postMessage({ e: 4 } as CanvasWorkerOnMsgData)
        clearAndPasteToMainCanvas(dpctx!, mctx!)
        useAmIPainting.getState().imNotPainting()
      }
      case 'eraser': {
        const { dpctx, mctx } = useCanvasesMainData.getState().get()
        sendToHostPeer({

          event: 'painterEraserOrPencilOut'
        })
        canvasWorker.current.postMessage({ e: 4 } as CanvasWorkerOnMsgData)
        clearAndPasteToMainCanvas(dpctx!, mctx!)
        useAmIPainting.getState().imNotPainting()
        break
      }
      case 'gradient': {
        const { dgctx, mctx } = useCanvasesMainData.getState().get()
        useAmIPainting.getState().imNotPainting()
        clearAndPasteToMainCanvas(dgctx!, mctx!)
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
