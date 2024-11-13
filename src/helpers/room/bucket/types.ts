import type { PixelHistoryStoreValue, PixelsOnBucketStoreValue } from '@/store'

export type WorkerOnMsgData = {
    smoothX: number,
    smoothY: number,
    cellSideCount: number,
    pixelHistory: PixelHistoryStoreValue['history']
}

export type WorkerPostMsgData = {
    coors: Uint16Array[]
    pixelHistory: PixelHistoryStoreValue['history']
}