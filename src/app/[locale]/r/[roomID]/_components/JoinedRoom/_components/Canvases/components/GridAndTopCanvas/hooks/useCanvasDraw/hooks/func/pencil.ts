import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import {
    useAmIPainting,
    usePainterTool,
} from '@/zustand/store'

const canvasWorker = getCanvasWorker()

export const pencil = (
    smoothX: number,
    smoothY: number,
) => {
    if (!useAmIPainting.getState().amIPainting) return

    const button = useAmIPainting.getState().button
    const color = new Uint8ClampedArray(usePainterTool.getState().with[button === 0 ? 'color1' : 'color2'])
    const size = usePainterTool.getState().options.pencil.size

    canvasWorker.current.postMessage({
        e: 'pencil',
        data: {
            color,
            startX: smoothX,
            startY: smoothY,
            size
        }
    } as CanvasWorkerOnMsgData)
    sendToHostPeer({

        event: 'painterPencil',
        data: {
            x: smoothX,
            y: smoothY,
            color,
            size
        }
    })
}