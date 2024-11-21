import type { PainterEraser } from '@/types/webRTCConnData';
import { sendToAllPeers } from '@/utils/sendToAllPeers';
import { useWhoIsPainter } from '@/zustand/store';
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers';

const canvasWorker = getCanvasWorker()

export const getPainterEraser = (data: PainterEraser['data'], userID: string) => {
    if (!useWhoIsPainter.getState().isPainter(userID)) return
    const { x, y, size } = data

    canvasWorker.current.postMessage({
        e: 2,
        data: {
            startX: x,
            startY: y,
            size
        }
    } as CanvasWorkerOnMsgData)
    sendToAllPeers({

        event: 'painterEraser',
        data
    }, {
        except: [userID]
    })
}