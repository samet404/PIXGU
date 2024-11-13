import { bucket } from '@/helpers/room'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import type { PainterBucket } from '@/types/webRTCConnData'
import { useHostCanvasesData, useWhoIsPainter } from '@/zustand/store'

export const getPainterBucket = (data: PainterBucket['data'], userID: string) => {
    if (!useWhoIsPainter.getState().isPainter(userID)) return

    const { dbctx, mctx, draft_bucket, cellSideCount, cellPixelLength } = useHostCanvasesData.getState()
    const { x, y, color } = data


    bucket(mctx!, dbctx!, draft_bucket!, x, y, cellPixelLength!, cellSideCount, color)
    sendToAllPeers({
        from: 'host',
        event: 'painterBucket',
        data,
    }, {
        except: [userID]
    })
}
