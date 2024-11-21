import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { getCanvasWorker, type CanvasWorkerOnMsgData, type CanvasWorkerPostMsgData } from '@/workers'
import {
    useAmIPainting,
    useCanvasesMainData,
    usePainterTool,
} from '@/zustand/store'

const canvasWorker = getCanvasWorker()

export const eraser = (
    smoothX: number,
    smoothY: number,
) => {
    if (!useAmIPainting.getState().amIPainting) return

    const size = usePainterTool.getState().options.pencil.size


    canvasWorker.current.postMessage({
        e: 2,
        data: {
            startX: smoothX,
            startY: smoothY,
            size
        }
    } as CanvasWorkerOnMsgData)
    sendToHostPeer({

        event: 'painterEraser',
        data: {
            x: smoothX,
            y: smoothY,
            size
        }
    })
}