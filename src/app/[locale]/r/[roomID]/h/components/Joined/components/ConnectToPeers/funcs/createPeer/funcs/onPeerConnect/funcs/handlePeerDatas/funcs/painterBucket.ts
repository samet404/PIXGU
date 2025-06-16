import type { PainterBucket } from '@/types/webRTCConnData'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'
import { useWhoIsPainter } from '@/zustand/store/useWhoIsPainter'

const canvasWorker = getCanvasWorker()

export const getPainterBucket = (data: PainterBucket['data'], userID: string) => {
    if (!useWhoIsPainter.getState().isPainter(userID)) return
    const { x, y, color } = data


    canvasWorker.current.postMessage({
        e: 'bucket',
        data: {
            x,
            y,
            color
        }
    } as CanvasWorkerOnMsgData)

    sendToAllPeers({

        event: 'painterBucket',
        data: {
            x,
            y,
            color
        }
    }, {
        except: [userID]
    })
}
