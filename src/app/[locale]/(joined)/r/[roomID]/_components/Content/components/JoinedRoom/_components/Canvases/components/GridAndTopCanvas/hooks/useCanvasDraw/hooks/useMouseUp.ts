import {
  useAmIPainting,
  useCanvasesMainData,
  usePainterTool,
} from '@/zustand/store'
import { amIPainter } from './func'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { clearAndPasteToMainCanvas } from '@/helpers/room'

const canvasWorker = getCanvasWorker()

export const useMouseUp = () => {
  const handler = () => {
    if (!amIPainter()) return

    const tool = usePainterTool.getState().current

    switch (tool) {
      case 'pencil': {
        const { mctx, dpctx } = useCanvasesMainData.getState().get()

        sendToHostPeer({

          event: 'painterEraserOrPencilOut'
        })
        canvasWorker.current.postMessage({ e: 4 } as CanvasWorkerOnMsgData)
        useAmIPainting.getState().imNotPainting()
        clearAndPasteToMainCanvas(dpctx!, mctx!)
        break
      }
      case 'eraser': {
        const { mctx, dpctx } = useCanvasesMainData.getState().get()

        sendToHostPeer({

          event: 'painterEraserOrPencilOut'
        })
        canvasWorker.current.postMessage({ e: 4 } as CanvasWorkerOnMsgData)
        useAmIPainting.getState().imNotPainting()
        clearAndPasteToMainCanvas(dpctx!, mctx!)
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

    if (!grid) {
      return
    }

    grid.addEventListener('pointerup', handler)
    return () => {
      grid.removeEventListener('pointerup', handler)
    }
  })
}
