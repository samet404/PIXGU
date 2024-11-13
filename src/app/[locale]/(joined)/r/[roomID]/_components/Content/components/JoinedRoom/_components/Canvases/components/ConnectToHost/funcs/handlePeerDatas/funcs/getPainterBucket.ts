import { bucket } from '@/helpers/room'
import type { PainterBucket } from '@/types/webRTCConnData'
import { useCanvasesMainData } from '@/zustand/store'

export const getPainterBucket = (data: PainterBucket['data']) => {
    const { draft_bucket, mctx, dbctx, cellPixelLength, cellSideCount } =
        useCanvasesMainData.getState()
    const { color, x, y } = data

    bucket(mctx!, dbctx!, draft_bucket!, x, y, cellSideCount, cellPixelLength!, color)
}

