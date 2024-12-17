import { fillOnePixel } from '@/helpers/room'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { getCanvasWorker, type CanvasWorkerOnMsgData, type CanvasWorkerPostMsgData } from '@/workers'
import {
    useAmIPainting,
    useCanvasesMainData,
    usePainterTool,
} from '@/zustand/store'
import type { MouseEvent } from 'react'

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